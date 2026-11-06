export const site = {
  nombre: 'Rex Burger',
  lema: 'California Style',
  titulo: 'Rex Burger California Style | Hamburguesas en Jalisco',
  descripcion:
    'Hamburguesas Rex Burger California Style. ¡Haz tu día más rexquisito! Sucursales en Atotonilco, Arandas, La Barca, Capilla de Guadalupe y Zapotlanejo.',
  idioma: 'es-MX',
  colorTema: '#bc1417',
  ladaPais: '52',
  /** Dirección pública del sitio, sin barra final. Viene de `site` en astro.config.mjs (SITE_URL). */
  url: (import.meta.env.SITE || 'https://rexburger.com.mx').replace(/\/$/, ''),
  /** `true` en entornos de prueba o de subdominio: pide a los buscadores no indexar el sitio. */
  noindex: import.meta.env.PUBLIC_NOINDEX === 'true',
  /** Imagen para compartir en redes (1200 x 630, en public/). */
  imagenCompartir: '/og-rex-burger.jpg',
  /**
   * Número que recibe los pedidos del carrito (formato internacional, sin + ni espacios).
   * Se configura en .env con PUBLIC_WHATSAPP_PEDIDOS; mientras no exista se usa el de la sucursal Atotonilco.
   */
  whatsappPedidos: import.meta.env.PUBLIC_WHATSAPP_PEDIDOS || '523911255845',
};

if (import.meta.env.PROD && !import.meta.env.PUBLIC_WHATSAPP_PEDIDOS) {
  console.warn('[config] Falta PUBLIC_WHATSAPP_PEDIDOS en .env: los pedidos del carrito irán al número provisional.');
}

