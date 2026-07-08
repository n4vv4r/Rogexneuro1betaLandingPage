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
      title: 'Live EEG, artefactos y calibración.',
      text: 'La fase PRISMA 4 debe centrarse en ingestión en vivo, mejor control de artefactos, benchmarks más grandes, calibración por usuario y revisión externa.',
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
      id: 'rogexos', name: 'RogexOS', eyebrow: 'システム', title: '研究所が生きる環境。', text: 'RogexOS は科学、ローカル AI、検証可能なアプリ、Rogex Studio、rgx://、Drive、サーバー、再現可能なツールのための主権的環境です。', status: '開発中', facts: ['Catalonian / RXos', 'Roxenite', 'RGX Protocol', 'Navi']
    },
    {
      id: 'moscovium', name: 'MOSCOVIUM', eyebrow: 'PRISMA v5+', title: 'SDR、スペクトル、同期バイオシグナル。', text: 'Moscovium は PRISMA の将来のスペクトル拡張で、SDR、RF、環境ノイズ、waterfall、EEG同期、再現可能なパターン研究を扱います。', status: '将来研究', facts: ['SDR', 'RF spectrum', 'noise lab', 'PRISMA sync']
    }
  ],
  fr: [
    {
      id: 'prisma3', name: 'PRISMA 3', eyebrow: 'MVP réel · EEG', title: 'Décodage EEG normalisé par sujet.', text: 'PRISMA 3 est un logiciel expérimental de recherche EEG pour importer des données réelles, extraire des caractéristiques, créer des baselines personnelles, évaluer des modèles et générer des rapports reproductibles.', status: 'Implémenté / release technique', facts: ['OpenNeuro DS007358', '28 sujets', '3304 fenêtres', '84.2% LOSO']
    },
    {
      id: 'prisma4', name: 'PRISMA 4', eyebrow: 'Prochaine phase', title: 'EEG live, artefacts et calibration.', text: 'PRISMA 4 vise l’ingestion live, le contrôle des artefacts, des benchmarks plus larges, la calibration utilisateur et la revue externe.', status: 'Roadmap', facts: ['live EEG', 'artefacts', 'calibration', 'datasets plus grands']
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
      id: 'prisma3', name: 'PRISMA 3', eyebrow: 'Reales MVP · EEG', title: 'Subjekt-normalisiertes EEG-Decoding.', text: 'PRISMA 3 ist experimentelle EEG-Forschungssoftware zum Import echter EEG-Daten, Feature-Extraktion, persönlichen Baselines, Modellbewertung und reproduzierbaren Reports.', status: 'Implementiert / technische Veröffentlichung', facts: ['OpenNeuro DS007358', '28 Probanden', '3304 Fenster', '84.2% LOSO']
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

const base = {
  es: {
    nav: ['Inicio', 'PRISMA', 'RogexOS', 'Moscovium', 'Roadmap', 'Ciencia', 'Colaborar', 'Donar'],
    heroKicker: 'Rogex Laboratories · PRISMA 3 real EEG validation',
    heroTitle: 'Software científico soberano, diseñado para investigación real.',
    heroText: 'Una web más limpia y seria para presentar PRISMA 3, PRISMA 4, RogexOS, Moscovium, Navi y el futuro rgx:// sin parecer una plantilla de IA.',
    heroSecondary: 'PRISMA 3 ya tiene una validación pública sobre EEG real: OpenNeuro DS007358, ojos cerrados vs ojos abiertos, 28 sujetos, 3304 ventanas y 84.2% LOSO normalizado.',
    ctaPrimary: 'Ver PRISMA 3',
    ctaSecondary: 'Apoyar desarrollo',
    productsTitle: 'Productos, no promesas sueltas.',
    productsText: 'La web separa lo que existe, lo que está en roadmap y lo que es visión a largo plazo.',
    realEvidence: 'Evidencia real',
    ecosystem: 'Ecosistema futuro',
    mascotBubble: '¿Quieres entender Rogex sin tantos datos técnicos?',
    askPlaceholder: 'Pregúntame qué es Rogex, PRISMA, Moscovium o cómo colaborar...',
    askButton: 'Preguntar',
    quick: ['Explícame Rogex en simple', 'Qué existe ya?', 'Qué es PRISMA 3?', 'Cómo puedo colaborar?'],
    scientificBoundary: 'PRISMA es software experimental de investigación. No es dispositivo médico y no diagnostica, trata, cura ni predice enfermedades.',
    routes: {
      prisma: 'PRISMA',
      rogexos: 'RogexOS',
      moscovium: 'Moscovium',
      roadmap: 'Roadmap',
      science: 'Ciencia',
      collaborate: 'Colaborar',
      donate: 'Donar'
    }
  },
  en: {
    nav: ['Home', 'PRISMA', 'RogexOS', 'Moscovium', 'Roadmap', 'Science', 'Collaborate', 'Donate'],
    heroKicker: 'Rogex Laboratories · PRISMA 3 real EEG validation',
    heroTitle: 'Sovereign scientific software, designed for real research.',
    heroText: 'A cleaner and more serious site for PRISMA 3, PRISMA 4, RogexOS, Moscovium, Navi and the future rgx:// without looking like an AI template.',
    heroSecondary: 'PRISMA 3 already has public validation on real EEG: OpenNeuro DS007358, eyes closed vs eyes open, 28 subjects, 3304 windows and 84.2% normalized LOSO.',
    ctaPrimary: 'View PRISMA 3',
    ctaSecondary: 'Support development',
    productsTitle: 'Products, not loose promises.',
    productsText: 'The site separates what exists, what is roadmap and what is long-term vision.',
    realEvidence: 'Real evidence',
    ecosystem: 'Future ecosystem',
    mascotBubble: 'Want to understand Rogex without too many technical details?',
    askPlaceholder: 'Ask me what Rogex, PRISMA, Moscovium or collaboration means...',
    askButton: 'Ask',
    quick: ['Explain Rogex simply', 'What exists now?', 'What is PRISMA 3?', 'How can I collaborate?'],
    scientificBoundary: 'PRISMA is experimental research software. It is not a medical device and does not diagnose, treat, cure, or predict disease.',
    routes: {
      prisma: 'PRISMA',
      rogexos: 'RogexOS',
      moscovium: 'Moscovium',
      roadmap: 'Roadmap',
      science: 'Science',
      collaborate: 'Collaborate',
      donate: 'Donate'
    }
  }
};

export function t(locale) {
  return base[locale] || base.en;
}

export function products(locale) {
  return productData[locale] || productData.en;
}

export const metrics = [
  { label: 'Dataset', value: 'DS007358', note: 'OpenNeuro resting-state EEG.' },
  { label: 'Subjects', value: '28', note: 'Retained after montage/channel filtering.' },
  { label: 'Windows', value: '3304', note: 'EEG segments evaluated.' },
  { label: 'Raw LOSO', value: '71.5%', note: 'Cross-subject baseline.' },
  { label: 'Normalized LOSO', value: '84.2%', note: 'Subject-relative improvement.' },
  { label: 'Measured gain', value: '+12.7 pts', note: 'Versus raw features.' },
  { label: 'Personalized', value: '91.4%', note: 'Intra-CV; easier within-subject regime.' },
  { label: 'Alpha check', value: '0.338 / 0.083', note: 'ec vs eo occipital relative alpha.' },
];

export const roadmap = [
  ['PRISMA 3 public release', 'Documented research software, real EEG validation appendix, public web, README and research license.'],
  ['PRISMA 4', 'Live EEG ingestion, improved artifact handling, larger real-dataset benchmarks and calibration workflow.'],
  ['RogexOS Lab Runtime', 'Scientific runtime, Rogex Studio, Navi, Drive, rgx:// routes and signed app foundations.'],
  ['MOSCOVIUM', 'SDR spectrum, environmental noise, PRISMA synchronization and reproducible experimental reports.'],
  ['Research collaboration', 'External validation, protocol design, university/lab review and reproducibility packages.'],
  ['Commercial path', 'Only after scientific review, IP clarity, licensing structure and regulatory boundary assessment.']
];

export const socialLinks = [
  ['GitHub', 'https://github.com/n4vv4r'],
  ['LinkedIn', 'https://www.linkedin.com/company/rogexlabs/'],
  ['X', 'https://x.com/rogexlabs'],
  ['Instagram', 'https://instagram.com/rogexlaboratories'],
  ['Linktree', 'https://linktr.ee/rogynavy']
];
