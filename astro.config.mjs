// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio de producción: lo usan el sitemap, las URL canónicas y las etiquetas Open Graph.
  site: 'https://rexburger.com.mx',
  integrations: [sitemap()],
  // El CSS total es pequeño: en línea evita peticiones que bloquean el primer pintado en móvil.
  build: { inlineStylesheets: 'always' },
});
