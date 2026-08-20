#!/usr/bin/env node
/**
 * Post-build: static HTML shells per route so crawlers get OG tags
 * without executing JS. Titles/images come from src/og-catalog.json.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'dist', 'index.html');
const catalog = JSON.parse(readFileSync(join(root, 'src', 'og-catalog.json'), 'utf8'));

if (!existsSync(indexPath)) {
  console.error('inject-route-og: dist/index.html missing — run vite build first');
  process.exit(1);
}

const SITE = catalog.site;
const NP_SITE = catalog.npSite;
const VER = catalog.ogVersion || '10c';
const OG = (slug) => `${SITE}/og/${slug}.png?v=${VER}`;

function routeFromEntry(entry, extra = {}) {
  const url = extra.url || entry.url || `${SITE}${entry.path}`;
  return {
    out: extra.out || entry.out,
    title: entry.seoTitle,
    description: entry.description,
    url,
    image: OG(entry.slug),
    imageAlt: entry.imageAlt,
    siteName: extra.siteName || entry.siteName,
  };
}

const ROUTES = [];
for (const entry of catalog.routes) {
  ROUTES.push(routeFromEntry(entry));
  if (entry.slug === 'newspaper') {
    ROUTES.push(
      routeFromEntry(entry, {
        out: 'newspaper.html',
        url: `${NP_SITE}/`,
        siteName: 'Rogex Newspaper',
      }),
    );
  }
  if (entry.slug === 'rx-os') {
    ROUTES.push(routeFromEntry(entry, { out: 'rogexos.html', url: `${SITE}/rx-os` }));
  }
}

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

  const ogImageBlock = `    <meta property="og:image" content="${escapeAttr(meta.image)}" />
    <meta property="og:image:type" content="${imgType}" />
    <meta property="og:image:width" content="${imgW}" />
    <meta property="og:image:height" content="${imgH}" />
    <meta property="og:image:alt" content="${escapeAttr(meta.imageAlt)}" />`;

  out = out.replace(
    /\s*<meta property="og:image(?::[a-z]+)?" content="[^"]*"\s*\/?>/g,
    '',
  );
  out = out.replace(
    /(<meta property="og:url" content="[^"]*"\s*\/?>)/,
    `$1\n${ogImageBlock}`,
  );

  if (/twitter:card/.test(out)) {
    out = out.replace(
      /<meta name="twitter:card" content="[^"]*"\s*\/?>/,
      '<meta name="twitter:card" content="summary_large_image" />',
    );
  }

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
  writeFileSync(join(distDir, route.out), html);
  console.log('inject-route-og:', route.out, '→', route.image);
}

console.log(`inject-route-og: wrote ${ROUTES.length} HTML shell(s)`);
