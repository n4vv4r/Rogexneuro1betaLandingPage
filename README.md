# RxLabs®

Landing de [rogexlaboratories.com](https://www.rogexlaboratories.com).

- `/` dos cuadrados: echOS · PRISMA
- `/about` `/contact`
- `/docs` (también `docs.rogexlaboratories.com`) — echOS, PRISMA y echoAI, en castellano
- echoAI documenta arquitectura, cierre y benchmark visual de ECHO-1, proceso experimental,
  roadmap ECHO-2/ECHO-3, hardware previsto y límites
- `/echos` `/prisma` → 404 (productos aún no lanzados)

```
npm i
npm run dev
npm run build
```

La instantánea pública del benchmark ECHO-1 se regenera desde los informes del
laboratorio y una traza canónica nueva con `npm run data:echo1`. El exportador
valida los candados principales antes de escribir los dos JSON idénticos que
usa y ofrece la web.

`predev` y `prebuild` regeneran `llms-full.txt` y el sitemap desde las
subpáginas reales, para que los índices no deriven del contenido visible.
