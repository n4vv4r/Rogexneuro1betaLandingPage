export const locales = ['es', 'en', 'zh', 'ja', 'fr', 'de'];

export const localeNames = {
  es: 'ES',
  en: 'EN',
  zh: '中文',
  ja: '日本語',
  fr: 'FR',
  de: 'DE',
};

const productData = {
  es: [
    {
      id: 'prisma3',
      name: 'PRISMA 3',
      eyebrow: 'MVP real · EEG',
      title: 'Decodificación EEG normalizada por sujeto.',
      text: 'PRISMA 3 es software experimental de investigación EEG. Importa EEG real, extrae features, construye baselines personales, evalúa modelos y genera reportes reproducibles.',
      status: 'Implementado / release técnico',
      facts: ['OpenNeuro DS007358', '28 sujetos', '3304 ventanas', '84.2% LOSO normalizado']
    },
    {
      id: 'prisma4',
      name: 'PRISMA 4',
      eyebrow: 'Siguiente fase',
      title: 'EEG en vivo, artefactos y calibración.',
      text: 'PRISMA 4 debe centrarse en ingestión en vivo, control de artefactos, benchmarks mayores, calibración por usuario y revisión externa.',
      status: 'Roadmap',
      facts: ['live EEG', 'artefactos', 'calibración', 'datasets mayores']
    },
    {
      id: 'rogexos',
      name: 'RogexOS',
      eyebrow: 'Sistema',
      title: 'El entorno donde vive el laboratorio.',
      text: 'RogexOS es la visión de un entorno soberano para ciencia, IA local, apps verificables, Rogex Studio, rgx://, Drive, servidores y herramientas reproducibles.',
      status: 'Ecosistema en desarrollo',
      facts: ['Catalonian / RXos', 'Roxenite', 'RGX Protocol', 'Navi']
    },
    {
      id: 'moscovium',
      name: 'MOSCOVIUM',
      eyebrow: 'PRISMA v5+',
      title: 'SDR, espectro y bioseñales sincronizadas.',
      text: 'Moscovium es la extensión espectral futura de PRISMA: SDR, RF, ruido ambiental, waterfall, sincronización con EEG y búsqueda rigurosa de patrones reproducibles.',
      status: 'Investigación futura',
      facts: ['SDR', 'RF spectrum', 'noise lab', 'PRISMA sync']
    }
  ],
  en: [
    {
      id: 'prisma3',
      name: 'PRISMA 3',
      eyebrow: 'Real MVP · EEG',
      title: 'Subject-normalized EEG decoding.',
      text: 'PRISMA 3 is experimental EEG research software. It imports real EEG, extracts features, builds personal baselines, evaluates models and generates reproducible reports.',
      status: 'Implemented / technical release',
      facts: ['OpenNeuro DS007358', '28 subjects', '3304 windows', '84.2% normalized LOSO']
    },
    {
      id: 'prisma4',
      name: 'PRISMA 4',
      eyebrow: 'Next phase',
      title: 'Live EEG, artifacts and calibration.',
      text: 'PRISMA 4 should focus on live ingestion, stronger artifact handling, larger benchmarks, user calibration and external review.',
      status: 'Roadmap',
      facts: ['live EEG', 'artifacts', 'calibration', 'larger datasets']
    },
    {
      id: 'rogexos',
      name: 'RogexOS',
      eyebrow: 'System',
      title: 'The environment where the lab lives.',
      text: 'RogexOS is the vision of a sovereign environment for science, local AI, verifiable apps, Rogex Studio, rgx://, Drive, servers and reproducible tools.',
      status: 'Ecosystem in development',
      facts: ['Catalonian / RXos', 'Roxenite', 'RGX Protocol', 'Navi']
    },
    {
      id: 'moscovium',
      name: 'MOSCOVIUM',
      eyebrow: 'PRISMA v5+',
      title: 'SDR, spectrum and synchronized biosignals.',
      text: 'Moscovium is the future spectral extension of PRISMA: SDR, RF, environmental noise, waterfall views, EEG synchronization and rigorous reproducible pattern research.',
      status: 'Future research',
      facts: ['SDR', 'RF spectrum', 'noise lab', 'PRISMA sync']
    }
  ],
  zh: [
    {
      id: 'prisma3', name: 'PRISMA 3', eyebrow: '真实 MVP · EEG', title: '按个体基线归一化的 EEG 解码。', text: 'PRISMA 3 是实验性 EEG 研究软件，用于导入真实 EEG、提取特征、建立个人基线、评估模型并生成可复现实验报告。', status: '已实现 / 技术发布', facts: ['OpenNeuro DS007358', '28 名受试者', '3304 个窗口', '84.2% LOSO']
    },
    {
      id: 'prisma4', name: 'PRISMA 4', eyebrow: '下一阶段', title: '实时 EEG、伪迹处理与校准。', text: 'PRISMA 4 将聚焦实时信号、伪迹控制、更大数据集、个体校准与外部验证。', status: '路线图', facts: ['实时 EEG', '伪迹', '校准', '更大数据集']
    },
    {
      id: 'rogexos', name: 'RogexOS', eyebrow: '系统', title: '实验室运行的主权环境。', text: 'RogexOS 是面向科学、本地 AI、可验证应用、Rogex Studio、rgx://、Drive、服务器和可复现实验工具的系统愿景。', status: '生态开发中', facts: ['Catalonian / RXos', 'Roxenite', 'RGX Protocol', 'Navi']
    },
    {
      id: 'moscovium', name: 'MOSCOVIUM', eyebrow: 'PRISMA v5+', title: 'SDR、频谱与同步生物信号。', text: 'Moscovium 是 PRISMA 的未来频谱扩展，探索 SDR、RF、环境噪声、瀑布图、EEG 同步与可复现模式研究。', status: '未来研究', facts: ['SDR', 'RF 频谱', '噪声实验室', 'PRISMA 同步']
    }
  ],
  ja: [
    {
      id: 'prisma3', name: 'PRISMA 3', eyebrow: '実在 MVP · EEG', title: '被験者ごとに正規化する EEG デコード。', text: 'PRISMA 3 は実験的な EEG 研究ソフトウェアです。実 EEG の取り込み、特徴抽出、個人ベースライン、モデル評価、再現可能なレポートを扱います。', status: '実装済み / 技術公開', facts: ['OpenNeuro DS007358', '28名', '3304ウィンドウ', '84.2% LOSO']
    },
    {
      id: 'prisma4', name: 'PRISMA 4', eyebrow: '次の段階', title: 'ライブ EEG、アーティファクト、キャリブレーション。', text: 'PRISMA 4 はライブ入力、アーティファクト処理、大規模ベンチマーク、個人校正、外部レビューを目指します。', status: 'ロードマップ', facts: ['live EEG', 'artifact', 'calibration', 'larger datasets']
    },
    {
      id: 'rogexos', name: 'RogexOS', eyebrow: 'システム', title: '研究所が動く環境。', text: 'RogexOS は科学、ローカル AI、検証可能なアプリ、Rogex Studio、rgx://、Drive、サーバー、再現可能なツールのための主権的環境です。', status: '開発中', facts: ['Catalonian / RXos', 'Roxenite', 'RGX Protocol', 'Navi']
    },
    {
      id: 'moscovium', name: 'MOSCOVIUM', eyebrow: 'PRISMA v5+', title: 'SDR、スペクトル、同期バイオシグナル。', text: 'Moscovium は PRISMA の将来のスペクトル拡張で、SDR、RF、環境ノイズ、waterfall、EEG同期、再現可能なパターン研究を扱います。', status: '将来研究', facts: ['SDR', 'RF spectrum', 'noise lab', 'PRISMA sync']
    }
  ],
  fr: [
    {
      id: 'prisma3', name: 'PRISMA 3', eyebrow: 'MVP réel · EEG', title: 'Décodage EEG normalisé par sujet.', text: 'PRISMA 3 est un logiciel expérimental de recherche EEG pour importer des données réelles, extraire des caractéristiques, créer des baselines personnelles, évaluer des modèles et générer des rapports reproductibles.', status: 'Implémenté / version technique', facts: ['OpenNeuro DS007358', '28 sujets', '3304 fenêtres', '84.2% LOSO']
    },
    {
      id: 'prisma4', name: 'PRISMA 4', eyebrow: 'Prochaine phase', title: 'EEG en direct, artefacts et calibration.', text: 'PRISMA 4 vise l’ingestion en direct, le contrôle des artefacts, des benchmarks plus larges, la calibration utilisateur et la revue externe.', status: 'Roadmap', facts: ['EEG en direct', 'artefacts', 'calibration', 'datasets plus grands']
    },
    {
      id: 'rogexos', name: 'RogexOS', eyebrow: 'Système', title: 'L’environnement où vit le laboratoire.', text: 'RogexOS est la vision d’un environnement souverain pour la science, l’IA locale, les apps vérifiables, Rogex Studio, rgx://, Drive, les serveurs et les outils reproductibles.', status: 'Écosystème en développement', facts: ['Catalonian / RXos', 'Roxenite', 'RGX Protocol', 'Navi']
    },
    {
      id: 'moscovium', name: 'MOSCOVIUM', eyebrow: 'PRISMA v5+', title: 'SDR, spectre et biosignaux synchronisés.', text: 'Moscovium est l’extension spectrale future de PRISMA: SDR, RF, bruit environnemental, waterfall, synchronisation EEG et recherche rigoureuse de motifs reproductibles.', status: 'Recherche future', facts: ['SDR', 'spectre RF', 'noise lab', 'PRISMA sync']
    }
  ],
  de: [
    {
      id: 'prisma3', name: 'PRISMA 3', eyebrow: 'Reales MVP · EEG', title: 'Subjekt-normalisiertes EEG-Decoding.', text: 'PRISMA 3 ist experimentelle EEG-Forschungssoftware zum Import echter EEG-Daten, zur Feature-Extraktion, zu persönlichen Baselines, Modellbewertung und reproduzierbaren Reports.', status: 'Implementiert / technische Veröffentlichung', facts: ['OpenNeuro DS007358', '28 Probanden', '3304 Fenster', '84.2% LOSO']
    },
    {
      id: 'prisma4', name: 'PRISMA 4', eyebrow: 'Nächste Phase', title: 'Live-EEG, Artefakte und Kalibrierung.', text: 'PRISMA 4 fokussiert Live-Ingestion, bessere Artefaktkontrolle, größere Benchmarks, Nutzerkalibrierung und externe Prüfung.', status: 'Roadmap', facts: ['Live EEG', 'Artefakte', 'Kalibrierung', 'größere Datensätze']
    },
    {
      id: 'rogexos', name: 'RogexOS', eyebrow: 'System', title: 'Die Umgebung, in der das Labor lebt.', text: 'RogexOS ist die Vision einer souveränen Umgebung für Wissenschaft, lokale KI, verifizierbare Apps, Rogex Studio, rgx://, Drive, Server und reproduzierbare Tools.', status: 'Ökosystem in Entwicklung', facts: ['Catalonian / RXos', 'Roxenite', 'RGX Protocol', 'Navi']
    },
    {
      id: 'moscovium', name: 'MOSCOVIUM', eyebrow: 'PRISMA v5+', title: 'SDR, Spektrum und synchronisierte Biosignale.', text: 'Moscovium ist die zukünftige spektrale Erweiterung von PRISMA: SDR, RF, Umgebungsrauschen, Waterfall, EEG-Synchronisierung und reproduzierbare Musterforschung.', status: 'Zukünftige Forschung', facts: ['SDR', 'RF-Spektrum', 'Noise Lab', 'PRISMA Sync']
    }
  ]
};

