#!/usr/bin/env node
/**
 * Build newspaper content → public/newspaper/{articles.json, articles/*.json, feed.xml}
 * Articles live as Markdown with YAML-ish frontmatter in content/newspaper/.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'content', 'newspaper');
const OUT_DIR = path.join(ROOT, 'public', 'newspaper');
const ARTICLES_OUT = path.join(OUT_DIR, 'articles');

const SITE = 'https://newspaper.rogexlaboratories.com';
const LAB = 'https://www.rogexlaboratories.com';

function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, '');
  if (!text.startsWith('---')) {
    return { meta: {}, body: text.trim() };
  }
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { meta: {}, body: text.trim() };
  const fm = text.slice(3, end).trim();
  const body = text.slice(end + 4).trim();
  const meta = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    else if (val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    }
    meta[key] = val;
  }
  return { meta, body };
}

function slugFromFilename(name) {
  return name.replace(/\.md$/i, '').replace(/^\d{4}-\d{2}-\d{2}-/, (d) => {
    // keep date prefix in slug for uniqueness: 2026-08-08-title
    return d;
  });
}

/** Minimal Markdown → HTML (enough for lab notes). */
export function markdownToHtml(md) {
  let html = md.replace(/\r\n/g, '\n');

  // fenced code
  html = html.replace(/```([\w-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const esc = escapeHtml(code.replace(/\n$/, ''));
    return `<pre class="np-code"><code class="language-${escapeHtml(lang || 'text')}">${esc}</code></pre>`;
  });

  // headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // hr
  html = html.replace(/^---$/gm, '<hr />');

  // blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');

  // unordered lists (contiguous blocks)
  html = html.replace(/(?:^[-*] .+\n?)+/gm, (block) => {
    const items = block
      .trim()
      .split('\n')
      .map((line) => line.replace(/^[-*] /, '').trim())
      .filter(Boolean)
      .map((item) => `<li>${inlineMd(item)}</li>`)
      .join('');
    return `<ul>${items}</ul>\n`;
  });

  // ordered lists
  html = html.replace(/(?:^\d+\. .+\n?)+/gm, (block) => {
    const items = block
      .trim()
      .split('\n')
      .map((line) => line.replace(/^\d+\. /, '').trim())
      .filter(Boolean)
      .map((item) => `<li>${inlineMd(item)}</li>`)
      .join('');
    return `<ol>${items}</ol>\n`;
  });

  // paragraphs: split on blank lines, skip already-tagged blocks
  const parts = html.split(/\n{2,}/);
  html = parts
    .map((part) => {
      const t = part.trim();
      if (!t) return '';
      if (/^<(h[1-6]|ul|ol|pre|blockquote|hr|p|div)/i.test(t)) return t;
      const lines = t
        .split('\n')
        .map((l) => inlineMd(l.trim()))
        .join('<br />\n');
      return `<p>${lines}</p>`;
    })
    .filter(Boolean)
    .join('\n');

  return html;
}

function inlineMd(s) {
  // links first on raw text, then escape remaining, then bold/italic/code on escaped segments
  const parts = [];
  const linkRe = /\[([^\]]+)\]\((https?:[^)\s]+)\)/g;
  let last = 0;
  let m;
  while ((m = linkRe.exec(s)) !== null) {
    if (m.index > last) parts.push({ t: 'text', v: s.slice(last, m.index) });
    parts.push({ t: 'link', label: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < s.length) parts.push({ t: 'text', v: s.slice(last) });

  return parts
    .map((p) => {
      if (p.t === 'link') {
        return `<a href="${escapeHtml(p.href)}" rel="noopener noreferrer" target="_blank">${formatInline(escapeHtml(p.label))}</a>`;
      }
      return formatInline(escapeHtml(p.v));
    })
    .join('');
}

function formatInline(escaped) {
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(dateStr) {
  const d = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T12:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

async function loadArticles() {
  let files = [];
  try {
    files = (await fs.readdir(SRC_DIR)).filter(
      (f) => f.endsWith('.md') && !/^readme/i.test(f) && !f.startsWith('_'),
    );
  } catch {
    console.warn('[newspaper] no content/newspaper directory');
    return [];
  }

  const articles = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(SRC_DIR, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    if (meta.draft === true) continue;

    const slug = meta.slug || slugFromFilename(file);
    const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/);
    const date = meta.date || dateMatch?.[1];
    if (!date || !/^\d{4}-\d{2}-\d{2}/.test(String(date))) {
      console.warn(`[newspaper] skip ${file}: missing date (use YYYY-MM-DD-slug.md or frontmatter date)`);
      continue;
    }
    const title = meta.title || slug;
    const summary = meta.summary || body.split('\n').find((l) => l.trim() && !l.startsWith('#')) || '';
    const tags = Array.isArray(meta.tags) ? meta.tags : [];
    const author = meta.author || 'Knights Labs / Rogex Laboratories';
    const html = markdownToHtml(body);

    articles.push({
      slug,
      title,
      date: String(date).slice(0, 10),
      summary: String(summary).replace(/^["']|["']$/g, ''),
      tags,
      author,
      body,
      html,
      url: `${SITE}/${slug}`,
      path: `/${slug}`,
    });
  }

  articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return articles;
}

function buildRss(articles) {
  const items = articles
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${escapeXml(a.url)}</link>
      <guid isPermaLink="true">${escapeXml(a.url)}</guid>
      <pubDate>${toRfc822(a.date)}</pubDate>
      <description>${escapeXml(a.summary)}</description>
      <author>${escapeXml(a.author)}</author>
      ${a.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('\n      ')}
      <content:encoded><![CDATA[${a.html}]]></content:encoded>
    </item>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Rogex Newspaper</title>
    <link>${SITE}/</link>
    <description>Avances de Knights Labs / Rogex Laboratories: PRISMA, RXos y neurotech low-carbon. Experimental, no clínico.</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${LAB}/rogexlaboratories_logo.png</url>
      <title>Rogex Newspaper</title>
      <link>${SITE}/</link>
    </image>
${items}
  </channel>
</rss>
`;
}

async function main() {
  await fs.mkdir(ARTICLES_OUT, { recursive: true });
  const articles = await loadArticles();

  const index = articles.map(({ body, html, ...rest }) => rest);
  await fs.writeFile(path.join(OUT_DIR, 'articles.json'), JSON.stringify(index, null, 2) + '\n');

  for (const article of articles) {
    await fs.writeFile(
      path.join(ARTICLES_OUT, `${article.slug}.json`),
      JSON.stringify(article, null, 2) + '\n',
    );
  }

  await fs.writeFile(path.join(OUT_DIR, 'feed.xml'), buildRss(articles));
  // Clean public root alias for subdomain convenience (copied path used by rewrites)
  await fs.writeFile(path.join(ROOT, 'public', 'feed.xml'), buildRss(articles));

  console.log(`[newspaper] built ${articles.length} article(s) → public/newspaper/`);
}

main().catch((err) => {
  console.error('[newspaper] build failed', err);
  process.exit(1);
});
