# Rogex Laboratories — PRISMA Beta · Landing

Landing page de **rogex-neuro-1-beta / PRISMA Beta**, el primer motor software de
neuroanálisis de Rogex Laboratories. Vende la *Founding Beta License* (599 €) y
presenta el roadmap a inversores.

**Stack:** React 18 · TypeScript · Vite 6 · Tailwind CSS v4 · Recharts · lucide-react.

## Desarrollo

    npm install
    npm run dev        # http://localhost:5173

## Build de producción

    npm run build      # genera dist/
    npm run preview    # sirve el build para revisarlo

## Despliegue (Vercel / Cloudflare)

- Build command:  `npm run build`
- Output dir:     `dist`
- Install command: `npm install`

## Notas

- Página 100% estática: sin imágenes raster (los visuales son SVG/CSS y gráficos Recharts).
- Para mantenerla privada durante la beta, cambia `robots` a `noindex, nofollow` en `index.html`.
- Pendiente: subir una imagen Open Graph 1200x630 a `public/og-image.png`.

PRISMA Beta es software experimental de análisis y visualización. No es un dispositivo médico.
