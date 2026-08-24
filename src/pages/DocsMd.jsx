import { Link, NavLink, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';
import { Markdown } from '../components/Markdown';

import architectureMd from '../content/md/architecture.md?raw';
import editionsMd from '../content/md/editions.md?raw';
import echoMd from '../content/md/echo.md?raw';
import videoMd from '../content/md/video.md?raw';
import packagesSpecMd from '../content/md/packages-spec.md?raw';
import packagesMd from '../content/md/packages.md?raw';
import installMd from '../content/md/install.md?raw';
import roadmapMd from '../content/md/roadmap.md?raw';

export const MD_DOCS = {
  architecture: {
    title: 'Architecture',
    blurb: 'Kernel, Eclipse Shell, Nova engine, media pipeline — how EchOS is built.',
    src: architectureMd,
  },
  editions: {
    title: 'Editions',
    blurb: 'Complete, Minimal, Edge and Dev — one kernel, three+ product lines.',
    src: editionsMd,
  },
  echo: {
    title: 'ECHO AI',
    blurb: 'Navi 10: datasets, A/B training contract, Lang / Code / Sys heads.',
    src: echoMd,
  },
  packages: {
    title: 'Packages',
    blurb: 'The .rxp format, rx-pkg and the ten from-scratch core tools.',
    src: packagesMd,
  },
  'packages-spec': {
    title: 'Package spec',
    blurb: 'Technical specification of the .rxp binary package format.',
    src: packagesSpecMd,
  },
  video: {
    title: 'Video pipeline',
    blurb: 'MP4/H.264 status, sample asset and the 1.0.0 test target.',
    src: videoMd,
  },
  install: {
    title: 'Install guide',
    blurb: 'QEMU, VirtualBox, USB and first boot — step by step.',
    src: installMd,
  },
  roadmap: {
    title: 'Roadmap',
    blurb: 'What ships next, in order — no dates without ISOs.',
    src: roadmapMd,
  },
};

export const MD_ORDER = ['architecture', 'editions', 'install', 'echo', 'packages', 'packages-spec', 'video', 'roadmap'];

export function DocsMdHub() {
  useSeo('/docs');
  return (
    <>
      <Reveal>
        <span className="kicker">EchOS</span>
        <h1 className="section-title">Documentation</h1>
        <p className="section-sub">
          Technical specs, architecture, how it works, how to use it and where
          it is going — straight from the source tree, no marketing gloss.
        </p>
      </Reveal>
      <Reveal>
        <div className="grid grid-2">
          {MD_ORDER.map((id, i) => (
            <Reveal key={id} delay={i * 60}>
              <Link to={`/docs/${id}`} className={`card doc-card doc-card--${id}`}>
                <h3>{MD_DOCS[id].title}</h3>
                <p>{MD_DOCS[id].blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </>
  );
}

export function DocsMdPage({ id }) {
  const doc = MD_DOCS[id];
  useSeo(`/docs/${id}`, { title: doc ? `${doc.title} — EchOS Docs` : undefined });
  if (!doc) {
    return (
      <article className="prose">
        <p>
          Unknown document. <Link to="/docs">Back to the docs hub.</Link>
        </p>
      </article>
    );
  }
  return (
    <article className="doc-article">
      <p className="back-to-hub">
        <Link to="/docs">← All docs</Link>
      </p>
      <Markdown source={doc.src} />
      <div className="doc-nav">
        {(() => {
          const idx = MD_ORDER.indexOf(id);
          const prev = MD_ORDER[idx - 1];
          const next = MD_ORDER[idx + 1];
          return (
            <>
              {prev && <Link className="btn" to={`/docs/${prev}`}>← {MD_DOCS[prev].title}</Link>}
              {next && <Link className="btn" to={`/docs/${next}`}>{MD_DOCS[next].title} →</Link>}
            </>
          );
        })()}
      </div>
    </article>
  );
}
