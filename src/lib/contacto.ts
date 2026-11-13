import { site } from '../data/config';

const digitos = (numero: string) => numero.replace(/\s/g, '');

/** Marca que identifica en la sucursal los mensajes que llegan desde el sitio. */
export const origenWeb = '(Mensaje enviado desde la página web)';

/** Mensaje que aparece escrito al abrir WhatsApp desde un número del sitio. */
export const mensajeWhatsApp = `¡Hola Rex Burger! Quiero hacer un pedido. ${origenWeb}`;

/** Enlace de WhatsApp (wa.me) para un número local de México con espacios, con el mensaje ya escrito. */
export const waLink = (numero: string, mensaje = mensajeWhatsApp) =>
  `https://wa.me/${site.ladaPais}${digitos(numero)}?text=${encodeURIComponent(mensaje)}`;

/** Enlace para llamar por teléfono (tel:+52…). */
export const telLink = (numero: string) => `tel:+${site.ladaPais}${digitos(numero)}`;
