import { kid, logoRect, type BB } from '../lib/menu-layout';

import rexClasica from '../assets/menu/rex-clasica.webp';
import rexDoble from '../assets/menu/rex-doble.webp';
import rexPollo from '../assets/menu/rex-pollo.webp';
import rexGreen from '../assets/menu/green-burger.webp';
import rexKids from '../assets/menu/rex-kids.webp';
import comboClasica from '../assets/menu/combo-rex-clasica.webp';
import comboDoble from '../assets/menu/combo-rex-doble.webp';
import comboPollo from '../assets/menu/combo-rex-pollo.webp';
import comboGreen from '../assets/menu/combo-rex-green.webp';
import papasFrancesa from '../assets/menu/papas-a-la-francesa.png';
import papasRex from '../assets/menu/papas-rex.png';
import papasWaffle from '../assets/menu/papas-waffle.png';
import aros from '../assets/menu/aros-de-cebolla-y-nuggets.png';
import aguaNatural from '../assets/menu/agua-natural.webp';
import refrescos from '../assets/menu/refrescos.webp';
import aguaFresca from '../assets/menu/agua-fresca.webp';
import logoCoca from '../assets/menu/bebidas-coca.webp';
import logoZero from '../assets/menu/bebidas-coca-zero.webp';
import logoLight from '../assets/menu/bebidas-coca-light.webp';
import logoSprite from '../assets/menu/bebidas-sprite.webp';
import logoMundet from '../assets/menu/bebidas-mundet.webp';
import logoFanta from '../assets/menu/bebidas-fanta.webp';
import logoFuze from '../assets/menu/bebidas-fuze-tea.webp';
import kCaja from '../assets/menu/menukids-caja-rexykids.png';
import kHamb from '../assets/menu/menukids-hamburguesa.webp';
import kJuguete from '../assets/menu/menukids-juguete.webp';
import kNuggets from '../assets/menu/menukids-nuggets.webp';
import kPapas from '../assets/menu/menukids-papas.webp';
import kJugo from '../assets/menu/bebidas-jugo.png';
import cajeta from '../assets/menu/menu-malteada-cajeta.png';
import vainilla from '../assets/menu/menu-malteada-vainilla.png';
import mazapan from '../assets/menu/menu-malteada-mazapan.png';
import oreo from '../assets/menu/menu-malteada-oreo.png';
import cono from '../assets/menu/cono-de-vainilla.webp';

/** Paleta del menú (colores de los nombres de producto y de los fondos). */
export const C = {
  orange: '#f39c12',
  brown: '#7a2a10',
  red: '#bc1417',
  green: '#3fa34d',
  dark: '#8e0f14',
  navy: '#1f3059',
  cream: '#efebe0',
} as const;

/* ---------- Hamburguesas ---------- */
export const hamburguesas = [
  { img: rexClasica, box: [5.8, 417.5, 578], label: ['REX', 'CLÁSICA'], color: C.orange, side: 'l', Y: 407 },
  { img: rexDoble, box: [333, 542.5, 581], label: ['REX', 'DOBLE'], color: C.brown, side: 'r', Y: 552 },
  { img: rexPollo, box: [-9.5, 840, 577], label: ['REX', 'POLLO'], color: C.red, side: 'l', Y: 857 },
  { img: rexGreen, box: [350.4, 1048, 572], label: ['REX', 'GREEN'], color: C.green, side: 'r', Y: 1088 },
  { img: rexKids, box: [-84, 1321.5, 635], label: ['REX', 'KIDS'], color: C.dark, side: 'l', Y: 1312 },
] as const;

/* ---------- Combos ---------- */
export const combos = [
  { img: comboClasica, cx: 237.5, Y: 593, ly: 517, label: ['REX', 'CLÁSICA'], color: C.orange },
  { img: comboDoble, cx: 664, Y: 593, ly: 517, label: ['REX', 'DOBLE'], color: C.red },
  { img: comboPollo, cx: 237.5, Y: 950, ly: 884, label: ['REX', 'POLLO'], color: C.brown },
  { img: comboGreen, cx: 664, Y: 950, ly: 884, label: ['REX', 'GREEN'], color: C.green },
] as const;
export const COMBO_W = 371;

/* ---------- Complementos ---------- */
/**
 * Cada complemento es una celda de media sección (450 de ancho de referencia): franja de color y foto
 * del producto. La franja es CSS; las fotos (PNG) vienen solo con el producto y su sombra.
 * - `box`: [X, Y, ancho] de la celda en coordenadas de referencia; `ar`: ancho/alto de la celda.
 * - `fin`: extremo redondeado de la franja ('d' derecha, 'i' izquierda); `banda`: [x0, x1, y0, y1] en fracción de la celda.
 * - `prod`: left, ancho y top de la foto en % de la celda (medidos para que el producto ocupe el mismo sitio que antes).
 * - `lado`, `tx`, `ty`: posición del texto en coordenadas de referencia.
 */
