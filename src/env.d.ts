/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** Clave de Google Maps para el mapa de sucursales. */
  readonly PUBLIC_GOOGLE_MAPS_API_KEY?: string;
  /** Número que recibe los pedidos del carrito, en formato internacional sin + ni espacios (523911255845). */
  readonly PUBLIC_WHATSAPP_PEDIDOS?: string;
  readonly PUBLIC_FACEBOOK_URL?: string;
  readonly PUBLIC_INSTAGRAM_URL?: string;
  readonly PUBLIC_TIKTOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
