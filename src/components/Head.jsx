import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE, ECHO2_VIDEO, abs, imageFor, pageFor, jsonLd } from "../site.js";
import { alternatePaths, docsPagePath } from "../i18n.js";

function upsert(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertAlternate(hrefLang, href) {
  let el = document.head.querySelector(`link[rel="alternate"][hreflang="${hrefLang}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hrefLang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function replaceOgLocaleAlternates(language) {
  const locales = { es: SITE.locale, en: SITE.localeAlt, ca: SITE.localeCa };
  document.head.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el) => el.remove());
  for (const [code, locale] of Object.entries(locales)) {
    if (code === language) continue;
    const el = document.createElement("meta");
    el.setAttribute("property", "og:locale:alternate");
    el.setAttribute("content", locale);
    document.head.appendChild(el);
  }
}

function replaceVideoMetadata(page) {
  document.head.querySelectorAll('meta[property^="og:video"]').forEach((el) => el.remove());
  if (!page.path.includes("/docs/echoai/echo2")) return;
  const fields = {
    "og:video": abs(ECHO2_VIDEO),
    "og:video:secure_url": abs(ECHO2_VIDEO),
    "og:video:type": "video/mp4",
    "og:video:width": "1280",
    "og:video:height": "720",
  };
  for (const [property, content] of Object.entries(fields)) {
    upsert(`meta[property="${property}"]`, { property, content });
  }
}

function replaceMarkdownAlternate(page, language) {
  document.head.querySelectorAll('link[rel="alternate"][type="text/markdown"]').forEach((el) => el.remove());
  if (!page.path.includes("/docs/")) return;
  const slug = page.path.replace(/^\/(?:en|ca)(?=\/|$)/, "").replace(/^\/docs\//, "");
  const el = document.createElement("link");
  el.rel = "alternate";
  el.type = "text/markdown";
  el.href = abs(`/raw/${language}/${slug}.md`);
  document.head.appendChild(el);
}

export default function Head() {
  const loc = useLocation();
  const docsHost =
    typeof window !== "undefined" &&
    window.location.hostname === "docs.rogexlaboratories.com";

  useEffect(() => {
    const path = docsPagePath(loc.pathname, docsHost);
    const page = pageFor(path);
    const language = page.lang === "en" ? "en" : page.lang === "ca" ? "ca" : "es";
    const locales = { es: SITE.locale, en: SITE.localeAlt, ca: SITE.localeCa };
    const alternates = alternatePaths(page.path);
    const url = abs(page.path);
    const image = imageFor(page);

    document.title = page.title;
    document.documentElement.lang = language;
    document.documentElement.style.colorScheme = "dark";

    upsert('meta[name="description"]', { name: "description", content: page.description });
    upsert('meta[name="theme-color"]', { name: "theme-color", content: SITE.theme });
    upsert('meta[name="msapplication-TileColor"]', {
      name: "msapplication-TileColor",
      content: SITE.theme,
    });
    upsert('meta[name="color-scheme"]', { name: "color-scheme", content: "dark" });
    upsert('meta[name="robots"]', {
      name: "robots",
      content: page.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    });
    upsert('meta[name="author"]', { name: "author", content: SITE.author });
    upsert('meta[name="citation_author"]', { name: "citation_author", content: SITE.author });

    const og = {
      "og:type": "website",
      "og:site_name": SITE.name,
      "og:locale": locales[language],
      "og:title": page.title,
      "og:description": page.description,
      "og:url": url,
      "og:image": image.url,
      "og:image:secure_url": image.url,
      "og:image:type": "image/png",
      "og:image:width": String(image.width),
      "og:image:height": String(image.height),
      "og:image:alt": image.alt,
    };
    for (const [k, v] of Object.entries(og)) {
      upsert(`meta[property="${k}"]`, { property: k, content: v });
    }
    replaceOgLocaleAlternates(language);
    replaceVideoMetadata(page);
    replaceMarkdownAlternate(page, language);

    upsert('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsert('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
    upsert('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: page.description,
    });
    upsert('meta[name="twitter:image"]', { name: "twitter:image", content: image.url });
    upsert('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: image.alt });

    upsertLink("canonical", url);
    upsertLink("image_src", image.url);
    upsertAlternate("es", abs(alternates.es));
    upsertAlternate("en", abs(alternates.en));
    upsertAlternate("ca", abs(alternates.ca));
    upsertAlternate("x-default", abs(alternates.es));

    let ld = document.getElementById("rxlabs-ld");
    if (!ld) {
      ld = document.createElement("script");
      ld.id = "rxlabs-ld";
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(jsonLd(page));
  }, [loc.pathname, docsHost]);

  return null;
}
