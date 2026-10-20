// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // El CSS total es pequeño: en línea evita peticiones que bloquean el primer pintado en móvil.
  build: { inlineStylesheets: 'always' },
});
