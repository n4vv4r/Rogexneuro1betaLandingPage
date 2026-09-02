import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE, abs, pageFor } from "../site.js";

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

export default function Head() {
  const loc = useLocation();
  const docsHost =
    typeof window !== "undefined" &&
    window.location.hostname === "docs.rogexlaboratories.com";

  useEffect(() => {
    const path = docsHost
      ? loc.pathname === "/"
        ? "/docs"
        : `/docs${loc.pathname}`.replace(/\/docs\/docs/, "/docs")
      : loc.pathname;
    const page = pageFor(path);
    const url = abs(page.path);
    const img = abs(SITE.image);

    document.title = page.title;
    document.documentElement.lang = "es";
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
      content: page.noindex ? "noindex, nofollow" : "index, follow",
    });

    const og = {
      "og:type": "website",
      "og:site_name": SITE.name,
      "og:locale": SITE.locale,
      "og:title": page.title,
      "og:description": page.description,
      "og:url": url,
      "og:image": img,
      "og:image:secure_url": img,
      "og:image:type": "image/png",
      "og:image:width": String(SITE.imageW),
      "og:image:height": String(SITE.imageH),
      "og:image:alt": SITE.imageAlt,
    };
    for (const [k, v] of Object.entries(og)) {
      upsert(`meta[property="${k}"]`, { property: k, content: v });
    }

    upsert('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsert('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
    upsert('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: page.description,
    });
    upsert('meta[name="twitter:image"]', { name: "twitter:image", content: img });
    upsert('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: SITE.imageAlt });

    upsertLink("canonical", url);
    upsertLink("image_src", img);
  }, [loc.pathname, docsHost]);

  return null;
}
