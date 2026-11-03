# Despliegue por FTP (Hostinger)

El flujo de GitHub Actions (`.github/workflows/ci.yml`) sigue la misma convención que el del Hospital Santa Fe:

- **Cada push y pull request:** instala dependencias, revisa tipos (`bun run check`), compila y comprueba que se generen las 6 páginas, el 404, el sitemap, `robots.txt` y `.htaccess`.
- **Cada push a `main`:** además sube `dist/` por FTP a **https://new.rexburger.com.mx**, en la carpeta `/public_html/new/`.
- También se puede lanzar a mano: *Actions > CI > Run workflow*.

## 1. Subdominio en Hostinger

En hPanel > Dominios > Subdominios, crea `new.rexburger.com.mx`. Hostinger crea la carpeta `public_html/new` y le activa el certificado SSL (puede tardar unos minutos).

## 2. Repositorio en GitHub

1. Crea un repositorio **privado** (por ejemplo `rexburger-website`).
2. Desde la carpeta del proyecto:
   ```sh
   git remote add origin https://github.com/<usuario>/rexburger-website.git
   git push -u origin main
   ```

## 3. Secretos y variables

En GitHub: *Settings > Secrets and variables > Actions*.

**Secrets** (nunca los pegues en chats, commits ni archivos):

| Nombre | Valor |
|---|---|
| `FTP_SERVER` | Servidor FTP de hPanel (Archivos > Cuentas FTP) |
| `FTP_USERNAME` | Usuario FTP |
| `FTP_PASSWORD` | Contraseña FTP |
| `PUBLIC_GOOGLE_MAPS_API_KEY` | Clave del mapa (opcional) |

**Variables de repositorio:**

| Nombre | Valor | Notas |
|---|---|---|
| `FTP_SERVER_DIR` | `/public_html/new/` | **Obligatoria.** Relativa a donde entra la cuenta FTP; debe empezar y terminar con `/` y no ser la raíz |
| `SITE_URL` | `https://new.rexburger.com.mx` | Sin `/` final |
| `PUBLIC_NOINDEX` | `true` | Pide a Google no indexar el subdominio |
| `FTP_PROTOCOL` | `ftps` | Opcional: `ftps`, `ftp` o `ftps-legacy`. Si falla `ftps`, prueba `ftp` |
| `FTP_PORT` | `21` | Opcional |
| `PUBLIC_WHATSAPP_PEDIDOS`, `PUBLIC_FACEBOOK_URL`, `PUBLIC_INSTAGRAM_URL`, `PUBLIC_TIKTOK_URL` | | Opcionales; ver `docs/configuracion.md` |

Si al entrar por FTP no ves `public_html` en la raíz (por ejemplo, la cuenta ya entra dentro de `public_html`), ajusta `FTP_SERVER_DIR` a `/new/`. El flujo se detiene antes de subir si la variable falta o es inválida.

## 4. Qué hace el despliegue

- Sube **solo lo que cambió** y guarda un registro (`.ftp-deploy-sync-state.json`) en el servidor. Nunca toca nada fuera de `FTP_SERVER_DIR`.
- Con `SITE_URL` y `PUBLIC_NOINDEX` el sitio queda con `noindex` (meta robots y `robots.txt` con `Disallow: /`) y los enlaces canónicos, el sitemap, Open Graph y los datos estructurados apuntan a `new.rexburger.com.mx`.
- `public/.htaccess` activa compresión, caché larga para los archivos con huella (`/_astro`, tipografías, imágenes), cabeceras de seguridad básicas y la página 404. El flujo sube los archivos ocultos del build; sin ello el `.htaccess` se perdería.

## 5. El día que el sitio nuevo pase a ser el principal

1. **Borra** las variables `SITE_URL` y `PUBLIC_NOINDEX`.
2. Cambia `FTP_SERVER_DIR` a la carpeta del dominio principal (`/public_html/`), después de respaldar el sitio anterior.
3. Descomenta las líneas de HTTPS en `public/.htaccess`.
4. Vuelve a ejecutar el flujo y envía `https://rexburger.com.mx/sitemap-index.xml` en Google Search Console.

## Probar el mismo build en tu equipo

```sh
SITE_URL=https://new.rexburger.com.mx PUBLIC_NOINDEX=true bun run build
bun run preview
```