export type Dia = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export const TODOS_LOS_DIAS: Dia[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** Un tramo de horario: los días en que aplica y la hora de apertura y cierre (24 h, "HH:MM"). */
export interface TramoHorario {
  dias: Dia[];
  abre: string;
  cierra: string;
}

export interface Sucursal {
  slug: string;
  nombre: string;
  corto: string;
  /** Ciudad y estado, para los datos estructurados de Google. */
  ciudad: string;
  /** Código postal (opcional), para los datos estructurados de Google. */
  codigoPostal?: string;
  /** Horario de atención (opcional). Si falta, Google no recibe horario de esa sucursal. */
  horario?: TramoHorario[];
  direccion: string;
  whatsapp: string;
  telefono: string;
  coords: [number, number];
  /** Descripción de cada una de las 3 fotos (texto alternativo). */
  altFotos: [string, string, string];
  /** Sucursales cuyo mosaico de fotos (en móvil) lleva la foto alta en la 2.ª posición en lugar de la 3.ª. */
  mosaicoInvertido?: boolean;
  /** Encuadre (object-position) de fotos concretas, por número de foto, cuando el sujeto no está al centro. */
  encuadreFotos?: Record<number, string>;
}

export const sucursales: Sucursal[] = [
  {
    slug: 'atotonilco',
    nombre: 'Atotonilco',
    ciudad: 'Atotonilco el Alto',
    codigoPostal: '47750',
    // Ficha de Google Maps: todos los días de 1:00 p. m. a 10:00 p. m.
    horario: [{ dias: TODOS_LOS_DIAS, abre: '13:00', cierra: '22:00' }],
    corto: 'Suc. Atotonilco',
    direccion: 'Hidalgo #102. Col. Centro, Atotonilco el Alto, Jal.',
    whatsapp: '391 125 5845',
    telefono: '391 917 5488',
    coords: [20.5517, -102.5078],
    altFotos: [
      'Fachada blanca de Rex Burger con su letrero amarillo y rojo',
      'Hamburguesa Rex Burger sostenida en la mano',
      'Letrero rojo de Rex Burger con teléfonos y servicio a domicilio',
    ],
    encuadreFotos: { 2: '50% 72%' },
  },
  {
    slug: 'arandas',
    nombre: 'Arandas',
    ciudad: 'Arandas',
    codigoPostal: '47180',
    // Ficha de Google Maps: todos los días de 12:00 p. m. a 10:30 p. m.
    horario: [{ dias: TODOS_LOS_DIAS, abre: '12:00', cierra: '22:30' }],
    corto: 'Suc. Arandas',
    direccion: 'Hernández #82. Arandas, Jal.',
    whatsapp: '348 129 0888',
    telefono: '348 783 5010',
    coords: [20.7054, -102.3457],
    altFotos: [
      'Fachada de Rex Burger en Arandas con cristales y letrero',
      'Barra amarilla de pedidos y caja de Rex Burger',
      'Comedor de Rex Burger con clientes en mesas blancas y sillas rojas',
    ],
  },
  {
    slug: 'la-barca',
    nombre: 'La Barca',
    ciudad: 'La Barca',
    corto: 'Suc. La Barca',
    direccion: 'Hidalgo #342 B. La Barca, Jal.',
    whatsapp: '393 933 5590',
    telefono: '393 759 6283',
    coords: [20.2891, -102.5453],
    altFotos: [
      'Comedor de Rex Burger con mesas, sillas rojas y póster de hamburguesa',
      'Fachada roja de Rex Burger vista desde la calle',
      'Barra amarilla y cocina de Rex Burger en La Barca',
    ],
    mosaicoInvertido: true,
  },
  {
    slug: 'capilla-de-gpe',
    nombre: 'Capilla de GPE',
    ciudad: 'Capilla de Guadalupe',
    codigoPostal: '47700',
    // Ficha de Google Maps: todos los días de 12:00 p. m. a 10:30 p. m.
    horario: [{ dias: TODOS_LOS_DIAS, abre: '12:00', cierra: '22:30' }],
    corto: 'Suc. Capilla de GPE',
    direccion: 'San Antonio #248. Capilla de Guadalupe, Jal.',
    whatsapp: '378 218 2115',
    telefono: '378 104 7289',
    coords: [20.8221279, -102.5970507],
    altFotos: [
      'Edificio de Rex Burger con letrero circular y estacionamiento',
      'Vista aérea de Rex Burger sobre la carretera de Capilla de Guadalupe',
      'Costado del edificio de Rex Burger con detalles rojos',
    ],
  },
  {
    slug: 'zapotlanejo',
    nombre: 'Zapotlanejo',
    ciudad: 'Zapotlanejo',
    codigoPostal: '45430',
    // Ficha de Google Maps: sábado hasta la medianoche, el resto de la semana hasta las 10:30 p. m.
    horario: [
      { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'], abre: '12:00', cierra: '22:30' },
      { dias: ['Saturday'], abre: '12:00', cierra: '00:00' },
    ],
    corto: 'Suc. Zapotlanejo',
    direccion: 'Alvaro Obregón #42 A. Frente a Banamex',
    whatsapp: '373 106 6923',
    telefono: '333 468 1465',
    coords: [20.6233, -103.0642],
    altFotos: [
      'Comedor de Rex Burger con mesas blancas y sillas rojas',
      'Mano sosteniendo una hamburguesa Rex Burger frente a la fachada',
      'Fachada de Rex Burger en Zapotlanejo con una motocicleta estacionada',
    ],
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

/** Redes sociales. Se configuran en .env; sin valor, el icono no lleva enlace. */
export const redes = {
  facebook: import.meta.env.PUBLIC_FACEBOOK_URL || undefined,
  instagram: import.meta.env.PUBLIC_INSTAGRAM_URL || undefined,
  tiktok: import.meta.env.PUBLIC_TIKTOK_URL || undefined,
};

/** Orden en que se listan las ciudades del banner de Eventos (la referencia no sigue el orden de `sucursales`). */
const ordenCiudadesEventos = ['atotonilco', 'la-barca', 'arandas', 'capilla-de-gpe', 'zapotlanejo'];
export const ciudadesEventos = ordenCiudadesEventos
  .map((slug) => sucursales.find((s) => s.slug === slug)?.nombre)
  .filter((nombre): nombre is string => Boolean(nombre));
