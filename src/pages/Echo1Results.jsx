import { useEffect, useMemo, useState } from "react";
import benchmark from "../data/echo1-benchmark.json";

const ACTIONS = ["acercarse", "evitar", "esperar"];
const GATES = ["OK", "MODIFY", "BLOCK"];

const TERMS = [
  ["WSP", "Paquete de 16 bytes que representa lo percibido en un formato compartido."],
  ["CAM", "Memoria episódica: conserva qué ocurrió y sólo marca hechos cuando existe evidencia."],
  ["Q", "Tabla de política. Puntúa las acciones acercarse, evitar y esperar para cada estado."],
  ["T", "Modelo de transición de un paso: predice qué estado seguirá a una acción."],
  ["Pattern", "Memoria de contexto que añade el estado anterior cuando T no puede distinguir un patrón."],
  ["Gate", "Puerta final de seguridad. Puede aceptar, modificar o bloquear una propuesta."],
  ["ATTEND", "Decisión de despertar el reloj lento ante incertidumbre, novedad o contradicción."],
  ["Córtex", "Reloj lento opcional. Propone; nunca escribe hechos ni controla directamente el cuerpo."],
  ["δ", "Error de aprendizaje: diferencia entre lo esperado y la consecuencia observada."],
  ["scratch", "Control que empieza desde cero y ejecuta exactamente el mismo protocolo."],
  ["held-out", "Examen congelado: esos casos no se usan para aprender mientras se puntúan."],
  ["ROI", "Recompensa adicional obtenida frente al control durante la misma ventana."],
];

function pct(value) {
  return `${(value * 100).toFixed(2).replace(".00", "").replace(".", ",")}%`;
}

function Stat({ value, label }) {
  return (
    <div className="bench-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Bar({ label, value, max, tone = "primary" }) {
  const width = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="bench-bar-row">
      <span>{label}</span>
      <div className="bench-bar-track" aria-hidden="true">
        <i className={`is-${tone}`} style={{ width: `${width}%` }} />
      </div>
      <strong>{value}</strong>
    </div>
  );
}

function LearningChart({ trace, cursor }) {
  const cumulative = useMemo(() => {
    let sum = 0;
    return trace.map((row) => {
      sum += row.reward;
      return sum;
    });
  }, [trace]);

  const width = 760;
  const height = 260;
  const padX = 46;
  const padY = 30;
  const min = Math.min(0, ...cumulative);
  const max = Math.max(1, ...cumulative);
  const span = Math.max(1, max - min);
  const x = (index) => padX + (index / Math.max(1, cumulative.length - 1)) * (width - padX * 2);
  const y = (value) => height - padY - ((value - min) / span) * (height - padY * 2);
  const points = cumulative.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const cursorValue = cumulative[cursor] ?? 0;
  const ticks = [min, Math.round(min + span / 2), max];

  return (
    <div className="bench-chart-shell">
      <svg
        className="bench-line-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Recompensa acumulada durante ${trace.length} turnos; termina en ${cumulative.at(-1) ?? 0}`}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={padX} x2={width - padX} y1={y(tick)} y2={y(tick)} className="chart-grid" />
            <text x={padX - 8} y={y(tick) + 4} textAnchor="end">{tick}</text>
          </g>
        ))}
        {[256, 320].map((turn) => (
          <line key={turn} x1={x(turn)} x2={x(turn)} y1={padY} y2={height - padY} className="chart-phase" />
        ))}
        <polyline points={points} className="chart-line" />
        <line x1={x(cursor)} x2={x(cursor)} y1={padY} y2={height - padY} className="chart-cursor" />
        <circle cx={x(cursor)} cy={y(cursorValue)} r="5" className="chart-point" />
        <text x={padX} y={height - 7}>0</text>
        <text x={x(255)} y={height - 7} textAnchor="middle">256</text>
        <text x={x(319)} y={height - 7} textAnchor="middle">320</text>
        <text x={width - padX} y={height - 7} textAnchor="end">{trace.length}</text>
      </svg>
      <div className="chart-key" aria-hidden="true">
        <span><i className="line-sample" /> recompensa acumulada</span>
        <span><i className="phase-sample" /> cambio de fase</span>
        <span><i className="cursor-sample" /> turno seleccionado</span>
      </div>
    </div>
  );
}

