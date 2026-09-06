export const LANGUAGES = ["es", "en", "ca"];

export function languageForPath(pathname = "/") {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/ca" || pathname.startsWith("/ca/")) return "ca";
  return "es";
}

export function basePath(pathname = "/") {
  if (pathname === "/en" || pathname === "/ca") return "/";
  if (pathname.startsWith("/en/") || pathname.startsWith("/ca/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localizedPath(pathname = "/", language = "es") {
  const base = basePath(pathname);
  if (language === "es") return base;
  return base === "/" ? `/${language}` : `/${language}${base}`;
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
    ca: localizedPath(pathname, "ca"),
  };
}
