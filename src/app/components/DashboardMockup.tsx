import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

function generateEEG(points: number) {
  const data = [];
  for (let i = 0; i < points; i++) {
    const t = i / 10;
    const val =
      Math.sin(t * 2.1) * 30 +
      Math.sin(t * 5.3) * 15 +
      Math.sin(t * 12.7) * 8 +
      Math.sin(t * 0.7) * 20 +
      (Math.random() - 0.5) * 10;
    data.push({ t: i, v: parseFloat(val.toFixed(2)) });
  }
  return data;
}

const bandData = [
  { name: "δ Delta", value: 12, color: "#7c3aed" },
  { name: "θ Theta", value: 18, color: "#8b5cf6" },
  { name: "α Alpha", value: 35, color: "#00d4ff" },
  { name: "β Beta", value: 25, color: "#14b8a6" },
  { name: "γ Gamma", value: 10, color: "#0ea5e9" },
];

function RadialMetric({
  label,
  value,
  color,
  unit = "%",
}: {
  label: string;
  value: number;
  color: string;
  unit?: string;
}) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: 70, height: 70 }}>
        <svg width={70} height={70} viewBox="0 0 70 70">
          <circle
            cx={35}
            cy={35}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={5}
          />
          <circle
            cx={35}
            cy={35}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={5}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={circ / 4}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "13px",
            fontWeight: 600,
            color: "#dde8f5",
          }}
        >
          {value}
          <span style={{ fontSize: "9px", color: "#6b82a8" }}>{unit}</span>
        </div>
      </div>
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "9px",
          fontWeight: 500,
          color: "#6b82a8",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function StatusBadge({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: "20px",
        background: `${color}18`,
        border: `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 6px ${color}`,
          animation: "pulse 2s infinite",
        }}
      />
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "10px",
          fontWeight: 600,
          color,
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function DashboardMockup({ compact = false }: { compact?: boolean }) {
  const [eegData, setEegData] = useState(() => generateEEG(80));
  const [tick, setTick] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setEegData(generateEEG(80));
      setTick((t) => t + 1);
    }, 1800);
    return () => clearInterval(intervalRef.current);
  }, []);

  const calm = 72 + Math.round(Math.sin(tick * 0.7) * 8);
  const attention = 58 + Math.round(Math.sin(tick * 1.1) * 12);
  const drowsiness = 18 + Math.round(Math.sin(tick * 0.4) * 6);
  const meditation = 65 + Math.round(Math.sin(tick * 0.9) * 10);
  const quality = 91 + Math.round(Math.sin(tick * 0.3) * 4);

  return (
    <div
      style={{
        background: "#060c18",
        border: "1px solid rgba(0,212,255,0.18)",
        borderRadius: "16px",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        boxShadow:
          "0 0 60px rgba(0,212,255,0.06), 0 24px 80px rgba(0,0,0,0.5)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "#080f1e",
          borderBottom: "1px solid rgba(0,212,255,0.1)",
          padding: compact ? "10px 16px" : "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#ffbd2e", "#27c93f"].map((c) => (
              <div
                key={c}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "11px",
              color: "#6b82a8",
              marginLeft: 8,
            }}
          >
            PRISMA Beta — Neurostate Analysis Engine v0.1.0-beta
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <StatusBadge label="LIVE SESSION" color="#00d4ff" />
          <StatusBadge label="SIM MODE" color="#14b8a6" />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "1fr" : "1fr 280px",
          gap: 0,
        }}
      >
        {/* Left / main panel */}
        <div style={{ padding: compact ? "16px" : "20px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* EEG waveform */}
          <div
            style={{
              background: "#080f1e",
              border: "1px solid rgba(0,212,255,0.08)",
              borderRadius: 10,
              padding: "12px 16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "10px",
                  color: "#00d4ff",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                LIVE SIGNAL — Ch1 (Fp1-Fp2)
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "9px",
                  color: "#6b82a8",
                }}
              >
                256 Hz • μV
              </span>
            </div>
            <ResponsiveContainer width="100%" height={compact ? 70 : 90}>
              <LineChart data={eegData}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#00d4ff"
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Band power */}
          <div
            style={{
              background: "#080f1e",
              border: "1px solid rgba(0,212,255,0.08)",
              borderRadius: 10,
              padding: "12px 16px",
            }}
          >
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "10px",
                color: "#14b8a6",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              BAND POWER RELATIVE
            </span>
            <ResponsiveContainer width="100%" height={compact ? 80 : 100}>
              <BarChart
                data={bandData}
                margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "#6b82a8",
                    fontSize: 9,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  contentStyle={{
                    background: "#0a1628",
                    border: "1px solid rgba(0,212,255,0.2)",
                    borderRadius: 6,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    color: "#dde8f5",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {bandData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Metrics row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8,
            }}
          >
            <RadialMetric label="Calm Index" value={calm} color="#00d4ff" />
            <RadialMetric
              label="Attention"
              value={attention}
              color="#14b8a6"
            />
            <RadialMetric
              label="Drowsiness"
              value={drowsiness}
              color="#7c3aed"
            />
            <RadialMetric
              label="Meditation"
              value={meditation}
              color="#8b5cf6"
            />
            <RadialMetric
              label="Signal Quality"
              value={quality}
              color="#0ea5e9"
            />
          </div>
        </div>

        {/* Right panel — state + report */}
        {!compact && (
          <div
            style={{
              borderLeft: "1px solid rgba(0,212,255,0.08)",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Detected state */}
            <div
              style={{
                background: "#080f1e",
                border: "1px solid rgba(0,212,255,0.08)",
                borderRadius: 10,
                padding: "14px",
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "9px",
                  color: "#6b82a8",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                DETECTED STATE
              </span>
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: "rgba(0,212,255,0.06)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#00d4ff",
                    letterSpacing: "0.04em",
                  }}
                >
                  RELAXED FOCUS
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "9px",
                    color: "#6b82a8",
                  }}
                >
                  CONFIDENCE
                </span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "12px",
                    color: "#14b8a6",
                    fontWeight: 600,
                  }}
                >
                  87%
                </span>
              </div>
              <div
                style={{
                  marginTop: 6,
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "87%",
                    height: "100%",
                    background: "linear-gradient(90deg, #14b8a6, #00d4ff)",
                    borderRadius: 2,
                    boxShadow: "0 0 8px rgba(0,212,255,0.4)",
                  }}
                />
              </div>
            </div>

            {/* Session data */}
            <div
              style={{
                background: "#080f1e",
                border: "1px solid rgba(0,212,255,0.08)",
                borderRadius: 10,
                padding: "14px",
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "9px",
                  color: "#6b82a8",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                SESSION DATA
              </span>
              {[
                { k: "Duration", v: "08:42" },
                { k: "Baseline Δ", v: "+14%" },
                { k: "Samples", v: "134,656" },
                { k: "Mode", v: "Meditation" },
              ].map(({ k, v }) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "10px",
                      color: "#6b82a8",
                    }}
                  >
                    {k}
                  </span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "10px",
                      color: "#dde8f5",
                      fontWeight: 600,
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>

            {/* Export button */}
            <button
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))",
                border: "1px solid rgba(0,212,255,0.25)",
                borderRadius: 8,
                padding: "10px 14px",
                color: "#00d4ff",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                cursor: "pointer",
                width: "100%",
                transition: "all 0.2s",
              }}
            >
              ↓ EXPORT REPORT
            </button>

            {/* States legend */}
            <div>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "9px",
                  color: "#6b82a8",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                FUNCTIONAL STATES
              </span>
              {[
                { s: "Relaxed", c: "#00d4ff", a: true },
                { s: "Focused", c: "#14b8a6", a: false },
                { s: "Drowsy", c: "#7c3aed", a: false },
                { s: "Active Mind", c: "#0ea5e9", a: false },
                { s: "Light Med.", c: "#8b5cf6", a: false },
              ].map(({ s, c, a }) => (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "4px 0",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: a ? c : "rgba(255,255,255,0.15)",
                      boxShadow: a ? `0 0 6px ${c}` : "none",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "10px",
                      color: a ? c : "#4a5568",
                      fontWeight: a ? 600 : 400,
                    }}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
