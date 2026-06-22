# Agente de chat — montaje y conexiones

El "cerebro" del agente ya está construido y vive en `/agent` + `/api/chat.ts`, y el widget en
`src/app/components/ChatWidget.tsx` (ya montado en `main.tsx`). No añade ninguna dependencia nueva
(usa `fetch` nativo y la API REST de Claude).

## Cómo funciona

```
Visitante → ChatWidget (navegador) → POST /api/chat (servidor)
                                         → runAgent() llama a Claude con tools
                                         → tools: get_product_info · capture_lead · get_booking_link
                                         → respuesta → widget
```

La API key vive SOLO en el servidor. El agente está anclado a `agent/knowledge.ts` (no inventa) y
lleva guardrails: dice que es IA, nada médico, y con inversores **cualifica + agenda, nunca ofrece
inversión ni promete retornos**.

## Variables de entorno

Ver `.env.example`. La única imprescindible para que responda es `ANTHROPIC_API_KEY`. El resto
(`buyUrl`, `BOOKING_URL`, `LEAD_WEBHOOK_URL`) las vas rellenando según creas las cuentas; mientras
falten, el agente degrada con elegancia (p. ej. captura el email y avisa de que el equipo escribirá).

## Despliegue

### Opción A — Vercel (por defecto)
`api/chat.ts` ya es una Edge Function de Vercel. Solo tienes que:
1. Configurar las variables de entorno en el proyecto.
2. Hacer deploy (Vercel detecta `/api` automáticamente).

### Opción B — Cloudflare Pages
Borra `api/chat.ts` y crea `functions/api/chat.ts` con este envoltorio (el cerebro es el mismo):

```ts
import { runAgent, type AgentEnv, type ChatMessage } from "../../agent/core";

export const onRequest: PagesFunction<AgentEnv & { ALLOWED_ORIGIN?: string }> = async (ctx) => {
  const { request, env } = ctx;
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (env.ALLOWED_ORIGIN && request.headers.get("origin") !== env.ALLOWED_ORIGIN) {
    return new Response("Forbidden", { status: 403 });
  }
  const { messages = [] } = (await request.json()) as { messages?: ChatMessage[] };
  const { reply } = await runAgent(messages, env);
  return new Response(JSON.stringify({ reply }), { headers: { "content-type": "application/json" } });
};
```

En Cloudflare las variables se leen de `ctx.env` (ya se le pasan a `runAgent`). En Vercel, de `process.env`.

## Orden de construcción restante (lo que viene después de esto)

1. **Elegir host + crear API key de Anthropic** → con esto, el chat ya responde en vivo.
2. **Lemon Squeezy**: crear el producto Founding License (599 €) → pegar el enlace en `buyUrl`.
3. **Cal.com / Calendly**: crear el tipo de evento → pegar el enlace en `BOOKING_URL`.
4. **Make**:
   - Webhook de Lemon Squeezy `order_created` → escenario de **entrega + onboarding** del comprador.
   - Webhook de leads → `LEAD_WEBHOOK_URL` → escenario que escribe en tu CRM (Airtable/Sheet/HubSpot).
5. **Resend + DNS** (SPF/DKIM/DMARC) para los emails de entrega y seguimiento.

## Pendiente de decidir (producto)
- Cómo recibe el comprador PRISMA tras pagar (descarga + clave / repo privado).
- Política de reembolso, soporte y perks de fundador → actualízalo en `agent/knowledge.ts`.

PRISMA Beta es software experimental de análisis y visualización. No es un dispositivo médico.
