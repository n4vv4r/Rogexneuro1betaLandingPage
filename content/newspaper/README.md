# Rogex Newspaper — artículos

Cada archivo Markdown en esta carpeta se publica en:

- **Subdominio:** https://newspaper.rogexlaboratories.com/
- **Path en lab:** https://www.rogexlaboratories.com/newspaper
- **RSS:** https://newspaper.rogexlaboratories.com/feed.xml

## Formato

```md
---
title: "Título del despacho"
date: 2026-08-15
summary: "Una línea para el listado, RSS y el email."
tags: [rxos, prisma]
author: "Roger Navarro / Knights Labs"
draft: false
---

## Cuerpo en Markdown

Texto del artículo…
```

- `draft: true` → no se publica (no sale en índice ni RSS).
- El **slug** es el nombre del archivo sin `.md` (recomendado: `YYYY-MM-DD-titulo-corto.md`).

## Flujo de publicación

1. Escribe el `.md` aquí.
2. Commit + deploy (Vercel corre `npm run build` → genera JSON + RSS).
3. Avisa a los suscriptores por email:

```bash
export NEWSPAPER_ADMIN_SECRET=…
npm run newspaper:broadcast -- 2026-08-15-mi-articulo
```

O:

```bash
curl -X POST https://www.rogexlaboratories.com/api/newspaper/broadcast \
  -H "Content-Type: application/json" \
  -H "x-newspaper-secret: $NEWSPAPER_ADMIN_SECRET" \
  -d '{"slug":"2026-08-15-mi-articulo"}'
```

## Variables en Vercel

| Variable | Uso |
|----------|-----|
| `UPSTASH_REDIS_REST_URL` | Store de emails |
| `UPSTASH_REDIS_REST_TOKEN` | Auth Redis |
| `RESEND_API_KEY` | Envío de correos |
| `NEWSPAPER_FROM` | Remitente verificado en Resend |
| `NEWSPAPER_ADMIN_SECRET` | Protege el broadcast |

## Subdominio en Vercel

Project → Settings → Domains → add `newspaper.rogexlaboratories.com`  
DNS: CNAME `newspaper` → `cname.vercel-dns.com` (o el que indique Vercel).
