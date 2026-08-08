#!/usr/bin/env node
/**
 * Post-build: emit static HTML shells per route (and newspaper) so crawlers
 * that do not execute JS still receive correct Open Graph / Twitter tags.
 *
 * Replaces the older inject-rxos-og.mjs single-file approach.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'dist', 'index.html');

if (!existsSync(indexPath)) {
  console.error('inject-route-og: dist/index.html missing — run vite build first');
  process.exit(1);
}

const SITE = 'https://www.rogexlaboratories.com';
const NP_SITE = 'https://newspaper.rogexlaboratories.com';
const OG = (slug) => `${SITE}/og/${slug}.png`;

/** @type {Array<{ out: string, title: string, description: string, url: string, image: string, imageAlt: string, siteName?: string }>} */
const ROUTES = [
  {
    out: 'index.html', // rewrite in place
    title: 'Knights Labs — Rogex Laboratories',
    description:
      'Knights Labs (Rogex Laboratories): neurotech low-carbon — PRISMA 3.2 EEG, PRISMA 5 SNN y RXos v4.5.0 event fabric (bench 6/6). Para developers, research y OEM.',
    url: `${SITE}/`,
    image: OG('home'),
    imageAlt: 'Knights Labs — low-carbon neurotech Open Graph card',
  },
  {
    out: 'suite.html',
    title: 'Product Suite — Knights Labs',
    description:
      'Suite de producto: rxOS Desktop, kernel neuromórfico, PRISMA 3 y PRISMA 5. Licencias para developers, research y OEM.',
    url: `${SITE}/suite`,
    image: OG('suite'),
    imageAlt: 'Knights Labs product suite',
  },
  {
    out: 'architecture.html',
    title: 'Architecture RXos v4.5 — Knights Labs',
    description:
      'Arquitectura RXos: event fabric en von Neumann, anillos SPSC, LIF/STDP y roadmap neuromórfico en 4 niveles. Papers PDF públicos.',
    url: `${SITE}/architecture`,
    image: OG('architecture'),
    imageAlt: 'RXos architecture — sensor to spike',
  },
  {
    out: 'prisma.html',
    title: 'PRISMA Engine 0.1 & SNN — Knights Labs',
    description:
      'PRISMA Engine 0.1.0 nativo (Rust·AVX2): SPSC, Δ-mod, LIF/STDP. Tech preview Linux en /downloads. No clínico.',
    url: `${SITE}/prisma`,
    image: OG('prisma'),
    imageAlt: 'PRISMA Engine and PRISMA 5 SNN',
  },
  {
    out: 'downloads.html',
    title: 'Downloads — PRISMA Engine & RXos — Knights Labs',
    description:
      'Descargas públicas: PRISMA Engine 0.1.0 Linux x86_64 (tar.gz + SHA-256) y RXos test ZIP. Software experimental, no clínico.',
    url: `${SITE}/downloads`,
    image: OG('prisma'),
    imageAlt: 'Knights Labs public downloads — PRISMA Engine and RXos',
  },
  {
    out: 'rx-os.html',
    title: 'RXos v4.5.0 Neuromorphic — Knights Labs',
    description:
      'RXos v4.5.0 event fabric bare-metal x86_64: LIF Q16.16, STDP, bench 6/6. Niveles 1–2 cerrados. Akida Level 3 pendiente.',
    url: `${SITE}/rx-os`,
    image: OG('rx-os'),
    imageAlt: 'RXos v4.5 neuromorphic bare-metal OS',
  },
  {
    out: 'investors.html',
    title: 'Para inversores — Knights Labs',
    description:
      'Tecnoactivismo con P&L: RXos v4.5, PRISMA 3/5, licensing Robin Hood, compute low-carbon y riesgos deep-tech con transparencia.',
    url: `${SITE}/investors`,
    image: OG('investors'),
    imageAlt: 'Knights Labs for investors',
  },
  {
    out: 'pitch.html',
    title: 'Pre-Seed Pitch 150k€ — Knights Labs',
    description:
      'Pitch pre-seed DeepTech: 150.000 € para PRISMA + RXos hasta lanzamiento dic. 2026. Tracción, use of funds y GTM developer-first.',
    url: `${SITE}/pitch`,
    image: OG('pitch'),
    imageAlt: 'Knights Labs pre-seed pitch 150k€',
  },
  {
    out: 'startup-idea.html',
    title: 'Startup idea — Knights Labs',
    description:
      'Idea de startup: compute event-driven, software EEG y SNN neuromórfico con licensing filantrópico. Problema, solución y tracción.',
    url: `${SITE}/startup-idea`,
    image: OG('startup-idea'),
    imageAlt: 'Knights Labs startup idea',
  },
  {
    out: 'about.html',
    title: 'About — Knights Labs / Rogex',
    description:
      'Lab independiente de neurotech low-carbon, software EEG y sistemas bare-metal. Contacto para developers, research y OEM.',
    url: `${SITE}/about`,
    image: OG('about'),
    imageAlt: 'About Knights Labs',
  },
  {
    out: 'newspaper.html',
    title: 'Rogex Newspaper — avances del lab',
    description:
      'Despachos sobre PRISMA, RXos y neurotech low-carbon. Suscríbete por correo o RSS. Experimental, no clínico.',
    url: `${NP_SITE}/`,
    image: OG('newspaper'),
    imageAlt: 'Rogex Newspaper — email and RSS advances',
    siteName: 'Rogex Newspaper',
  },
  // Path alias on main domain (same OG as subdomain home)
  {
    out: 'newspaper-path.html',
    title: 'Rogex Newspaper — avances del lab',
    description:
      'Despachos sobre PRISMA, RXos y neurotech low-carbon. Suscríbete por correo o RSS. Experimental, no clínico.',
    url: `${SITE}/newspaper`,
    image: OG('newspaper'),
    imageAlt: 'Rogex Newspaper — email and RSS advances',
    siteName: 'Rogex Newspaper',
  },
];

