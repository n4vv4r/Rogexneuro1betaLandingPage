// Spanish UI strings — part 2 (ctaStrip, downloads, docs, faq, privacy, legal, 404, footer)
export const esPart2 = {
  ctaStrip: {
    title: 'Lee antes de esperar una ISO',
    text: 'El árbol es público. El binario no — no hasta que Akida tenga un log de laboratorio. Docs y el listón de validación son el producto hoy.',
    btnDocs: 'Abrir la documentación',
    btnValidation: 'Listón de validación',
    btnGithub: 'Código en GitHub ↗',
  },

  downloads: {
    title: 'Descargas',
    tagline: 'Una edición: echOS 2.0 Universal. Los nombres de archivo están para que no sorprendan. Los bits se quedan aquí hasta que Akida tenga un log de banco.',
    gate: {
      badge: 'Retenida',
      title: 'No hay ISO pública hasta que Akida esté en el banco',
      body: 'No vamos a colgar una imagen con checksum porque una captura de QEMU se vea terminada. La publicación sigue a una campaña de hardware: corriente real del AKD1000, latencia PRISMA 5, dispersión, deriva Heap-0, EEG abierto. Cuando existan esas gráficas, vm + metal aterrizan aquí con SHA256. Hasta entonces el árbol se puede leer y esta tabla es una promesa de nombres, no una descarga.',
      cta: 'Campaña de validación',
    },
    universal: {
      kicker: 'La ISO',
      title: 'echOS 2.0 Universal',
      sub: 'El mismo ELF para QEMU y metal. El instalador elige Minimal, Complete, Edge o Server desde un manifiesto local. LIVE no escribe disco.',
      otherEditions: 'Complete, Edge, Server y 1.0 Eclipse están documentados, no se venden como descargas extra.',
      otherLink: 'Ediciones en Docs →',
    },
    tableHeaders: {
      file: 'Archivo',
      target: 'Destino',
      format: 'Formato',
      size: 'Tamaño',
      links: 'Estado',
    },
    labels: {
      direct: 'Descarga directa',
      github: 'GitHub ↗',
      held: 'Retenida — campaña Akida',
    },
    targets: {
      metal: 'Bare metal — PC / USB x86_64 (CSM)',
      vm: 'Máquina virtual — QEMU / VirtualBox',
    },
    verifySection: {
      kicker: 'Cuando salga',
      title: 'Las sumas viajan con la imagen',
      body1: 'El drop público incluirá SHA256SUMS.txt. Verifica antes de flashear:',
      body2: 'Si no coincide, paras. Hoy no hay imagen ni suma — ese es el estado honesto.',
    },
  },

  docsPage: {
    kicker: 'Notas de laboratorio',
    hubTitle: 'Documentación',
    hubSub: 'echOS 2.0 Universal es la línea de consola. EchOS 1.0 ECLIPSE sigue siendo el escritorio. Especificaciones, cómo arrancarlo, lo que no vamos a fingir — escrito aquí.',
    sidebarTitle: 'Índice',
    onThisHub: 'Portada',
    hubCardsTitle: 'Empieza aquí',
    backToHub: '← Todos los documentos',
    unknown: 'Documento desconocido.',
    lead20Title: 'echOS 2.0 Universal',
    lead20Body: 'Un kernel Heap-0, cuatro ediciones, sin gestor de ventanas. LIVE, man, curl, epk, handshake TLS 1.3.',
    lead20Cta: 'Leer el overview 2.0',
    lead10Title: 'EchOS 1.0 ECLIPSE',
    lead10Body: 'Eclipse Shell, dock, Nova, ECHO Navi 10. Sigue siendo la línea gráfica.',
    lead10Cta: 'Arquitectura 1.0',
  },

  validation: {
    kicker: 'Listón de laboratorio',
    title: 'Qué tiene que cumplirse antes de publicar',
    lead: 'Una consola que arranca en QEMU es un prototipo. Una plataforma que otros laboratorios puedan citar necesita julios, microsegundos y una matriz de confusión sobre datos públicos — medidos en Akida, no estimados desde un LIF software.',
    gate: {
      badge: 'Aún no en silicio',
      title: 'La suite está especificada. Las trazas no.',
      body: 'Compraremos, asentaremos e instrumentaremos un BrainChip AKD1000. Hasta que existan el shunt, el osciloscopio y un log Heap-0 de 72 horas, cada milivatio de esta página es un listón, no un resultado. Es deliberado.',
    },
    metrics: {
      kicker: 'Listones de publicación',
      title: 'Cifras que el drop tiene que batir',
      sub: 'Objetivos de la campaña en metal. Celdas vacías hasta que el banco esté vivo.',
      cards: [
        { value: '< 100 mW', label: 'Potencia en inferencia', note: 'Rail del AKD1000, shunt en 3,3 V. Energía también en pJ/spike.' },
        { value: 'µs, no ms', label: 'Latencia de spike', note: 'Biosenal in → PRISMA 5 out. Jitter frente a context-switch de Linux, misma carga.' },
        { value: '0 B', label: 'Deriva Heap-0', note: 'Soak EEG 72 h. El log del kernel debe mostrar Δ RAM = 0.' },
        { value: '< 16 MiB', label: 'Sobre RAM Edge', note: 'LIVE en texto, sin impuesto del backbuffer 1280×720. El escritorio 1.0 es otra ISO.' },
      ],
    },
    suite: {
      kicker: 'Campaña',
      title: 'Cinco medidas, luego un checksum',
      sub: 'Los mismos nombres de harness que ya están en el árbol: bench-snn, prisma5 stress, epk stress.',
      items: [
        {
          title: 'Energía en el rail',
          method: 'Multímetro de precisión u osciloscopio sobre un shunt en la alimentación 3,3 V del AKD1000 (PCIe/M.2). Inferencia en tiempo real, no el datasheet en idle.',
          bar: 'Listón: por debajo de 100 mW; reportar pJ por spike.',
        },
        {
          title: 'Latencia determinista',
          method: 'Inyectar eventos en la entrada; fechar el spike de salida en PRISMA 5. Comparar bare-metal con el mismo grafo en Linux + GPU/Jetson.',
          bar: 'Listón: microsegundos, y un plot de jitter que no se esconda en una media.',
        },
        {
          title: 'Dispersión',
          method: 'Ruido blanco y EEG plano — sin eventos. Contar FLOPs y spikes. La historia de idle solo es real si ambos caen.',
          bar: 'Listón: trabajo y consumo caen con los eventos, no con un sleep() de demo.',
        },
        {
          title: 'Soak Heap-0',
          method: 'EEG continuo 72 horas. Log del allocator del kernel antes y después.',
          bar: 'Listón: un byte de crecimiento es un run fallido.',
        },
        {
          title: 'Datasets abiertos',
          method: 'PRISMA 5 sobre conjuntos públicos (PhysioNet motor imagery, BCI Competition IV). Accuracy y confusión frente a un CNN/RNN convencional en el mismo split.',
          bar: 'Listón: cifras con un repo, no una diapositiva.',
        },
      ],
    },
    bench: {
      kicker: 'Comparativas',
      title: 'echOS + Akida frente al stack por defecto',
      body: 'Cuando el silicio esté asentado dibujaremos latencia y julios junto a Linux + Jetson/GPU en las mismas tareas. Ninguna gráfica hasta que ambos lados hayan corrido en este laboratorio. El LIF software en x86 es camino de desarrollo, no una fila sustituta en esa figura.',
    },
    industry: {
      kicker: 'Si los listones aguantan',
      title: 'A dónde apunta este stack',
      sub: 'No es una lista de SKU. Las cargas que de verdad necesitan spikes, milivatios y cero ida a la nube.',
      cards: [
        { title: 'BCI y prótesis', body: 'Lazo cerrado de biosenal a actuador. La masa de batería importa; una GPU en la mochila no.' },
        { title: 'Monitores wearable', body: 'Flags de crisis o ritmo siempre encendidos con presupuesto de solapa. La inferencia se queda en el dispositivo.' },
        { title: 'Drones y robots de borde', body: 'Cámaras de eventos y navegación barata donde el sobre térmico es la restricción de diseño.' },
        { title: 'Planta industrial', body: 'Espectros de vibración en maquinaria pesada, avisos predictivos sin un rack en el armario.' },
      ],
    },
    repro: {
      kicker: 'Reproducir',
      title: 'El harness ya está en el árbol',
      body: 'El lado software se puede correr hoy. El lado metal espera a la tarjeta. Cuando cierre la campaña publicaremos trazas, scripts y un PDF con métodos — no una frase de prensa.',
      code: 'hwprobe\nbench-snn\nprisma5 stress\nepk stress 32\n# luego: log del shunt + split PhysioNet, mismos comandos, Akida presente',
      ctaDocs: 'Notas de investigación',
      ctaBuild: 'Cómo construir',
    },
  },

  faqPage: {
    kicker: 'Respuestas',
    title: 'Preguntas frecuentes',
    sub: 'Qué es esto, qué no es, y cuándo aparece una ISO.',
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
    small: 'echOS 2.0 Universal · Autor: Roger Navarro · GNU GPLv3',
    contact: 'Contacto:',
    onePerson: 'Una empresa unipersonal, dirigida por Roger Navarro.',
  },
};
