# RxLabs®

Landing de [rogexlaboratories.com](https://www.rogexlaboratories.com).

- `/` dos cuadrados: echOS · PRISMA
- `/about` `/contact` `/community`
- `/docs` (también `docs.rogexlaboratories.com`) — echOS, PRISMA y echoAI, en castellano
- echoAI documenta arquitectura, cierre ECHO-1, proceso experimental,
  roadmap ECHO-2/ECHO-3, hardware previsto y límites
- `/echos` `/prisma` → 404 (productos aún no lanzados)

```
npm i
npm run dev
npm run build
```

`predev` y `prebuild` regeneran `llms-full.txt` y el sitemap desde las
subpáginas reales, para que los índices no deriven del contenido visible.
