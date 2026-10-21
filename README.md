# Rex Burger – sitio web

Sitio de Rex Burger California Style: inicio, menú, sucursales, merch (con pedido por WhatsApp), eventos y contacto. Hecho con [Astro](https://astro.build) y CSS propio, sin librerías de interfaz.

## Empezar

Requiere Node 22.22 o superior y [bun](https://bun.sh).

```sh
bun install
cp .env.example .env     # y completa los valores (ver docs/configuracion.md)
bun run dev              # http://localhost:4321
```

| Comando | Qué hace |
|---|---|
| `bun run dev` | Servidor de desarrollo |
| `bun run build` | Genera el sitio estático en `dist/` |
| `bun run preview` | Sirve `dist/` para probar el build |
| `bun run check` | Revisa tipos de los `.astro` y `.ts` |

## Estructura

```text
src/
  assets/       Imágenes (WebP y PNG; Astro las optimiza al compilar)
  components/   Header, Footer, Loader, carrusel, banners y las secciones del menú (menu/)
  data/         Sucursales y enlaces (config.ts), textos (contenido.ts), productos (menu.ts)
  layouts/      Layout.astro con cabecera, pie y scripts globales
  lib/          Funciones de posicionamiento del menú y enlaces de contacto
  pages/        Una página por ruta
  scripts/      Animaciones con JavaScript (entrada al scroll, escritura, ola, mapa)
  styles/       global.css (tokens y base) y menu.css
docs/           Documentación del proyecto
public/fonts/   Tipografías en WOFF2
```

## Documentación

- [`docs/configuracion.md`](docs/configuracion.md): variables de entorno y dónde editar cada dato.
- [`docs/sistema-de-diseno.md`](docs/sistema-de-diseno.md): breakpoint, tokens de tamaño y reglas de accesibilidad.

## Antes de publicar

- Las tipografías Extenda son versiones **de prueba** (`trial`): hay que comprar la licencia.
- Completar `.env` con el número de pedidos y las redes; sin ellos el carrito usa un número provisional.
- Las imágenes de referencia del diseño (`meta/`) y los documentos privados no se versionan.
