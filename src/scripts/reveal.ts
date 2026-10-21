/*
 * Animación de entrada al hacer scroll.
 *
 * Los elementos de `OBJETIVOS` aparecen con un fundido (clase `.reveal`, definida en global.css) cuando
 * entran en pantalla. Si añades una sección nueva con elementos que deban animarse, agrega aquí su selector.
 * Con `prefers-reduced-motion` no se anima nada: el contenido queda visible desde el inicio.
 */
import { sinMovimiento } from './utiles';

const OBJETIVOS = [
  '.menu h2', '.menu .item',
  '.eventos > *:not(.bg)', '.merch > *:not(.bg)',
  '.ubicaciones .frase', '.ubicaciones li',
  '.sec h2', '.sec .a', '.sec .fun', '.sec .lbl',
  '.wrap section', '.grid li', '.footer .branches li', '.info > *', '.contacto h1, .contacto li',
];

if (!sinMovimiento() && 'IntersectionObserver' in window) {
  const elementos = [...document.querySelectorAll<HTMLElement>(OBJETIVOS.join(','))];
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          observador.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
  );

  elementos.forEach((el, i) => {
    if (el.closest('.hero')) return;
    el.classList.add('reveal');
    if (el.matches('.sec .a, .sec .fun, .sec .lbl')) {
      // Menú: entran desde el lado en el que están colocados.
      const r = el.getBoundingClientRect();
      const sec = el.closest('.sec')!.getBoundingClientRect();
      el.classList.add(r.left + r.width / 2 < sec.left + sec.width / 2 ? 'reveal-left' : 'reveal-right');
    } else if (el.matches('.a, .ico')) {
      el.classList.add('reveal-zoom');
    }
    // Pequeño desfase entre elementos vecinos.
    el.style.setProperty('--d', `${(i % 3) * 0.08}s`);
    observador.observe(el);
  });
}
