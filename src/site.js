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

export const ECHOAI_OG = {
  image: "/media/echoai/opengraph/echoai.png",
  imageW: 1200,
  imageH: 480,
  imageAlt: "ECHO-AI — RxLabs®",
};

export const PAGES = [
  {
    path: "/",
    title: "RxLabs® — laboratorio de investigación",
    description:
      "Laboratorio de software de Roger Navarro (Girona). echOS, PRISMA y echoAI: ECHO-1 cerrado, transferencia causal entre mundos y una ruta verificable hacia robótica autónoma al edge.",
  },
  {
    path: "/about",
    title: "Qué es RxLabs®",
    description:
      "RxLabs® es el laboratorio de Roger Navarro, Girona. echOS, PRISMA y echoAI: código que corre, límites publicados y números que se pueden volver a medir.",
  },
  {
    path: "/contact",
    title: "Contacto — RxLabs®",
    description: "Contacto de RxLabs®: knightsys@proton.me — Roger Navarro, Girona.",
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
      "Tres líneas reales: echOS, PRISMA y echoAI. Código ejecutable, límites publicados y una ruta desde ECHO-1 hacia robótica al edge.",
  },
  {
    path: "/docs/echoai/que-es",
    title: "echoAI — RxLabs®",
    description:
      "Agente situado de dos relojes. ECHO-1 cerrado: memoria, objetos, patrones y transferencia causal entre tres mundos, con el córtex apagado por defecto.",
  },
  {
    path: "/docs/echoai/piezas",
    title: "echoAI — arquitectura",
    description:
      "WSP 16 B, CAM 4096, T, PatternMemory, Q, gate, ATTEND y córtex opcional. Un bus, tres canales y contratos medidos.",
  },
  {
    path: "/docs/echoai/echo1",
    title: "ECHO-1 — cierre",
    description:
      "Cadena completa de ECHO-1: SELF, ROOM, objetos, abrir, conflicto, narración, patrones y transferencia. 488 pruebas y +128 agregado.",
  },
  {
    path: "/docs/echoai/resultados",
    title: "ECHO-1 — resultados y benchmark",
    description:
      "Resultados visuales de ECHO-1: aprendizaje por turno, patrones 80/80, transferencia +128, conflicto cortical, capacidades y datos reproducibles.",
  },
  {
    path: "/docs/echoai/proceso",
    title: "echoAI — cómo se construyó",
    description:
      "Proceso experimental de echoAI: un KPI por slice, controles causales, revisión adversarial, mutantes e informes reproducibles.",
  },
  {
    path: "/docs/echoai/ruta",
    title: "echoAI — ECHO-2 y ECHO-3",
    description:
      "Hoja de ruta desde ECHO-1 hacia supervivencia autónoma, reconocimiento de objetos y robótica física con cámara, LiDAR y drones al edge.",
  },
  {
    path: "/docs/echoai/hardware",
    title: "echoAI — hardware previsto",
    description:
      "Plataforma candidata hacia ECHO-3: Crazyflie, X500/Pixhawk, Jetson, OAK-D, TFmini-S, Livox Mid-360 y Akida opcional.",
  },
  {
    path: "/docs/echoai/limites",
    title: "echoAI — límites",
    description:
      "Qué no demuestra ECHO-1 y qué debe verificarse antes de robótica: sensores, deadlines, failsafes, HIL, energía y hardware ausente.",
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

export function imageFor(page) {
  const source = page?.path?.startsWith("/docs/echoai/") ? ECHOAI_OG : SITE;
  return {
    url: abs(source.image),
    width: source.imageW,
    height: source.imageH,
    alt: source.imageAlt,
  };
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
