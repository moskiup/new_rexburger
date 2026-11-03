// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dirección del sitio: la usan el sitemap, las URL canónicas, las etiquetas Open Graph y robots.txt.
  // Por defecto es el dominio final; el despliegue en un subdominio la cambia con PUBLIC_SITE_URL.
  site: process.env.PUBLIC_SITE_URL || 'https://rexburger.com.mx',
  integrations: [sitemap()],
  // El CSS total es pequeño: en línea evita peticiones que bloquean el primer pintado en móvil.
  build: { inlineStylesheets: 'always' },
});
