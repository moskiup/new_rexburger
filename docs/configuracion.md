# Configuración y datos

Dónde se cambia cada cosa del sitio sin tocar componentes.

## Variables de entorno (`.env`)

Copia `.env.example` a `.env` y completa los valores. Las variables `PUBLIC_` viajan al navegador, así que no pongas secretos.

| Variable | Para qué | Si falta |
|---|---|---|
| `PUBLIC_GOOGLE_MAPS_API_KEY` | Mapa de sucursales en el inicio | El mapa muestra un aviso |
| `PUBLIC_WHATSAPP_PEDIDOS` | Número que recibe los pedidos del carrito de Merch. Formato internacional sin `+` ni espacios (ej. `523911255845`) | Se usa el número de Atotonilco y el build avisa en consola |
| `PUBLIC_FACEBOOK_URL`, `PUBLIC_INSTAGRAM_URL`, `PUBLIC_TIKTOK_URL` | Iconos de redes del pie de página | El enlace queda en `#` |

Los tipos de estas variables están en `src/env.d.ts`.

## Datos

| Archivo | Contenido |
|---|---|
| `src/data/config.ts` | Datos del sitio, **sucursales** (dirección, teléfonos, coordenadas, opciones de sus fotos), navegación, redes y orden de las ciudades del banner de Eventos |
| `src/data/contenido.ts` | Textos y metadatos (título y descripción) de las páginas |
| `src/data/menu.ts` | Productos del menú: imágenes, colores y posiciones |

### Agregar o cambiar una sucursal

1. Edita `sucursales` en `config.ts` (el `slug` define la URL `/sucursales#slug`).
2. Añade sus 3 fotos en `src/assets/sucursales/` con el nombre `sucursal-<slug>-1.png`, `-2.png` y `-3.png`.
3. Opcionales en la misma sucursal: `mosaicoInvertido: true` (la foto alta del mosaico móvil va en la 2.ª posición) y `encuadreFotos: { 2: '50% 72%' }` (encuadre de una foto concreta).
4. Si debe salir en el banner de Eventos, agrega su `slug` a `ordenCiudadesEventos`.

El pie de página, Contacto, Eventos, Sucursales y el mapa se actualizan solos.

## Dominio y SEO

- El dominio está en dos sitios: `site` de `astro.config.mjs` (sitemap, canonical y Open Graph) y `site.url` de `src/data/config.ts` (datos estructurados). Si cambia, actualiza ambos y `public/robots.txt`.
- La imagen para compartir es `public/og-rex-burger.jpg` (1200 × 630). Reemplázala por la definitiva con el mismo nombre.
- Los datos estructurados de las sucursales salen de `sucursales` (nombre, ciudad, dirección, teléfono y coordenadas). Cada sucursal necesita su campo `ciudad`.
