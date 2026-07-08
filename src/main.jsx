import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Brain,
  Globe2,
  HeartHandshake,
  Radio,
  ShieldCheck,
  Sparkles,
  Waves,
} from 'lucide-react';
import './styles.css';
import { fallbackPosts, localeNames, locales, metrics, products, roadmap, socialLinks, t } from './data/content.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error('Rogex render error:', error);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="render-error">
          <h1>Rogex Laboratories</h1>
          <p>Frontend render error.</p>
          <pre>{String(this.state.error?.message || this.state.error)}</pre>
        </main>
      );
    }

    return this.props.children;
  }
}

const DONATION_URL = 'https://www.paypal.com/ncp/payment/WWL8SE2XGSZNA';
const CONTACT_EMAIL = 'roger@rogexlaboratories.com';
const X_PROFILE_URL = 'https://x.com/rogexlabs';

const routeMap = [
  ['/', 0],
  ['/prisma', 1],
  ['/rogexos', 2],
  ['/moscovium', 3],
  ['/roadmap', 4],
  ['/science', 5],
  ['/collaborate', 6],
  ['/donate', 7],
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
    .replace(/```[\s\S]*?```/g, '')
    .trim();
}

function Header({ locale, setLocale, path, navigate, copy }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand reset-button" onClick={() => navigate('/')}>
          <span className="brand-mark">RX</span>
          <span>
            <span className="brand-title">Rogex Laboratories</span>
            <span className="brand-subtitle">{copy.brandSubtitle}</span>
          </span>
        </button>

        <nav className="nav" aria-label="Main navigation">
          {routeMap.map(([href, labelIndex]) => (
            <button
              key={href}
              className={path === href ? 'active reset-button' : 'reset-button'}
              onClick={() => navigate(href)}
            >
              {copy.nav[labelIndex]}
            </button>
          ))}
        </nav>

        <div className="langs" aria-label="Language">
          {locales.map((item) => (
            <button
              key={item}
              className={locale === item ? 'active' : ''}
              onClick={() => setLocale(item)}
            >
              {localeNames[item]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function HeroDevice({ copy }) {
  const side = copy.appSidebar || ['PRISMA', 'ROGEXOS', 'MOSCOVIUM', 'NAVI'];

  return (
    <div className="device">
      <div className="device-screen">
        <div className="device-top">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="address">{copy.appProtocol}</span>
        </div>

        <div className="desktop">
          <aside className="sidebar">
            {side.map((item, idx) => (
              <div className={idx === 0 ? 'side-item active' : 'side-item'} key={item}>
                <span>{item}</span>
                <span>0{idx + 1}</span>
              </div>
            ))}
          </aside>

          <main className="app-grid">
            <section className="app-window">
              <div className="app-title"><span>{copy.appSignal}</span><span>84.2%</span></div>
              <div className="app-body"><div className="wave" /></div>
            </section>

            <section className="app-window">
              <div className="app-title"><span>{copy.appBaseline}</span><span>+12.7</span></div>
              <div className="app-body">
                <div className="mini-bars">
                  <span style={{ height: '34%' }} />
                  <span style={{ height: '72%' }} />
                  <span style={{ height: '46%' }} />
                  <span style={{ height: '86%' }} />
                  <span style={{ height: '61%' }} />
                </div>
              </div>
            </section>

            <section className="app-window">
              <div className="app-title"><span>{copy.appStatus}</span><span>RX</span></div>
              <div className="app-body terminal">
                <p>&gt; load DS007358</p>
                <p>&gt; normalize subject baseline</p>
                <p>&gt; export reproducible report</p>
              </div>
            </section>

            <section className="app-window">
              <div className="app-title"><span>{copy.appReport}</span><span>NAVI</span></div>
              <div className="app-body">
                <p className="device-copy">{copy.scientificBoundary}</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function MetricGrid({ locale }) {
  return (
    <section className="container metric-cards">
      {metrics(locale).map((item) => (
        <article className="metric-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.note}</p>
        </article>
      ))}
    </section>
  );
}

function ProductSection({ locale, copy }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{copy.productsTitle}</span>
            <h2 className="h2">{copy.productsTitle}</h2>
          </div>
          <p>{copy.productsText}</p>
        </div>

        <div className="product-list">
          {products(locale).map((product) => (
            <article className="product-card" key={product.id}>
              <div className={`product-visual product-${product.id}`}>
                <span className="ai-note">{copy.aiNote}</span>
              </div>

              <div className="product-main">
                <span className="status">{product.eyebrow} · {product.status}</span>
                <h3>{product.title}</h3>
                <p>{product.text}</p>
              </div>

              <div className="fact-list">
                {product.facts.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScienceBlock({ copy }) {
  return (
    <section className="section science-section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{copy.scienceKicker}</span>
            <h2 className="h2">{copy.scienceTitle}</h2>
          </div>
          <p>{copy.scienceIntro}</p>
        </div>

        <div className="science-grid">
          {copy.scienceCards.map(([title, text]) => (
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

function Home({ locale, copy, navigate }) {
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
                {copy.ctaPrimary} <ArrowRight size={16} />
              </button>
              <a className="btn donate" href={DONATION_URL} target="_blank" rel="noreferrer">
                {copy.ctaDonate}
              </a>
              <button className="btn" onClick={() => navigate('/donate')}>{copy.ctaSecondary}</button>
            </div>

            <div className="sales-note">{copy.salesHome}</div>
          </div>

          <HeroDevice copy={copy} />
        </div>
      </section>

      <MetricGrid locale={locale} />
      <ProductSection locale={locale} copy={copy} />
      <ScienceBlock copy={copy} />
    </>
  );
}

function Prisma({ locale, copy }) {
  return (
    <>
      <section className="section">
        <div className="container deep-section">
          <span className="eyebrow">{copy.prismaKicker}</span>
          <h1 className="h1">{copy.prismaTitle}</h1>
          <p className="lead">{copy.prismaLead}</p>
          <div className="sales-note">{copy.salesNote}</div>
        </div>
      </section>

      <MetricGrid locale={locale} />

      <section className="section">
        <div className="container science-grid">
          {copy.prismaMini.map(([title, text]) => (
            <article className="science-card" key={title}>
              <Brain size={28} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function RogexOS({ copy }) {
  return (
    <section className="section">
      <div className="container split">
        <div className="panel">
          <ShieldCheck size={34} />
          <h1 className="h1" style={{ marginTop: 18 }}>{copy.rogexosTitle}</h1>
          <p className="lead">{copy.rogexosLead}</p>
        </div>

        <div className="science-grid stacked">
          {copy.rogexosCards.map(([title, text]) => (
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

function Moscovium({ copy }) {
  return (
    <section className="section">
      <div className="container deep-section">
        <span className="eyebrow">{copy.moscoviumKicker}</span>
        <h1 className="h1">{copy.moscoviumTitle}</h1>
        <p className="lead">{copy.moscoviumLead}</p>

        <div className="actions">
          <button className="btn primary">SDR</button>
          <button className="btn">RF</button>
          <button className="btn">EEG sync</button>
          <button className="btn">controls</button>
        </div>
      </div>
    </section>
  );
}

function Roadmap({ locale, copy }) {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">{copy.roadmapKicker}</span>
        <h1 className="h1">{copy.roadmapTitle}</h1>

        <div className="roadmap">
          {roadmap(locale).map(([title, text], idx) => (
            <article className="road-item" key={title}>
              <span className="road-number">{idx + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Science({ copy }) {
  return <ScienceBlock copy={copy} />;
}

function XPosts({ locale, copy }) {
  const [posts, setPosts] = useState(fallbackPosts[locale] || fallbackPosts.en);
  const [source, setSource] = useState('fallback');

  useEffect(() => {
    let cancelled = false;

    fetch('/api/x-posts')
      .then((response) => {
        if (!response.ok) throw new Error('x api unavailable');
        return response.json();
      })
      .then((payload) => {
        if (cancelled) return;
        if (Array.isArray(payload.posts) && payload.posts.length > 0) {
          setPosts(payload.posts);
          setSource(payload.source || 'api');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPosts(fallbackPosts[locale] || fallbackPosts.en);
          setSource('fallback');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <div className="x-api-panel">
      {source === 'fallback' && <p className="api-note">{copy.xFallback}</p>}
      <div className="post-list">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <p>{post.text}</p>
            <div>
              <span>{post.created_at ? String(post.created_at).slice(0, 10) : '@rogexlabs'}</span>
              <a href={post.url || X_PROFILE_URL} target="_blank" rel="noreferrer">{copy.openX}</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Collaborate({ locale, copy }) {
  return (
    <section className="section">
      <div className="container split">
        <div className="panel">
          <HeartHandshake size={34} />
          <h2 className="h2" style={{ marginTop: 18 }}>{copy.collaborateTitle}</h2>
          <p style={{ marginTop: 18 }}>{copy.collaborateText}</p>

          <div className="sales-note">{copy.salesNote}</div>

          <div className="actions">
            <a className="btn donate" href={DONATION_URL} target="_blank" rel="noreferrer">{copy.ctaDonate}</a>
            <a className="btn" href={`mailto:${CONTACT_EMAIL}`}>{copy.propose}</a>
          </div>
        </div>

        <div className="panel x-panel">
          <Globe2 size={34} />
          <h2 className="h3" style={{ marginTop: 18 }}>{copy.publicSignalTitle}</h2>
          <p style={{ marginTop: 14 }}>{copy.publicSignalText}</p>
          <XPosts locale={locale} copy={copy} />
        </div>
      </div>
    </section>
  );
}

function Donate({ locale, copy }) {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">{copy.donateKicker}</span>
          <h1 className="h1">{copy.donateTitle}</h1>
          <p className="lead">{copy.donateLead}</p>
          <div className="actions">
            <a className="btn donate" href={DONATION_URL} target="_blank" rel="noreferrer">{copy.ctaDonate}</a>
            <a className="btn" href={`mailto:${CONTACT_EMAIL}`}>{copy.contact}</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="panel paypal-panel">
            <h2 className="h3">{copy.prismaSalesTitle}</h2>
            <p style={{ marginTop: 16 }}>{copy.prismaSalesText1}</p>
            <p style={{ marginTop: 12 }}>{copy.prismaSalesText2}</p>
            <div className="actions">
              <a className="btn donate" href={DONATION_URL} target="_blank" rel="noreferrer">{copy.supportBeforeLaunch}</a>
            </div>
          </div>

          <div className="panel x-panel">
            <h2 className="h3">{copy.publicProgressTitle}</h2>
            <p style={{ marginTop: 16 }}>{copy.publicProgressText}</p>
            <XPosts locale={locale} copy={copy} />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container science-grid">
          {copy.donateBuckets.map(([title, text]) => (
            <article className="science-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <a className="btn donate" style={{ marginTop: 20 }} href={DONATION_URL} target="_blank" rel="noreferrer">{copy.ctaDonate}</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function NaviChat({ locale, copy }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  async function ask(value) {
    const finalQuestion = value || question;
    if (!finalQuestion.trim()) return;

    setOpen(true);
    setQuestion(finalQuestion);
    setLoading(true);
    setReply(copy.chatLoading);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: finalQuestion, locale }),
      });

      const data = await response.json();
      setReply(cleanMarkdown(data.reply || copy.chatError));
    } catch {
      setReply(copy.chatError);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button className="chat-button" onClick={() => setOpen(true)}>
        <span className="lynx" aria-hidden="true" />
        <span>
          <strong>Navi / Nivalynx</strong>
          <span>{copy.mascotBubble}</span>
        </span>
      </button>
    );
  }

  return (
    <aside className="chat-panel">
      <div className="chat-head">
        <span className="lynx" aria-hidden="true" />
        <div>
          <h3>Navi / Nivalynx</h3>
          <p>{copy.mascotBubble}</p>
        </div>
        <button className="chat-close" onClick={() => setOpen(false)}>×</button>
      </div>

      <div className="chat-body">
        <div className="quick-grid">
          {copy.quick.map((item) => (
            <button key={item} onClick={() => ask(item)}>{item}</button>
          ))}
        </div>

        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={copy.askPlaceholder}
        />

        <div className="chat-row">
          <button className="btn primary" onClick={() => ask()} disabled={loading}>
            {copy.askButton}
          </button>
          <span className="brand-subtitle">plain text</span>
        </div>

        {reply && <div className="chat-reply">{reply}</div>}
      </div>
    </aside>
  );
}

function Footer({ copy }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Rogex Laboratories</h3>
          <p>{copy.footerTagline}</p>
          <div className="socials">
            {socialLinks.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>
            ))}
          </div>
        </div>
        <div>
          <h3>{copy.footerContactTitle}</h3>
          <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          <p><a href={DONATION_URL} target="_blank" rel="noreferrer">PayPal</a></p>
        </div>
        <div>
          <h3>{copy.footerBoundaryTitle}</h3>
          <p>{copy.footerBoundary}</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [path, navigate] = useRoute();
  const [locale, setLocale] = useState(() => localStorage.getItem('rogex-locale') || 'en');

  useEffect(() => {
    localStorage.setItem('rogex-locale', locale);
  }, [locale]);

  const copy = useMemo(() => t(locale), [locale]);

  let page = <Home locale={locale} copy={copy} navigate={navigate} />;
  if (path === '/prisma') page = <Prisma locale={locale} copy={copy} />;
  if (path === '/rogexos') page = <RogexOS copy={copy} />;
  if (path === '/moscovium') page = <Moscovium copy={copy} />;
  if (path === '/roadmap') page = <Roadmap locale={locale} copy={copy} />;
  if (path === '/science') page = <Science copy={copy} />;
  if (path === '/collaborate') page = <Collaborate locale={locale} copy={copy} />;
  if (path === '/donate') page = <Donate locale={locale} copy={copy} />;

  return (
    <>
      <Header locale={locale} setLocale={setLocale} path={path} navigate={navigate} copy={copy} />
      {page}
      <Footer copy={copy} />
      <NaviChat locale={locale} copy={copy} />
    </>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  rootElement.dataset.reactMounted = 'true';
  rootElement.innerHTML = '';
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
