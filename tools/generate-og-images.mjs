#!/usr/bin/env node
/**
 * Generate 1200×630 Open Graph PNGs for every public route + newspaper.
 * SVG → PNG via sharp (exact typography, brand-safe).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'og');

const W = 1200;
const H = 630;

/** Lab brand cards (paper / brutal) */
const LAB = {
  paper: '#f0eee6',
  paper2: '#e5e1d6',
  ink: '#11110f',
  muted: '#4a4840',
  accent: '#e64a32',
  acid: '#d6ff3f',
  black: '#0b0b0a',
  white: '#fffef8',
};

/** Newspaper press cards */
const NP = {
  paper: '#ebe6d8',
  sheet: '#f7f3e8',
  ink: '#14120f',
  muted: '#5c564c',
  accent: '#c43c24',
  green: '#1a4d3e',
  black: '#14120f',
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapLines(text, maxChars, maxLines = 3) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
      if (lines.length >= maxLines) break;
    } else {
      cur = next;
    }
  }
  if (lines.length < maxLines && cur) lines.push(cur);
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    const last = lines[maxLines - 1];
    lines[maxLines - 1] = last.length > 3 ? `${last.replace(/\s+\S*$/, '')}…` : `${last}…`;
  }
  return lines;
}

function labCard({
  kicker = 'KNIGHTS LABS',
  title,
  subtitle,
  footer = 'rogexlaboratories.com',
  accent = LAB.accent,
  badge = null,
  variant = 'light',
}) {
  const bg = variant === 'dark' ? LAB.black : LAB.paper;
  const ink = variant === 'dark' ? LAB.white : LAB.ink;
  const muted = variant === 'dark' ? 'rgba(255,254,248,0.62)' : LAB.muted;
  const rule = variant === 'dark' ? 'rgba(255,254,248,0.22)' : 'rgba(17,17,15,0.2)';
  const titleLines = wrapLines(title, 22, 3);
  const subLines = wrapLines(subtitle, 48, 2);
  const titleFs = titleLines.length >= 3 ? 54 : titleLines.length === 2 ? 64 : 72;
  const titleBlock = titleLines
    .map(
      (line, i) =>
        `<text x="72" y="${228 + i * (titleFs * 0.95)}" fill="${ink}" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace" font-size="${titleFs}" font-weight="800" letter-spacing="-1.5">${esc(line)}</text>`,
    )
    .join('\n');
  const subStart = 228 + titleLines.length * (titleFs * 0.95) + 28;
  const subBlock = subLines
    .map(
      (line, i) =>
        `<text x="72" y="${subStart + i * 32}" fill="${muted}" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace" font-size="22" font-weight="500">${esc(line)}</text>`,
    )
    .join('\n');

  const badgeSvg = badge
    ? `<rect x="72" y="148" width="${16 + badge.length * 11}" height="36" fill="${variant === 'dark' ? LAB.acid : accent}" />
       <text x="84" y="172" fill="${variant === 'dark' ? LAB.ink : LAB.white}" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" letter-spacing="1.5">${esc(badge)}</text>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect x="0" y="0" width="18" height="${H}" fill="${accent}"/>
  <rect x="0" y="0" width="${W}" height="8" fill="${variant === 'dark' ? LAB.acid : accent}"/>
  <!-- grid texture -->
  <g opacity="0.06" stroke="${ink}" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${100 + i * 90}" y1="0" x2="${100 + i * 90}" y2="${H}"/>`).join('')}
  </g>
  <text x="72" y="78" fill="${muted}" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="700" letter-spacing="4">${esc(kicker)}</text>
  <line x1="72" y1="100" x2="420" y2="100" stroke="${rule}" stroke-width="2"/>
  ${badgeSvg}
  ${titleBlock}
  ${subBlock}
  <rect x="72" y="${H - 78}" width="${W - 144}" height="2" fill="${rule}"/>
  <text x="72" y="${H - 38}" fill="${muted}" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="600" letter-spacing="1">${esc(footer)}</text>
  <text x="${W - 72}" y="${H - 38}" fill="${accent}" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="800" text-anchor="end">RX · LAB</text>
