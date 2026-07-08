# Rogex Laboratories — Modern Apple-style Web

Nueva versión de la web de Rogex Laboratories.

Dirección visual:
- moderna, clara, estilo Apple
- menos papel
- menos retro
- menos plantilla de IA
- más producto científico real
- más respirable y scrollable

Stack:
- Vite
- React
- lucide-react
- Vercel serverless function para Navi en `api/chat.js`

## Información real incorporada

Esta versión usa información del repo actual y del whitepaper PRISMA 3:

- PRISMA 3 como subject-normalized EEG decoding software
- OpenNeuro DS007358
- 28 sujetos
- 3304 ventanas
- 71.5% raw LOSO
- 84.2% subject-normalized LOSO
- +12.7 puntos frente a raw features
- 91.4% personalized intra-CV, indicado como régimen más fácil
- límite científico: no diagnóstico, no dispositivo médico

También conserva la línea futura:
- PRISMA 4
- RogexOS
- Catalonian / RXos
- Roxenite / RX-C
- RGX Protocol / rgx://
- Moscovium
- Navi / Nivalynx

## Instalar

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir:

```bash
http://localhost:5173
```

## Chatbot Navi

En Vite local puro, `/api/chat` no se ejecuta salvo que uses Vercel.

Para usar Navi con OpenAI en local:

```bash
npm i -g vercel
vercel dev
```

En `.env.local`:

```bash
OPENAI_API_KEY=tu_api_key
OPENAI_MODEL=gpt-5.4-mini
ROGEX_MEMORY_URL=
```

## Memoria viva

Edita:

```bash
content/rogex-memory.json
```

o usa:

```bash
ROGEX_MEMORY_URL=https://tu-dominio.com/rogex-memory.json
```

La función serverless lee esa memoria para actualizar el contexto de Navi.

## Deploy recomendado

Vercel.

```bash
npm run build
```

Luego subir a GitHub y conectar con Vercel.
