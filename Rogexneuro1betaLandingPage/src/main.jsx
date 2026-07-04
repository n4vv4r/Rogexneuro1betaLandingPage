import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  Brain,
  ChartNoAxesColumnIncreasing,
  Cpu,
  Database,
  Download,
  FileText,
  GitBranch,
  Mail,
  Menu,
  Microscope,
  Radio,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  UserRound,
  Waves,
  X,
} from 'lucide-react';
import logo from './assets/rogex-logo-transparent.png';
import './styles.css';
import FolderCarousel from './components/FolderCarousel.jsx';

const routes = [
  'research',
  'prisma',
  'prisma3',
  'prisma4',
  'methods',
  'collaborations',
  'advances',
  'notes',
  'contact',
];

const themes = [
  { id: 'light', label: { es: 'Claro', en: 'Light' } },
  { id: 'dark', label: { es: 'Oscuro', en: 'Dark' } },
  { id: 'solarized', label: { es: 'Solarized', en: 'Solarized' } },
  { id: 'wiki', label: { es: 'Wikipedia', en: 'Wikipedia' } },
  { id: 'modern', label: { es: 'Moderno', en: 'Modern' } },
];

const copy = {
  es: {
    nav: {
      research: 'Investigación',
      prisma: 'PRISMA',
      prisma3: 'PRISMA 3',
      prisma4: 'PRISMA 4',
      methods: 'Métodos',
      collaborations: 'Colaboraciones',
      advances: 'Avances',
      notes: 'Notas',
      contact: 'Contacto',
    },
    ui: {
      language: 'EN',
      viewPrisma: 'Ver PRISMA 3',
      documentation: 'Leer método',
      follow: 'Seguir y conectar',
      openDocs: 'Abrir documentación pública',
      theme: 'Tema',
      markdownReader: 'Lector Markdown',
      rawMarkdown: 'Abrir .md crudo',
      loadingMarkdown: 'Cargando documento...',
      markdownError: 'No se pudo cargar este documento.',
    },
    home: {
      eyebrow: 'ROGEX LABORATORIES · PRISMA 3',
      title: 'Software EEG real, validación abierta y neurotecnología reproducible.',
      text: 'PRISMA 3 es un pipeline de investigación para importar EEG real, extraer features, construir baselines individuales y evaluar modelos con validación honesta entre sujetos.',
      secondary: 'La primera validación pública usa EEG real OpenNeuro DS007358: 28 sujetos, 3304 ventanas, tarea ojos cerrados vs ojos abiertos, y mejora de 71.5% a 84.2% al normalizar por usuario.',
    },
    research: {
      eyebrow: 'Investigación pública',
      title: 'De prototipo a laboratorio: resultados, límites y código explicable.',
      text: 'Rogex Laboratories presenta PRISMA 3 como software experimental de análisis EEG. La web documenta qué hace el sistema, cómo se evalúa y qué todavía no debe afirmarse.',
    },
    prisma: {
      eyebrow: 'PRISMA Core',
      title: 'Un pipeline para traducir EEG respecto al propio baseline del usuario.',
      text: 'El objetivo no es vender una caja negra. PRISMA estructura el flujo completo: señal, filtros, ventanas, features, baseline, traductor individual, machine learning, explicabilidad y exportación.',
    },
    methods: {
      eyebrow: 'Métodos',
      title: 'Evaluación honesta antes que promesas absolutas.',
      text: 'La confianza viene de usar LOSO, separar datos sintéticos de EEG real, mostrar matrices de confusión, reportar límites y publicar el razonamiento técnico detrás de cada resultado.',
    },
    collaborations: {
      eyebrow: 'Colaboraciones',
      title: 'Abierto a revisión académica, datasets reales y test-retest.',
      text: 'La siguiente fase es ampliar sujetos, repetir sesiones, controlar artefactos con métodos estándar y comparar contra baselines publicados.',
    },
    notes: {
      eyebrow: 'Notas técnicas',
      title: 'Documentación pública de PRISMA 3.',
      text: 'Guías para leer los resultados, conectar EEG real, entender la variabilidad interindividual y revisar límites científicos.',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Rogex Laboratories está abierto a feedback técnico y colaboración.',
      text: 'Buscamos construir herramientas EEG útiles para investigación, con rigor y sin afirmaciones clínicas no validadas.',
      email: 'Email',
    },
    footer: 'Rogex Laboratories desarrolla software experimental para análisis EEG, neuroinformación y validación reproducible. No es dispositivo médico ni herramienta diagnóstica.',
  },
  en: {
    nav: {
      research: 'Research',
      prisma: 'PRISMA',
      prisma3: 'PRISMA 3',
      prisma4: 'PRISMA 4',
      methods: 'Methods',
      collaborations: 'Collaborations',
      advances: 'Progress',
      notes: 'Notes',
      contact: 'Contact',
    },
    ui: {
      language: 'ES',
      viewPrisma: 'View PRISMA 3',
      documentation: 'Read methods',
      follow: 'Follow & connect',
      openDocs: 'Open public documentation',
      theme: 'Theme',
      markdownReader: 'Markdown reader',
      rawMarkdown: 'Open raw .md',
      loadingMarkdown: 'Loading document...',
      markdownError: 'Could not load this document.',
    },
    home: {
      eyebrow: 'ROGEX LABORATORIES · PRISMA 3',
      title: 'Real EEG software, open validation and reproducible neurotechnology.',
      text: 'PRISMA 3 is a research pipeline for importing real EEG, extracting features, building individual baselines and evaluating models with honest cross-subject validation.',
      secondary: 'The first public validation uses real OpenNeuro DS007358 EEG: 28 subjects, 3304 windows, eyes-closed vs eyes-open task, and an improvement from 71.5% to 84.2% with user normalization.',
    },
    research: {
      eyebrow: 'Public research',
      title: 'From prototype to lab: results, limits and explainable code.',
      text: 'Rogex Laboratories presents PRISMA 3 as experimental EEG analysis software. This site documents what the system does, how it is evaluated and what should not be claimed yet.',
    },
    prisma: {
      eyebrow: 'PRISMA Core',
      title: 'A pipeline for translating EEG relative to the user’s own baseline.',
      text: 'The goal is not to sell a black box. PRISMA structures the full workflow: signal, filters, windows, features, baseline, individual translator, machine learning, explainability and export.',
    },
    methods: {
      eyebrow: 'Methods',
      title: 'Honest evaluation before absolute promises.',
      text: 'Trust comes from using LOSO, separating synthetic data from real EEG, showing confusion matrices, reporting limits and publishing the technical reasoning behind each result.',
    },
    collaborations: {
      eyebrow: 'Collaborations',
      title: 'Open to academic review, real datasets and test-retest work.',
      text: 'The next phase is to scale subjects, repeat sessions, control artifacts with standard methods and compare against published baselines.',
    },
    notes: {
      eyebrow: 'Technical notes',
      title: 'Public PRISMA 3 documentation.',
      text: 'Guides for reading results, connecting real EEG, understanding inter-individual variability and reviewing scientific limits.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Rogex Laboratories is open to technical feedback and collaboration.',
      text: 'We aim to build EEG tools useful for research, with rigor and without unvalidated clinical claims.',
      email: 'Email',
    },
    footer: 'Rogex Laboratories develops experimental software for EEG analysis, neuroinformation and reproducible validation. Not a medical device or diagnostic tool.',
  },
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/n4vv4r', icon: 'https://img.icons8.com/ios-glyphs/30/github.png' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rogexlabs/', icon: 'https://img.icons8.com/ios-filled/50/linkedin.png' },
  { label: 'X', href: 'https://x.com/rogexlabs', icon: 'https://img.icons8.com/ios-filled/50/twitterx.png' },
  { label: 'Instagram', href: 'https://instagram.com/rogexlaboratories', icon: 'https://img.icons8.com/ios-filled/50/instagram-new.png' },
  { label: 'Linktree', href: 'https://linktr.ee/rogynavy', icon: 'https://img.icons8.com/ios-filled/50/linktree.png' },
];

