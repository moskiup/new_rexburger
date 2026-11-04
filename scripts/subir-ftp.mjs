#!/usr/bin/env node
/*
 * Compila el sitio y lo sube por FTP (Hostinger), sin depender de GitHub Actions.
 *
 *   bun run subir                 compila para new.rexburger.com.mx y sube lo que cambió
 *   bun run subir -- --simular    muestra qué subiría, sin conectarse al servidor
 *   bun run subir -- --sin-build  sube el dist/ que ya existe, sin volver a compilar
 *   bun run subir -- --produccion compila para rexburger.com.mx (sin noindex), para el lanzamiento real
 *
 * Los datos de acceso se leen de `.env.ftp` (archivo local, ignorado por git; ver `.env.ftp.example`)
 * o de variables de entorno con el mismo nombre. La contraseña nunca se imprime.
 *
 * Solo sube los archivos nuevos o modificados y borra del servidor los que este mismo script subió antes y ya
 * no existen en el sitio (lo sabe por `.rexburger-deploy.json`). Nunca borra archivos ajenos.
 */
import { Client } from 'basic-ftp';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = new Set(process.argv.slice(2));
const MANIFIESTO = '.rexburger-deploy.json';

/* ---------- configuración ---------- */
function leerEnvFtp() {
  const ruta = join(raiz, '.env.ftp');
  const datos = {};
  if (!existsSync(ruta)) return datos;
  for (const linea of readFileSync(ruta, 'utf8').split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (!m || linea.trim().startsWith('#')) continue;
    datos[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
  return datos;
}
const archivo = leerEnvFtp();
const cfg = (k, defecto = '') => process.env[k] || archivo[k] || defecto;

const config = {
  host: cfg('FTP_SERVER', 'ftp.rexburger.com.mx'),
  usuario: cfg('FTP_USERNAME'),
  clave: cfg('FTP_PASSWORD'),
  puerto: Number(cfg('FTP_PORT', '21')),
  protocolo: cfg('FTP_PROTOCOL', 'ftps'), // ftps (explícito) o ftp
  carpeta: cfg('FTP_SERVER_DIR', '/'), // relativa a la raíz de la cuenta FTP (que ya está dentro de public_html/new)
  tlsEstricto: cfg('FTP_TLS_ESTRICTO', 'true') !== 'false',
};

const produccion = args.has('--produccion');
const url = produccion ? '' : cfg('SITE_URL', 'https://new.rexburger.com.mx');

/* ---------- compilar ---------- */
if (!args.has('--sin-build')) {
  console.log(`Compilando para ${url || 'https://rexburger.com.mx (producción)'}...`);
  const env = { ...process.env, ...(url ? { SITE_URL: url, PUBLIC_NOINDEX: cfg('PUBLIC_NOINDEX', 'true') } : { SITE_URL: '', PUBLIC_NOINDEX: '' }) };
  for (const k of ['PUBLIC_WHATSAPP_PEDIDOS', 'PUBLIC_FACEBOOK_URL', 'PUBLIC_INSTAGRAM_URL', 'PUBLIC_TIKTOK_URL', 'PUBLIC_GOOGLE_MAPS_API_KEY']) {
    if (cfg(k)) env[k] = cfg(k);
  }
  const r = spawnSync('bun', ['run', 'build'], { cwd: raiz, stdio: 'inherit', env, shell: true });
  if (r.status !== 0) {
    console.error('\nLa compilación falló: no se sube nada.');
    process.exit(1);
  }
}

/* ---------- archivos locales ---------- */
const dist = join(raiz, 'dist');
if (!existsSync(join(dist, 'index.html'))) {
  console.error('No existe dist/index.html. Ejecuta sin --sin-build para compilar primero.');
  process.exit(1);
}
function listar(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? listar(p) : [p];
  });
}
const sha = (p) => createHash('sha1').update(readFileSync(p)).digest('hex');
const locales = Object.fromEntries(listar(dist).map((p) => [relative(dist, p).split('\\').join('/'), sha(p)]));
const total = Object.keys(locales).length;
const mb = (listar(dist).reduce((n, p) => n + statSync(p).size, 0) / 1048576).toFixed(1);
console.log(`dist/: ${total} archivos, ${mb} MB`);

/* ---------- simulación ---------- */
if (args.has('--simular')) {
  console.log(`\nSimulación: se subiría a ftp://${config.host}${config.carpeta} (${config.protocolo}, puerto ${config.puerto}).`);
  console.log('No se conectó al servidor ni se cambió nada.');
  process.exit(0);
}

