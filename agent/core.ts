/**
 * core.ts
 * Lógica del agente independiente del host (sirve en Vercel y en Cloudflare).
 * Llama a la API de Claude (Anthropic) con tool-use y resuelve el bucle de herramientas.
 *
 * Recibe `env` como parámetro (no usa process.env directamente) para ser portable.
 */

import { buildSystemPrompt, type AgentConfig } from "./prompt";
import { TOOLS, runTool, type ToolEnv } from "./tools";
import { BUY_URL } from "../src/config";

export interface AgentEnv extends ToolEnv, AgentConfig {
  ANTHROPIC_API_KEY?: string;
  ANTHROPIC_MODEL?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Límites para proteger tu factura de API frente a abuso.
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MSG = 4000;
const MAX_TOOL_ITERATIONS = 5;
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-haiku-4-5-20251001";

type Block =
  | { type: "text"; text: string }
  | { type: "tool_use"; id: string; name: string; input: Record<string, unknown> }
  | { type: "tool_result"; tool_use_id: string; content: string };

function sanitize(messages: ChatMessage[]): { role: "user" | "assistant"; content: string }[] {
  return messages
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS_PER_MSG) }));
}

export async function runAgent(
  messages: ChatMessage[],
  env: AgentEnv,
): Promise<{ reply: string }> {
  if (!env.ANTHROPIC_API_KEY) {
    return { reply: "El asistente no está configurado todavía (falta ANTHROPIC_API_KEY)." };
  }

  const system = buildSystemPrompt({
    buyUrl: env.buyUrl || BUY_URL,
    bookingUrl: env.BOOKING_URL,
    investorBriefUrl: env.investorBriefUrl,
  });

  // Historial en formato Anthropic. El contenido puede ser string o lista de bloques.
  const convo: { role: "user" | "assistant"; content: string | Block[] }[] = sanitize(messages);

  for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
    const res = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: env.ANTHROPIC_MODEL || DEFAULT_MODEL,
        max_tokens: 1024,
        system,
        tools: TOOLS,
        messages: convo,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[anthropic]", res.status, detail);
      return { reply: "Ahora mismo no puedo responder. Inténtalo de nuevo en un momento." };
    }

    const data = (await res.json()) as { content: Block[]; stop_reason: string };
    const blocks = data.content || [];

    // Si el modelo pidió herramientas, ejecútalas y vuelve a llamar.
    const toolUses = blocks.filter((b): b is Extract<Block, { type: "tool_use" }> => b.type === "tool_use");

    if (data.stop_reason === "tool_use" && toolUses.length > 0) {
      convo.push({ role: "assistant", content: blocks });
      const results: Block[] = [];
      for (const t of toolUses) {
        const out = await runTool(t.name, t.input || {}, env);
        results.push({ type: "tool_result", tool_use_id: t.id, content: out });
      }
      convo.push({ role: "user", content: results });
      continue;
    }

    // Respuesta final: junta el texto.
    const text = blocks
      .filter((b): b is Extract<Block, { type: "text" }> => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return { reply: text || "¿En qué te puedo ayudar?" };
  }

  return { reply: "Esto se está complicando — ¿quieres que te ponga en contacto con el equipo?" };
}
