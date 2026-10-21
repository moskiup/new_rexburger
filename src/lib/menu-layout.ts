/*
 * Geometría de la página Menú.
 *
 * El diseño de escritorio es un port fiel de la referencia de 900 px de ancho: cada pieza se coloca en
 * coordenadas de referencia (X, Y) y se convierte a porcentajes de su sección, de modo que toda la página
 * escala de forma uniforme. Los tamaños de letra usan cqw (porcentaje del ancho de la sección).
 *
 * Las funciones devuelven propiedades personalizadas de CSS (--l, --t, --w...) en vez de left/top/width.
 * Las clases de `src/styles/menu.css` las leen; así, en móvil cada componente puede sobrescribir las
 * propiedades reales con estilos normales, sin `!important`.
 */
export const REF_W = 900;

export type Dim = { width: number; height: number };
export type Sec = { top: number; h: number };
/** Caja del contenido visible de un PNG: [x0, y0, x1, y1] en píxeles. */
export type BB = [number, number, number, number];

/** Radio de las esquinas redondeadas de los fondos de color. */
export const R = '33.3cqw';

/** Proporción del arte original de cada sección (el fondo ahora es color CSS; solo se conserva la proporción). */
export const DIM = {
  hamb: { width: 2400, height: 4096 },
  combos: { width: 2400, height: 2434 },
  compl: { width: 2400, height: 1542 },
  cajita: { width: 2400, height: 2213 },
  bebidas: { width: 2400, height: 1459 },
  malt: { width: 2400, height: 2589 },
} satisfies Record<string, Dim>;

const sec = (top: number, d: Dim): Sec => ({ top, h: (d.height * REF_W) / d.width });

/** Posición vertical (en coordenadas de referencia) donde empieza cada sección. */
export const S = {
  hamb: sec(172.9, DIM.hamb),
  combos: sec(1708.9, DIM.combos),
  compl: sec(2621.6, DIM.compl),
  cajita: sec(3199.9, DIM.cajita),
  bebidas: sec(4029.8, DIM.bebidas),
  malt: sec(4576.9, DIM.malt),
};

const y = (s: Sec, Y: number) => `${(((Y - s.top) / s.h) * 100).toFixed(3)}%`;
const x = (X: number) => `${((X / REF_W) * 100).toFixed(3)}%`;
const cq = (px: number) => `${((px / REF_W) * 100).toFixed(3)}cqw`;

/** Fondo de color liso con esquinas redondeadas: proporción, color de relleno, colores de las esquinas y radio. */
export const shape = (d: Dim, fill: string, cl: string, cr: string, radius: string) =>
  `--ar:${d.width}/${d.height};--fill:${fill};--cl:${cl};--cr:${cr};--r:${radius}`;

/** Sección sin esquinas redondeadas: solo la proporción. */
export const ratio = (d: Dim) => `--ar:${d.width}/${d.height}`;

/** Caja de una imagen: left/top en coordenadas de referencia y ancho en px de referencia. */
export const box = (s: Sec, X: number, Y: number, w: number) => `--l:${x(X)};--t:${y(s, Y)};--w:${x(w)}`;

/** Texto anclado a la izquierda ('l'), a la derecha ('r') o centrado ('c') sobre un centro vertical. */
export const txt = (s: Sec, align: 'l' | 'r' | 'c', X: number, Yc: number, size: number) => {
  const pos = align === 'r' ? `--r:${x(REF_W - X)}` : `--l:${x(X)}`;
  const tf = align === 'c' ? 'translate(-50%,-50%)' : 'translateY(-50%)';
  const ta = align === 'l' ? 'left' : align === 'r' ? 'right' : 'center';
  // El texto pequeño nunca baja de 12px.
  const fs = size < 30 ? `max(12px,${cq(size)})` : cq(size);
  return `${pos};--t:${y(s, Yc)};--tf:${tf};--fs:${fs};--ta:${ta}`;
};

/** Título centrado en la sección. */
export const title = (s: Sec, Yc: number, size: number) =>
  `--l:50%;--t:${y(s, Yc)};--tf:translate(-50%,-50%);--fs:${cq(size)}`;

/** Coloca una pieza suelta para que su contenido (bbox en px del PNG) ocupe el ancho `w`, centrado en (cx, cy). */
export const fit = (s: Sec, img: Dim, bb: BB, cx: number, cy: number, w: number) => {
  const bw = bb[2] - bb[0] + 1;
  const bh = bb[3] - bb[1] + 1;
  const k = w / bw;
  return box(s, cx - (bb[0] + bw / 2) * k, cy - (bb[1] + bh / 2) * k, img.width * k);
};

/* ---------- Cajita Rexy Kids: "escenario" con la proporción de la composición original (1000 x 556) ---------- */
const STAGE_W = 1000;
const STAGE_H = 556;
const pct = (l: number, t: number, w: number) =>
  `--l:${(l / STAGE_W) * 100}%;--t:${(t / STAGE_H) * 100}%;--w:${(w / STAGE_W) * 100}%`;

/** El escenario dentro de la sección (x=117, y=3462, 672 px de ancho de referencia). */
export const stageStyle = `--l:${x(117)};--t:${y(S.cajita, 3462)};--w:${x(672)}`;

/** Una pieza de la Cajita: posición dentro del escenario, de su sombra, y datos de su animación flotante. */
export const kid = (
  img: Dim,
  bb: BB,
  cx: number,
  cy: number,
  w: number,
  dur: number,
  delay: number,
  rot: number,
) => {
  const bw = bb[2] - bb[0] + 1;
  const bh = bb[3] - bb[1] + 1;
  const k = w / bw;
  return {
    dur,
    delay,
    rot,
    piece: pct(cx - (bb[0] + bw / 2) * k, cy - (bb[1] + bh / 2) * k, img.width * k),
    // Sombra: 1.5 veces el ancho de la pieza, apoyada en su base.
    shadow: pct(cx - w * 0.75, cy + (bh * k) / 2 - (w * 1.5 * 80) / 600 / 2 + 9, w * 1.5),
  };
};

/* ---------- Logos de refrescos: fila original (x=118, y=4469, 662 px de ancho sobre 2400) ---------- */
const LK = 662 / 2400;
export const logoRect = (x0: number, y0: number, x1: number, y1: number) => ({
  cx: 118 + ((x0 + x1 + 1) / 2) * LK,
  cy: 4469 + ((y0 + y1 + 1) / 2) * LK,
  w: (x1 - x0 + 1) * LK,
});

/** Complementos en móvil: posición del texto dentro de cada imagen (% del ancho y del alto de la imagen). */
export const cmPos = (img: Dim, boxX: number, boxY: number, tx: number, ty: number) => ({
  lx: ((tx - boxX) / 450) * 100,
  ly: ((ty - boxY) / ((450 * img.height) / img.width)) * 100,
});
