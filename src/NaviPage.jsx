import React from 'react';
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

export default function NaviPage({ navigate, PageHero, SectionTitle }) {
  return (
    <>
      <PageHero
        index="NV"
        eyebrow="NAVI · LÍNEA SNN 1 → 5"
        title={<>NO ES UN LORO.<br />ES UNA LÍNEA DE RELÉS.</>}
        text="Cinco generaciones de IA neuromórfica Knights Labs. Las 1–4.5 viven en el unikernel. La 5 es el laboratorio host cooperativo. Ninguna es un LLM. El castellano, cuando aparece, es máscara."
        image="/rxos/monad/13-navi45-ready.png"
        className="rxos-hero"
      >
        <div className="hero-tags">
          <span>Q₆ 48/48</span>
          <span>WSP 16 B</span>
          <span>NAVI-4.5 /prove</span>
          <span>NAVI 5 KCC</span>
          <span>0% FPU EN EL MOTOR</span>
        </div>
        <div className="hero-actions">
          <a className="brutal-button primary" href="#catalogo">CATÁLOGO 1–5</a>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/navi5')}>
            MANUAL NAVI 5
          </button>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/navi45')}>
            OPERADOR 4.5
          </button>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/navi-catalog')}>
            MARKDOWN
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
      </main>
    </>
  );
}

function Status({ children, tone = 'open' }) {
  return <span className={`status-badge status-${tone}`}>{children}</span>;
}
