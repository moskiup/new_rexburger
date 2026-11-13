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
  '.sec h2', '.sec .a', '.sec .fun', '.sec .lbl', '.combos .item', '.malteadas .item', '.malteadas .cono', '.complementos .fila',
  '.wrap section', '.grid li', '.footer .branches li:not(.sep)', '.info > *', '.contacto h1, .contacto li',
];

/** Secciones cuya entrada se repite al volver a verlas. */
const REPETIR = '#hamburguesas, #combos, #malteadas, #complementos';
/** Los elementos que ya están a la vista al cargar la página esperan este tiempo antes de entrar. */
const RETARDO_CARGA_MS = 300;
let cargando = true;

if (!sinMovimiento() && 'IntersectionObserver' in window) {
  const elementos = [...document.querySelectorAll<HTMLElement>(OBJETIVOS.join(','))];
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.target.closest(REPETIR)) {
          // Hamburguesas y Combos: la entrada lateral se repite cada vez que vuelven a aparecer.
          if (cargando && e.isIntersecting) setTimeout(() => e.target.classList.add('in'), RETARDO_CARGA_MS);
          else e.target.classList.toggle('in', e.isIntersecting);
        } else if (e.isIntersecting) {
          e.target.classList.add('in');
          observador.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
  );

  elementos.forEach((el, i) => {
    // Los logos de bebidas no se animan: quedan fijos.
    if (el.closest('.hero') || el.matches('.logo')) return;
    el.classList.add('reveal');
    if (el.matches('.sec .a, .sec .fun, .sec .lbl')) {
      // Menú: entran desde el lado en el que están colocados.
      const r = el.getBoundingClientRect();
      const sec = el.closest('.sec')!.getBoundingClientRect();
      el.classList.add(r.left + r.width / 2 < sec.left + sec.width / 2 ? 'reveal-left' : 'reveal-right');
    } else if (el.matches('.combos .item, .malteadas .item, .malteadas .cono, .complementos .fila')) {
      // Móvil: Combos y Complementos (una columna) entran alternando lado; Malteadas (dos columnas) desde su propia columna; el cono, desde la derecha.
      el.classList.add(el.matches('.cono, :nth-child(even)') ? 'reveal-right' : 'reveal-left');
    } else if (el.matches('.a, .ico')) {
      el.classList.add('reveal-zoom');
    }
    // Pequeño desfase entre elementos vecinos.
    el.style.setProperty('--d', `${(i % 3) * 0.08}s`);
    observador.observe(el);
  });
  // El primer aviso del observador llega justo después de observar: pasado ese instante ya no se considera carga.
  setTimeout(() => (cargando = false), 150);
}
