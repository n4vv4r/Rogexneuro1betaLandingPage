# Rogex Laboratories — Industrial Research Infrastructure

Nueva versión de la web de Rogex Laboratories.

Dirección visual:
- industrial
- sharp borders
- márgenes marcados
- fondos oscuros con imagen técnica simulada en baja opacidad
- menos Apple soft
- nada de liquid glass
- menos plantilla de IA
- más laboratorio / infraestructura / sistema real

Stack:
- Vite
- React
- lucide-react
- Vercel serverless function para Navi en `api/chat.js`

## Añadido en esta versión

- Enlace real de donación PayPal:
  https://www.paypal.com/ncp/payment/WWL8SE2XGSZNA

- Aviso de ventas futuras:
  PRISMA 3 abrirá ventas pronto para investigadores o gente con interés técnico/científico real.
  No se venderá a cualquiera automáticamente.
  El precio queda pendiente de decidir.

- Embed opcional de X:
  https://x.com/rogexlabs

El embed usa `platform.twitter.com/widgets.js`.
Si X o el navegador bloquean el embed, queda un botón fallback a @rogexlabs.

## Información real incorporada

- PRISMA 3 como subject-normalized EEG decoding software
- OpenNeuro DS007358
- 28 sujetos
- 3304 ventanas
- 71.5% raw LOSO
- 84.2% subject-normalized LOSO
- +12.7 puntos frente a raw features
- 91.4% personalized intra-CV, indicado como régimen más fácil
- límite científico: no diagnóstico, no dispositivo médico

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
ROGEX_MEMORY_URL=https://www.rogexlaboratories.com/rogex-memory.json
```

## Deploy recomendado

Vercel.

```bash
npm run build
```

Luego subir a GitHub y conectar con Vercel.