const uiData = {
  es: {
    nav: ['Inicio', 'PRISMA', 'RogexOS', 'Moscovium', 'Roadmap', 'Ciencia', 'Colaborar', 'Donar'],
    brandSubtitle: 'Infraestructura industrial de investigación',
    heroKicker: 'Rogex Laboratories · validación EEG real de PRISMA 3',
    heroTitle: 'Infraestructura industrial de investigación para software científico real.',
    heroText: 'Rogex Laboratories como infraestructura: PRISMA 3, PRISMA 4, RogexOS, Moscovium, Navi y el futuro rgx:// con estética de laboratorio, red y sistema real.',
    heroSecondary: 'PRISMA 3 ya tiene validación pública sobre EEG real: OpenNeuro DS007358, ojos cerrados vs ojos abiertos, 28 sujetos, 3304 ventanas y 84.2% LOSO normalizado.',
    ctaPrimary: 'Ver PRISMA 3',
    ctaDonate: 'Donar por PayPal',
    ctaSecondary: 'Apoyar infraestructura',
    salesHome: 'PRISMA 3 abrirá ventas pronto para investigadores o personas con interés técnico/científico real. No se venderá automáticamente a cualquiera. El precio todavía no está decidido.',
    productsTitle: 'Productos, no promesas sueltas.',
    productsText: 'La web separa lo que existe, lo que está en roadmap y lo que es visión a largo plazo.',
    realEvidence: 'Evidencia real',
    ecosystem: 'Ecosistema futuro',
    appProtocol: 'rgx://prisma3.validation',
    appSidebar: ['PRISMA', 'ROGEXOS', 'MOSCOVIUM', 'NAVI'],
    appSignal: 'Señal',
    appBaseline: 'Baseline',
    appStatus: 'Estado',
    appReport: 'Reporte',
    aiNote: 'Ilustración generada con IA',
    scienceKicker: 'Ciencia',
    scienceTitle: 'Lenguaje medido. Datos reales. Sin claims falsos.',
    scienceIntro: 'La versión más fuerte de Rogex es ambiciosa pero limpia: herramientas reproducibles, límites explícitos, colaboración abierta y nada de sobrepromesas médicas o diagnósticas.',
    scienceCards: [
      ['Validación real', 'DS007358, 28 sujetos, 3304 ventanas, ec vs eo y evaluación LOSO.'],
      ['Normalización por sujeto', 'El método modela baselines individuales en vez de tratar la variabilidad del usuario como ruido.'],
      ['Límites de artefactos', 'El trabajo futuro debe añadir mejor manejo de artefactos, ICA, intervalos de confianza y test-retest.'],
      ['No diagnóstico', 'PRISMA es software experimental de investigación, no un producto clínico.'],
      ['Colaboración científica', 'El siguiente paso serio es revisión externa y paquetes de reproducibilidad.'],
      ['Controles de Moscovium', 'Los experimentos SDR necesitan baselines, controles de sala vacía, cargas dummy y sincronización de sensores.']
    ],
    prismaKicker: 'PRISMA 3',
    prismaTitle: 'Modelar a la persona antes de interpretar el estado.',
    prismaLead: 'PRISMA no trata una señal EEG como una verdad universal. La interpreta contra una baseline individual y reporta incertidumbre.',
    prismaMini: [
      ['Entrada', 'CSV, MNE, BIDS/OpenNeuro y adaptadores de datasets.'],
      ['Core', 'Features espectrales, baseline personal, traductor individual, SQI/incertidumbre.'],
      ['Salida', 'Reportes reproducibles, evaluación ML y límites explícitos.']
    ],
    rogexosKicker: 'RogexOS',
    rogexosTitle: 'El sistema operativo como laboratorio.',
    rogexosLead: 'RogexOS une PRISMA, Navi, Roxenite, RXos/Catalonian, RGX Protocol y rgx:// en una misma dirección: ciencia soberana y verificable.',
    rogexosCards: [
      ['Catalonian / RXos', 'Kernel y base del entorno.'],
      ['Roxenite', 'Lenguaje nativo legible para construir apps Rogex.'],
      ['RGX Protocol', 'Identidad, rutas rgx://, red y confianza.']
    ],
    moscoviumKicker: 'MOSCOVIUM',
    moscoviumTitle: 'La extensión espectral de PRISMA.',
    moscoviumLead: 'Moscovium debe estudiar el entorno electromagnético con SDR, controles y sincronización con biosignales. No como magia, sino como laboratorio reproducible.',
    roadmapKicker: 'Roadmap',
    roadmapTitle: 'De validación real a infraestructura completa.',
    collaborateTitle: 'Colabora con una infraestructura de investigación, no con una página de hype.',
    collaborateText: 'Rogex puede aceptar ayuda de investigadores, desarrolladores, diseñadores, hardware people, traductores y donantes manteniendo un roadmap coherente.',
    salesNote: 'PRISMA 3 abrirá ventas pronto para investigadores y personas cualificadas con interés real. No es un producto de consumo masivo y el precio se decidirá más adelante.',
    propose: 'Proponer colaboración',
    publicSignalTitle: 'Señal pública vía API',
    publicSignalText: 'Posts de @rogexlabs cargados desde una API propia. Si no hay token configurado, se muestra un fallback local.',
    xFallback: 'No se pudo cargar la API de X. Se muestran notas públicas de fallback.',
    openX: 'Abrir @rogexlabs',
    donateKicker: 'Soporte / PayPal',
    donateTitle: 'Financia validación PRISMA, infraestructura RogexOS y experimentos Moscovium.',
    donateLead: 'Las donaciones apoyan desarrollo independiente: reportes PRISMA, demos públicas, UX de RogexOS, documentación, hardware SDR futuro y el camino hacia PRISMA 4.',
    contact: 'Contactar con Rogex',
    prismaSalesTitle: 'Ventas de PRISMA 3 pronto.',
    prismaSalesText1: 'PRISMA 3 se ofrecerá a investigadores o personas con interés técnico/científico real. No es un producto casual de consumo y no se venderá automáticamente a cualquiera.',
    prismaSalesText2: 'El precio no está decidido todavía. La prioridad es claridad, validación, uso responsable y encaje de colaboración.',
    supportBeforeLaunch: 'Apoyar antes del lanzamiento',
    publicProgressTitle: 'Progreso público',
    publicProgressText: 'Posts cargados por API desde x.com/rogexlabs, sin embed oficial de X.',
    donateBuckets: [
      ['PRISMA', 'Más datasets, mejores reportes, camino live EEG y validación.'],
      ['RogexOS', 'UI industrial, Studio, runtime rgx://, Navi y experiencia developer.'],
      ['Moscovium', 'Hardware SDR, baselines, noise lab y experimentos reproducibles.']
    ],
    mascotBubble: '¿Quieres entender Rogex sin tantos datos técnicos?',
    askPlaceholder: 'Pregúntame qué es Rogex, PRISMA, Moscovium o cómo colaborar...',
    askButton: 'Preguntar',
    quick: ['Explícame Rogex en simple', 'Qué existe ya?', 'Qué es PRISMA 3?', 'Cómo puedo colaborar?'],
    chatLoading: 'Navi está pensando...',
    chatError: 'Navi no pudo responder ahora. Revisa la API o prueba en Vercel.',
    footerTagline: 'Infraestructura industrial de investigación para PRISMA, RogexOS, Moscovium, Navi y el futuro ecosistema rgx://.',
    footerContactTitle: 'Contacto',
    footerBoundaryTitle: 'Límite / Acceso',
    footerBoundary: 'PRISMA es software experimental no diagnóstico. Las ventas de PRISMA 3 abrirán pronto solo para investigadores o personas cualificadas con interés real.',
    scientificBoundary: 'PRISMA es software experimental de investigación. No es dispositivo médico y no diagnostica, trata, cura ni predice enfermedades.'
  },
  en: {
    nav: ['Home', 'PRISMA', 'RogexOS', 'Moscovium', 'Roadmap', 'Science', 'Collaborate', 'Donate'],
    brandSubtitle: 'Industrial research infrastructure',
    heroKicker: 'Rogex Laboratories · PRISMA 3 real EEG validation',
    heroTitle: 'Industrial research infrastructure for real scientific software.',
    heroText: 'Rogex Laboratories as infrastructure: PRISMA 3, PRISMA 4, RogexOS, Moscovium, Navi and the future rgx:// with a lab, network and real-system aesthetic.',
    heroSecondary: 'PRISMA 3 already has public validation on real EEG: OpenNeuro DS007358, eyes closed vs eyes open, 28 subjects, 3304 windows and 84.2% normalized LOSO.',
    ctaPrimary: 'View PRISMA 3',
    ctaDonate: 'Donate via PayPal',
    ctaSecondary: 'Support infrastructure',
    salesHome: 'PRISMA 3 sales will open soon for researchers or people with real technical/scientific interest. It will not be sold automatically to everyone. Price is not decided yet.',
    productsTitle: 'Products, not loose promises.',
    productsText: 'The site separates what exists, what is roadmap and what is long-term vision.',
    realEvidence: 'Real evidence',
    ecosystem: 'Future ecosystem',
    appProtocol: 'rgx://prisma3.validation',
    appSidebar: ['PRISMA', 'ROGEXOS', 'MOSCOVIUM', 'NAVI'],
    appSignal: 'Signal',
    appBaseline: 'Baseline',
    appStatus: 'Status',
    appReport: 'Report',
    aiNote: 'Illustration made with AI',
    scienceKicker: 'Science',
    scienceTitle: 'Measured language. Real data. No fake claims.',
    scienceIntro: 'The strongest version of Rogex is ambitious but clean: reproducible tools, explicit limits, open collaboration and no diagnostic or medical overclaiming.',
    scienceCards: [
      ['Real validation', 'DS007358, 28 subjects, 3304 windows, ec vs eo and LOSO evaluation.'],
      ['Subject normalization', 'The method models individual baselines rather than treating user variability as noise.'],
      ['Artifact limits', 'Future work should add stronger artifact handling, ICA, confidence intervals and test-retest.'],
      ['Non-diagnostic', 'PRISMA is experimental research software, not a clinical product.'],
      ['Research collaboration', 'The next serious step is external review and reproducibility packages.'],
      ['Moscovium controls', 'SDR experiments need baselines, empty-room controls, dummy loads and sensor synchronization.']
    ],
    prismaKicker: 'PRISMA 3',
    prismaTitle: 'Model the person before interpreting the state.',
    prismaLead: 'PRISMA does not treat an EEG signal as a universal truth. It interprets it against an individual baseline and reports uncertainty.',
    prismaMini: [
      ['Input', 'CSV, MNE, BIDS/OpenNeuro and dataset adapters.'],
      ['Core', 'Spectral features, personal baseline, individual translator and SQI/uncertainty.'],
      ['Output', 'Reproducible reports, ML evaluation and explicit limits.']
    ],
    rogexosKicker: 'RogexOS',
    rogexosTitle: 'The operating system as a laboratory.',
    rogexosLead: 'RogexOS connects PRISMA, Navi, Roxenite, RXos/Catalonian, RGX Protocol and rgx:// into one direction: sovereign and verifiable science.',
    rogexosCards: [
      ['Catalonian / RXos', 'Kernel and base of the environment.'],
      ['Roxenite', 'Readable native language for building Rogex apps.'],
      ['RGX Protocol', 'Identity, rgx:// routes, network and trust.']
    ],
    moscoviumKicker: 'MOSCOVIUM',
    moscoviumTitle: 'The spectral extension of PRISMA.',
    moscoviumLead: 'Moscovium should study the electromagnetic environment with SDR, controls and biosignal synchronization. Not as magic, but as a reproducible laboratory.',
    roadmapKicker: 'Roadmap',
    roadmapTitle: 'From real validation to full infrastructure.',
    collaborateTitle: 'Collaborate with a research infrastructure, not a hype page.',
    collaborateText: 'Rogex can accept help from researchers, developers, designers, hardware people, translators and donors while keeping a coherent roadmap.',
    salesNote: 'PRISMA 3 sales will open soon for researchers and qualified interested users. It is not a mass-market product and the price will be decided later.',
    propose: 'Propose collaboration',
    publicSignalTitle: 'Public signal via API',
    publicSignalText: 'Posts from @rogexlabs loaded through a local API route. If no token is configured, a local fallback is shown.',
    xFallback: 'The X API could not be loaded. Local fallback notes are shown.',
    openX: 'Open @rogexlabs',
    donateKicker: 'Support / PayPal',
    donateTitle: 'Fund PRISMA validation, RogexOS infrastructure and Moscovium experiments.',
    donateLead: 'Donations support independent development: PRISMA reports, public demos, RogexOS UX, documentation, future SDR hardware and the research path toward PRISMA 4.',
    contact: 'Contact Rogex',
    prismaSalesTitle: 'PRISMA 3 sales opening soon.',
    prismaSalesText1: 'PRISMA 3 will be offered to researchers or people with real technical/scientific interest. It is not a casual consumer product and it will not be sold automatically to everyone.',
    prismaSalesText2: 'The price is not decided yet. The first focus is clarity, validation, responsible use and collaboration fit.',
    supportBeforeLaunch: 'Support before launch',
    publicProgressTitle: 'Public progress',
    publicProgressText: 'Posts loaded through an API from x.com/rogexlabs, without the official X embed.',
    donateBuckets: [
      ['PRISMA', 'More datasets, better reports, live EEG path and validation.'],
      ['RogexOS', 'Industrial UI, Studio, rgx:// runtime, Navi and developer experience.'],
      ['Moscovium', 'SDR hardware, baselines, noise lab and reproducible experiments.']
    ],
    mascotBubble: 'Want to understand Rogex without too many technical details?',
    askPlaceholder: 'Ask me what Rogex, PRISMA, Moscovium or collaboration means...',
    askButton: 'Ask',
    quick: ['Explain Rogex simply', 'What exists now?', 'What is PRISMA 3?', 'How can I collaborate?'],
    chatLoading: 'Navi is thinking...',
    chatError: 'Navi could not answer now. Check the API or try on Vercel.',
    footerTagline: 'Industrial research infrastructure for PRISMA, RogexOS, Moscovium, Navi and the future rgx:// ecosystem.',
    footerContactTitle: 'Contact',
    footerBoundaryTitle: 'Boundary / Access',
    footerBoundary: 'PRISMA is non-diagnostic experimental research software. PRISMA 3 sales open soon only for researchers or qualified interested users.',
    scientificBoundary: 'PRISMA is experimental research software. It is not a medical device and does not diagnose, treat, cure, or predict disease.'
  }
};

