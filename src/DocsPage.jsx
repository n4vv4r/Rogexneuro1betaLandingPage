import React, { useEffect, useMemo, useState } from 'react';
import {
  DOC_CATEGORIES,
  DOCS,
  FEATURED_DOC_IDS,
  docById,
  catById,
  catLabel,
  docBlurb,
  docDate,
  docPath,
  docTitle,
} from './docs-catalog.js';
import { renderMarkdown } from './markdown.jsx';
import { useLang } from './lang.jsx';

export function parseDocsPath(path) {
  if (path === '/docs' || path === '/docs/') return { list: true, id: null };
  if (!path.startsWith('/docs/')) return null;
  const id = path.replace(/^\/docs\//, '').replace(/\/+$/, '');
  return { list: false, id };
}

export default function DocsPage({ path, navigate, PageHero, SectionTitle }) {
  const parsed = parseDocsPath(path) || { list: true, id: null };
  const doc = parsed.id ? docById(parsed.id) : null;

  if (!parsed.list && !doc) {
    return <DocsMissing navigate={navigate} />;
  }

  if (parsed.list) {
    return (
      <>
        <DocsIndex navigate={navigate} PageHero={PageHero} SectionTitle={SectionTitle} />
      </>
    );
  }

  return <DocArticle doc={doc} navigate={navigate} />;
}

function DocsMissing({ navigate }) {
  const { t } = useLang();
  return (
    <main className="section wrap">
      <h1>{t('docsMissing')}</h1>
      <p className="md-p">{t('docsMissingText')}</p>
      <button type="button" className="brutal-button" onClick={() => navigate('/docs')}>
        {t('docsIndexBtn')}
      </button>
    </main>
  );
}

function DocsIndex({ navigate, PageHero, SectionTitle }) {
  const { lang, t } = useLang();
  const [sort, setSort] = useState('category');
  const sorted = useMemo(() => {
    const copy = [...DOCS];
    const loc = lang === 'en' ? 'en' : 'es';
    if (sort === 'abc') {
      copy.sort((a, b) => docTitle(a, loc).localeCompare(docTitle(b, loc), loc));
    } else if (sort === 'date') {
      copy.sort((a, b) => docDate(b).localeCompare(docDate(a)) || docTitle(a, loc).localeCompare(docTitle(b, loc), loc));
    }
    return copy;
  }, [sort, lang]);

  const featured = FEATURED_DOC_IDS.map((id) => docById(id)).filter(Boolean);
  return (
    <>
      <section className="now-hero is-blue">
        <div className="wrap now-hero-inner">
          <span className="kicker">{t('docsEyebrow')}</span>
          <h1>{t('docsHeroTitle')}</h1>
          <p className="now-lede">{t('docsHeroText')}</p>
        </div>
      </section>
      <main>
        <section className="section wrap">
          <h2 className="now-h">{t('docsNow')}</h2>
          <div className="now-docs">
            {featured.map((d) => (
              <button type="button" key={d.id} className="now-doc" onClick={() => navigate(`/docs/${d.id}`)}>
                <strong>{docTitle(d, lang)}</strong>
                <span>{docBlurb(d, lang)}</span>
              </button>
            ))}
          </div>
        </section>
        <section className="section wrap">
          <SectionTitle
            code="02"
            title={t('docsArchive')}
            text={t('docsIndexText')}
          />
          <div className="docs-toolbar" role="toolbar" aria-label={t('docsSort')}>
            <span className="docs-toolbar-label">{t('docsSort')}</span>
            {[
              ['category', t('docsCat')],
              ['date', t('docsDate')],
              ['abc', t('docsAbc')],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={sort === id ? 'brutal-button primary' : 'brutal-button'}
                aria-pressed={sort === id}
                onClick={() => setSort(id)}
              >
                {label}
              </button>
            ))}
          </div>
          {sort === 'category'
            ? DOC_CATEGORIES.map((cat) => {
                const items = sorted.filter((d) => d.category === cat.id);
                if (!items.length) return null;
                return (
                  <DocsCat key={cat.id} cat={cat} items={items} navigate={navigate} />
                );
              })
            : (
              <div className="docs-grid">
                {sorted.map((d) => (
                  <DocCard key={d.id} d={d} navigate={navigate} />
                ))}
              </div>
            )}
        </section>
      </main>
    </>
  );
}