function WorldRing({ row }) {
  return (
    <div
      className="world-ring"
      role="img"
      aria-label={`Anillo de 32 celdas. El agente está en la celda ${row.cell}, tipo ${row.kind}.`}
    >
      {Array.from({ length: 32 }, (_, cell) => {
        const angle = (cell / 32) * Math.PI * 2 - Math.PI / 2;
        const style = {
          left: `${50 + Math.cos(angle) * 43}%`,
          top: `${50 + Math.sin(angle) * 43}%`,
        };
        return (
          <span
            key={cell}
            className={`world-node${cell === row.cell ? ` is-current is-${row.kind.toLowerCase()}` : ""}`}
            style={style}
          />
        );
      })}
      <div className="world-ring-center">
        <span>turno {row.turn}</span>
        <strong>celda {row.cell}</strong>
        <small>{row.kind}</small>
      </div>
    </div>
  );
}

function TurnPlayer({ data, index, setIndex }) {
  const [playing, setPlaying] = useState(false);
  const row = data.trace[index];
  const phase = data.core.phases.find((item) => row.turn >= item.from && row.turn <= item.to);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= data.trace.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 120);
    return () => window.clearInterval(timer);
  }, [playing, data.trace.length, setIndex]);

  const move = (delta) => {
    setPlaying(false);
    setIndex((current) => Math.max(0, Math.min(data.trace.length - 1, current + delta)));
  };

  return (
    <section className="bench-section" aria-labelledby="turn-player-title">
      <div className="bench-section-head">
        <div>
          <span className="bench-kicker">Traza real</span>
          <h2 id="turn-player-title">Así se ve un turno</h2>
        </div>
        <span className="bench-phase">{phase?.name ?? "—"}</span>
      </div>
      <p>
        Recorre la ejecución canónica. El visor no simula nada en el navegador:
        reproduce las 352 líneas emitidas por el agente.
      </p>
      <div className="turn-stage">
        <WorldRing row={row} />
        <div className="turn-readout" aria-live="polite">
          <div><span>acción</span><strong>{ACTIONS[row.action] ?? row.action}</strong></div>
          <div><span>recompensa</span><strong>{row.reward > 0 ? "+" : ""}{row.reward}</strong></div>
          <div><span>Q [acercar, evitar, esperar]</span><strong>[{row.q.join(", ")}]</strong></div>
          <div><span>T predice</span><strong>{row.prediction == null ? "desconocido" : `ranura ${row.prediction}`}</strong></div>
          <div><span>gate</span><strong>{GATES[row.gate] ?? row.gate}</strong></div>
          <div><span>δ</span><strong>{row.delta ? "sí" : "no"}</strong></div>
          <div className="turn-wsp"><span>WSP</span><strong>{row.wsp}</strong></div>
        </div>
      </div>
      <div className="turn-controls">
        <button type="button" onClick={() => move(-1)} disabled={index === 0} aria-label="Turno anterior">←</button>
        <button type="button" onClick={() => setPlaying((value) => !value)}>
          {playing ? "Pausar" : "Reproducir"}
        </button>
        <button type="button" onClick={() => move(1)} disabled={index === data.trace.length - 1} aria-label="Turno siguiente">→</button>
        <input
          type="range"
          min="0"
          max={data.trace.length - 1}
          value={index}
          onChange={(event) => {
            setPlaying(false);
            setIndex(Number(event.target.value));
          }}
          aria-label="Seleccionar turno"
        />
        <output>{index + 1} / {data.trace.length}</output>
      </div>
    </section>
  );
}

