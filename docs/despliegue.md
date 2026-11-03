# Despliegue por FTP (Hostinger)

El flujo de GitHub Actions (`.github/workflows/deploy.yml`) revisa tipos, compila el sitio y lo sube por FTP a **https://new.rexburger.com.mx**. Se ejecuta en cada push a `main` y también a mano (pestaña *Actions* > *Desplegar* > *Run workflow*).

Carpeta del servidor: `/home/u420678263/domains/rexburger.com.mx/public_html/new`.

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

**Secrets** (pestaña *Secrets*; nunca los pegues en chats, commits ni archivos):

| Nombre | Valor |
|---|---|
| `FTP_SERVER` | Servidor FTP de hPanel (Archivos > Cuentas FTP), por ejemplo `ftp.rexburger.com.mx` o la IP |
| `FTP_USERNAME` | Usuario FTP |
| `FTP_PASSWORD` | Contraseña FTP |
| `FTP_SERVER_DIR` | Carpeta de destino **relativa a la raíz de esa cuenta FTP**, terminada en `/` (ver abajo) |
| `PUBLIC_GOOGLE_MAPS_API_KEY` | Clave del mapa (opcional) |

**Variables** (pestaña *Variables*; todas opcionales):

| Nombre | Para qué | Por defecto |
|---|---|---|
| `PUBLIC_SITE_URL` | Dirección del sitio | `https://new.rexburger.com.mx` |
| `PUBLIC_NOINDEX` | `true` pide a Google no indexar | `true` |
| `PUBLIC_WHATSAPP_PEDIDOS` | Número de pedidos del carrito | provisional de Atotonilco |
| `PUBLIC_FACEBOOK_URL`, `PUBLIC_INSTAGRAM_URL`, `PUBLIC_TIKTOK_URL` | Redes del pie de página | sin enlace |
| `FTP_PROTOCOL` | `ftps` o `ftp` | `ftps` |
| `FTP_PORT` | Puerto | `21` |

### Cuál es el valor de `FTP_SERVER_DIR`

La ruta `/home/u420678263/domains/rexburger.com.mx/public_html/new` es la del servidor, pero el FTP suele "enjaular" la cuenta en una carpeta y muestra una ruta más corta. Conéctate una vez con FileZilla (o el administrador de archivos de hPanel) y mira dónde cae:

| Si al conectar ves… | `FTP_SERVER_DIR` |
|---|---|
| la carpeta `domains` y `public_html` | `domains/rexburger.com.mx/public_html/new/` |
| `public_html` | `public_html/new/` |
| el contenido de `public_html` (la raíz ya es esa) | `new/` |

El flujo se detiene si `FTP_SERVER_DIR` está vacío, es `/` o no termina en `/`, para no subir sobre el sitio principal por error.

Si la subida falla con `ftps`, prueba `FTP_PROTOCOL=ftp`.

## 4. Qué hace el despliegue

- Sube **solo lo que cambió** y borra de `new/` lo que ya no existe en el sitio. Nunca toca nada fuera de `FTP_SERVER_DIR`.
- Mientras el sitio esté en `new.rexburger.com.mx` queda con `noindex` (meta robots y `robots.txt` con `Disallow: /`), para que Google no lo indexe en paralelo al sitio actual. Los enlaces canónicos, el sitemap y Open Graph apuntan a `new.rexburger.com.mx`.
- `public/.htaccess` activa compresión, caché larga para los archivos con huella (`/_astro`, tipografías, imágenes), cabeceras de seguridad básicas y la página 404.

## 5. El día que `new` pase a ser el sitio principal

1. En GitHub, borra las variables `PUBLIC_SITE_URL` y `PUBLIC_NOINDEX`, o ponlas en `https://rexburger.com.mx` y `false`.
2. Apunta `FTP_SERVER_DIR` a la carpeta del dominio principal (`.../public_html/`), después de respaldar el sitio anterior.
3. Descomenta las líneas de HTTPS en `public/.htaccess`.
4. Envía `https://rexburger.com.mx/sitemap-index.xml` en Google Search Console.

## Probar el mismo build en tu equipo

```sh
PUBLIC_SITE_URL=https://new.rexburger.com.mx PUBLIC_NOINDEX=true bun run build
bun run preview
```
