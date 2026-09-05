import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES, SITE } from "../src/site.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const contentDir = path.join(root, "src", "content");

const docs = [
  ["lab/ecosistema", "lab/ecosistema.md"],
  ["echoai/que-es", "echoai/que-es.md"],
  ["echoai/piezas", "echoai/piezas.md"],
  ["echoai/echo1", "echoai/echo1.md"],
  ["echoai/resultados", "echoai/resultados.md"],
  ["echoai/proceso", "echoai/proceso.md"],
  ["echoai/ruta", "echoai/ruta.md"],
  ["echoai/hardware", "echoai/hardware.md"],
  ["echoai/limites", "echoai/limites.md"],
  ["echos/que-es", "echos/que-es.md"],
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

const lastmod = "2026-09-05";
const indexable = PAGES.filter((page) => !page.noindex);
const urls = indexable.map((page) => {
  const priority = page.path === "/" ? "1.0"
    : page.path === "/docs" || page.path === "/docs/echoai/que-es" ? "0.9"
      : page.path.startsWith("/docs/") ? "0.8" : "0.7";
  return `  <url><loc>${SITE.url}${page.path === "/" ? "/" : page.path}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`;
});

for (const [slug] of docs) {
  urls.push(`  <url><loc>${SITE.docsUrl}/${slug}</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);
}
urls.push(`  <url><loc>${SITE.url}/llms.txt</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);
urls.push(`  <url><loc>${SITE.url}/llms-full.txt</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>`);

const sitemap = [
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
  "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
  ...urls,
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
console.log(`docs: synced ${docs.length} documents and ${urls.length} URLs`);
