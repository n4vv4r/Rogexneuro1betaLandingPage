import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES, SITE } from "../src/site.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const contentDir = path.join(root, "src", "content");
const englishPublicDir = path.join(publicDir, "en");
const catalanPublicDir = path.join(publicDir, "ca");

const docs = [
  ["lab/ecosistema", "lab/ecosistema.md"],
  ["echoai/que-es", "echoai/que-es.md"],
  ["echoai/piezas", "echoai/piezas.md"],
  ["echoai/echo1", "echoai/echo1.md"],
  ["echoai/echo2", "echoai/echo2.md"],
  ["echoai/resultados", "echoai/resultados.md"],
  ["echoai/proceso", "echoai/proceso.md"],
  ["echoai/ruta", "echoai/ruta.md"],
  ["echoai/hardware", "echoai/hardware.md"],
  ["echoai/limites", "echoai/limites.md"],
  ["echos/que-es", "echos/que-es.md"],
  ["echos/guia", "echos/guia.md"],
  ["echos/arquitectura", "echos/arquitectura.md"],
  ["echos/evidencia", "echos/evidencia.md"],
  ["echos/galeria", "echos/galeria.md"],
  ["echos/limites", "echos/limites.md"],
  ["echos/superficie", "echos/superficie.md"],
  ["echos/comandos", "echos/comandos.md"],
  ["prisma/resumen", "prisma/overview.md"],
  ["prisma/tecnico", "prisma/tecnico.md"],
];

const full = [
  "# RxLabs® — texto completo para modelos",
  "",
  "> Laboratorio de investigación de Roger Navarro (Girona). Software real, cifras medidas.",
  `> Fuente: docs públicas. Sitio: ${SITE.url}`,
  "",
  ...docs.flatMap(([slug, file]) => [
    "---",
    "",
    `<!-- src/content/${file} · /docs/${slug} -->`,
    "",
    fs.readFileSync(path.join(contentDir, file), "utf8").trim(),
    "",
  ]),
].join("\n");

fs.writeFileSync(path.join(publicDir, "llms-full.txt"), `${full.trimEnd()}\n`);

const englishFull = [
  "# RxLabs® — complete text for models",
  "",
  "> Roger Navarro's research laboratory in Girona. Real software, measured figures.",
  `> Source: public documentation. Site: ${SITE.url}/en`,
  "",
  ...docs.flatMap(([slug, file]) => [
    "---",
    "",
    `<!-- src/content/en/${file} · /en/docs/${slug} -->`,
    "",
    fs.readFileSync(path.join(contentDir, "en", file), "utf8").trim(),
    "",
  ]),
].join("\n");

fs.mkdirSync(englishPublicDir, { recursive: true });
fs.writeFileSync(path.join(englishPublicDir, "llms-full.txt"), `${englishFull.trimEnd()}\n`);

const catalanFull = [
  "# RxLabs® — text complet per a models",
  "",
  "> Laboratori de recerca de Roger Navarro a Girona. Programari real, xifres mesurades.",
  `> Font: documentació pública. Lloc: ${SITE.url}/ca`,
  "",
  ...docs.flatMap(([slug, file]) => [
    "---",
    "",
    `<!-- src/content/ca/${file} · /ca/docs/${slug} -->`,
    "",
    fs.readFileSync(path.join(contentDir, "ca", file), "utf8").trim(),
    "",
  ]),
].join("\n");

fs.mkdirSync(catalanPublicDir, { recursive: true });
fs.writeFileSync(path.join(catalanPublicDir, "llms-full.txt"), `${catalanFull.trimEnd()}\n`);

for (const language of ["es", "en", "ca"]) {
  for (const [slug, file] of docs) {
    const source = path.join(contentDir, language === "es" ? "" : language, file);
    const target = path.join(publicDir, "raw", language, `${slug}.md`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
}

const lastmod = "2026-09-10";
const indexable = PAGES.filter((page) => !page.noindex);
const urls = indexable.map((page) => {
  const base = page.path.replace(/^\/(?:en|ca)(?=\/|$)/, "") || "/";
  const priority = base === "/" ? "1.0"
    : base === "/docs" || base === "/docs/echoai/que-es" ? "0.9"
      : base.startsWith("/docs/") ? "0.8" : "0.7";
  const loc = `${SITE.url}${page.path === "/" ? "/" : page.path}`;
  if (page.path.includes("/docs/echoai/echo2")) {
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority><video:video><video:thumbnail_loc>${SITE.url}/media/echoai/opengraph/echo2.png</video:thumbnail_loc><video:title>${xml(page.title)}</video:title><video:description>${xml(page.description)}</video:description><video:content_loc>${SITE.url}/media/echoai/echo2-neural-viz-demo.mp4</video:content_loc><video:duration>123</video:duration><video:publication_date>2026-09-09T21:10:07Z</video:publication_date></video:video></url>`;
  }
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`;
});

for (const [slug] of docs) {
  urls.push(`  <url><loc>${SITE.docsUrl}/${slug}</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);
  urls.push(`  <url><loc>${SITE.docsUrl}/en/${slug}</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);
  urls.push(`  <url><loc>${SITE.docsUrl}/ca/${slug}</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);
}
urls.push(`  <url><loc>${SITE.url}/llms.txt</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);
urls.push(`  <url><loc>${SITE.url}/llms-full.txt</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);
urls.push(`  <url><loc>${SITE.url}/en/llms.txt</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);
urls.push(`  <url><loc>${SITE.url}/en/llms-full.txt</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);
urls.push(`  <url><loc>${SITE.url}/ca/llms.txt</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);
urls.push(`  <url><loc>${SITE.url}/ca/llms-full.txt</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);

const sitemap = [
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
  "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:video=\"http://www.google.com/schemas/sitemap-video/1.1\">",
  ...urls,
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
console.log(`docs: synced ${docs.length * 3} documents and ${urls.length} URLs`);

function xml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
