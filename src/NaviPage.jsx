import React, { useEffect } from 'react';
import {
  ArrowUpRight,
  Brain,
  CheckCircle,
  Cpu,
  Hexagon,
  Network,
  Radio,
  Shield,
  Terminal,
  Zap,
} from 'lucide-react';

const LINE = [
  {
    id: 'navi1',
    gen: '01',
    name: 'NAVI 1',
    codename: 'Q₆ L1',
    status: 'CERRADO · EN EL KERNEL',
    tone: 'ok',
    icon: Hexagon,
    where: 'kernel/navi/navi_q6.c',
    unit: 'spike LIF entero',
    text: 'Hipercubo de 6 bits. 64 neuronas, 192 aristas, codebook [6,3,3]. No habla. Repara 1 bit de ruido: 48/48.',
    facts: ['48/48 1-bit', 'hop 120/120', '~480 B heap', '0% FPU'],
    docs: '/docs/navi1',
    extra: '/docs/rfc-q6',
    extraLabel: 'RFC Q₆',
  },
  {
    id: 'navi2',
    gen: '02',
    name: 'NAVI 2',
    codename: 'L3 ASCII',
    status: 'LEGADO · SIGUE EN EL ÁRBOL',
    tone: 'warn',
    icon: Terminal,
    where: 'navi2_fwd.c + navi2_weights.bin',
    unit: 'token entero V=256',
    text: 'Motor ternario + veto HDC. El chat del ISO ya no usa este tubo: pasó a WSP. Se documenta porque el binario sigue cargando.',
    facts: ['W ∈ {-1,0,1}', 'veto Hamming', 'RAG HTTP ≠ backprop', 'no es un LLM'],
    docs: '/docs/navi2',
    extra: '/docs/l3',
    extraLabel: 'TRAIN L3',
  },
  {
    id: 'navi3',
    gen: '03',
    name: 'NAVI 3',
    codename: 'WSP SNN',
    status: 'CERRADO · CONTRATO 16 B',
    tone: 'ok',
    icon: Radio,
    where: 'navi3_fwd.c + wsp.c',
    unit: 'wsp_packet_t 16 B',
    text: 'Deja de predecir castellano. Habla postales de 16 bytes. El español es máscara. Átomos + ejes V A D C U B.',
    facts: ['_Static_assert 16 B', 'E[6] VAD-CUB', 'G_talk…G_code', 'veto L2'],
    docs: '/docs/navi3',
    extra: '/docs/wsp-readme',
    extraLabel: 'SPEC WSP',
  },
  {
    id: 'navi45',
    gen: '04.5',
    name: 'NAVI 4.5',
    codename: 'OPERADOR',
    status: 'ACTUAL EN LA ISO 8',
    tone: 'ok',
    icon: Cpu,
    where: 'wsp_rxos.c · G_rxos · tecla v',
    unit: '16 B + lista blanca',
    text: 'El tablero de relés. Si pides el sistema, lo ejecuta. /prove es el anuncio y el test. Si no hay esquema: DESCONOCIDO.',
    facts: ['heap navi3 = 0', 'G_rxos = Terminal', '/prove medible', 'un comando / turno'],
    docs: '/docs/navi45',
    extra: '/rx-os',
    extraLabel: 'rxOS 8',
  },
  {
    id: 'navi5',
    gen: '05',
    name: 'NAVI 5',
    codename: 'LAB KCC',
    status: 'HOST · AIR-GAP · ZERO-PRUNE',
    tone: 'ok',
    icon: Network,
    where: 'navi5_engine.py · navi5_snn.py',
    unit: 'LIF+STDP + WSP + Q6',
    text: 'Varias instancias SNN que se reeducan. Nadie se poda. Bus RX-DIB sin red. Consenso simbólico ≥ 98% en tareas WSP.',
    facts: ['KCC: 0 destruidas', 'WSP 16 B + CRC8', 'μJ/spike a la baja', '6 fases de train'],
    docs: '/docs/navi5',
    extra: '/docs/navi5-train',
    extraLabel: 'ENTRENAMIENTO',
  },
  {
    id: 'navi6',
    gen: '06',
    name: 'NAVI 6',
    codename: 'TUTOR CAUSAL',
    status: 'HOST + KERNEL · NAVI6W01',
    tone: 'ok',
    icon: Brain,
    where: 'navi6 + kernel/navi/navi6.c',
    unit: 'DAG + world-model + WSP',
    text: 'Diagnostica causas (spin-lock ≠ VRAM) y responde “qué pasaría si”. Neurogénesis de sinapsis. Q-WSP son amplitudes clásicas, no qubits.',
    facts: ['do-calculus', 'rollouts F', 'blob en la ISO', 'no es un LLM'],
    docs: '/docs/navi6',
    extra: '/docs/navi5',
    extraLabel: 'NAVI 5 LAB',
  },
  {
    id: 'navi65',
    gen: '06.5',
    name: 'NAVI 6.5',
    codename: 'RLC OFICIAL',
    status: 'HOST + KERNEL · 11 MÁSCARAS G_*',
    tone: 'ok',
    icon: Brain,
    where: 'navi65 + kernel/navi/navi6.c',
    unit: 'PARSE → VERIFY → G_*',
    text: 'El modelo oficial de razonamiento, lenguaje y código. Hereda talk/logic/poem/news/code/rxos de 4.5 y añade reason, math, debug, plan, teach. Si no hay esquema: DESCONOCIDO.',
    facts: ['11 máscaras G_*', 'math entero 0% FPU', 'código + dry-run', 'no es un LLM'],
    docs: '/docs/navi65',
    extra: '/docs/navi65-dummies',
    extraLabel: 'PARA DUMMIES',
  },
];

