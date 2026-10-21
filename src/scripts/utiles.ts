/** `true` si la persona pidió reducir el movimiento (accesibilidad): no se anima nada. */
export const sinMovimiento = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Llama a `cuando(visible)` cada vez que `el` entra o sale de la pantalla. `umbral` es la fracción visible (0 a 1). */
export function alCambiarVisibilidad(el: Element, umbral: number, cuando: (visible: boolean) => void) {
  new IntersectionObserver((entradas) => cuando(entradas[0].isIntersecting), { threshold: umbral }).observe(el);
}