const docsMeta = [
  { slug: 'prisma3-real-eeg-validation', file: '/research/prisma3-real-eeg-validation.md', label: { es: 'Validación EEG real', en: 'Real EEG validation' } },
  { slug: 'prisma3-model-report', file: '/research/prisma3-model-report.md', label: { es: 'Reporte del modelo', en: 'Model report' } },
  { slug: 'prisma3-how-it-works', file: '/research/prisma3-how-it-works.md', label: { es: 'Cómo funciona', en: 'How it works' } },
  { slug: 'prisma3-connect-eeg', file: '/research/prisma3-connect-eeg.md', label: { es: 'Conectar EEG real', en: 'Connect real EEG' } },
  { slug: 'prisma3-how-to-read', file: '/research/prisma3-how-to-read.md', label: { es: 'Cómo leer resultados', en: 'How to read results' } },
  { slug: 'prisma3-interindividual-variability-report', file: '/research/prisma3-interindividual-variability-report.md', label: { es: 'Variabilidad interindividual', en: 'Inter-individual variability' } },
  { slug: 'prisma3-scientific-limits', file: '/research/prisma3-scientific-limits.md', label: { es: 'Límites científicos', en: 'Scientific limits' } },
];

const publicDocs = {
  es: docsMeta.map((doc) => [doc.label.es, `/docs/${doc.slug}`, doc.file]),
  en: docsMeta.map((doc) => [doc.label.en, `/docs/${doc.slug}`, doc.file]),
};

function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (href) => {
    window.history.pushState({}, '', href);
    setPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [path, navigate];
}

function InternalLink({ href, navigate, children, className, onNavigate }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}

function BlendCarousel(props) {
  return <FolderCarousel {...props} />;
}

