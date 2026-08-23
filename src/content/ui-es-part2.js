// Spanish UI strings — part 2 (ctaStrip, downloads, docs, faq, privacy, legal, 404, footer)
export const esPart2 = {
  ctaStrip: {
    title: '¿Listo para la totalidad?',
    text: 'Descarga una imagen, flashea y arranca en la oscuridad.',
    btnDownloads: 'Ir a Descargas',
    btnGithub: 'Código en GitHub ↗',
  },

  downloads: {
    title: 'Descargas',
    tagline: 'EchOS 1.0 — línea estable v1.0.0. Todas las imágenes están checksumadas. Verifica el digest SHA256 antes de flashear.',
    bridgesKicker: 'Fuentes',
    bridgesTitle: 'Dos maneras de conseguir EchOS',
    bridgesSub: 'Cada archivo puede descargarse directamente desde este sitio u obtenerse desde la etiqueta oficial de release v1.0.0 en GitHub.',
    cardDirect: {
      badge: 'Directo · Oficial',
      name: 'rogexlaboratories.com',
      desc: 'Descargas HTTP directas servidas desde este sitio.',
      linkLabel: 'Ver archivos abajo ↓',
    },
    cardGithub: {
      badge: 'Espejo · GitHub',
      name: 'GitHub Releases',
      desc: 'Todos los assets adjuntos a la etiqueta v1.0.0, además de los archivos fuente.',
      linkLabel: 'Abrir release v1.0.0 ↗',
    },
    schedule: {
      badge: 'Pre-lanzamiento',
      title: 'Disponibilidad pública — 30 de agosto de 2026',
      body: 'EchOS Minimal y EchOS Edge 1.0 se publican el 30 de agosto de 2026. La edición Complete llegará más adelante: ECHO AI v1 está en su fase final de entrenamiento y pruebas antes de su lanzamiento.',
    },
    lockedDate: 'Disponible el {date}',
    lockedTba: 'Fecha por anunciar — Echo AI v1 en entrenamiento y pruebas finales',
    tableHeaders: {
      file: 'Archivo',
      target: 'Destino',
      format: 'Formato',
      size: 'Tamaño',
      sha256: 'SHA256',
      links: 'Enlaces',
    },
    labels: {
      direct: 'Descarga directa',
      github: 'GitHub ↗',
    },
    targets: {
      metal: 'Bare metal — PC / portátil x86_64',
      vm: 'Máquina virtual — QEMU / VirtualBox / VMware',
      usb: 'Unidad USB arrancable (instalación física)',
    },
    completeSection: {
      kicker: 'Edición',
      title: 'EchOS Edición Complete',
      sub: 'Escritorio completo · motor de navegador Rogex Nova · IA ECHO (Navi 10) · IDE nativo · visores de vídeo/imagen · CPU o NPU BrainChip Akida.',
    },
    minimalSection: {
      kicker: 'Edición',
      title: 'EchOS Edición Minimal',
      sub: 'El mismo escritorio y drivers que Complete — sin IA ECHO y sin IDE. Pensada para la eficiencia del uso diario.',
    },
    edgeSection: {
      kicker: 'Edición',
      title: 'EchOS Edición Edge',
      sub: 'Solo-CLI para placas IoT, robótica, drones y cámaras. Incluye el modelo edge reentrenable Navi Mini y el comando files integrado (explorador + visor multimedia).',
    },
    usbSection: {
      kicker: 'Instalador USB',
      title: 'Imagen USB (.img.gz)',
      sub: 'Imagen USB arrancable para instalaciones físicas. Descomprímela y escríbela directamente en tu unidad:',
      note: 'Tras descomprimir puedes verificar la imagen resultante contra el SHA256 del archivo sin comprimir publicado junto al release.',
      gunzipHint: 'ejemplo gunzip + dd',
    },
    verifySection: {
      kicker: 'Seguridad',
      title: 'Verifica antes de flashear',
      body1: 'Cada imagen se publica con su suma SHA256. Compara tu digest local con los valores anteriores o con SHA256SUMS.txt adjunto al release de GitHub:',
      body2: 'Si una suma no coincide, no arranques la imagen y repórtalo vía GitHub Issues.',
    },
  },

  docsPage: {
    hubTitle: 'Documentación',
    hubSub: 'Todo lo que merece la pena saber sobre las interioridades de EchOS, sus ediciones y sus herramientas.',
    sidebarTitle: 'Documentos',
    onThisHub: 'Resumen',
    pages: {
      architecture: { label: 'Arquitectura', blurb: 'Kernel, Eclipse Shell, motor Nova, pipeline de vídeo.' },
      editions: { label: 'Ediciones', blurb: 'Complete vs Minimal vs Edge, y objetivos de hardware.' },
      echo: { label: 'Modelos ECHO', blurb: 'El asistente Navi 10 y el reentrenable Navi Mini.' },
      packages: { label: 'Paquetes', blurb: 'Archivos .rxp, rx-pkg y herramientas base.' },
      install: { label: 'Guía de instalación', blurb: 'Verificar, flashear, arrancar — paso a paso.' },
    },
    hubCardsTitle: 'Empieza aquí',
    backToHub: '← Todos los documentos',
  },

  faqPage: {
    kicker: 'Respuestas',
    title: 'Preguntas Frecuentes',
    sub: 'Todo lo que la gente pregunta antes de cruzar a la totalidad.',
  },

  privacyPage: {
    kicker: 'Tus datos se quedan en la oscuridad',
    title: 'Política de Privacidad',
    updated: 'Última actualización: 2026-08-23 · Aplica a rogexlaboratories.com y al sistema operativo EchOS.',
  },

  legalPage: {
    kicker: 'La letra pequeña',
    title: 'Aviso Legal y Términos de Uso',
    updated: 'Última actualización: 2026-08-23.',
  },

  notFound: {
    code: '404',
    title: 'Perdido en el eclipse.',
    body: 'Esta página se deslizó detrás de la luna. O nunca existió, o fue renombrada, o fue engullida por la totalidad.',
    btnHome: 'Volver al inicio',
    btnDownloads: 'Descargas',
    btnDocs: 'Documentación',
  },

  footer: {
    brandLine: 'Rogex Laboratories — una marca de Knights Labs',
    small: 'EchOS 1.0 · Autor: Roger Navarro · Bajo licencia GNU GPLv3',
    contact: 'Contacto:',
    onePerson: 'Una empresa unipersonal, dirigida por Roger Navarro.',
  },
};