const NAVI5_LAYERS = [
  { icon: Shield, code: 'HARNESS', title: 'SOLO LECTURA', text: 'lab_harness.py no escribe en el sandbox. Un prune se rechaza y se convierte en reeducación.' },
  { icon: Radio, code: 'WSP + RX-DIB', title: '16 BYTES, SIN RED', text: 'Tramas atómicas y bus por tmpfs. network_mode: none. El castellano no viaja.' },
  { icon: Zap, code: 'SNN LIF/STDP', title: 'τ, Vth, μJ/SPIKE', text: 'Numba JIT. Homeostasis hacia régimen esparso. Rutas ociosas decaen.' },
  { icon: Brain, code: 'Q6 ORQUESTA', title: 'VOTO POR FITNESS', text: 'Acuerdo ponderado, destilación a disidentes, especialización. No es el hipercubo de 64 neuronas — ese es NAVI 1.' },
];

const COMPARE = [
  { c: 'Unidad', n1: 'spike LIF', n2: 'byte/token', n3: 'WSP 16 B', n45: 'WSP + relé', n5: 'WSP + población SNN' },
  { c: 'Dónde', n1: 'unikernel', n2: 'unikernel', n3: 'unikernel', n45: 'ISO 8 / tecla v', n5: 'host / Docker air-gap' },
  { c: 'Si no sabe', n1: 'no habla', n2: 'veto L2', n3: 'DESCONOCIDO', n45: 'DESCONOCIDO / lista blanca', n5: 'consenso o destila' },
  { c: 'Prueba', n1: 'make fire', n2: 'navi2 bench', n3: 'navi3 bench', n45: '/prove', n5: 'test_navi5_manual.py' },
  { c: 'Destruye nodos', n1: 'no', n2: 'no', n3: 'no', n45: 'no', n5: 'nunca (KCC)' },
];

