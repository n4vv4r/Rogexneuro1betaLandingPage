import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";

/* Paleta del sitio */
const cyan = "#00d4ff";
const navy = "#060c18";
const card = "#0a1628";
const text = "#dde8f5";
const muted = "#6b82a8";
const border = "rgba(0,212,255,0.18)";
const mono = { fontFamily: "JetBrains Mono, monospace" } as const;
const inter = { fontFamily: "Inter, sans-serif" } as const;

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hola 👋 Soy el asistente IA de Rogex Laboratories. Puedo contarte qué es PRISMA Beta (en desarrollo), apuntarte a la newsletter para el acceso anticipado o, si eres inversor, agendar una llamada con el equipo. ¿Qué te gustaría?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send() {
    const t = input.trim();
    if (!t || loading) return;
    const next = [...messages, { role: "user" as const, content: t }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // Enviamos el historial sin el saludo inicial (no aporta al modelo).
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "No he podido responder. Inténtalo de nuevo." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Problema de conexión. Vuelve a intentarlo en un momento." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, ...inter }}>
      {open && (
        <div
          style={{
            width: "min(380px, calc(100vw - 32px))",
            height: "min(560px, calc(100vh - 120px))",
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
            background: navy,
            border: `1px solid ${border}`,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,212,255,0.06)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              borderBottom: `1px solid ${border}`,
              background: card,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: cyan,
                boxShadow: `0 0 10px ${cyan}`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ color: text, fontSize: 13, fontWeight: 600 }}>Asistente Rogex</div>
              <div style={{ ...mono, color: muted, fontSize: 10, letterSpacing: "0.06em" }}>
                IA · PRISMA BETA
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              style={{ background: "none", border: "none", color: muted, cursor: "pointer", padding: 4 }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "10px 13px",
                  borderRadius: 12,
                  fontSize: 13,
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                  color: m.role === "user" ? navy : text,
                  background: m.role === "user" ? cyan : card,
                  border: m.role === "user" ? "none" : `1px solid ${border}`,
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ ...mono, alignSelf: "flex-start", color: muted, fontSize: 11, padding: "6px 4px" }}>
                escribiendo…
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: 12, borderTop: `1px solid ${border}`, background: card, display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Escribe tu pregunta…"
              aria-label="Mensaje"
              style={{
                flex: 1,
                background: navy,
                border: `1px solid ${border}`,
                borderRadius: 10,
                color: text,
                padding: "10px 12px",
                fontSize: 13,
                outline: "none",
                ...inter,
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Enviar"
              style={{
                background: cyan,
                border: "none",
                borderRadius: 10,
                width: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: loading || !input.trim() ? "default" : "pointer",
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
            >
              <Send size={16} color={navy} />
            </button>
          </div>
        </div>
      )}

      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente"}
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: `1px solid ${border}`,
          background: card,
          color: cyan,
          cursor: "pointer",
          boxShadow: `0 8px 30px rgba(0,0,0,0.5), 0 0 0 4px rgba(0,212,255,0.06)`,
          float: "right",
        }}
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </div>
  );
}
