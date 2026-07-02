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
  LineChart,
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

const routes = ['research', 'prisma', 'methods', 'collaborations', 'notes', 'contact'];

const copy = {
  es: {
    nav: {
      research: 'Investigación',
      prisma: 'PRISMA',
      methods: 'Métodos',
      collaborations: 'Colaboraciones',
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
      text:
        'Rogex Laboratories desarrolla PRISMA: un entorno de análisis EEG orientado a investigación, diseñado para importar datos reales, limpiar señales, individualizar métricas y producir resultados interpretables.',
      secondary:
        'La web prioriza metodología, límites, reproducibilidad y colaboración académica. Sin promesas clínicas, sin humo comercial.',
    },
    research: {
      eyebrow: 'Investigación',
      title: 'Un laboratorio independiente para neurotecnología aplicada.',
      text:
        'Rogex Laboratories trabaja en software científico para análisis de señales EEG, resting-state, filtrado de ruido, PSD de Welch, variabilidad interindividual y flujos de análisis revisables.',
      blocks: [
        {
          title: 'Objetivo',
          text:
            'Convertir datos EEG complejos en resultados claros, auditables y útiles para investigadores.',
        },
        {
          title: 'Enfoque',
          text:
            'Software local-first, metodología explícita, documentación abierta y resultados reproducibles.',
        },
        {
          title: 'Límites',
          text:
            'PRISMA no es un dispositivo médico ni una herramienta diagnóstica. Es software de investigación.',
        },
      ],
    },
    prisma: {
      eyebrow: 'PRISMA',
      title: 'Pipeline de análisis EEG para datos reales.',
      text:
        'PRISMA ayuda a estructurar el análisis: carga de datos MATLAB, preprocesado, filtrado, PSD, bandpower, métricas por sujeto y exportación de resultados.',
      workflowTitle: 'Flujo PRISMA',
      workflow: [
        {
          number: '01',
          title: 'Importar datos reales',
          text: 'Carga de archivos MATLAB y estructuras EEG con metadatos explícitos.',
          icon: Database,
        },
        {
          number: '02',
          title: 'Limpiar y filtrar',
          text: 'Bandpass, notch, reducción de ruido y control de artefactos.',
          icon: SlidersHorizontal,
        },
        {
          number: '03',
          title: 'Individualizar por sujeto',
          text: 'Normalización, baselines e IAF para variabilidad interindividual.',
          icon: UserRound,
        },
        {
          number: '04',
          title: 'Análisis espectral',
          text: 'PSD de Welch, bandpower, ratios e indicadores interpretables.',
          icon: ChartNoAxesColumnIncreasing,
        },
        {
          number: '05',
          title: 'Exportar resultados',
          text: 'Tablas, figuras y salidas reproducibles para revisión científica.',
          icon: Download,
        },
      ],
      featuresTitle: 'Qué hace PRISMA',
      features: [
        {
          title: 'Ingesta MATLAB & EEG',
          text: 'Lectura de datos reales, matrices, canales, frecuencia de muestreo y metadatos.',
          icon: FolderOpen,
        },
        {
          title: 'Filtrado y preprocesado',
          text: 'Decisiones transparentes de filtrado, rechazo de artefactos y preparación de señal.',
          icon: Waves,
        },
        {
          title: 'Welch PSD y bandpower',
          text: 'Estimación espectral robusta y métricas por bandas cerebrales.',
          icon: ChartNoAxesColumnIncreasing,
        },
        {
          title: 'Resting-state',
          text: 'Pipelines pensados para EEG en reposo y exploración de patrones base.',
          icon: Brain,
        },
        {
          title: 'Variabilidad interindividual',
          text: 'Modelos que respetan diferencias entre sujetos en lugar de ocultarlas.',
          icon: UserRound,
        },
        {
          title: 'Salidas reproducibles',
          text: 'Resultados claros para figuras, informes, estadística y revisión externa.',
          icon: FileText,
        },
      ],
    },
    methods: {
      eyebrow: 'Métodos',
      title: 'Metodología transparente, resultados interpretables.',
      text:
        'La confianza no viene de prometer accuracy absoluta. Viene de documentar cómo se limpian los datos, qué features se extraen, dónde falla el modelo y qué puede reproducirse.',
      items: [
        {
          title: 'Evaluación LOSO',
          text:
            'Leave-One-Subject-Out para estimar generalización entre sujetos y reducir leakage metodológico.',
          icon: ShieldCheck,
        },
        {
          title: 'Metodología visible',
          text:
            'Preprocesado, features, normalización y decisiones técnicas documentadas.',
          icon: FileText,
        },
        {
          title: 'Pipelines interpretables',
          text:
            'Diseño orientado a revisión científica, no a modelos caja negra sin explicación.',
          icon: Microscope,
        },
        {
          title: 'Limitaciones conocidas',
          text:
            'Se reportan límites, incertidumbre, calidad de señal y condiciones donde no conviene sobreinterpretar.',
          icon: TriangleAlert,
        },
      ],
    },
    collaborations: {
      eyebrow: 'Colaboraciones',
      title: 'Trabajo con comunidad académica y datos reales.',
      text:
        'La prioridad actual es contribuir a investigación real, aprender metodología y construir PRISMA alrededor de problemas concretos de neurociencia.',
      items: [
        {
          title: 'Colaboración académica actual',
          text: 'Trabajo activo con investigadores en metodología EEG y análisis de señal.',
        },
        {
          title: 'Universitat de Girona',
          text: 'Colaboración vinculada a investigación en neurología, adicciones y análisis EEG.',
        },
        {
          title: 'Adicciones y neurología',
          text: 'Apoyo exploratorio para estudiar datos neurofisiológicos en contexto investigador.',
        },
        {
          title: 'Datos hospitalarios anonimizados',
          text: 'Análisis bajo aprobaciones y límites adecuados, sin exponer datos sensibles.',
        },
        {
          title: 'Procesamiento reproducible',
          text: 'Énfasis en métodos transparentes, resting-state, Welch PSD y reporting claro.',
        },
      ],
    },
    notes: {
      eyebrow: 'Notas de investigación',
      title: 'Métodos, decisiones técnicas y diario de laboratorio.',
      text:
        'Un registro de avances, problemas abiertos y aprendizajes en EEG, MATLAB, PRISMA y software científico.',
      items: [
        {
          type: 'Métodos',
          date: '12 mayo 2026',
          title: 'Variabilidad interindividual en resting-state EEG',
          text: 'Por qué los baselines individuales importan y cómo PRISMA los modela sin ocultar supuestos.',
        },
        {
          type: 'Nota técnica',
          date: '28 abril 2026',
          title: 'Ruido magnético en EEG: detección y filtrado',
          text: 'Estrategias prácticas para identificar line noise, armónicos y registros inestables.',
        },
        {
          type: 'Lab update',
          date: '10 abril 2026',
          title: 'PRISMA Research Core: mejoras del pipeline',
          text: 'Cambios en ingesta MATLAB, preprocesado y flujo PSD de Welch.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Abierto a feedback académico, revisión técnica y colaboración.',
      text:
        'Rogex Laboratories busca construir herramientas de análisis EEG con rigor, transparencia y utilidad real para investigación.',
      email: 'Email',
    },
    footer:
      'Laboratorio independiente de investigación desarrollando herramientas abiertas para análisis EEG y neurotecnología.',
  },
  en: {
    nav: {
      research: 'Research',
      prisma: 'PRISMA',
      methods: 'Methods',
      collaborations: 'Collaborations',
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
      text:
        'Rogex Laboratories develops PRISMA: a research-oriented EEG analysis environment designed to import real data, clean signals, individualize metrics and produce interpretable results.',
      secondary:
        'The site prioritizes methodology, limitations, reproducibility and academic collaboration. No clinical promises. No commercial hype.',
    },
    research: {
      eyebrow: 'Research',
      title: 'An independent lab for applied neurotechnology.',
      text:
        'Rogex Laboratories works on scientific software for EEG signal analysis, resting-state workflows, noise filtering, Welch PSD, inter-individual variability and reviewable analysis pipelines.',
      blocks: [
        {
          title: 'Objective',
          text:
            'Turn complex EEG data into clear, auditable and useful results for researchers.',
        },
        {
          title: 'Approach',
          text:
            'Local-first software, explicit methodology, open documentation and reproducible results.',
        },
        {
          title: 'Limits',
          text:
            'PRISMA is not a medical device or diagnostic tool. It is research software.',
        },
      ],
    },
    prisma: {
      eyebrow: 'PRISMA',
      title: 'EEG analysis pipeline for real data.',
      text:
        'PRISMA helps structure the workflow: MATLAB data loading, preprocessing, filtering, PSD, bandpower, subject-level metrics and result export.',
      workflowTitle: 'PRISMA workflow',
      workflow: [
        {
          number: '01',
          title: 'Import real data',
          text: 'MATLAB files and EEG structures with explicit metadata.',
          icon: Database,
        },
        {
          number: '02',
          title: 'Clean & filter',
          text: 'Bandpass, notch, noise reduction and artifact control.',
          icon: SlidersHorizontal,
        },
        {
          number: '03',
          title: 'Individualize by subject',
          text: 'Normalization, baselines and IAF for inter-individual variability.',
          icon: UserRound,
        },
        {
          number: '04',
          title: 'Spectral analysis',
          text: 'Welch PSD, bandpower, ratios and interpretable indicators.',
          icon: ChartNoAxesColumnIncreasing,
        },
        {
          number: '05',
          title: 'Export results',
          text: 'Tables, figures and reproducible outputs for scientific review.',
          icon: Download,
        },
      ],
      featuresTitle: 'What PRISMA does',
      features: [
        {
          title: 'MATLAB & EEG ingestion',
          text: 'Real data loading, matrices, channels, sampling frequency and metadata.',
          icon: FolderOpen,
        },
        {
          title: 'Filtering & preprocessing',
          text: 'Transparent filtering, artifact rejection and signal preparation decisions.',
          icon: Waves,
        },
        {
          title: 'Welch PSD & bandpower',
          text: 'Robust spectral estimation and metrics across brainwave bands.',
          icon: ChartNoAxesColumnIncreasing,
        },
        {
          title: 'Resting-state',
          text: 'Pipelines designed for resting EEG and baseline pattern exploration.',
          icon: Brain,
        },
        {
          title: 'Inter-individual variability',
          text: 'Models that respect subject differences instead of hiding them.',
          icon: UserRound,
        },
        {
          title: 'Reproducible outputs',
          text: 'Clear results for figures, reports, statistics and external review.',
          icon: FileText,
        },
      ],
    },
    methods: {
      eyebrow: 'Methods',
      title: 'Transparent methodology, interpretable results.',
      text:
        'Trust does not come from promising absolute accuracy. It comes from documenting how data is cleaned, which features are extracted, where models fail and what can be reproduced.',
      items: [
        {
          title: 'LOSO evaluation',
          text:
            'Leave-One-Subject-Out validation to estimate generalization across subjects and reduce methodological leakage.',
          icon: ShieldCheck,
        },
        {
          title: 'Visible methodology',
          text:
            'Preprocessing, features, normalization and technical decisions are documented.',
          icon: FileText,
        },
        {
          title: 'Interpretable pipelines',
          text:
            'Designed for scientific review, not unexplained black-box claims.',
          icon: Microscope,
        },
        {
          title: 'Known limitations',
          text:
            'Limits, uncertainty, signal quality and overinterpretation risks are reported.',
          icon: TriangleAlert,
        },
      ],
    },
    collaborations: {
      eyebrow: 'Collaborations',
      title: 'Working with academic community and real data.',
      text:
        'The current priority is contributing to real research, learning methodology and building PRISMA around concrete neuroscience problems.',
      items: [
        {
          title: 'Current academic collaboration',
          text: 'Active work with researchers on EEG methodology and signal analysis.',
        },
        {
          title: 'Universitat de Girona',
          text: 'Collaboration connected to neurology, addiction research and EEG analysis.',
        },
        {
          title: 'Addiction & neurology',
          text: 'Exploratory support for neurophysiological data in research contexts.',
        },
        {
          title: 'Anonymized hospital datasets',
          text: 'Analysis under appropriate approvals and limits, without exposing sensitive data.',
        },
        {
          title: 'Reproducible processing',
          text: 'Emphasis on transparent methods, resting-state, Welch PSD and clear reporting.',
        },
      ],
    },
    notes: {
      eyebrow: 'Research notes',
      title: 'Methods, technical decisions and lab journal.',
      text:
        'A record of progress, open problems and learnings in EEG, MATLAB, PRISMA and scientific software.',
      items: [
        {
          type: 'Methods',
          date: 'May 12, 2026',
          title: 'Inter-individual variability in resting-state EEG',
          text: 'Why individual baselines matter and how PRISMA models them without hiding assumptions.',
        },
        {
          type: 'Technical note',
          date: 'Apr 28, 2026',
          title: 'Magnetic noise in EEG: detection and filtering',
          text: 'Practical strategies for identifying line noise, harmonics and unstable recordings.',
        },
        {
          type: 'Lab update',
          date: 'Apr 10, 2026',
          title: 'PRISMA Research Core: pipeline improvements',
          text: 'Changes in MATLAB ingestion, preprocessing and Welch PSD workflow.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Open to academic feedback, technical review and collaboration.',
      text:
        'Rogex Laboratories aims to build EEG analysis tools with rigor, transparency and real usefulness for research.',
      email: 'Email',
    },
    footer:
      'Independent research laboratory developing open tools for EEG analysis and neurotechnology.',
  },
};

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/n4vv4r',
    icon: 'https://img.icons8.com/ios-glyphs/30/github.png',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/rogexlabs/',
    icon: 'https://img.icons8.com/ios-filled/50/linkedin.png',
  },
  {
    label: 'X',
    href: 'https://x.com/rogexlabs',
    icon: 'https://img.icons8.com/ios-filled/50/twitterx.png',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/rogexlaboratories',
    icon: 'https://img.icons8.com/ios-filled/50/instagram-new.png',
  },
  {
    label: 'Linktree',
    href: 'https://linktr.ee/rogynavy',
    icon: 'https://img.icons8.com/ios-filled/50/linktree.png',
  },
];

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

function Header({ lang, setLang, navigate, t }) {
  return (
    <header className="site-header">
      <InternalLink href="/" navigate={navigate} className="brand" aria-label="Rogex Laboratories home">
        <img src={logo} alt="Rogex Laboratories logo" />
        <span>
          <strong>ROGEX</strong>
          <small>LABORATORIES</small>
        </span>
      </InternalLink>

      <div className="header-right">
        <nav className="nav" aria-label="Main navigation">
          {routes.map((route) => (
            <InternalLink key={route} href={`/${route}`} navigate={navigate}>
              {t.nav[route]}
            </InternalLink>
          ))}
        </nav>

        <button
          type="button"
          className="language-toggle"
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label="Change language"
        >
          {t.ui.language}
        </button>
      </div>
    </header>
  );
}

function BrainVisual() {
  return (
    <div className="brain-panel" aria-label="EEG analysis illustration">
      <div className="grid-field" />
      <div className="brain-outline">
        <svg viewBox="0 0 600 360" role="img" aria-label="Abstract brain and EEG waveform">
          <defs>
            <linearGradient id="waveGradient" x1="0" x2="1">
              <stop offset="0%" stopColor="#7d7af5" />
              <stop offset="100%" stopColor="#b255a9" />
            </linearGradient>
          </defs>

          <path
            className="brain-shape"
            d="M177 259C106 246 75 197 86 143c8-42 43-77 87-84 18-38 63-51 101-31 39-25 98-17 127 18 47 2 86 39 87 85 41 22 52 80 18 114-29 29-85 27-121 9-45 24-98 25-139 1-22 10-47 12-69 4Z"
          />
          {Array.from({ length: 26 }).map((_, i) => {
            const x = 120 + (i * 17) % 370;
            const y = 70 + ((i * 31) % 180);
            const r = 18 + ((i * 7) % 45);
            return <circle key={i} className="brain-cell" cx={x} cy={y} r={r} />;
          })}
          <path
            className="wave"
            d="M22 181 L60 181 L72 170 L83 190 L95 166 L106 203 L119 147 L130 211 L142 179 L154 181 L174 181 L185 176 L195 190 L209 169 L220 197 L230 173 L240 181 L257 181 L267 161 L277 203 L288 151 L301 214 L312 163 L325 197 L335 181 L353 181 L368 169 L380 193 L394 160 L405 207 L417 176 L429 181 L454 181 L466 174 L480 187 L493 171 L507 197 L520 166 L532 202 L544 181 L580 181"
          />
        </svg>
      </div>

      <div className="chart-card psd-card">
        <span>Welch PSD</span>
        <svg viewBox="0 0 220 120">
          <polyline
            points="8,24 26,30 40,22 55,45 70,38 86,56 104,49 122,70 140,66 158,81 176,84 198,102"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <line x1="8" y1="108" x2="212" y2="108" />
          <line x1="8" y1="12" x2="8" y2="108" />
        </svg>
        <small>Frequency / Power</small>
      </div>

      <div className="chart-card topo-card">
        <span>Alpha band</span>
        <div className="topomap">
          <div />
        </div>
        <small>8–12 Hz</small>
      </div>
    </div>
  );
}

function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="page-hero section-block">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {children}
    </section>
  );
}

