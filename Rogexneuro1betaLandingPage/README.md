# Rogex Laboratories — PRISMA 3 Web

Public website for Rogex Laboratories presenting PRISMA 3 as experimental EEG research software.

## What this version includes

- Updated PRISMA 3 narrative: company-style public release, not a sales-only landing page.
- Real EEG validation section using OpenNeuro DS007358: 28 subjects, 3304 windows, ec vs eo, LOSO evaluation.
- Public technical reports served from `/research/*.md` and rendered inside the app through `/docs/<slug>`.
- Built-in Markdown reader with headings, lists, tables, code blocks, blockquotes and raw `.md` access.
- Theme selector with Light, Dark, Solarized, Wikipedia-style and Modern modes.
- Validation figures served from `/prisma3/*.png`.
- Technical pipeline explanation: signal import, preprocessing, feature extraction, baseline engine, individual translator and ML.
- Clear scientific limits: not a medical device, not diagnostic, no clinical claims.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production output is in `dist/` and is ready for Vercel/static deployment.