uiData.zh = {
  ...uiData.en,
  nav: ['首页', 'PRISMA', 'RogexOS', 'Moscovium', '路线图', '科学', '合作', '捐助'],
  brandSubtitle: '工业化研究基础设施',
  heroKicker: 'Rogex Laboratories · PRISMA 3 真实 EEG 验证',
  heroTitle: '面向真实科学软件的工业化研究基础设施。',
  heroText: 'Rogex Laboratories 作为基础设施：PRISMA 3、PRISMA 4、RogexOS、Moscovium、Navi 与未来 rgx://，呈现实验室、网络和真实系统的美学。',
  heroSecondary: 'PRISMA 3 已有真实 EEG 的公开验证：OpenNeuro DS007358、闭眼 vs 睁眼、28 名受试者、3304 个窗口、84.2% 归一化 LOSO。',
  ctaPrimary: '查看 PRISMA 3',
  ctaDonate: '通过 PayPal 捐助',
  ctaSecondary: '支持基础设施',
  salesHome: 'PRISMA 3 即将向研究人员或真正具备技术/科学兴趣的人开放销售。不会自动卖给所有人。价格尚未决定。',
  productsTitle: '产品，而不是零散承诺。',
  productsText: '网站区分已经存在的内容、路线图内容以及长期愿景。',
  realEvidence: '真实证据',
  ecosystem: '未来生态',
  appSignal: '信号',
  appBaseline: '基线',
  appStatus: '状态',
  appReport: '报告',
  aiNote: 'AI 生成插图',
  scienceKicker: '科学',
  scienceTitle: '可衡量的语言。真实数据。没有虚假声明。',
  scienceIntro: 'Rogex 最强的版本是有野心但干净的：可复现工具、明确限制、开放合作，并避免诊断或医疗夸大。',
  scienceCards: [
    ['真实验证', 'DS007358、28 名受试者、3304 个窗口、ec vs eo 与 LOSO 评估。'],
    ['按个体归一化', '方法建模个体基线，而不是把用户差异当作噪声。'],
    ['伪迹限制', '未来应加入更强的伪迹处理、ICA、置信区间和 test-retest。'],
    ['非诊断', 'PRISMA 是实验性研究软件，不是临床产品。'],
    ['研究合作', '下一步是外部审查和可复现包。'],
    ['Moscovium 控制', 'SDR 实验需要基线、空房间控制、dummy loads 和传感器同步。']
  ],
  prismaTitle: '先建模人，再解释状态。',
  prismaLead: 'PRISMA 不把 EEG 信号当作普遍真理。它根据个体基线解释信号，并报告不确定性。',
  prismaMini: [
    ['输入', 'CSV、MNE、BIDS/OpenNeuro 与数据集适配器。'],
    ['核心', '频谱特征、个人基线、个体翻译器和 SQI/不确定性。'],
    ['输出', '可复现报告、ML 评估和明确限制。']
  ],
  rogexosTitle: '作为实验室的操作系统。',
  rogexosLead: 'RogexOS 将 PRISMA、Navi、Roxenite、RXos/Catalonian、RGX Protocol 和 rgx:// 连接到同一方向：主权且可验证的科学。',
  rogexosCards: [
    ['Catalonian / RXos', '环境的内核和基础。'],
    ['Roxenite', '用于构建 Rogex 应用的可读原生语言。'],
    ['RGX Protocol', '身份、rgx:// 路由、网络和信任。']
  ],
  moscoviumTitle: 'PRISMA 的频谱扩展。',
  moscoviumLead: 'Moscovium 应通过 SDR、控制实验和生物信号同步研究电磁环境。不是魔法，而是可复现实验室。',
  roadmapKicker: '路线图',
  roadmapTitle: '从真实验证到完整基础设施。',
  collaborateTitle: '与研究基础设施合作，而不是与炒作页面合作。',
  collaborateText: 'Rogex 可以接受研究人员、开发者、设计师、硬件人员、翻译者和捐助者的帮助，同时保持清晰路线图。',
  salesNote: 'PRISMA 3 即将面向研究人员和合格兴趣用户开放。它不是大众消费品，价格稍后决定。',
  propose: '提出合作',
  publicSignalTitle: '通过 API 的公共信号',
  publicSignalText: '@rogexlabs 的帖子通过本地 API 路由加载。如果没有 token，将显示本地 fallback。',
  xFallback: '无法加载 X API。显示本地 fallback 内容。',
  openX: '打开 @rogexlabs',
  donateKicker: '支持 / PayPal',
  donateTitle: '资助 PRISMA 验证、RogexOS 基础设施和 Moscovium 实验。',
  donateLead: '捐助支持独立开发：PRISMA 报告、公开演示、RogexOS UX、文档、未来 SDR 硬件和 PRISMA 4 路线。',
  contact: '联系 Rogex',
  prismaSalesTitle: 'PRISMA 3 即将开放销售。',
  prismaSalesText1: 'PRISMA 3 将提供给研究人员或真正具备技术/科学兴趣的人。它不是普通消费品，也不会自动卖给所有人。',
  prismaSalesText2: '价格尚未决定。首要重点是清晰性、验证、负责任使用和合作契合度。',
  supportBeforeLaunch: '发布前支持',
  publicProgressTitle: '公共进展',
  publicProgressText: '通过 API 从 x.com/rogexlabs 加载帖子，不使用官方 X embed。',
  donateBuckets: [
    ['PRISMA', '更多数据集、更好报告、live EEG 路线和验证。'],
    ['RogexOS', '工业 UI、Studio、rgx:// runtime、Navi 和开发体验。'],
    ['Moscovium', 'SDR 硬件、基线、噪声实验室和可复现实验。']
  ],
  mascotBubble: '想用更少技术细节理解 Rogex 吗？',
  askPlaceholder: '问我 Rogex、PRISMA、Moscovium 或如何合作...',
  askButton: '提问',
  quick: ['简单解释 Rogex', '现在已有些什么？', 'PRISMA 3 是什么？', '如何合作？'],
  chatLoading: 'Navi 正在思考...',
  chatError: 'Navi 暂时无法回答。请检查 API 或在 Vercel 上测试。',
  footerTagline: '面向 PRISMA、RogexOS、Moscovium、Navi 和未来 rgx:// 生态的工业化研究基础设施。',
  footerContactTitle: '联系',
  footerBoundaryTitle: '边界 / 访问',
  footerBoundary: 'PRISMA 是非诊断实验性研究软件。PRISMA 3 将只向研究人员或合格兴趣用户开放。',
  scientificBoundary: 'PRISMA 是实验性研究软件。它不是医疗设备，也不诊断、治疗、治愈或预测疾病。'
};

