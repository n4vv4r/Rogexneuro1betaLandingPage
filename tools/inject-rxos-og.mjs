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
    '<title>rxOS Desktop &amp; Kernel — Knights Labs</title>',
  ],
  [
    /<meta name="description" content="[^"]*" \/>/,
    '<meta name="description" content="Bare-metal x86-64 lab OS: Desktop Experience and open neuromorphic kernel. Real hardware install and public QEMU test build." />',
  ],
  [
    /<meta property="og:title" content="[^"]*" \/>/,
    '<meta property="og:title" content="rxOS Desktop &amp; Kernel — Knights Labs" />',
  ],
  [
    /<meta property="og:description" content="[^"]*" \/>/,
    '<meta property="og:description" content="Bare-metal x86-64 lab OS on real hardware. Desktop Experience + open neuromorphic kernel. Public QEMU test build." />',
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
    '<meta name="twitter:title" content="rxOS Desktop &amp; Kernel — Knights Labs" />',
  ],
  [
    /<meta name="twitter:description" content="[^"]*" \/>/,
    '<meta name="twitter:description" content="Bare-metal lab OS on real hardware. Desktop + open neuromorphic kernel." />',
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
