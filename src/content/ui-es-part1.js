// Spanish UI strings — part 1 (meta, nav, hero, editions, features, carousel)
export const esPart1 = {
  meta: {
    home: {
      title: 'EchOS 1.0 — Rogex Laboratories',
      desc: 'EchOS 1.0 de Rogex Laboratories — un sistema operativo independiente con motor de navegador propio (Rogex Nova), el asistente de IA ECHO (Navi 10) y un IDE nativo. Ediciones Complete, Minimal y Edge. GNU GPLv3.',
    },
    downloads: {
      title: 'Descargas — EchOS 1.0 — Rogex Laboratories',
      desc: 'Descarga EchOS 1.0 de Rogex Laboratories: ediciones Complete, Minimal y Edge. Descargas directas ISO/img y GitHub Releases, con sumas SHA256 publicadas.',
    },
    docs: {
      title: 'Documentación — EchOS — Rogex Laboratories',
      desc: 'Documentación oficial de EchOS 1.0: arquitectura, ediciones, modelos ECHO, paquetes y guía de instalación.',
    },
    faq: {
      title: 'Preguntas frecuentes — EchOS — Rogex Laboratories',
      desc: 'Preguntas frecuentes sobre EchOS 1.0: requisitos de hardware, ediciones, funcionamiento sin conexión del asistente ECHO, soporte de NPUs BrainChip Akida, sistema de paquetes .rxp, licencia GPLv3, contribuir y soporte.',
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
    docs: 'Documentación',
    faq: 'FAQ',
    privacy: 'Privacidad',
    legal: 'Legal',
    ariaMain: 'Navegación principal',
    toggleAria: 'Cambiar el idioma a inglés',
    toggleShort: 'EN',
  },

  hero: {
    eclipseAlt: 'Resplandor del anillo de eclipse solar',
    tagline:
      'Un sistema operativo nacido en la oscuridad. Construido desde cero por Rogex Laboratories — un entorno de escritorio completo, un motor de navegador propio y una IA que vive en tu máquina. Sin nube obligatoria. Sin telemetría. Nunca.',
    ctaDownload: 'Descargar EchOS 1.0',
    ctaDocs: 'Leer la documentación',
    bannerAlt: 'Escritorio de EchOS Minimal 1.0 — dock con iconos de apps, Terminal ejecutando curl y ping sobre la red real, Calculator y Multimedia abiertos',
    bannerCaption: 'EchOS Minimal 1.0 — escritorio real, red real. Build de preview.',
  },

  editions: {
    kicker: 'Ediciones',
    title: 'Tres maneras de entrar en el eclipse',
    sub: 'Una base de código, tres formas. Elige la que encaja con tu hardware y tu día a día.',
    complete: {
      badge: 'Edición Complete',
      name: 'EchOS Complete',
      desc: 'La experiencia completa. Todo lo que la plataforma puede hacer, nada oculto.',
      items: [
        'Escritorio completo con Eclipse Shell y dock',
        'Rogex Nova — motor de navegador web propio',
        'Asistente de IA ECHO impulsado por Navi 10, totalmente sin conexión',
        'IDE nativo integrado',
        'Visores de vídeo e imagen incluidos de serie',
        'Funciona en CPUs estándar o procesadores neuromórficos (BrainChip Akida)',
      ],
      cta: 'Obtener Complete',
    },
    minimal: {
      badge: 'Edición Minimal',
      name: 'EchOS Minimal',
      desc: 'Edición eficiente para el uso diario. Mismo escritorio, mismos drivers — menos peso.',
      items: [
        'Mismo escritorio y drivers de hardware',
        'Sin el asistente de IA ECHO',
        'Sin IDE incluido',
        'Afinada para la respuesta cotidiana',
      ],
      cta: 'Obtener Minimal',
    },
    edge: {
      badge: 'Edición Edge',
      name: 'EchOS Edge',
      desc: 'Compilación solo-CLI para placas IoT, robótica, drones y cámaras.',
      items: [
        'Huella exclusivamente de línea de comandos',
        'Navi Mini — modelo edge reentrenable en el dispositivo',
        'Comando files integrado: explorador de archivos + visor multimedia',
        'Diseñado para objetivos limitados y embebidos',
      ],
      cta: 'Obtener Edge',
    },
  },

  features: {
    kicker: 'Stack propio',
    title: 'Todo construido internamente',
    sub: 'EchOS no es un remix de distribuciones existentes. Cada capa de las siguientes está diseñada por Rogex Laboratories desde los primeros principios.',
    rows: [
      { icon: '◉', title: 'Kernel EchOS', text: 'Un kernel escrito desde cero que gestiona planificación, memoria, drivers y energía tanto en CPUs de sobremesa como en silicio neuromórfico.' },
      { icon: '▤', title: 'Eclipse Shell — servidor de ventanas con dock', text: 'Nuestro servidor de ventanas renderiza todo el escritorio compuesto. Un dock estilo macOS ancla tus aplicaciones; las ventanas se ajustan, desenfocan y brillan con el tema eclipse.' },
      { icon: '◎', title: 'Rogex Nova — motor de navegador propio', text: 'No es un envoltorio de WebKit/Blink. Nova analiza, maqueta y renderiza la web por sí mismo, integrado directamente con el modelo de seguridad del shell.' },
      { icon: '▶', title: 'Pipeline de vídeo nativo', text: 'Decodificación consciente del hardware y una pila propia de imagen/vídeo alimentan los visores incluidos — reproducción fluida sin frameworks multimedia ajenos.' },
      { icon: '✦', title: 'ECHO — la IA interior', text: 'Impulsado por el modelo Navi 10 ejecutándose íntegramente en tu dispositivo. ECHO responde, automatiza y asiste sin ninguna dependencia de red.' },
      { icon: '⌘', title: 'IDE nativo', text: 'Edita, compila, depura y despliega para objetivos EchOS desde dentro del propio sistema operativo — la misma toolchain que usamos nosotros.' },
    ],
  },

  carousel: {
    kicker: 'Capturas reales',
    title: 'Arrancado en QEMU. Sin mockups.',
    sub: 'Capturadas directamente de EchOS 1.0 ECLIPSE ejecutándose bajo emulación.',
    prev: 'Captura anterior',
    next: 'Captura siguiente',
    goTo: 'Ir a la diapositiva',
    slides: [
      { img: '/shots/preview-1.jpg', caption: 'EchOS Minimal 1.0 — build de preview' },
      { img: '/shots/preview-2.jpg', caption: 'EchOS Minimal 1.0 — build de preview' },
      { img: '/shots/preview-3.jpg', caption: 'EchOS Minimal 1.0 — build de preview' },
      { img: '/shots/preview-4.jpg', caption: 'EchOS Minimal 1.0 — build de preview' },
      { img: '/shots/preview-5.jpg', caption: 'EchOS Minimal 1.0 — build de preview' },
      { img: '/shots/preview-6.jpg', caption: 'EchOS Minimal 1.0 — build de preview' },
      { img: '/shots/preview-7.jpg', caption: 'EchOS Minimal 1.0 — build de preview' },
    ],
  },
};
