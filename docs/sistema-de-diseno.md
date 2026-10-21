# Sistema de diseño – Rex Burger

Reglas compartidas por todo el sitio. Los valores viven en `:root` de `src/styles/global.css`; no escribas números sueltos en los componentes.

## Breakpoint único: 768 px

| Dispositivo | Media query |
|---|---|
| Móvil | `@media (max-width: 767px)` |
| Tablet y escritorio | `@media (min-width: 768px)` |

- No uses otros cortes (antes había 600, 700 y 860). Si un componente necesita algo distinto, se resuelve con `clamp()`, `min()` o contenedores (`cqw`), no con un breakpoint nuevo.
- Las media queries no admiten variables CSS, por eso el valor se escribe tal cual. El mismo número aparece en el atributo `sizes` de las imágenes y en `matchMedia` del `Header`.
- Efectos de puntero (zoom, elevación): siempre dentro de `@media (hover: hover)`, para que no se queden pegados al tocar.

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `--tap` | 44px | Alto y ancho mínimo de todo lo que se toca: botones, enlaces de teléfono, puntos del carrusel |
| `--fs-xs` | 12px | Texto más pequeño permitido: etiquetas, avisos |
| `--fs-sm` | 14px | Texto secundario |
| `--fs-md` | 16px | Cuerpo |
| `--fs-lg` | 18px | Cuerpo destacado |
| `--fs-xl` | 20px | Números de contacto, subtítulos |
| `--yellow-text` | #ffdb55 | Amarillo para texto pequeño sobre rojo (contraste AA) |
| `--on-yellow` | #8f0c10 | Texto sobre amarillo |
| `--on-orange` | #6a090c | Texto sobre naranja |

Los titulares grandes siguen usando `clamp()` con valores propios, porque escalan con el ancho.

### Reglas

1. **Nunca texto por debajo de `--fs-xs`.** Al escalar con `cqw` o `vw`, usa `max(var(--fs-xs), …)`.
2. **Todo lo tocable mide al menos `--tap`.** Si el elemento visible es más pequeño, amplía el área con `::after` (ver `Ubicaciones.astro`).
3. **Contraste AA (4.5:1)** en texto pequeño: usa los tokens `--yellow-text`, `--on-yellow` y `--on-orange`.

## Verificación

Con `prefers-reduced-motion` activo las capturas son deterministas. Revisar a 390, 700, 800 y 1440 px que no haya desborde horizontal y que no quede texto menor de 12 px.