function Header({ lang, setLang, theme, setTheme, navigate, t }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth > 1080) closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${menuOpen ? 'menu-is-open' : ''}`}>
      <InternalLink href="/" navigate={navigate} className="brand" onNavigate={closeMenu}>
        <img src={logo} alt="Rogex Laboratories" />
        <span>ROGEX LABORATORIES</span>
      </InternalLink>

      <nav id="site-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        {routes.map((route) => (
          <InternalLink key={route} href={`/${route}`} navigate={navigate} onNavigate={closeMenu}>
            {t.nav[route]}
          </InternalLink>
        ))}
      </nav>

      <div className="header-controls">
        <label className="theme-control">
          <span>{t.ui.theme}</span>
          <select value={theme} onChange={(event) => setTheme(event.target.value)} aria-label={t.ui.theme}>
            {themes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label[lang]}
              </option>
            ))}
          </select>
        </label>
        <button className="lang-button" onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
          {t.ui.language}
        </button>
      </div>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}

function PageHero({ eyebrow, title, text, children, visualKey = 'home' }) {
  return (
    <section className="page-hero split-visual-hero">
      <div className="split-visual-copy">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>

      <BlendCarousel setName={visualKey} label={`${title} visual carousel`} />
    </section>
  );
}

function MetricCard({ label, value, note }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

function ResultTable({ rows }) {
  return (
    <div className="results-table">
      {rows.map(([model, value, note]) => (
        <div className="results-row" key={model}>
          <strong>{model}</strong>
          <span>{value}</span>
          <p>{note}</p>
        </div>
      ))}
    </div>
  );
}

function FigureCard({ src, title, caption }) {
  return (
    <figure className="figure-card">
      <img src={src} alt={title} loading="lazy" />
      <figcaption>
        <strong>{title}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

function Home({ t, navigate, lang }) {
  const es = lang === 'es';
  const metrics = es
    ? [
        ['EEG real', '28 sujetos', 'OpenNeuro DS007358, tarea ec vs eo.'],
        ['Ventanas', '3304', 'Segmentos EEG evaluados en validación.'],
        ['LOSO normalizado', '84.2%', 'Generalización a sujetos nuevos.'],
        ['Mejora', '+12.7 pts', 'Frente a features crudas entre sujetos.'],
      ]
    : [
        ['Real EEG', '28 subjects', 'OpenNeuro DS007358, ec vs eo task.'],
        ['Windows', '3304', 'EEG segments evaluated in validation.'],
        ['Normalized LOSO', '84.2%', 'Generalization to unseen subjects.'],
        ['Improvement', '+12.7 pts', 'Versus raw cross-subject features.'],
      ];

  return (
    <>
      <section className="hero split-visual-hero">
        <div className="hero-copy split-visual-copy">
          <span>{t.home.eyebrow}</span>
          <h1>{t.home.title}</h1>
          <p>{t.home.text}</p>
          <p className="muted">{t.home.secondary}</p>

          <div className="hero-actions">
            <InternalLink href="/prisma3" navigate={navigate} className="button">
              {t.ui.viewPrisma} <ArrowRight size={16} />
            </InternalLink>
            <InternalLink href="/methods" navigate={navigate} className="button button-outline">
              {t.ui.documentation}
            </InternalLink>
          </div>
        </div>

        <BlendCarousel setName="home" label="Rogex Laboratories carousel" />
      </section>

      <section className="metric-grid home-metrics">
        {metrics.map(([label, value, note]) => (
          <MetricCard key={label} label={label} value={value} note={note} />
        ))}
      </section>

      <section className="route-grid">
        {routes.map((route, index) => (
          <InternalLink key={route} href={`/${route}`} navigate={navigate} className="route-card">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{t.nav[route]}</h2>
          </InternalLink>
        ))}
      </section>
    </>
  );
}

function ResearchPage({ t, lang }) {
  const es = lang === 'es';
  const blocks = es
    ? [
        ['Qué se presenta', 'PRISMA 3 como software experimental que ya procesa EEG real y genera reportes técnicos reproducibles.'],
        ['Qué se validó', 'Un contraste EEG robusto: ojos cerrados vs ojos abiertos, evaluado con Leave-One-Subject-Out entre sujetos.'],
        ['Qué no se afirma', 'No es diagnóstico, no mide salud mental, no promete estados clínicos ni reemplaza EEG clínico.'],
        ['Qué sigue', 'Más sujetos, intervalos de confianza, precisión por sujeto, ICA, test-retest y validación con hardware en vivo.'],
      ]
    : [
        ['What is presented', 'PRISMA 3 as experimental software that already processes real EEG and generates reproducible technical reports.'],
        ['What was validated', 'A robust EEG contrast: eyes closed vs eyes open, evaluated with Leave-One-Subject-Out across subjects.'],
        ['What is not claimed', 'No diagnosis, no mental health measurement, no clinical state claims and no replacement for clinical EEG.'],
        ['Next step', 'More subjects, confidence intervals, per-subject precision, ICA, test-retest and live hardware validation.'],
      ];

  return (
    <>
      <PageHero {...t.research} visualKey="research" />
      <section className="content-grid">
        {blocks.map(([title, text]) => (
          <article className="info-card" key={title}>
            <Microscope size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function PrismaPage({ t, lang }) {
  const es = lang === 'es';
  const workflow = es
    ? [
        ['01', 'Señal', 'EEG real importado o señal simulada con estados, artefactos e IAF individual.', Database],
        ['02', 'Preprocesado', 'Paso-banda 0.5–45 Hz, notch 50/60 Hz, referencia y control de ruido.', SlidersHorizontal],
        ['03', 'Ventanas y features', 'Ventanas de 2 s, bandpower, ratios, entropía, Hjorth, RMS, SQI y asimetría alfa.', ChartNoAxesColumnIncreasing],
        ['04', 'Baseline personal', 'Z-score intrasujeto, percentiles propios y desviación respecto a uno mismo.', UserRound],
        ['05', 'Modelo y reporte', 'LOSO, modelos personalizados, figuras, reports Markdown y salidas exportables.', Download],
      ]
    : [
        ['01', 'Signal', 'Real imported EEG or simulated signal with states, artifacts and individual IAF.', Database],
        ['02', 'Preprocessing', '0.5–45 Hz band-pass, 50/60 Hz notch, reference and noise control.', SlidersHorizontal],
        ['03', 'Windows & features', '2 s windows, bandpower, ratios, entropy, Hjorth, RMS, SQI and alpha asymmetry.', ChartNoAxesColumnIncreasing],
        ['04', 'Personal baseline', 'Within-subject z-score, personal percentiles and deviation from self.', UserRound],
        ['05', 'Model & report', 'LOSO, personalized models, figures, Markdown reports and exportable outputs.', Download],
      ];

  return (
    <>
      <PageHero {...t.prisma} visualKey="prisma" />
      <section className="workflow">
        {workflow.map(([number, title, text, Icon]) => (
          <article className="workflow-step" key={number}>
            <span>{number}</span>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function MethodsPage({ t, lang }) {
  const es = lang === 'es';
  const items = es
    ? [
        ['LOSO entre sujetos', 'Se entrena dejando fuera un sujeto y se prueba en esa persona. Reduce fuga por identidad.', ShieldCheck],
        ['Normalización intrasujeto', 'La señal se interpreta respecto al propio baseline del usuario, no con umbrales universales.', UserRound],
        ['Separación de evidencia', 'Resultados sintéticos y resultados de EEG real se publican por separado para no sobreinterpretar.', FileText],
        ['Límites visibles', 'Se declara qué falta: ICA, N mayor, intervalos de confianza y validación live.', TriangleAlert],
      ]
    : [
        ['Cross-subject LOSO', 'Train by leaving one subject out and test on that person. Reduces identity leakage.', ShieldCheck],
        ['Within-subject normalization', 'Signal is interpreted relative to the user’s own baseline, not universal thresholds.', UserRound],
        ['Separated evidence', 'Synthetic and real EEG results are published separately to avoid overinterpretation.', FileText],
        ['Visible limits', 'Missing pieces are stated: ICA, larger N, confidence intervals and live validation.', TriangleAlert],
      ];

  return (
    <>
      <PageHero {...t.methods} visualKey="methods" />
      <section className="content-grid">
        {items.map(([title, text, Icon]) => (
          <article className="info-card" key={title}>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function CollaborationsPage({ t, lang }) {
  const es = lang === 'es';
  const items = es
    ? [
        ['Validación externa', 'Buscamos revisión de pipelines, decisiones de preprocesado y métricas de evaluación.'],
        ['Datasets reales', 'OpenNeuro, EEG-Dash, BIDS locales y futuros registros con hardware Muse/OpenBCI.'],
        ['Investigación aplicada', 'Interés en resting-state, variabilidad interindividual, alfa occipital y test-retest entre días.'],
      ]
    : [
        ['External validation', 'We welcome review of pipelines, preprocessing decisions and evaluation metrics.'],
        ['Real datasets', 'OpenNeuro, EEG-Dash, local BIDS and future recordings with Muse/OpenBCI hardware.'],
        ['Applied research', 'Interest in resting-state, inter-individual variability, occipital alpha and day-to-day test-retest.'],
      ];

  return (
    <>
      <PageHero {...t.collaborations} visualKey="collaborations" />
      <section className="content-grid">
        {items.map(([title, text]) => (
          <article className="info-card" key={title}>
            <GitBranch size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function AdvancesPage({ lang }) {
  const es = lang === 'es';
  const status = es
    ? [
        ['Implementado', 'Simulador EEG, features, baseline_engine, individual_translator, ML, reports, figuras y app Streamlit.'],
        ['Validado en demo', '5 estados sintéticos: 76.7% crudo LOSO, 94.4% normalizado LOSO, 96.1% personalizado.'],
        ['Validado en EEG real', 'DS007358 ec/eo: 84.2% LOSO normalizado y matriz de confusión equilibrada 84/16.'],
        ['Siguiente hito', 'PRISMA 4: datos en vivo, hardware real, control de artefactos y baseline dinámico.'],
      ]
    : [
        ['Implemented', 'EEG simulator, features, baseline_engine, individual_translator, ML, reports, figures and Streamlit app.'],
        ['Validated in demo', '5 synthetic states: 76.7% raw LOSO, 94.4% normalized LOSO, 96.1% personalized.'],
        ['Validated on real EEG', 'DS007358 ec/eo: 84.2% normalized LOSO and balanced 84/16 confusion matrix.'],
        ['Next milestone', 'PRISMA 4: live data, real hardware, artifact control and dynamic baseline.'],
      ];

  return (
    <>
      <PageHero
        eyebrow={es ? 'Avances de investigación' : 'Research progress'}
        title={es ? 'PRISMA 3 ya tiene resultados públicos sobre EEG real.' : 'PRISMA 3 now has public results on real EEG.'}
        text={es ? 'Un log de empresa: qué existe, qué se validó, qué falta y hacia dónde evoluciona Rogex Laboratories.' : 'A company-style log: what exists, what was validated, what remains and where Rogex Laboratories is going.'}
        visualKey="advances"
      />

      <section className="content-grid">
        {status.map(([title, text]) => (
          <article className="info-card" key={title}>
            <Activity size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

const prisma3Data = {
  es: {
    eyebrow: 'Public release / Rogex Laboratories',
    title: 'PRISMA 3: traductor neuroinformacional individual con validación en EEG real.',
    subtitle: 'No es un producto fantasma: es un pipeline ejecutable, con módulos técnicos, reportes públicos y una primera validación supervisada sobre EEG real.',
    abstract: 'PRISMA 3 estudia una hipótesis concreta: el EEG debe interpretarse respecto a la línea base de cada persona. El sistema importa señal real o simulada, filtra, segmenta, extrae features, construye baselines personales, normaliza intra-sujeto y evalúa modelos con LOSO o CV personalizado.',
    thesis: 'La variabilidad interindividual no se trata como ruido que esconder. PRISMA 3 la modela: aprende el patrón propio de cada usuario y traduce cada lectura como desviación respecto a ese baseline.',
    realResults: [
      ['Global crudo LOSO', '71.5%', 'Features sin normalización; generalización limitada entre sujetos.'],
      ['Global normalizado LOSO', '84.2%', 'Mejora principal: +12.7 puntos al normalizar por usuario.'],
      ['Personalizado intra-CV', '91.4%', 'Régimen más fácil; útil como techo personalizado, no como LOSO.'],
    ],
    syntheticResults: [
      ['Global crudo LOSO', '76.7%', 'Cinco estados sintéticos; línea base entre sujetos.'],
      ['Global normalizado LOSO', '94.4%', 'La normalización intrasujeto reduce variabilidad.'],
      ['Personalizado intra-CV', '96.1%', 'Prioridad del modelo personal en la demo.'],
    ],
  },
  en: {
    eyebrow: 'Public release / Rogex Laboratories',
    title: 'PRISMA 3: individual neuroinformational translator validated on real EEG.',
    subtitle: 'Not a phantom product: an executable pipeline with technical modules, public reports and a first supervised validation on real EEG.',
    abstract: 'PRISMA 3 studies one concrete hypothesis: EEG should be interpreted relative to each person’s own baseline. The system imports real or simulated signal, filters, windows, extracts features, builds personal baselines, normalizes within subject and evaluates models with LOSO or personalized CV.',
    thesis: 'Inter-individual variability is not hidden as noise. PRISMA 3 models it: it learns each user’s own pattern and translates every reading as a deviation from that baseline.',
    realResults: [
      ['Raw global LOSO', '71.5%', 'Unnormalized features; limited cross-subject generalization.'],
      ['Normalized global LOSO', '84.2%', 'Main improvement: +12.7 points with user normalization.'],
      ['Personalized intra-CV', '91.4%', 'Easier regime; useful as a personalized ceiling, not LOSO.'],
    ],
    syntheticResults: [
      ['Raw global LOSO', '76.7%', 'Five synthetic states; cross-subject baseline.'],
      ['User-normalized LOSO', '94.4%', 'Within-subject normalization reduces variability.'],
      ['Personalized intra-CV', '96.1%', 'Personal model priority in the demo.'],
    ],
  },
};

const prisma4Data = {
  es: {
    eyebrow: 'Roadmap / Rogex Laboratories',
    title: 'PRISMA 4: de validación offline a neurotecnología en vivo.',
    subtitle: 'PRISMA 3 demuestra el método en datos reales. PRISMA 4 debe demostrar estabilidad, adaptación y uso con hardware real.',
    abstract: 'PRISMA 4 es la evolución natural: baseline dinámico, test-retest entre días, control avanzado de artefactos, streaming LSL con Muse/OpenBCI y evaluación de drift fisiológico. El objetivo es pasar de validar ventanas offline a interpretar señal real en tiempo casi real.',
    thesis: 'PRISMA 3 aprende el idioma neurofisiológico individual. PRISMA 4 debe aprender cómo ese idioma cambia con el tiempo, el cuerpo, el contexto y la calidad de señal.',
    formula: 'Sp = Tb(Is, A, E, Mp, T)',
    modules: [
      ['dynamic_baseline.py', 'Actualización de baselines con reglas de confianza y ventanas de estabilidad.'],
      ['session_drift.py', 'Medición de cambios entre sesiones, días y condiciones de electrodos.'],
      ['artifact_control.py', 'ICA/MNE, SQI, parpadeo, músculo, drift y rechazo de ventanas.'],
      ['lsl_live_stream.py', 'Entrada Muse/OpenBCI vía Lab Streaming Layer para señal real.'],
      ['test_retest_eval.py', 'Evaluación de estabilidad del mismo usuario en días distintos.'],
      ['public_reporter.py', 'Reportes reproducibles con tablas, figuras, límites e incertidumbre.'],
    ],
  },
  en: {
    eyebrow: 'Roadmap / Rogex Laboratories',
    title: 'PRISMA 4: from offline validation to live neurotechnology.',
    subtitle: 'PRISMA 3 demonstrates the method on real data. PRISMA 4 must demonstrate stability, adaptation and real hardware use.',
    abstract: 'PRISMA 4 is the natural evolution: dynamic baseline, day-to-day test-retest, advanced artifact control, LSL streaming with Muse/OpenBCI and physiological drift evaluation. The goal is moving from offline window validation to near-real-time signal interpretation.',
    thesis: 'PRISMA 3 learns the individual neurophysiological language. PRISMA 4 must learn how that language changes with time, body state, context and signal quality.',
    formula: 'Sp = Tb(Is, A, E, Mp, T)',
    modules: [
      ['dynamic_baseline.py', 'Baseline updates with confidence rules and stability windows.'],
      ['session_drift.py', 'Measures changes across sessions, days and electrode conditions.'],
      ['artifact_control.py', 'ICA/MNE, SQI, blink, muscle, drift and window rejection.'],
      ['lsl_live_stream.py', 'Muse/OpenBCI input through Lab Streaming Layer for real signal.'],
      ['test_retest_eval.py', 'Stability evaluation for the same user across different days.'],
      ['public_reporter.py', 'Reproducible reports with tables, figures, limits and uncertainty.'],
    ],
  },
};

function Prisma3Article({ lang, navigate }) {
  const data = prisma3Data[lang];
  const es = lang === 'es';
  const metrics = es
    ? [
        ['Dataset', 'DS007358', 'OpenNeuro resting-state, India + Tanzania.'],
        ['Sujetos usados', '28', 'Montajes EEG con canales occipitales disponibles.'],
        ['Ventanas', '3304', 'Ventanas supervisadas para ec vs eo.'],
        ['Azar', '50%', 'Clasificación binaria ojos cerrados / ojos abiertos.'],
      ]
    : [
        ['Dataset', 'DS007358', 'OpenNeuro resting-state, India + Tanzania.'],
        ['Subjects used', '28', 'EEG montages with available occipital channels.'],
        ['Windows', '3304', 'Supervised windows for ec vs eo.'],
        ['Chance', '50%', 'Binary eyes-closed / eyes-open classification.'],
      ];

  const pipeline = es
    ? [
        ['Señal', 'CSV, MNE EDF/SET/BDF/VHDR/FIF, BIDS/OpenNeuro o LSL para Muse/OpenBCI.'],
        ['Preprocesado', 'Referencia promedio común, band-pass, notch de red y selección de canales 10-20.'],
        ['Features', 'Bandpower absoluto/relativo, ratios theta/alpha y beta/alpha, entropía, Hjorth, RMS, varianza, SQI y asimetría alfa.'],
        ['Baseline', 'Media, desviación y percentiles por usuario/estado; z-score contra uno mismo.'],
        ['Traductor individual', 'Umbrales adaptativos, confianza, incertidumbre, drift y explicación relativa al baseline.'],
        ['ML', 'LogReg, RandomForest, GradientBoosting, LOSO, CV intra-sujeto, PCA/KMeans e IsolationForest.'],
      ]
    : [
        ['Signal', 'CSV, MNE EDF/SET/BDF/VHDR/FIF, BIDS/OpenNeuro or LSL for Muse/OpenBCI.'],
        ['Preprocessing', 'Common average reference, band-pass, line notch and 10-20 channel selection.'],
        ['Features', 'Absolute/relative bandpower, theta/alpha and beta/alpha ratios, entropy, Hjorth, RMS, variance, SQI and alpha asymmetry.'],
        ['Baseline', 'Mean, deviation and percentiles by user/state; z-score against self.'],
        ['Individual translator', 'Adaptive thresholds, confidence, uncertainty, drift and baseline-relative explanation.'],
        ['ML', 'LogReg, RandomForest, GradientBoosting, LOSO, intra-subject CV, PCA/KMeans and IsolationForest.'],
      ];

  const modules = [
    'src/core/eeg_simulator.py',
    'src/core/feature_extraction.py',
    'src/core/baseline_engine.py',
    'src/core/individual_translator.py',
    'src/utils/io.py',
    'src/utils/lsl_stream.py',
    'src/ml/evaluate.py',
    'analyze_bids.py',
    'analyze_eo_ec.py',
    'outputs/reports/*.md',
  ];

  return (
    <>
      <PageHero eyebrow={data.eyebrow} title={data.title} text={data.subtitle} visualKey="prisma3" />

      <article className="prisma3-article">
        <section className="prisma3-paper-section">
          <div className="section-kicker">{es ? 'Resumen ejecutivo' : 'Executive summary'}</div>
          <p className="paper-lead">{data.abstract}</p>
        </section>

        <section className="prisma3-paper-section prisma3-thesis">
          <h2>{es ? 'Tesis central' : 'Central thesis'}</h2>
          <p>{data.thesis}</p>
        </section>

        <section className="prisma3-paper-section highlight-section">
          <div>
            <div className="section-kicker">{es ? 'Validación EEG real' : 'Real EEG validation'}</div>
            <h2>{es ? 'Ojos cerrados vs ojos abiertos: primera prueba pública con datos reales.' : 'Eyes closed vs eyes open: first public test with real data.'}</h2>
            <p className="paper-lead">
              {es
                ? 'El objetivo era empezar por un contraste fisiológico robusto: bloqueo alfa occipital. PRISMA 3 no intenta vender estados clínicos; demuestra que el pipeline real funciona y que la normalización individual mejora la generalización.'
                : 'The goal was to start with a robust physiological contrast: occipital alpha blocking. PRISMA 3 does not sell clinical states; it shows that the real pipeline works and that individual normalization improves generalization.'}
            </p>
          </div>
          <div className="metric-grid compact">
            {metrics.map(([label, value, note]) => (
              <MetricCard key={label} label={label} value={value} note={note} />
            ))}
          </div>
        </section>

        <section className="prisma3-paper-section">
          <h2>{es ? 'Resultados supervisados sobre EEG real' : 'Supervised results on real EEG'}</h2>
          <ResultTable rows={data.realResults} />
          <p className="technical-note">
            {es
              ? 'Comprobación fisiológica: rel_alpha occipital ec=0.338 vs eo=0.083. El alfa aumenta con ojos cerrados, como se espera.'
              : 'Physiological check: occipital rel_alpha ec=0.338 vs eo=0.083. Alpha increases with eyes closed, as expected.'}
          </p>
        </section>

        <section className="prisma3-paper-section">
          <h2>{es ? 'Figuras de validación' : 'Validation figures'}</h2>
          <div className="figure-grid two">
            <FigureCard
              src="/prisma3/eo_ec_accuracy.png"
              title={es ? 'Accuracy ec vs eo' : 'ec vs eo accuracy'}
              caption={es ? 'Crudo LOSO, normalizado LOSO y personalizado intra-CV.' : 'Raw LOSO, normalized LOSO and personalized intra-CV.'}
            />
            <FigureCard
              src="/prisma3/eo_ec_confusion.png"
              title={es ? 'Matriz de confusión normalizada' : 'Normalized confusion matrix'}
              caption={es ? '84/16 para ambas clases: rendimiento equilibrado.' : '84/16 for both classes: balanced performance.'}
            />
          </div>
        </section>

        <section className="prisma3-paper-section">
          <div className="section-kicker">{es ? 'Pipeline técnico' : 'Technical pipeline'}</div>
          <h2>{es ? 'Qué hace PRISMA 3 por dentro' : 'What PRISMA 3 does internally'}</h2>
          <div className="technical-grid">
            {pipeline.map(([title, text], index) => (
              <article className="technical-card" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="prisma3-paper-section split-panel">
          <div>
            <div className="section-kicker">{es ? 'Repositorio' : 'Repository'}</div>
            <h2>{es ? 'Arquitectura real, no landing fantasma.' : 'Real architecture, not a phantom landing page.'}</h2>
            <p>
              {es
                ? 'El ZIP de PRISMA 3 incluye scripts de entrenamiento, evaluación, validación con BIDS/OpenNeuro, app Streamlit, tests y reportes exportados.'
                : 'The PRISMA 3 zip includes training scripts, evaluation, BIDS/OpenNeuro validation, Streamlit app, tests and exported reports.'}
            </p>
          </div>
          <div className="code-list">
            {modules.map((name) => (
              <code key={name}>{name}</code>
            ))}
          </div>
        </section>

        <section className="prisma3-paper-section">
          <h2>{es ? 'Demo sintética: variabilidad interindividual controlada' : 'Synthetic demo: controlled inter-individual variability'}</h2>
          <p className="paper-lead">
            {es
              ? 'La demo sintética no se mezcla con el resultado real. Sirve para comprobar ingeniería, separación de clases y efecto de normalización antes de pasar a EEG humano.'
              : 'The synthetic demo is not mixed with the real result. It checks engineering, class separation and the normalization effect before moving to human EEG.'}
          </p>
          <ResultTable rows={data.syntheticResults} />
          <div className="figure-grid three">
            <FigureCard
              src="/prisma3/user_variability_comparison.png"
              title={es ? 'Variabilidad por usuario' : 'User variability'}
              caption={es ? 'Misma etiqueta, perfiles espectrales distintos.' : 'Same label, different spectral profiles.'}
            />
            <FigureCard
              src="/prisma3/confusion_matrix.png"
              title={es ? 'Matriz demo 5 estados' : '5-state demo matrix'}
              caption={es ? 'Clasificación sintética multiclase.' : 'Synthetic multi-class classification.'}
            />
            <FigureCard
              src="/prisma3/personal_clusters.png"
              title={es ? 'Clusters personales' : 'Personal clusters'}
              caption={es ? 'PCA/KMeans para estructura individual.' : 'PCA/KMeans for individual structure.'}
            />
          </div>
        </section>

        <section className="prisma3-paper-section content-grid">
          <article className="info-card">
            <Radio size={24} />
            <h3>{es ? 'Entrada real' : 'Real input'}</h3>
            <p>{es ? 'CSV, EDF, SET, BDF, VHDR, FIF, OpenNeuro/BIDS y futuro LSL para Muse/OpenBCI.' : 'CSV, EDF, SET, BDF, VHDR, FIF, OpenNeuro/BIDS and future LSL for Muse/OpenBCI.'}</p>
          </article>
          <article className="info-card">
            <Cpu size={24} />
            <h3>{es ? 'ML revisable' : 'Reviewable ML'}</h3>
            <p>{es ? 'Evaluación LOSO, modelos globales y personalizados, comparación contra azar y reportes Markdown.' : 'LOSO evaluation, global and personalized models, chance comparison and Markdown reports.'}</p>
          </article>
          <article className="info-card">
            <Brain size={24} />
            <h3>{es ? 'Explicabilidad' : 'Explainability'}</h3>
            <p>{es ? 'La salida se expresa con confianza, incertidumbre y desviación respecto al baseline del usuario.' : 'Outputs are expressed with confidence, uncertainty and deviation from the user baseline.'}</p>
          </article>
        </section>

        <section className="prisma3-paper-section docs-panel">
          <div>
            <div className="section-kicker">{es ? 'Documentación pública' : 'Public documentation'}</div>
            <h2>{es ? 'Leer los informes técnicos' : 'Read the technical reports'}</h2>
            <p>{es ? 'Estos archivos quedan servidos desde la web para que el proyecto sea auditable.' : 'These files are served from the website so the project is auditable.'}</p>
          </div>
          <div className="doc-links">
            {publicDocs[lang].map(([label, href]) => (
              <InternalLink key={href} href={href} navigate={navigate}>
                <FileText size={16} />
                {label}
              </InternalLink>
            ))}
          </div>
        </section>

        <section className="prisma3-paper-section prisma3-limits">
          <h2>{es ? 'Límites científicos' : 'Scientific limits'}</h2>
          <ul>
            <li>{es ? 'PRISMA 3 es software experimental de investigación, no dispositivo médico.' : 'PRISMA 3 is experimental research software, not a medical device.'}</li>
            <li>{es ? 'ec/eo es un contraste robusto y relativamente fácil; valida método y pipeline, no una capacidad clínica difícil.' : 'ec/eo is a robust and relatively easy contrast; it validates method and pipeline, not a difficult clinical capability.'}</li>
            <li>{es ? 'N=28 es modesto. Para publicación fuerte: 50–100 sujetos, intervalos de confianza y precisión por sujeto.' : 'N=28 is modest. For a strong publication: 50–100 subjects, confidence intervals and per-subject precision.'}</li>
            <li>{es ? 'La corrida real no incluye rechazo avanzado de artefactos/ICA.' : 'The real run does not include advanced artifact rejection/ICA.'}</li>
            <li>{es ? 'El resultado personalizado intra-CV no debe confundirse con generalización a sujetos nuevos.' : 'The personalized intra-CV result must not be confused with generalization to unseen subjects.'}</li>
          </ul>
        </section>
      </article>
    </>
  );
}

function Prisma4Article({ lang }) {
  const data = prisma4Data[lang];
  const es = lang === 'es';

  return (
    <>
      <PageHero eyebrow={data.eyebrow} title={data.title} text={data.subtitle} visualKey="prisma4" />
      <article className="prisma4-article">
        <section className="prisma4-section">
          <div className="section-kicker">{es ? 'Resumen' : 'Abstract'}</div>
          <p className="prisma4-lead">{data.abstract}</p>
        </section>

        <section className="prisma4-section prisma4-thesis">
          <h2>{es ? 'Tesis de PRISMA 4' : 'PRISMA 4 thesis'}</h2>
          <p>{data.thesis}</p>
        </section>

        <section className="prisma4-section">
          <div className="section-kicker">{es ? 'Modelo conceptual' : 'Conceptual model'}</div>
          <div className="prisma4-formula">{data.formula}</div>
          <p>{es ? 'T añade tiempo: drift fisiológico, aprendizaje del usuario, calidad de señal, fatiga y variación entre sesiones.' : 'T adds time: physiological drift, user learning, signal quality, fatigue and between-session variation.'}</p>
        </section>

        <section className="prisma4-section">
          <h2>{es ? 'Módulos técnicos propuestos' : 'Proposed technical modules'}</h2>
          <div className="prisma4-grid">
            {data.modules.map(([title, text]) => (
              <article className="prisma4-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}

function NotesPage({ t, lang, navigate }) {
  const es = lang === 'es';
  const items = es
    ? [
        ['Reporte', 'Validación EEG real DS007358', 'Resultados ec/eo, LOSO, matriz de confusión y límites.', '/research/prisma3-real-eeg-validation.md'],
        ['Método', 'Cómo funciona PRISMA 3', 'Pipeline desde señal hasta baseline, traductor individual y ML.', '/research/prisma3-how-it-works.md'],
        ['Guía', 'Cómo conectar EEG real', 'CSV, MNE, OpenNeuro/eegdash y LSL para hardware en vivo.', '/research/prisma3-connect-eeg.md'],
        ['Límites', 'Límites científicos', 'Qué no mide PRISMA y cómo usarlo responsablemente.', '/research/prisma3-scientific-limits.md'],
      ]
    : [
        ['Report', 'Real EEG validation DS007358', 'ec/eo results, LOSO, confusion matrix and limits.', '/research/prisma3-real-eeg-validation.md'],
        ['Method', 'How PRISMA 3 works', 'Pipeline from signal to baseline, individual translator and ML.', '/research/prisma3-how-it-works.md'],
        ['Guide', 'How to connect real EEG', 'CSV, MNE, OpenNeuro/eegdash and LSL for live hardware.', '/research/prisma3-connect-eeg.md'],
        ['Limits', 'Scientific limits', 'What PRISMA does not measure and responsible use.', '/research/prisma3-scientific-limits.md'],
      ];

  return (
    <>
      <PageHero {...t.notes} visualKey="notes" />
      <section className="notes-list">
        {items.map(([type, title, text, href]) => {
          const slug = href.split('/').pop().replace('.md', '');
          return (
            <InternalLink className="note-card" key={title} href={`/docs/${slug}`} navigate={navigate}>
              <span>{type}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </InternalLink>
          );
        })}
      </section>
    </>
  );
}


function renderInlineMarkdown(text) {
  const parts = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^\)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];

    if (token.startsWith('**')) {
      parts.push(<strong key={`${token}-${match.index}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      parts.push(<code key={`${token}-${match.index}`}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (linkMatch) {
        parts.push(
          <a key={`${token}-${match.index}`} href={linkMatch[2]} target="_blank" rel="noreferrer">
            {linkMatch[1]}
          </a>
        );
      } else {
        parts.push(token);
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function parseTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function MarkdownRenderer({ markdown }) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let index = 0;
  let key = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <pre key={key++} className="md-code-block" data-lang={lang || undefined}>
          <code>{code.join('\n')}</code>
        </pre>
      );
      continue;
    }

    if (/^#{1,4}\s/.test(line)) {
      const depth = line.match(/^#+/)[0].length;
      const text = line.replace(/^#{1,4}\s/, '');
      const Tag = `h${Math.min(depth, 4)}`;
      blocks.push(<Tag key={key++}>{renderInlineMarkdown(text)}</Tag>);
      index += 1;
      continue;
    }

    if (line.includes('|') && index + 1 < lines.length && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])) {
      const headers = parseTableRow(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      blocks.push(
        <div key={key++} className="md-table-wrap">
          <table>
            <thead>
              <tr>{headers.map((cell, cellIndex) => <th key={cellIndex}>{renderInlineMarkdown(cell)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{renderInlineMarkdown(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(<ul key={key++}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInlineMarkdown(item)}</li>)}</ul>);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push(<ol key={key++}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInlineMarkdown(item)}</li>)}</ol>);
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(<blockquote key={key++}>{quote.map((item, itemIndex) => <p key={itemIndex}>{renderInlineMarkdown(item)}</p>)}</blockquote>);
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^#{1,4}\s/.test(lines[index]) &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !/^\s*\d+\.\s+/.test(lines[index]) &&
      !lines[index].trim().startsWith('```') &&
      !(lines[index].includes('|') && index + 1 < lines.length && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1]))
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(<p key={key++}>{renderInlineMarkdown(paragraph.join(' '))}</p>);
  }

  return <article className="markdown-body">{blocks}</article>;
}

