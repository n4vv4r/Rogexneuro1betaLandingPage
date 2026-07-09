# Rogex Laboratories — Industrial Research Infrastructure

Rogex Laboratories is the public infrastructure layer for PRISMA 3, PRISMA 4, RogexOS, Moscovium, Navi and the future `rgx://` ecosystem.

## Current PRISMA 3 status

PRISMA 3 is experimental EEG research software. It is **not** a medical device and it is **not** diagnostic software.

Current reference validation:

```text
Dataset: OpenNeuro ds007358
Paradigm: resting EEG, eyes closed vs eyes open
Valid subjects after filtering: 18
Windows: 2124
Chance level: 50%
GLOBAL raw LOSO: 73.3% accuracy, F1 69.7
GLOBAL subject-normalized LOSO: 87.7% accuracy, F1 87.6
PERSONALIZED intra-CV: 91.0%
Alpha blocking: rel_alpha ec=0.271 vs eo=0.093 -> OK
```

Recommended wording:

> PRISMA 3 demonstrates an initial real-world cross-subject EEG validation on ds007358 EC/EO, reaching 73.3% raw LOSO accuracy and 87.7% subject-normalized LOSO accuracy, with the expected alpha-blocking pattern confirmed.

Avoid wording such as “PRISMA solves EEG variability universally.” Broader multi-dataset validation is under active development.

## Early Access Research License

The `/shop` section presents PRISMA 3 as a controlled-access research product:

- Early Access Research License: 249 €
- Standard future price: 599 €
- Institution / commercial review: 1,200 €+
- Checkout route: `/shop/checkout`
- No public automatic download
- Manual access review
- Personalized encrypted ZIP delivery
- Password sent separately

The current license language must stay conservative: experimental research software, non-clinical, non-diagnostic, dataset-dependent accuracy, no redistribution/resale/mirroring/leaking.

## PRISMA 3 docs added

```text
docs/PRISMA3_VALIDATION.md
docs/PRISMA3_EARLY_ACCESS_RESEARCH_LICENSE.md
docs/PRISMA3_DATASET_COMPATIBILITY.md
docs/PRISMA3_STREAMLIT_TUTORIAL.md
docs/PRISMA3_FABLE_CODE_PROMPT.md
public/tutorial/prisma3/*.png
```

## Stack

- Vite
- React
- lucide-react
- Vercel serverless functions

## Probar localmente

```bash
npm install
npm run dev
```

Abrir:

```bash
http://localhost:5173
```

Con `npm run dev`, la API `/api/x-posts` no funciona porque Vite no ejecuta funciones serverless de Vercel. En ese caso la web muestra posts fallback.

Para probar APIs reales localmente:

```bash
npm i -g vercel
vercel dev
```

## Variables de entorno

```bash
OPENAI_API_KEY=tu_api_key
OPENAI_MODEL=gpt-5.4-mini
ROGEX_MEMORY_URL=

X_BEARER_TOKEN=tu_x_bearer_token_opcional
X_USERNAME=rogexlabs
X_USER_ID=
```

`X_USER_ID` es opcional. Si no lo pones, `/api/x-posts` busca primero el usuario por username y luego pide sus posts.

## Donación

https://www.paypal.com/ncp/payment/WWL8SE2XGSZNA

## Contacto

roger@rogexlaboratories.com
