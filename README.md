# Rogex Laboratories — Vite Website

Clean research-oriented website for Rogex Laboratories and PRISMA.

## Stack

- Vite
- React
- CSS
- lucide-react icons
- Icons8 social icons loaded from `img.icons8.com`

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Pages

The site uses clean SPA routes instead of hash anchors:

- `/`
- `/research`
- `/prisma`
- `/methods`
- `/collaborations`
- `/notes`
- `/contact`

If you deploy to Vercel or Netlify, enable SPA fallback/rewrite to `index.html` so direct page reloads work.

## Language

Spanish is the default language. The `EN/ES` button toggles the interface language and stores the preference in `localStorage`.

## Content direction

This site intentionally avoids medical claims, pricing, hype language and beta-sales language. It presents Rogex Laboratories as an independent research software and neurotechnology lab focused on reproducible EEG analysis.
