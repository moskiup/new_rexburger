import type { APIRoute } from 'astro';
import { site } from '../data/config';

// Se genera al compilar para que el sitemap apunte al dominio de cada despliegue.
export const GET: APIRoute = () => {
  const cuerpo = site.noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap-index.xml\n`;
  return new Response(`# ${site.url}\n${cuerpo}`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
