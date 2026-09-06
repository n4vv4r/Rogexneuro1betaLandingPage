export const LANGUAGES = ["es", "en"];

export function languageForPath(pathname = "/") {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export function basePath(pathname = "/") {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localizedPath(pathname = "/", language = "es") {
  const base = basePath(pathname);
  if (language === "es") return base;
  return base === "/" ? "/en" : `/en${base}`;
}

export function docsPagePath(pathname = "/", docsHost = false) {
  const language = languageForPath(pathname);
  const base = basePath(pathname);
  if (!docsHost) return localizedPath(base, language);
  const docsPath = base === "/" ? "/docs" : `/docs${base}`.replace(/^\/docs\/docs/, "/docs");
  return localizedPath(docsPath, language);
}

export function alternatePaths(pathname = "/") {
  return {
    es: localizedPath(pathname, "es"),
    en: localizedPath(pathname, "en"),
  };
}