/* ---------- validar acceso ---------- */
const faltan = [!config.usuario && 'FTP_USERNAME', !config.clave && 'FTP_PASSWORD'].filter(Boolean);
if (faltan.length) {
  console.error(`\nFalta ${faltan.join(' y ')}. Copia .env.ftp.example a .env.ftp y complétalo (el archivo no se sube a git).`);
  process.exit(1);
}
if (!['ftps', 'ftp'].includes(config.protocolo)) {
  console.error('FTP_PROTOCOL debe ser ftps o ftp.');
  process.exit(1);
}
if (/^[A-Za-z]:|Program Files/i.test(config.carpeta)) {
  console.error(`FTP_SERVER_DIR llegó como una ruta de Windows (${config.carpeta}). Git Bash convierte los valores que empiezan con "/" cuando se pasan por la línea de comandos.`);
  console.error('Ponlo en el archivo .env.ftp (ahí no se convierte) o ejecuta el comando desde PowerShell.');
  process.exit(1);
}
const base = posix.normalize('/' + config.carpeta.replace(/\\/g, '/'));

/* ---------- subir ---------- */
const cliente = new Client(60_000);
const tmp = mkdtempSync(join(tmpdir(), 'rexburger-ftp-'));
try {
  console.log(`\nConectando a ${config.host} como ${config.usuario} (${config.protocolo})...`);
  await cliente.access({
    host: config.host,
    port: config.puerto,
    user: config.usuario,
    password: config.clave,
    secure: config.protocolo === 'ftps',
    secureOptions: config.tlsEstricto ? undefined : { rejectUnauthorized: false },
  });
  await cliente.ensureDir(base);
  console.log(`Carpeta del servidor: ${await cliente.pwd()}`);

  // Manifiesto de la vez anterior: qué subió este script y con qué contenido.
  let previos = {};
  try {
    const copia = join(tmp, 'previo.json');
    await cliente.downloadTo(copia, posix.join(base, MANIFIESTO));
    previos = JSON.parse(readFileSync(copia, 'utf8')).archivos ?? {};
  } catch {
    console.log('Primera subida desde este equipo (no hay manifiesto previo): se suben todos los archivos.');
  }

  const subir = Object.keys(locales).filter((f) => previos[f] !== locales[f]);
  const borrar = Object.keys(previos).filter((f) => !(f in locales));
  console.log(`Por subir: ${subir.length} de ${total}. Por borrar (ya no existen en el sitio): ${borrar.length}.`);

  let hechos = 0;
  for (const f of subir) {
    const destino = posix.join(base, f);
    await cliente.ensureDir(posix.dirname(destino));
    await cliente.uploadFrom(join(dist, f), posix.basename(destino));
    hechos++;
    if (hechos % 20 === 0 || hechos === subir.length) console.log(`  subidos ${hechos}/${subir.length}`);
  }
  for (const f of borrar) {
    try {
      await cliente.remove(posix.join(base, f));
    } catch {
      /* ya no estaba */
    }
  }

  // El manifiesto se sube al final: si algo falla antes, la próxima vez se reintenta lo pendiente.
  const manifiesto = join(tmp, MANIFIESTO);
  writeFileSync(manifiesto, JSON.stringify({ actualizado: new Date().toISOString(), sitio: url || 'produccion', archivos: locales }, null, 1));
  await cliente.ensureDir(base);
  await cliente.uploadFrom(manifiesto, MANIFIESTO);

  console.log(`\nListo. Subidos ${subir.length}, borrados ${borrar.length}.`);
  console.log(url ? `Revisa: ${url}` : 'Revisa: https://rexburger.com.mx');
} catch (e) {
  const msg = String(e?.message ?? e);
  console.error(`\nError al subir por FTP: ${msg}`);
  if (/certificate|self.signed|altnames|hostname/i.test(msg)) {
    console.error('Parece un problema con el certificado TLS del servidor. Prueba FTP_TLS_ESTRICTO=false en .env.ftp, o FTP_PROTOCOL=ftp.');
  } else if (/530|login|auth/i.test(msg)) {
    console.error('El servidor rechazó el usuario o la contraseña. Revisa FTP_USERNAME y FTP_PASSWORD.');
  } else if (/550|no such|not found/i.test(msg)) {
    console.error(`No se encontró la carpeta ${base}. Si la cuenta FTP ya entra dentro de public_html/new, usa FTP_SERVER_DIR=/`);
  } else if (/timeout|ECONN|ENOTFOUND|EAI_AGAIN/i.test(msg)) {
    console.error('No se pudo conectar. Revisa FTP_SERVER, FTP_PORT y tu conexión.');
  }
  process.exitCode = 1;
} finally {
  cliente.close();
  rmSync(tmp, { recursive: true, force: true });
}
