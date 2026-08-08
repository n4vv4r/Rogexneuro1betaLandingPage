# Knights Labs — Rogex Laboratories

Sitio oficial: [www.rogexlaboratories.com](https://www.rogexlaboratories.com/)

## Identidad

- **Knights Labs** — marco de producto y licenciamiento
- **Rogex Laboratories** — laboratorio técnico (EEG, bare-metal, neuromórfico)

## Suite pública

| Producto | Estado | Notas |
|----------|--------|--------|
| **PRISMA 3.2** | Activo | Software EEG experimental, no clínico |
| **PRISMA 5** | R&D | Motor SNN / path sobre RXos |
| **RXos v4.5.0 Desktop** | Hardware + QEMU | Closed surface, bootable x86-64 |
| **RXos neuromorphic fabric** | Niveles 1–2 cerrados | LIF Q16.16, STDP, bench 6/6; Nivel 3 Akida pendiente |
| **Docs** | Públicos | `/docs/rxos/*.pdf` paper + hoja de ruta 4 niveles |

Lanzamiento de suite proyectado: **diciembre 2026**.

## Stack del sitio

- Vite
- React 19
- lucide-react
- Vercel serverless (`/api/x-posts`, `/api/chat`, `/api/newspaper/*`)
- Open Graph cards (`public/og/*.png`, 1200×630) via `npm run build:og`

Cada ruta pública tiene HTML estático post-build (`suite.html`, `newspaper.html`, …) con `og:image` correcto para crawlers.

## Rutas

- `/` — home Knights Labs
- `/suite` — productos y capas de licencia
- `/architecture` — stack técnico EEG → spikes
- `/prisma` — PRISMA 3.2 + sección PRISMA 5
- `/rx-os` — Desktop + kernel + download v4.1.1
- `/about` — lab, contacto, CTAs
- `/newspaper` — Rogex Newspaper (también en subdominio)

## Rogex Newspaper

Canal de avances con **email + RSS**:

| URL | Uso |
|-----|-----|
| https://newspaper.rogexlaboratories.com | Portada del periódico |
| https://newspaper.rogexlaboratories.com/feed.xml | RSS |
| https://www.rogexlaboratories.com/newspaper | Mismo app en path del lab |

**Publicar un artículo**

1. Añade `content/newspaper/YYYY-MM-DD-titulo.md` (frontmatter: `title`, `date`, `summary`, `tags`)
2. Deploy (`npm run build` genera índice + RSS)
3. Avisa a suscriptores: `npm run newspaper:broadcast -- YYYY-MM-DD-titulo`

**Env en Vercel:** `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `RESEND_API_KEY`, `NEWSPAPER_FROM`, `NEWSPAPER_ADMIN_SECRET`

**Dominio:** en Vercel → Domains → `newspaper.rogexlaboratories.com` (CNAME DNS).

Detalle: `content/newspaper/README.md`.

## Probar localmente

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173` o `http://localhost:5173/newspaper`.

Con `npm run dev`, las funciones serverless de Vercel no corren. Usa `vercel dev` si necesitas `/api/*` (suscripción / broadcast).

## Contacto

knightsys@proton.me

## Nota científica

PRISMA es software experimental de investigación. No es un dispositivo médico ni software de diagnóstico.