function MarkdownDocPage({ path, lang, navigate, t }) {
  const slug = path.replace('/docs/', '').replace('/research/', '').replace('.md', '') || 'prisma3-real-eeg-validation';
  const doc = docsMeta.find((item) => item.slug === slug) || docsMeta[0];
  const [markdown, setMarkdown] = useState('');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    setStatus('loading');
    fetch(doc.file)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => {
        if (!active) return;
        setMarkdown(text);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        setMarkdown('');
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, [doc.file]);

  return (
    <section className="markdown-reader-page">
      <div className="markdown-reader-header">
        <div>
          <span className="section-kicker">{t.ui.markdownReader}</span>
          <h1>{doc.label[lang]}</h1>
          <p>{lang === 'es' ? 'Documentación técnica servida y renderizada dentro de la web.' : 'Technical documentation served and rendered inside the website.'}</p>
        </div>
        <a className="button button-outline" href={doc.file} target="_blank" rel="noreferrer">
          <FileText size={16} />
          {t.ui.rawMarkdown}
        </a>
      </div>

      <div className="doc-nav">
        {docsMeta.map((item) => (
          <InternalLink key={item.slug} href={`/docs/${item.slug}`} navigate={navigate} className={item.slug === doc.slug ? 'active' : ''}>
            {item.label[lang]}
          </InternalLink>
        ))}
      </div>

      {status === 'loading' && <p className="markdown-status">{t.ui.loadingMarkdown}</p>}
      {status === 'error' && <p className="markdown-status error">{t.ui.markdownError}</p>}
      {status === 'ready' && <MarkdownRenderer markdown={markdown} />}
    </section>
  );
}