const DUMMY_STEPS = [
  { n: '01', t: 'CINCO CAJAS', d: 'PARSE, RETRIEVE, INFER, VERIFY, RENDER. NAVI 6.5 pasa por las cinco en cada turno. Siempre.' },
  { n: '02', t: 'ONCE RELÉS', d: 'Hablar, lógica, poema, noticias, código, rxOS, razonar, math, debug, plan, enseñar. El castellano es la pintura.' },
  { n: '03', t: 'SI NO HAY FICHA', d: 'DESCONOCIDO. Un compilador LLVM no está en el catálogo. Un loro lo inventaría. Aquí no.' },
  { n: '04', t: 'LA CUENTA ES ENTERA', d: '12 por 7 más 3 = 87. Sin coma flotante. El código se dry-runea. El debug sigue siendo el mecánico de NAVI 6.' },
];

const EXPERT_STACK = [
  { code: 'RLC', title: 'navi65_engine.py', text: 'Cada turno: PARSE-RETRIEVE-INFER-VERIFY-RENDER. Máscara G_*. reflect() se pregunta al DAG. No es next-token.' },
  { code: 'G_*', title: 'wsp.h + navi65_masks.py', text: '11 IDs. 4.5 (talk…rxos) + reason/math/debug/plan/teach. navi6_reply posee el chat y delega el render.' },
  { code: 'CODE', title: 'navi65_code.py', text: 'Catálogo + dry-run entero. reverse, clamp, LIF, gcd, fib, crc8. Kubernetes/LLVM → DESCONOCIDO.' },
  { code: 'ISO', title: 'navi6.c 6.5', text: 'claim = todo turno. Math recursive descent 0% FPU. G_rxos sigue siendo commands_dispatch. /prove no se rompe.' },
];

