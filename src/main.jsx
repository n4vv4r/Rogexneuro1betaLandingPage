import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  Brain,
  Cpu,
  Database,
  Globe2,
  HeartHandshake,
  Radio,
  ShieldCheck,
  Sparkles,
  Waves,
} from 'lucide-react';
import './styles.css';
import { localeNames, locales, metrics, products, roadmap, socialLinks, t } from './data/content.js';

const DONATION_URL = 'https://www.paypal.com/ncp/payment/WWL8SE2XGSZNA';
const X_PROFILE_URL = 'https://x.com/rogexlabs';

const routeMap = [
  ['/', 'Inicio'],
  ['/prisma', 'PRISMA'],
  ['/rogexos', 'RogexOS'],
  ['/moscovium', 'Moscovium'],
  ['/roadmap', 'Roadmap'],
  ['/science', 'Ciencia'],
  ['/collaborate', 'Colaborar'],
  ['/donate', 'Donar'],
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);

  const navigate = (href) => {
    window.history.pushState({}, '', href);
    setPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [path, navigate];
}

function cleanMarkdown(text) {
  return String(text || '')
    .replaceAll('**', '')
    .replaceAll('###', '')
    .replaceAll('##', '')
    .replaceAll('#', '')
    .replaceAll('`', '')
    .replace(/^\s*[-*]\s+/gm, '')
    .trim();
}

