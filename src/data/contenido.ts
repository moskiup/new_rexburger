/*
 * Textos editables de las páginas. Los datos de las sucursales, el menú y los enlaces están en
 * config.ts, menu.ts y .env; aquí solo van los textos.
 */
export const paginas = {
  menu: {
    titulo: 'Menú de hamburguesas, combos y malteadas | Rex Burger',
    descripcion:
      'Conoce el menú de Rex Burger California Style: hamburguesas, combos, complementos, bebidas, malteadas y la Cajita Rexy Kids con juguete sorpresa.',
  },
  sucursales: {
    titulo: 'Sucursales en Atotonilco, Arandas y La Barca | Rex Burger',
    descripcion:
      'Encuentra tu sucursal Rex Burger en Jalisco: Atotonilco el Alto, Arandas, La Barca, Capilla de Guadalupe y Zapotlanejo. Direcciones, teléfonos y WhatsApp.',
    h1: 'Sucursales Rex Burger',
  },
  merch: {
    titulo: 'Merch: playeras, hoodies y gorras | Rex Burger',
    descripcion:
      'Merch oficial de Rex Burger: playeras oversize y kids, hoodies y gorras. Elige tu talla y haz tu pedido por WhatsApp.',
    h1: 'Merch Rex Burger',
  },
  eventos: {
    titulo: 'Rex Burger para eventos: cumpleaños, bodas y reuniones',
    descripcion:
      'Llevamos Rex Burger a tus eventos: cumpleaños, bodas y reuniones en Atotonilco, La Barca, Arandas, Capilla de Guadalupe y Zapotlanejo.',
  },
  contacto: {
    titulo: 'Contacto y WhatsApp de todas las sucursales | Rex Burger',
    descripcion:
      'Teléfonos, WhatsApp y direcciones de las sucursales Rex Burger en Atotonilco, Arandas, La Barca, Capilla de Guadalupe y Zapotlanejo.',
  },
} as const;

export const inicio = {
  h1: 'Rex Burger California Style: hamburguesas en Atotonilco, Arandas, La Barca, Capilla de Guadalupe y Zapotlanejo',
} as const;

export const bannerEventos = {
  kicker: 'Llévanos a tus',
  titulo: 'Eventos',
  /** Botón del banner en el inicio. */
  boton: 'Más información',
  /** Botón del banner en la página de Eventos. */
  botonContacto: 'Cotiza tu evento',
} as const;

export const eventos = {
  titulo: 'Pide tu Rex donde quieras',
  texto:
    'Cumpleaños, bodas, empresas o reuniones: llevamos el sabor rexquisito a tu evento. Escríbele por WhatsApp a la sucursal más cercana para cotizar.',
} as const;

export const contacto = {
  titulo: 'Contáctanos',
  verSucursal: 'Ver sucursal',
} as const;
