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
  imageAlt: "RxLabs® — laboratorio de investigación. echOS, PRISMA y echoAI.",
  twitter: "",
  email: "knightsys@proton.me",
  author: "Roger Navarro",
};

export const PAGES = [
  {
    path: "/",
    title: "RxLabs® — laboratorio de investigación",
    description:
      "Laboratorio de software de Roger Navarro (Girona). Tres líneas reales y medidas: echOS (unikernel que arranca), PRISMA (motor de EEG en microsegundos) y echoAI (agente de dos relojes, CORTEX-1 verde). Investigación, no humo.",
  },
  {
    path: "/about",
    title: "Qué es RxLabs®",
    description:
      "RxLabs® es el laboratorio de Roger Navarro, 20 años, Girona. echOS, PRISMA y echoAI: código que corre, números que se pueden volver a medir.",
  },
  {
    path: "/contact",
    title: "Contacto — RxLabs®",
    description: "Contacto de RxLabs®: knightsys@proton.me — Roger Navarro, Girona.",
  },
  {
    path: "/community",
    title: "Comunidad — RxLabs®",
    description: "Discord de RxLabs®. Laboratorio de investigación: echOS, PRISMA, echoAI.",
  },
  {
    path: "/docs",
    title: "Documentación — RxLabs®",
    description:
      "Docs públicas del laboratorio: echOS, PRISMA y echoAI. Cifras medidas, superficie honesta, código que arranca.",
  },
  {
    path: "/docs/echos/que-es",
    title: "echOS — RxLabs®",
    description:
      "Unikernel x86_64 de consola. Un ELF. GRUB Multiboot2. Arranca en QEMU y en metal. SNN in-kernel (LIF / Q6). Laboratorio de investigación, software real.",
  },
  {
    path: "/docs/echos/limites",
    title: "Límites — echOS",
    description:
      "Lo que echOS no hace, escrito por el laboratorio. WiFi, UEFI nativo, audio, GPU: ausentes. Akida: sonda PCI, sin placa = software LIF.",
  },
  {
    path: "/docs/echos/superficie",
    title: "Superficie — echOS",
    description:
      "Comandos de echOS etiquetados REAL, NOTA o AUSENTE. La superficie no promete el binario.",
  },
  {
    path: "/docs/echos/comandos",
    title: "Comandos — echOS",
    description: "Mapa de comandos de echOS. Tab lee CMD_NAMES. man <cmd> para flags.",
  },
  {
    path: "/docs/prisma/resumen",
    title: "PRISMA — RxLabs®",
    description:
      "Software de análisis de EEG para investigación. Motor de tiempo real en Rust, latencia medida 1.4–3.0 µs. No es un producto sanitario.",
  },
  {
    path: "/docs/prisma/tecnico",
    title: "PRISMA — técnico",
    description:
      "PRISMA Engine 0.1.0: delta modulation → LIF AVX2 → STDP. Hot-path sin heap. Cifras de bench en máquina, no de folleto. Investigación.",
  },
  {
    path: "/docs/lab/ecosistema",
    title: "El laboratorio — RxLabs®",
    description:
      "Tres líneas reales: echOS, PRISMA, echoAI. Comparten WSP de 16 bytes y la sonda Akida. Investigación medida en Girona.",
  },
  {
    path: "/docs/echoai/que-es",
    title: "echoAI — RxLabs®",
    description:
      "Agente de dos relojes. CORTEX-1 verde: letrero en español, córtex +16, rápido 0. Preguntar +80 vs −80. ATTEND 36/256. Laboratorio, cifras reproducibles.",
  },
  {
    path: "/docs/echoai/piezas",
    title: "echoAI — las piezas",
    description:
      "WSP 16 B, CAM 4096, T, Q[4096][3], gate, ATTEND, oráculo, córtex. Cada pieza medida. El 4B se cuelga del enchufe que ya existe.",
  },
  {
    path: "/docs/echoai/ruta",
    title: "echoAI — hoja de ruta",
    description:
      "Hecho: anillo, preguntar, pasillo, placa, CORTEX-1. Siguiente: Qwen3-4B local, mundo grande, sleep, cuerpo, Akida.",
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
  {
    path: "/echoai",
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

export function jsonLd(page) {
  const org = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ResearchOrganization"],
    name: "RxLabs",
    alternateName: ["Rogex Laboratories", "Knights Labs"],
    url: SITE.url,
    logo: abs(SITE.image),
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Girona",
      addressCountry: "ES",
    },
    founder: { "@type": "Person", name: SITE.author },
    description:
      "Laboratorio de investigación de software. echOS, PRISMA y echoAI: código que corre, números medidos.",
  };
  if (!page || page.noindex) return org;
  return {
    "@context": "https://schema.org",
    "@graph": [
      org,
      {
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: abs(page.path),
        inLanguage: "es",
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
        author: { "@type": "Person", name: SITE.author },
      },
    ],
  };
}
