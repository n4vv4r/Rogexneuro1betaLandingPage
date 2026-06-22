import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { DashboardMockup } from "./components/DashboardMockup";
import { Newsletter } from "./components/Newsletter";
import {
  Activity,
  Brain,
  BarChart3,
  Zap,
  FileText,
  Users,
  Shield,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Cpu,
  GitBranch,
  TrendingUp,
  Globe,
  Lock,
  AlertTriangle,
  Play,
} from "lucide-react";

/* ───────────── Shared Styles ───────────── */
const mono = { fontFamily: "JetBrains Mono, monospace" } as const;
const inter = { fontFamily: "Inter, sans-serif" } as const;
const cyan = "#00d4ff";
const violet = "#7c3aed";
const teal = "#14b8a6";
const navy = "#060c18";
const card = "#0a1628";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 14px",
        border: `1px solid rgba(0,212,255,0.25)`,
        borderRadius: 20,
        marginBottom: 24,
      }}
    >
      <div
        style={{ width: 5, height: 5, borderRadius: "50%", background: cyan }}
      />
      <span
        style={{
          ...mono,
          fontSize: "10px",
          fontWeight: 600,
          color: cyan,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(0,212,255,0.04)"
          : "rgba(10,22,40,0.8)",
        border: `1px solid ${hovered ? "rgba(0,212,255,0.25)" : "rgba(0,212,255,0.1)"}`,
        borderRadius: 14,
        padding: "24px",
        transition: "all 0.25s",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgba(0,212,255,0.08)",
          border: "1px solid rgba(0,212,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          color: cyan,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          ...inter,
          fontSize: "15px",
          fontWeight: 600,
          color: "#dde8f5",
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p style={{ ...inter, fontSize: "13px", color: "#6b82a8", lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  desc,
  color = cyan,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "20px 24px",
        background: card,
        border: `1px solid rgba(0,212,255,0.1)`,
        borderRadius: 12,
      }}
    >
      <div style={{ color, flexShrink: 0, marginTop: 2 }}>{icon}</div>
      <div>
        <h3
          style={{
            ...inter,
            fontSize: "14px",
            fontWeight: 600,
            color: "#dde8f5",
            marginBottom: 4,
          }}
        >
          {title}
        </h3>
        <p style={{ ...inter, fontSize: "13px", color: "#6b82a8", lineHeight: 1.5 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ───────────── EEG Hero Animation ───────────── */
function EEGLine() {
  const points = 200;
  const width = 1000;
  const height = 80;
  let d = `M 0 ${height / 2}`;
  for (let i = 1; i <= points; i++) {
    const x = (i / points) * width;
    const t = i / 8;
    const y =
      height / 2 +
      Math.sin(t * 1.8) * 18 +
      Math.sin(t * 4.2) * 9 +
      Math.sin(t * 9.1) * 4 +
      Math.sin(t * 0.6) * 14;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return (
    <div style={{ overflow: "hidden", opacity: 0.4 }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height: 60 }}
      >
        <defs>
          <linearGradient id="eegGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={cyan} stopOpacity={0} />
            <stop offset="20%" stopColor={cyan} stopOpacity={1} />
            <stop offset="80%" stopColor={teal} stopOpacity={1} />
            <stop offset="100%" stopColor={teal} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={d} fill="none" stroke="url(#eegGrad)" strokeWidth={1.5} />
      </svg>
    </div>
  );
}

/* ───────────── Roadmap Item ───────────── */
function RoadmapItem({
  phase,
  name,
  title,
  desc,
  active,
  color,
}: {
  phase: string;
  name: string;
  title: string;
  desc: string;
  active: boolean;
  color: string;
}) {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      {/* Line + dot */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `2px solid ${active ? color : "rgba(255,255,255,0.1)"}`,
            background: active ? `${color}15` : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: active ? `0 0 20px ${color}40` : "none",
          }}
        >
          <span
            style={{
              ...mono,
              fontSize: "9px",
              fontWeight: 700,
              color: active ? color : "#4a5568",
            }}
          >
            {phase}
          </span>
        </div>
        <div
          style={{
            width: 1,
            flex: 1,
            background: `linear-gradient(to bottom, ${color}30, transparent)`,
            minHeight: 40,
          }}
        />
      </div>
      {/* Content */}
      <div style={{ paddingBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span
            style={{
              ...mono,
              fontSize: "10px",
              fontWeight: 600,
              color,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {name}
          </span>
          {active && (
            <span
              style={{
                ...mono,
                fontSize: "9px",
                padding: "2px 8px",
                borderRadius: 10,
                background: `${color}20`,
                color,
                border: `1px solid ${color}40`,
              }}
            >
              CURRENT
            </span>
          )}
        </div>
        <h3
          style={{
            ...inter,
            fontSize: "17px",
            fontWeight: 600,
            color: active ? "#dde8f5" : "#4a5568",
            marginBottom: 6,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            ...inter,
            fontSize: "13px",
            color: active ? "#6b82a8" : "#2d3748",
            lineHeight: 1.6,
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ───────────── Main App ───────────── */
export default function App() {
  return (
    <div
      style={{
        background: navy,
        minHeight: "100vh",
        color: "#dde8f5",
        fontFamily: "Inter, sans-serif",
        overflowX: "hidden",
      }}
    >
      <NavBar />

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "15%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: 900, width: "100%" }}>
          {/* Product badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              border: "1px solid rgba(0,212,255,0.3)",
              borderRadius: 20,
              background: "rgba(0,212,255,0.05)",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: cyan,
                boxShadow: `0 0 8px ${cyan}`,
                animation: "pulse 2s infinite",
              }}
            />
            <span style={{ ...mono, fontSize: "11px", color: cyan, fontWeight: 600, letterSpacing: "0.1em" }}>
              rogex-neuro-1-beta — PRISMA Beta v0.1
            </span>
          </div>

          {/* Main headline */}
          <h1
            style={{
              ...inter,
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "#ffffff",
              marginBottom: 24,
            }}
          >
            El primer motor software de{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${cyan}, ${violet})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              rogex-neuro
            </span>{" "}
            empieza aquí.
          </h1>

          {/* Sub */}
          <p
            style={{
              ...inter,
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#6b82a8",
              lineHeight: 1.7,
              maxWidth: 680,
              margin: "0 auto 40px",
            }}
          >
            PRISMA Beta convierte señales EEG simuladas o pregrabadas en métricas visuales
            de calma, atención, somnolencia, estabilidad meditativa y calidad de señal.
            Una beta digital creada para demostrar el futuro de rogex-neuro antes del dispositivo físico.
          </p>

          {/* Development status */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 22px",
              border: `1px solid rgba(245,158,11,0.3)`,
              borderRadius: 14,
              background: "rgba(245,158,11,0.05)",
              marginBottom: 40,
            }}
          >
            <AlertTriangle size={16} style={{ color: "#f59e0b", flexShrink: 0 }} />
            <span style={{ ...inter, fontSize: "14px", color: "#dde8f5", fontWeight: 500, textAlign: "left" }}>
              En desarrollo activo · <span style={{ color: "#f59e0b" }}>aún no está a la venta</span>.
              Apúntate para el acceso anticipado.
            </span>
          </div>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              marginBottom: 48,
            }}
          >
            <a
              href="#newsletter"
              style={{
                ...inter,
                fontSize: "15px",
                fontWeight: 700,
                color: "#060c18",
                background: `linear-gradient(135deg, ${cyan}, #0ea5e9)`,
                padding: "14px 28px",
                borderRadius: 10,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: `0 0 30px rgba(0,212,255,0.25)`,
                transition: "opacity 0.2s",
              }}
            >
              Quiero el acceso anticipado
              <ChevronRight size={16} />
            </a>
            <a
              href="https://rogexlaboratories.streamlit.app"
              style={{
                ...inter,
                fontSize: "15px",
                fontWeight: 600,
                color: "#dde8f5",
                padding: "14px 28px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "border-color 0.2s",
              }}
            >
              <Play size={14} /> Ver cómo funciona
            </a>
            <a
              href="#investors"
              style={{
                ...inter,
                fontSize: "15px",
                fontWeight: 600,
                color: violet,
                padding: "14px 28px",
                borderRadius: 10,
                border: `1px solid ${violet}40`,
                background: `${violet}08`,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Soy inversionista
            </a>
          </div>

          {/* EEG waveform decoration */}
          <EEGLine />

          {/* Software-only tag */}
          <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
            <span
              style={{
                ...mono,
                fontSize: "10px",
                color: "#4a5568",
                padding: "4px 12px",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 4,
                letterSpacing: "0.08em",
              }}
            >
              Software-only beta · No hardware required · Not a medical device
            </span>
          </div>
        </div>

        {/* Dashboard preview below hero */}
        <div style={{ position: "relative", maxWidth: 1100, width: "100%", marginTop: 64 }}>
          <div
            style={{
              position: "absolute",
              inset: "-1px",
              borderRadius: 18,
              background: `linear-gradient(135deg, rgba(0,212,255,0.3), rgba(124,58,237,0.3), transparent)`,
              padding: 1,
              zIndex: 0,
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─── */}
      <div style={{ borderTop: "1px solid rgba(0,212,255,0.08)", margin: "0 48px" }} />

      {/* ── 2. PROBLEMA ─────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "100px 24px",
        }}
      >
        <SectionLabel>El problema</SectionLabel>
        <h2
          style={{
            ...inter,
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            maxWidth: 640,
            marginBottom: 60,
          }}
        >
          La neurotecnología necesita una capa software antes del hardware.
        </h2>
        <p
          style={{
            ...inter,
            fontSize: "16px",
            color: "#6b82a8",
            lineHeight: 1.7,
            maxWidth: 680,
            marginBottom: 60,
          }}
        >
          Antes de construir un dispositivo físico, rogex-neuro necesita demostrar su núcleo:
          un motor capaz de recibir señales, analizarlas, extraer patrones, visualizar estados
          funcionales y generar informes comprensibles. PRISMA Beta nace para validar esa primera capa.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              icon: <Cpu size={20} />,
              title: "El hardware no basta",
              desc: "Los sensores solo capturan datos. El valor real está en interpretarlos, visualizarlos y convertirlos en información accionable.",
            },
            {
              icon: <BarChart3 size={20} />,
              title: "Los datos crudos no venden",
              desc: "Un inversor, usuario o investigador necesita ver estados, tendencias e informes claros — no señales en bruto.",
            },
            {
              icon: <GitBranch size={20} />,
              title: "El futuro será circuito cerrado",
              desc: "Medir, interpretar, responder y volver a medir será la base de los próximos sistemas de autorregulación mental.",
            },
          ].map((c) => (
            <FeatureCard key={c.title} {...c} />
          ))}
        </div>
      </section>

      {/* ── 3. QUÉ ES PRISMA ────────────────────────────────── */}
      <section
        id="prisma"
        style={{
          background: "rgba(0,212,255,0.02)",
          borderTop: "1px solid rgba(0,212,255,0.08)",
          borderBottom: "1px solid rgba(0,212,255,0.08)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div>
              <SectionLabel>Qué es PRISMA Beta</SectionLabel>
              <h2
                style={{
                  ...inter,
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: 20,
                }}
              >
                Una beta digital para demostrar el futuro de rogex-neuro.
              </h2>
              <p
                style={{
                  ...inter,
                  fontSize: "15px",
                  color: "#6b82a8",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                PRISMA Beta es un software experimental que simula y analiza actividad EEG para mostrar
                cómo rogex-neuro interpretará estados funcionales en futuras versiones conectadas a hardware real.
              </p>
              <p
                style={{
                  ...inter,
                  fontSize: "15px",
                  color: "#6b82a8",
                  lineHeight: 1.7,
                }}
              >
                No requiere dispositivo físico en esta fase. Trabaja con señales simuladas o pregrabadas
                para demostrar el motor de análisis, la interfaz, el sistema de métricas y la generación de informes.
              </p>
            </div>

            {/* Flow diagram */}
            <div
              style={{
                background: card,
                border: "1px solid rgba(0,212,255,0.12)",
                borderRadius: 16,
                padding: "32px",
              }}
            >
              <p
                style={{
                  ...mono,
                  fontSize: "10px",
                  color: "#6b82a8",
                  letterSpacing: "0.1em",
                  marginBottom: 24,
                  textTransform: "uppercase",
                }}
              >
                Motor de análisis — pipeline
              </p>
              {[
                { label: "Señal EEG simulada", color: cyan },
                { label: "Procesamiento digital", color: "#0ea5e9" },
                { label: "Bandas cerebrales", color: teal },
                { label: "Índices funcionales", color: "#8b5cf6" },
                { label: "Clasificación de estado", color: violet },
                { label: "Informe exportable", color: "#f59e0b" },
              ].map((step, i) => (
                <div key={step.label}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 16px",
                      borderRadius: 8,
                      background: `${step.color}08`,
                      border: `1px solid ${step.color}25`,
                    }}
                  >
                    <span
                      style={{
                        ...mono,
                        fontSize: "9px",
                        color: step.color,
                        fontWeight: 700,
                        width: 16,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        ...inter,
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#dde8f5",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < 5 && (
                    <div
                      style={{
                        width: 1,
                        height: 12,
                        background: `linear-gradient(${step.color}, ${[cyan, "#0ea5e9", teal, "#8b5cf6", violet, "#f59e0b"][i + 1]})`,
                        margin: "0 23px",
                        opacity: 0.4,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FUNCIONALIDADES ──────────────────────────────── */}
      <section id="features" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <SectionLabel>Funcionalidades</SectionLabel>
        <h2
          style={{
            ...inter,
            fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Qué incluye rogex-neuro-1-beta
        </h2>
        <p
          style={{
            ...inter,
            fontSize: "15px",
            color: "#6b82a8",
            marginBottom: 56,
            maxWidth: 540,
          }}
        >
          Un conjunto completo de herramientas para análisis EEG simulado, visualización
          de estados y demostración del motor neurotecnológico.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {[
            {
              icon: <Activity size={18} />,
              title: "Simulador EEG",
              desc: "Genera señales sintéticas para escenarios como relajación, foco, somnolencia, mente activa y meditación ligera.",
            },
            {
              icon: <BarChart3 size={18} />,
              title: "Bandas cerebrales",
              desc: "Visualiza Delta, Theta, Alpha, Beta y Gamma en tiempo real o en sesiones simuladas con análisis espectral.",
            },
            {
              icon: <TrendingUp size={18} />,
              title: "Métricas funcionales",
              desc: "Calcula Calm Index, Attention Index, Drowsiness Index, Meditation Stability y Signal Quality.",
            },
            {
              icon: <Brain size={18} />,
              title: "Clasificación de estado",
              desc: "Estima estados funcionales: relajado, atento, somnoliento, meditación ligera o mente activa.",
            },
            {
              icon: <Zap size={18} />,
              title: "Session Mode",
              desc: "Crea sesiones con baseline inicial, fase de meditación y análisis comparativo final.",
            },
            {
              icon: <Users size={18} />,
              title: "Investor Demo Mode",
              desc: "Demos preparadas para mostrar el potencial del motor a socios, inversionistas o colaboradores.",
            },
            {
              icon: <FileText size={18} />,
              title: "Informes exportables",
              desc: "Genera reportes de sesión con comparación entre baseline y estado final en formato PDF.",
            },
            {
              icon: <GitBranch size={18} />,
              title: "Arquitectura futura",
              desc: "Preparado para evolucionar hacia BrainFlow, LSL, EEG real, Arduino, ESP32 y biofeedback físico.",
            },
          ].map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ── 5. DASHBOARD PREVIEW ────────────────────────────── */}
      <section
        id="dashboard"
        style={{
          background: "rgba(124,58,237,0.03)",
          borderTop: "1px solid rgba(124,58,237,0.1)",
          borderBottom: "1px solid rgba(124,58,237,0.1)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel>Dashboard Preview</SectionLabel>
            <h2
              style={{
                ...inter,
                fontSize: "clamp(26px, 3.5vw, 44px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              Visualiza el estado. Interpreta el cambio. Muestra el potencial.
            </h2>
            <p
              style={{
                ...inter,
                fontSize: "15px",
                color: "#6b82a8",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              PRISMA Beta está diseñado para que cualquier persona pueda entender lo que ocurre
              en una sesión: desde datos crudos hasta interpretación visual en tiempo real.
            </p>
          </div>
          <DashboardMockup />
        </div>
      </section>

      {/* ── 6. PARA QUIÉN ES ─────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <SectionLabel>Para quién es</SectionLabel>
        <h2
          style={{
            ...inter,
            fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: 56,
          }}
        >
          Para quién estamos construyendo PRISMA
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {[
            {
              icon: <Zap size={18} />,
              title: "Early adopters",
              desc: "Gente que quiere ser de los primeros en probar una nueva categoría de neurotecnología software.",
              color: cyan,
            },
            {
              icon: <Cpu size={18} />,
              title: "Makers y biohackers",
              desc: "Curiosos del EEG y el biofeedback que disfrutan explorando y experimentando de forma responsable.",
              color: teal,
            },
            {
              icon: <BarChart3 size={18} />,
              title: "Investigadores y educadores",
              desc: "Quienes necesitan visualizar bandas, métricas y estados de forma clara para enseñar o prototipar.",
              color: "#0ea5e9",
            },
            {
              icon: <Users size={18} />,
              title: "Colaboradores e inversores",
              desc: "Personas que quieren entender y acompañar el proyecto desde su primera fase.",
              color: violet,
            },
            {
              icon: <GitBranch size={18} />,
              title: "Futuros usuarios de hardware",
              desc: "El software nace como base para integrarse con EEG real y biofeedback más adelante.",
              color: "#8b5cf6",
            },
            {
              icon: <Activity size={18} />,
              title: "La comunidad temprana",
              desc: "Quien se apunte a la newsletter recibe cada avance y el acceso anticipado en cuanto esté listo.",
              color: "#f59e0b",
            },
          ].map((b) => (
            <BenefitCard key={b.title} {...b} />
          ))}
        </div>
      </section>

      {/* ── 7. NEWSLETTER · en desarrollo + captación de early-access ── */}
      <Newsletter />

      {/* ── 8. ROADMAP ──────────────────────────────────────── */}
      <section id="roadmap" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div>
            <SectionLabel>Roadmap</SectionLabel>
            <h2
              style={{
                ...inter,
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              Roadmap rogex-neuro
            </h2>
            <p style={{ ...inter, fontSize: "15px", color: "#6b82a8", lineHeight: 1.6 }}>
              Cinco fases para construir la primera plataforma de neurotecnología personal
              completa. PRISMA Beta es donde empieza todo.
            </p>
          </div>

          <div>
            {[
              {
                phase: "F1",
                name: "PRISMA Beta",
                title: "rogex-neuro-1-beta — Software Alpha",
                desc: "Análisis EEG simulado, métricas funcionales, informes, Investor Demo Mode. Actual.",
                active: true,
                color: cyan,
              },
              {
                phase: "F2",
                name: "Hardware Alpha",
                title: "rogex-neuro-1 — EEG Real",
                desc: "Conexión con EEG real, sensores, biofeedback visual/sonoro/háptico y pruebas con usuarios.",
                active: false,
                color: teal,
              },
              {
                phase: "F3",
                name: "ASTRA",
                title: "rogex-neuro-2 — Experiencias inmersivas",
                desc: "Meditación guiada por señal real, ritual digital, biofeedback espiritual y sesiones avanzadas.",
                active: false,
                color: "#8b5cf6",
              },
              {
                phase: "F4",
                name: "ARIADNE",
                title: "rogex-neuro-3 — IA personal",
                desc: "Guía IA personalizada basada en sesiones, patrones, diarios y evolución del usuario.",
                active: false,
                color: violet,
              },
              {
                phase: "F5",
                name: "NOOSPHERE",
                title: "rogex-neuro-4 — Plataforma colectiva",
                desc: "Patrones interiores anónimos, investigación y expansión del ecosistema de neurotecnología.",
                active: false,
                color: "#4a1d96",
              },
            ].map((item) => (
              <RoadmapItem key={item.phase} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. INVERSORES ───────────────────────────────────── */}
      <section
        id="investors"
        style={{
          background: "rgba(124,58,237,0.03)",
          borderTop: "1px solid rgba(124,58,237,0.12)",
          borderBottom: "1px solid rgba(124,58,237,0.12)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
          <div style={{ marginBottom: 64 }}>
            <SectionLabel>Investor Access</SectionLabel>
            <h2
              style={{
                ...inter,
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: 16,
                maxWidth: 640,
              }}
            >
              rogex-neuro no empieza como un dispositivo. Empieza como una plataforma.
            </h2>
            <p
              style={{
                ...inter,
                fontSize: "15px",
                color: "#6b82a8",
                lineHeight: 1.7,
                maxWidth: 680,
              }}
            >
              Rogex Laboratories está construyendo una nueva categoría de software y hardware alrededor de
              neurotecnología personal, biofeedback, estados funcionales e interfaces de autorregulación.
              rogex-neuro-1-beta es el primer paso: una prueba software del motor que posteriormente se
              conectará a dispositivos EEG, sensores y sistemas de feedback.
            </p>
          </div>

          {/* Mini metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 64,
            }}
          >
            {[
              { k: "Producto actual", v: "Software beta" },
              { k: "Estado", v: "Pre-hardware" },
              { k: "Modelo", v: "Licencia digital" },
              { k: "Disponibilidad", v: "Próximamente" },
              { k: "Objetivo inicial", v: "Validar demanda" },
            ].map(({ k, v }) => (
              <div
                key={k}
                style={{
                  background: card,
                  border: "1px solid rgba(124,58,237,0.15)",
                  borderRadius: 12,
                  padding: "20px",
                }}
              >
                <p style={{ ...mono, fontSize: "9px", color: "#6b82a8", letterSpacing: "0.1em", marginBottom: 8, textTransform: "uppercase" }}>
                  {k}
                </p>
                <p style={{ ...inter, fontSize: "15px", fontWeight: 600, color: "#dde8f5" }}>{v}</p>
              </div>
            ))}
          </div>

          {/* Investment benefits */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
              marginBottom: 48,
            }}
          >
            {[
              {
                icon: <Globe size={18} />,
                title: "Mercado emergente",
                desc: "La neurotecnología de consumo, bienestar digital, IA personalizada y biofeedback convergen en una nueva categoría.",
                color: cyan,
              },
              {
                icon: <Shield size={18} />,
                title: "Software primero",
                desc: "El proyecto empieza con una beta digital de bajo coste antes de invertir en hardware, reduciendo riesgo inicial.",
                color: teal,
              },
              {
                icon: <TrendingUp size={18} />,
                title: "Escalabilidad",
                desc: "El motor evoluciona desde simulación hacia dispositivos reales, licencias, suscripciones y hardware propietario.",
                color: "#0ea5e9",
              },
              {
                icon: <GitBranch size={18} />,
                title: "Ecosistema progresivo",
                desc: "rogex-neuro tiene una ruta clara: PRISMA → ASTRA → ARIADNE → NOOSPHERE.",
                color: violet,
              },
              {
                icon: <Brain size={18} />,
                title: "Datos e interpretación",
                desc: "El valor no está solo en captar señales, sino en convertirlas en informes, métricas y experiencias.",
                color: "#8b5cf6",
              },
              {
                icon: <Users size={18} />,
                title: "Comunidad temprana",
                desc: "La lista de early-access valida el interés y construye una base de primeros usuarios antes del lanzamiento.",
                color: "#f59e0b",
              },
              {
                icon: <Lock size={18} />,
                title: "Posible modelo de negocio",
                desc: "Ingresos por licencias digitales, suscripción, hardware futuro, módulos premium, B2B wellness e investigación.",
                color: teal,
              },
            ].map((b) => (
              <BenefitCard key={b.title} {...b} />
            ))}
          </div>

          {/* Investor CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a
              href="https://cal.com/rogexlaboratories"
              style={{
                ...inter,
                fontSize: "14px",
                fontWeight: 600,
                color: "#060c18",
                background: `linear-gradient(135deg, ${violet}, #9333ea)`,
                padding: "12px 24px",
                borderRadius: 10,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Solicitar investor brief <ArrowUpRight size={14} />
            </a>
            <a
              href="https://cal.com/rogexlaboratories"
              style={{
                ...inter,
                fontSize: "14px",
                fontWeight: 600,
                color: "#dde8f5",
                padding: "12px 24px",
                borderRadius: 10,
                border: `1px solid ${violet}40`,
                background: `${violet}08`,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Agendar conversación <ArrowUpRight size={14} />
            </a>
            <a
              href="#roadmap"
              style={{
                ...inter,
                fontSize: "14px",
                fontWeight: 600,
                color: "#6b82a8",
                padding: "12px 24px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.1)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Ver roadmap completo
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. USO DE FONDOS ───────────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <SectionLabel>Uso de fondos</SectionLabel>
        <h2
          style={{
            ...inter,
            fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: 56,
          }}
        >
          Qué financia esta primera etapa
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {[
            { pct: "30%", title: "EEG real y sensores", desc: "Compra de dispositivos EEG existentes y componentes de biofeedback.", color: cyan },
            { pct: "25%", title: "Integración técnica", desc: "Conexión con BrainFlow, LSL, Arduino, ESP32 y sistemas de feedback.", color: teal },
            { pct: "20%", title: "Validación con usuarios", desc: "Pruebas controladas de sesiones de calma, atención y meditación.", color: "#0ea5e9" },
            { pct: "15%", title: "Diseño de dispositivo", desc: "Primeras exploraciones de forma física, carcasa y experiencia de uso.", color: violet },
            { pct: "10%", title: "Seguridad y privacidad", desc: "Consentimiento, protección de datos, disclaimers y diseño responsable.", color: "#f59e0b" },
          ].map(({ pct, title, desc, color }) => (
            <div
              key={title}
              style={{
                background: card,
                border: `1px solid ${color}20`,
                borderRadius: 14,
                padding: "24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${color}, transparent)`,
                }}
              />
              <span
                style={{
                  ...mono,
                  fontSize: "28px",
                  fontWeight: 700,
                  color,
                  display: "block",
                  marginBottom: 8,
                  lineHeight: 1,
                }}
              >
                {pct}
              </span>
              <h3 style={{ ...inter, fontSize: "14px", fontWeight: 600, color: "#dde8f5", marginBottom: 8 }}>
                {title}
              </h3>
              <p style={{ ...inter, fontSize: "12px", color: "#6b82a8", lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 11. DIFERENCIACIÓN ──────────────────────────────── */}
      <section
        style={{
          background: "rgba(0,212,255,0.02)",
          borderTop: "1px solid rgba(0,212,255,0.08)",
          borderBottom: "1px solid rgba(0,212,255,0.08)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
          <SectionLabel>Diferenciación</SectionLabel>
          <h2
            style={{
              ...inter,
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 56,
            }}
          >
            Por qué rogex-neuro es diferente
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                label: "Apps de meditación",
                desc: "Guían al usuario, pero no interpretan señales cerebrales reales.",
                highlight: false,
              },
              {
                label: "Wearables genéricos",
                desc: "Miden datos, pero no crean una experiencia profunda ni interpretación funcional.",
                highlight: false,
              },
              {
                label: "EEG de laboratorio",
                desc: "Potente, pero complejo, costoso y poco accesible para el usuario común.",
                highlight: false,
              },
              {
                label: "rogex-neuro",
                desc: "Une software, señal, experiencia, interpretación y futuro hardware en una sola plataforma.",
                highlight: true,
              },
            ].map(({ label, desc, highlight }) => (
              <div
                key={label}
                style={{
                  background: highlight ? `rgba(0,212,255,0.06)` : card,
                  border: `1px solid ${highlight ? "rgba(0,212,255,0.3)" : "rgba(0,212,255,0.08)"}`,
                  borderRadius: 14,
                  padding: "24px",
                  boxShadow: highlight ? `0 0 30px rgba(0,212,255,0.06)` : "none",
                }}
              >
                <h3
                  style={{
                    ...inter,
                    fontSize: "15px",
                    fontWeight: 600,
                    color: highlight ? cyan : "#4a5568",
                    marginBottom: 10,
                  }}
                >
                  {label}
                </h3>
                <p style={{ ...inter, fontSize: "13px", color: highlight ? "#6b82a8" : "#374151", lineHeight: 1.5 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. TRANSPARENCIA ───────────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <SectionLabel>Transparencia</SectionLabel>
        <h2
          style={{
            ...inter,
            fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Lo que PRISMA Beta es y no es
        </h2>
        <p style={{ ...inter, fontSize: "14px", color: "#6b82a8", marginBottom: 48 }}>
          Esta sección transmite honestidad, no debilidad.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {/* IS */}
          <div
            style={{
              background: "rgba(0,212,255,0.03)",
              border: "1px solid rgba(0,212,255,0.15)",
              borderRadius: 16,
              padding: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <CheckCircle2 size={20} style={{ color: cyan }} />
              <h3 style={{ ...inter, fontSize: "18px", fontWeight: 700, color: "#ffffff" }}>Es</h3>
            </div>
            {[
              "Software experimental de análisis EEG",
              "Motor de análisis de estados funcionales",
              "Simulador EEG con múltiples escenarios",
              "Dashboard neurostate interactivo",
              "Demo técnica para inversionistas",
              "Base para hardware futuro",
              "Producto digital early-access",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(0,212,255,0.06)",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: cyan,
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <span style={{ ...inter, fontSize: "13px", color: "#8eaac8" }}>{item}</span>
              </div>
            ))}
          </div>

          {/* IS NOT */}
          <div
            style={{
              background: "rgba(245,158,11,0.03)",
              border: "1px solid rgba(245,158,11,0.15)",
              borderRadius: 16,
              padding: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <XCircle size={20} style={{ color: "#f59e0b" }} />
              <h3 style={{ ...inter, fontSize: "18px", fontWeight: 700, color: "#ffffff" }}>No es</h3>
            </div>
            {[
              "Dispositivo médico certificado",
              "Herramienta de diagnóstico clínico",
              "Terapia ni tratamiento médico",
              "Control o manipulación mental",
              "Hardware o componente físico",
              "Sustituto de atención médica",
              "Producto con resultados clínicos garantizados",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(245,158,11,0.06)",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#f59e0b",
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <span style={{ ...inter, fontSize: "13px", color: "#a07020" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. CTA FINAL ───────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 24px", textAlign: "center", position: "relative" }}>
          <SectionLabel>Entra en rogex-neuro</SectionLabel>
          <h2
            style={{
              ...inter,
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              marginBottom: 20,
            }}
          >
            Entra en la primera fase de{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${cyan}, ${violet})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              rogex-neuro
            </span>
          </h2>
          <p
            style={{
              ...inter,
              fontSize: "16px",
              color: "#6b82a8",
              lineHeight: 1.7,
              maxWidth: 620,
              margin: "0 auto 48px",
            }}
          >
            PRISMA Beta es el primer paso para construir una plataforma neurotecnológica completa.
            Una beta digital creada para demostrar el motor, atraer early adopters
            y financiar la transición hacia hardware real.
          </p>

          {/* Status repeat */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 22px",
              border: "1px solid rgba(245,158,11,0.25)",
              background: "rgba(245,158,11,0.05)",
              borderRadius: 12,
              marginBottom: 36,
            }}
          >
            <AlertTriangle size={14} style={{ color: "#f59e0b" }} />
            <span style={{ ...mono, fontSize: "11px", color: "#f59e0b", letterSpacing: "0.08em" }}>
              EN DESARROLLO · AÚN NO A LA VENTA
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              marginBottom: 48,
            }}
          >
            <a
              href="#newsletter"
              style={{
                ...inter,
                fontSize: "15px",
                fontWeight: 700,
                color: "#060c18",
                background: `linear-gradient(135deg, ${cyan}, #0ea5e9)`,
                padding: "14px 32px",
                borderRadius: 10,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: `0 0 40px rgba(0,212,255,0.2)`,
              }}
            >
              Apúntate a la newsletter <ChevronRight size={16} />
            </a>
            <a
              href="#investors"
              style={{
                ...inter,
                fontSize: "15px",
                fontWeight: 600,
                color: "#dde8f5",
                padding: "14px 32px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                textDecoration: "none",
              }}
            >
              Soy inversionista
            </a>
            <a
              href="#dashboard"
              style={{
                ...inter,
                fontSize: "15px",
                fontWeight: 600,
                color: "#6b82a8",
                padding: "14px 32px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
              }}
            >
              Ver demo
            </a>
          </div>

          <p style={{ ...inter, fontSize: "12px", color: "#374151" }}>
            PRISMA Beta es una herramienta experimental de análisis y visualización. No es un dispositivo médico.
            No diagnostica, trata, cura ni previene enfermedades.
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(0,212,255,0.08)",
          padding: "48px 24px 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 32,
          }}
        >
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${cyan}, ${violet})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Activity size={14} style={{ color: "white" }} />
              </div>
              <span style={{ ...inter, fontSize: "14px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em" }}>
                ROGEX LABORATORIES
              </span>
            </div>
            <p style={{ ...inter, fontSize: "12px", color: "#374151", lineHeight: 1.6 }}>
              Building the next layer of human-computer neurotechnology.
            </p>
          </div>

          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <p style={{ ...mono, fontSize: "9px", color: "#6b82a8", letterSpacing: "0.12em", marginBottom: 12, textTransform: "uppercase" }}>
                Producto
              </p>
              {["PRISMA Beta", "Funcionalidades", "Dashboard", "Newsletter"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(" ", "")}`}
                  style={{ ...inter, fontSize: "12px", color: "#4a5568", display: "block", marginBottom: 8, textDecoration: "none" }}
                >
                  {l}
                </a>
              ))}
            </div>
            <div>
              <p style={{ ...mono, fontSize: "9px", color: "#6b82a8", letterSpacing: "0.12em", marginBottom: 12, textTransform: "uppercase" }}>
                Empresa
              </p>
              {["Roadmap", "Inversores", "Uso de fondos"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/ /g, "")}`}
                  style={{ ...inter, fontSize: "12px", color: "#4a5568", display: "block", marginBottom: 8, textDecoration: "none" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "32px auto 0",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ ...mono, fontSize: "10px", color: "#374151" }}>
            © 2026 Rogex Laboratories · rogex-neuro-1-beta · PRISMA Beta v0.1.0
          </span>
          <span style={{ ...mono, fontSize: "10px", color: "#374151", maxWidth: 480, textAlign: "right", lineHeight: 1.5 }}>
            Software experimental. No es un dispositivo médico. No diagnostica, trata, cura ni previene enfermedades.
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        * { scrollbar-width: thin; scrollbar-color: rgba(0,212,255,0.15) transparent; }
        *::-webkit-scrollbar { width: 6px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.15); border-radius: 3px; }
      `}</style>
    </div>
  );
}
