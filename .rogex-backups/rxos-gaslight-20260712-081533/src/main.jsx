import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Brain,
  CheckCircle,
  CircleDot,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  Link as LinkIcon,
  Mail,
  Menu,
  Microscope,
  Network,
  Radio,
  Send,
  Shield,
  Terminal,
  Waves,
  X,
} from 'lucide-react';
import './styles.css';

const NAV_ITEMS = [
  ['/', 'HOME'],
  ['/prisma', 'PRISMA'],
  ['/rx-os', 'RX OS'],
  ['/about', 'ABOUT'],
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/rogexlaboratories', mark: 'IG' },
  { label: 'GitHub', href: 'https://github.com/n4vv4r', mark: 'GH' },
  { label: 'X', href: 'https://x.com/rogexlabs', mark: 'X' },
  { label: 'Linktree', href: 'https://linktr.ee/rogynavy', icon: LinkIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@rollitodprimavera', mark: 'YT' },
];

const CAMPAIGNS = [
  {
    id: 'R-01',
    title: 'PRISMA 3.2 / MULTI-DATASET',
    status: 'OPEN · VALIDATION',
    text: 'Extender la lectura de EEG BIDS, comparar paradigmas y separar resultados transferibles de calibración específica por sujeto.',
    need: 'Datasets · revisión metodológica · adaptadores',
    image: '/tutorial/prisma3/05_datasets.png',
    icon: Brain,
    internal: '/prisma',
  },
  {
    id: 'R-02',
    title: 'PRISMA 4 / LIVE EEG',
    status: 'OPEN · HARDWARE',
    text: 'Diseñar una demo reproducible con adquisición en vivo, control de artefactos, calidad de señal y calibración explícita.',
    need: 'OpenBCI · sesiones piloto · instrumentación',
    image: '/tutorial/prisma3/04_eeg_real.png',
    icon: Activity,
    internal: '/prisma',
  },
  {
    id: 'S-01',
    title: 'RX OS FOUNDATION',
    status: 'OPEN · SYSTEMS',
    text: 'Consolidar un sistema experimental bare-metal para herramientas científicas verificables, interfaces mínimas y ejecución soberana.',
    need: 'Drivers · QEMU · hardware x86_64 · revisión',
    image: '/rxos/desktop-home.png',
    icon: Cpu,
    internal: '/rx-os',
  },
  {
    id: 'L-01',
    title: 'WSP / SIGNAL RETURN',
    status: 'OPEN · PROTOCOL',
    text: 'Investigar el retorno desde sonido y glifo hacia una estructura simbólica medible, con controles y formatos reproducibles.',
    need: 'Audio DSP · SVG · lingüística computacional',
    image: '/wsp-signal.svg',
    icon: Waves,
  },
  {
    id: 'D-01',
    title: 'ROGEX GASLIGHT',
    status: 'OPEN · DEFENSIVE SECURITY',
    text: 'Framework defensivo de engaño y observabilidad para analizar automatización ofensiva sin convertirlo en una herramienta de ataque.',
    need: 'Linux · telemetría · módulos YAML · revisión',
    image: '/gaslight-defense.svg',
    icon: Shield,
    internal: '/about',
  },
];

const PRISMA_EVIDENCE = [
  {
    value: '51 passed',
    label: 'verification',
    note: 'Pytest documentado tras integrar la auditoría de confounding; compileall limpio.',
  },
  {
    value: '≈73%',
    label: 'raw LOSO',
    note: 'Referencia ds007358 EC/EO sin calibración del sujeto de test.',
  },
  {
    value: '87.7%',
    label: 'calibración',
    note: 'Régimen subject-transductive; no se presenta como generalización pura.',
  },
  {
    value: '≈91%',
    label: 'personalizado',
    note: 'Evaluación intra-sujeto; un problema más fácil y explícitamente etiquetado.',
  },
];

const PRISMA_32_MODULES = [
  {
    icon: Activity,
    code: 'FEATURE REGISTRY',
    title: 'SEVEN PURPOSE-BUILT FEATURE SETS',
    text: 'Registro central para spectral, temporal, covariance, spectral-temporal, speech, motor y cognitive. El modo auto selecciona según el paradigma sin romper el flujo histórico EC/EO.',
  },
  {
    icon: CircleDot,
    code: 'EVENT MODE',
    title: 'EPOCHS ALIGNED TO REAL EVENTS',
    text: 'Lectura de events.tsv o anotaciones MNE, ventanas configurables, corrección de baseline, rechazo de épocas fuera de rango y descarte por artefactos superiores a 200 µV peak-to-peak.',
  },
  {
    icon: Shield,
    code: 'CONFOUND AUDITOR',
    title: 'BLOCK UNSAFE TRAINING FIRST',
    text: 'Audita la matriz sujeto × clase, cobertura, entropía y consistencia de features/canales antes de entrenar. El override exploratorio queda marcado como riesgo alto de leakage.',
  },
  {
    icon: Database,
    code: 'BENCHMARK MATRIX',
    title: 'COMPARE PIPELINES WITHOUT MOVING THE GOALPOSTS',
    text: 'Compara feature sets con none, train-fold y subject-transductive. Solo una celda train-fold puede ganar best_strict; la calibración transductiva permanece etiquetada como ceiling.',
  },
];

const PRISMA_ROADMAP = [
  {
    year: 'NOW',
    title: 'PRISMA 3.2',
    state: 'IMPLEMENTED / ACTIVE',
    text: 'Pipeline Python 3.10+, CLI compatible, análisis espectral y temporal, validación de referencia, informes y arquitectura de feature sets.',
  },
  {
    year: 'NEXT',
    title: 'PRISMA 4',
    state: 'ENGINEERING ROADMAP',
    text: 'Adquisición EEG en vivo, adaptadores de dispositivos, control de artefactos, calidad de señal, protocolos de calibración y benchmarks externos.',
  },
  {
    year: 'R+D',
    title: 'PRISMA 5',
    state: 'RESEARCH ROADMAP',
    text: 'Laboratorio multimodal: EEG, tareas, conducta y señales ambientales sincronizadas con trazabilidad completa y controles negativos.',
  },
  {
    year: 'L/T',
    title: 'ASTRA',
    state: 'LONG-TERM CONCEPT',
    text: 'Capa experimental de hardware, feedback y protocolos cerrados. Requeriría supervisión ética, validación institucional y límites regulatorios.',
  },
  {
    year: 'L/T',
    title: 'ARIADNE',
    state: 'LONG-TERM CONCEPT',
    text: 'Modelos longitudinales del individuo: estabilidad, cambio, memoria de baseline y comparaciones reproducibles a lo largo del tiempo.',
  },
  {
    year: 'L/T',
    title: 'NOOSPHERE',
    state: 'LONG-TERM CONCEPT',
    text: 'Red federada de investigación para comparar resultados y procedencia entre laboratorios. No implica lectura mental ni conciencia colectiva literal.',
  },
];

const RX_IMPLEMENTED = [
  'Boot x86_64 mediante GRUB / Multiboot2 y entrada a long mode.',
  'Kernel freestanding en C con vector de arranque NASM y núcleo Rust no_std.',
  'GDT, IDT, excepciones, IRQ, PIT a 100 Hz, teclado y ratón PS/2.',
  'Framebuffer 1280×720, escritorio clickable, command bar y mini editor.',
  'VFS + RXFS, operaciones de archivo y persistencia ATA PIO opt-in.',
  'Runtime Roxenite .rxc y resolución local de rutas rgx://.',
  'ML-KEM-768, ChaCha20-Poly1305 y SHA3 con self-tests; todavía sin auditoría.',
];

const RX_LIMITS = [
  'Sin driver de red: rgx:// resuelve localmente, no existe todavía la mesh RXwired.',
  'Un solo flujo de kernel; scheduler, procesos, syscalls e aislamiento siguen pendientes.',
  'Espacio de direcciones plano y ring 0; no es un sistema operativo de producción.',
  'Arranque BIOS/SeaBIOS; UEFI nativo está en roadmap.',
  'Criptografía integrada pero no auditada externamente.',
];

const PROJECTS = [
  {
    name: 'ROGEX WSP',
    type: 'SYMBOLIC PROTOCOL',
    text: 'Protocolo experimental información + emoción con salidas en texto, JSON, binario, sonido y glifos.',
    stack: ['Python 3.10+', 'stdlib', 'CLI', 'JSON', 'WAV', 'SVG', 'unittest'],
  },
  {
    name: 'ROGEX GASLIGHT',
    type: 'DEFENSIVE SECURITY',
    text: 'Framework defensivo orientado a engaño, telemetría y perfiles modulares para estudiar automatización ofensiva.',
    stack: ['Python', 'Linux', 'YAML', 'CLI', 'HTML reports', 'event intelligence'],
  },
  {
    name: 'NOOLITH',
    type: 'COGNITIVE MOBILE APP',
    text: 'Aplicación móvil experimental de ejercicios cognitivos, progreso y entrenamiento breve.',
    stack: ['Flutter', 'Dart', 'Mobile UI', 'Cross-platform'],
  },
  {
    name: 'LITEBAG',
    type: 'DESKTOP WALLET DEMO',
    text: 'Demo de billetera Litecoin de escritorio con interfaz nativa para Linux.',
    stack: ['Rust', 'GTK4', 'SQLite', 'BlockCypher API', 'Linux'],
  },
  {
    name: 'PHPINS',
    type: 'SOCIAL WEB DEMO',
    text: 'Red visual tipo pinboard construida sin framework, con usuarios, publicaciones, comentarios y likes.',
    stack: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    name: 'REDUX.TS / KUREI',
    type: 'DISCORD BOT',
    text: 'Bot de Discord con comandos slash y por prefijo, utilidades de servidor y recordatorios.',
    stack: ['TypeScript', 'Node.js', 'Discord.js', 'Yarn', 'dotenv'],
  },
];

const SKILLS = [
  'Python',
  'Rust',
  'C',
  'x86_64 ASM',
  'TypeScript',
  'React',
  'Vite',
  'Node.js',
  'PHP',
  'SQL',
  'Flutter / Dart',
  'Linux / Fedora',
  'MNE-Python',
  'NumPy',
  'scikit-learn',
  'EEG signal processing',
  'BIDS / OpenNeuro',
  'QEMU / bare metal',
  'Defensive security',
  'Git / GitHub',
  'Technical writing',
  'Reproducible research',
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (href) => {
    if (href === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', href);
    setPath(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [path, navigate];
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  });
}

function SocialIcon({ item }) {
  const Icon = item.icon;
  return (
    <a
      className="social-icon"
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={item.label}
      title={item.label}
    >
      {Icon ? <Icon size={16} strokeWidth={1.8} /> : <span className="x-mark">{item.mark}</span>}
    </a>
  );
}

function Header({ path, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [path]);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <button className="wordmark" onClick={() => navigate('/')} aria-label="Rogex Laboratories home">
          <span className="wordmark-rx">RX</span>
          <span>ROGEX LABORATORIES</span>
        </button>

        <button
          className="menu-toggle"
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={menuOpen ? 'nav-drawer is-open' : 'nav-drawer'}>
          <nav className="main-nav" aria-label="Main navigation">
            {NAV_ITEMS.map(([href, label]) => (
              <button
                key={href}
                className={path === href ? 'nav-link is-active' : 'nav-link'}
                onClick={() => navigate(href)}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="social-nav" aria-label="Social links">
            {SOCIALS.map((item) => <SocialIcon item={item} key={item.label} />)}
          </div>
        </div>
      </div>
    </header>
  );
}

function PageHero({ index, eyebrow, title, text, image, children }) {
  return (
    <section className="page-hero" style={{ '--hero-image': `url("${image}")` }}>
      <div className="page-hero-media" aria-hidden="true" />
      <div className="page-hero-grain" aria-hidden="true" />
      <div className="page-hero-content wrap">
        <div className="hero-index">{index}</div>
        <div className="hero-copy">
          <span className="kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{text}</p>
          {children}
        </div>
      </div>
      <div className="hero-caption">ROGEX / INDEPENDENT R&amp;D / 2026</div>
    </section>
  );
}

function SectionTitle({ code, title, text }) {
  return (
    <div className="section-title" data-reveal>
      <span>{code}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function StatusBadge({ children, tone = 'open' }) {
  return <span className={`status-badge status-${tone}`}>{children}</span>;
}

function CampaignCard({ campaign, navigate, index }) {
  const Icon = campaign.icon;
  return (
    <article className={`campaign-card campaign-card-${(index % 3) + 1}`} data-reveal style={{ '--delay': `${index * 70}ms` }}>
      <div className="campaign-image" style={{ backgroundImage: `url("${campaign.image}")` }}>
        <span className="campaign-number">{campaign.id}</span>
        <Icon size={30} strokeWidth={1.4} />
      </div>
      <div className="campaign-body">
        <StatusBadge>{campaign.status}</StatusBadge>
        <h3>{campaign.title}</h3>
        <p>{campaign.text}</p>
        <div className="campaign-need">NEEDED / {campaign.need}</div>
        {campaign.internal && (
          <button className="text-link" onClick={() => navigate(campaign.internal)}>
            READ DOSSIER <ArrowUpRight size={15} />
          </button>
        )}
      </div>
    </article>
  );
}

function Home({ navigate }) {
  return (
    <>
      <PageHero
        index="00"
        eyebrow="OPEN RESEARCH / CURRENT CAMPAIGNS"
        title={<>THE LAB IS<br />A WORK IN PROGRESS.</>}
        text="Rogex Laboratories desarrolla software de investigación, sistemas experimentales y protocolos abiertos a colaboración. Esta portada muestra trabajo activo, no productos ficticios."
        image="/home-campaigns.svg"
      >
        <div className="hero-actions">
          <a className="brutal-button primary" href="#campaigns">VIEW OPEN CAMPAIGNS</a>
          <button className="brutal-button" onClick={() => navigate('/about')}>CONTACT THE LAB</button>
        </div>
      </PageHero>

      <main>
        <section className="section wrap" id="campaigns">
          <SectionTitle
            code="01 / OPEN"
            title="CAMPAÑAS DE INVESTIGACIÓN"
            text="Cada campaña declara qué existe, qué falta y qué tipo de colaboración tiene sentido. Nada se presenta como acabado cuando todavía está en prueba."
          />
          <div className="campaign-grid">
            {CAMPAIGNS.map((campaign, index) => (
              <CampaignCard campaign={campaign} navigate={navigate} index={index} key={campaign.id} />
            ))}
          </div>
        </section>

        <section className="statement-section">
          <div className="wrap statement-grid" data-reveal>
            <div className="statement-mark"><Microscope size={54} strokeWidth={1.2} /></div>
            <blockquote>
              “Ambición sin trazabilidad es ruido. Rogex publica límites, estados de implementación y resultados negativos porque también son parte del trabajo.”
            </blockquote>
            <div className="statement-meta">METHOD / EVIDENCE / LIMITS</div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="02 / MAP"
            title="DOS LÍNEAS, UN MISMO LABORATORIO"
            text="PRISMA estudia señales y variabilidad individual. RX OS investiga la infraestructura donde herramientas científicas verificables podrían ejecutarse con menos dependencia externa."
          />
          <div className="two-track">
            <button className="track-card" onClick={() => navigate('/prisma')} data-reveal>
              <Brain size={42} strokeWidth={1.3} />
              <span>TRACK A</span>
              <h3>EEG / PRISMA</h3>
              <p>Procesamiento de señal, baselines individuales, evaluación reproducible y límites no clínicos.</p>
              <ArrowUpRight />
            </button>
            <button className="track-card inverted" onClick={() => navigate('/rx-os')} data-reveal>
              <Cpu size={42} strokeWidth={1.3} />
              <span>TRACK B</span>
              <h3>SYSTEMS / RX OS</h3>
              <p>Kernel experimental, filesystem, interfaz, runtime local y arquitectura verificable.</p>
              <ArrowUpRight />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

function EvidenceCard({ item, index }) {
  return (
    <article className="evidence-card" data-reveal style={{ '--delay': `${index * 80}ms` }}>
      <strong>{item.value}</strong>
      <span>{item.label}</span>
      <p>{item.note}</p>
    </article>
  );
}

function Prisma() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="PRISMA / EEG RESEARCH SOFTWARE"
        title={<>MEASURE THE SIGNAL.<br />MODEL THE PERSON.</>}
        text="PRISMA 3.2 es software experimental para investigar EEG, variabilidad individual y reproducibilidad. No es un dispositivo médico ni afirma leer pensamientos o detectar consciencia."
        image="/tutorial/prisma3/04_eeg_real.png"
      >
        <div className="hero-tags">
          <span>PYTHON 3.10+</span>
          <span>MNE</span>
          <span>NUMPY</span>
          <span>SCIKIT-LEARN</span>
          <span>BIDS / OPENNEURO</span>
        </div>
      </PageHero>

      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / CURRENT"
            title="PRISMA 3.2 DEVBUG EDITION"
            text="La versión actual prioriza compatibilidad, trazabilidad y separación estricta entre generalización, calibración y personalización."
          />
          <div className="evidence-grid">
            {PRISMA_EVIDENCE.map((item, index) => <EvidenceCard item={item} index={index} key={item.label} />)}
          </div>

          <div className="current-grid">
            <article className="paper-panel" data-reveal>
              <span className="panel-label">WHAT EXISTS</span>
              <h3>UN PIPELINE DE INVESTIGACIÓN, NO UNA PROMESA UNIVERSAL.</h3>
              <ul className="check-list">
                <li><CheckCircle size={18} /> Welch PSD, filtros, bandpower, ratios, entropía, Hjorth, RMS y SQI.</li>
                <li><CheckCircle size={18} /> Baseline personal, traductor individual, modelos ML y reportes.</li>
                <li><CheckCircle size={18} /> CLI retrocompatible y Feature Registry implementado con siete familias de características.</li>
                <li><CheckCircle size={18} /> Modo evento con épocas, baseline, rechazo de artefactos y visor de respuestas evocadas.</li>
                <li><CheckCircle size={18} /> Auditoría de confounding obligatoria antes de ML y Benchmark Matrix con selección estricta.</li>
                <li><CheckCircle size={18} /> Flujo de descubrimiento para datasets BIDS/OpenNeuro.</li>
                <li><CheckCircle size={18} /> Alpha blocking limitado al paradigma resting EC/EO.</li>
              </ul>
            </article>

            <article className="black-panel" data-reveal>
              <span className="panel-label">SCIENTIFIC BOUNDARY</span>
              <h3>LO QUE PRISMA NO DICE.</h3>
              <ul className="cross-list">
                <li>No resuelve toda la variabilidad interindividual.</li>
                <li>No convierte calibración transductiva en generalización.</li>
                <li>No extrapola alpha blocking a cualquier tarea.</li>
                <li>No diagnostica, trata ni predice enfermedad.</li>
                <li>No detecta consciencia ni descifra contenido mental.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="02 / EVIDENCE"
              title="RESULTADOS QUE INCLUYEN SUS LÍMITES"
              text="La evidencia actual es útil precisamente porque también muestra dónde el pipeline todavía no funciona bien."
            />
            <div className="dataset-table" data-reveal>
              <div className="dataset-row dataset-head">
                <span>DATASET / PARADIGM</span><span>STATE</span><span>INTERPRETATION</span>
              </div>
              <div className="dataset-row">
                <span>ds007358 / resting EC–EO</span>
                <span><StatusBadge tone="ok">REFERENCE</StatusBadge></span>
                <span>Raw LOSO alrededor del 73%; calibración transductiva 87,7%; alpha EC &gt; EO confirmado.</span>
              </div>
              <div className="dataset-row">
                <span>ds007808 / speech</span>
                <span><StatusBadge tone="warn">EXPLORATORY</StatusBadge></span>
                <span>Lectura y features específicas todavía en exploración; no se usa como evidencia principal.</span>
              </div>
              <div className="dataset-row">
                <span>ds007554 / cognitive–motor</span>
                <span><StatusBadge tone="danger">NEAR CHANCE</StatusBadge></span>
                <span>Las features genéricas no separan bien el paradigma. Es una señal para diseñar adaptadores específicos.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="03 / PRISMA 3.2"
            title="THE PIPELINE NOW INSPECTS ITSELF"
            text="PRISMA 3.2 no solo extrae variables: comprueba balance, separa protocolos de evaluación y hace visible qué parte del resultado es generalización estricta, calibración o personalización."
          />
          <div className="prisma-module-grid">
            {PRISMA_32_MODULES.map(({ icon: Icon, code, title, text: moduleText }, index) => (
              <article className="prisma-module-card" key={code} data-reveal style={{ '--delay': `${index * 70}ms` }}>
                <div className="prisma-module-head"><Icon size={28} strokeWidth={1.35} /><span>{code}</span></div>
                <h3>{title}</h3>
                <p>{moduleText}</p>
              </article>
            ))}
          </div>
          <div className="protocol-strip" data-reveal>
            <span>STRICT</span><strong>RAW / TRAIN-FOLD LOSO</strong>
            <span>CALIBRATION</span><strong>SUBJECT-TRANSDUCTIVE</strong>
            <span>PERSONAL</span><strong>INTRA-SUBJECT CV</strong>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="04 / INTERFACE"
            title="CAPTURAS REALES DE PRISMA 3.2"
            text="Estas imágenes son capturas auténticas del software en desarrollo. La primera muestra una demostración sintética del Feature Lab; la segunda, el visor experimental de eventos y épocas. No son renders ni mockups promocionales."
          />

          <div className="prisma-capture-grid">
            <figure className="screenshot scientific-capture" data-reveal>
              <img src="/tutorial/prisma3/04_feature_lab_complete.png" alt="Captura real de PRISMA 3.2 Feature Lab con forma de onda, PSD y vector de características" loading="lazy" />
              <figcaption className="capture-caption">
                <span>01</span>
                <div><strong>FEATURE LAB / REAL UI CAPTURE</strong><p>Forma de onda multicanal, densidad espectral de potencia y vector spectral-temporal. La señal mostrada es una demostración sintética no clínica para inspección técnica.</p></div>
              </figcaption>
            </figure>

            <figure className="screenshot scientific-capture" data-reveal>
              <img src="/tutorial/prisma3/05_event_epoch_viewer.png" alt="Captura real del visor de eventos y épocas de PRISMA 3.2" loading="lazy" />
              <figcaption className="capture-caption">
                <span>02</span>
                <div><strong>EVENT &amp; EPOCH VIEWER / REAL UI CAPTURE</strong><p>Línea temporal de eventos, épocas válidas, baseline −200–0 ms y respuesta evocada promedio por clase. El visor admite demo sintética reproducible y carga de EEG real con events.tsv.</p></div>
              </figcaption>
            </figure>
          </div>

          <div className="archive-label">ADDITIONAL WORKFLOW CAPTURES</div>
          <div className="screenshot-grid compact-screenshot-grid">
            {[
              ['/tutorial/prisma3/01_home.png', 'Dashboard / entrada al flujo'],
              ['/tutorial/prisma3/02_tutorial.png', 'Tutorial / límites y pasos'],
              ['/tutorial/prisma3/03_import_csv.png', 'Importación / CSV experimental'],
              ['/tutorial/prisma3/04_eeg_real.png', 'Análisis / EEG real'],
              ['/tutorial/prisma3/05_datasets.png', 'Compatibilidad / datasets'],
            ].map(([src, caption], index) => (
              <figure className={index === 0 ? 'screenshot featured' : 'screenshot'} key={src} data-reveal>
                <img src={src} alt={caption} loading="lazy" />
                <figcaption><span>{String(index + 3).padStart(2, '0')}</span>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section research-method">
          <div className="wrap">
            <SectionTitle
              code="05 / METHOD"
              title="POR QUÉ ESTO ES INVESTIGACIÓN SERIA"
              text="Serio no significa infalible. Significa que cada afirmación puede rastrearse hasta un protocolo, una partición de datos, una métrica y una limitación."
            />
            <div className="method-grid">
              {[
                [Database, 'DATA PROVENANCE', 'Datasets identificables, estructura BIDS, sujetos y paradigmas documentados.'],
                [FlaskConical, 'CONTROLS', 'LOSO, train-fold preprocessing, controles negativos y separación de regímenes.'],
                [Code2, 'REPRODUCIBILITY', 'CLI, configuración, tests, reportes y rutas de ejecución repetibles.'],
                [AlertTriangle, 'NEGATIVE RESULTS', 'Resultados cercanos al azar permanecen visibles; no se ocultan detrás de marketing.'],
                [Microscope, 'EXTERNAL VALIDATION', 'El siguiente paso exige más datasets, revisión académica y sesiones en vivo.'],
                [Shield, 'BOUNDARIES', 'Software experimental, no clínico y sin etiquetado diagnóstico.'],
              ].map(([Icon, title, text]) => (
                <article className="method-card" key={title} data-reveal>
                  <Icon size={28} strokeWidth={1.4} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section wrap consciousness-section">
          <div className="consciousness-title" data-reveal>
            <span>06 / CONSCIOUSNESS</span>
            <h2>ESTUDIAR CORRELATOS.<br />NO INVENTAR CERTEZAS.</h2>
          </div>
          <div className="consciousness-copy" data-reveal>
            <p className="large-copy">La visión de PRISMA sobre consciencia empieza por preguntas medibles: estabilidad del baseline, transiciones de estado, variación intra-sujeto, incertidumbre y reproducibilidad.</p>
            <p>No afirma resolver el “problema difícil” de la consciencia. Tampoco convierte una banda EEG en una emoción, diagnóstico o pensamiento. El objetivo es construir mejores instrumentos para estudiar correlatos neurofisiológicos bajo protocolos definidos.</p>
            <div className="manual-note">OBSERVE → QUANTIFY → COMPARE → REPORT UNCERTAINTY</div>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="07 / ROADMAP"
              title="DE PRISMA 3.2 A NOOSPHERE"
              text="Las etapas futuras son direcciones de investigación, no funcionalidades ya disponibles."
            />
            <div className="roadmap-list">
              {PRISMA_ROADMAP.map((item, index) => (
                <article className="roadmap-item" key={item.title} data-reveal>
                  <div className="roadmap-index">{String(index + 1).padStart(2, '0')}</div>
                  <div className="roadmap-year">{item.year}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <span>{item.state}</span>
                  </div>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section wrap prisma-video-section">
          <SectionTitle
            code="08 / EXTRA / ARCHIVE"
            title="PRISMA 1 — VIDEO DEMONSTRATION"
            text="Material histórico para entender de dónde viene el proyecto. Este vídeo no representa PRISMA 3 ni PRISMA 3.2."
          />
          <div className="video-layout">
            <div className="video-frame" data-reveal>
              <iframe
                src="https://www.youtube-nocookie.com/embed/3Jw7r_unoPg?rel=0"
                title="PRISMA 1 historical demonstration"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <aside className="video-note" data-reveal>
              <span className="panel-label">IMPORTANT VERSION NOTE</span>
              <h3>THIS IS PRISMA 1.<br />NOT PRISMA 3.</h3>
              <p>El vídeo documenta una versión temprana y sirve como archivo del proceso. PRISMA 3.2 continúa en desarrollo: el material público actual son las capturas reales mostradas arriba y teasers breves publicados en Instagram y TikTok.</p>
              <a className="archive-video-link" href="https://youtu.be/3Jw7r_unoPg" target="_blank" rel="noreferrer">OPEN ON YOUTUBE <ArrowUpRight size={16} /></a>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

function BootLog() {
  return (
    <div className="rx-window boot-window" data-reveal>
      <div className="rx-window-head"><span>BOOT / SERIAL</span><span>00:00:02.41</span></div>
      <div className="boot-lines">
        {[
          ['RXos v4 Foundation', ''],
          ['Boot stage', 'OK'],
          ['GDT / IDT', 'OK'],
          ['Memory / heap', 'OK'],
          ['Timer / IRQ', 'OK'],
          ['Keyboard / mouse', 'OK'],
          ['RXFS self-test', 'OK'],
          ['Shell / desktop', 'OK'],
          ['Network transport', 'TODO'],
        ].map(([label, state]) => (
          <div key={label}><span>&gt; {label}</span><strong className={state === 'TODO' ? 'todo' : ''}>{state}</strong></div>
        ))}
      </div>
    </div>
  );
}

function DesktopMock() {
  return (
    <div className="rx-window desktop-window" data-reveal>
      <div className="rx-window-head"><span>RX DESKTOP / CONCEPT + IMPLEMENTED SHELL</span><span>1280×720</span></div>
      <div className="rx-desktop">
        <aside>
          <strong>RX</strong>
          <span className="active">HOME</span>
          <span>FILES</span>
          <span>STUDIO</span>
          <span>PRISMA</span>
          <span>STATUS</span>
        </aside>
        <div className="rx-canvas">
          <div className="rx-title">WELCOME BACK, RESEARCHER.</div>
          <div className="rx-tiles">
            <div><Terminal /><span>TERMINAL</span></div>
            <div><Database /><span>RXFS</span></div>
            <div><Code2 /><span>ROXENITE</span></div>
            <div><Network /><span>RGX:// LOCAL</span></div>
          </div>
          <div className="rx-command">&gt; status <span className="cursor-block" /></div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureDiagram() {
  const layers = [
    ['UI', 'desktop / command bar / editor'],
    ['USERLAND', 'shell / Roxenite runtime / rgx:// local'],
    ['FS + DRIVERS', 'RXFS / ATA PIO / keyboard / mouse / framebuffer'],
    ['KERNEL', 'C freestanding / IRQ / heap / VFS / IPC'],
    ['CRYPTO CORE', 'Rust no_std / ML-KEM / ChaCha20 / SHA3'],
    ['BOOT', 'NASM / Multiboot2 / x86_64 long mode'],
  ];
  return (
    <div className="architecture" data-reveal>
      {layers.map(([title, text], index) => (
        <div className="architecture-layer" key={title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{title}</strong>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

function RXOS() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="RX OS / EXPERIMENTAL SYSTEMS"
        title={<>A LABORATORY<br />THAT BOOTS.</>}
        text="RX OS es una base bare-metal x86_64 construida para explorar un entorno científico mínimo, verificable y soberano. El sistema actual es un prototipo técnico, no un reemplazo de Linux ni un producto de producción."
        image="/rxos/boot-banner.png"
      >
        <div className="hero-tags">
          <span>NASM</span><span>C FREESTANDING</span><span>RUST NO_STD</span><span>QEMU</span><span>GRUB / MULTIBOOT2</span>
        </div>
      </PageHero>

      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / FOUNDATION"
            title="RXos v4.1.1"
            text="La arquitectura documenta cada subsistema como IMPLEMENTED, PARTIAL, STUB o TODO. Esa honestidad forma parte del diseño."
          />
          <div className="rx-metrics">
            <div data-reveal><strong>x86_64</strong><span>bare metal</span></div>
            <div data-reveal><strong>26</strong><span>QEMU smoke assertions</span></div>
            <div data-reveal><strong>9</strong><span>persistence assertions</span></div>
            <div data-reveal><strong>RAM + ATA</strong><span>RXFS modes</span></div>
          </div>
          <BootLog />
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="02 / REAL CAPTURES"
              title="THE SYSTEM, RUNNING IN QEMU"
              text="Estas capturas proceden de RXos v4.1.1 ejecutándose realmente. No son mockups ni renders: muestran el arranque verificado, el escritorio clickable y la vista de estado del sistema."
            />
            <div className="screenshot-grid rxos-capture-grid">
              <figure className="screenshot scientific-capture featured" data-reveal>
                <img src="/rxos/boot-banner.png" alt="RXos v4.1.1 real boot banner and first-run pseudonym setup in QEMU" loading="lazy" />
                <figcaption className="capture-caption">
                  <span>REAL / 01</span>
                  <div><strong>VERIFIED BOOT + FIRST-RUN SETUP</strong><p>Cada OK se imprime después de comprobar la etapa correspondiente. La pantalla termina en el setup de pseudónimo ligado al UID del hardware virtual.</p></div>
                </figcaption>
              </figure>
              <figure className="screenshot scientific-capture" data-reveal>
                <img src="/rxos/desktop-home.png" alt="RXos v4.1.1 real clickable desktop home screen in QEMU" loading="lazy" />
                <figcaption className="capture-caption">
                  <span>REAL / 02</span>
                  <div><strong>CLICKABLE DESKTOP HOME</strong><p>Navegación lateral, tiles de sistema, cuenta local, editor, ajustes y rutas rgx:// servidas por el runtime actual.</p></div>
                </figcaption>
              </figure>
              <figure className="screenshot scientific-capture" data-reveal>
                <img src="/rxos/shell-status.png" alt="RXos v4.1.1 real terminal status view in QEMU" loading="lazy" />
                <figcaption className="capture-caption">
                  <span>REAL / 03</span>
                  <div><strong>STATUS VIEW: IMPLEMENTED / STUB / TODO</strong><p>La propia interfaz distingue subsistemas operativos de superficies reservadas y funciones todavía pendientes.</p></div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section wrap rxos-download-section">
          <SectionTitle
            code="03 / PUBLIC TEST BUILD"
            title="DOWNLOAD RXos v4.1.1"
            text="Paquete oficial para pruebas locales. Incluye la ISO arrancable, README técnico y las tres capturas reales. QEMU es la vía recomendada y más segura para evaluarlo."
          />
          <div className="rxos-download-layout">
            <article className="download-card" data-reveal>
              <div className="download-card-top"><span>OFFICIAL ZIP</span><strong>v4.1.1</strong></div>
              <h3>BOOT IT.<br />INSPECT IT.<br />BREAK NOTHING.</h3>
              <p>Build experimental bare-metal x86_64. No es un sistema de producción, no está auditado y no debe utilizarse para almacenar información importante.</p>
              <dl className="download-facts">
                <div><dt>CONTENTS</dt><dd>ISO + README + screenshots</dd></div>
                <div><dt>BOOT</dt><dd>BIOS / SeaBIOS / CSM</dd></div>
                <div><dt>RECOMMENDED</dt><dd>QEMU x86_64 · 512 MiB RAM</dd></div>
                <div><dt>SHA-256</dt><dd><code>a275d6b1783d439625e0bcc7395535a085bd87a2ba4db6ff88a8b402de8745af</code></dd></div>
              </dl>
              <div className="download-actions">
                <a className="brutal-button primary" href="/downloads/RXos-v4.1.1.zip" download>DOWNLOAD OFFICIAL ZIP <ArrowUpRight size={16} /></a>
                <a className="brutal-button" href="/downloads/RXos-v4.1.1-README.md" target="_blank" rel="noreferrer">READ INCLUDED GUIDE <ArrowUpRight size={16} /></a>
                <a className="checksum-link" href="/downloads/RXos-v4.1.1.zip.sha256" download>DOWNLOAD CHECKSUM</a>
              </div>
            </article>

            <article className="qemu-guide" data-reveal>
              <span className="panel-label">QUICKSTART / QEMU</span>
              <h3>RUN WITHOUT INSTALLING RXos ON YOUR MACHINE.</h3>
              <p>Instala QEMU, descomprime el paquete en una carpeta nueva y arranca la ISO. La opción <code>-serial stdio</code> refleja el log de arranque en tu terminal.</p>
              <div className="platform-install">
                <div><span>macOS</span><code>brew install qemu</code></div>
                <div><span>Fedora</span><code>sudo dnf install qemu-system-x86-core</code></div>
                <div><span>Debian / Ubuntu</span><code>sudo apt install qemu-system-x86</code></div>
              </div>
              <pre><code>{`mkdir rxos-v4.1.1 && cd rxos-v4.1.1
unzip ../RXos-v4.1.1.zip

qemu-system-x86_64 \\
  -machine q35 \\
  -m 512M \\
  -cdrom RXos-v4-foundation.iso \\
  -serial stdio`}</code></pre>
              <div className="qemu-commands">
                <span>TRY INSIDE RXos</span>
                <code>help</code><code>status</code><code>ls</code><code>write hola.txt hola</code><code>cat hola.txt</code><code>go rgx://hello</code><code>devices</code><code>uptime</code>
              </div>
              <details>
                <summary>OPTIONAL ATA PERSISTENCE IN QEMU</summary>
                <pre><code>{`qemu-img create -f raw rxos-disk.img 512K
qemu-system-x86_64 -machine pc -m 512M \\
  -cdrom RXos-v4-foundation.iso \\
  -drive file=rxos-disk.img,format=raw,if=ide \\
  -serial stdio

# Inside RXos:
format hda yes
save`}</code></pre>
              </details>
            </article>
          </div>
          <p className="download-boundary" data-reveal><AlertTriangle size={17} /> Experimental research build. Run it in a virtual machine first. The download is provided for inspection, education and reproducible testing, without warranty.</p>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="04 / ARCHITECTURE"
            title="DE BOOT.ASM A LA INTERFAZ"
            text="Una pila pequeña, legible y separada por capas."
          />
          <ArchitectureDiagram />
        </section>

        <section className="section rx-state-section">
          <div className="wrap">
            <SectionTitle
              code="05 / ENGINEERING STATUS"
              title="WHAT WORKS — AND WHAT DOES NOT"
              text="El release y su README mantienen una separación explícita entre implementación verificada, superficies STUB y roadmap."
            />
          </div>
          <div className="wrap rx-state-grid">
            <article data-reveal>
              <div className="state-heading state-ok"><CheckCircle /> IMPLEMENTED</div>
              <ul>{RX_IMPLEMENTED.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article data-reveal>
              <div className="state-heading state-todo"><AlertTriangle /> NOT YET</div>
              <ul>{RX_LIMITS.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="06 / EDITIONS"
            title="DOS DIRECCIONES DE PRODUCTO"
            text="Estas ediciones son visión de diseño sobre la misma base técnica; no se presentan como releases terminadas."
          />
          <div className="edition-grid">
            <article className="edition-card" data-reveal>
              <span>01 / CONSCIENCE</span>
              <h3>LAB-FIRST.<br />TERMINAL-FIRST.</h3>
              <p>Edición mínima para investigación, código, Python y trabajo multiterminal. Sin escritorio convencional; acceso explícito a WWW y, en el futuro, RXwired.</p>
              <div className="tag-row"><span>MINIMAL</span><span>AMNESIC DEFAULT</span><span>RESEARCH</span></div>
            </article>
            <article className="edition-card edition-dark" data-reveal>
              <span>02 / ENTERPRISE</span>
              <h3>ONE SYSTEM.<br />ONE SURFACE.</h3>
              <p>Edición gráfica centrada en RXbrowser como aplicación principal, herramientas firmadas y una experiencia consistente sobre hardware controlado.</p>
              <div className="tag-row"><span>GUI</span><span>RXBROWSER</span><span>SIGNED APPS</span></div>
            </article>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="07 / ROADMAP"
              title="LO QUE CONVIERTE UN PROTOTIPO EN SISTEMA"
              text="La prioridad no es añadir efectos visuales. Es construir aislamiento, drivers y verificaciones."
            />
            <div className="rx-roadmap">
              {[
                ['01', 'HARDWARE', 'UEFI nativo, storage moderno, más dispositivos de entrada y backend gráfico más robusto.'],
                ['02', 'ISOLATION', 'Scheduler, procesos, syscalls, separación user/kernel y modelo de permisos.'],
                ['03', 'NETWORK', 'Driver NIC, transporte RXwired, resolución rgx:// remota y threat model actualizado.'],
                ['04', 'TRUST', 'Apps firmadas, actualización reproducible, auditoría criptográfica y cadena de build verificable.'],
                ['05', 'LAB RUNTIME', 'PRISMA, herramientas de señal y experimentos empaquetados como flujos reproducibles.'],
              ].map(([number, title, text]) => (
                <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    recipient: 'roger@rogexlaboratories.com',
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const subject = form.subject || `Contacto desde Rogex Laboratories — ${form.name || 'sin nombre'}`;
    const body = [
      `Nombre: ${form.name || '—'}`,
      `Email: ${form.email || '—'}`,
      '',
      form.message,
    ].join('\n');
    window.location.href = `mailto:${form.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={submit} data-reveal>
      <div className="form-row">
        <label>
          DESTINATION
          <select name="recipient" value={form.recipient} onChange={update}>
            <option value="roger@rogexlaboratories.com">Business — roger@rogexlaboratories.com</option>
            <option value="rogynavarro@gmail.com">Personal — rogynavarro@gmail.com</option>
          </select>
        </label>
        <label>
          YOUR NAME
          <input name="name" value={form.name} onChange={update} autoComplete="name" required />
        </label>
      </div>
      <div className="form-row">
        <label>
          YOUR EMAIL
          <input type="email" name="email" value={form.email} onChange={update} autoComplete="email" required />
        </label>
        <label>
          SUBJECT
          <input name="subject" value={form.subject} onChange={update} required />
        </label>
      </div>
      <label>
        MESSAGE
        <textarea name="message" value={form.message} onChange={update} rows="8" required />
      </label>
      <div className="form-submit">
        <p>El formulario abre tu cliente de correo. La web no almacena el mensaje.</p>
        <button className="brutal-button primary" type="submit">OPEN EMAIL <Send size={16} /></button>
      </div>
    </form>
  );
}

function About() {
  const projectGroups = useMemo(() => PROJECTS, []);
  return (
    <>
      <PageHero
        index="03"
        eyebrow="ABOUT / INDEPENDENT LAB"
        title={<>BUILT BY HAND.<br />TESTED IN PUBLIC.</>}
        text="Rogex Laboratories es un laboratorio independiente de software científico y sistemas experimentales fundado por Roger Navarro. El trabajo combina ingeniería, investigación aplicada y documentación técnica."
        image="/about-workbench.svg"
      />

      <main>
        <section className="section wrap about-intro">
          <div className="about-profile" data-reveal>
            <span>FOUNDER / RESEARCH SOFTWARE DEVELOPER</span>
            <h2>ROGER NAVARRO</h2>
            <p>Desarrollador independiente centrado en EEG, procesamiento de señal, Linux, sistemas bare-metal, herramientas defensivas y productos experimentales. El objetivo de Rogex no es aparentar una gran institución: es convertir trabajo real, documentación y colaboración en una institución con el tiempo.</p>
          </div>
          <div className="about-principles" data-reveal>
            <div><span>01</span><strong>BUILD</strong><p>Prototipos que arrancan, ejecutan y generan resultados inspeccionables.</p></div>
            <div><span>02</span><strong>MEASURE</strong><p>Métricas acompañadas por el régimen experimental y sus límites.</p></div>
            <div><span>03</span><strong>DOCUMENT</strong><p>Arquitectura, comandos, fallos, resultados negativos y roadmap.</p></div>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="01 / SKILLS"
              title="TECHNICAL RANGE"
              text="Una lista de herramientas utilizadas en proyectos del laboratorio; no sustituye experiencia institucional ni certificaciones que no existan."
            />
            <div className="skill-cloud" data-reveal>
              {SKILLS.map((skill, index) => <span style={{ '--i': index }} key={skill}>{skill}</span>)}
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="02 / PROJECTS"
            title="OTHER WORK"
            text="Proyectos de software que muestran distintas capas del stack. Se describen aquí sin enlaces directos a repositorios."
          />
          <div className="project-grid">
            {projectGroups.map((project, index) => (
              <article className="project-card" key={project.name} data-reveal style={{ '--delay': `${index * 60}ms` }}>
                <div className="project-top"><span>{String(index + 1).padStart(2, '0')}</span><span>{project.type}</span></div>
                <h3>{project.name}</h3>
                <p>{project.text}</p>
                <div className="stack-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-black gaslight-media-section" id="gaslight-demo">
          <div className="wrap">
            <SectionTitle
              code="03 / VIDEO / DEFENSIVE SECURITY"
              title="ROGEX GASLIGHT — DEMONSTRATION"
              text="Vídeo técnico del framework experimental de defensa, engaño y observabilidad. Documenta el proyecto como herramienta defensiva; no se presenta como framework ofensivo ni como sistema de explotación."
            />
            <div className="video-layout gaslight-video-layout">
              <div className="video-frame" data-reveal>
                <iframe
                  src="https://www.youtube-nocookie.com/embed/ToIAxNt07y0?rel=0"
                  title="Rogex Gaslight defensive security demonstration"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <aside className="video-note" data-reveal>
                <span className="panel-label">PROJECT RECORD / REAL DEMO</span>
                <h3>DECEPTION AS A DEFENSIVE SENSOR.</h3>
                <p>Rogex Gaslight explora superficies señuelo, perfiles modulares, eventos y reportes para observar automatización hostil y mejorar la respuesta defensiva. El vídeo muestra una fase concreta del desarrollo y puede quedar desactualizado respecto a builds posteriores.</p>
                <div className="tag-row gaslight-video-tags"><span>PYTHON</span><span>LINUX</span><span>YAML</span><span>TELEMETRY</span><span>DEFENSIVE ONLY</span></div>
                <a className="archive-video-link" href="https://youtu.be/ToIAxNt07y0" target="_blank" rel="noreferrer">OPEN ON YOUTUBE <ArrowUpRight size={16} /></a>
              </aside>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="wrap">
            <SectionTitle
              code="04 / CONTACT"
              title="WRITE TO THE LAB"
              text="Colaboración científica, revisión técnica, hardware, trabajo, prensa o propuestas de proyecto."
            />
            <div className="contact-layout">
              <div className="contact-addresses" data-reveal>
                <a href="mailto:roger@rogexlaboratories.com">
                  <span>BUSINESS</span>
                  <strong>roger@rogexlaboratories.com</strong>
                  <Mail size={22} />
                </a>
                <a href="mailto:rogynavarro@gmail.com">
                  <span>PERSONAL</span>
                  <strong>rogynavarro@gmail.com</strong>
                  <Mail size={22} />
                </a>
                <div className="contact-note">
                  <CircleDot size={18} />
                  <p>Para investigación, incluye dataset, paradigma, formato de archivos y objetivo de evaluación. Para software, incluye entorno, versión y pasos de reproducción.</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="wrap footer-main">
        <div>
          <button className="footer-wordmark" onClick={() => navigate('/')}>ROGEX<br />LABORATORIES</button>
          <p>Independent research software and experimental systems.</p>
        </div>
        <div className="footer-nav">
          {NAV_ITEMS.map(([href, label]) => <button key={href} onClick={() => navigate(href)}>{label}</button>)}
        </div>
        <div className="footer-socials">
          {SOCIALS.map((item) => <SocialIcon item={item} key={item.label} />)}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 ROGEX LABORATORIES. ALL RIGHTS RESERVED.</span>
        <span>PRISMA IS EXPERIMENTAL, NON-CLINICAL RESEARCH SOFTWARE.</span>
      </div>
    </footer>
  );
}

function NotFound({ navigate }) {
  return (
    <main className="not-found">
      <span>404 / ROUTE NOT FOUND</span>
      <h1>NO SIGNAL.</h1>
      <button className="brutal-button primary" onClick={() => navigate('/')}>RETURN HOME</button>
    </main>
  );
}

function App() {
  const [path, navigate] = useRoute();
  useReveal();

  useEffect(() => {
    const titles = {
      '/': 'Rogex Laboratories — Open Research',
      '/prisma': 'PRISMA 3.2 — Rogex Laboratories',
      '/rx-os': 'RX OS — Rogex Laboratories',
      '/about': 'About — Rogex Laboratories',
    };
    document.title = titles[path] || 'Rogex Laboratories';
  }, [path]);

  let page = <NotFound navigate={navigate} />;
  if (path === '/') page = <Home navigate={navigate} />;
  if (path === '/prisma') page = <Prisma />;
  if (path === '/rx-os' || path === '/rogexos') page = <RXOS />;
  if (path === '/about') page = <About />;

  return (
    <>
      <Header path={path} navigate={navigate} />
      {page}
      <Footer navigate={navigate} />
    </>
  );
}

const root = document.getElementById('root');
if (root) {
  root.innerHTML = '';
  createRoot(root).render(<App />);
}
