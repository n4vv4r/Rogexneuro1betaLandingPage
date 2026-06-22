/**
 * tools.ts
 * Definición de herramientas (formato Anthropic) + sus handlers.
 * Los handlers son "config-driven": leen URLs desde env. Mientras no configures algo,
 * degradan con elegancia (no rompen).
 */

import { KNOWLEDGE } from "./knowledge";

export interface ToolEnv {
  LEAD_WEBHOOK_URL?: string; // webhook de Make que recibe los leads
  BOOKING_URL?: string; // enlace de Cal.com / Calendly
}

export const TOOLS = [
  {
    name: "get_product_info",
    description:
      "Devuelve la base de conocimiento oficial de PRISMA Beta (hechos sobre producto, precio, qué es/no es, roadmap, info para inversores). Úsala antes de responder dudas concretas para no inventar.",
    input_schema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description:
            "Tema opcional sobre el que se pregunta (precio, funciones, inversores, roadmap, etc.).",
        },
      },
    },
  },
  {
    name: "capture_lead",
    description:
      "Guarda el contacto de una persona interesada (comprador o inversor) para que el equipo humano le haga seguimiento. Usar solo con su consentimiento.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Nombre de la persona." },
        email: { type: "string", description: "Email de contacto." },
        role: {
          type: "string",
          enum: ["buyer", "investor", "other"],
          description: "Si es comprador potencial, inversor u otro.",
        },
        note: {
          type: "string",
          description: "Resumen breve del interés o la pregunta.",
        },
      },
      required: ["email", "role"],
    },
  },
  {
    name: "get_booking_link",
    description:
      "Devuelve el enlace para agendar una llamada con el equipo humano de Rogex Laboratories.",
    input_schema: { type: "object", properties: {} },
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function runTool(
  name: string,
  input: Record<string, unknown>,
  env: ToolEnv,
): Promise<string> {
  switch (name) {
    case "get_product_info":
      return KNOWLEDGE;

    case "get_booking_link":
      return env.BOOKING_URL
        ? `Enlace para agendar: ${env.BOOKING_URL}`
        : "Aún no hay enlace de agenda configurado. Pide el email de la persona y usa capture_lead para que el equipo le escriba.";

    case "capture_lead": {
      const email = String(input.email ?? "").trim();
      if (!EMAIL_RE.test(email)) {
        return "El email no parece válido. Pide a la persona que lo confirme.";
      }
      const lead = {
        name: String(input.name ?? "").trim() || null,
        email,
        role: String(input.role ?? "other"),
        note: String(input.note ?? "").trim() || null,
        capturedAt: new Date().toISOString(),
      };

      if (env.LEAD_WEBHOOK_URL) {
        try {
          await fetch(env.LEAD_WEBHOOK_URL, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(lead),
          });
        } catch {
          // No bloquees la conversación si el webhook falla.
          return "Contacto recibido (no se pudo notificar al equipo automáticamente, pero queda registrado).";
        }
        return "Contacto guardado. El equipo de Rogex se pondrá en contacto.";
      }

      // Sin webhook configurado: al menos lo dejamos en logs del servidor.
      console.log("[LEAD]", JSON.stringify(lead));
      return "Contacto registrado. (Configura LEAD_WEBHOOK_URL para enviarlo a tu CRM/Make.)";
    }

    default:
      return `Herramienta desconocida: ${name}`;
  }
}
