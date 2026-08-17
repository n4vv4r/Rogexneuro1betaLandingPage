import React, { useEffect, useMemo, useState } from 'react';
import { DOC_CATEGORIES, DOCS, docById, catById, docDate } from './docs-catalog.js';
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
        <DocsIndex navigate={navigate} PageHero={PageHero} SectionTitle={SectionTitle} />
      </>
    );
  }

  return <DocArticle doc={doc} navigate={navigate} />;
}

function DocsIndex({ navigate, PageHero, SectionTitle }) {
  const [sort, setSort] = useState('category');
  const sorted = useMemo(() => {
    const copy = [...DOCS];
    if (sort === 'abc') {
      copy.sort((a, b) => a.title.localeCompare(b.title, 'es'));
    } else if (sort === 'date') {
      copy.sort((a, b) => docDate(b).localeCompare(docDate(a)) || a.title.localeCompare(b.title, 'es'));
    }
    return copy;
  }, [sort]);

  return (
    <>
      <PageHero
        index="DX"
        eyebrow="DOCS · NAVI 9.2 · MARKDOWN VIVO"
        title={<>READ.<br />REPEAT.<br />MEASURE.</>}
        text="Tutoriales, benches, papers y el host 9.2 zorro. Ordena por fecha, categoría o ABC. Sin CMS. Sin paywall."
        image="/rxos/9/11-mac-tree.png"
        className="rxos-hero"
      />
      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / CATÁLOGO"
            title="LO QUE SE PUEDE LEER AQUÍ"
            text="El visor renderiza los .md del árbol público. NAVI 9.2, Echo, Eternal Eclipse y el resto del lab."
          />
          <div className="docs-toolbar" role="toolbar" aria-label="Ordenar documentos">
            <span className="docs-toolbar-label">Ordenar</span>
            {[
              ['category', 'Categoría'],
              ['date', 'Fecha'],
              ['abc', 'ABC'],
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
  return (
    <div className="docs-cat">
      <h3 className="docs-cat-title" style={{ color: cat.color }}>{cat.label}</h3>
      <div className="docs-grid">
        {items.map((d) => (
          <DocCard key={d.id} d={d} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}

function DocCard({ d, navigate }) {
  const cat = catById(d.category);
  return (
    <article className="docs-card" data-reveal>
      <span className="doc-tag" style={{ '--tag': cat?.color || '#888' }}>{cat?.label || d.category}</span>
      <h3>{d.title}</h3>
      <p>{d.blurb}</p>
      <p className="docs-date">{docDate(d)}</p>
      <button type="button" className="brutal-button" onClick={() => navigate(`/docs/${d.id}`)}>
        LEER
      </button>
    </article>
  );
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