</svg>`;
}

function newspaperCard({
  kicker = 'ROGEX NEWSPAPER',
  title,
  subtitle,
  footer = 'newspaper.rogexlaboratories.com',
  badge = 'AVANCES DEL LAB',
}) {
  const titleLines = wrapLines(title, 24, 3);
  const subLines = wrapLines(subtitle, 46, 2);
  const titleFs = titleLines.length >= 3 ? 52 : 62;
  const titleBlock = titleLines
    .map(
      (line, i) =>
        `<text x="72" y="${240 + i * (titleFs * 0.98)}" fill="${NP.ink}" font-family="Georgia, 'Times New Roman', serif" font-size="${titleFs}" font-weight="700">${esc(line)}</text>`,
    )
    .join('\n');
  const subStart = 240 + titleLines.length * (titleFs * 0.98) + 26;
  const subBlock = subLines
    .map(
      (line, i) =>
        `<text x="72" y="${subStart + i * 30}" fill="${NP.muted}" font-family="ui-monospace, Menlo, monospace" font-size="20">${esc(line)}</text>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${NP.paper}"/>
  <rect x="40" y="36" width="${W - 80}" height="${H - 72}" fill="${NP.sheet}" stroke="${NP.ink}" stroke-width="3"/>
  <rect x="40" y="36" width="${W - 80}" height="10" fill="${NP.accent}"/>
  <text x="72" y="96" fill="${NP.muted}" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" letter-spacing="3">${esc(kicker)}</text>
  <line x1="72" y1="118" x2="${W - 72}" y2="118" stroke="${NP.ink}" stroke-width="2"/>
  <line x1="72" y1="124" x2="${W - 72}" y2="124" stroke="${NP.ink}" stroke-width="1"/>
  <rect x="72" y="148" width="${22 + badge.length * 10}" height="34" fill="${NP.green}"/>
  <text x="84" y="171" fill="${NP.sheet}" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" letter-spacing="1.5">${esc(badge)}</text>
  ${titleBlock}
  ${subBlock}
  <line x1="72" y1="${H - 90}" x2="${W - 72}" y2="${H - 90}" stroke="${NP.ink}" stroke-width="2"/>
  <text x="72" y="${H - 50}" fill="${NP.muted}" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="600">${esc(footer)}</text>
  <text x="${W - 72}" y="${H - 50}" fill="${NP.accent}" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" text-anchor="end">RSS · EMAIL</text>