uiData.ja = {
  ...uiData.en,
  nav: ['ホーム', 'PRISMA', 'RogexOS', 'Moscovium', 'ロードマップ', '科学', '協力', '寄付'],
  brandSubtitle: '産業的研究インフラ',
  heroKicker: 'Rogex Laboratories · PRISMA 3 実 EEG 検証',
  heroTitle: '本物の科学ソフトウェアのための産業的研究インフラ。',
  heroText: 'Rogex Laboratories をインフラとして提示します。PRISMA 3、PRISMA 4、RogexOS、Moscovium、Navi、未来の rgx:// を、研究所・ネットワーク・実システムの美学で構成します。',
  heroSecondary: 'PRISMA 3 は実 EEG で公開検証済みです: OpenNeuro DS007358、閉眼 vs 開眼、28名、3304ウィンドウ、84.2% normalized LOSO。',
  ctaPrimary: 'PRISMA 3を見る',
  ctaDonate: 'PayPalで寄付',
  ctaSecondary: 'インフラを支援',
  salesHome: 'PRISMA 3 は近日、研究者または本当に技術/科学的関心を持つ人向けに販売開始予定です。誰にでも自動販売されるものではありません。価格は未定です。',
  productsTitle: '製品。ばらばらの約束ではありません。',
  productsText: '存在するもの、ロードマップ、長期ビジョンを分けて表示します。',
  realEvidence: '実証データ',
  ecosystem: '将来エコシステム',
  appSignal: '信号',
  appBaseline: 'ベースライン',
  appStatus: '状態',
  appReport: 'レポート',
  aiNote: 'AI生成イラスト',
  scienceKicker: '科学',
  scienceTitle: '測定された言葉。実データ。偽の主張なし。',
  scienceIntro: 'Rogex の最強の形は野心的でありながらクリーンです。再現可能なツール、明確な限界、開かれた協力、診断や医療の過剰主張なし。',
  scienceCards: [
    ['実データ検証', 'DS007358、28名、3304ウィンドウ、ec vs eo、LOSO評価。'],
    ['被験者正規化', 'ユーザー差をノイズではなく、個人ベースラインとしてモデル化します。'],
    ['アーティファクト限界', '今後はより強いアーティファクト処理、ICA、信頼区間、test-retest が必要です。'],
    ['非診断', 'PRISMA は実験的研究ソフトウェアであり、臨床製品ではありません。'],
    ['研究協力', '次の重要な段階は外部レビューと再現可能パッケージです。'],
    ['Moscovium の制御', 'SDR 実験にはベースライン、空室制御、ダミーロード、センサー同期が必要です。']
  ],
  prismaTitle: '状態を解釈する前に、人をモデル化する。',
  prismaLead: 'PRISMA は EEG 信号を普遍的な真実として扱いません。個人ベースラインに照らして解釈し、不確実性を報告します。',
  prismaMini: [
    ['入力', 'CSV、MNE、BIDS/OpenNeuro、データセットアダプター。'],
    ['コア', 'スペクトル特徴、個人ベースライン、個別トランスレーター、SQI/不確実性。'],
    ['出力', '再現可能なレポート、ML評価、明確な限界。']
  ],
  rogexosTitle: '研究所としてのオペレーティングシステム。',
  rogexosLead: 'RogexOS は PRISMA、Navi、Roxenite、RXos/Catalonian、RGX Protocol、rgx:// を一つの方向へ接続します。主権的で検証可能な科学です。',
  rogexosCards: [
    ['Catalonian / RXos', '環境のカーネルと基盤。'],
    ['Roxenite', 'Rogex アプリを構築するための読みやすいネイティブ言語。'],
    ['RGX Protocol', 'ID、rgx:// ルート、ネットワーク、信頼。']
  ],
  moscoviumTitle: 'PRISMA のスペクトル拡張。',
  moscoviumLead: 'Moscovium は SDR、制御、バイオシグナル同期で電磁環境を研究します。魔法ではなく、再現可能な研究所です。',
  roadmapKicker: 'ロードマップ',
  roadmapTitle: '実検証から完全なインフラへ。',
  collaborateTitle: '誇張ページではなく、研究インフラと協力する。',
  collaborateText: 'Rogex は研究者、開発者、デザイナー、ハードウェア関係者、翻訳者、寄付者の支援を受けながら、一貫したロードマップを保てます。',
  salesNote: 'PRISMA 3 は近日、研究者と適格な関心ユーザー向けに販売開始予定です。大量消費向けではなく、価格は後で決定します。',
  propose: '協力を提案',
  publicSignalTitle: 'API 経由の公開シグナル',
  publicSignalText: '@rogexlabs の投稿はローカル API ルートから読み込まれます。token が未設定の場合はローカル fallback を表示します。',
  xFallback: 'X API を読み込めませんでした。ローカル fallback を表示しています。',
  openX: '@rogexlabs を開く',
  donateKicker: '支援 / PayPal',
  donateTitle: 'PRISMA 検証、RogexOS インフラ、Moscovium 実験を支援。',
  donateLead: '寄付は PRISMA レポート、公開デモ、RogexOS UX、文書化、将来の SDR ハードウェア、PRISMA 4 への道を支えます。',
  contact: 'Rogexに連絡',
  prismaSalesTitle: 'PRISMA 3 は近日販売開始。',
  prismaSalesText1: 'PRISMA 3 は研究者または本当に技術/科学的関心を持つ人向けです。カジュアルな消費者向け製品ではなく、誰にでも自動販売されません。',
  prismaSalesText2: '価格はまだ未定です。最初の焦点は明確性、検証、責任ある使用、協力の適合性です。',
  supportBeforeLaunch: 'ローンチ前に支援',
  publicProgressTitle: '公開進捗',
  publicProgressText: '公式 X embed ではなく、API で x.com/rogexlabs から投稿を読み込みます。',
  donateBuckets: [
    ['PRISMA', 'より多くのデータセット、より良いレポート、live EEG への道、検証。'],
    ['RogexOS', '産業 UI、Studio、rgx:// runtime、Navi、開発体験。'],
    ['Moscovium', 'SDR ハードウェア、ベースライン、noise lab、再現可能実験。']
  ],
  mascotBubble: '技術詳細を減らして Rogex を理解したい？',
  askPlaceholder: 'Rogex、PRISMA、Moscovium、協力方法について聞いてください...',
  askButton: '質問',
  quick: ['Rogexを簡単に説明', '今あるものは？', 'PRISMA 3とは？', 'どう協力できる？'],
  chatLoading: 'Navi が考えています...',
  chatError: 'Navi は今応答できません。API を確認するか Vercel で試してください。',
  footerTagline: 'PRISMA、RogexOS、Moscovium、Navi、未来の rgx:// エコシステムのための産業的研究インフラ。',
  footerContactTitle: '連絡先',
  footerBoundaryTitle: '境界 / アクセス',
  footerBoundary: 'PRISMA は非診断の実験的研究ソフトウェアです。PRISMA 3 は研究者または適格な関心ユーザーのみに販売予定です。',
  scientificBoundary: 'PRISMA は実験的研究ソフトウェアです。医療機器ではなく、診断・治療・治癒・疾患予測は行いません。'
};

