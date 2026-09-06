export const SITE = {
  name: "RxLabs®",
  url: "https://www.rogexlaboratories.com",
  docsUrl: "https://docs.rogexlaboratories.com",
  locale: "es_ES",
  localeAlt: "en_US",
  localeCa: "ca_ES",
  theme: "#000000",
  image: "/og.png",
  imageW: 1200,
  imageH: 480,
  imageAlt: "RxLabs® — laboratorio de investigación. echOS, PRISMA y echoAI.",
  imageAltEn: "RxLabs® — research laboratory. echOS, PRISMA and echoAI.",
  imageAltCa: "RxLabs® — laboratori de recerca. echOS, PRISMA i echoAI.",
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

const ES_PAGES = [
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

const EN_META = {
  "/": [
    "RxLabs® — research laboratory",
    "Roger Navarro's software laboratory in Girona. echOS, PRISMA and echoAI: ECHO-1 closed, causal transfer across worlds and a verifiable path towards autonomous edge robotics.",
  ],
  "/about": [
    "About RxLabs®",
    "RxLabs® is Roger Navarro's laboratory in Girona. echOS, PRISMA and echoAI: running code, published limitations and numbers that can be measured again.",
  ],
  "/contact": ["Contact — RxLabs®", "Contact RxLabs®: knightsys@proton.me — Roger Navarro, Girona."],
  "/docs": [
    "Documentation — RxLabs®",
    "Public laboratory documentation for echOS, PRISMA and echoAI. Measured figures, an honest surface and code that boots.",
  ],
  "/docs/echos/que-es": [
    "echOS — RxLabs®",
    "An x86_64 console unikernel. One ELF. GRUB Multiboot2. Boots in QEMU and on bare metal. In-kernel SNN (LIF / Q6). Research laboratory, real software.",
  ],
  "/docs/echos/limites": [
    "Limitations — echOS",
    "What echOS does not do, documented by the laboratory. Wi-Fi, native UEFI, audio and GPU acceleration are absent. Akida is a PCI probe; without a board it uses software LIF.",
  ],
  "/docs/echos/superficie": [
    "Surface — echOS",
    "echOS commands labelled REAL, NOTE or ABSENT. The surface does not promise more than the binary provides.",
  ],
  "/docs/echos/comandos": ["Commands — echOS", "Map of echOS commands. Tab reads CMD_NAMES. Use man <cmd> for flags."],
  "/docs/prisma/resumen": [
    "PRISMA — RxLabs®",
    "EEG analysis software for research. Real-time engine in Rust with measured 1.4–3.0 µs latency. Not a medical device.",
  ],
  "/docs/prisma/tecnico": [
    "PRISMA — technical documentation",
    "PRISMA Engine 0.1.0: delta modulation → LIF AVX2 → STDP. No heap allocations on the hot path. Bench figures measured on a machine, not brochure claims. Research software.",
  ],
  "/docs/lab/ecosistema": [
    "The laboratory — RxLabs®",
    "Three real lines of work: echOS, PRISMA and echoAI. Executable code, published limitations and a path from ECHO-1 towards edge robotics.",
  ],
  "/docs/echoai/que-es": [
    "echoAI — RxLabs®",
    "A two-clock situated agent. ECHO-1 is closed: memory, objects, patterns and causal transfer across three worlds, with the cortex disabled by default.",
  ],
  "/docs/echoai/piezas": [
    "echoAI — architecture",
    "16-byte WSP, CAM 4096, T, PatternMemory, Q, gate, ATTEND and an optional cortex. One bus, three channels and measured contracts.",
  ],
  "/docs/echoai/echo1": [
    "ECHO-1 — closure",
    "The complete ECHO-1 chain: SELF, ROOM, objects, opening, conflict, narration, patterns and transfer. 488 tests and an aggregate +128 gain.",
  ],
  "/docs/echoai/resultados": [
    "ECHO-1 — results and benchmark",
    "Visual ECHO-1 results: turn-by-turn learning, patterns at 80/80, transfer +128, cortical conflict, capabilities and reproducible data.",
  ],
  "/docs/echoai/proceso": [
    "echoAI — how it was built",
    "The echoAI experimental process: one KPI per slice, causal controls, adversarial review, mutants and reproducible reports.",
  ],
  "/docs/echoai/ruta": [
    "echoAI — ECHO-2 and ECHO-3",
    "Roadmap from ECHO-1 to autonomous survival, object recognition and physical robotics with cameras, LiDAR and edge drones.",
  ],
  "/docs/echoai/hardware": [
    "echoAI — planned hardware",
    "Candidate ECHO-3 platform: Crazyflie, X500/Pixhawk, Jetson, OAK-D, TFmini-S, Livox Mid-360 and optional Akida.",
  ],
  "/docs/echoai/limites": [
    "echoAI — limitations",
    "What ECHO-1 does not demonstrate and what must be verified before robotics: sensors, deadlines, failsafes, HIL, energy and absent hardware.",
  ],
  "/echos": ["404 — RxLabs®", "Not found."],
  "/prisma": ["404 — RxLabs®", "Not found."],
  "/echoai": ["404 — RxLabs®", "Not found."],
};

const CA_META = {
  "/": [
    "RxLabs® — laboratori de recerca",
    "Laboratori de programari de Roger Navarro a Girona. echOS, PRISMA i echoAI: ECHO-1 tancat, transferència causal entre mons i una ruta verificable cap a la robòtica autònoma a l'edge.",
  ],
  "/about": [
    "Què és RxLabs®",
    "RxLabs® és el laboratori de Roger Navarro a Girona. echOS, PRISMA i echoAI: codi que s'executa, límits publicats i xifres que es poden tornar a mesurar.",
  ],
  "/contact": ["Contacte — RxLabs®", "Contacte de RxLabs®: knightsys@proton.me — Roger Navarro, Girona."],
  "/docs": [
    "Documentació — RxLabs®",
    "Documentació pública del laboratori: echOS, PRISMA i echoAI. Xifres mesurades, superfície honesta i codi que arrenca.",
  ],
  "/docs/echos/que-es": [
    "echOS — RxLabs®",
    "Unikernel x86_64 de consola. Un ELF. GRUB Multiboot2. Arrenca en QEMU i en metall. SNN al nucli (LIF / Q6). Laboratori de recerca, programari real.",
  ],
  "/docs/echos/limites": [
    "Límits — echOS",
    "El que echOS no fa, documentat pel laboratori. Wi-Fi, UEFI natiu, àudio i acceleració GPU són absents. Akida és una sonda PCI; sense placa usa LIF per programari.",
  ],
  "/docs/echos/superficie": [
    "Superfície — echOS",
    "Ordres d'echOS etiquetades REAL, NOTA o ABSENT. La superfície no promet més del que ofereix el binari.",
  ],
  "/docs/echos/comandos": ["Ordres — echOS", "Mapa d'ordres d'echOS. Tab llegeix CMD_NAMES. Feu servir man <cmd> per als flags."],
  "/docs/prisma/resumen": [
    "PRISMA — RxLabs®",
    "Programari d'anàlisi d'EEG per a recerca. Motor de temps real en Rust amb latència mesurada d'1,4–3,0 µs. No és un producte sanitari.",
  ],
  "/docs/prisma/tecnico": [
    "PRISMA — documentació tècnica",
    "PRISMA Engine 0.1.0: modulació delta → LIF AVX2 → STDP. Sense reserves de heap al camí calent. Xifres de banc mesurades en una màquina, no afirmacions de fullet. Programari de recerca.",
  ],
  "/docs/lab/ecosistema": [
    "El laboratori — RxLabs®",
    "Tres línies reals de treball: echOS, PRISMA i echoAI. Codi executable, límits publicats i una ruta des d'ECHO-1 cap a la robòtica a l'edge.",
  ],
  "/docs/echoai/que-es": [
    "echoAI — RxLabs®",
    "Agent situat de dos rellotges. ECHO-1 tancat: memòria, objectes, patrons i transferència causal entre tres mons, amb el còrtex apagat per defecte.",
  ],
  "/docs/echoai/piezas": [
    "echoAI — arquitectura",
    "WSP de 16 bytes, CAM 4096, T, PatternMemory, Q, gate, ATTEND i còrtex opcional. Un bus, tres canals i contractes mesurats.",
  ],
  "/docs/echoai/echo1": [
    "ECHO-1 — tancament",
    "Cadena completa d'ECHO-1: SELF, ROOM, objectes, obertura, conflicte, narració, patrons i transferència. 488 proves i un guany agregat de +128.",
  ],
  "/docs/echoai/resultados": [
    "ECHO-1 — resultats i benchmark",
    "Resultats visuals d'ECHO-1: aprenentatge torn a torn, patrons 80/80, transferència +128, conflicte cortical, capacitats i dades reproduïbles.",
  ],
  "/docs/echoai/proceso": [
    "echoAI — com es va construir",
    "Procés experimental d'echoAI: un KPI per slice, controls causals, revisió adversarial, mutants i informes reproduïbles.",
  ],
  "/docs/echoai/ruta": [
    "echoAI — ECHO-2 i ECHO-3",
    "Full de ruta d'ECHO-1 cap a supervivència autònoma, reconeixement d'objectes i robòtica física amb càmera, LiDAR i drons a l'edge.",
  ],
  "/docs/echoai/hardware": [
    "echoAI — maquinari previst",
    "Plataforma candidata per a ECHO-3: Crazyflie, X500/Pixhawk, Jetson, OAK-D, TFmini-S, Livox Mid-360 i Akida opcional.",
  ],
  "/docs/echoai/limites": [
    "echoAI — límits",
    "Què no demostra ECHO-1 i què cal verificar abans de la robòtica: sensors, deadlines, failsafes, HIL, energia i maquinari absent.",
  ],
  "/echos": ["404 — RxLabs®", "No trobat."],
  "/prisma": ["404 — RxLabs®", "No trobat."],
  "/echoai": ["404 — RxLabs®", "No trobat."],
};

const spanishPages = ES_PAGES.map((page) => ({ ...page, lang: "es" }));
const englishPages = ES_PAGES.map((page) => {
  const [title, description] = EN_META[page.path];
  return {
    ...page,
    path: page.path === "/" ? "/en" : `/en${page.path}`,
    title,
    description,
    lang: "en",
  };
});

const catalanPages = ES_PAGES.map((page) => {
  const [title, description] = CA_META[page.path];
  return {
    ...page,
    path: page.path === "/" ? "/ca" : `/ca${page.path}`,
    title,
    description,
    lang: "ca",
  };
});

export const PAGES = [...spanishPages, ...englishPages, ...catalanPages];

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
  const source = page?.path?.includes("/docs/echoai/") ? ECHOAI_OG : SITE;
  return {
    url: abs(source.image),
    width: source.imageW,
    height: source.imageH,
    alt: source === SITE
      ? page?.lang === "en" ? SITE.imageAltEn : page?.lang === "ca" ? SITE.imageAltCa : SITE.imageAlt
      : source.imageAlt,
  };
}

export function jsonLd(page) {
  const language = page?.lang === "en" ? "en" : page?.lang === "ca" ? "ca" : "es";
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
    description: language === "en"
      ? "Software research laboratory. echOS, PRISMA and echoAI: running code and measured numbers."
      : language === "ca"
        ? "Laboratori de recerca de programari. echOS, PRISMA i echoAI: codi que s'executa i xifres mesurades."
        : "Laboratorio de investigación de software. echOS, PRISMA y echoAI: código que corre, números medidos.",
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
        inLanguage: language,
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
        author: { "@type": "Person", name: SITE.author },
      },
    ],
  };
}
