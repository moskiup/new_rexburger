export const site = {
  nombre: 'Rex Burger',
  lema: 'California Style',
  titulo: 'Rex Burger | California Style',
  descripcion:
    'Hamburguesas Rex Burger California Style. ¡Haz tu día más rexquisito! Sucursales en Atotonilco, Arandas, La Barca, Capilla de Guadalupe y Zapotlanejo.',
  idioma: 'es-MX',
  colorTema: '#bc1417',
  ladaPais: '52',
  /**
   * Número que recibe los pedidos del carrito (formato internacional, sin + ni espacios).
   * Se configura en .env con PUBLIC_WHATSAPP_PEDIDOS; mientras no exista se usa el de la sucursal Atotonilco.
   */
  whatsappPedidos: import.meta.env.PUBLIC_WHATSAPP_PEDIDOS || '523911255845',
};

if (import.meta.env.PROD && !import.meta.env.PUBLIC_WHATSAPP_PEDIDOS) {
  console.warn('[config] Falta PUBLIC_WHATSAPP_PEDIDOS en .env: los pedidos del carrito irán al número provisional.');
}

export interface Sucursal {
  slug: string;
  nombre: string;
  corto: string;
  direccion: string;
  whatsapp: string;
  telefono: string;
  coords: [number, number];
  /** Sucursales cuyo mosaico de fotos (en móvil) lleva la foto alta en la 2.ª posición en lugar de la 3.ª. */
  mosaicoInvertido?: boolean;
  /** Encuadre (object-position) de fotos concretas, por número de foto, cuando el sujeto no está al centro. */
  encuadreFotos?: Record<number, string>;
}

export const sucursales: Sucursal[] = [
  {
    slug: 'atotonilco',
    nombre: 'Atotonilco',
    corto: 'Suc. Atotonilco',
    direccion: 'Hidalgo #102. Col. Centro, Atotonilco el Alto, Jal.',
    whatsapp: '391 125 5845',
    telefono: '391 917 5488',
    coords: [20.5517, -102.5078],
    encuadreFotos: { 2: '50% 72%' },
  },
  {
    slug: 'arandas',
    nombre: 'Arandas',
    corto: 'Suc. Arandas',
    direccion: 'Hernández #82. Arandas, Jal.',
    whatsapp: '348 129 0888',
    telefono: '348 783 5010',
    coords: [20.7054, -102.3457],
  },
  {
    slug: 'la-barca',
    nombre: 'La Barca',
    corto: 'Suc. La Barca',
    direccion: 'Hidalgo #342 B. La Barca, Jal.',
    whatsapp: '393 933 5590',
    telefono: '393 759 6283',
    coords: [20.2891, -102.5453],
    mosaicoInvertido: true,
  },
  {
    slug: 'capilla-de-gpe',
    nombre: 'Capilla de GPE',
    corto: 'Suc. Capilla de GPE',
    direccion: 'San Antonio #248. Capilla de Guadalupe, Jal.',
    whatsapp: '378 218 2115',
    telefono: '378 104 7289',
    coords: [20.9442, -102.5253],
  },
  {
    slug: 'zapotlanejo',
    nombre: 'Zapotlanejo',
    corto: 'Suc. Zapotlanejo',
    direccion: 'Alvaro Obregón #42 A. Frente a Banamex',
    whatsapp: '373 106 6923',
    telefono: '333 468 1465',
    coords: [20.6233, -103.0642],
    mosaicoInvertido: true,
  },
];

export const nav = [
  { label: 'Inicio', href: '/' },
  { label: 'Sucursales', href: '/sucursales' },
  { label: 'Menú', href: '/menu' },
  { label: 'Merch', href: '/merch' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Contacto', href: '/contacto' },
];

/** Redes sociales. Se configuran en .env; sin valor, el enlace queda en '#'. */
export const redes = {
  facebook: import.meta.env.PUBLIC_FACEBOOK_URL || '#',
  instagram: import.meta.env.PUBLIC_INSTAGRAM_URL || '#',
  tiktok: import.meta.env.PUBLIC_TIKTOK_URL || '#',
};

/** Orden en que se listan las ciudades del banner de Eventos (la referencia no sigue el orden de `sucursales`). */
const ordenCiudadesEventos = ['atotonilco', 'la-barca', 'arandas', 'capilla-de-gpe', 'zapotlanejo'];
export const ciudadesEventos = ordenCiudadesEventos
  .map((slug) => sucursales.find((s) => s.slug === slug)?.nombre)
  .filter((nombre): nombre is string => Boolean(nombre));