function Home({ t, navigate }) {
  return (
    <>
      <section className="hero section-block">
        <div className="hero-copy">
          <p className="eyebrow">{t.home.eyebrow}</p>
          <h1>{t.home.title}</h1>
          <p className="hero-text">{t.home.text}</p>
          <p className="hero-subtext">{t.home.secondary}</p>
          <div className="hero-actions">
            <InternalLink href="/prisma" navigate={navigate} className="button-primary">
              {t.ui.viewPrisma}
            </InternalLink>
            <InternalLink href="/methods" navigate={navigate} className="button-secondary">
              {t.ui.documentation} <ArrowRight size={16} />
            </InternalLink>
          </div>
        </div>

        <BrainVisual />
      </section>

      <section className="home-index section-block">
        {routes.map((route, index) => (
          <InternalLink href={`/${route}`} navigate={navigate} className="index-card" key={route}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{t.nav[route]}</h2>
            <ArrowRight size={20} />
          </InternalLink>
        ))}
      </section>
    </>
  );
}

function ResearchPage({ t }) {
  return (
    <>
      <PageHero eyebrow={t.research.eyebrow} title={t.research.title} text={t.research.text}>
        <div className="research-figure">
          <LineChart size={72} />
          <span>EEG / PSD / IAF / Resting-state</span>
        </div>
      </PageHero>

      <section className="three-grid section-block">
        {t.research.blocks.map((item) => (
          <article className="feature-card stacked" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function PrismaPage({ t }) {
  return (
    <>
      <PageHero eyebrow={t.prisma.eyebrow} title={t.prisma.title} text={t.prisma.text}>
        <BrainVisual />
      </PageHero>

      <section className="workflow-section section-block">
        <p className="eyebrow">{t.prisma.workflowTitle}</p>
        <div className="workflow-grid">
          {t.prisma.workflow.map((step, index) => {
            const Icon = step.icon;
            return (
              <article className="workflow-card" key={step.number}>
                <span className="card-number">{step.number}</span>
                <Icon className="card-icon" size={30} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {index < t.prisma.workflow.length - 1 && <span className="connector">›</span>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <p className="eyebrow">{t.prisma.featuresTitle}</p>
        <div className="feature-grid">
          {t.prisma.features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="feature-card" key={feature.title}>
                <Icon size={34} />
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function MethodsPage({ t }) {
  return (
    <>
      <PageHero eyebrow={t.methods.eyebrow} title={t.methods.title} text={t.methods.text} />
      <section className="section-block">
        <div className="methods-grid">
          {t.methods.items.map((method) => {
            const Icon = method.icon;
            return (
              <article className="method-card" key={method.title}>
                <Icon size={30} />
                <h3>{method.title}</h3>
                <p>{method.text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function CollaborationsPage({ t }) {
  return (
    <>
      <PageHero
        eyebrow={t.collaborations.eyebrow}
        title={t.collaborations.title}
        text={t.collaborations.text}
      />
      <section className="section-block">
        <div className="collab-grid page-collab-grid">
          {t.collaborations.items.map((item) => (
            <article className="collab-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function NotesPage({ t }) {
  return (
    <>
      <PageHero eyebrow={t.notes.eyebrow} title={t.notes.title} text={t.notes.text} />
      <section className="section-block">
        <div className="notes-grid">
          {t.notes.items.map((note) => (
            <article className="note-card" key={note.title}>
              <div className="note-meta">
                <span>{note.type}</span>
                <time>{note.date}</time>
              </div>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage({ t }) {
  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} text={t.contact.text} />
      <section className="contact-section section-block">
        <div>
          <p className="eyebrow">{t.ui.follow}</p>
          <h2>Rogex Laboratories</h2>
          <p>{t.footer}</p>
        </div>

        <div className="contact-actions">
          <a href="mailto:rogernav06@gmail.com">
            <Mail size={18} /> {t.contact.email}
          </a>
          {socialLinks.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              <img src={link.icon} alt="" /> {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function Footer({ t, navigate }) {
  return (
    <footer className="site-footer">
      <InternalLink href="/" navigate={navigate} className="brand footer-brand" aria-label="Rogex Laboratories home">
        <img src={logo} alt="Rogex Laboratories logo" />
        <span>
          <strong>ROGEX</strong>
          <small>LABORATORIES</small>
        </span>
      </InternalLink>

      <p>
        {t.footer}
        <br />
        <span>© 2026 Rogex Laboratories. All rights reserved.</span>
      </p>

      <div className="footer-links">
        {socialLinks.map((link) => (
          <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
            <img src={link.icon} alt="" />
            {link.label}
          </a>
        ))}
      </div>
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
    if (key === 'methods') return <MethodsPage t={t} />;
    if (key === 'collaborations') return <CollaborationsPage t={t} />;
    if (key === 'notes') return <NotesPage t={t} />;
    if (key === 'contact') return <ContactPage t={t} />;

    return <Home t={t} navigate={navigate} />;
  }, [path, t, navigate]);

  return (
    <div className="page-shell">
      <Header lang={lang} setLang={setLang} navigate={navigate} t={t} />
      <main>{page}</main>
      <Footer t={t} navigate={navigate} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
