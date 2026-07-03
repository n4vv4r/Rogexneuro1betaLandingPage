import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Brain,
  ChartNoAxesColumnIncreasing,
  Database,
  Download,
  FileText,
  FolderOpen,
  Mail,
  Microscope,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  UserRound,
  Waves,
} from 'lucide-react';
import logo from './assets/rogex-logo-transparent.png';
import './styles.css';

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
      backHome: 'Inicio',
      viewPrisma: 'Ver PRISMA',
      documentation: 'Documentación',
      contact: 'Contactar',
      readNotes: 'Leer notas',
      follow: 'Seguir y conectar',
    },
    home: {
      eyebrow: 'Software de investigación independiente.',
      title: 'Herramientas abiertas para análisis EEG reproducible.',
      text: 'Rogex Laboratories desarrolla PRISMA: un entorno de análisis EEG orientado a investigación, diseñado para importar datos reales, limpiar señales, individualizar métricas y producir resultados interpretables.',
      secondary: 'La web prioriza metodología, límites, reproducibilidad y colaboración académica. Sin promesas clínicas, sin humo comercial.',
    },
    research: {
      eyebrow: 'Investigación',
      title: 'Un laboratorio independiente para neurotecnología aplicada.',
      text: 'Rogex Laboratories trabaja en software científico para análisis de señales EEG, resting-state, filtrado de ruido, PSD de Welch, variabilidad interindividual y flujos de análisis revisables.',
    },
    prisma: {
      eyebrow: 'PRISMA',
      title: 'Pipeline de análisis EEG para datos reales.',
      text: 'PRISMA ayuda a estructurar el análisis: carga de datos, preprocesado, filtrado, PSD, bandpower, métricas por sujeto y exportación de resultados.',
    },
    methods: {
      eyebrow: 'Métodos',
      title: 'Metodología transparente, resultados interpretables.',
      text: 'La confianza no viene de prometer accuracy absoluta. Viene de documentar cómo se limpian los datos, qué features se extraen, dónde falla el modelo y qué puede reproducirse.',
    },
    collaborations: {
      eyebrow: 'Colaboraciones',
      title: 'Trabajo con comunidad académica y datos reales.',
      text: 'La prioridad actual es contribuir a investigación real, aprender metodología y construir PRISMA alrededor de problemas concretos de neurociencia.',
    },
    notes: {
      eyebrow: 'Notas de investigación',
      title: 'Métodos, decisiones técnicas y diario de laboratorio.',
      text: 'Un registro de avances, problemas abiertos y aprendizajes en EEG, MATLAB, PRISMA y software científico.',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Abierto a feedback académico, revisión técnica y colaboración.',
      text: 'Rogex Laboratories busca construir herramientas de análisis EEG con rigor, transparencia y utilidad real para investigación.',
      email: 'Email',
    },
    footer: 'Laboratorio independiente de investigación desarrollando herramientas abiertas para análisis EEG y neurotecnología.',
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
      backHome: 'Home',
      viewPrisma: 'View PRISMA',
      documentation: 'Documentation',
      contact: 'Contact',
      readNotes: 'Read notes',
      follow: 'Follow & connect',
    },
    home: {
      eyebrow: 'Independent research software.',
      title: 'Open tools for reproducible EEG analysis.',
      text: 'Rogex Laboratories develops PRISMA: a research-oriented EEG analysis environment designed to import real data, clean signals, individualize metrics and produce interpretable results.',
      secondary: 'The site prioritizes methodology, limitations, reproducibility and academic collaboration. No clinical promises. No commercial hype.',
    },
    research: {
      eyebrow: 'Research',
      title: 'An independent lab for applied neurotechnology.',
      text: 'Rogex Laboratories works on scientific software for EEG signal analysis, resting-state workflows, noise filtering, Welch PSD, inter-individual variability and reviewable analysis pipelines.',
    },
    prisma: {
      eyebrow: 'PRISMA',
      title: 'EEG analysis pipeline for real data.',
      text: 'PRISMA helps structure the workflow: data loading, preprocessing, filtering, PSD, bandpower, subject-level metrics and result export.',
    },
    methods: {
      eyebrow: 'Methods',
      title: 'Transparent methodology, interpretable results.',
      text: 'Trust does not come from promising absolute accuracy. It comes from documenting how data is cleaned, which features are extracted, where models fail and what can be reproduced.',
    },
    collaborations: {
      eyebrow: 'Collaborations',
      title: 'Working with academic community and real data.',
      text: 'The current priority is contributing to real research, learning methodology and building PRISMA around concrete neuroscience problems.',
    },
    notes: {
      eyebrow: 'Research notes',
      title: 'Methods, technical decisions and lab journal.',
      text: 'A record of progress, open problems and learnings in EEG, MATLAB, PRISMA and scientific software.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Open to academic feedback, technical review and collaboration.',
      text: 'Rogex Laboratories aims to build EEG analysis tools with rigor, transparency and real usefulness for research.',
      email: 'Email',
    },
    footer: 'Independent research laboratory developing open tools for EEG analysis and neurotechnology.',
  },
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/n4vv4r', icon: 'https://img.icons8.com/ios-glyphs/30/github.png' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rogexlabs/', icon: 'https://img.icons8.com/ios-filled/50/linkedin.png' },
  { label: 'X', href: 'https://x.com/rogexlabs', icon: 'https://img.icons8.com/ios-filled/50/twitterx.png' },
  { label: 'Instagram', href: 'https://instagram.com/rogexlaboratories', icon: 'https://img.icons8.com/ios-filled/50/instagram-new.png' },
  { label: 'Linktree', href: 'https://linktr.ee/rogynavy', icon: 'https://img.icons8.com/ios-filled/50/linktree.png' },
];