function DocsCat({ cat, items, navigate }) {
  const { lang } = useLang();
  return (
    <div className="docs-cat">
      <h3 className="docs-cat-title" style={{ color: cat.color }}>{catLabel(cat, lang)}</h3>
      <div className="docs-grid">
        {items.map((d) => (
          <DocCard key={d.id} d={d} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}

function DocCard({ d, navigate }) {
  const { lang, t } = useLang();
  const cat = catById(d.category);
  return (
    <article className="docs-card" data-reveal>
      <span className="doc-tag" style={{ '--tag': cat?.color || '#888' }}>{catLabel(cat, lang) || d.category}</span>
      <h3>{docTitle(d, lang)}</h3>
      <p>{docBlurb(d, lang)}</p>
      <p className="docs-date">{docDate(d)}</p>
      <button type="button" className="brutal-button" onClick={() => navigate(`/docs/${d.id}`)}>
        {t('read')}
      </button>
    </article>
  );
}

function DocArticle({ doc, navigate }) {
  const { lang, t } = useLang();
  const [raw, setRaw] = useState('');
  const [err, setErr] = useState('');
  const mdPath = docPath(doc, lang);
  const hasLangFile = lang === 'en' ? Boolean(doc.pathEn) : true;

  useEffect(() => {
    let live = true;
    setRaw('');
    setErr('');
    fetch(mdPath)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (live) setRaw(text);
      })
      .catch(() => {
        if (live) setErr(t('docsLoadErr'));
      });
    return () => {
      live = false;
    };
  }, [mdPath, t]);

  const baseDir = mdPath.replace(/[^/]+$/, '');
  const body = useMemo(() => (raw ? renderMarkdown(raw, { baseDir }) : null), [raw, baseDir]);
  const cat = catById(doc.category);

  return (
    <div className={doc.diary ? 'docs-shell is-diary' : 'docs-shell'}>
      <aside className="docs-side">
        <button type="button" className="docs-back" onClick={() => navigate('/docs')}>
          ← {t('docsIndexBtn').toLowerCase()}
        </button>
        {DOC_CATEGORIES.map((sideCat) => {
          const items = DOCS.filter((d) => d.category === sideCat.id);
          if (!items.length) return null;
          return (
            <div key={sideCat.id}>
              <span className="docs-side-cat" style={{ color: sideCat.color }}>{catLabel(sideCat, lang)}</span>
              {items.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={d.id === doc.id ? 'is-active' : ''}
                  onClick={() => navigate(`/docs/${d.id}`)}
                >
                  {docTitle(d, lang)}
                </button>
              ))}
            </div>
          );
        })}
      </aside>
      <article className={doc.diary ? 'docs-article is-diary' : 'docs-article'}>
        {doc.diary ? (
          <div className="diary-sheet">
            <header className="diary-meta">
              <span>{t('diaryStamp')}</span>
              <em>{docDate(doc).split('-').reverse().join(' · ')}</em>
            </header>
            {!hasLangFile && lang === 'en' ? (
              <p className="docs-lang-note">{t('docsEsOnly')}</p>
            ) : null}
            {err && <p className="download-boundary">{err}</p>}
            {!raw && !err && <p className="md-p">{lang === 'en' ? 'Loading…' : 'Cargando…'}</p>}
            <div className="diary-body md-body">{body}</div>
            <a className="checksum-link diary-raw" href={mdPath} target="_blank" rel="noreferrer">
              RAW .md
            </a>
          </div>
        ) : (
          <>
            <header className="docs-article-head">
              <span className="doc-tag" style={{ '--tag': (cat || {}).color || 'var(--accent)' }}>
                {catLabel(cat, lang) || doc.category}
              </span>
              <h1>{docTitle(doc, lang)}</h1>
              <p>{docBlurb(doc, lang)}</p>
              {!hasLangFile && lang === 'en' ? (
                <p className="docs-lang-note">{t('docsEsOnly')}</p>
              ) : null}
              <a className="checksum-link" href={mdPath} target="_blank" rel="noreferrer">
                RAW .md
              </a>
              {doc.pdf && (
                <a className="checksum-link" href={doc.pdf} target="_blank" rel="noreferrer" style={{ marginLeft: 16 }}>
                  PDF
                </a>
              )}
            </header>
            {err && <p className="download-boundary">{err}</p>}
            {!raw && !err && <p className="md-p">{lang === 'en' ? 'Loading…' : 'Cargando…'}</p>}
            <div className="md-body">{body}</div>
          </>
        )}
      </article>
    </div>
  );
}
