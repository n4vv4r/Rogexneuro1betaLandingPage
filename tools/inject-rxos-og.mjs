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

const replacements = [
  [
    /<title>[^<]*<\/title>/,
    '<title>RXos v4.5.0 Neuromorphic — Knights Labs</title>',
  ],
  [
    /<meta name="description" content="[^"]*" \/>/,
    '<meta name="description" content="RXos v4.5.0 bare-metal event fabric: LIF Q16.16, STDP, bench 6/6. Levels 1–2 closed. Akida AKD1000 Level 3 pending — chip not yet in lab." />',
  ],
  [
    /<meta property="og:title" content="[^"]*" \/>/,
    '<meta property="og:title" content="RXos v4.5.0 Neuromorphic — Knights Labs" />',
  ],
  [
    /<meta property="og:description" content="[^"]*" \/>/,
    '<meta property="og:description" content="Neuromorphic substrate on von Neumann. bench 6/6. Papers PDF. Akida silicon still missing in lab." />',
  ],
  [
    /<meta property="og:url" content="[^"]*" \/>/,
    '<meta property="og:url" content="https://www.rogexlaboratories.com/rx-os" />',
  ],
  // First og:image block (primary) → PC photo; leave secondary logo if present
  [
    /<meta property="og:image" content="https:\/\/www\.rogexlaboratories\.com\/knightslabs_logo\.png" \/>\s*<meta property="og:image:type" content="image\/png" \/>\s*<meta property="og:image:width" content="1200" \/>\s*<meta property="og:image:height" content="1200" \/>\s*<meta property="og:image:alt" content="Knights Labs logo" \/>/,
    `<meta property="og:image" content="https://www.rogexlaboratories.com/rxos/pc_with_rxos_installed.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1600" />
    <meta property="og:image:height" content="1200" />
    <meta property="og:image:alt" content="PC with rxOS installed" />`,
  ],
  [
    /<meta name="twitter:title" content="[^"]*" \/>/,
    '<meta name="twitter:title" content="RXos v4.5.0 Neuromorphic — Knights Labs" />',
  ],
  [
    /<meta name="twitter:description" content="[^"]*" \/>/,
    '<meta name="twitter:description" content="Event fabric LIF/STDP · bench 6/6 · Akida Level 3 pending." />',
  ],
  [
    /<meta name="twitter:image" content="[^"]*" \/>/,
    '<meta name="twitter:image" content="https://www.rogexlaboratories.com/rxos/pc_with_rxos_installed.jpg" />',
  ],
  [
    /<meta name="twitter:image:alt" content="[^"]*" \/>/,
    '<meta name="twitter:image:alt" content="PC with rxOS installed" />',
  ],
];

for (const [pattern, value] of replacements) {
  if (!pattern.test(html)) {
    console.warn('inject-rxos-og: pattern not matched:', pattern);
  }
  html = html.replace(pattern, value);
}

writeFileSync(outPath, html);
console.log('inject-rxos-og: wrote', outPath);