const carouselSets = {
  home: ['/carousel/prisma-signal-01.svg', '/carousel/prisma-signal-02.svg', '/carousel/prisma-signal-03.svg'],
  research: ['/carousel/research-01.svg', '/carousel/research-02.svg', '/carousel/research-03.svg'],
  prisma: ['/carousel/prisma-signal-01.svg', '/carousel/prisma-signal-02.svg', '/carousel/prisma-signal-03.svg'],
  methods: ['/carousel/methods-01.svg', '/carousel/methods-02.svg', '/carousel/methods-03.svg'],
  collaborations: ['/carousel/research-02.svg', '/carousel/prisma-signal-03.svg', '/carousel/methods-01.svg'],
  advances: ['/carousel/prisma-signal-03.svg', '/carousel/research-01.svg', '/carousel/methods-02.svg'],
  notes: ['/carousel/methods-03.svg', '/carousel/research-03.svg', '/carousel/prisma-signal-02.svg'],
  contact: ['/carousel/research-02.svg', '/carousel/methods-02.svg', '/carousel/prisma-signal-01.svg'],
  prisma3: ['/carousel/prisma-signal-01.svg', '/carousel/research-01.svg', '/carousel/methods-01.svg'],
  prisma4: ['/carousel/prisma-signal-02.svg', '/carousel/prisma-signal-03.svg', '/carousel/research-03.svg'],
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

function InternalLink({ href, navigate, children, className }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function BlendCarousel({ setName = 'home', label = 'Rogex visual carousel' }) {
  const images = carouselSets[setName] || carouselSets.home;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="blend-carousel" aria-label={label}>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={index === active ? 'is-active' : ''}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}
      <div className="blend-carousel__grain" aria-hidden="true" />
    </div>
  );
}