</svg>`;
}

const CARDS = [
  {
    file: 'home.png',
    svg: labCard({
      kicker: 'KNIGHTS LABS · ROGEX LABORATORIES',
      title: '16 bytes. The OS is the demo.',
      subtitle: 'rxOS 8 DESKTOP · NAVI-4.5 · WSP · Q₆',
      badge: 'v8.0.0',
      accent: LAB.accent,
    }),
  },
  {
    file: 'suite.png',
    svg: labCard({
      kicker: 'PRODUCT SUITE',
      title: 'The stack, not the hype.',
      subtitle: 'rxOS 8 DESKTOP · NAVI-4.5 · PRISMA Engine',
      badge: '4 PRODUCTS',
      accent: LAB.acid,
      variant: 'dark',
    }),
  },
  {
    file: 'architecture.png',
    svg: labCard({
      kicker: 'ARCHITECTURE',
      title: 'From sensor to spike.',
      subtitle: 'Event fabric · Q₆ · WSP 16 B · NAVI-4.5 · 4-level roadmap',
      badge: 'rxOS 8',
      accent: LAB.accent,
      variant: 'dark',
    }),
  },
  {
    file: 'prisma.png',
    svg: labCard({
      kicker: 'PRISMA ENGINE 0.1 · SNN',
      title: 'Native Rust EEG/BCI runtime.',
      subtitle: 'SPSC · Δ-mod · LIF AVX2 · STDP · Linux tech preview',
      badge: 'DOWNLOAD LIVE',
      accent: LAB.accent,
    }),
  },
  {
    file: 'rx-os.png',
    // Real QEMU desktop capture + brand overlay (not a generic SVG card).
    fromShot: 'public/rxos/monad/12-desktop.png',
    kicker: 'rxOS 8 DESKTOP',
    title: 'THE OS IS THE DEMO.',
    subtitle: 'NAVI-4.5 · WSP 16 B · /prove · Q₆ 48/48',
    badge: 'REAL CAPTURE',
  },
  {
    file: 'investors.png',
    svg: labCard({
      kicker: 'INVESTORS',
      title: 'DeepTech with a P&L.',
      subtitle: 'Pre-seed path · licensing · low-carbon compute · clear risks',
      badge: 'KNIGHTS LABS',
      accent: LAB.accent,
    }),
  },
  {
    file: 'pitch.png',
    svg: labCard({
      kicker: 'PRE-SEED PITCH',
      title: '150k€ to launch dec 2026.',
      subtitle: 'PRISMA + RXos · developer-first GTM · transparent use of funds',
      badge: '150.000 €',
      accent: LAB.acid,
      variant: 'dark',
    }),
  },
  {
    file: 'startup-idea.png',
    svg: labCard({
      kicker: 'STARTUP IDEA',
      title: 'Event-driven compute for neurotech.',
      subtitle: 'Problem · solution · traction · philanthropic licensing model',
      badge: 'DEEPTECH',
      accent: LAB.accent,
    }),
  },
  {
    file: 'about.png',
    svg: labCard({
      kicker: 'ABOUT · KNIGHTS LABS',
      title: 'Built by hand. Shipped as lab.',
      subtitle: 'Roger Navarro · EEG · bare-metal · open where it matters',
      badge: 'CONTACT',
      accent: LAB.accent,
    }),
  },
  {
    file: 'newspaper.png',
    svg: newspaperCard({
      title: 'Rogex Newspaper',
      subtitle: 'Avances del lab por email y RSS. PRISMA, RXos, sin hype clínico.',
      badge: 'EDICIÓN DIGITAL',
    }),
  },
  {
    file: 'newspaper-article.png',
    svg: newspaperCard({
      title: 'Nuevo despacho',
      subtitle: 'Notas técnicas y hitos de Knights Labs / Rogex Laboratories.',
      badge: 'ARTÍCULO',
      footer: 'newspaper.rogexlaboratories.com',
    }),
  },
];

async function shotCard({ fromShot, kicker, title, subtitle, badge }) {
  const shotPath = path.join(ROOT, fromShot);
  const base = await sharp(shotPath)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.72, saturation: 0.9 })
    .toBuffer();

  const overlay = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0b0b0a" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="#0b0b0a" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0b0b0a" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="0" width="10" height="${H}" fill="${LAB.acid}"/>
  <text x="72" y="120" fill="${LAB.acid}" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="700" letter-spacing="3">${esc(kicker)}</text>
  <text x="72" y="220" fill="${LAB.white}" font-family="ui-monospace, Menlo, monospace" font-size="56" font-weight="800" letter-spacing="-1.5">${esc(title)}</text>
  <text x="72" y="280" fill="rgba(255,254,248,0.78)" font-family="ui-monospace, Menlo, monospace" font-size="22" font-weight="500">${esc(subtitle)}</text>
  ${
    badge
      ? `<rect x="72" y="520" width="${18 + badge.length * 12}" height="40" fill="${LAB.acid}"/>
  <text x="88" y="546" fill="${LAB.ink}" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="800" letter-spacing="1">${esc(badge)}</text>`
      : ''
  }
  <text x="72" y="590" fill="rgba(255,254,248,0.5)" font-family="ui-monospace, Menlo, monospace" font-size="16">rogexlaboratories.com/rx-os</text>
</svg>`;

  return sharp(base)
    .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
    .png()
    .toBuffer();
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  for (const card of CARDS) {
    let png;
    if (card.fromShot) {
      png = await shotCard(card);
    } else {
      png = await sharp(Buffer.from(card.svg)).png().toBuffer();
    }
    const dest = path.join(OUT, card.file);
    await fs.writeFile(dest, png);
    const meta = await sharp(png).metadata();
    console.log(`[og] ${card.file}  ${meta.width}×${meta.height}${card.fromShot ? '  (shot)' : ''}`);
  }
  console.log(`[og] wrote ${CARDS.length} images → public/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
