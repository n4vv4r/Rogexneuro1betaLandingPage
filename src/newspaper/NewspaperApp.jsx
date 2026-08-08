import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Mail, Newspaper, Rss } from 'lucide-react';
import './newspaper.css';

const NEWSPAPER_HOST = 'newspaper.rogexlaboratories.com';
const LAB_URL = 'https://www.rogexlaboratories.com';
const NP_SITE = 'https://newspaper.rogexlaboratories.com';
const OG_NEWSPAPER = `${LAB_URL}/og/newspaper.png`;
const OG_ARTICLE = `${LAB_URL}/og/newspaper-article.png`;

function setMeta(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function applyNewspaperOg({ title, description, url, image, imageAlt }) {
  document.title = title;
  setMeta('name', 'description', description);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'Rogex Newspaper');
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:image:type', 'image/png');
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:image:alt', imageAlt);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', image);
  setMeta('name', 'twitter:image:alt', imageAlt);
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
}

function isNewspaperHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  return h === NEWSPAPER_HOST || h.startsWith('newspaper.');
}

/** basePath: '' on subdomain, '/newspaper' on main domain */
export function getNewspaperBasePath() {
  return isNewspaperHost() ? '' : '/newspaper';
}

export function shouldMountNewspaper(path) {
  return isNewspaperHost() || path === '/newspaper' || path.startsWith('/newspaper/');
}

function useNewspaperRoute(basePath) {
  const read = () => {
    const raw = window.location.pathname.replace(/\/$/, '') || '/';
    if (!basePath) {
      if (raw === '/' || raw === '') return { view: 'home', slug: null };
      const slug = raw.replace(/^\//, '').split('/')[0];
      if (slug === 'feed.xml') return { view: 'home', slug: null };
      return { view: 'article', slug };
    }
    if (raw === basePath || raw === `${basePath}/`) return { view: 'home', slug: null };
    if (raw.startsWith(`${basePath}/`)) {
      const slug = raw.slice(basePath.length + 1).split('/')[0];
      return { view: 'article', slug };
    }
    return { view: 'home', slug: null };
  };

  const [route, setRoute] = useState(read);

  useEffect(() => {
    const onPop = () => setRoute(read());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [basePath]);

  const navigate = (to) => {
    let next;
    if (to === '/' || to === '') {
      next = basePath || '/';
    } else if (to.startsWith('/')) {
      next = basePath ? `${basePath}${to}` : to;
    } else {
      next = basePath ? `${basePath}/${to}` : `/${to}`;
    }
    window.history.pushState({}, '', next);
    setRoute(read());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [route, navigate];
}

async function fetchArticlesIndex() {
  const res = await fetch('/newspaper/articles.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudo cargar el índice');
  return res.json();
}

async function fetchArticle(slug) {
  const res = await fetch(`/newspaper/articles/${encodeURIComponent(slug)}.json`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Artículo no encontrado');
  return res.json();
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('es', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(`${iso}T12:00:00`));
  } catch {
    return iso;
  }
}

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });
    try {
      const res = await fetch('/api/newspaper/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus({
          type: 'error',
          message: data.message || 'No se pudo suscribir. Prueba el RSS mientras tanto.',
        });
      } else {
        setStatus({
          type: 'ok',
          message: data.message || 'Suscripción activa.',
        });
        setEmail('');
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Error de red. Puedes usar el feed RSS: /feed.xml',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="np-subscribe" onSubmit={submit} noValidate>
      <label className="np-label" htmlFor="np-email">
        Correo para despachos nuevos
      </label>
      <div className="np-subscribe-row">
        <input
          id="np-email"
          className="np-input"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        {/* honeypot */}
        <input
          className="np-hp"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          aria-hidden
        />
        <button className="np-btn np-btn-primary" type="submit" disabled={loading}>
          <Mail size={16} strokeWidth={2} />
          {loading ? 'Enviando…' : 'Suscribirme'}
        </button>
      </div>
      {status.message && (
        <p className={`np-status np-status-${status.type}`} role="status">
          {status.message}
        </p>
      )}
      <p className="np-fine">
        Sin spam. Un correo por artículo publicado. Baja en un clic desde cada despacho.
      </p>
    </form>
  );
}