uiData.fr = {
  ...uiData.en,
  nav: ['Accueil', 'PRISMA', 'RogexOS', 'Moscovium', 'Roadmap', 'Science', 'Collaborer', 'Donner'],
  brandSubtitle: 'Infrastructure industrielle de recherche',
  heroKicker: 'Rogex Laboratories · validation EEG réelle de PRISMA 3',
  heroTitle: 'Infrastructure industrielle de recherche pour logiciel scientifique réel.',
  heroText: 'Rogex Laboratories comme infrastructure : PRISMA 3, PRISMA 4, RogexOS, Moscovium, Navi et le futur rgx:// avec une esthétique de laboratoire, réseau et système réel.',
  heroSecondary: 'PRISMA 3 dispose déjà d’une validation publique sur EEG réel : OpenNeuro DS007358, yeux fermés vs yeux ouverts, 28 sujets, 3304 fenêtres et 84.2% LOSO normalisé.',
  ctaPrimary: 'Voir PRISMA 3',
  ctaDonate: 'Donner via PayPal',
  ctaSecondary: 'Soutenir l’infrastructure',
  salesHome: 'Les ventes de PRISMA 3 ouvriront bientôt pour les chercheurs ou les personnes ayant un véritable intérêt technique/scientifique. Il ne sera pas vendu automatiquement à tout le monde. Le prix n’est pas encore décidé.',
  productsTitle: 'Des produits, pas des promesses isolées.',
  productsText: 'Le site sépare ce qui existe, ce qui est en roadmap et ce qui relève de la vision long terme.',
  realEvidence: 'Preuve réelle',
  ecosystem: 'Écosystème futur',
  appSignal: 'Signal',
  appBaseline: 'Baseline',
  appStatus: 'État',
  appReport: 'Rapport',
  aiNote: 'Illustration générée par IA',
  scienceKicker: 'Science',
  scienceTitle: 'Langage mesuré. Données réelles. Pas de fausses promesses.',
  scienceIntro: 'La version la plus forte de Rogex est ambitieuse mais propre : outils reproductibles, limites explicites, collaboration ouverte et aucune surenchère médicale ou diagnostique.',
  scienceCards: [
    ['Validation réelle', 'DS007358, 28 sujets, 3304 fenêtres, ec vs eo et évaluation LOSO.'],
    ['Normalisation par sujet', 'La méthode modélise les baselines individuelles au lieu de traiter la variabilité utilisateur comme du bruit.'],
    ['Limites d’artefacts', 'Le travail futur doit ajouter une meilleure gestion des artefacts, ICA, intervalles de confiance et test-retest.'],
    ['Non diagnostique', 'PRISMA est un logiciel expérimental de recherche, pas un produit clinique.'],
    ['Collaboration scientifique', 'La prochaine étape sérieuse est la revue externe et les packages de reproductibilité.'],
    ['Contrôles Moscovium', 'Les expériences SDR nécessitent baselines, contrôles pièce vide, dummy loads et synchronisation des capteurs.']
  ],
  prismaTitle: 'Modéliser la personne avant d’interpréter l’état.',
  prismaLead: 'PRISMA ne traite pas un signal EEG comme une vérité universelle. Il l’interprète par rapport à une baseline individuelle et rapporte l’incertitude.',
  prismaMini: [
    ['Entrée', 'CSV, MNE, BIDS/OpenNeuro et adaptateurs de datasets.'],
    ['Cœur', 'Features spectrales, baseline personnelle, traducteur individuel et SQI/incertitude.'],
    ['Sortie', 'Rapports reproductibles, évaluation ML et limites explicites.']
  ],
  rogexosTitle: 'Le système d’exploitation comme laboratoire.',
  rogexosLead: 'RogexOS relie PRISMA, Navi, Roxenite, RXos/Catalonian, RGX Protocol et rgx:// dans une direction : science souveraine et vérifiable.',
  rogexosCards: [
    ['Catalonian / RXos', 'Kernel et base de l’environnement.'],
    ['Roxenite', 'Langage natif lisible pour construire des apps Rogex.'],
    ['RGX Protocol', 'Identité, routes rgx://, réseau et confiance.']
  ],
  moscoviumTitle: 'L’extension spectrale de PRISMA.',
  moscoviumLead: 'Moscovium doit étudier l’environnement électromagnétique avec SDR, contrôles et synchronisation de biosignaux. Pas comme de la magie, comme un laboratoire reproductible.',
  roadmapKicker: 'Roadmap',
  roadmapTitle: 'De la validation réelle à l’infrastructure complète.',
  collaborateTitle: 'Collaborer avec une infrastructure de recherche, pas une page de hype.',
  collaborateText: 'Rogex peut recevoir de l’aide de chercheurs, développeurs, designers, hardware people, traducteurs et donateurs tout en gardant une roadmap cohérente.',
  salesNote: 'Les ventes de PRISMA 3 ouvriront bientôt pour les chercheurs et utilisateurs qualifiés. Ce n’est pas un produit grand public et le prix sera décidé plus tard.',
  propose: 'Proposer une collaboration',
  publicSignalTitle: 'Signal public via API',
  publicSignalText: 'Posts de @rogexlabs chargés depuis une route API locale. Sans token configuré, un fallback local est affiché.',
  xFallback: 'L’API X n’a pas pu être chargée. Des notes locales de fallback sont affichées.',
  openX: 'Ouvrir @rogexlabs',
  donateKicker: 'Soutien / PayPal',
  donateTitle: 'Financer la validation PRISMA, l’infrastructure RogexOS et les expériences Moscovium.',
  donateLead: 'Les dons soutiennent le développement indépendant : rapports PRISMA, démos publiques, UX RogexOS, documentation, futur hardware SDR et chemin vers PRISMA 4.',
  contact: 'Contacter Rogex',
  prismaSalesTitle: 'Ventes PRISMA 3 bientôt.',
  prismaSalesText1: 'PRISMA 3 sera proposé aux chercheurs ou personnes ayant un véritable intérêt technique/scientifique. Ce n’est pas un produit consommateur casual et il ne sera pas vendu automatiquement à tout le monde.',
  prismaSalesText2: 'Le prix n’est pas encore décidé. La priorité est la clarté, la validation, l’usage responsable et l’adéquation de collaboration.',
  supportBeforeLaunch: 'Soutenir avant le lancement',
  publicProgressTitle: 'Progrès public',
  publicProgressText: 'Posts chargés par API depuis x.com/rogexlabs, sans embed officiel X.',
  donateBuckets: [
    ['PRISMA', 'Plus de datasets, meilleurs rapports, chemin live EEG et validation.'],
    ['RogexOS', 'UI industrielle, Studio, runtime rgx://, Navi et expérience développeur.'],
    ['Moscovium', 'Hardware SDR, baselines, noise lab et expériences reproductibles.']
  ],
  mascotBubble: 'Tu veux comprendre Rogex sans trop de détails techniques ?',
  askPlaceholder: 'Demande-moi ce que sont Rogex, PRISMA, Moscovium ou comment collaborer...',
  askButton: 'Demander',
  quick: ['Explique Rogex simplement', 'Qu’est-ce qui existe déjà ?', 'Qu’est-ce que PRISMA 3 ?', 'Comment collaborer ?'],
  chatLoading: 'Navi réfléchit...',
  chatError: 'Navi ne peut pas répondre maintenant. Vérifie l’API ou essaie sur Vercel.',
  footerTagline: 'Infrastructure industrielle de recherche pour PRISMA, RogexOS, Moscovium, Navi et le futur écosystème rgx://.',
  footerContactTitle: 'Contact',
  footerBoundaryTitle: 'Limite / Accès',
  footerBoundary: 'PRISMA est un logiciel expérimental non diagnostique. Les ventes de PRISMA 3 ouvriront bientôt uniquement aux chercheurs ou utilisateurs qualifiés.',
  scientificBoundary: 'PRISMA est un logiciel expérimental de recherche. Ce n’est pas un dispositif médical et il ne diagnostique, traite, guérit ni prédit des maladies.'
};

