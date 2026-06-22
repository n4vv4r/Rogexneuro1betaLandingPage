/**
 * api/chat.ts  —  endpoint del agente (Vercel Edge Function).
 *
 * El navegador llama POST /api/chat con { messages: [{role, content}] }.
 * La API key vive SOLO aquí (servidor), nunca en el cliente.
 *
 * ¿Usas Cloudflare Pages en vez de Vercel? Mira AGENT_SETUP.md: es el mismo `runAgent`,
 * solo cambia el envoltorio (functions/api/chat.ts con onRequest).
 */

import { runAgent, type AgentEnv, type ChatMessage } from "../agent/core";

export const config = { runtime: "edge" };

function corsHeaders(origin: string | null, allowed?: string) {
  const allow = allowed && origin === allowed ? origin : allowed || "*";
  return {
    "access-control-allow-origin": allow,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "content-type": "application/json",
  };
}

export default async function handler(req: Request): Promise<Response> {
  const env = process.env as unknown as AgentEnv & { ALLOWED_ORIGIN?: string };
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin, env.ALLOWED_ORIGIN);

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  }

  // Bloquea orígenes no permitidos (protege tu factura de API).
  if (env.ALLOWED_ORIGIN && origin && origin !== env.ALLOWED_ORIGIN) {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers });
  }

  let messages: ChatMessage[];
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    messages = body.messages ?? [];
    if (!Array.isArray(messages)) throw new Error("messages must be an array");
  } catch {
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400, headers });
  }

  try {
    const { reply } = await runAgent(messages, env);
    return new Response(JSON.stringify({ reply }), { status: 200, headers });
  } catch (err) {
    console.error("[/api/chat]", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers });
  }
}
