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
  Download,
  Factory,
  FlaskConical,
  Leaf,
  Link as LinkIcon,
  Lock,
  Mail,
  Menu,
  Microscope,
  Network,
  Radio,
  Send,
  Shield,
  Terminal,
  Waves,
  Zap,
  X,
} from 'lucide-react';
import './styles.css';

const NAV_ITEMS = [
  ['/', 'HOME'],
  ['/suite', 'SUITE'],
  ['/architecture', 'ARCHITECTURE'],
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

const PRODUCT_SUITE = [
  {
    id: 'rxos-desktop',
    code: 'RX-01',
    name: 'rxOS Desktop Experience',
    tier: 'CLOSED SOURCE · BOOTABLE x86-64',
    status: 'PROTOTYPE · PUBLIC TEST BUILD',
    text: 'Entorno bare-metal de laboratorio: boot verificable, shell, filesystem y superficie gráfica mínima. Base soberana para herramientas científicas locales.',
    tags: ['x86_64', 'GRUB / Multiboot2', 'C + Rust no_std', 'QEMU'],
    href: '/rx-os',
    icon: Cpu,
    tone: 'dark',
  },
  {
    id: 'rxos-kernel',
    code: 'RX-02',
    name: 'rxOS Neuromorphic Kernel',
    tier: 'OPEN SOURCE · EVENT FABRIC',
    status: 'RESEARCH ROADMAP · DEC 2026',
    text: 'Kernel event-driven orientado a spike trains, ring buffers SPSC y plasticidad local. Bajo footprint de memoria y latencia sub-milisegundo como requisitos de diseño.',
    tags: ['SNN', 'STDP', 'Lock-free rings', 'Low-carbon'],
    href: '/architecture',
    icon: Network,
    tone: 'acid',
  },
  {
    id: 'prisma3',
    code: 'P3',
    name: 'PRISMA 3.2',
    tier: 'EEG RESEARCH SOFTWARE',
    status: 'ACTIVE · COMMUNITY / PRO LAYERS',
    text: 'Pipeline experimental de EEG con Feature Registry, Event Mode, Confound Auditor y Benchmark Matrix. Separa generalización, calibración y personalización.',
    tags: ['Python 3.10+', 'MNE', 'BIDS', '≈73% raw LOSO'],
    href: '/prisma#prisma3',
    icon: Brain,
    tone: 'paper',
  },
  {
    id: 'prisma5',
    code: 'P5',
    name: 'PRISMA 5',
    tier: 'NEUROMORPHIC ENGINE',
    status: 'R&D · ACADEMIC / OEM PATHS',
    text: 'Motor event-driven sobre SNNs: Delta Modulation asíncrona, Predictive Coding de espigas y STDP continuo. Puente entre MNE y el kernel neuromórfico de rxOS.',
    tags: ['Delta mod', 'LIF', 'Spike error', 'Akida / Loihi target'],
    href: '/prisma#prisma5',
    icon: Zap,
    tone: 'accent',
  },
];

const LICENSE_TIERS = [
  {
    product: 'PRISMA 3',
    rows: [
      ['Community / Student', 'Open / free', 'Investigación y aprendizaje'],
      ['Indie / Dev', '€60', 'Desarrolladores independientes'],
      ['Research Lab / Pro', '€150', 'Laboratorios y uso profesional'],
    ],
  },
  {
    product: 'PRISMA 5',
    rows: [
      ['Academic / Personal', '€150 · binary', 'Uso académico no comercial'],
      ['Commercial / Lab', '€300 · source', 'Integración y laboratorio'],
      ['OEM / Hardware', 'Royalty + custom', 'Integradores y silicio'],
    ],
  },
  {
    product: 'rxOS',
    rows: [
      ['Neuromorphic Kernel', 'Open source', 'Event fabric + SNN runtime'],
      ['Desktop Experience', 'Closed source', 'Bootable lab surface'],
      ['OEM integration', 'Custom arch', 'Hardware partners'],
    ],
  },
];

/** Fichas de producto con descarga "coming soon" — Prisma 3 y Prisma 5 */
const PRISMA_DOWNLOAD_PRODUCTS = [
  {
    id: 'prisma3',
    code: 'P3',
    name: 'Prisma 3',
    version: '3.2 DevBug',
    status: 'IN DEVELOPMENT',
    badge: 'Próximamente / Coming Soon',
    tagline: 'Software experimental de investigación EEG con pipelines reproducibles, baselines individuales y separación estricta de regímenes de evaluación.',
    description:
      'Prisma 3 modela a la persona antes de interpretar el estado: features espectrales y temporales, Event Mode, Confound Auditor y Benchmark Matrix. No es un dispositivo médico ni software de diagnóstico.',
    features: [
      'Feature Registry con siete familias (spectral, temporal, covariance, speech, motor, cognitive…)',
      'Event Mode: épocas alineadas a events.tsv / anotaciones MNE con rechazo de artefactos',
      'Confound Auditor + Benchmark Matrix (raw LOSO vs calibración vs personalizado)',
      'Soporte BIDS / OpenNeuro y CLI Python 3.10+ con reportes trazables',
    ],
    downloadLabel: 'Descargar Prisma 3',
    tone: 'paper',
    icon: Brain,
  },
  {
    id: 'prisma5',
    code: 'P5',
    name: 'Prisma 5',
    version: 'Neuromorphic Core',
    status: 'IN DEVELOPMENT',
    badge: 'Aún no disponible',
    tagline: 'Motor event-driven sobre redes de impulsos (SNN): de señal continua MNE a spike trains, plasticidad STDP y predictive coding en el stack rxOS.',
    description:
      'Prisma 5 conecta el laboratorio EEG con el kernel neuromórfico: Delta Modulation asíncrona, poblaciones LIF y detección de anomalías por error de predicción de espigas. Camino académico, commercial y OEM.',
    features: [
      'Delta Modulation: eventos UP/DOWN por umbral adaptativo θ_adp',
      'Predictive coding neuromórfico sobre poblaciones LIF',
      'STDP continuo y homeostasis local (tau_m / θ₀)',
      'Integración con rxOS event fabric · target Akida / Loihi',
    ],
    downloadLabel: 'Descargar Prisma 5',
    tone: 'dark',
    icon: Zap,
  },
];

const ARCH_STACK = [
  {
    layer: '01',
    title: 'DEVICE / DATA',
    text: 'EEG hardware o datasets (EDF / BIDS). Ingestión LSL para vivo; archivos para offline.',
    detail: '256 Hz – 1000 Hz · raw samples',
  },
  {
    layer: '02',
    title: 'rxOS HAB + IPC',
    text: 'Abstracción de hardware y ring buffers SPSC lock-free. Sin bloqueos del pipeline crítico.',
    detail: 'SPSC · zero-copy intent · deterministic path',
  },
  {
    layer: '03',
    title: 'DELTA MODULATION',
    text: 'Señal continua → spike trains asíncronos por umbral adaptativo UP / DOWN.',
    detail: 'ΔV(t) ≥ +θ → UP · ΔV(t) ≤ −θ → DOWN',
  },
  {
    layer: '04',
    title: 'PRISMA CORE / SNN',
    text: 'Motor event-driven: poblaciones LIF, STDP en tiempo real y error de predicción de espigas.',
    detail: 'Predictive coding · local homeostasis · tau_m / θ₀',
  },
  {
    layer: '05',
    title: 'TELEMETRY / UI',
    text: 'Streams de eventos hacia frontend liviano. Objetivo: ondas y spikes a 60 FPS sin GIL.',
    detail: 'Tauri + WebGL/WebGPU · WS / gRPC',
  },
];

const CTA_AUDIENCES = [
  {
    id: 'developers',
    icon: Code2,
    title: 'DEVELOPERS',
    text: 'Kernel open source, APIs de eventos, runtime Roxenite y builds reproducibles en QEMU. Contribuye drivers, tests y toolchains.',
    action: 'Open architecture',
    href: '/architecture',
    mailSubject: 'Developer collaboration — Knights Labs / rxOS',
  },
  {
    id: 'researchers',
    icon: Microscope,
    title: 'RESEARCHERS',
    text: 'PRISMA 3.2 para pipelines EEG trazables; PRISMA 5 como motor neuromórfico experimental. Sin claims clínicos.',
    action: 'Explore PRISMA',
    href: '/prisma',
    mailSubject: 'Research collaboration — PRISMA / EEG',
  },
  {
    id: 'oem',
    icon: Factory,
    title: 'OEM / INTEGRATORS',
    text: 'Integración en silicio neuromórfico (Akida / Loihi), royalties y arquitectura custom. Hardware-first partnerships.',
    action: 'Contact OEM desk',
    href: 'mailto:roger@rogexlaboratories.com?subject=OEM%20/%20Hardware%20integration%20%E2%80%94%20Knights%20Labs',
    mailSubject: null,
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
    text: 'Pipeline Python 3.10+, CLI, features, Event Mode, Confound Auditor, Benchmark Matrix e informes con límites explícitos.',
  },
  {
    year: 'NEXT',
    title: 'PRISMA 3 → LIVE PATH',
    state: 'ENGINEERING',
    text: 'Adquisición LSL, ring buffers sin bloqueo, control de artefactos y calibración online hacia 60 FPS de telemetría.',
  },
  {
    year: 'R+D',
    title: 'PRISMA 5',
    state: 'NEUROMORPHIC CORE',
    text: 'SNN event-driven, Delta Modulation, Predictive Coding de espigas y STDP continuo acoplado a rxOS.',
  },
  {
    year: 'H/W',
    title: 'AKIDA / LOIHI',
    state: 'HARDWARE TARGET',
    text: 'Benchmark e integración en procesadores neuromórficos. Camino OEM con arquitectura custom.',
  },
  {
    year: 'L/T',
    title: 'ASTRA',
    state: 'LONG-TERM CONCEPT',
    text: 'Capa experimental de hardware, feedback y protocolos cerrados. Requiere ética, validación y límites regulatorios.',
  },
  {
    year: 'L/T',
    title: 'NOOSPHERE',
    state: 'LONG-TERM CONCEPT',
    text: 'Red federada de investigación entre laboratorios. Comparación de resultados y procedencia — no lectura mental.',
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
  'Kernel neuromórfico SNN: diseño documentado, runtime aún en investigación.',
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
  'SNN / neuromorphic',
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
    if (href.startsWith('mailto:') || href.startsWith('http')) {
      window.location.href = href;
      return;
    }

    const [base, hash] = href.split('#');
    const target = base || path;

    if (target === path) {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', href);
    setPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
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
        <button className="wordmark" onClick={() => navigate('/')} aria-label="Knights Labs / Rogex Laboratories home">
          <span className="wordmark-rx">KL</span>
          <span className="wordmark-stack">
            <strong>KNIGHTS LABS</strong>
            <em>ROGEX LABORATORIES</em>
          </span>
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
      <div className="hero-caption">KNIGHTS LABS · ROGEX · NEUROMORPHIC R&amp;D · 2026</div>
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

function DownloadSoonButton({ label, badge = 'Coming Soon' }) {
  return (
    <div className="download-soon">
      <button
        type="button"
        className="brutal-button download-btn-disabled"
        disabled
        aria-disabled="true"
        title={`${label} — ${badge}`}
      >
        <Download size={16} strokeWidth={2} />
        {label}
        <Lock size={14} strokeWidth={2} />
      </button>
      <span className="coming-soon-badge" role="status">
        {badge}
      </span>
    </div>
  );
}

function PrismaProductCard({ product, index }) {
  const Icon = product.icon;
  return (
    <article
      id={product.id}
      className={`prisma-product-card prisma-product-card-${product.tone}`}
      data-reveal
      style={{ '--delay': `${index * 80}ms` }}
    >
      <header className="prisma-product-head">
        <div className="prisma-product-codes">
          <span className="prisma-product-code">{product.code}</span>
          <StatusBadge tone={product.tone === 'dark' ? 'warn' : 'open'}>{product.status}</StatusBadge>
        </div>
        <Icon size={32} strokeWidth={1.35} aria-hidden="true" />
      </header>

      <div className="prisma-product-titles">
        <h3>{product.name}</h3>
        <span className="prisma-product-version">{product.version}</span>
      </div>

      <p className="prisma-product-tagline">{product.tagline}</p>
      <p className="prisma-product-desc">{product.description}</p>

      <div className="prisma-product-features">
        <span className="panel-label">KEY FEATURES</span>
        <ul>
          {product.features.map((feature) => (
            <li key={feature}>
              <CheckCircle size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="prisma-product-footer">
        <DownloadSoonButton label={product.downloadLabel} badge={product.badge} />
        <p className="prisma-product-note">
          Release de distribución pública pendiente · software experimental, no clínico
        </p>
      </footer>
    </article>
  );
}

function PrismaDownloadSection({ code = '00 / MODULES', title = 'PRISMA 3 Y PRISMA 5', text }) {
  return (
    <section className="section wrap prisma-download-section" id="prisma-downloads">
      <SectionTitle
        code={code}
        title={title}
        text={text || 'Fichas de producto con descarga pública. Los binarios aún no están publicados: los botones permanecen deshabilitados hasta el release.'}
      />
      <div className="prisma-product-grid">
        {PRISMA_DOWNLOAD_PRODUCTS.map((product, index) => (
          <PrismaProductCard product={product} index={index} key={product.id} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, navigate, index }) {
  const Icon = product.icon;
  return (
    <article
      className={`suite-card suite-card-${product.tone}`}
      data-reveal
      style={{ '--delay': `${index * 70}ms` }}
    >
      <div className="suite-card-top">
        <span>{product.code}</span>
        <Icon size={26} strokeWidth={1.4} />
      </div>
      <StatusBadge>{product.status}</StatusBadge>
      <h3>{product.name}</h3>
      <div className="suite-tier">{product.tier}</div>
      <p>{product.text}</p>
      <div className="tag-row">
        {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <button className="text-link" onClick={() => navigate(product.href)}>
        OPEN DOSSIER <ArrowUpRight size={15} />
      </button>
    </article>
  );
}

function CtaBand({ navigate }) {
  return (
    <section className="section section-black cta-band" id="join">
      <div className="wrap">
        <SectionTitle
          code="CTA / JOIN"
          title="DEVELOPERS. RESEARCHERS. OEM."
          text="Tres puertas de entrada. El mismo laboratorio. Sin promesas clínicas y con límites explícitos."
        />
        <div className="cta-grid">
          {CTA_AUDIENCES.map(({ id, icon: Icon, title, text, action, href }, index) => (
            <article className="cta-card" key={id} data-reveal style={{ '--delay': `${index * 80}ms` }}>
              <Icon size={28} strokeWidth={1.35} />
              <h3>{title}</h3>
              <p>{text}</p>
              <button className="brutal-button primary" onClick={() => navigate(href)}>
                {action} <ArrowUpRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home({ navigate }) {
  return (
    <>
      <PageHero
        index="00"
        eyebrow="KNIGHTS LABS · ROGEX LABORATORIES"
        title={<>LOW-CARBON<br />NEUROTECH.<br />BOOTABLE LAB.</>}
        text="Rogex Laboratories opera bajo Knights Labs: software EEG reproducible, un kernel neuromórfico de código abierto y una experiencia desktop bare-metal. Lanzamiento de la suite proyectado para diciembre 2026."
        image="/home-campaigns.svg"
      >
        <div className="hero-actions">
          <button className="brutal-button primary" onClick={() => navigate('/suite')}>VIEW PRODUCT SUITE</button>
          <button className="brutal-button" onClick={() => navigate('/architecture')}>TECHNICAL ARCHITECTURE</button>
        </div>
        <div className="hero-tags">
          <span>PRISMA 3.2</span>
          <span>PRISMA 5 SNN</span>
          <span>rxOS DESKTOP</span>
          <span>OPEN NEUROMORPHIC KERNEL</span>
          <span>&lt;64 MB TARGET</span>
        </div>
      </PageHero>

      <main>
        <section className="section wrap" id="identity">
          <SectionTitle
            code="01 / IDENTITY"
            title="DE ROGEX AL MARCO KNIGHTS LABS"
            text="Misma ingeniería, identidad de producto más clara: investigación abierta donde aporta, licencias estratificadas donde sostiene el hardware accesible."
          />
          <div className="identity-grid">
            <article className="paper-panel" data-reveal>
              <span className="panel-label">BRAND TRANSITION</span>
              <h3>ROGEX BUILD.<br />KNIGHTS LABS SHIP.</h3>
              <p>Rogex Laboratories sigue siendo el laboratorio técnico. Knights Labs es el marco comercial y de producto que agrupa PRISMA, rxOS y el camino OEM hacia silicio neuromórfico.</p>
              <ul className="check-list compact-list">
                <li><CheckCircle size={18} /> Evidencia pública y límites no clínicos.</li>
                <li><CheckCircle size={18} /> Kernel neuromórfico open source.</li>
                <li><CheckCircle size={18} /> Desktop y capas Pro / OEM con licencias claras.</li>
              </ul>
            </article>
            <article className="black-panel eco-panel" data-reveal>
              <span className="panel-label">TECHNOACTIVISM</span>
              <h3>LOW-CARBON COMPUTING.</h3>
              <p>Arquitectura determinista, latencia sub-milisegundo y footprint de memoria objetivo &lt;64 MB frente a stacks inflados. Menos capas, menos desperdicio, más auditabilidad.</p>
              <div className="eco-metrics">
                <div><Leaf size={20} /><strong>LOW-CARBON</strong><span>compute-first design</span></div>
                <div><Zap size={20} /><strong>&lt;1 ms</strong><span>latency path goal</span></div>
                <div><Cpu size={20} /><strong>&lt;64 MB</strong><span>memory footprint target</span></div>
              </div>
            </article>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="02 / SUITE"
              title="CUATRO SUPERFICIES, UN PIPELINE"
              text="De la adquisición EEG al spike train y de vuelta a la telemetría — sin confudir MVP, roadmap y visión."
            />
            <div className="suite-grid">
              {PRODUCT_SUITE.map((product, index) => (
                <ProductCard product={product} navigate={navigate} index={index} key={product.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="03 / PIPELINE"
            title="DEL SENSOR AL SPIKE"
            text="Stack de referencia para PRISMA 5 sobre rxOS. Cada capa declara su contrato de datos."
          />
          <div className="mini-arch" data-reveal>
            {ARCH_STACK.map((item) => (
              <div className="mini-arch-layer" key={item.layer}>
                <span>{item.layer}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <code>{item.detail}</code>
              </div>
            ))}
          </div>
          <div className="hero-actions section-actions">
            <button className="brutal-button primary" onClick={() => navigate('/architecture')}>
              FULL ARCHITECTURE <ArrowUpRight size={15} />
            </button>
            <button className="brutal-button" onClick={() => navigate('/rx-os')}>
              DOWNLOAD RXos TEST BUILD
            </button>
          </div>
        </section>

        <section className="statement-section">
          <div className="wrap statement-grid" data-reveal>
            <div className="statement-mark"><Leaf size={54} strokeWidth={1.2} /></div>
            <blockquote>
              “Ambición sin trazabilidad es ruido. Knights Labs publica límites, estados de implementación y resultados negativos — porque también son parte del trabajo.”
            </blockquote>
            <div className="statement-meta">METHOD · EVIDENCE · LIMITS · LOW-CARBON</div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="04 / LICENSING"
            title="CAPAS QUE FINANCIAN ACCESO"
            text="Precios de referencia para el lanzamiento proyectado en diciembre 2026. Modelo de financiación cruzada: B2B/OEM subsidia investigación independiente y causas de acceso."
          />
          <div className="license-grid">
            {LICENSE_TIERS.map((block, index) => (
              <article className="license-card" key={block.product} data-reveal style={{ '--delay': `${index * 70}ms` }}>
                <span className="panel-label">{block.product}</span>
                <table>
                  <tbody>
                    {block.rows.map(([name, price, note]) => (
                      <tr key={name}>
                        <th>{name}</th>
                        <td>{price}</td>
                        <td>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            ))}
          </div>
          <p className="license-note" data-reveal>
            Las licencias se confirman al lanzamiento. PRISMA no es un dispositivo médico ni software de diagnóstico.
          </p>
        </section>

        <CtaBand navigate={navigate} />
      </main>
    </>
  );
}

function Suite({ navigate }) {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="PRODUCT SUITE / KNIGHTS LABS"
        title={<>THE STACK,<br />NOT THE HYPE.</>}
        text="rxOS Desktop, kernel neuromórfico open source, PRISMA 3.2 y PRISMA 5. Cada pieza tiene estado, licencia y público: desarrolladores, investigadores e integradores OEM."
        image="/rxos-concept.svg"
      >
        <div className="hero-actions">
          <button className="brutal-button primary" onClick={() => navigate('/#join')}>JOIN AS PARTNER</button>
          <a className="brutal-button" href="mailto:roger@rogexlaboratories.com?subject=Product%20inquiry%20%E2%80%94%20Knights%20Labs">
            EMAIL THE LAB
          </a>
        </div>
      </PageHero>

      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / PRODUCTS"
            title="SUITE COMPLETA"
            text="Cuatro productos, dos líneas (sistemas + señal) y un objetivo de lanzamiento: diciembre 2026."
          />
          <div className="suite-grid suite-grid-page">
            {PRODUCT_SUITE.map((product, index) => (
              <ProductCard product={product} navigate={navigate} index={index} key={product.id} />
            ))}
          </div>
        </section>

        <PrismaDownloadSection
          code="02 / PRISMA MODULES"
          title="DESCARGA PRISMA"
          text="Prisma 3 y Prisma 5: fichas de producto con botones de descarga públicos. Estado actual: no disponibles."
        />

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="03 / WHO IT'S FOR"
              title="TRES PERFILES, TRES CONTRATOS"
              text="El copy no vende milagros. Declara interfaces, artefactos y caminos de colaboración."
            />
            <div className="audience-table" data-reveal>
              <div className="audience-row audience-head">
                <span>AUDIENCE</span><span>PRIMARY SURFACE</span><span>WHAT YOU GET</span>
              </div>
              <div className="audience-row">
                <span>Developers</span>
                <span>rxOS Kernel · event APIs</span>
                <span>Código abierto, QEMU builds, contribución a drivers y runtime</span>
              </div>
              <div className="audience-row">
                <span>Researchers</span>
                <span>PRISMA 3 / 5</span>
                <span>Pipelines EEG, métricas con régimen, límites no clínicos</span>
              </div>
              <div className="audience-row">
                <span>OEM / Integrators</span>
                <span>Custom arch · royalty</span>
                <span>Integración en silicio neuromórfico y soporte de arquitectura</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="04 / PRICING LAYERS"
            title="REFERENCIA COMERCIAL 2026"
            text="Estructura pública de capas. Confirmación contractual al release."
          />
          <div className="license-grid">
            {LICENSE_TIERS.map((block, index) => (
              <article className="license-card" key={block.product} data-reveal style={{ '--delay': `${index * 70}ms` }}>
                <span className="panel-label">{block.product}</span>
                <table>
                  <tbody>
                    {block.rows.map(([name, price, note]) => (
                      <tr key={name}>
                        <th>{name}</th>
                        <td>{price}</td>
                        <td>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            ))}
          </div>
        </section>

        <CtaBand navigate={navigate} />
      </main>
    </>
  );
}

function Architecture({ navigate }) {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="ARCHITECTURE / EVENT-DRIVEN STACK"
        title={<>FROM RAW EEG<br />TO SPIKE TRAINS.</>}
        text="Diseño de referencia para PRISMA Core sobre rxOS: ring buffers lock-free, Delta Modulation asíncrona, SNN LIF con STDP y telemetría de eventos hacia un frontend liviano."
        image="/rxos/boot-banner.png"
      >
        <div className="hero-tags">
          <span>SPSC RINGS</span>
          <span>DELTA MOD</span>
          <span>LIF / STDP</span>
          <span>PREDICTIVE CODING</span>
          <span>TAURI + WEBGL</span>
        </div>
      </PageHero>

      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / STACK"
            title="CINCO CAPAS, UN CONTRATO DE DATOS"
            text="Cada capa reduce ambigüedad: samples → events → spikes → plasticity → UI. Sin GIL en el path crítico."
          />
          <div className="architecture full-architecture" data-reveal>
            {ARCH_STACK.map((item, index) => (
              <div className="architecture-layer" key={item.layer}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <code className="arch-detail">{item.detail}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="02 / DELTA MODULATION"
              title="SEÑAL CONTINUA → EVENTOS"
              text="Conversión asíncrona por umbral dinámico. No es sampling uniforme de spikes: es umbral adaptativo sobre el delta de voltaje."
            />
            <div className="formula-grid">
              <article className="formula-card" data-reveal>
                <span>01</span>
                <h3>ΔV(t)</h3>
                <code>ΔV(t) = V(t) − V(t_prev)</code>
                <p>Diferencia local entre muestras consecutivas en el canal.</p>
              </article>
              <article className="formula-card" data-reveal>
                <span>02</span>
                <h3>UP EVENT</h3>
                <code>ΔV(t) ≥ +θ_adp</code>
                <p>Disparo positivo cuando el incremento supera el umbral adaptativo.</p>
              </article>
              <article className="formula-card" data-reveal>
                <span>03</span>
                <h3>DOWN EVENT</h3>
                <code>ΔV(t) ≤ −θ_adp</code>
                <p>Disparo negativo simétrico; codifica flancos de descenso.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="03 / SNN ENGINE"
            title="PREDICTIVE CODING + STDP"
            text="Detección de anomalías por error de predicción de espigas en poblaciones LIF. Homeostasis sináptica local con firmas biológicas iniciales."
          />
          <div className="method-grid arch-method-grid">
            {[
              [Zap, 'SPIKE ERROR', 'El residual entre espigas predichas y observadas actúa como señal de anomalía — no como etiqueta clínica.'],
              [Network, 'STDP ONLINE', 'Plasticidad spike-timing-dependent continua; pesos locales sin batch global en el path en tiempo real.'],
              [Activity, 'LIF POPULATION', 'Neuronas integrate-and-fire con tau_m y θ₀ como firma biológica inicial configurable.'],
              [Leaf, 'FOOTPRINT', 'Objetivo de diseño: latencia sub-ms y memoria &lt;64 MB en el runtime crítico del kernel.'],
              [Radio, 'LSL INGEST', 'Adquisición en vivo 256–1000 Hz con buffers SPSC; offline vía EDF/BIDS en el mismo contrato de eventos.'],
              [Shield, 'BOUNDARIES', 'Software experimental. No diagnóstico, no lectura de pensamiento, no claims de consciencia.'],
            ].map(([Icon, title, text]) => (
              <article className="method-card" key={title} data-reveal>
                <Icon size={28} strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="04 / OPEN VS CLOSED"
              title="QUÉ SE ABRE Y QUÉ SE LICENCIA"
              text="Kernel neuromórfico open source. Desktop experience closed. PRISMA en capas Community → Pro → OEM."
            />
            <div className="open-closed-grid">
              <article data-reveal>
                <span className="panel-label">OPEN</span>
                <h3>NEUROMORPHIC KERNEL</h3>
                <ul className="check-list">
                  <li><CheckCircle size={18} /> Event fabric y runtime SNN de referencia</li>
                  <li><CheckCircle size={18} /> Especificaciones de ring buffer y delta mod</li>
                  <li><CheckCircle size={18} /> Builds de inspección y contribución</li>
                </ul>
              </article>
              <article data-reveal>
                <span className="panel-label">LICENSED</span>
                <h3>DESKTOP · PRO · OEM</h3>
                <ul className="check-list">
                  <li><CheckCircle size={18} /> rxOS Desktop Experience (closed)</li>
                  <li><CheckCircle size={18} /> PRISMA Pro / source commercial</li>
                  <li><CheckCircle size={18} /> Integración OEM + custom arch</li>
                </ul>
              </article>
            </div>
            <div className="hero-actions section-actions">
              <button className="brutal-button primary" onClick={() => navigate('/rx-os')}>
                RXos PUBLIC BUILD <ArrowUpRight size={15} />
              </button>
              <button className="brutal-button" onClick={() => navigate('/suite')}>
                LICENSE LAYERS
              </button>
            </div>
          </div>
        </section>

        <CtaBand navigate={navigate} />
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

function Prisma({ navigate }) {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return undefined;
    const el = document.getElementById(hash);
    if (el) {
      const timer = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  return (
    <>
      <PageHero
        index="03"
        eyebrow="PRISMA / EEG + NEUROMORPHIC"
        title={<>MEASURE THE SIGNAL.<br />MODEL THE PERSON.<br />SPIKE THE EVENT.</>}
        text="PRISMA 3.2 es software experimental de EEG reproducible. PRISMA 5 es el motor neuromórfico event-driven sobre rxOS. Ninguno es un dispositivo médico ni afirma leer pensamientos."
        image="/tutorial/prisma3/04_eeg_real.png"
      >
        <div className="hero-tags">
          <span>PYTHON 3.10+</span>
          <span>MNE</span>
          <span>SNN / LIF</span>
          <span>DELTA MOD</span>
          <span>BIDS / OPENNEURO</span>
        </div>
        <div className="hero-actions">
          <a className="brutal-button primary" href="#prisma-downloads">VER MÓDULOS</a>
          <a className="brutal-button" href="#prisma3">PRISMA 3</a>
          <a className="brutal-button" href="#prisma5">PRISMA 5</a>
        </div>
      </PageHero>

      <main>
        <PrismaDownloadSection
          code="01 / DOWNLOAD"
          title="PRISMA 3 · PRISMA 5"
          text="Dos módulos de la suite Knights Labs. Descripción técnica, características clave y descarga pública — pendiente de publicación."
        />

        <section className="section wrap">
          <SectionTitle
            code="02 / CURRENT"
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
                <li><CheckCircle size={18} /> CLI retrocompatible y Feature Registry con siete familias de características.</li>
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
              code="03 / EVIDENCE"
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
            code="04 / PRISMA 3.2"
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

        <section className="section section-black" id="prisma5-engine">
          <div className="wrap">
            <SectionTitle
              code="05 / PRISMA 5 ENGINE"
              title="NEUROMORPHIC ENGINE ON rxOS"
              text="De matrices de features a event streams. PRISMA 5 integra el core SNN con el kernel neuromórfico: delta modulation, predictive coding y STDP continuo."
            />
            <div className="prisma5-grid">
              <article className="prisma5-card" data-reveal>
                <span>EVENT ENCODING</span>
                <h3>DELTA MODULATION</h3>
                <p>Convierte MNE continuous samples en spike trains asíncronos UP/DOWN con umbral adaptativo θ_adp.</p>
              </article>
              <article className="prisma5-card" data-reveal>
                <span>ANOMALY PATH</span>
                <h3>PREDICTIVE CODING</h3>
                <p>Error de predicción de espigas en población LIF como señal de anomalía — experimental, no clínica.</p>
              </article>
              <article className="prisma5-card" data-reveal>
                <span>PLASTICITY</span>
                <h3>STDP + HOMEOSTASIS</h3>
                <p>Plasticidad local en tiempo real; tau_m y θ₀ como firma biológica inicial del sujeto/sistema.</p>
              </article>
              <article className="prisma5-card" data-reveal>
                <span>HARDWARE</span>
                <h3>AKIDA / LOIHI</h3>
                <p>Target de integración y benchmarking en silicio neuromórfico. Camino OEM con royalty + custom arch.</p>
              </article>
            </div>
            <div className="hero-actions section-actions">
              <button className="brutal-button primary" onClick={() => navigate('/architecture')}>
                SEE FULL STACK <ArrowUpRight size={15} />
              </button>
              <button className="brutal-button" onClick={() => navigate('/suite')}>
                PRISMA 5 LICENSE LAYERS
              </button>
              <a className="brutal-button" href="#prisma5">
                FICHA DE DESCARGA <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="06 / INTERFACE"
            title="CAPTURAS REALES DE PRISMA 3.2"
            text="Estas imágenes son capturas auténticas del software en desarrollo. No son renders ni mockups promocionales."
          />

          <div className="prisma-capture-grid">
            <figure className="screenshot scientific-capture" data-reveal>
              <img src="/tutorial/prisma3/04_feature_lab_complete.png" alt="Captura real de PRISMA 3.2 Feature Lab con forma de onda, PSD y vector de características" loading="lazy" />
              <figcaption className="capture-caption">
                <span>01</span>
                <div><strong>FEATURE LAB / REAL UI CAPTURE</strong><p>Forma de onda multicanal, densidad espectral de potencia y vector spectral-temporal. Demostración sintética no clínica.</p></div>
              </figcaption>
            </figure>

            <figure className="screenshot scientific-capture" data-reveal>
              <img src="/tutorial/prisma3/05_event_epoch_viewer.png" alt="Captura real del visor de eventos y épocas de PRISMA 3.2" loading="lazy" />
              <figcaption className="capture-caption">
                <span>02</span>
                <div><strong>EVENT &amp; EPOCH VIEWER / REAL UI CAPTURE</strong><p>Línea temporal de eventos, épocas válidas, baseline −200–0 ms y respuesta evocada promedio por clase.</p></div>
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
              code="07 / METHOD"
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

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="08 / ROADMAP"
              title="DE PRISMA 3.2 AL HARDWARE"
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
            code="09 / EXTRA / ARCHIVE"
            title="PRISMA 1 — VIDEO DEMONSTRATION"
            text="Material histórico. Este vídeo no representa PRISMA 3 ni PRISMA 5."
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
              <p>El vídeo documenta una versión temprana. PRISMA 3.2 continúa en desarrollo; el material público actual son capturas reales y teasers en Instagram y TikTok.</p>
              <a className="archive-video-link" href="https://youtu.be/3Jw7r_unoPg" target="_blank" rel="noreferrer">OPEN ON YOUTUBE <ArrowUpRight size={16} /></a>
            </aside>
          </div>
        </section>

        <CtaBand navigate={navigate} />
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
          ['Neuromorphic SNN', 'TODO'],
          ['Network transport', 'TODO'],
        ].map(([label, state]) => (
          <div key={label}><span>&gt; {label}</span><strong className={state === 'TODO' ? 'todo' : ''}>{state}</strong></div>
        ))}
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
    ['NEURO PATH', 'event fabric / SNN runtime (research)'],
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

function RXOS({ navigate }) {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="RX OS / DESKTOP + NEUROMORPHIC KERNEL"
        title={<>A LABORATORY<br />THAT BOOTS.<br />A KERNEL THAT SPIKES.</>}
        text="rxOS Desktop Experience es la superficie bare-metal closed-source. El Neuromorphic Kernel es la línea open source: event fabric, ring buffers y runtime SNN. El build público actual es un prototipo técnico, no un reemplazo de Linux."
        image="/rxos/boot-banner.png"
      >
        <div className="hero-tags">
          <span>NASM</span><span>C FREESTANDING</span><span>RUST NO_STD</span><span>QEMU</span><span>SNN ROADMAP</span>
        </div>
      </PageHero>

      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / TWO SURFACES"
            title="DESKTOP CLOSED · KERNEL OPEN"
            text="Misma base de ingeniería. Contratos de licencia distintos bajo Knights Labs."
          />
          <div className="edition-grid">
            <article className="edition-card" data-reveal>
              <span>01 / DESKTOP EXPERIENCE</span>
              <h3>CLOSED SOURCE.<br />BOOTABLE LAB.</h3>
              <p>Experiencia de escritorio x86-64 para investigación local: shell, RXFS, capturas reales en QEMU y superficie mínima verificable.</p>
              <div className="tag-row"><span>CLOSED</span><span>x86-64</span><span>PUBLIC TEST BUILD</span></div>
            </article>
            <article className="edition-card edition-dark" data-reveal>
              <span>02 / NEUROMORPHIC KERNEL</span>
              <h3>OPEN SOURCE.<br />EVENT-DRIVEN.</h3>
              <p>Kernel orientado a spikes, STDP y telemetría de eventos. Objetivo: latencia sub-ms y footprint &lt;64 MB en el path crítico.</p>
              <div className="tag-row"><span>OPEN</span><span>SNN</span><span>DEC 2026 TARGET</span></div>
              <button className="text-link" onClick={() => navigate('/architecture')} style={{ marginTop: 18 }}>
                READ ARCHITECTURE <ArrowUpRight size={15} />
              </button>
            </article>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="02 / FOUNDATION"
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
              code="03 / REAL CAPTURES"
              title="THE SYSTEM, RUNNING IN QEMU"
              text="Capturas de RXos v4.1.1 ejecutándose realmente. No son mockups."
            />
            <div className="screenshot-grid rxos-capture-grid">
              <figure className="screenshot scientific-capture featured" data-reveal>
                <img src="/rxos/boot-banner.png" alt="RXos v4.1.1 real boot banner and first-run pseudonym setup in QEMU" loading="lazy" />
                <figcaption className="capture-caption">
                  <span>REAL / 01</span>
                  <div><strong>VERIFIED BOOT + FIRST-RUN SETUP</strong><p>Cada OK se imprime después de comprobar la etapa correspondiente.</p></div>
                </figcaption>
              </figure>
              <figure className="screenshot scientific-capture" data-reveal>
                <img src="/rxos/desktop-home.png" alt="RXos v4.1.1 real clickable desktop home screen in QEMU" loading="lazy" />
                <figcaption className="capture-caption">
                  <span>REAL / 02</span>
                  <div><strong>CLICKABLE DESKTOP HOME</strong><p>Navegación lateral, tiles de sistema y rutas rgx:// del runtime actual.</p></div>
                </figcaption>
              </figure>
              <figure className="screenshot scientific-capture" data-reveal>
                <img src="/rxos/shell-status.png" alt="RXos v4.1.1 real terminal status view in QEMU" loading="lazy" />
                <figcaption className="capture-caption">
                  <span>REAL / 03</span>
                  <div><strong>STATUS VIEW: IMPLEMENTED / STUB / TODO</strong><p>La interfaz distingue subsistemas operativos de superficies reservadas.</p></div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section wrap rxos-download-section">
          <SectionTitle
            code="04 / PUBLIC TEST BUILD"
            title="DOWNLOAD RXos v4.1.1"
            text="Paquete oficial para pruebas locales. Incluye la ISO arrancable, README técnico y capturas reales. QEMU es la vía recomendada."
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
              <p>Instala QEMU, descomprime el paquete y arranca la ISO. La opción <code>-serial stdio</code> refleja el log de arranque.</p>
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
          <p className="download-boundary" data-reveal><AlertTriangle size={17} /> Experimental research build. Run it in a virtual machine first. Provided for inspection, education and reproducible testing, without warranty.</p>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="05 / ARCHITECTURE"
            title="DE BOOT.ASM AL PATH NEUROMÓRFICO"
            text="Pila actual del Desktop más la capa de investigación SNN."
          />
          <ArchitectureDiagram />
        </section>

        <section className="section rx-state-section">
          <div className="wrap">
            <SectionTitle
              code="06 / ENGINEERING STATUS"
              title="WHAT WORKS — AND WHAT DOES NOT"
              text="Separación explícita entre implementación verificada y roadmap."
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

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="07 / ROADMAP"
              title="LO QUE CONVIERTE UN PROTOTIPO EN SISTEMA"
              text="Prioridad: aislamiento, drivers, red y runtime neuromórfico — no efectos visuales."
            />
            <div className="rx-roadmap">
              {[
                ['01', 'HARDWARE', 'UEFI nativo, storage moderno, más dispositivos de entrada y backend gráfico más robusto.'],
                ['02', 'ISOLATION', 'Scheduler, procesos, syscalls, separación user/kernel y modelo de permisos.'],
                ['03', 'NETWORK', 'Driver NIC, transporte RXwired, resolución rgx:// remota y threat model actualizado.'],
                ['04', 'NEUROMORPHIC', 'Event fabric, delta mod, SNN LIF/STDP y telemetría de spikes en el kernel open.'],
                ['05', 'TRUST', 'Apps firmadas, actualización reproducible, auditoría criptográfica y cadena de build verificable.'],
                ['06', 'LAB RUNTIME', 'PRISMA 5 empaquetado como flujo reproducible sobre rxOS.'],
              ].map(([number, title, text]) => (
                <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <CtaBand navigate={navigate} />
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
    const subject = form.subject || `Contacto desde Knights Labs / Rogex — ${form.name || 'sin nombre'}`;
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

function About({ navigate }) {
  const projectGroups = useMemo(() => PROJECTS, []);
  return (
    <>
      <PageHero
        index="05"
        eyebrow="ABOUT / KNIGHTS LABS"
        title={<>BUILT BY HAND.<br />SHIPPED AS LAB.<br />OPEN WHERE IT MATTERS.</>}
        text="Knights Labs es el marco de producto de Rogex Laboratories: neurotecnología de bajo carbono, software EEG reproducible y un kernel neuromórfico abierto. Fundado por Roger Navarro."
        image="/about-workbench.svg"
      />

      <main>
        <section className="section wrap about-intro">
          <div className="about-profile" data-reveal>
            <span>FOUNDER / RESEARCH SOFTWARE DEVELOPER</span>
            <h2>ROGER NAVARRO</h2>
            <p>Desarrollador independiente centrado en EEG, procesamiento de señal, sistemas bare-metal, SNNs y herramientas defensivas. El objetivo no es aparentar una gran institución: es convertir trabajo real, documentación y colaboración en una institución con el tiempo.</p>
          </div>
          <div className="about-principles" data-reveal>
            <div><span>01</span><strong>BUILD</strong><p>Prototipos que arrancan, ejecutan y generan resultados inspeccionables.</p></div>
            <div><span>02</span><strong>MEASURE</strong><p>Métricas acompañadas por el régimen experimental y sus límites.</p></div>
            <div><span>03</span><strong>DOCUMENT</strong><p>Arquitectura, fallos, resultados negativos y roadmap públicos.</p></div>
            <div><span>04</span><strong>OPEN / LICENSE</strong><p>Kernel neuromórfico open; Pro y OEM financian acceso e investigación.</p></div>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="01 / SKILLS"
              title="TECHNICAL RANGE"
              text="Herramientas usadas en proyectos del laboratorio; no sustituye experiencia institucional ni certificaciones inexistentes."
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
            text="Proyectos de software en distintas capas del stack."
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
              text="Framework experimental de defensa, engaño y observabilidad. No se presenta como herramienta ofensiva."
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
                <p>Superficies señuelo, perfiles modulares, eventos y reportes para observar automatización hostil.</p>
                <div className="tag-row gaslight-video-tags"><span>PYTHON</span><span>LINUX</span><span>YAML</span><span>TELEMETRY</span><span>DEFENSIVE ONLY</span></div>
                <a className="archive-video-link" href="https://youtu.be/ToIAxNt07y0" target="_blank" rel="noreferrer">OPEN ON YOUTUBE <ArrowUpRight size={16} /></a>
              </aside>
            </div>
          </div>
        </section>

        <CtaBand navigate={navigate} />

        <section className="section contact-section" id="contact">
          <div className="wrap">
            <SectionTitle
              code="04 / CONTACT"
              title="WRITE TO THE LAB"
              text="Colaboración científica, revisión técnica, hardware OEM, trabajo, prensa o propuestas de proyecto."
            />
            <div className="contact-layout">
              <div className="contact-addresses" data-reveal>
                <a href="mailto:roger@rogexlaboratories.com">
                  <span>BUSINESS / OEM</span>
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
                  <p>Para investigación, incluye dataset, paradigma y objetivo de evaluación. Para OEM, hardware target y volumen. Para kernel, entorno y pasos de reproducción.</p>
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
          <button className="footer-wordmark" onClick={() => navigate('/')}>KNIGHTS<br />LABS</button>
          <p>Rogex Laboratories · low-carbon neurotech, EEG research software and neuromorphic systems.</p>
        </div>
        <div className="footer-nav">
          {NAV_ITEMS.map(([href, label]) => <button key={href} onClick={() => navigate(href)}>{label}</button>)}
        </div>
        <div className="footer-socials">
          {SOCIALS.map((item) => <SocialIcon item={item} key={item.label} />)}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 KNIGHTS LABS / ROGEX LABORATORIES. ALL RIGHTS RESERVED.</span>
        <span>PRISMA IS EXPERIMENTAL, NON-CLINICAL RESEARCH SOFTWARE. LAUNCH TARGET DEC 2026.</span>
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
      '/': 'Knights Labs — Rogex Laboratories',
      '/suite': 'Product Suite — Knights Labs',
      '/architecture': 'Architecture — Knights Labs',
      '/prisma': 'PRISMA 3.2 & 5 — Knights Labs',
      '/rx-os': 'rxOS Desktop & Kernel — Knights Labs',
      '/about': 'About — Knights Labs / Rogex',
    };
    document.title = titles[path] || 'Knights Labs';
  }, [path]);

  let page = <NotFound navigate={navigate} />;
  if (path === '/') page = <Home navigate={navigate} />;
  if (path === '/suite') page = <Suite navigate={navigate} />;
  if (path === '/architecture') page = <Architecture navigate={navigate} />;
  if (path === '/prisma') page = <Prisma navigate={navigate} />;
  if (path === '/rx-os' || path === '/rogexos') page = <RXOS navigate={navigate} />;
  if (path === '/about') page = <About navigate={navigate} />;

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