uiData.de = {
  ...uiData.en,
  nav: ['Start', 'PRISMA', 'RogexOS', 'Moscovium', 'Roadmap', 'Wissenschaft', 'Mitwirken', 'Spenden'],
  brandSubtitle: 'Industrielle Forschungsinfrastruktur',
  heroKicker: 'Rogex Laboratories · PRISMA 3 echte EEG-Validierung',
  heroTitle: 'Industrielle Forschungsinfrastruktur für echte wissenschaftliche Software.',
  heroText: 'Rogex Laboratories als Infrastruktur: PRISMA 3, PRISMA 4, RogexOS, Moscovium, Navi und das zukünftige rgx:// mit Labor-, Netzwerk- und Real-System-Ästhetik.',
  heroSecondary: 'PRISMA 3 hat bereits öffentliche Validierung mit echtem EEG: OpenNeuro DS007358, Augen geschlossen vs offen, 28 Probanden, 3304 Fenster und 84.2% normalisiertes LOSO.',
  ctaPrimary: 'PRISMA 3 ansehen',
  ctaDonate: 'Über PayPal spenden',
  ctaSecondary: 'Infrastruktur unterstützen',
  salesHome: 'PRISMA 3 wird bald für Forscher oder Personen mit echtem technischem/wissenschaftlichem Interesse verfügbar sein. Es wird nicht automatisch an jeden verkauft. Der Preis ist noch nicht entschieden.',
  productsTitle: 'Produkte, keine losen Versprechen.',
  productsText: 'Die Seite trennt, was existiert, was Roadmap ist und was langfristige Vision ist.',
  realEvidence: 'Echte Evidenz',
  ecosystem: 'Zukünftiges Ökosystem',
  appSignal: 'Signal',
  appBaseline: 'Baseline',
  appStatus: 'Status',
  appReport: 'Report',
  aiNote: 'Illustration mit KI erstellt',
  scienceKicker: 'Wissenschaft',
  scienceTitle: 'Gemessene Sprache. Echte Daten. Keine falschen Claims.',
  scienceIntro: 'Die stärkste Version von Rogex ist ambitioniert, aber sauber: reproduzierbare Tools, klare Grenzen, offene Zusammenarbeit und keine diagnostischen oder medizinischen Übertreibungen.',
  scienceCards: [
    ['Echte Validierung', 'DS007358, 28 Probanden, 3304 Fenster, ec vs eo und LOSO-Auswertung.'],
    ['Subjekt-Normalisierung', 'Die Methode modelliert individuelle Baselines, statt Nutzervariabilität als Rauschen zu behandeln.'],
    ['Artefakt-Grenzen', 'Zukünftige Arbeit sollte stärkere Artefaktbehandlung, ICA, Konfidenzintervalle und Test-Retest hinzufügen.'],
    ['Nicht diagnostisch', 'PRISMA ist experimentelle Forschungssoftware, kein klinisches Produkt.'],
    ['Forschungskooperation', 'Der nächste ernste Schritt ist externe Prüfung und Reproduzierbarkeitspakete.'],
    ['Moscovium-Kontrollen', 'SDR-Experimente brauchen Baselines, Leerraum-Kontrollen, Dummy Loads und Sensorsynchronisierung.']
  ],
  prismaTitle: 'Die Person modellieren, bevor der Zustand interpretiert wird.',
  prismaLead: 'PRISMA behandelt ein EEG-Signal nicht als universelle Wahrheit. Es interpretiert es gegen eine individuelle Baseline und berichtet Unsicherheit.',
  prismaMini: [
    ['Input', 'CSV, MNE, BIDS/OpenNeuro und Dataset-Adapter.'],
    ['Core', 'Spektrale Features, persönliche Baseline, individueller Übersetzer und SQI/Unsicherheit.'],
    ['Output', 'Reproduzierbare Reports, ML-Auswertung und klare Grenzen.']
  ],
  rogexosTitle: 'Das Betriebssystem als Labor.',
  rogexosLead: 'RogexOS verbindet PRISMA, Navi, Roxenite, RXos/Catalonian, RGX Protocol und rgx:// in eine Richtung: souveräne und überprüfbare Wissenschaft.',
  rogexosCards: [
    ['Catalonian / RXos', 'Kernel und Basis der Umgebung.'],
    ['Roxenite', 'Lesbare native Sprache zum Bau von Rogex-Apps.'],
    ['RGX Protocol', 'Identität, rgx:// Routen, Netzwerk und Vertrauen.']
  ],
  moscoviumTitle: 'Die spektrale Erweiterung von PRISMA.',
  moscoviumLead: 'Moscovium soll die elektromagnetische Umgebung mit SDR, Kontrollen und Biosignal-Synchronisierung untersuchen. Nicht als Magie, sondern als reproduzierbares Labor.',
  roadmapKicker: 'Roadmap',
  roadmapTitle: 'Von echter Validierung zu vollständiger Infrastruktur.',
  collaborateTitle: 'Mit einer Forschungsinfrastruktur zusammenarbeiten, nicht mit einer Hype-Seite.',
  collaborateText: 'Rogex kann Hilfe von Forschern, Entwicklern, Designern, Hardware-Leuten, Übersetzern und Spendern annehmen und trotzdem eine kohärente Roadmap behalten.',
  salesNote: 'PRISMA 3 wird bald für Forscher und qualifizierte interessierte Nutzer geöffnet. Es ist kein Massenmarktprodukt und der Preis wird später entschieden.',
  propose: 'Zusammenarbeit vorschlagen',
  publicSignalTitle: 'Öffentliches Signal per API',
  publicSignalText: 'Posts von @rogexlabs werden über eine lokale API-Route geladen. Ohne konfiguriertes Token wird ein lokaler Fallback angezeigt.',
  xFallback: 'Die X API konnte nicht geladen werden. Lokale Fallback-Notizen werden angezeigt.',
  openX: '@rogexlabs öffnen',
  donateKicker: 'Support / PayPal',
  donateTitle: 'PRISMA-Validierung, RogexOS-Infrastruktur und Moscovium-Experimente finanzieren.',
  donateLead: 'Spenden unterstützen unabhängige Entwicklung: PRISMA-Reports, öffentliche Demos, RogexOS UX, Dokumentation, zukünftige SDR-Hardware und den Weg zu PRISMA 4.',
  contact: 'Rogex kontaktieren',
  prismaSalesTitle: 'PRISMA 3 Verkauf bald.',
  prismaSalesText1: 'PRISMA 3 wird Forschern oder Menschen mit echtem technischem/wissenschaftlichem Interesse angeboten. Es ist kein Casual-Consumer-Produkt und wird nicht automatisch an jeden verkauft.',
  prismaSalesText2: 'Der Preis ist noch nicht entschieden. Zuerst zählen Klarheit, Validierung, verantwortlicher Einsatz und passende Zusammenarbeit.',
  supportBeforeLaunch: 'Vor Launch unterstützen',
  publicProgressTitle: 'Öffentlicher Fortschritt',
  publicProgressText: 'Posts werden per API von x.com/rogexlabs geladen, ohne offizielles X Embed.',
  donateBuckets: [
    ['PRISMA', 'Mehr Datensätze, bessere Reports, Live-EEG-Pfad und Validierung.'],
    ['RogexOS', 'Industrielle UI, Studio, rgx:// Runtime, Navi und Developer Experience.'],
    ['Moscovium', 'SDR-Hardware, Baselines, Noise Lab und reproduzierbare Experimente.']
  ],
  mascotBubble: 'Möchtest du Rogex ohne zu viele technische Details verstehen?',
  askPlaceholder: 'Frag mich, was Rogex, PRISMA, Moscovium oder Zusammenarbeit bedeutet...',
  askButton: 'Fragen',
  quick: ['Rogex einfach erklären', 'Was existiert schon?', 'Was ist PRISMA 3?', 'Wie kann ich mitwirken?'],
  chatLoading: 'Navi denkt nach...',
  chatError: 'Navi kann gerade nicht antworten. Prüfe die API oder teste auf Vercel.',
  footerTagline: 'Industrielle Forschungsinfrastruktur für PRISMA, RogexOS, Moscovium, Navi und das zukünftige rgx:// Ökosystem.',
  footerContactTitle: 'Kontakt',
  footerBoundaryTitle: 'Grenze / Zugang',
  footerBoundary: 'PRISMA ist nicht-diagnostische experimentelle Forschungssoftware. PRISMA 3 öffnet bald nur für Forscher oder qualifizierte interessierte Nutzer.',
  scientificBoundary: 'PRISMA ist experimentelle Forschungssoftware. Es ist kein medizinisches Gerät und diagnostiziert, behandelt, heilt oder prognostiziert keine Krankheiten.'
};

