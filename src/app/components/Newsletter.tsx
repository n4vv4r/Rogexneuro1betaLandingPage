import { useState } from "react";
import { Mail, CheckCircle2, Loader2, ArrowRight, BellRing, Sparkles, Eye } from "lucide-react";
import { NEWSLETTER } from "../../config";

const inter = { fontFamily: "Inter, sans-serif" } as const;
const mono = { fontFamily: "JetBrains Mono, monospace" } as const;
const cyan = "#00d4ff";
const violet = "#7c3aed";
const card = "#0a1628";

type Status = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Sends the email to whichever provider is configured in config.ts. */
async function subscribe(email: string): Promise<void> {
  const n = NEWSLETTER;

  if (n.provider === "formspree" && n.formspreeId) {
    const res = await fetch(`https://formspree.io/f/${n.formspreeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("formspree");
    return;
  }

  if (n.provider === "custom" && n.customEndpoint) {
    const res = await fetch(n.customEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("custom");
    return;
  }

  if (n.provider === "buttondown" && n.buttondownUser) {
    // Buttondown's embed endpoint is opaque to fetch (no-cors), so we POST and
    // optimistically treat a completed request as success.
    await fetch(`https://buttondown.com/api/emails/embed-subscribe/${n.buttondownUser}`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email }).toString(),
    });
    return;
  }

  // No provider configured yet → fall back to the visitor's mail client.
  if (n.fallbackEmail) {
    window.location.href =
      `mailto:${n.fallbackEmail}?subject=${encodeURIComponent("Apúntame a la newsletter de PRISMA")}` +
      `&body=${encodeURIComponent(`Quiero recibir las actualizaciones de PRISMA Beta. Mi correo: ${email}`)}`;
    return;
  }
  throw new Error("not-configured");
}

const PERKS = [
  { icon: <Sparkles size={15} />, text: "Acceso anticipado al estar listo" },
  { icon: <Eye size={15} />, text: "Demos y avances en primicia" },
  { icon: <BellRing size={15} />, text: "Un email por novedad. Sin spam." },
];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await subscribe(email.trim());
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="newsletter"
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(0,212,255,0.1)",
        borderBottom: "1px solid rgba(0,212,255,0.1)",
        background: "rgba(0,212,255,0.02)",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 760,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "110px 24px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 14px",
            border: "1px solid rgba(245,158,11,0.3)",
            background: "rgba(245,158,11,0.06)",
            borderRadius: 20,
            marginBottom: 24,
          }}
        >
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#f59e0b" }} />
          <span
            style={{
              ...mono,
              fontSize: "10px",
              fontWeight: 600,
              color: "#f59e0b",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            En desarrollo · aún no a la venta
          </span>
        </div>

        <h2
          style={{
            ...inter,
            fontSize: "clamp(28px, 4.5vw, 48px)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            marginBottom: 18,
          }}
        >
          Sé el primero en probar{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${cyan}, ${violet})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            PRISMA
          </span>
        </h2>

        <p
          style={{
            ...inter,
            fontSize: "clamp(14px, 2vw, 17px)",
            color: "#6b82a8",
            lineHeight: 1.7,
            maxWidth: 540,
            margin: "0 auto 36px",
          }}
        >
          Todavía no se puede comprar: PRISMA está en desarrollo activo. Déjanos tu correo y
          recibirás cada avance, las demos nuevas y el acceso anticipado en cuanto esté listo.
        </p>

        {/* Form / success */}
        {status === "success" ? (
          <div
            style={{
              maxWidth: 480,
              margin: "0 auto",
              padding: "22px 24px",
              borderRadius: 14,
              background: "rgba(0,212,255,0.06)",
              border: "1px solid rgba(0,212,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <CheckCircle2 size={22} style={{ color: cyan, flexShrink: 0 }} />
            <span style={{ ...inter, fontSize: "15px", color: "#dde8f5", fontWeight: 500, textAlign: "left" }}>
              ¡Listo! Te avisaremos en cuanto haya novedades. Revisa tu correo.
            </span>
          </div>
        ) : (
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  flex: "1 1 260px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Mail
                  size={16}
                  style={{ position: "absolute", left: 16, color: "#6b82a8", pointerEvents: "none" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="tu@correo.com"
                  aria-label="Correo electrónico"
                  style={{
                    ...inter,
                    width: "100%",
                    padding: "14px 16px 14px 42px",
                    fontSize: "15px",
                    color: "#dde8f5",
                    background: card,
                    border: `1px solid ${status === "error" ? "rgba(245,158,11,0.6)" : "rgba(0,212,255,0.2)"}`,
                    borderRadius: 10,
                    outline: "none",
                  }}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                style={{
                  ...inter,
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#060c18",
                  background: `linear-gradient(135deg, ${cyan}, #0ea5e9)`,
                  padding: "14px 26px",
                  borderRadius: 10,
                  border: "none",
                  cursor: status === "loading" ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 0 30px rgba(0,212,255,0.22)",
                  opacity: status === "loading" ? 0.7 : 1,
                  transition: "opacity 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="spin" /> Enviando…
                  </>
                ) : (
                  <>
                    Avísame <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

            {status === "error" && (
              <p style={{ ...inter, fontSize: "13px", color: "#f59e0b", marginTop: 12 }}>
                Introduce un correo válido e inténtalo de nuevo.
              </p>
            )}
          </div>
        )}

        {/* perks */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px 28px",
            marginTop: 32,
          }}
        >
          {PERKS.map((p) => (
            <div key={p.text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: cyan }}>{p.icon}</span>
              <span style={{ ...inter, fontSize: "13px", color: "#8eaac8" }}>{p.text}</span>
            </div>
          ))}
        </div>

        <p style={{ ...mono, fontSize: "10px", color: "#374151", marginTop: 28, letterSpacing: "0.05em" }}>
          Software experimental · No es un dispositivo médico · Puedes darte de baja cuando quieras
        </p>
      </div>

      <style>{`
        @keyframes nlspin { to { transform: rotate(360deg); } }
        .spin { animation: nlspin 0.8s linear infinite; }
        #newsletter input::placeholder { color: #44566f; }
      `}</style>
    </section>
  );
}