function ContactPage({ t }) {
  return (
    <>
      <PageHero {...t.contact} visualKey="contact" />
      <section className="contact-panel">
        <h2>{t.ui.follow}</h2>
        <p>{t.footer}</p>
        <div className="social-grid">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              <img src={link.icon} alt="" />
              {link.label}
            </a>
          ))}
        </div>
        <a className="button" href="mailto:rogernav06@gmail.com">
          <Mail size={16} />
          {t.contact.email}
        </a>
      </section>
    </>
  );
}

function Footer({ t }) {
  return (
    <footer className="site-footer">
      <strong>ROGEX LABORATORIES</strong>
      <p>{t.footer}</p>
      <span>© 2026 Rogex Laboratories. All rights reserved.</span>
    </footer>
  );
}

function App() {
  const [path, navigate] = usePath();
  const [lang, setLang] = useState(() => localStorage.getItem('rogex-lang') || 'es');
  const [theme, setTheme] = useState(() => localStorage.getItem('rogex-theme') || 'light');

  useEffect(() => {
    localStorage.setItem('rogex-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('rogex-theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const t = copy[lang];

  const page = useMemo(() => {
    const key = path.replace('/', '') || 'home';

    if (path.startsWith('/docs/') || path.startsWith('/research/')) return <MarkdownDocPage path={path} lang={lang} navigate={navigate} t={t} />;
    if (key === 'research') return <ResearchPage t={t} lang={lang} />;
    if (key === 'prisma') return <PrismaPage t={t} lang={lang} />;
    if (key === 'prisma3') return <Prisma3Article lang={lang} navigate={navigate} />;
    if (key === 'prisma4') return <Prisma4Article lang={lang} />;
    if (key === 'methods') return <MethodsPage t={t} lang={lang} />;
    if (key === 'collaborations') return <CollaborationsPage t={t} lang={lang} />;
    if (key === 'advances') return <AdvancesPage lang={lang} />;
    if (key === 'notes') return <NotesPage t={t} lang={lang} navigate={navigate} />;
    if (key === 'contact') return <ContactPage t={t} />;

    return <Home t={t} lang={lang} navigate={navigate} />;
  }, [path, t, lang, navigate]);

  return (
    <>
      <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} navigate={navigate} t={t} />
      <main>{page}</main>
      <Footer t={t} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

export default App;
