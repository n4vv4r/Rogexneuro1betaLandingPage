# Knights Labs — Rogex Laboratories

Sitio oficial: [www.rogexlaboratories.com](https://www.rogexlaboratories.com/)

## Identidad

- **Knights Labs** — marco de producto y licenciamiento
- **Rogex Laboratories** — laboratorio técnico (EEG, bare-metal, neuromórfico)

## Suite pública

| Producto | Estado | Notas |
|----------|--------|--------|
| **PRISMA 3.2** | Activo | Software EEG experimental, no clínico |
| **PRISMA 5** | R&D | Motor SNN / delta mod / STDP sobre rxOS |
| **rxOS Desktop** | Prototipo + test build | Closed source, bootable x86-64 |
| **rxOS Neuromorphic Kernel** | Roadmap open source | Event fabric, footprint &lt;64 MB target |

Lanzamiento de suite proyectado: **diciembre 2026**.

## Stack del sitio

- Vite
- React 19
- lucide-react
- Vercel serverless (`/api/x-posts`, `/api/chat`)

## Rutas

- `/` — home Knights Labs
- `/suite` — productos y capas de licencia
- `/architecture` — stack técnico EEG → spikes
- `/prisma` — PRISMA 3.2 + sección PRISMA 5
- `/rx-os` — Desktop + kernel + download v4.1.1
- `/about` — lab, contacto, CTAs

## Probar localmente

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173`.

Con `npm run dev`, las funciones serverless de Vercel no corren. Usa `vercel dev` si necesitas `/api/*`.

## Contacto

roger@rogexlaboratories.com

## Nota científica

PRISMA es software experimental de investigación. No es un dispositivo médico ni software de diagnóstico.