export default function NaviPage({ navigate, PageHero, SectionTitle }) {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return undefined;
    const el = document.getElementById(hash);
    if (!el) return undefined;
    const timer = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageHero
        index="NV"
        eyebrow="NAVI · LÍNEA SNN 1 → 6.5"
        title={<>NO ES UN LORO.<br />ES UNA LÍNEA DE RELÉS.</>}
        text="Siete generaciones. 1–4.5 en el unikernel. 5 es el lab cooperativo. 6 es el tutor causal. 6.5 es el modelo RLC oficial: razona, habla y emite código con esquema. Ninguna es un LLM."
        image="/rxos/monad/13-navi45-ready.png"
        className="rxos-hero"
      >
        <div className="hero-tags">
          <span>Q₆ 48/48</span>
          <span>WSP 16 B</span>
          <span>NAVI-4.5 /prove</span>
          <span>NAVI 5 KCC</span>
          <span>NAVI 6.5 RLC</span>
          <span>0% FPU EN EL MOTOR</span>
        </div>
        <div className="hero-actions">
          <a className="brutal-button primary" href="#catalogo">CATÁLOGO 1–6.5</a>
          <a className="brutal-button" href="#dummies">PARA DUMMIES</a>
          <a className="brutal-button" href="#expertos">PARA EXPERTOS</a>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/navi65')}>
            MANUAL NAVI 6.5
          </button>
        </div>
      </PageHero>

      <main>
        <section className="section wrap" id="catalogo">
          <SectionTitle
            code="01 / CATÁLOGO"
            title="TODAS LAS NAVI, EN ORDEN"
            text="Cada generación añade una capa. Ninguna borra a la anterior. Pulsa LEER para el markdown vivo."
          />
          <div className="navi-catalog">
            {LINE.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  id={item.id}
                  className="navi-card"
                  data-reveal
                  style={{ '--delay': `${index * 60}ms` }}
                >
                  <header className="navi-card-head">
                    <span className="navi-gen">{item.gen}</span>
                    <Status tone={item.tone}>{item.status}</Status>
                  </header>
                  <div className="navi-card-title">
                    <Icon size={22} strokeWidth={1.5} />
                    <div>
                      <h3>{item.name}</h3>
                      <em>{item.codename}</em>
                    </div>
                  </div>
                  <p>{item.text}</p>
                  <p className="navi-meta">
                    <code>{item.where}</code>
                    <span>{item.unit}</span>
                  </p>
                  <ul>
                    {item.facts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className="hero-actions">
                    <button type="button" className="brutal-button primary" onClick={() => navigate(item.docs)}>
                      LEER {item.name}
                    </button>
                    <button type="button" className="brutal-button" onClick={() => navigate(item.extra)}>
                      {item.extraLabel} <ArrowUpRight size={14} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section section-black" id="compare">
          <div className="wrap">
            <SectionTitle
              code="02 / COMPARATIVA"
              title="QUÉ CAMBIA DE UNA A OTRA"
              text="Misma familia. Distinta unidad de pensamiento. Distinto sitio donde se demuestra."
            />
            <div className="compare-table navi-compare" data-reveal>
              <div className="compare-row compare-head">
                <span>CRITERIO</span>
                <span>1 Q₆</span>
                <span>2 ASCII</span>
                <span>3 WSP</span>
                <span>4.5 OP</span>
                <span>5 LAB</span>
              </div>
              {COMPARE.map((row) => (
                <div className="compare-row" key={row.c}>
                  <span>{row.c}</span>
                  <span>{row.n1}</span>
                  <span>{row.n2}</span>
                  <span>{row.n3}</span>
                  <span>{row.n45}</span>
                  <span>{row.n5}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section wrap" id="navi5">
          <SectionTitle
            code="03 / NAVI 5"
            title="LABORATORIO COOPERATIVO"
            text="Host Python/Numba. Varias instancias SNN. Cero pruning. El operador de la ISO sigue siendo 4.5 — esto no lo reemplaza."
          />
          <div className="prisma-module-grid">
            {NAVI5_LAYERS.map(({ icon: Icon, code, title, text }, i) => (
              <article className="prisma-module-card" key={code} data-reveal style={{ '--delay': `${i * 70}ms` }}>
                <div className="prisma-module-head">
                  <Icon size={26} strokeWidth={1.35} />
                  <span>{code}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="current-grid" style={{ marginTop: 28 }}>
            <article className="paper-panel" data-reveal>
              <span className="panel-label">WHAT EXISTS TODAY</span>
              <h3>SE PUEDE CORRER Y MEDIR.</h3>
              <ul className="check-list">
                <li><CheckCircle size={18} /> LIF + STDP Numba, Vth, tau, µJ/spike.</li>
                <li><CheckCircle size={18} /> WSP 16 B + CRC8 + reconstrucción Hamming.</li>
                <li><CheckCircle size={18} /> Q6: acuerdo 1.00 en tareas simbólicas (run 40×4).</li>
                <li><CheckCircle size={18} /> KCC: 0 instancias destruidas. El harness no poda.</li>
                <li><CheckCircle size={18} /> <code>python3 tests/test_navi5_manual.py</code> — 14/14.</li>
              </ul>
            </article>
            <article className="black-panel" data-reveal>
              <span className="panel-label">BOUNDARY</span>
              <h3>LO QUE NAVI 5 NO DICE.</h3>
              <ul className="cross-list">
                <li>No es un LLM ni un razonador de propósito general.</li>
                <li>No corre todavía como operador dentro de la ISO.</li>
                <li>No hay port a Loihi / TrueNorth / Akida.</li>
                <li>No publicamos julios/inferencia (RAPL en QEMU miente).</li>
                <li>No diagnostica, no es clínico, no lee mentes.</li>
              </ul>
            </article>
          </div>
          <div className="hero-actions section-actions">
            <button type="button" className="brutal-button primary" onClick={() => navigate('/docs/navi5')}>
              MANUAL TÉCNICO
            </button>
            <button type="button" className="brutal-button" onClick={() => navigate('/docs/navi5-arch')}>
              ARQUITECTURA
            </button>
            <button type="button" className="brutal-button" onClick={() => navigate('/docs/navi5-train')}>
              ENTRENAMIENTO
            </button>
            <button type="button" className="brutal-button" onClick={() => navigate('/docs')}>
              TODOS LOS DOCS
            </button>
          </div>
        </section>

        <section className="section section-black" id="dummies">
          <div className="wrap">
            <SectionTitle
              code="04 / DUMMIES"
              title="NAVI 6.5 ES UN TABLERO DE RELÉS"
              text="Un LLM apuesta la siguiente sílaba. NAVI 6.5 elige una máscara G_* y pasa por cinco cajas. Si la ficha no está, dice DESCONOCIDO."
            />
            <div className="explain-grid">
              {DUMMY_STEPS.map((s) => (
                <article className="explain-card" key={s.n} data-reveal>
                  <span className="panel-label">{s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>
            <div className="current-grid" style={{ marginTop: 28 }}>
              <article className="paper-panel" data-reveal>
                <span className="panel-label">EJEMPLO QUE SÍ CORRE</span>
                <h3>GPU BLOQUEADA + RAM DISPARADA.</h3>
                <p>No es falta de VRAM. La CPU encola más rápido de lo que la GPU confirma → spin-lock → el heap se llena. “¿Y si memoria compartida?”: sube la latencia de bus. Gana el ring-buffer lock-free. Eso es G_debug, el NAVI 6 de siempre.</p>
              </article>
              <article className="black-panel" data-reveal>
                <span className="panel-label">LO QUE NO VENDE</span>
                <h3>CERO QUBITS. CERO COPILOT.</h3>
                <p>Math entero. Código del catálogo. Q-WSP son números complejos en el portátil. No escribe tu paper. No es clínico. <code>./navi65 --ask "…"</code> o tecla v en la ISO.</p>
              </article>
            </div>
            <div className="hero-actions section-actions">
              <button type="button" className="brutal-button primary" onClick={() => navigate('/docs/navi65-dummies')}>
                LEER EL MARKDOWN
              </button>
              <a className="brutal-button" href="#expertos">SOY EXPERTO</a>
            </div>
          </div>
        </section>

        <section className="section wrap" id="expertos">
          <SectionTitle
            code="05 / EXPERTOS"
            title="CONTRATO: 11 G_*, 5 CAJAS, HOOK"
            text="Host Python. Kernel C entero, heap 0. 6.5 posee el chat y delega G_rxos al mismo commands_dispatch. /prove no se rompe."
          />
          <div className="prisma-module-grid">
            {EXPERT_STACK.map((item, i) => (
              <article className="prisma-module-card" key={item.code} data-reveal style={{ '--delay': `${i * 70}ms` }}>
                <div className="prisma-module-head"><span>{item.code}</span></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="dataset-table" data-reveal style={{ marginTop: 28 }}>
            <div className="dataset-row dataset-head">
              <span>CÓMO MEDIR</span><span>COMANDO</span><span>QUÉ DEBE PASAR</span>
            </div>
            <div className="dataset-row">
              <span>Suite host</span>
              <span><code>python3 tests/test_navi6.py</code></span>
              <span>6/6: grow, do(), F, tutor, magic.</span>
            </div>
            <div className="dataset-row">
              <span>Suite 6.5</span>
              <span><code>python3 tests/test_navi65.py</code></span>
              <span>16/16: máscaras, math, código, DESCONOCIDO, reflect.</span>
            </div>
            <div className="dataset-row">
              <span>Train + blob</span>
              <span><code>python3 navi6_train.py</code></span>
              <span>Escribe NAVI_AI_SNN/l3/navi6_weights.bin.</span>
            </div>
            <div className="dataset-row">
              <span>ISO</span>
              <span><code>make iso-refresh</code></span>
              <span>module2 navi6_weights.bin navi6. Sin relink si el .c no cambió.</span>
            </div>
          </div>
          <div className="hero-actions section-actions">
            <button type="button" className="brutal-button primary" onClick={() => navigate('/docs/navi65-experts')}>
              MANUAL EXPERTOS
            </button>
            <button type="button" className="brutal-button" onClick={() => navigate('/docs/navi65')}>
              ÍNDICE NAVI 6.5
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

function Status({ children, tone = 'open' }) {
  return <span className={`status-badge status-${tone}`}>{children}</span>;
}
