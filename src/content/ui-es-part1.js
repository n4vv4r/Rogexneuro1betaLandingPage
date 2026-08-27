// Spanish UI strings — part 1 (meta, nav, hero, editions, features, carousel)
export const esPart1 = {
  meta: {
    home: {
      title: 'echOS 2.0 Universal — Rogex Laboratories',
      desc: 'echOS 2.0 Universal de Rogex Laboratories: unikernel x86_64 bare-metal. Un kernel Heap-0, consola, epk local. La ISO pública espera a la validación Akida en silicio.',
    },
    downloads: {
      title: 'Descargas — echOS 2.0 Universal — Rogex Laboratories',
      desc: 'echOS 2.0 Universal es una sola edición pública. La ISO se retiene hasta medir BrainChip Akida en hardware real. Las sumas viajarán con el drop.',
    },
    packages: {
      title: 'Paquetes — echOS epk / RXP1 — Rogex Laboratories',
      desc: 'Canal público de paquetes echOS. Descarga .rxp aquí, o desde el OS: www on && epk get <name>.',
    },
    validation: {
      title: 'Validación — echOS + Akida — Rogex Laboratories',
      desc: 'El listón de publicación de echOS 2.0: energía, latencia, dispersión, deriva Heap-0 y datasets abiertos. Sin cifras de silicio hasta que Akida esté en el banco.',
    },
    docs: {
      title: 'Documentación — echOS 2.0 — Rogex Laboratories',
      desc: 'Documentación oficial de echOS 2.0 Universal (consola, Heap-0, man, curl, epk) y EchOS 1.0 ECLIPSE (escritorio). Arquitectura, instalación, límites, pila neuromórfica.',
    },
    faq: {
      title: 'Preguntas frecuentes — echOS 2.0 — Rogex Laboratories',
      desc: 'Qué es echOS 2.0 Universal, por qué la ISO espera a Akida en hardware, epk, y cómo funcionan las ediciones.',
    },
    privacy: {
      title: 'Política de Privacidad — Rogex Laboratories',
      desc: 'Política de Privacidad de Rogex Laboratories: EchOS es amnésico por defecto, no recopila telemetría y este sitio web no instala cookies de rastreo. Política alineada con el RGPD.',
    },
    legal: {
      title: 'Aviso Legal y Términos de Uso — Rogex Laboratories',
      desc: 'Aviso Legal y Términos de Uso de rogexlaboratories.com: titularidad, propiedad intelectual, licencia GPLv3, condiciones de uso, limitación de responsabilidad y jurisdicción.',
    },
    notFound: {
      title: '404 — Perdido en el eclipse — Rogex Laboratories',
      desc: 'Página no encontrada. Te has adentrado en la corona. Vuelve al inicio, a descargas o a la documentación.',
    },
  },

  nav: {
    home: 'Inicio',
    downloads: 'Descargas',
    packages: 'Paquetes',
    docs: 'Documentación',
    validation: 'Validación',
    faq: 'FAQ',
    privacy: 'Privacidad',
    legal: 'Legal',
    ariaMain: 'Navegación principal',
    toggleAria: 'Cambiar el idioma a inglés',
    toggleShort: 'EN',
  },

  hero: {
    eclipseAlt: 'Resplandor del anillo de eclipse solar',
    kicker: 'Rogex Laboratories',
    tagline:
      'Unikernel x86_64 bare-metal. Un kernel Heap-0, una consola, paquetes locales. Sin Linux debajo. Sin telemetría. La ISO pública espera al silicio Akida — no a un calendario.',
    ctaDownload: 'Descargas',
    ctaDocs: 'Documentación',
    ctaValidation: 'Listón de validación',
    bannerAlt: 'echOS 2.0 Universal LIVE — tarjeta echofetch con logo droplet Braille y cifras Heap-0',
    bannerCaption: 'echOS 2.0 Universal — LIVE. echofetch + Heap-0. Capturado de la máquina, no un mockup.',
  },

  releaseGate: {
    badge: 'Puerta de publicación',
    title: 'La ISO sale cuando Akida se haya medido en metal',
    body: 'Software en QEMU no es lo que vamos a pedir que cite un laboratorio. Vamos a sentar un BrainChip AKD1000 en el banco: shunt en el rail de 3,3 V, latencia PRISMA 5, dispersión, deriva Heap-0, EEG público. Hasta que existan esos logs, Descargas permanece cerrada. Minimal / Complete / Edge / Server son manifiestos de instalación — viven en Docs, no como cuatro escaparates.',
    cta: 'Leer el listón',
    ctaLimits: 'Límites honestos',
  },

  product: {
    kicker: 'El producto',
    title: 'Una sola edición pública',
    sub: 'Universal es la ISO. Los demás perfiles se eligen en el instalador y están documentados en Docs → Ediciones.',
    badge: 'echOS 2.0 Universal',
    name: 'Consola. Heap-0. Cuatro manifiestos.',
    desc: 'Liberation Mono, instalador TUI, LIVE en RAM, epk local, cliente IPv4/TLS, camino SNN en software con sonda PCI real para Akida. Sin gestor de ventanas en esta línea.',
    items: [
      'Kernel Heap-0 compartido — la edición se aplica al instalar, no son cuatro ELF',
      'LIVE / memtest / recovery en GRUB; q salta el wizard',
      'man, nano, curl, wdl, ipconf en consola',
      'epk get baja .rxp de /packages cuando www está on',
      'PCI 1e7c:bca1 se sonda; sin placa → LIF software, nunca un NPU falso',
    ],
    cta: 'Descargas (retenidas)',
    ctaDocs: 'Ediciones en Docs',
  },

  features: {
    kicker: 'Stack propio',
    title: 'Hecho aquí. Nombrado con honestidad.',
    sub: 'No es un remix de Linux. Kernel, filesystem, paquetes, cliente HTTP y camino SNN son código de primera parte.',
    rows: [
      { icon: '◉', title: 'Unikernel', text: 'Un ELF, Multiboot2, idle cooperativo (HLT). Sin zoo ring-3. La máquina es el programa.' },
      { icon: '▣', title: 'Heap-0', text: 'Los buffers críticos viven en BSS. O(1), sin malloc en el camino caliente. Deriva de cero bytes es métrica de publicación, no un eslogan.' },
      { icon: '⌘', title: 'Contrato de consola', text: 'Liberation Mono, termtheme, man, nano. El CLI es el producto — no un fallback de un escritorio.' },
      { icon: '◎', title: 'Red como herramienta', text: 'www, curl, wdl, ipconf. HTTP/1.0, SNI, TLS 1.3 ofertado. Un socket. Sin teatro Wi-Fi.' },
      { icon: '✦', title: 'Camino de spikes', text: 'Tejido de eventos + PRISMA 5 SNN en software. Akida es un PCI que sondamos, no un render en una diapositiva.' },
      { icon: '▤', title: 'canal epk', text: 'La ISO sigue llevando un catálogo. El árbol vivo es https://www.rogexlaboratories.com/packages — descarga en el navegador o `epk get`.' },
    ],
  },

  carousel: {
    kicker: 'De la máquina',
    title: 'Capturas LIVE. Sin mockups.',
    sub: 'echOS 2.0 Universal, 27 de agosto de 2026. Wizard, echofetch, man curl, ipconf.',
    prev: 'Captura anterior',
    next: 'Captura siguiente',
    goTo: 'Ir a la diapositiva',
    slides: [
      { img: '/shots/shot-02-echofetch.png', caption: 'echofetch — droplet oficial, Heap-0, Universal LIVE' },
      { img: '/shots/shot-01-tree-ipconf.png', caption: 'tree + ping + ipconf — virtio-net, 10.0.2.15' },
      { img: '/shots/shot-03-man-curl.png', caption: 'man curl — HTTP/1.0, TLS 1.3 / 1.2, -dom' },
      { img: '/shots/shot-04-wizard-lang.png', caption: 'Instalador TUI — idioma, q = LIVE' },
      { img: '/shots/shot-05-wizard-tz.png', caption: 'Zona horaria' },
      { img: '/shots/shot-06-wizard-kbd.png', caption: 'Teclado' },
      { img: '/shots/shot-07-wizard-locale.png', caption: 'Locale' },
      { img: '/shots/shot-08-wizard-edition.png', caption: 'Manifiesto de edición — Minimal, Complete, Edge, Server, LIVE' },
    ],
  },
};
