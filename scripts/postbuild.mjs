import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES, SITE, abs, imageFor, jsonLd } from "../src/site.js";
import { alternatePaths } from "../src/i18n.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

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
  const language = page.lang === "en" ? "en" : "es";
  const locales = language === "en"
    ? { current: SITE.localeAlt, alternate: SITE.locale }
    : { current: SITE.locale, alternate: SITE.localeAlt };
  const alternate = alternatePaths(page.path);
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
    <link rel="alternate" hreflang="x-default" href="${abs(alternate.es)}" />
    <link rel="image_src" href="${image.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(SITE.name)}" />
    <meta property="og:locale" content="${locales.current}" />
    <meta property="og:locale:alternate" content="${locales.alternate}" />
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image.url}" />
    <meta property="og:image:secure_url" content="${image.url}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="${image.width}" />
    <meta property="og:image:height" content="${image.height}" />
    <meta property="og:image:alt" content="${esc(image.alt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(page.title)}" />
    <meta name="twitter:description" content="${esc(page.description)}" />
    <meta name="twitter:image" content="${image.url}" />
    <meta name="twitter:image:alt" content="${esc(image.alt)}" />
`;

  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${language}">`)
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta name="description"[^>]*>/, "")
    .replace(/<meta name="theme-color"[^>]*>/, "")
    .replace("</head>", `${block}</head>`);
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
