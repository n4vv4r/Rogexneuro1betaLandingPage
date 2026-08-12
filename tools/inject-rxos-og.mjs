#!/usr/bin/env node
/**
 * Post-build: emit dist/rx-os.html with rxOS-specific Open Graph tags
 * so crawlers that don't execute JS still get the PC hardware image.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'dist', 'index.html');
const outPath = join(root, 'dist', 'rx-os.html');

if (!existsSync(indexPath)) {
  console.error('inject-rxos-og: dist/index.html missing — run vite build first');
  process.exit(1);
}

let html = readFileSync(indexPath, 'utf8');

const RXOS_TITLE = 'RXos v4.5.0 Neuromorphic — Knights Labs';
const RXOS_DESC =
  'RXos v4.5.0 event fabric bare-metal x86_64: LIF Q16.16, STDP, bench 6/6. Niveles 1–2 cerrados. Akida Level 3 pendiente.';
const RXOS_URL = 'https://www.rogexlaboratories.com/rx-os';
const RXOS_IMG = 'https://www.rogexlaboratories.com/rxos/desktop-home.jpg';

const replacements = [
  [
    /<title>[^<]*<\/title>/,
    `<title>${RXOS_TITLE}</title>`,
  ],
  [
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${RXOS_DESC}" />`,
  ],
  [
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${RXOS_URL}" />`,
  ],
  [
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${RXOS_TITLE}" />`,
  ],
  [
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${RXOS_DESC}" />`,
  ],
  [
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${RXOS_URL}" />`,
  ],
  // First og:image block (primary) → PC photo; leave secondary logo if present
  [
    /<meta property="og:image" content="https:\/\/www\.rogexlaboratories\.com\/knightslabs_logo\.png" \/>\s*<meta property="og:image:type" content="image\/png" \/>\s*<meta property="og:image:width" content="1200" \/>\s*<meta property="og:image:height" content="1200" \/>\s*<meta property="og:image:alt" content="Knights Labs logo" \/>/,
    `<meta property="og:image" content="${RXOS_IMG}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1600" />
    <meta property="og:image:height" content="1200" />
    <meta property="og:image:alt" content="PC with rxOS installed" />`,
  ],
  [
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${RXOS_TITLE}" />`,
  ],
  [
    /<meta name="twitter:description" content="[^"]*" \/>/,
    '<meta name="twitter:description" content="Event fabric LIF/STDP · bench 6/6 · Akida Level 3 pendiente." />',
  ],
  [
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${RXOS_IMG}" />`,
  ],
  [
    /<meta name="twitter:image:alt" content="[^"]*" \/>/,
    '<meta name="twitter:image:alt" content="PC with rxOS installed" />',
  ],
];

// Rewrite WebPage node inside static JSON-LD for /rx-os SERP fragment
html = html.replace(
  /<script type="application\/ld\+json" id="ld-org">[\s\S]*?<\/script>/,
  () => {
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://www.rogexlaboratories.com/#organization',
          name: 'Knights Labs',
          alternateName: ['Rogex Laboratories', 'ROGEX Laboratories'],
          url: 'https://www.rogexlaboratories.com/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.rogexlaboratories.com/knightslabs_logo.png',
            width: 1200,
            height: 1200,
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://www.rogexlaboratories.com/#website',
          url: 'https://www.rogexlaboratories.com/',
          name: 'Knights Labs — Rogex Laboratories',
          publisher: { '@id': 'https://www.rogexlaboratories.com/#organization' },
        },
        {
          '@type': 'WebPage',
          '@id': `${RXOS_URL}#webpage`,
          url: RXOS_URL,
          name: RXOS_TITLE,
          description: RXOS_DESC,
          isPartOf: { '@id': 'https://www.rogexlaboratories.com/#website' },
          about: { '@id': 'https://www.rogexlaboratories.com/#organization' },
          inLanguage: 'es',
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: RXOS_IMG,
          },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'RXos',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'x86_64 bare-metal',
          softwareVersion: '4.5.0',
          description: RXOS_DESC,
          url: RXOS_URL,
          image: RXOS_IMG,
          author: { '@id': 'https://www.rogexlaboratories.com/#organization' },
        },
      ],
    };
    return `<script type="application/ld+json" id="ld-org">\n${JSON.stringify(graph, null, 2)}\n    </script>`;
  },
);

for (const [pattern, value] of replacements) {
  if (!pattern.test(html)) {
    console.warn('inject-rxos-og: pattern not matched:', pattern);
  }
  html = html.replace(pattern, value);
}

writeFileSync(outPath, html);
console.log('inject-rxos-og: wrote', outPath);