const metricsData = {
  es: [
    ['Dataset', 'DS007358', 'OpenNeuro resting-state EEG.'],
    ['Sujetos', '28', 'Retenidos tras filtro de montaje/canales.'],
    ['Ventanas', '3304', 'Segmentos EEG evaluados.'],
    ['Raw LOSO', '71.5%', 'Baseline cross-subject.'],
    ['LOSO normalizado', '84.2%', 'Mejora relativa al sujeto.'],
    ['Ganancia medida', '+12.7 pts', 'Frente a raw features.'],
    ['Personalizado', '91.4%', 'Intra-CV; régimen más fácil dentro del sujeto.'],
    ['Alpha check', '0.338 / 0.083', 'ec vs eo alpha occipital relativa.']
  ],
  en: [
    ['Dataset', 'DS007358', 'OpenNeuro resting-state EEG.'],
    ['Subjects', '28', 'Retained after montage/channel filtering.'],
    ['Windows', '3304', 'EEG segments evaluated.'],
    ['Raw LOSO', '71.5%', 'Cross-subject baseline.'],
    ['Normalized LOSO', '84.2%', 'Subject-relative improvement.'],
    ['Measured gain', '+12.7 pts', 'Versus raw features.'],
    ['Personalized', '91.4%', 'Intra-CV; easier within-subject regime.'],
    ['Alpha check', '0.338 / 0.083', 'ec vs eo occipital relative alpha.']
  ],
  zh: [
    ['数据集', 'DS007358', 'OpenNeuro 静息态 EEG。'],
    ['受试者', '28', '经 montage/通道过滤后保留。'],
    ['窗口', '3304', '评估的 EEG 片段。'],
    ['Raw LOSO', '71.5%', '跨受试者基线。'],
    ['归一化 LOSO', '84.2%', '相对个体的提升。'],
    ['测得提升', '+12.7 pts', '相对于 raw features。'],
    ['个性化', '91.4%', 'Intra-CV；同一受试者内更容易。'],
    ['Alpha 检查', '0.338 / 0.083', 'ec vs eo 枕区相对 alpha。']
  ],
  ja: [
    ['データセット', 'DS007358', 'OpenNeuro resting-state EEG。'],
    ['被験者', '28', 'montage/channel filtering 後に保持。'],
    ['ウィンドウ', '3304', '評価された EEG セグメント。'],
    ['Raw LOSO', '71.5%', 'Cross-subject baseline。'],
    ['正規化 LOSO', '84.2%', '被験者相対の改善。'],
    ['測定ゲイン', '+12.7 pts', 'Raw features との比較。'],
    ['個人化', '91.4%', 'Intra-CV；同一被験者内でより容易な条件。'],
    ['Alpha check', '0.338 / 0.083', 'ec vs eo 後頭部相対 alpha。']
  ],
  fr: [
    ['Dataset', 'DS007358', 'EEG resting-state OpenNeuro.'],
    ['Sujets', '28', 'Retenus après filtrage montage/canaux.'],
    ['Fenêtres', '3304', 'Segments EEG évalués.'],
    ['Raw LOSO', '71.5%', 'Baseline cross-subject.'],
    ['LOSO normalisé', '84.2%', 'Amélioration relative au sujet.'],
    ['Gain mesuré', '+12.7 pts', 'Par rapport aux raw features.'],
    ['Personnalisé', '91.4%', 'Intra-CV; régime intra-sujet plus facile.'],
    ['Alpha check', '0.338 / 0.083', 'ec vs eo alpha occipital relatif.']
  ],
  de: [
    ['Dataset', 'DS007358', 'OpenNeuro resting-state EEG.'],
    ['Probanden', '28', 'Nach Montage-/Kanalfilterung behalten.'],
    ['Fenster', '3304', 'Bewertete EEG-Segmente.'],
    ['Raw LOSO', '71.5%', 'Cross-subject Baseline.'],
    ['Normalisiertes LOSO', '84.2%', 'Subjekt-relative Verbesserung.'],
    ['Gemessener Gewinn', '+12.7 pts', 'Gegenüber Raw Features.'],
    ['Personalisiert', '91.4%', 'Intra-CV; leichteres Within-Subject-Regime.'],
    ['Alpha Check', '0.338 / 0.083', 'ec vs eo okzipitales relatives Alpha.']
  ]
};

