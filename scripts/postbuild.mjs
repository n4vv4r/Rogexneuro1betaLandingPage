// Emit static fallbacks: copy dist/index.html into dist/<route>/index.html so
// deep links (/faq, /docs/..., ...) resolve on ANY static host — with or
// without SPA rewrites. Vercel rewrites stay as the first mechanism.
import { mkdirSync, copyFileSync, writeFileSync } from "node:fs";

const docIds = [
  "overview", "whats-new", "users", "curious", "technical", "research",
  "install", "cli", "commands", "network", "epk", "editions", "faq-echos",
  "heap-0", "neuromorphic", "filesystem", "limits", "building",
  "architecture", "echo", "packages", "packages-spec", "video", "roadmap",
];

const routes = [
  "downloads",
  "packages",
  "rx-os/packages",
  "validation",
  "docs",
  ...docIds.map((id) => `docs/${id}`),
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
