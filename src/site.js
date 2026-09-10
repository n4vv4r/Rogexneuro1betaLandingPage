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

export const ECHO2_OG = {
  image: "/media/echoai/opengraph/echo2.png",
  imageW: 1200,
  imageH: 630,
  imageAlt: "ECHO-2 en directo — red neuronal y dron 3D",
  imageAltEn: "ECHO-2 live — neural network and 3D drone",
  imageAltCa: "ECHO-2 en directe — xarxa neuronal i dron 3D",
};

export const ECHO2_VIDEO = "/media/echoai/echo2-neural-viz-demo.mp4";

const ES_PAGES = [
  {
    path: "/",
    title: "RxLabs® — laboratorio de investigación",
    description:
      "Laboratorio de software de Roger Navarro (Girona). echOS 3.0 para robótica al edge, PRISMA y echoAI: software real, límites publicados y cifras medibles.",
  },
  {
    path: "/about",
    title: "Qué es RxLabs®",
    description:
      "RxLabs® es el laboratorio de Roger Navarro, Girona. echOS 3.0, PRISMA y echoAI: código que corre, límites publicados y números que se pueden volver a medir.",
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
      "Docs públicas del laboratorio: echOS 3.0, PRISMA y echoAI. Guías, arquitectura, evidencia, capturas reales y límites publicados.",
  },
  {
    path: "/docs/echos/que-es",
    title: "echOS — RxLabs®",
    description:
      "echOS 3.0: unikernel para robótica al edge, sin Linux ni LLM. Arranque x86_64 BIOS/UEFI y AArch64 UEFI, runtime acotado y puente PX4.",
  },
  {
    path: "/docs/echos/guia",
    title: "Guía de uso — echOS 3.0",
    description: "Cómo arrancar echOS 3.0, leer su estado, ejecutar el escenario robótico, usar paneles y conectar PX4 SITL.",
  },
  {
    path: "/docs/echos/arquitectura",
    title: "Arquitectura — echOS 3.0",
    description: "Arquitectura multiplataforma, Sensor e Intent ABI, colas estáticas, safety gate, MAVLink 2, PX4, NVMe y GPT.",
  },
  {
    path: "/docs/echos/evidencia",
    title: "Evidencia — echOS 3.0",
    description: "541 comprobaciones verdes: BIOS, UEFI, ARM64, NVMe/GPT, persistencia, runtime robótico y PX4 con datos descargables.",
  },
  {
    path: "/docs/echos/galeria",
    title: "Galería real — echOS 3.0",
    description: "13 capturas directas de QEMU con el registro serie de cada arranque, más transcripciones AArch64 directas y UEFI.",
  },
  {
    path: "/docs/echos/limites",
    title: "Límites — echOS",
    description:
      "Límites actuales de echOS 3.0: sin SMP, framebuffer ARM64, ACPI, vuelo certificado ni control directo de actuadores.",
  },
  {
    path: "/docs/echos/superficie",
    title: "Superficie — echOS",
    description:
      "Plataformas, pipeline robótico, almacenamiento y consola que ofrece realmente echOS 3.0.",
  },
  {
    path: "/docs/echos/comandos",
    title: "Comandos — echOS",
    description: "Comandos de echOS 3.0 para diagnóstico, robótica, PX4, consola, red y certificación desde el host.",
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
      "Tres líneas reales: echOS, PRISMA y echoAI. ECHO-1 y ECHO-2 cerrados, código ejecutable, límites publicados y ECHO-3 hacia robótica al edge.",
  },
  {
    path: "/docs/echoai/que-es",
    title: "echoAI — RxLabs®",
    description:
      "Agente situado de dos relojes. ECHO-1 y ECHO-2 cerrados: memoria, supervivencia, patrones, consolidación, herencia y control interno medidos.",
  },
  {
    path: "/docs/echoai/piezas",
    title: "echoAI — arquitectura",
    description:
      "WSP 16 B, CAM 4096, T, PatternMemory, Q, gate y monitor de 512 LIF + 128 Adaptive-LIF. Un bus y contratos medidos.",
  },
  {
    path: "/docs/echoai/echo1",
    title: "ECHO-1 — cierre",
    description:
      "Cadena completa de ECHO-1: SELF, ROOM, objetos, abrir, conflicto, narración, patrones y transferencia. 488 pruebas y +128 agregado.",
  },
  {
    path: "/docs/echoai/echo2",
    title: "ECHO-2 — cierre, resultados y demostración",
    description:
      "ECHO-2 cerrado: 512 LIF + 128 Adaptive-LIF, supervivencia, patrones, consolidación, herencia, control térmico y una demostración directa en vídeo.",
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
    title: "echoAI — hoja de ruta ECHO-3",
    description:
      "Hoja de ruta de ECHO-3: tres mundos 3D, aerodinámica, viento, IMU, PX4, órdenes y transferencia hacia un dron físico al edge.",
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
      "Qué no demuestra ECHO-2 y qué debe verificarse antes de volar: física, sensores, deadlines, failsafes, HIL, energía y hardware ausente.",
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
    "Roger Navarro's software laboratory in Girona. echOS 3.0 for edge robotics, PRISMA and echoAI: real software, published limitations and measurable figures.",
  ],
  "/about": [
    "About RxLabs®",
    "RxLabs® is Roger Navarro's laboratory in Girona. echOS 3.0, PRISMA and echoAI: running code, published limitations and numbers that can be measured again.",
  ],
  "/contact": ["Contact — RxLabs®", "Contact RxLabs®: knightsys@proton.me — Roger Navarro, Girona."],
  "/docs": [
    "Documentation — RxLabs®",
    "Public documentation for echOS 3.0, PRISMA and echoAI: guides, architecture, evidence, real screenshots and published limitations.",
  ],
  "/docs/echos/que-es": [
    "echOS — RxLabs®",
    "echOS 3.0: a robotic edge unikernel with no Linux or LLM. x86_64 BIOS/UEFI and AArch64 UEFI boot, bounded runtime and PX4 bridge.",
  ],
  "/docs/echos/guia": [
    "User guide — echOS 3.0",
    "How to boot echOS 3.0, inspect its state, run the robotic scenario, use panes and connect PX4 SITL.",
  ],
  "/docs/echos/arquitectura": [
    "Architecture — echOS 3.0",
    "Multi-platform architecture, Sensor and Intent ABIs, static queues, safety gate, MAVLink 2, PX4, NVMe and GPT.",
  ],
  "/docs/echos/evidencia": [
    "Evidence — echOS 3.0",
    "541 passing checks across BIOS, UEFI, ARM64, NVMe/GPT, persistence, the robotic runtime and PX4, with downloadable data.",
  ],
  "/docs/echos/galeria": [
    "Real gallery — echOS 3.0",
    "13 direct QEMU screenshots with the serial log from every boot, plus direct and UEFI AArch64 transcripts.",
  ],
  "/docs/echos/limites": [
    "Limitations — echOS",
    "Current echOS 3.0 limitations: no SMP, ARM64 framebuffer, ACPI reader, certified flight or direct actuator control.",
  ],
  "/docs/echos/superficie": [
    "Surface — echOS",
    "The platforms, robotic pipeline, storage and console actually provided by echOS 3.0.",
  ],
  "/docs/echos/comandos": ["Commands — echOS", "echOS 3.0 commands for diagnostics, robotics, PX4, console, networking and host-side certification."],
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
    "Three real lines: echOS, PRISMA and echoAI. ECHO-1 and ECHO-2 are closed, with executable code, published limits and ECHO-3 towards edge robotics.",
  ],
  "/docs/echoai/que-es": [
    "echoAI — RxLabs®",
    "A two-clock situated agent. ECHO-1 and ECHO-2 are closed: measured memory, survival, patterns, consolidation, inheritance and internal control.",
  ],
  "/docs/echoai/piezas": [
    "echoAI — architecture",
    "16-byte WSP, CAM 4096, T, PatternMemory, Q, gate and a 512 LIF + 128 Adaptive-LIF monitor. One bus and measured contracts.",
  ],
  "/docs/echoai/echo1": [
    "ECHO-1 — closure",
    "The complete ECHO-1 chain: SELF, ROOM, objects, opening, conflict, narration, patterns and transfer. 488 tests and an aggregate +128 gain.",
  ],
  "/docs/echoai/echo2": [
    "ECHO-2 — closure, results and demonstration",
    "ECHO-2 closed: 512 LIF + 128 Adaptive-LIF neurons, survival, patterns, consolidation, inheritance, thermal control and a direct video demonstration.",
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
    "echoAI — ECHO-3 roadmap",
    "ECHO-3 roadmap: three 3D worlds, aerodynamics, wind, IMU, PX4, commands and transfer towards a physical edge drone.",
  ],
  "/docs/echoai/hardware": [
    "echoAI — planned hardware",
    "Candidate ECHO-3 platform: Crazyflie, X500/Pixhawk, Jetson, OAK-D, TFmini-S, Livox Mid-360 and optional Akida.",
  ],
  "/docs/echoai/limites": [
    "echoAI — limitations",
    "What ECHO-2 does not demonstrate and what must be verified before flight: physics, sensors, deadlines, failsafes, HIL, energy and absent hardware.",
  ],
  "/echos": ["404 — RxLabs®", "Not found."],
  "/prisma": ["404 — RxLabs®", "Not found."],
  "/echoai": ["404 — RxLabs®", "Not found."],
};