function Header({ lang, setLang, navigate, t }) {
  return (
    <header className="site-header">
      <InternalLink href="/" navigate={navigate} className="brand">
        <img src={logo} alt="Rogex Laboratories" />
        <span>ROGEX LABORATORIES</span>
      </InternalLink>

      <nav>
        {routes.map((route) => (
          <InternalLink key={route} href={`/${route}`} navigate={navigate}>
            {t.nav[route]}
          </InternalLink>
        ))}
      </nav>

      <button className="lang-button" onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
        {t.ui.language}
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

function Home({ t, navigate }) {
  return (
    <>
      <section className="hero split-visual-hero">
        <div className="hero-copy split-visual-copy">
          <span>{t.home.eyebrow}</span>
          <h1>{t.home.title}</h1>
          <p>{t.home.text}</p>
          <p className="muted">{t.home.secondary}</p>

          <div className="hero-actions">
            <InternalLink href="/prisma" navigate={navigate} className="button">
              {t.ui.viewPrisma} <ArrowRight size={16} />
            </InternalLink>
            <InternalLink href="/methods" navigate={navigate} className="button button-outline">
              {t.ui.documentation}
            </InternalLink>
          </div>
        </div>

        <BlendCarousel setName="home" label="Rogex Laboratories carousel" />
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

function ResearchPage({ t }) {
  const blocks = [
    ['Objetivo', 'Convertir datos EEG complejos en resultados claros, auditables y útiles para investigadores.'],
    ['Enfoque', 'Software local-first, metodología explícita, documentación abierta y resultados reproducibles.'],
    ['Límites', 'PRISMA no es un dispositivo médico ni una herramienta diagnóstica. Es software de investigación.'],
  ];

  return (
    <>
      <PageHero {...t.research} visualKey="research" />
      <section className="content-grid">
        {blocks.map(([title, text]) => (
          <article className="info-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function PrismaPage({ t }) {
  const workflow = [
    ['01', 'Importar datos reales', 'Carga de archivos EEG con metadatos explícitos.', Database],
    ['02', 'Limpiar y filtrar', 'Bandpass, notch, reducción de ruido y control de artefactos.', SlidersHorizontal],
    ['03', 'Individualizar por sujeto', 'Normalización, baselines e IAF para variabilidad interindividual.', UserRound],
    ['04', 'Análisis espectral', 'PSD de Welch, bandpower, ratios e indicadores interpretables.', ChartNoAxesColumnIncreasing],
    ['05', 'Exportar resultados', 'Tablas, figuras y salidas reproducibles para revisión científica.', Download],
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

function MethodsPage({ t }) {
  const items = [
    ['Evaluación LOSO', 'Leave-One-Subject-Out para estimar generalización entre sujetos y reducir leakage metodológico.', ShieldCheck],
    ['Metodología visible', 'Preprocesado, features, normalización y decisiones técnicas documentadas.', FileText],
    ['Pipelines interpretables', 'Diseño orientado a revisión científica, no a modelos caja negra sin explicación.', Microscope],
    ['Limitaciones conocidas', 'Se reportan límites, incertidumbre, calidad de señal y condiciones donde no conviene sobreinterpretar.', TriangleAlert],
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

function CollaborationsPage({ t }) {
  const items = [
    ['Colaboración académica actual', 'Trabajo activo con investigadores en metodología EEG y análisis de señal.'],
    ['Universitat de Girona', 'Colaboración vinculada a investigación en neurología, adicciones y análisis EEG.'],
    ['Procesamiento reproducible', 'Énfasis en métodos transparentes, resting-state, Welch PSD y reporting claro.'],
  ];

  return (
    <>
      <PageHero {...t.collaborations} visualKey="collaborations" />
      <section className="content-grid">
        {items.map(([title, text]) => (
          <article className="info-card" key={title}>
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
        ['Probado hasta ahora', 'El audio original no contiene evidencia fonética robusta de “hiéreme”. El símbolo debe tratarse como reconstrucción perceptiva, no como transcripción objetiva.'],
        ['Altamente posible', 'La materia filtra sonido, elimina detalles del habla y crea ausencia de información. Esa ausencia puede activar reconstrucción perceptiva.'],
        ['Teorizado', 'Información sobreviviente, ausencia, emoción y memoria pueden producir símbolo percibido.'],
        ['Pendiente', 'Faltan experimentos humanos, escucha ciega, priming, controles y replicación.'],
      ]
    : [
        ['Confirmed so far', 'The original audio does not contain robust phonetic evidence for “hiéreme”. The symbol must be treated as perceptual reconstruction.'],
        ['Highly plausible', 'Matter filters sound, removes speech detail and creates absence of information.'],
        ['Theorized', 'Surviving information, absence, emotion and memory may produce perceived symbol.'],
        ['Pending', 'Human listening experiments, blind controls, priming and replication are still required.'],
      ];

  return (
    <>
      <PageHero
        eyebrow={es ? 'Avances de investigación' : 'Research progress'}
        title={es ? 'Del audio ambiguo al traductor biológico.' : 'From ambiguous audio to biological translation.'}
        text={es ? 'Registro público de avances experimentales sobre degradación de información, percepción reconstructiva y emergencia simbólica.' : 'Public research log on information degradation, reconstructive perception and symbolic emergence.'}
        visualKey="advances"
      />

      <section className="content-grid">
        {status.map(([title, text]) => (
          <article className="info-card" key={title}>
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
    eyebrow: 'Artículo científico / Rogex Laboratories',
    title: 'PRISMA 3: un traductor neuroinformacional individual para estudiar la variabilidad interindividual.',
    subtitle: 'PRISMA 3 no busca un patrón universal de cerebro. Busca aprender el idioma neurofisiológico de cada individuo.',
    abstract: 'PRISMA 3 es una plataforma experimental de software neuroinformacional construida para estudiar una hipótesis concreta: la variabilidad interindividual no debe tratarse como ruido a eliminar, sino como parte central del traductor biológico de cada persona. Usa EEG simulado, extracción de features, baseline individual, normalización intrasujeto, machine learning y reportes explicables.',
    thesis: 'La misma tarea mental no produce exactamente la misma firma EEG en todas las personas. PRISMA 3 propone construir una línea base individual y luego interpretar cada señal como desviación respecto al propio patrón del usuario.',
    results: [
      ['Modelo global crudo', '76.7%', 'Funciona, pero sufre por diferencias entre usuarios.'],
      ['Modelo normalizado por usuario', '94.4%', 'La normalización intrasujeto produce el mayor salto.'],
      ['Modelo personalizado', '96.1%', 'Añade una mejora extra en la demo sintética.'],
    ],
  },
  en: {
    eyebrow: 'Scientific article / Rogex Laboratories',
    title: 'PRISMA 3: an individual neuroinformational translator for inter-individual variability.',
    subtitle: 'PRISMA 3 does not search for a universal brain pattern. It learns the neurophysiological language of each individual.',
    abstract: 'PRISMA 3 is an experimental neuroinformational software platform designed to study one concrete hypothesis: inter-individual variability should not be treated as noise to erase, but as a central part of each person’s biological translator. It uses simulated EEG, feature extraction, individual baseline, within-subject normalization, machine learning and explainable reports.',
    thesis: 'The same mental task does not produce exactly the same EEG signature in every person. PRISMA 3 builds an individual baseline and then interprets each signal as a deviation from the user’s own pattern.',
    results: [
      ['Raw global model', '76.7%', 'Works, but suffers from user differences.'],
      ['User-normalized model', '94.4%', 'Within-subject normalization produces the largest jump.'],
      ['Personalized model', '96.1%', 'Adds an extra gain in the synthetic demo.'],
    ],
  },
};

const prisma4Data = {
  es: {
    eyebrow: 'Artículo científico / Rogex Laboratories',
    title: 'PRISMA 4: baseline dinámico y adaptación a la variabilidad neurofisiológica real.',
    subtitle: 'PRISMA 3 demuestra la arquitectura. PRISMA 4 debe demostrar adaptación al mundo real.',
    abstract: 'PRISMA 4 es la evolución experimental propuesta después de PRISMA 3. Si PRISMA 3 demuestra que la normalización individual puede reducir variabilidad interindividual en datos sintéticos, PRISMA 4 busca estudiar una fase más difícil: variabilidad real entre días, fatiga, respiración, emoción no etiquetada, postura, calidad de electrodos, drift fisiológico y adaptación dinámica del baseline.',
    thesis: 'PRISMA 3 aprende el idioma neurofisiológico de cada individuo. PRISMA 4 debe aprender cómo ese idioma cambia con el tiempo, el cuerpo, el contexto y la calidad de señal.',
    formula: 'Sp = Tb(Is, A, E, Mp, T)',
    modules: [
      ['dynamic_baseline.py', 'Crea y actualiza baselines dinámicos con reglas de confianza.'],
      ['session_drift.py', 'Mide cambios entre sesiones y detecta drift temporal.'],
      ['adaptive_filters.py', 'Aplica filtros que cambian según calidad de señal y tipo de artefacto.'],
      ['test_retest_evaluation.py', 'Evalúa estabilidad del mismo usuario en distintos días.'],
      ['real_eeg_importer.py', 'Importa CSV, EDF, MAT, FIF u otros formatos EEG.'],
      ['lsl_stream.py', 'Prepara entrada en tiempo real para Muse/OpenBCI vía LSL.'],
    ],
  },
  en: {
    eyebrow: 'Scientific article / Rogex Laboratories',
    title: 'PRISMA 4: dynamic baseline and adaptation to real neurophysiological variability.',
    subtitle: 'PRISMA 3 demonstrates the architecture. PRISMA 4 must demonstrate adaptation to the real world.',
    abstract: 'PRISMA 4 is the proposed experimental evolution after PRISMA 3. If PRISMA 3 shows that individual normalization can reduce inter-individual variability in synthetic data, PRISMA 4 studies a harder phase: real day-to-day variability, fatigue, breathing, unlabeled emotion, posture, electrode quality, physiological drift and dynamic baseline adaptation.',
    thesis: 'PRISMA 3 learns the neurophysiological language of each individual. PRISMA 4 must learn how that language changes with time, body state, context and signal quality.',
    formula: 'Sp = Tb(Is, A, E, Mp, T)',
    modules: [
      ['dynamic_baseline.py', 'Creates and updates dynamic baselines with confidence rules.'],
      ['session_drift.py', 'Measures session-to-session change and detects temporal drift.'],
      ['adaptive_filters.py', 'Applies filters that change depending on signal quality and artifact type.'],
      ['test_retest_evaluation.py', 'Evaluates same-user stability across different days.'],
      ['real_eeg_importer.py', 'Imports CSV, EDF, MAT, FIF or other EEG formats.'],
      ['lsl_stream.py', 'Prepares real-time input for Muse/OpenBCI through LSL.'],
    ],
  },
};

function ArticlePage({ lang, version }) {
  const isPrisma4 = version === 'prisma4';
  const data = isPrisma4 ? prisma4Data[lang] : prisma3Data[lang];

  return (
    <>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        text={data.subtitle}
        visualKey={version}
      />

      <article className={isPrisma4 ? 'prisma4-article' : 'prisma3-article'}>
        <section className={isPrisma4 ? 'prisma4-section' : 'prisma3-paper-section'}>
          <div className="section-kicker">{lang === 'es' ? 'Resumen' : 'Abstract'}</div>
          <p className={isPrisma4 ? 'prisma4-lead' : 'paper-lead'}>{data.abstract}</p>
        </section>

        <section className={isPrisma4 ? 'prisma4-section prisma4-thesis' : 'prisma3-paper-section prisma3-thesis'}>
          <h2>{lang === 'es' ? 'Tesis central' : 'Central thesis'}</h2>
          <p>{data.thesis}</p>
        </section>

        {isPrisma4 ? (
          <>
            <section className="prisma4-section">
              <div className="section-kicker">{lang === 'es' ? 'Modelo conceptual' : 'Conceptual model'}</div>
              <div className="prisma4-formula">{data.formula}</div>
              <p>{lang === 'es' ? 'PRISMA 4 añade T: tiempo. El estado estimado depende de cómo cambia el usuario entre sesiones, días, estados corporales y condiciones de medida.' : 'PRISMA 4 adds T: time. The estimated state depends on how the user changes across sessions, days, body states and measurement conditions.'}</p>
            </section>

            <section className="prisma4-section">
              <h2>{lang === 'es' ? 'Módulos técnicos propuestos' : 'Proposed technical modules'}</h2>
              <div className="prisma4-grid">
                {data.modules.map(([title, text]) => (
                  <article className="prisma4-card" key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="prisma3-paper-section">
            <h2>{lang === 'es' ? 'Resultados sintéticos iniciales' : 'Initial synthetic results'}</h2>
            <div className="results-table">
              {data.results.map(([model, value, note]) => (
                <div className="results-row" key={model}>
                  <strong>{model}</strong>
                  <span>{value}</span>
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={isPrisma4 ? 'prisma4-section prisma4-limits' : 'prisma3-paper-section prisma3-limits'}>
          <h2>{lang === 'es' ? 'Límites científicos' : 'Scientific limits'}</h2>
          <ul>
            <li>{lang === 'es' ? 'No es un dispositivo médico.' : 'Not a medical device.'}</li>
            <li>{lang === 'es' ? 'No diagnostica enfermedades.' : 'Does not diagnose disease.'}</li>
            <li>{lang === 'es' ? 'No mide CB1, CB2 ni neurotransmisores directamente.' : 'Does not directly measure CB1, CB2 or neurotransmitters.'}</li>
            <li>{lang === 'es' ? 'La teoría guía la arquitectura, pero debe ser validada con datos reales.' : 'The theory guides the architecture, but must be validated with real data.'}</li>
          </ul>
        </section>
      </article>
    </>
  );
}

function NotesPage({ t }) {
  const items = [
    ['Métodos', 'Variabilidad interindividual en resting-state EEG', 'Por qué los baselines individuales importan y cómo PRISMA los modela sin ocultar supuestos.'],
    ['Nota técnica', 'Ruido magnético en EEG', 'Estrategias prácticas para identificar line noise, armónicos y registros inestables.'],
    ['Lab update', 'PRISMA Research Core', 'Cambios en ingesta, preprocesado y flujo PSD de Welch.'],
  ];

  return (
    <>
      <PageHero {...t.notes} visualKey="notes" />
      <section className="notes-list">
        {items.map(([type, title, text]) => (
          <article className="note-card" key={title}>
            <span>{type}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </>
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

  useEffect(() => {
    localStorage.setItem('rogex-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = copy[lang];

  const page = useMemo(() => {
    const key = path.replace('/', '') || 'home';

    if (key === 'research') return <ResearchPage t={t} />;
    if (key === 'prisma') return <PrismaPage t={t} />;
    if (key === 'prisma3') return <ArticlePage lang={lang} version="prisma3" />;
    if (key === 'prisma4') return <ArticlePage lang={lang} version="prisma4" />;
    if (key === 'methods') return <MethodsPage t={t} />;
    if (key === 'collaborations') return <CollaborationsPage t={t} />;
    if (key === 'advances') return <AdvancesPage lang={lang} />;
    if (key === 'notes') return <NotesPage t={t} />;
    if (key === 'contact') return <ContactPage t={t} />;

    return <Home t={t} lang={lang} navigate={navigate} />;
  }, [path, t, lang, navigate]);

  return (
    <>
      <Header lang={lang} setLang={setLang} navigate={navigate} t={t} />
      <main>{page}</main>
      <Footer t={t} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

export default App;
