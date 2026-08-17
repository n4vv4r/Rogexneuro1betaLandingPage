#!/usr/bin/env node
/**
 * Open Graph 1200×630 from each page's title + subtitle over a real capture.
 * Source of truth: src/og-catalog.json
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'og');
const CATALOG = JSON.parse(
  await fs.readFile(path.join(ROOT, 'src', 'og-catalog.json'), 'utf8'),
);

const W = 1200;
const H = 630;
const ACID = '#d6ff3f';
const INK = '#11110f';
const WHITE = '#fffef8';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapLines(text, maxChars, maxLines = 3) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
      if (lines.length >= maxLines) {
        cur = '';
        break;
      }
    } else {
      cur = next;
    }
  }
  if (lines.length < maxLines && cur) lines.push(cur);
  return lines.slice(0, maxLines);
}

async function cardPng(entry) {
  const shotPath = path.join(ROOT, entry.shot);
  const base = await sharp(shotPath)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.78, saturation: 0.92 })
    .toBuffer();

  const titleLines = wrapLines(entry.title, 20, 3);
  const subLines = wrapLines(entry.subtitle, 46, 2);
  const titleFs = titleLines.length >= 3 ? 48 : titleLines.length === 2 ? 56 : 64;
  const titleStart = 200;
  const titleBlock = titleLines
    .map(
      (line, i) =>
        `<text x="64" y="${titleStart + i * (titleFs * 0.98)}" fill="${WHITE}" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace" font-size="${titleFs}" font-weight="800" letter-spacing="-1.4">${esc(line)}</text>`,
    )
    .join('\n');
  const subStart = titleStart + titleLines.length * (titleFs * 0.98) + 30;
  const subBlock = subLines
    .map(
      (line, i) =>
        `<text x="64" y="${subStart + i * 30}" fill="rgba(255,254,248,0.84)" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="22" font-weight="500">${esc(line)}</text>`,
    )
    .join('\n');
  const badge = entry.badge
    ? `<rect x="64" y="132" width="${22 + entry.badge.length * 12}" height="36" fill="${ACID}"/>
       <text x="76" y="156" fill="${INK}" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="800" letter-spacing="1.2">${esc(entry.badge)}</text>`
    : '';

  const overlay = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stop-color="#050508" stop-opacity="0.28"/>
      <stop offset="45%" stop-color="#050508" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#050508" stop-opacity="0.88"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#veil)"/>
  <rect x="0" y="0" width="14" height="${H}" fill="${ACID}"/>
  <text x="64" y="78" fill="${ACID}" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" letter-spacing="3.2">${esc(entry.kicker)}</text>
  <line x1="64" y1="96" x2="380" y2="96" stroke="rgba(214,255,63,0.45)" stroke-width="2"/>
  ${badge}
  ${titleBlock}
  ${subBlock}
  <rect x="64" y="${H - 72}" width="${W - 128}" height="2" fill="rgba(255,254,248,0.18)"/>
  <text x="64" y="${H - 36}" fill="rgba(255,254,248,0.55)" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="600">${esc(entry.footer || 'rogexlaboratories.com')}</text>
  <text x="${W - 64}" y="${H - 36}" fill="${ACID}" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="800" text-anchor="end">RX · LAB</text>
</svg>`;

  return sharp(base)
    .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
    .png()
    .toBuffer();
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const seen = new Set();
  for (const entry of CATALOG.routes) {
    if (seen.has(entry.slug)) continue;
    seen.add(entry.slug);
    const png = await cardPng(entry);
    const dest = path.join(OUT, `${entry.slug}.png`);
    await fs.writeFile(dest, png);
    const meta = await sharp(png).metadata();
    console.log(`[og] ${entry.slug}.png  ${meta.width}×${meta.height}  ← ${entry.shot}`);
  }
  // Alias used by older newspaper embed
  const np = CATALOG.routes.find((r) => r.slug === 'newspaper');
  if (np) {
    await fs.copyFile(path.join(OUT, 'newspaper.png'), path.join(OUT, 'newspaper-article.png'));
  }
  console.log(`[og] wrote ${seen.size} cards → public/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