function Results({ data, cursor, setCursor }) {
  const patternMax = data.pattern.decisionPoints;
  const transferMax = Math.max(...data.transfer.worlds.flatMap((row) => [row.transfer, row.scratch]));

  return (
    <>
      <header className="bench-hero">
        <span className="bench-kicker">Benchmark canónico determinista</span>
        <h1>ECHO-1 — resultados</h1>
        <p>
          Qué hace el agente, qué mejora frente a sus controles y cómo se ve
          durante una ejecución. Las cifras proceden de los informes de cierre.
        </p>
        <div className="bench-stats">
          <Stat value="−12 → +5" label="la política cambia de acercarse a evitar" />
          <Stat value={pct(data.core.predictionAccuracy)} label={`predicción T · ${data.core.predictionKnownTurns} turnos conocidos`} />
          <Stat value={`+${data.transfer.aggregateGain}`} label="transferencia agregada frente a scratch" />
          <Stat value="0 / 0" label="hechos falsos / memorias destruidas" />
        </div>
      </header>

      <section className="bench-section" aria-labelledby="legend-title">
        <span className="bench-kicker">Leyenda</span>
        <h2 id="legend-title">Cómo leer ECHO-1</h2>
        <p>Pulsa cualquier término para desplegar su significado.</p>
        <div className="bench-terms">
          {TERMS.map(([term, meaning]) => (
            <details key={term}>
              <summary>{term}</summary>
              <p>{meaning}</p>
            </details>
          ))}
        </div>
      </section>

      <TurnPlayer data={data} index={cursor} setIndex={setCursor} />

      <section className="bench-section" aria-labelledby="learning-title">
        <span className="bench-kicker">Aprendizaje y adaptación</span>
        <h2 id="learning-title">Recompensa acumulada por turno</h2>
        <p>
          La primera frontera marca el final de 256 turnos de aprendizaje. La
          segunda separa el mundo desplazado de la sonda final. El cursor sigue
          el turno seleccionado en el reproductor.
        </p>
        <LearningChart trace={data.trace} cursor={cursor} />
        <div className="policy-shift" role="img" aria-label="La política ante peligro pasa de cero cero cero a menos doce, cinco, cero">
          <div><span>antes</span><strong>[0, 0, 0]</strong></div>
          <span aria-hidden="true">→</span>
          <div><span>después</span><strong>[−12, +5, 0]</strong></div>
          <small>acercarse · evitar · esperar</small>
        </div>
      </section>

      <section className="bench-section bench-split" aria-label="Comparaciones predictivas y de transferencia">
        <div className="bench-panel">
          <span className="bench-kicker">PATTERN-0</span>
          <h2>El contexto resuelve la ambigüedad</h2>
          <p>80 puntos held-out. Un desconocido también cuenta como fallo.</p>
          <div className="bench-bars" role="img" aria-label="T acierta 40 de 80; PatternMemory acierta 80 de 80">
            <Bar label="T · un paso" value={data.pattern.tHits} max={patternMax} tone="muted" />
            <Bar label="Pattern" value={data.pattern.patternHits} max={patternMax} />
          </div>
          <strong className="bench-result">+{data.pattern.gain} aciertos</strong>
        </div>

        <div className="bench-panel">
          <span className="bench-kicker">XFER-1</span>
          <h2>La experiencia cruza mundos</h2>
          <p>Mismo protocolo y mismo cuerpo; cambia la experiencia disponible.</p>
          <div className="bench-bars">
            {data.transfer.worlds.map((world) => (
              <div className="bar-group" key={world.name}>
                <h3>Mundo {world.name} · ganancia +{world.gain}</h3>
                <Bar label="transfer" value={world.transfer} max={transferMax} />
                <Bar label="scratch" value={world.scratch} max={transferMax} tone="muted" />
              </div>
            ))}
          </div>
          <strong className="bench-result">+{data.transfer.aggregateGain} agregado</strong>
        </div>
      </section>

      <section className="bench-section" aria-labelledby="conflict-title">
        <span className="bench-kicker">SIGN-C</span>
        <h2 id="conflict-title">Una contradicción, una llamada, un resultado</h2>
        <div className="conflict-flow">
          <div>
            <small>turno {data.conflict.conflictLine.turn}</small>
            <strong>T queda contradicha</strong>
            <span>ATTEND: conflicto · córtex despierta una vez</span>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <small>turno {data.conflict.consumeLine.turn}</small>
            <strong>propuesta: acercarse</strong>
            <span>ATTEND apagada · el gate conserva la acción</span>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <small>resultado</small>
            <strong>+{data.conflict.cortexReward}</strong>
            <span>control rápido {data.conflict.fastReward} · ROI +{data.conflict.roi}</span>
          </div>
        </div>
      </section>

      <section className="bench-section" aria-labelledby="capabilities-title">
        <span className="bench-kicker">Resultado observable</span>
        <h2 id="capabilities-title">Capacidades cerradas</h2>
        <div className="capability-grid">
          <div><strong>{data.capabilities.room.transferredGoalHits}</strong><span>objetivos en otra habitación</span><small>scratch: {data.capabilities.room.scratchGoalHits}</small></div>
          <div><strong>{data.capabilities.object.deliveries}</strong><span>entregas de objeto</span><small>control: {data.capabilities.object.controlDeliveries}</small></div>
          <div><strong>{data.capabilities.open.openings}</strong><span>aperturas · {data.capabilities.open.deliveries} entregas</span><small>control: {data.capabilities.open.controlOpenings}</small></div>
          <div><strong>{data.capabilities.narration.hits}/{data.capabilities.narration.total}</strong><span>cláusulas narradas correctamente</span><small>escrituras causales: {data.capabilities.narration.causalWrites}</small></div>
        </div>
      </section>

      <section className="bench-section" aria-labelledby="architecture-title">
        <span className="bench-kicker">Diagrama de decisión</span>
        <h2 id="architecture-title">Un turno, de percepción a consecuencia</h2>
        <div className="bench-flow" role="img" aria-label="Mundo a WSP y CAM; Q, T y Pattern producen una propuesta; el gate decide; el cuerpo actúa; la consecuencia vuelve como delta">
          <div><strong>Mundo</strong><span>observación</span></div>
          <i>→</i>
          <div><strong>WSP + CAM</strong><span>representar y recordar</span></div>
          <i>→</i>
          <div><strong>Q · T · Pattern</strong><span>elegir y predecir</span></div>
          <i>→</i>
          <div><strong>Gate</strong><span>OK · MODIFY · BLOCK</span></div>
          <i>→</i>
          <div><strong>Cuerpo</strong><span>acción → recompensa → δ</span></div>
        </div>
      </section>

      <section className="bench-section bench-method" aria-labelledby="method-title">
        <span className="bench-kicker">Procedencia</span>
        <h2 id="method-title">Qué significa este benchmark</h2>
        <p>
          Es un banco canónico determinista de aceptación, no una comparación
          con un LLM ni una prueba sobre un robot físico. Los controles cambian
          una sola causa y conservan protocolo, denominadores y estado observable.
        </p>
        <div className="integrity-row">
          <Stat value={data.releaseAcceptanceTests} label="pruebas de aceptación" />
          <Stat value={data.integrity.patternObservesDuringExam} label="escrituras durante PATTERN held-out" />
          <Stat value={data.integrity.transferProbeWrites} label="escrituras durante la sonda de transferencia" />
          <Stat value={data.integrity.canonicalCortexCalls} label="llamadas corticales en el banco principal" />
        </div>
        <details className="bench-sources">
          <summary>Ver informes y huellas SHA-256</summary>
          <ul>
            {data.sources.map((source) => (
              <li key={source.sha256}>
                <span>{source.file}</span>
                <code>{source.sha256}</code>
              </li>
            ))}
          </ul>
        </details>
        <a className="bench-download" href="/data/echo1-benchmark.json" download>
          Descargar datos del benchmark (.json)
        </a>
      </section>
    </>
  );
}

export default function Echo1Results() {
  const [cursor, setCursor] = useState(0);

  return (
    <article className="docs-body benchmark-page">
      <Results data={benchmark} cursor={cursor} setCursor={setCursor} />
    </article>
  );
}