const baseHtml = readFileSync(indexPath, 'utf8');

function inject(html, meta) {
  const siteName = meta.siteName || 'Knights Labs / Rogex Laboratories';
  const imgType = 'image/png';
  const imgW = '1200';
  const imgH = '630';

  let out = html;

  const replacements = [
    [/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`],
    [
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    ],
    [
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${escapeAttr(meta.url)}" />`,
    ],
    [
      /<meta property="og:site_name" content="[^"]*"\s*\/?>/,
      `<meta property="og:site_name" content="${escapeAttr(siteName)}" />`,
    ],
    [
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    ],
    [
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    ],
    [
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${escapeAttr(meta.url)}" />`,
    ],
    [
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    ],
    [
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    ],
    [
      /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image" content="${escapeAttr(meta.image)}" />`,
    ],
    [
      /<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image:alt" content="${escapeAttr(meta.imageAlt)}" />`,
    ],
  ];

  for (const [re, value] of replacements) {
    if (!re.test(out)) {
      console.warn(`inject-route-og: pattern not matched for ${meta.out}:`, re);
    }
    out = out.replace(re, value);
  }

  // Replace ALL og:image blocks with a single clean OG card block
  const ogImageBlock = `    <meta property="og:image" content="${escapeAttr(meta.image)}" />
    <meta property="og:image:type" content="${imgType}" />
    <meta property="og:image:width" content="${imgW}" />
    <meta property="og:image:height" content="${imgH}" />
    <meta property="og:image:alt" content="${escapeAttr(meta.imageAlt)}" />`;

  // Remove existing og:image* meta tags then insert after og:url
  out = out.replace(
    /\s*<meta property="og:image(?::[a-z]+)?" content="[^"]*"\s*\/?>/g,
    '',
  );
  out = out.replace(
    /(<meta property="og:url" content="[^"]*"\s*\/?>)/,
    `$1\n${ogImageBlock}`,
  );

  // Ensure twitter:card is summary_large_image
  if (/twitter:card/.test(out)) {
    out = out.replace(
      /<meta name="twitter:card" content="[^"]*"\s*\/?>/,
      '<meta name="twitter:card" content="summary_large_image" />',
    );
  } else {
    out = out.replace(
      /(<meta name="twitter:title")/,
      '<meta name="twitter:card" content="summary_large_image" />\n    $1',
    );
  }

  // JSON-LD WebPage primary image
  out = out.replace(
    /<script type="application\/ld\+json" id="ld-org">[\s\S]*?<\/script>/,
    () => {
      const graph = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE}/#organization`,
            name: 'Knights Labs',
            alternateName: ['Rogex Laboratories', 'ROGEX Laboratories'],
            url: `${SITE}/`,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE}/knightslabs_logo.png`,
              width: 1200,
              height: 1200,
            },
          },
          {
            '@type': 'WebSite',
            '@id': meta.url.includes('newspaper')
              ? `${NP_SITE}/#website`
              : `${SITE}/#website`,
            url: meta.url.includes('newspaper.rogex') ? `${NP_SITE}/` : `${SITE}/`,
            name: siteName,
            publisher: { '@id': `${SITE}/#organization` },
          },
          {
            '@type': 'WebPage',
            '@id': `${meta.url.replace(/\/$/, '')}#webpage`,
            url: meta.url,
            name: meta.title,
            description: meta.description,
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: meta.image,
              width: 1200,
              height: 630,
            },
            inLanguage: 'es',
          },
        ],
      };
      return `<script type="application/ld+json" id="ld-org">\n${JSON.stringify(graph, null, 2)}\n    </script>`;
    },
  );

  return out;
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

const distDir = join(root, 'dist');
mkdirSync(distDir, { recursive: true });

for (const route of ROUTES) {
  const html = inject(baseHtml, route);
  const dest = join(distDir, route.out);
  writeFileSync(dest, html);
  console.log('inject-route-og:', route.out, '→', route.image);
}

console.log(`inject-route-og: wrote ${ROUTES.length} HTML shell(s)`);
