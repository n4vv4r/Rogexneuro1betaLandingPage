import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { PAGES, SITE, ECHO2_VIDEO, abs, imageFor, jsonLd } from "../src/site.js";
import { alternatePaths } from "../src/i18n.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const contentDir = path.join(root, "src", "content");

marked.setOptions({ gfm: true, breaks: false });

function strip(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/g, "")
    .replace(/<meta name="description"[^>]*>/g, "")
    .replace(/<meta name="theme-color"[^>]*>/g, "")
    .replace(/<meta name="msapplication-TileColor"[^>]*>/g, "")
    .replace(/<meta name="color-scheme"[^>]*>/g, "")
    .replace(/<meta name="robots"[^>]*>/g, "")
    .replace(/<meta name="author"[^>]*>/g, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
    .replace(/<link rel="canonical"[^>]*>/g, "")
    .replace(/<link rel="alternate"[^>]*>/g, "")
    .replace(/<link rel="image_src"[^>]*>/g, "")
    .replace(/<meta property="og:[^"]+"[^>]*>/g, "")
    .replace(/<meta name="twitter:[^"]+"[^>]*>/g, "");
}

function inject(html, page) {
  const url = abs(page.path);
  const image = imageFor(page);
  const robots = page.noindex ? "noindex, nofollow" : "index, follow";
  const language = page.lang === "en" ? "en" : page.lang === "ca" ? "ca" : "es";
  const localeByLanguage = { es: SITE.locale, en: SITE.localeAlt, ca: SITE.localeCa };
  const localeAlternates = Object.entries(localeByLanguage)
    .filter(([code]) => code !== language)
    .map(([, locale]) => `    <meta property="og:locale:alternate" content="${locale}" />`)
    .join("\n");
  const alternate = alternatePaths(page.path);
  const isEcho2 = page.path.includes("/docs/echoai/echo2");
  const videoMeta = isEcho2 ? `
    <meta property="og:video" content="${abs(ECHO2_VIDEO)}" />
    <meta property="og:video:secure_url" content="${abs(ECHO2_VIDEO)}" />
    <meta property="og:video:type" content="video/mp4" />
    <meta property="og:video:width" content="1280" />
    <meta property="og:video:height" content="720" />` : "";
  const markdownHref = markdownSource(page);
  const markdownAlternate = markdownHref
    ? `\n    <link rel="alternate" type="text/markdown" href="${abs(markdownHref)}" />`
    : "";
  html = strip(html);
  const block = `
    <title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.description)}" />
    <meta name="theme-color" content="${SITE.theme}" />
    <meta name="msapplication-TileColor" content="${SITE.theme}" />
    <meta name="color-scheme" content="dark" />
    <meta name="robots" content="${robots}" />
    <meta name="author" content="${esc(SITE.author)}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd(page))}</script>
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="es" href="${abs(alternate.es)}" />
    <link rel="alternate" hreflang="en" href="${abs(alternate.en)}" />
    <link rel="alternate" hreflang="ca" href="${abs(alternate.ca)}" />
    <link rel="alternate" hreflang="x-default" href="${abs(alternate.es)}" />
    <link rel="image_src" href="${image.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(SITE.name)}" />
    <meta property="og:locale" content="${localeByLanguage[language]}" />
${localeAlternates}
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image.url}" />
    <meta property="og:image:secure_url" content="${image.url}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="${image.width}" />
    <meta property="og:image:height" content="${image.height}" />
    <meta property="og:image:alt" content="${esc(image.alt)}" />
${videoMeta}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(page.title)}" />
    <meta name="twitter:description" content="${esc(page.description)}" />
    <meta name="twitter:image" content="${image.url}" />
    <meta name="twitter:image:alt" content="${esc(image.alt)}" />${markdownAlternate}
`;

  html = html
    .replace(/<html lang="[^"]*">/, `<html lang="${language}">`)
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta name="description"[^>]*>/, "")
    .replace(/<meta name="theme-color"[^>]*>/, "")
    .replace("</head>", `${block}</head>`);
  return html.replace('<div id="root"></div>', `<div id="root">${staticBody(page)}</div>`);
}

function pageLanguage(page) {
  return page.lang === "en" ? "en" : page.lang === "ca" ? "ca" : "es";
}

function docSlug(page) {
  return page.path.replace(/^\/(?:en|ca)(?=\/|$)/, "").replace(/^\/docs\/?/, "");
}

function markdownSource(page) {
  const slug = docSlug(page);
  if (!slug || !page.path.includes("/docs/")) return null;
  return `/raw/${pageLanguage(page)}/${slug}.md`;
}

function markdownFile(page) {
  let slug = docSlug(page);
  if (!slug) return null;
  if (slug === "prisma/resumen") slug = "prisma/overview";
  const language = pageLanguage(page);
  return path.join(contentDir, language === "es" ? "" : language, `${slug}.md`);
}

function staticBody(page) {
  const language = pageLanguage(page);
  const file = markdownFile(page);
  let body = "";
  if (file && fs.existsSync(file)) {
    body = marked.parse(fs.readFileSync(file, "utf8"));
  } else if (page.path.replace(/^\/(?:en|ca)(?=\/|$)/, "") === "/docs") {
    const docs = PAGES.filter((entry) => entry.lang === language && entry.path.includes("/docs/") && !entry.noindex);
    body = `<h1>${language === "en" ? "Documentation" : language === "ca" ? "Documentació" : "Documentación"}</h1><ul>${docs.map((entry) => `<li><a href="${entry.path}">${esc(entry.title)}</a><p>${esc(entry.description)}</p></li>`).join("")}</ul>`;
  } else {
    return "";
  }
  return `<main class="page static-page"><div class="docs is-side-hidden"><article class="docs-body static-doc-body">${body}</article></div></main>`;
}

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

for (const page of PAGES) {
  const html = inject(template, page);
  if (page.path === "/") {
    fs.writeFileSync(path.join(dist, "index.html"), html);
    continue;
  }
  const dir = path.join(dist, page.path.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

const notFound = PAGES.find((p) => p.path === "/echos");
if (notFound) {
  fs.writeFileSync(path.join(dist, "404.html"), inject(template, notFound));
}

console.log(`og: wrote ${PAGES.length} html shells`);
