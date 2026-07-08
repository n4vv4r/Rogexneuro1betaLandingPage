# Rogex Laboratories — Industrial Research Infrastructure

Versión corregida:

- sin fondos blancos residuales
- contacto actualizado: roger@rogexlaboratories.com
- posts de X cargados por API propia en `/api/x-posts`
- sin embed oficial de X
- traducciones extendidas para ES, EN, ZH, JA, FR y DE
- PayPal real añadido
- PRISMA 3 sales note añadido
- fallback local para X si no hay token

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

## Nota de ventas PRISMA 3

PRISMA 3 abrirá ventas pronto para investigadores o personas con interés técnico/científico real. No se venderá automáticamente a cualquiera. El precio queda pendiente.