function UnsubscribeBanner({ token, onDone }) {
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      setState('loading');
      try {
        const res = await fetch('/api/newspaper/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok && data.ok) {
          setState('ok');
          setMessage(data.message || 'Suscripción cancelada.');
        } else {
          setState('error');
          setMessage(data.message || 'No se pudo cancelar la suscripción.');
        }
      } catch {
        if (!cancelled) {
          setState('error');
          setMessage('Error de red al cancelar.');
        }
      } finally {
        onDone?.();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (!token) return null;
  return (
    <div className={`np-unsub np-unsub-${state}`}>
      {state === 'loading' && <p>Cancelando suscripción…</p>}
      {state !== 'loading' && <p>{message}</p>}
    </div>
  );
}

function ArticleCard({ article, onOpen }) {
  return (
    <article className="np-card">
      <button type="button" className="np-card-btn" onClick={() => onOpen(article.slug)}>
        <div className="np-card-meta">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          {article.tags?.length > 0 && (
            <span className="np-tags">
              {article.tags.slice(0, 3).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </span>
          )}
        </div>
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
        <span className="np-read">
          Leer despacho <ArrowUpRight size={15} />
        </span>
      </button>
    </article>
  );
}

function HomeView({ articles, loading, error, navigate }) {
  const rssHref = isNewspaperHost() ? '/feed.xml' : '/newspaper/feed.xml';

  return (
    <>
      <header className="np-masthead">
        <div className="np-masthead-top">
          <span className="np-edition">EDICIÓN DIGITAL · AVANCES DEL LAB</span>
          <a className="np-lab-link" href={LAB_URL}>
            rogexlaboratories.com <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="np-masthead-main">
          <Newspaper size={36} strokeWidth={1.35} className="np-mark" />
          <div>
            <p className="np-kicker">KNIGHTS LABS / ROGEX LABORATORIES</p>
            <h1>ROGEX NEWSPAPER</h1>
            <p className="np-lead">
              Despachos sobre PRISMA, RXos y neurotech low-carbon. Experimental, no clínico.
              Suscríbete por correo o RSS.
            </p>
          </div>
        </div>
      </header>

      <section className="np-rail">
        <div className="np-rail-subscribe">
          <h2>Recibe cada artículo</h2>
          <SubscribeForm />
        </div>
        <div className="np-rail-rss">
          <Rss size={28} strokeWidth={1.5} />
          <div>
            <h2>También por RSS</h2>
            <p>
              Añade el feed a Feedly, NetNewsWire, Miniflux u otro lector. Misma fuente que el
              correo, sin cuenta.
            </p>
            <a className="np-btn" href={rssHref}>
              <Rss size={15} /> Abrir feed.xml
            </a>
            <code className="np-feed-url">
              {isNewspaperHost()
                ? 'https://newspaper.rogexlaboratories.com/feed.xml'
                : 'https://www.rogexlaboratories.com/newspaper/feed.xml'}
            </code>
          </div>
        </div>
      </section>

      <section className="np-list-section">
        <div className="np-section-head">
          <h2>Últimos despachos</h2>
          <span>{articles.length} artículo{articles.length === 1 ? '' : 's'}</span>
        </div>
        {loading && <p className="np-muted">Cargando…</p>}
        {error && <p className="np-status np-status-error">{error}</p>}
        {!loading && !error && articles.length === 0 && (
          <p className="np-muted">Aún no hay artículos publicados.</p>
        )}
        <div className="np-grid">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} onOpen={(slug) => navigate(slug)} />
          ))}
        </div>
      </section>
    </>
  );
}

