/*
 * Textos editables de las páginas. Los datos de las sucursales, el menú y los enlaces están en
 * config.ts, menu.ts y .env; aquí solo van los textos.
 */
export const paginas = {
  menu: {
    titulo: 'Menú | Rex Burger',
    descripcion: 'Hamburguesas, combos, complementos, bebidas, malteadas y la Cajita Rexy Kids de Rex Burger California Style.',
  },
  sucursales: {
    titulo: 'Sucursales | Rex Burger',
    descripcion: 'Encuentra tu sucursal Rex Burger: Atotonilco, Arandas, La Barca, Capilla de Guadalupe y Zapotlanejo.',
    h1: 'Sucursales Rex Burger',
  },
  merch: {
    titulo: 'Merch | Rex Burger',
    descripcion: 'Playeras, hoodies y gorras oficiales de Rex Burger.',
    h1: 'Merch Rex Burger',
  },
  eventos: {
    titulo: 'Eventos | Rex Burger',
    descripcion:
      'Llevamos Rex Burger a tus eventos: cumpleaños, bodas y reuniones en Atotonilco, La Barca, Arandas, Capilla de Guadalupe y Zapotlanejo.',
  },
  contacto: {
    titulo: 'Contacto | Rex Burger',
    descripcion: 'Teléfonos y WhatsApp de todas las sucursales Rex Burger.',
  },
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
  titulo: 'Contactos',
  verSucursal: 'Ver sucursal',
} as const;