export const complementos = [
  {
    img: papasFrancesa, alt: 'Papas a la francesa', box: [0, 2788, 450], ar: 450 / 150.0, fin: 'd', fondo: '#f39300',
    banda: [0, 0.811, 0, 1], prod: { l: 46.67, w: 60.13, t: -3.6 },
    texto: 'PAPAS A LA<br>FRANCESA', color: C.red, lado: 'r', tx: 248.7, ty: 2863,
  },
  {
    img: papasRex, alt: 'Papas Rex', box: [450, 2788, 450], ar: 450 / 150.0, fin: 'i', fondo: '#eeece1',
    banda: [0.189, 1, 0, 1], prod: { l: 1.22, w: 43.69, t: 27.3 },
    texto: 'PAPAS REX', color: C.red, lado: 'l', tx: 656.3, ty: 2863,
  },
  {
    img: papasWaffle, alt: 'Papas waffle', box: [0, 2976.5, 450], ar: 450 / 145.0, fin: 'd', fondo: '#900413',
    banda: [0, 0.811, 0, 1], prod: { l: 47.08, w: 59.61, t: 18.36 },
    texto: 'PAPAS WAFFLE', color: C.orange, lado: 'r', tx: 248.7, ty: 3049,
  },
  {
    img: aros, alt: 'Aros de cebolla y nuggets', box: [450, 2976.5, 450], ar: 450 / 145.0, fin: 'i', fondo: '#f7b000',
    banda: [0.189, 1, 0, 1], prod: { l: -7.74, w: 60.21, t: -15.33 },
    texto: 'AROS DE<br>CEBOLLA Y<br>NUGGETS', color: C.red, lado: 'l', tx: 656.3, ty: 3049,
  },
] as const;
/** Versión móvil: lo mismo, con el texto expresado en % de su celda. */
export const complementosMovil = complementos.map((c) => ({
  ...c,
  lx: ((c.tx - c.box[0]) / 450) * 100,
  ly: ((c.ty - c.box[1]) / (450 / c.ar)) * 100,
}));

/* ---------- Cajita Rexy Kids ---------- */
const piezas = [
  { img: kCaja, alt: 'Caja Rexy Kids', bb: [110, 128, 1216, 1185] as BB, cx: 492, cy: 215, w: 385, dur: 6, delay: 0, rot: 1.5 },
  { img: kNuggets, alt: 'Nuggets de pollo', bb: [81, 137, 485, 463] as BB, cx: 745, cy: 255, w: 200, dur: 5, delay: -1.2, rot: 3 },
  { img: kPapas, alt: 'Papas a la francesa', bb: [62, 66, 530, 673] as BB, cx: 201, cy: 381, w: 178, dur: 5.5, delay: -2.4, rot: 3 },
  { img: kJuguete, alt: 'Dinosaurio de juguete', bb: [121, 116, 471, 490] as BB, cx: 222, cy: 180, w: 115, dur: 4, delay: -0.6, rot: 5 },
  { img: kHamb, alt: 'Hamburguesa Kids', bb: [85, 78, 547, 458] as BB, cx: 604, cy: 411, w: 208, dur: 5.2, delay: -3, rot: 3 },
  { img: kJugo, alt: 'Jugo', bb: [157, 89, 443, 736] as BB, cx: 815, cy: 361, w: 100, dur: 4.6, delay: -1.8, rot: 4 },
];
export const kids = piezas.map((p) => ({
  img: p.img,
  alt: p.alt,
  ...kid(p.img, p.bb, p.cx, p.cy, p.w, p.dur, p.delay, p.rot),
}));

/* ---------- Bebidas ---------- */
export const botellas = [
  { img: aguaNatural, alt: 'Agua natural', box: [241, 4198, 209] as const, delay: '0s', texto: 'AGUA<br>NATURAL' },
  { img: refrescos, alt: 'Refresco', box: [339, 4240, 218] as const, delay: '-1.4s', texto: 'REFRESCO' },
  { img: aguaFresca, alt: 'Agua fresca', box: [441, 4268, 226] as const, delay: '-2.8s', texto: 'AGUA<br>FRESCA' },
];
export const logos = [
  { img: logoCoca, alt: 'Coca-Cola', bb: [20, 41, 283, 127] as BB, ...logoRect(25, 66, 356, 175) },
  { img: logoZero, alt: 'Coca-Cola Zero', bb: [0, 0, 299, 133] as BB, ...logoRect(452, 56, 739, 183) },
  { img: logoLight, alt: 'Coca-Cola Light', bb: [0, 0, 299, 137] as BB, ...logoRect(840, 56, 1119, 183) },
  { img: logoSprite, alt: 'Sprite', bb: [1, 0, 298, 211] as BB, ...logoRect(1218, 42, 1437, 198) },
  { img: logoMundet, alt: 'Mundet', bb: [0, 62, 299, 239] as BB, ...logoRect(1532, 49, 1771, 192) },
  { img: logoFanta, alt: 'Fanta', bb: [0, 0, 299, 214] as BB, ...logoRect(1868, 38, 2095, 201) },
  { img: logoFuze, alt: 'Fuze Tea', bb: [0, 0, 299, 214] as BB, ...logoRect(2194, 46, 2399, 193) },
];

/* ---------- Malteadas ---------- */
export const malteadas = [
  { img: cajeta, box: [183.2, 4716.2, 292.7], label: 'CAJETA', side: 'r', lx: 245, ly: 4904.5 },
  { img: vainilla, box: [414.9, 4816.2, 291.3], label: 'VAINILLA', side: 'l', lx: 668, ly: 4985.5 },
  { img: mazapan, box: [184.1, 4973, 292.6], label: 'MAZAPÁN', side: 'r', lx: 245, ly: 5161.5 },
  { img: oreo, box: [424.9, 5060, 292.3], label: 'OREO', side: 'l', lx: 668, ly: 5249.5 },
] as const;
export const conoVainilla = { img: cono, box: [299.7, 5270, 130] as const, textoX: 458, textoY: 5417.5 };
