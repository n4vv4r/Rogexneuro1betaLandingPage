#!/usr/bin/env node
/**
 * Open Graph 1200×630: dark wash + per-route accent.
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
const WHITE = '#f4f1ea';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inkFor(hex) {
  const c = String(hex || '#d6ff3f').replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return L > 0.58 ? '#0a0a0c' : '#f4f1ea';
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
  const accent = entry.accent || '#d6ff3f';
  const ink = inkFor(accent);
  const mark = (entry.mark || entry.slug || 'RX').toUpperCase().slice(0, 6);
  const shotPath = path.join(ROOT, entry.shot);
  const base = await sharp(shotPath)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.36, saturation: 0.62 })
    .toBuffer();

  const titleLines = wrapLines(entry.title, 18, 3);
  const subLines = wrapLines(entry.subtitle, 44, 2);
  const titleFs = titleLines.length >= 3 ? 46 : titleLines.length === 2 ? 56 : 66;
  const titleStart = 208;
  const titleBlock = titleLines
    .map(
      (line, i) =>
        `<text x="72" y="${titleStart + i * (titleFs * 0.98)}" fill="${WHITE}" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace" font-size="${titleFs}" font-weight="800" letter-spacing="-1.6">${esc(line)}</text>`,
    )
    .join('\n');
  const subStart = titleStart + titleLines.length * (titleFs * 0.98) + 28;
  const subBlock = subLines
    .map(
      (line, i) =>
        `<text x="72" y="${subStart + i * 30}" fill="rgba(244,241,234,0.78)" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="21" font-weight="500">${esc(line)}</text>`,
    )
    .join('\n');
  const badgeW = entry.badge ? Math.max(86, 28 + entry.badge.length * 11.4) : 0;
  const badge = entry.badge
    ? `<rect x="72" y="128" width="${badgeW}" height="36" fill="${accent}"/>
       <text x="86" y="152" fill="${ink}" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="800" letter-spacing="1.3">${esc(entry.badge)}</text>`
    : '';

  const overlay = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#020204" stop-opacity="0.42"/>
      <stop offset="40%" stop-color="#020204" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#020204" stop-opacity="0.94"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${accent}" opacity="0.22"/>
  <rect width="${W}" height="${H}" fill="url(#veil)"/>
  <rect x="0" y="0" width="22" height="${H}" fill="${accent}"/>
  <rect x="0" y="${H - 12}" width="${W}" height="12" fill="${accent}"/>
  <text x="${W - 40}" y="${H - 70}" fill="${accent}" opacity="0.16" font-family="ui-monospace, Menlo, monospace" font-size="210" font-weight="800" text-anchor="end">${esc(mark)}</text>
  <text x="72" y="74" fill="${accent}" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" letter-spacing="3.4">${esc(entry.kicker)}</text>
  <line x1="72" y1="92" x2="420" y2="92" stroke="${accent}" stroke-opacity="0.55" stroke-width="2"/>
  ${badge}
  ${titleBlock}
  ${subBlock}
  <rect x="72" y="${H - 86}" width="${W - 144}" height="2" fill="${accent}" opacity="0.35"/>
  <text x="72" y="${H - 44}" fill="rgba(244,241,234,0.62)" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="600">${esc(entry.footer || 'rogexlaboratories.com')}</text>
  <text x="${W - 72}" y="${H - 44}" fill="${accent}" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="800" text-anchor="end">RX · LAB</text>
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
    console.log(`[og] ${entry.slug}.png  ${meta.width}×${meta.height}  ${entry.accent || ''}  ← ${entry.shot}`);
  }
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
