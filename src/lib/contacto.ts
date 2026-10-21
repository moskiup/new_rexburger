import { site } from '../data/config';

const digitos = (numero: string) => numero.replace(/\s/g, '');

/** Enlace de WhatsApp (wa.me) para un número local de México con espacios. */
export const waLink = (numero: string) => `https://wa.me/${site.ladaPais}${digitos(numero)}`;

/** Enlace para llamar por teléfono (tel:+52…). */
export const telLink = (numero: string) => `tel:+${site.ladaPais}${digitos(numero)}`;