function Header({ path, navigate, locale, setLocale }) {
  const copy = t(locale);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="brand" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <div className="brand-mark">R</div>
          <div>
            <span className="brand-title">Rogex Laboratories</span>
            <span className="brand-subtitle">Industrial Research Infrastructure</span>
          </div>
        </a>

        <nav className="nav">
          {routeMap.map(([href, fallback], index) => (
            <a
              key={href}
              href={href}
              className={path === href ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); navigate(href); }}
            >
              {copy.nav[index] || fallback}
            </a>
          ))}
        </nav>

        <div className="langs">
          {locales.map((item) => (
            <button key={item} className={locale === item ? 'active' : ''} onClick={() => setLocale(item)}>
              {localeNames[item]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function HeroDevice({ copy }) {
  return (
    <div className="device" aria-label="RogexOS interface concept">
      <div className="device-screen">
        <div className="device-top">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <div className="address">rgx://rogex.social/research</div>
        </div>

        <div className="desktop">
          <aside className="sidebar">
            {['Home', 'PRISMA', 'Moscovium', 'Studio', 'Navi'].map((item, idx) => (
              <div className={`side-item ${idx === 1 ? 'active' : ''}`} key={item}>
                <span>{item}</span>
                {idx === 1 && <span>●</span>}
              </div>
            ))}
          </aside>

          <div className="app-grid">
            <div className="app-window">
              <div className="app-title">
                <span>PRISMA Spectrum</span>
                <span>LIVE</span>
              </div>
              <div className="app-body">
                <div className="wave" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                  <MiniStat label="Normalized LOSO" value="84.2%" />
                  <MiniStat label="Gain" value="+12.7 pts" />
                </div>
              </div>
            </div>

            <div className="app-window">
              <div className="app-title">
                <span>Nivalynx</span>
                <span>Navi</span>
              </div>
              <div className="app-body">
                <p style={{ color: '#e7eee7', fontWeight: 800, lineHeight: 1.45 }}>{copy.mascotBubble}</p>
                <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
                  {['Productos', 'Roadmap', 'Colaborar'].map((item) => (
                    <span key={item} style={{ borderRadius: 14, background: 'rgba(255,255,255,.10)', padding: '10px 12px', fontSize: 13, fontWeight: 800 }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="app-window">
              <div className="app-title">
                <span>RGX Browser</span>
                <span>rgx://</span>
              </div>
              <div className="app-body">
                <p style={{ color: '#e7eee7', fontSize: 14, lineHeight: 1.6 }}>
                  An industrial app and social layer for research notes, signed apps, simulations and reproducible reports.
                </p>
              </div>
            </div>

            <div className="app-window">
              <div className="app-title">
                <span>Moscovium</span>
                <span>SDR</span>
              </div>
              <div className="app-body">
                <div className="wave" style={{ height: 80 }} />
                <p style={{ marginTop: 12, color: '#a9b2aa', fontSize: 13 }}>RF spectrum · noise lab · PRISMA sync</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={{ borderRadius: 16, background: 'rgba(255,255,255,.10)', padding: 12 }}>
      <span style={{ color: '#a9b2aa', fontSize: 11, fontWeight: 850, textTransform: 'uppercase' }}>{label}</span>
      <strong style={{ display: 'block', marginTop: 5, fontSize: 24, letterSpacing: '-.04em' }}>{value}</strong>
    </div>
  );
}

function MetricGrid() {
  return (
    <section className="container metric-cards">
      {metrics.map((metric) => (
        <article className="metric-card" key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <p>{metric.note}</p>
        </article>
      ))}
    </section>
  );
}

function ProductSection({ locale }) {
  const copy = t(locale);
  const data = products(locale);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{copy.productsTitle}</span>
            <h2 className="h2">{copy.ecosystem}</h2>
          </div>
          <p>{copy.productsText}</p>
        </div>

        <div className="product-list">
          {data.map((product) => (
            <article className="product-card" key={product.id} id={product.id}>
              <div className="product-visual">
                <span className="ai-note">Illustration made with AI</span>
              </div>
              <div className="product-main">
                <span className="status">{product.status}</span>
                <h3>{product.name}</h3>
                <p>{product.text}</p>
              </div>
              <div className="fact-list">
                {product.facts.map((fact) => <span key={fact}>{fact}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home({ locale, navigate }) {
  const copy = t(locale);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">{copy.heroKicker}</span>
            <h1 className="h1">{copy.heroTitle}</h1>
            <p className="lead">{copy.heroText}</p>
            <p className="sublead">{copy.heroSecondary}</p>

            <div className="actions">
              <button className="btn primary" onClick={() => navigate('/prisma')}>
                {copy.ctaPrimary} <ArrowRight size={16} style={{ marginLeft: 8 }} />
              </button>
              <button className="btn donate" onClick={() => window.open(DONATION_URL, '_blank', 'noopener,noreferrer')}>Donate via PayPal</button>
              <button className="btn" onClick={() => navigate('/donate')}>{copy.ctaSecondary}</button>
            </div>

            <div className="sales-note">
              PRISMA 3 sales will open soon for researchers or qualified interested users. It will not be sold to everyone automatically. Price is not decided yet.
            </div>
          </div>

          <HeroDevice copy={copy} />
        </div>
      </section>

      <MetricGrid />

      <section className="section">
        <div className="container">
          <div className="deep-section">
            <span className="eyebrow" style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.14)' }}>
              {copy.scientificBoundary / Access}
            </span>
            <h2 className="h2" style={{ marginTop: 24 }}>Model the person before interpreting the state.</h2>
            <p className="lead" style={{ color: 'rgba(255,255,255,.72)' }}>
              The central PRISMA idea is that EEG should be interpreted relative to each subject’s own baseline, uncertainty and signal quality profile.
            </p>
          </div>
        </div>
      </section>

      <ProductSection locale={locale} />
      <Roadmap />
      <Science />
      <Collaborate />
    </>
  );
}

function Prisma({ locale }) {
  const copy = t(locale);
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">PRISMA 3 · Real EEG</span>
              <h1 className="h1">Subject-normalized EEG decoding.</h1>
            </div>
            <p>PRISMA 3 is the real public anchor of Rogex Laboratories today: experimental EEG research software with a real validation appendix and explicit scientific boundaries.</p>
          </div>
          <MetricGrid />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="panel">
            <Brain size={32} />
            <h2 className="h3" style={{ marginTop: 18 }}>Pipeline</h2>
            <p style={{ marginTop: 14 }}>EEG input → preprocessing → windows → features → personal baseline → individual translator → uncertainty/confidence → ML evaluation → explainable report.</p>
          </div>
          <div className="panel">
            <ShieldCheck size={32} />
            <h2 className="h3" style={{ marginTop: 18 }}>Boundary / Access</h2>
            <p style={{ marginTop: 14 }}>{copy.scientificBoundary / Access}</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Evidence layers</span>
              <h2 className="h2">Implemented, but interpreted responsibly.</h2>
            </div>
            <p>PRISMA separates synthetic demonstration, real EEG ingestion, real ec/eo validation and clinical claims. Clinical claims are not made.</p>
          </div>
          <div className="science-grid">
            {[
              ['Synthetic demo', 'Implemented; validates simulator and pipeline mechanics, not clinical EEG performance.'],
              ['Real EEG ingestion', 'Implemented through CSV, MNE-compatible files and EEGDash/OpenNeuro pathways.'],
              ['Real ec/eo appendix', 'Implemented on DS007358 with LOSO across 28 subjects.'],
            ].map(([title, text]) => (
              <article className="science-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function RogexOS() {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">RogexOS · Catalonian · rgx://</span>
          <h1 className="h1">A system for the lab, not just a landing page.</h1>
          <p className="lead">RogexOS is the future environment around PRISMA: Rogex Studio, Navi, Roxenite/RX-C, RXIR, RGX Protocol, Drive, server mode, app signing and the future rgx:// ecosystem.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container science-grid">
          {[
            ['Catalonian / RXos', 'The kernel identity and future open foundation for RogexOS and Catalonian-based systems.'],
            ['Roxenite / RX-C', 'A native language for human-readable apps, rgx:// pages and scientific components.'],
            ['RGX Protocol', 'Routes, RP identity, package trust and future server/social infrastructure.'],
            ['Rogex Studio', 'The developer and research environment for RX-C, Python bridges, docs, experiments and builds.'],
            ['Navi', 'The local-first assistant vision: explain, guide, summarize, debug and help publish.'],
            ['Rogex Server', 'Future native hosting for rgx:// routes, apps, docs, PRISMA packages and lab nodes.'],
          ].map(([title, text]) => (
            <article className="science-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Moscovium() {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">MOSCOVIUM · PRISMA v5+</span>
          <h1 className="h1">A spectral lab for what we normally do not perceive.</h1>
          <p className="lead">Moscovium should extend PRISMA into SDR, RF spectrum, environmental noise and synchronized biosignals. The scientific tone must stay careful: search for reproducible patterns, not magical claims.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="panel">
            <Radio size={32} />
            <h2 className="h3" style={{ marginTop: 18 }}>What it studies</h2>
            <p style={{ marginTop: 14 }}>SDR waterfall, RF events, environmental noise, shielding/ferrite changes, hardware artifacts and time-aligned PRISMA EEG features.</p>
          </div>
          <div className="panel">
            <Waves size={32} />
            <h2 className="h3" style={{ marginTop: 18 }}>What it avoids</h2>
            <p style={{ marginTop: 14 }}>It should not claim emotion-reading through radio. It should present hypotheses, controls, baselines and reproducible reports.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Roadmap() {
  return (
    <section className="section">
      <div className="container">
        <div className="deep-section">
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.14)' }}>Updated roadmap</span>
          <h2 className="h2" style={{ marginTop: 24 }}>A future ecosystem, ordered by proof.</h2>
          <div className="roadmap">
            {roadmap.map(([title, text], index) => (
              <article className="road-item" key={title}>
                <div className="road-number">{index + 1}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Science() {
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Science</span>
            <h2 className="h2">Measured language. Real data. No fake claims.</h2>
          </div>
          <p>The strongest version of Rogex is ambitious but clean: reproducible tools, explicit limits, open collaboration and no diagnostic or medical overclaiming.</p>
        </div>

        <div className="science-grid">
          {[
            ['Real validation', 'DS007358, 28 subjects, 3304 windows, ec vs eo, LOSO evaluation.'],
            ['Subject normalization', 'The method models individual baselines rather than treating user variability as noise.'],
            ['Artifact limits', 'Future work should add stronger artifact handling, ICA, confidence intervals and test-retest.'],
            ['Non-diagnostic', 'PRISMA is experimental research software, not a clinical product.'],
            ['Research collaboration', 'The next serious step is external review and reproducibility packages.'],
            ['Moscovium controls', 'SDR experiments need baselines, empty-room controls, dummy loads and sensor synchronization.'],
          ].map(([title, text]) => (
            <article className="science-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Collaborate() {
  return (
    <section className="section">
      <div className="container split">
        <div className="panel">
          <HeartHandshake size={34} />
          <h2 className="h2" style={{ marginTop: 18 }}>Collaborate with a research infrastructure, not a hype page.</h2>
          <p style={{ marginTop: 18 }}>Rogex can accept help from researchers, developers, designers, hardware people, translators and donors while keeping a coherent roadmap.</p>

          <div className="sales-note">
            PRISMA 3 sales will open soon for researchers and qualified interested users. It is not a mass-market product and the price will be decided later.
          </div>

          <div className="actions">
            <a className="btn donate" href={DONATION_URL} target="_blank" rel="noreferrer">Donate via PayPal</a>
            <a className="btn" href="mailto:contact@rogexlaboratories.com">Propose collaboration</a>
          </div>
        </div>

        <div className="panel x-panel">
          <Globe2 size={34} />
          <h2 className="h3" style={{ marginTop: 18 }}>Live public signal</h2>
          <p style={{ marginTop: 14 }}>Optional X embed for posts from @rogexlabs. It keeps the website connected to public progress without making the whole site depend on social media.</p>
          <XTimeline />
        </div>
      </div>
    </section>
  );
}

function Donate() {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">Support / PayPal</span>
          <h1 className="h1">Fund PRISMA validation, RogexOS infrastructure and Moscovium experiments.</h1>
          <p className="lead">Donations support independent development: PRISMA reports, public demos, RogexOS UX, documentation, future SDR hardware and the research path toward PRISMA 4.</p>
          <div className="actions">
            <a className="btn donate" href={DONATION_URL} target="_blank" rel="noreferrer">Donate via PayPal</a>
            <a className="btn" href="mailto:contact@rogexlaboratories.com">Contact Rogex</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="panel paypal-panel">
            <h2 className="h3">PRISMA 3 sales opening soon.</h2>
            <p style={{ marginTop: 16 }}>PRISMA 3 will be offered to researchers or people with a real technical/scientific interest. It is not a casual consumer product and it will not be sold to anyone automatically.</p>
            <p style={{ marginTop: 12 }}>The price is not decided yet. The first focus is clarity, validation, responsible use and collaboration fit.</p>
            <div className="actions">
              <a className="btn donate" href={DONATION_URL} target="_blank" rel="noreferrer">Support before launch</a>
            </div>
          </div>

          <div className="panel x-panel">
            <h2 className="h3">Public progress feed</h2>
            <p style={{ marginTop: 16 }}>Optional embed with posts from x.com/rogexlabs. If X blocks embeds, the fallback link remains visible.</p>
            <XTimeline />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container science-grid">
          {[
            ['PRISMA', 'More datasets, better reports, live EEG path and validation.'],
            ['RogexOS', 'Industrial UI, Studio, rgx:// runtime, Navi and developer experience.'],
            ['Moscovium', 'SDR hardware, baselines, noise lab and reproducible experiments.'],
          ].map(([title, text]) => (
            <article className="science-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <a className="btn donate" style={{ marginTop: 20 }} href={DONATION_URL} target="_blank" rel="noreferrer">Donate</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function XTimeline() {
  useEffect(() => {
    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
      return;
    }

    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="twitter-timeline-wrap">
      <a
        className="twitter-timeline"
        data-height="360"
        data-theme="dark"
        href={X_PROFILE_URL}
      >
        Posts by @rogexlabs
      </a>
      <div className="twitter-fallback">
        <p>If the X embed is blocked by privacy settings or browser extensions, open the profile directly.</p>
        <a className="btn" href={X_PROFILE_URL} target="_blank" rel="noreferrer">Open @rogexlabs</a>
      </div>
    </div>
  );
}

function NaviChat({ locale }) {
  const copy = t(locale);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  async function ask(custom) {
    const outgoing = (custom || message).trim();
    if (!outgoing) return;

    setLoading(true);
    setReply('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: outgoing })
      });
      const data = await res.json();
      setReply(cleanMarkdown(data.reply || 'No reply.'));
      if (!custom) setMessage('');
    } catch {
      setReply('Navi no está conectada en modo local con Vite. En Vercel, configura OPENAI_API_KEY. ¿Quieres ver productos, roadmap o colaboración?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button className="chat-button" onClick={() => setOpen(true)}>
        <div className="lynx" />
        <div>
          <strong>Nivalynx</strong>
          <span>{copy.mascotBubble}</span>
        </div>
      </button>

      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <div className="lynx" />
            <div>
              <h3>Navi / Nivalynx</h3>
              <p>Plain text, short answers, live Rogex memory.</p>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="chat-body">
            <div className="quick-grid">
              {copy.quick.map((q) => <button key={q} onClick={() => ask(q)}>{q}</button>)}
            </div>

            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={copy.askPlaceholder} />
            <div className="chat-row">
              <button className="btn primary" onClick={() => ask()}>{loading ? '...' : copy.askButton}</button>
              <span style={{ color: '#a9b2aa', fontSize: 12, fontWeight: 800 }}>gpt-5.4-mini</span>
            </div>

            {reply && <div className="chat-reply">{reply}</div>}
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Rogex Laboratories</h3>
          <p style={{ marginTop: 12 }}>Industrial research infrastructure for PRISMA, RogexOS, Moscovium, Navi and the future rgx:// ecosystem.</p>
        </div>
        <div>
          <h3>Public links</h3>
          <div className="socials" style={{ marginTop: 12 }}>
            {socialLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}
          </div>
        </div>
        <div>
          <h3>Boundary / Access</h3>
          <p style={{ marginTop: 12 }}>PRISMA is non-diagnostic experimental research software. PRISMA 3 sales open soon for researchers or qualified interested users only.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [path, navigate] = useRoute();
  const [locale, setLocale] = useState(() => localStorage.getItem('rogex-locale') || 'es');

  useEffect(() => {
    localStorage.setItem('rogex-locale', locale);
  }, [locale]);

  const page = useMemo(() => {
    if (path === '/prisma') return <Prisma locale={locale} />;
    if (path === '/rogexos') return <RogexOS />;
    if (path === '/moscovium') return <Moscovium />;
    if (path === '/roadmap') return <Roadmap />;
    if (path === '/science') return <Science />;
    if (path === '/collaborate') return <Collaborate />;
    if (path === '/donate') return <Donate />;
    return <Home locale={locale} navigate={navigate} />;
  }, [path, locale]);

  return (
    <>
      <Header path={path} navigate={navigate} locale={locale} setLocale={setLocale} />
      {page}
      <Footer />
      <NaviChat locale={locale} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
