export const site = {
  nombre: 'Rex Burger',
  lema: 'California Style',
  titulo: 'Rex Burger | California Style',
  descripcion:
    'Hamburguesas Rex Burger California Style. ¡Haz tu día más rexquisito! Sucursales en Atotonilco, Arandas, La Barca, Capilla de Guadalupe y Zapotlanejo.',
  idioma: 'es-MX',
  colorTema: '#bc1417',
  ladaPais: '52',
  /* Número que recibe los pedidos del carrito (formato internacional, sin + ni espacios). Cámbialo por el real. */
  whatsappPedidos: '523911255845',
};

export interface Sucursal {
  slug: string;
  nombre: string;
  corto: string;
  direccion: string;
  whatsapp: string;
  telefono: string;
  coords: [number, number];
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

export const redes = {
  facebook: '#',
  instagram: '#',
  tiktok: '#',
  domicilio: '#',
};
