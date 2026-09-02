export const SITE = {
  name: "RxLabs®",
  url: "https://www.rogexlaboratories.com",
  docsUrl: "https://docs.rogexlaboratories.com",
  locale: "es_ES",
  localeAlt: "en_US",
  theme: "#000000",
  image: "/og.png",
  imageW: 1200,
  imageH: 480,
  imageAlt: "RxLabs® — echOS and PRISMA",
  twitter: "",
};

export const PAGES = [
  {
    path: "/",
    title: "RxLabs®",
    description:
      "Laboratorio de software de Roger Navarro. echOS 2.1.0-honest y PRISMA. Investigación. Girona.",
  },
  {
    path: "/about",
    title: "Qué es RxLabs®",
    description:
      "RxLabs® — Roger Navarro, 20 años, Girona. Unikernel echOS 2.1.0-honest y software de EEG PRISMA. No es un producto sanitario.",
  },
  {
    path: "/contact",
    title: "Contacto — RxLabs®",
    description: "Contacto de RxLabs®: knightsys@proton.me — Roger Navarro, Girona.",
  },
  {
    path: "/community",
    title: "Comunidad — RxLabs®",
    description: "Discord de RxLabs®.",
  },
  {
    path: "/docs",
    title: "Documentación — RxLabs®",
    description:
      "Documentación pública: echOS 2.1.0-honest y PRISMA 5 SNN. Sin 1.0 ni 2.0.",
  },
  {
    path: "/docs/echos/que-es",
    title: "echOS 2.1.0-honest — RxLabs®",
    description: "Unikernel x86_64 de consola. Un ELF. Sin Linux. Sin escritorio.",
  },
  {
    path: "/docs/echos/limites",
    title: "Límites — echOS 2.1.0-honest",
    description: "Lo que echOS 2.1.0-honest no hace.",
  },
  {
    path: "/docs/echos/superficie",
    title: "Superficie — echOS 2.1.0-honest",
    description: "Comandos REAL / NOTA / AUSENTE de echOS 2.1.0-honest.",
  },
  {
    path: "/docs/echos/comandos",
    title: "Comandos — echOS 2.1.0-honest",
    description: "Lista de comandos de echOS 2.1.0-honest.",
  },
  {
    path: "/docs/prisma/overview",
    title: "PRISMA — overview",
    description:
      "Software de análisis de EEG para investigación. No es un producto sanitario.",
  },
  {
    path: "/docs/prisma/technical",
    title: "PRISMA — technical",
    description:
      "PRISMA Engine and analysis layer. Research software, not a medical device.",
  },
  {
    path: "/docs/prisma/social",
    title: "PRISMA — social",
    description: "Textos públicos de PRISMA. Uso en investigación.",
  },
  {
    path: "/echos",
    title: "404 — RxLabs®",
    description: "No encontrado.",
    noindex: true,
  },
  {
    path: "/prisma",
    title: "404 — RxLabs®",
    description: "No encontrado.",
    noindex: true,
  },
];

export function pageFor(pathname) {
  const p = (pathname || "/").replace(/\/+$/, "") || "/";
  return PAGES.find((x) => x.path === p) || PAGES.find((x) => x.path === "/") || PAGES[0];
}

export function abs(path) {
  if (!path) return SITE.url;
  if (path.startsWith("http")) return path;
  return SITE.url.replace(/\/$/, "") + (path.startsWith("/") ? path : `/${path}`);
}
