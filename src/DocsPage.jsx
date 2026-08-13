import React, { useEffect, useMemo, useState } from 'react';
import { DOC_CATEGORIES, DOCS, docById, catById } from './docs-catalog.js';
import { renderMarkdown } from './markdown.jsx';

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
    return (
      <main className="section wrap">
        <h1>Documento no encontrado</h1>
        <p className="md-p">Ese id no está en el catálogo.</p>
        <button type="button" className="brutal-button" onClick={() => navigate('/docs')}>
          ÍNDICE
        </button>
      </main>
    );
  }

  if (parsed.list) {
    return (
      <>
        <PageHero
          index="DX"
          eyebrow="DOCS · MARKDOWN VIVO"
          title={<>READ.<br />REPEAT.<br />MEASURE.</>}
          text="Tutoriales, demostraciones, benches, papers de teoría e implementación. Markdown del lab, no un CMS. PDFs clásicos siguen en /docs/rxos/*.pdf."
          image="/rxos/monad/01-boot.png"
          className="rxos-hero"
        />
        <main>
          <section className="section wrap">
            <SectionTitle
              code="01 / CATÁLOGO"
              title="LO QUE SE PUEDE LEER AQUÍ"
              text="El visor renderiza los .md del árbol público. Las capturas son QEMU o el GUI nativo de PRISMA Engine."
            />
            {DOC_CATEGORIES.map((cat) => {
              const items = DOCS.filter((d) => d.category === cat.id);
              if (!items.length) return null;
              return (
                <div key={cat.id} className="docs-cat">
                  <h3 className="docs-cat-title" style={{ color: cat.color }}>{cat.label}</h3>
                  <div className="docs-grid">
                    {items.map((d) => (
                      <article key={d.id} className="docs-card" data-reveal>
                        <span className="doc-tag" style={{ '--tag': cat.color }}>{cat.label}</span>
                        <h3>{d.title}</h3>
                        <p>{d.blurb}</p>
                        <button
                          type="button"
                          className="brutal-button"
                          onClick={() => navigate(`/docs/${d.id}`)}
                        >
                          LEER
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      </>
    );
  }

  return <DocArticle doc={doc} navigate={navigate} />;
}

function DocArticle({ doc, navigate }) {
  const [raw, setRaw] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    let live = true;
    setRaw('');
    setErr('');
    fetch(doc.path)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.text();
      })
      .then((t) => {
        if (live) setRaw(t);
      })
      .catch(() => {
        if (live) setErr('No se pudo cargar el markdown.');
      });
    return () => {
      live = false;
    };
  }, [doc.path]);

  const baseDir = doc.path.replace(/[^/]+$/, '');
  const body = useMemo(() => (raw ? renderMarkdown(raw, { baseDir }) : null), [raw, baseDir]);

  return (
    <div className="docs-shell">
      <aside className="docs-side">
        <button type="button" className="docs-back" onClick={() => navigate('/docs')}>
          ← índice
        </button>
        {DOC_CATEGORIES.map((cat) => {
          const items = DOCS.filter((d) => d.category === cat.id);
          if (!items.length) return null;
          return (
            <div key={cat.id}>
              <span className="docs-side-cat" style={{ color: cat.color }}>{cat.label}</span>
              {items.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={d.id === doc.id ? 'is-active' : ''}
                  onClick={() => navigate(`/docs/${d.id}`)}
                >
                  {d.title}
                </button>
              ))}
            </div>
          );
        })}
      </aside>
      <article className="docs-article">
        <header className="docs-article-head">
          <span className="doc-tag" style={{ '--tag': (catById(doc.category) || {}).color || 'var(--accent)' }}>
            {(catById(doc.category) || {}).label || doc.category}
          </span>
          <h1>{doc.title}</h1>
          <p>{doc.blurb}</p>
          <a className="checksum-link" href={doc.path} target="_blank" rel="noreferrer">
            RAW .md
          </a>
          {doc.pdf && (
            <a className="checksum-link" href={doc.pdf} target="_blank" rel="noreferrer" style={{ marginLeft: 16 }}>
              PDF
            </a>
          )}
        </header>
        {err && <p className="download-boundary">{err}</p>}
        {!raw && !err && <p className="md-p">Cargando…</p>}
        <div className="md-body">{body}</div>
      </article>
    </div>
  );
}