function ArticleView({ slug, navigate }) {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    fetchArticle(slug)
      .then((data) => {
        if (!cancelled) setArticle(data);
      })
      .catch(() => {
        if (!cancelled) setError('Artículo no encontrado.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    const url = isNewspaperHost()
      ? `${NP_SITE}/${article.slug}`
      : `${LAB_URL}/newspaper/${article.slug}`;
    applyNewspaperOg({
      title: `${article.title} — Rogex Newspaper`,
      description: article.summary || article.title,
      url,
      image: OG_ARTICLE,
      imageAlt: article.title,
    });
  }, [article]);

  if (loading) {
    return <p className="np-muted np-pad">Cargando despacho…</p>;
  }
  if (error || !article) {
    return (
      <div className="np-pad">
        <p className="np-status np-status-error">{error || 'No encontrado'}</p>
        <button type="button" className="np-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={15} /> Volver al periódico
        </button>
      </div>
    );
  }

  return (
    <article className="np-article">
      <button type="button" className="np-back" onClick={() => navigate('/')}>
        <ArrowLeft size={15} /> Todos los despachos
      </button>
      <header className="np-article-header">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <h1>{article.title}</h1>
        <p className="np-article-by">{article.author}</p>
        {article.tags?.length > 0 && (
          <div className="np-tags">
            {article.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </header>
      <div className="np-article-body" dangerouslySetInnerHTML={{ __html: article.html }} />
      <footer className="np-article-foot">
        <p>
          Publicado en Rogex Newspaper ·{' '}
          <a href={LAB_URL}>Knights Labs / Rogex Laboratories</a>
        </p>
        <p className="np-fine">
          PRISMA es software experimental de investigación. No es un dispositivo médico ni software
          de diagnóstico.
        </p>
      </footer>
    </article>
  );
}

export default function NewspaperApp() {
  const basePath = useMemo(() => getNewspaperBasePath(), []);
  const [route, navigate] = useNewspaperRoute(basePath);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unsubToken, setUnsubToken] = useState(null);

  useEffect(() => {
    document.documentElement.classList.add('np-root');
    document.body.classList.add('np-body');

    const feedHref = isNewspaperHost()
      ? `${NP_SITE}/feed.xml`
      : `${LAB_URL}/newspaper/feed.xml`;
    let feed = document.head.querySelector('link[rel="alternate"][type="application/rss+xml"]');
    if (!feed) {
      feed = document.createElement('link');
      feed.setAttribute('rel', 'alternate');
      feed.setAttribute('type', 'application/rss+xml');
      feed.setAttribute('title', 'Rogex Newspaper');
      document.head.appendChild(feed);
    }
    feed.setAttribute('href', feedHref);

    return () => {
      document.documentElement.classList.remove('np-root');
      document.body.classList.remove('np-body');
    };
  }, []);

  useEffect(() => {
    // Home OG when not viewing an article (article view sets its own)
    if (route.view === 'article' && route.slug) return;
    applyNewspaperOg({
      title: 'Rogex Newspaper — avances del lab',
      description:
        'Despachos sobre PRISMA, RXos y neurotech low-carbon. Suscríbete por correo o RSS. Experimental, no clínico.',
      url: isNewspaperHost() ? `${NP_SITE}/` : `${LAB_URL}/newspaper`,
      image: OG_NEWSPAPER,
      imageAlt: 'Rogex Newspaper — email and RSS advances',
    });
  }, [route.view, route.slug]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('unsubscribe');
    if (t) setUnsubToken(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchArticlesIndex()
      .then((data) => {
        if (!cancelled) setArticles(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setError('No se pudieron cargar los artículos.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const clearUnsubParam = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('unsubscribe');
    window.history.replaceState({}, '', url.pathname + url.search);
  };

  return (
    <div className="np-app">
      <div className="np-wrap">
        {unsubToken && (
          <UnsubscribeBanner token={unsubToken} onDone={clearUnsubParam} />
        )}
        {route.view === 'article' && route.slug ? (
          <ArticleView slug={route.slug} navigate={navigate} />
        ) : (
          <HomeView
            articles={articles}
            loading={loading}
            error={error}
            navigate={navigate}
          />
        )}
      </div>
      <footer className="np-site-footer">
        <div className="np-wrap np-footer-inner">
          <span>© {new Date().getFullYear()} Rogex Newspaper · Knights Labs</span>
          <div className="np-footer-links">
            <a href={isNewspaperHost() ? '/feed.xml' : '/newspaper/feed.xml'}>RSS</a>
            <a href={LAB_URL}>Lab principal</a>
            <a href={`${LAB_URL}/about`}>Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
