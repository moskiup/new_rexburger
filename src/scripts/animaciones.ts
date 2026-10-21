/*
 * Animaciones con comportamiento (JavaScript). Cada una se activa con un atributo en el HTML:
 *
 *   data-anim="deslizar"  Sección cuyo contenido entra deslizándose cada vez que aparece (camión de Eventos).
 *   data-anim="escribir"  Título que se escribe letra por letra, se borra y se repite mientras se ve.
 *   data-anim="ola"       Texto con ola (componente TextoOla): la reinicia cada vez que entra en pantalla.
 *   data-anim="zoom-par"  Sección donde cada texto [data-zoom-txt] y su imagen [data-zoom-img] crecen juntos.
 *
 * Los estilos de cada una viven en el componente que usa el atributo. La entrada al hacer scroll
 * (clase .reveal) está en reveal.ts. Con `prefers-reduced-motion` no se anima nada.
 */
import { alCambiarVisibilidad, sinMovimiento } from './utiles';

const elementos = (tipo: string) => document.querySelectorAll<HTMLElement>(`[data-anim="${tipo}"]`);

/* ---------- deslizar: entra desde un lado cada vez que la sección aparece ---------- */
function deslizar(seccion: HTMLElement) {
  // Si ya está a la vista al cargar la página, aparece en su sitio sin deslizarse la primera vez.
  seccion.classList.add('slide', 'instant');
  let primera = true;
  alCambiarVisibilidad(seccion, 0.35, (visible) => {
    if (primera) {
      primera = false;
      if (!visible) seccion.classList.remove('instant');
      seccion.classList.toggle('go', visible);
      if (visible) requestAnimationFrame(() => requestAnimationFrame(() => seccion.classList.remove('instant')));
      return;
    }
    seccion.classList.toggle('go', visible);
  });
}

/* ---------- escribir: efecto de escritura ---------- */
const PAUSA_LETRA = 120; // ms entre letras al escribir
const PAUSA_BORRAR = 70; // ms entre letras al borrar
const PAUSA_COMPLETO = 4500; // ms con el texto completo
const PAUSA_VACIO = 500; // ms con el texto vacío antes de repetir

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

function escribir(titulo: HTMLElement) {
  const texto = titulo.textContent!.trim();
  titulo.setAttribute('aria-label', texto);
  titulo.classList.add('typing');
  // `.typed` lleva el cursor; `.rest` reserva el espacio del texto que falta para que el diseño no se mueva.
  const escrito = document.createElement('span');
  const resto = document.createElement('span');
  escrito.className = 'typed';
  resto.className = 'rest';
  escrito.setAttribute('aria-hidden', 'true');
  resto.setAttribute('aria-hidden', 'true');
  titulo.replaceChildren(escrito, resto);

  const mostrar = (n: number) => {
    escrito.textContent = texto.slice(0, n);
    resto.textContent = texto.slice(n);
  };
  mostrar(0);

  let visible = false;
  let corriendo = false;
  const ciclo = async () => {
    if (corriendo) return;
    corriendo = true;
    for (let i = 0; i <= texto.length; i++) {
      mostrar(i);
      await dormir(PAUSA_LETRA);
    }
    await dormir(PAUSA_COMPLETO);
    for (let i = texto.length; i >= 0; i--) {
      mostrar(i);
      await dormir(PAUSA_BORRAR);
    }
    await dormir(PAUSA_VACIO);
    corriendo = false;
    if (visible) ciclo();
  };
  alCambiarVisibilidad(titulo, 0.4, (v) => {
    visible = v;
    if (v) ciclo();
  });
}

/* ---------- ola: reinicia la animación cada vez que el texto entra en pantalla ---------- */
function ola(texto: HTMLElement) {
  alCambiarVisibilidad(texto, 0.5, (visible) => {
    texto.classList.remove('on');
    if (visible) {
      void texto.offsetWidth; // fuerza el reflujo para que las animaciones empiecen de cero
      texto.classList.add('on');
    }
  });
}

/* ---------- zoom-par: cada texto activa el zoom de su imagen y al revés ---------- */
function zoomEnPareja(seccion: HTMLElement) {
  const imagenes = seccion.querySelectorAll<HTMLElement>('[data-zoom-img]');
  const textos = seccion.querySelectorAll<HTMLElement>('[data-zoom-txt]');
  imagenes.forEach((img, i) => {
    const t = textos[i];
    if (!t) return;
    const activar = () => { img.classList.add('zoom'); t.classList.add('zoom'); };
    const quitar = () => { img.classList.remove('zoom'); t.classList.remove('zoom'); };
    [img, t].forEach((el) => {
      el.addEventListener('pointerenter', activar);
      el.addEventListener('pointerleave', quitar);
    });
  });
}

/* ---------- arranque ---------- */
// El zoom por puntero y la ola (que usa animaciones CSS ya reducidas por el navegador) no dependen del movimiento reducido.
elementos('zoom-par').forEach(zoomEnPareja);
elementos('ola').forEach((el) => ('IntersectionObserver' in window ? ola(el) : el.classList.add('on')));
if (!sinMovimiento()) {
  elementos('deslizar').forEach(deslizar);
  elementos('escribir').forEach(escribir);
}
