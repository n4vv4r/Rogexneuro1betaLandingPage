// Emit static fallbacks: copy dist/index.html into dist/<route>/index.html so
// deep links (/faq, /docs/..., ...) resolve on ANY static host — with or
// without SPA rewrites. Vercel rewrites stay as the first mechanism.
import { mkdirSync, copyFileSync, writeFileSync } from "node:fs";

const routes = [
  "downloads",
  "docs",
  "docs/architecture",
  "docs/editions",
  "docs/echo",
  "docs/packages",
  "docs/packages-spec",
  "docs/video",
  "docs/install",
  "docs/roadmap",
  "faq",
  "privacy",
  "legal",
];

for (const r of routes) {
  mkdirSync(`dist/${r}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${r}/index.html`);
}

copyFileSync("dist/index.html", "dist/404.html");
writeFileSync("dist/.nojekyll", "");
console.log(`[postbuild] ${routes.length} route fallbacks + 404.html written`);