const CA_META = {
  "/": [
    "RxLabs® — laboratori de recerca",
    "Laboratori de programari de Roger Navarro a Girona. echOS 3.0 per a robòtica a l'edge, PRISMA i echoAI: programari real, límits publicats i xifres mesurables.",
  ],
  "/about": [
    "Què és RxLabs®",
    "RxLabs® és el laboratori de Roger Navarro a Girona. echOS 3.0, PRISMA i echoAI: codi que s'executa, límits publicats i xifres que es poden tornar a mesurar.",
  ],
  "/contact": ["Contacte — RxLabs®", "Contacte de RxLabs®: knightsys@proton.me — Roger Navarro, Girona."],
  "/docs": [
    "Documentació — RxLabs®",
    "Documentació pública d'echOS 3.0, PRISMA i echoAI: guies, arquitectura, evidència, captures reals i límits publicats.",
  ],
  "/docs/echos/que-es": [
    "echOS — RxLabs®",
    "echOS 3.0: unikernel per a robòtica a l'edge, sense Linux ni LLM. Arrencada x86_64 BIOS/UEFI i AArch64 UEFI, runtime acotat i pont PX4.",
  ],
  "/docs/echos/guia": [
    "Guia d'ús — echOS 3.0",
    "Com arrencar echOS 3.0, llegir-ne l'estat, executar l'escenari robòtic, usar panells i connectar PX4 SITL.",
  ],
  "/docs/echos/arquitectura": [
    "Arquitectura — echOS 3.0",
    "Arquitectura multiplataforma, Sensor i Intent ABI, cues estàtiques, safety gate, MAVLink 2, PX4, NVMe i GPT.",
  ],
  "/docs/echos/evidencia": [
    "Evidència — echOS 3.0",
    "541 comprovacions verdes: BIOS, UEFI, ARM64, NVMe/GPT, persistència, runtime robòtic i PX4 amb dades descarregables.",
  ],
  "/docs/echos/galeria": [
    "Galeria real — echOS 3.0",
    "13 captures directes de QEMU amb el registre sèrie de cada arrencada, més transcripcions AArch64 directes i UEFI.",
  ],
  "/docs/echos/limites": [
    "Límits — echOS",
    "Límits actuals d'echOS 3.0: sense SMP, framebuffer ARM64, lector ACPI, vol certificat ni control directe d'actuadors.",
  ],
  "/docs/echos/superficie": [
    "Superfície — echOS",
    "Plataformes, pipeline robòtic, emmagatzematge i consola que ofereix realment echOS 3.0.",
  ],
  "/docs/echos/comandos": ["Ordres — echOS", "Ordres d'echOS 3.0 per a diagnòstic, robòtica, PX4, consola, xarxa i certificació des de l'host."],
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
    "Tres línies reals: echOS, PRISMA i echoAI. ECHO-1 i ECHO-2 estan tancats, amb codi executable, límits publicats i ECHO-3 cap a la robòtica a l'edge.",
  ],
  "/docs/echoai/que-es": [
    "echoAI — RxLabs®",
    "Agent situat de dos rellotges. ECHO-1 i ECHO-2 estan tancats: memòria, supervivència, patrons, consolidació, herència i control intern mesurats.",
  ],
  "/docs/echoai/piezas": [
    "echoAI — arquitectura",
    "WSP de 16 bytes, CAM 4096, T, PatternMemory, Q, gate i monitor de 512 LIF + 128 Adaptive-LIF. Un bus i contractes mesurats.",
  ],
  "/docs/echoai/echo1": [
    "ECHO-1 — tancament",
    "Cadena completa d'ECHO-1: SELF, ROOM, objectes, obertura, conflicte, narració, patrons i transferència. 488 proves i un guany agregat de +128.",
  ],
  "/docs/echoai/echo2": [
    "ECHO-2 — tancament, resultats i demostració",
    "ECHO-2 tancat: 512 LIF + 128 Adaptive-LIF, supervivència, patrons, consolidació, herència, control tèrmic i una demostració directa en vídeo.",
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
    "echoAI — full de ruta ECHO-3",
    "Full de ruta d'ECHO-3: tres mons 3D, aerodinàmica, vent, IMU, PX4, ordres i transferència cap a un dron físic a l'edge.",
  ],
  "/docs/echoai/hardware": [
    "echoAI — maquinari previst",
    "Plataforma candidata per a ECHO-3: Crazyflie, X500/Pixhawk, Jetson, OAK-D, TFmini-S, Livox Mid-360 i Akida opcional.",
  ],
  "/docs/echoai/limites": [
    "echoAI — límits",
    "Què no demostra ECHO-2 i què cal verificar abans de volar: física, sensors, deadlines, failsafes, HIL, energia i maquinari absent.",
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
  const source = page?.path?.includes("/docs/echoai/echo2")
    ? ECHO2_OG
    : page?.path?.includes("/docs/echoai/") ? ECHOAI_OG : SITE;
  return {
    url: abs(source.image),
    width: source.imageW,
    height: source.imageH,
    alt: source === SITE
      ? page?.lang === "en" ? SITE.imageAltEn : page?.lang === "ca" ? SITE.imageAltCa : SITE.imageAlt
      : page?.lang === "en" ? source.imageAltEn || source.imageAlt
        : page?.lang === "ca" ? source.imageAltCa || source.imageAlt
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
  const graph = [
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
  ];
  if (page.path.includes("/docs/echoai/echo2")) {
    graph.push({
      "@type": "VideoObject",
      name: page.title,
      description: page.description,
      thumbnailUrl: abs(ECHO2_OG.image),
      uploadDate: "2026-09-09T23:10:07+02:00",
      duration: "PT2M3S",
      contentUrl: abs(ECHO2_VIDEO),
      encodingFormat: "video/mp4",
      width: 1280,
      height: 720,
    }, {
      "@type": "Dataset",
      name: `ECHO-2 benchmark — ${language}`,
      description: page.description,
      url: abs("/data/echo2-benchmark.json"),
      creator: { "@type": "Person", name: SITE.author },
      distribution: {
        "@type": "DataDownload",
        contentUrl: abs("/data/echo2-benchmark.json"),
        encodingFormat: "application/json",
      },
    });
  }
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
