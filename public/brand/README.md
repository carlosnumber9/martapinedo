# Marta Pinedo Sánchez — identidad visual

## Archivo maestro

- `logo-mark.svg`: maestro vectorial con degradado dorado.
- `logo-mark-monochrome.svg`: versión plana para una tinta y tamaños pequeños.
- `logo-mark-4096.png`: exportación transparente de gran formato.

El SVG es la fuente de verdad. Los PNG, favicons e iconos para accesos directos web se regeneran con:

```sh
npm run brand:assets
```

## Colores

- Fondo principal: `#1C0F13`.
- Dorado claro: `#FFF1AD`.
- Dorado principal: `#FFE080`.
- Dorado profundo: `#E9B94F`.

## Uso

- El Navbar usa `public/logo.svg` sobre fondo transparente.
- Favicons, Apple Touch Icon e iconos PWA usan un fondo sólido `#1C0F13`.
- No añadir contornos, sombras, marcos ni rotaciones.
- Mantener un margen libre mínimo equivalente al grosor del trazo vertical.