const roadmapData = {
  es: [
    ['Release público PRISMA 3', 'Software de investigación documentado, apéndice de validación EEG real, web pública, README y licencia de investigación.'],
    ['PRISMA 4', 'EEG en vivo, mejor manejo de artefactos, benchmarks mayores y workflow de calibración.'],
    ['RogexOS Lab Runtime', 'Runtime científico, Rogex Studio, Navi, Drive, rutas rgx:// y base de apps firmadas.'],
    ['MOSCOVIUM', 'Espectro SDR, ruido ambiental, sincronización con PRISMA y reportes experimentales reproducibles.'],
    ['Colaboración científica', 'Validación externa, diseño de protocolos, revisión universitaria/laboratorio y paquetes de reproducibilidad.'],
    ['Camino comercial', 'Solo tras revisión científica, claridad IP, estructura de licencia y evaluación de límites regulatorios.']
  ],
  en: [
    ['PRISMA 3 public release', 'Documented research software, real EEG validation appendix, public web, README and research license.'],
    ['PRISMA 4', 'Live EEG ingestion, improved artifact handling, larger real-dataset benchmarks and calibration workflow.'],
    ['RogexOS Lab Runtime', 'Scientific runtime, Rogex Studio, Navi, Drive, rgx:// routes and signed app foundations.'],
    ['MOSCOVIUM', 'SDR spectrum, environmental noise, PRISMA synchronization and reproducible experimental reports.'],
    ['Research collaboration', 'External validation, protocol design, university/lab review and reproducibility packages.'],
    ['Commercial path', 'Only after scientific review, IP clarity, licensing structure and regulatory boundary assessment.']
  ],
  zh: [
    ['PRISMA 3 公开发布', '文档化研究软件、真实 EEG 验证附录、公开视频、README 和研究许可证。'],
    ['PRISMA 4', '实时 EEG、更强伪迹处理、更大真实数据基准和校准流程。'],
    ['RogexOS Lab Runtime', '科学 runtime、Rogex Studio、Navi、Drive、rgx:// 路由和签名应用基础。'],
    ['MOSCOVIUM', 'SDR 频谱、环境噪声、PRISMA 同步和可复现实验报告。'],
    ['研究合作', '外部验证、协议设计、大学/实验室审查和可复现包。'],
    ['商业路径', '只在科学审查、IP 清晰、许可结构和监管边界评估之后。']
  ],
  ja: [
    ['PRISMA 3 公開リリース', '文書化された研究ソフトウェア、実 EEG 検証付録、公開 Web、README、研究ライセンス。'],
    ['PRISMA 4', 'ライブ EEG 入力、改善されたアーティファクト処理、より大きな実データベンチマーク、校正ワークフロー。'],
    ['RogexOS Lab Runtime', '科学 runtime、Rogex Studio、Navi、Drive、rgx:// ルート、署名アプリの基盤。'],
    ['MOSCOVIUM', 'SDR スペクトル、環境ノイズ、PRISMA 同期、再現可能な実験レポート。'],
    ['研究協力', '外部検証、プロトコル設計、大学/研究所レビュー、再現可能パッケージ。'],
    ['商用パス', '科学レビュー、IP の明確化、ライセンス構造、規制境界の評価後のみ。']
  ],
  fr: [
    ['Release public PRISMA 3', 'Logiciel de recherche documenté, annexe de validation EEG réelle, web public, README et licence de recherche.'],
    ['PRISMA 4', 'Ingestion EEG live, meilleure gestion des artefacts, benchmarks réels plus larges et workflow de calibration.'],
    ['RogexOS Lab Runtime', 'Runtime scientifique, Rogex Studio, Navi, Drive, routes rgx:// et base d’apps signées.'],
    ['MOSCOVIUM', 'Spectre SDR, bruit environnemental, synchronisation PRISMA et rapports expérimentaux reproductibles.'],
    ['Collaboration scientifique', 'Validation externe, design de protocoles, revue université/labo et packages de reproductibilité.'],
    ['Chemin commercial', 'Seulement après revue scientifique, clarté IP, structure de licence et évaluation des limites réglementaires.']
  ],
  de: [
    ['PRISMA 3 öffentliche Veröffentlichung', 'Dokumentierte Forschungssoftware, echte EEG-Validierungsanlage, öffentliche Website, README und Forschungslizenz.'],
    ['PRISMA 4', 'Live-EEG-Ingestion, verbesserte Artefaktbehandlung, größere Real-Dataset-Benchmarks und Kalibrierungsworkflow.'],
    ['RogexOS Lab Runtime', 'Wissenschaftliche Runtime, Rogex Studio, Navi, Drive, rgx:// Routen und Grundlagen signierter Apps.'],
    ['MOSCOVIUM', 'SDR-Spektrum, Umgebungsrauschen, PRISMA-Synchronisierung und reproduzierbare Experimentreports.'],
    ['Forschungskooperation', 'Externe Validierung, Protokolldesign, Uni-/Laborprüfung und Reproduzierbarkeitspakete.'],
    ['Kommerzieller Weg', 'Nur nach wissenschaftlicher Prüfung, IP-Klarheit, Lizenzstruktur und Bewertung regulatorischer Grenzen.']
  ]
};

export function t(locale) {
  return uiData[locale] || uiData.en;
}

export function products(locale) {
  return productData[locale] || productData.en;
}

export function metrics(locale) {
  return (metricsData[locale] || metricsData.en).map(([label, value, note]) => ({ label, value, note }));
}

export function roadmap(locale) {
  return roadmapData[locale] || roadmapData.en;
}

export const fallbackPosts = {
  es: [
    { id: 'local-1', text: 'Rogex Laboratories avanza como infraestructura industrial de investigación: PRISMA, RogexOS y Moscovium.', created_at: 'local' },
    { id: 'local-2', text: 'PRISMA 3 abrirá ventas pronto para investigadores y personas cualificadas con interés científico real.', created_at: 'local' },
    { id: 'local-3', text: 'Moscovium será el puente entre SDR, espectro y experimentos reproducibles con PRISMA.', created_at: 'local' }
  ],
  en: [
    { id: 'local-1', text: 'Rogex Laboratories moves as industrial research infrastructure: PRISMA, RogexOS and Moscovium.', created_at: 'local' },
    { id: 'local-2', text: 'PRISMA 3 sales will open soon for researchers and qualified people with real scientific interest.', created_at: 'local' },
    { id: 'local-3', text: 'Moscovium will connect SDR, spectrum and reproducible experiments with PRISMA.', created_at: 'local' }
  ],
  zh: [
    { id: 'local-1', text: 'Rogex Laboratories 正在作为工业化研究基础设施推进：PRISMA、RogexOS 和 Moscovium。', created_at: 'local' },
    { id: 'local-2', text: 'PRISMA 3 即将面向研究人员和真正有科学兴趣的合格用户开放销售。', created_at: 'local' },
    { id: 'local-3', text: 'Moscovium 将连接 SDR、频谱和与 PRISMA 同步的可复现实验。', created_at: 'local' }
  ],
  ja: [
    { id: 'local-1', text: 'Rogex Laboratories は PRISMA、RogexOS、Moscovium を中心とする産業的研究インフラとして進んでいます。', created_at: 'local' },
    { id: 'local-2', text: 'PRISMA 3 は研究者と本当に科学的関心を持つ適格な人向けに近日販売開始予定です。', created_at: 'local' },
    { id: 'local-3', text: 'Moscovium は SDR、スペクトル、PRISMA と同期する再現可能実験を接続します。', created_at: 'local' }
  ],
  fr: [
    { id: 'local-1', text: 'Rogex Laboratories avance comme infrastructure industrielle de recherche : PRISMA, RogexOS et Moscovium.', created_at: 'local' },
    { id: 'local-2', text: 'Les ventes de PRISMA 3 ouvriront bientôt pour les chercheurs et personnes qualifiées avec un réel intérêt scientifique.', created_at: 'local' },
    { id: 'local-3', text: 'Moscovium reliera SDR, spectre et expériences reproductibles avec PRISMA.', created_at: 'local' }
  ],
  de: [
    { id: 'local-1', text: 'Rogex Laboratories entwickelt sich als industrielle Forschungsinfrastruktur: PRISMA, RogexOS und Moscovium.', created_at: 'local' },
    { id: 'local-2', text: 'PRISMA 3 Verkäufe öffnen bald für Forscher und qualifizierte Personen mit echtem wissenschaftlichem Interesse.', created_at: 'local' },
    { id: 'local-3', text: 'Moscovium verbindet SDR, Spektrum und reproduzierbare Experimente mit PRISMA.', created_at: 'local' }
  ]
};

export const socialLinks = [
  ['GitHub', 'https://github.com/n4vv4r'],
  ['LinkedIn', 'https://www.linkedin.com/company/rogexlabs/'],
  ['X', 'https://x.com/rogexlabs'],
  ['Instagram', 'https://instagram.com/rogexlaboratories'],
  ['Linktree', 'https://linktr.ee/rogynavy']
];
