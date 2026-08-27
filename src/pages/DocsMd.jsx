import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';
import { Markdown } from '../components/Markdown';
import {
  DOC_GROUPS,
  MD_DOCS,
  MD_ORDER,
  docTitle,
  docBlurb,
  docSource,
} from '../content/docs-catalog';

export { MD_DOCS, MD_ORDER };

export function DocsMdHub() {
  const { lang, t } = useI18n();
  useSeo('/docs');
  return (
    <div className="docs-hub">
      <Reveal>
        <span className="kicker">{t('docsPage.kicker')}</span>
        <h1 className="section-title">{t('docsPage.hubTitle')}</h1>
        <p className="section-sub docs-hub-lead">{t('docsPage.hubSub')}</p>
      </Reveal>

      <Reveal>
        <div className="docs-lead-grid">
          <article className="docs-lead-card">
            <span className="docs-badge">2.0</span>
            <h2>{t('docsPage.lead20Title')}</h2>
            <p>{t('docsPage.lead20Body')}</p>
            <Link className="btn btn-primary" to="/docs/overview">
              {t('docsPage.lead20Cta')}
            </Link>
          </article>
          <article className="docs-lead-card docs-lead-card--muted">
            <span className="docs-badge docs-badge--mute">1.0</span>
            <h2>{t('docsPage.lead10Title')}</h2>
            <p>{t('docsPage.lead10Body')}</p>
            <Link className="btn" to="/docs/architecture">
              {t('docsPage.lead10Cta')}
            </Link>
          </article>
        </div>
      </Reveal>

      {DOC_GROUPS.map((g) => (
        <section key={g.id} className="docs-group">
          <Reveal>
            <h2 className="docs-group-title">{g.label[lang] || g.label.en}</h2>
            <p className="docs-group-hint">{g.hint[lang] || g.hint.en}</p>
          </Reveal>
          <div className="grid grid-2 docs-card-grid">
            {g.ids.map((id, i) => (
              <Reveal key={id} delay={i * 40}>
                <Link to={`/docs/${id}`} className={`card doc-card doc-card--${g.id}`}>
                  <h3>{docTitle(id, lang)}</h3>
                  <p>{docBlurb(id, lang)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function DocsMdPage({ id }) {
  const { lang, t } = useI18n();
  const doc = MD_DOCS[id];
  useSeo(`/docs/${id}`, {
    title: doc ? `${docTitle(id, lang)} — Rogex Laboratories` : undefined,
    description: doc ? docBlurb(id, lang) : undefined,
  });
  if (!doc) {
    return (
      <article className="prose">
        <p>
          {t('docsPage.unknown')}{' '}
          <Link to="/docs">{t('docsPage.backToHub')}</Link>
        </p>
      </article>
    );
  }
  const idx = MD_ORDER.indexOf(id);
  const prev = MD_ORDER[idx - 1];
  const next = MD_ORDER[idx + 1];
  const source = docSource(id, lang);
  return (
    <article className="doc-article">
      <p className="back-to-hub">
        <Link to="/docs">{t('docsPage.backToHub')}</Link>
      </p>
      {source ? (
        <Markdown source={source} />
      ) : (
        <article className="prose">
          <p>
            {t('docsPage.unknown')}{' '}
            <Link to="/docs">{t('docsPage.backToHub')}</Link>
          </p>
        </article>
      )}
      <div className="doc-nav">
        {prev && (
          <Link className="btn" to={`/docs/${prev}`}>
            ← {docTitle(prev, lang)}
          </Link>
        )}
        {next && (
          <Link className="btn" to={`/docs/${next}`}>
            {docTitle(next, lang)} →
          </Link>
        )}
      </div>
    </article>
  );
}
