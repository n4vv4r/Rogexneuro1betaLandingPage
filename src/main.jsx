import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Brain,
  ChartNoAxesColumnIncreasing,
  Database,
  Download,
  FileText,
  FolderOpen,
  LineChart,
  Mail,
  Microscope,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  UserRound,
  Waves,
} from 'lucide-react';

import logo from './assets/rogex-logo-transparent.png';
import './styles.css';

const routes = ['research', 'prisma', 'prisma3', 'prisma4', 'methods', 'collaborations', 'advances', 'notes', 'contact'];

const copy = {
  es: {
    nav: {
      research: 'Investigación',
      prisma: 'PRISMA', prisma3: 'PRISMA 3', prisma4: 'PRISMA 4', prisma3: 'PRISMA 3', prisma4: 'PRISMA 4',
      methods: 'Métodos',
      collaborations: 'Colaboraciones',
      advances: 'Avances',
      notes: 'Notas',
      contact: 'Contacto',
    },
    ui: {
      language: 'EN',
      backHome: 'Inicio',
      viewPrisma: 'Ver PRISMA',
      documentation: 'Documentación',
      contact: 'Contactar',
      readNotes: 'Leer notas',
      follow: 'Seguir y conectar',
    },
    home: {
      eyebrow: 'Software de investigación independiente.',
      title: 'Herramientas abiertas para análisis EEG reproducible.',
      text:
        'Rogex Laboratories desarrolla PRISMA: un entorno de análisis EEG orientado a investigación, diseñado para importar datos reales, limpiar señales, individualizar métricas y producir resultados interpretables.',
      secondary:
        'La web prioriza metodología, límites, reproducibilidad y colaboración académica. Sin promesas clínicas, sin humo comercial.',
    },
    research: {
      eyebrow: 'Investigación',
      title: 'Un laboratorio independiente para neurotecnología aplicada.',
      text:
        'Rogex Laboratories trabaja en software científico para análisis de señales EEG, resting-state, filtrado de ruido, PSD de Welch, variabilidad interindividual y flujos de análisis revisables.',
      blocks: [
        {
          title: 'Objetivo',
          text:
            'Convertir datos EEG complejos en resultados claros, auditables y útiles para investigadores.',
        },
        {
          title: 'Enfoque',
          text:
            'Software local-first, metodología explícita, documentación abierta y resultados reproducibles.',
        },
        {
          title: 'Límites',
          text:
            'PRISMA no es un dispositivo médico ni una herramienta diagnóstica. Es software de investigación.',
        },
      ],
    },
    prisma: {
      eyebrow: 'PRISMA',
      title: 'Pipeline de análisis EEG para datos reales.',
      text:
        'PRISMA ayuda a estructurar el análisis: carga de datos MATLAB, preprocesado, filtrado, PSD, bandpower, métricas por sujeto y exportación de resultados.',
      workflowTitle: 'Flujo PRISMA',
      workflow: [
        {
          number: '01',
          title: 'Importar datos reales',
          text: 'Carga de archivos MATLAB y estructuras EEG con metadatos explícitos.',
          icon: Database,
        },
        {
          number: '02',
          title: 'Limpiar y filtrar',
          text: 'Bandpass, notch, reducción de ruido y control de artefactos.',
          icon: SlidersHorizontal,
        },
        {
          number: '03',
          title: 'Individualizar por sujeto',
          text: 'Normalización, baselines e IAF para variabilidad interindividual.',
          icon: UserRound,
        },
        {
          number: '04',
          title: 'Análisis espectral',
          text: 'PSD de Welch, bandpower, ratios e indicadores interpretables.',
          icon: ChartNoAxesColumnIncreasing,
        },
        {
          number: '05',
          title: 'Exportar resultados',
          text: 'Tablas, figuras y salidas reproducibles para revisión científica.',
          icon: Download,
        },
      ],
      featuresTitle: 'Qué hace PRISMA',
      features: [
        {
          title: 'Ingesta MATLAB & EEG',
          text: 'Lectura de datos reales, matrices, canales, frecuencia de muestreo y metadatos.',
          icon: FolderOpen,
        },
        {
          title: 'Filtrado y preprocesado',
          text: 'Decisiones transparentes de filtrado, rechazo de artefactos y preparación de señal.',
          icon: Waves,
        },
        {
          title: 'Welch PSD y bandpower',
          text: 'Estimación espectral robusta y métricas por bandas cerebrales.',
          icon: ChartNoAxesColumnIncreasing,
        },
        {
          title: 'Resting-state',
          text: 'Pipelines pensados para EEG en reposo y exploración de patrones base.',
          icon: Brain,
        },
        {
          title: 'Variabilidad interindividual',
          text: 'Modelos que respetan diferencias entre sujetos en lugar de ocultarlas.',
          icon: UserRound,
        },
        {
          title: 'Salidas reproducibles',
          text: 'Resultados claros para figuras, informes, estadística y revisión externa.',
          icon: FileText,
        },
      ],
    },
    methods: {
      eyebrow: 'Métodos',
      title: 'Metodología transparente, resultados interpretables.',
      text:
        'La confianza no viene de prometer accuracy absoluta. Viene de documentar cómo se limpian los datos, qué features se extraen, dónde falla el modelo y qué puede reproducirse.',
      items: [
        {
          title: 'Evaluación LOSO',
          text:
            'Leave-One-Subject-Out para estimar generalización entre sujetos y reducir leakage metodológico.',
          icon: ShieldCheck,
        },
        {
          title: 'Metodología visible',
          text:
            'Preprocesado, features, normalización y decisiones técnicas documentadas.',
          icon: FileText,
        },
        {
          title: 'Pipelines interpretables',
          text:
            'Diseño orientado a revisión científica, no a modelos caja negra sin explicación.',
          icon: Microscope,
        },
        {
          title: 'Limitaciones conocidas',
          text:
            'Se reportan límites, incertidumbre, calidad de señal y condiciones donde no conviene sobreinterpretar.',
          icon: TriangleAlert,
        },
      ],
    },
    collaborations: {
      eyebrow: 'Colaboraciones',
      title: 'Trabajo con comunidad académica y datos reales.',
      text:
        'La prioridad actual es contribuir a investigación real, aprender metodología y construir PRISMA alrededor de problemas concretos de neurociencia.',
      items: [
        {
          title: 'Colaboración académica actual',
          text: 'Trabajo activo con investigadores en metodología EEG y análisis de señal.',
        },
        {
          title: 'Universitat de Girona',
          text: 'Colaboración vinculada a investigación en neurología, adicciones y análisis EEG.',
        },
        {
          title: 'Adicciones y neurología',
          text: 'Apoyo exploratorio para estudiar datos neurofisiológicos en contexto investigador.',
        },
        {
          title: 'Datos hospitalarios anonimizados',
          text: 'Análisis bajo aprobaciones y límites adecuados, sin exponer datos sensibles.',
        },
        {
          title: 'Procesamiento reproducible',
          text: 'Énfasis en métodos transparentes, resting-state, Welch PSD y reporting claro.',
        },
      ],
    },
    notes: {
      eyebrow: 'Notas de investigación',
      title: 'Métodos, decisiones técnicas y diario de laboratorio.',
      text:
        'Un registro de avances, problemas abiertos y aprendizajes en EEG, MATLAB, PRISMA y software científico.',
      items: [
        {
          type: 'Métodos',
          date: '12 mayo 2026',
          title: 'Variabilidad interindividual en resting-state EEG',
          text: 'Por qué los baselines individuales importan y cómo PRISMA los modela sin ocultar supuestos.',
        },
        {
          type: 'Nota técnica',
          date: '28 abril 2026',
          title: 'Ruido magnético en EEG: detección y filtrado',
          text: 'Estrategias prácticas para identificar line noise, armónicos y registros inestables.',
        },
        {
          type: 'Lab update',
          date: '10 abril 2026',
          title: 'PRISMA Research Core: mejoras del pipeline',
          text: 'Cambios en ingesta MATLAB, preprocesado y flujo PSD de Welch.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Abierto a feedback académico, revisión técnica y colaboración.',
      text:
        'Rogex Laboratories busca construir herramientas de análisis EEG con rigor, transparencia y utilidad real para investigación.',
      email: 'Email',
    },
    footer:
      'Laboratorio independiente de investigación desarrollando herramientas abiertas para análisis EEG y neurotecnología.',
  },
  en: {
    nav: {
      research: 'Research',
      prisma: 'PRISMA',
      methods: 'Methods',
      collaborations: 'Collaborations',
      advances: 'Progress',
      notes: 'Notes',
      contact: 'Contact',
    },
    ui: {
      language: 'ES',
      backHome: 'Home',
      viewPrisma: 'View PRISMA',
      documentation: 'Documentation',
      contact: 'Contact',
      readNotes: 'Read notes',
      follow: 'Follow & connect',
    },
    home: {
      eyebrow: 'Independent research software.',
      title: 'Open tools for reproducible EEG analysis.',
      text:
        'Rogex Laboratories develops PRISMA: a research-oriented EEG analysis environment designed to import real data, clean signals, individualize metrics and produce interpretable results.',
      secondary:
        'The site prioritizes methodology, limitations, reproducibility and academic collaboration. No clinical promises. No commercial hype.',
    },
    research: {
      eyebrow: 'Research',
      title: 'An independent lab for applied neurotechnology.',
      text:
        'Rogex Laboratories works on scientific software for EEG signal analysis, resting-state workflows, noise filtering, Welch PSD, inter-individual variability and reviewable analysis pipelines.',
      blocks: [
        {
          title: 'Objective',
          text:
            'Turn complex EEG data into clear, auditable and useful results for researchers.',
        },
        {
          title: 'Approach',
          text:
            'Local-first software, explicit methodology, open documentation and reproducible results.',
        },
        {
          title: 'Limits',
          text:
            'PRISMA is not a medical device or diagnostic tool. It is research software.',
        },
      ],
    },
    prisma: {
      eyebrow: 'PRISMA',
      title: 'EEG analysis pipeline for real data.',
      text:
        'PRISMA helps structure the workflow: MATLAB data loading, preprocessing, filtering, PSD, bandpower, subject-level metrics and result export.',
      workflowTitle: 'PRISMA workflow',
      workflow: [
        {
          number: '01',
          title: 'Import real data',
          text: 'MATLAB files and EEG structures with explicit metadata.',
          icon: Database,
        },
        {
          number: '02',
          title: 'Clean & filter',
          text: 'Bandpass, notch, noise reduction and artifact control.',
          icon: SlidersHorizontal,
        },
        {
          number: '03',
          title: 'Individualize by subject',
          text: 'Normalization, baselines and IAF for inter-individual variability.',
          icon: UserRound,
        },
        {
          number: '04',
          title: 'Spectral analysis',
          text: 'Welch PSD, bandpower, ratios and interpretable indicators.',
          icon: ChartNoAxesColumnIncreasing,
        },
        {
          number: '05',
          title: 'Export results',
          text: 'Tables, figures and reproducible outputs for scientific review.',
          icon: Download,
        },
      ],
      featuresTitle: 'What PRISMA does',
      features: [
        {
          title: 'MATLAB & EEG ingestion',
          text: 'Real data loading, matrices, channels, sampling frequency and metadata.',
          icon: FolderOpen,
        },
        {
          title: 'Filtering & preprocessing',
          text: 'Transparent filtering, artifact rejection and signal preparation decisions.',
          icon: Waves,
        },
        {
          title: 'Welch PSD & bandpower',
          text: 'Robust spectral estimation and metrics across brainwave bands.',
          icon: ChartNoAxesColumnIncreasing,
        },
        {
          title: 'Resting-state',
          text: 'Pipelines designed for resting EEG and baseline pattern exploration.',
          icon: Brain,
        },
        {
          title: 'Inter-individual variability',
          text: 'Models that respect subject differences instead of hiding them.',
          icon: UserRound,
        },
        {
          title: 'Reproducible outputs',
          text: 'Clear results for figures, reports, statistics and external review.',
          icon: FileText,
        },
      ],
    },
    methods: {
      eyebrow: 'Methods',
      title: 'Transparent methodology, interpretable results.',
      text:
        'Trust does not come from promising absolute accuracy. It comes from documenting how data is cleaned, which features are extracted, where models fail and what can be reproduced.',
      items: [
        {
          title: 'LOSO evaluation',
          text:
            'Leave-One-Subject-Out validation to estimate generalization across subjects and reduce methodological leakage.',
          icon: ShieldCheck,
        },
        {
          title: 'Visible methodology',
          text:
            'Preprocessing, features, normalization and technical decisions are documented.',
          icon: FileText,
        },
        {
          title: 'Interpretable pipelines',
          text:
            'Designed for scientific review, not unexplained black-box claims.',
          icon: Microscope,
        },
        {
          title: 'Known limitations',
          text:
            'Limits, uncertainty, signal quality and overinterpretation risks are reported.',
          icon: TriangleAlert,
        },
      ],
    },
    collaborations: {
      eyebrow: 'Collaborations',
      title: 'Working with academic community and real data.',
      text:
        'The current priority is contributing to real research, learning methodology and building PRISMA around concrete neuroscience problems.',
      items: [
        {
          title: 'Current academic collaboration',
          text: 'Active work with researchers on EEG methodology and signal analysis.',
        },
        {
          title: 'Universitat de Girona',
          text: 'Collaboration connected to neurology, addiction research and EEG analysis.',
        },
        {
          title: 'Addiction & neurology',
          text: 'Exploratory support for neurophysiological data in research contexts.',
        },
        {
          title: 'Anonymized hospital datasets',
          text: 'Analysis under appropriate approvals and limits, without exposing sensitive data.',
        },
        {
          title: 'Reproducible processing',
          text: 'Emphasis on transparent methods, resting-state, Welch PSD and clear reporting.',
        },
      ],
    },
    notes: {
      eyebrow: 'Research notes',
      title: 'Methods, technical decisions and lab journal.',
      text:
        'A record of progress, open problems and learnings in EEG, MATLAB, PRISMA and scientific software.',
      items: [
        {
          type: 'Methods',
          date: 'May 12, 2026',
          title: 'Inter-individual variability in resting-state EEG',
          text: 'Why individual baselines matter and how PRISMA models them without hiding assumptions.',
        },
        {
          type: 'Technical note',
          date: 'Apr 28, 2026',
          title: 'Magnetic noise in EEG: detection and filtering',
          text: 'Practical strategies for identifying line noise, harmonics and unstable recordings.',
        },
        {
          type: 'Lab update',
          date: 'Apr 10, 2026',
          title: 'PRISMA Research Core: pipeline improvements',
          text: 'Changes in MATLAB ingestion, preprocessing and Welch PSD workflow.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Open to academic feedback, technical review and collaboration.',
      text:
        'Rogex Laboratories aims to build EEG analysis tools with rigor, transparency and real usefulness for research.',
      email: 'Email',
    },
    footer:
      'Independent research laboratory developing open tools for EEG analysis and neurotechnology.',
  },
};

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/n4vv4r',
    icon: 'https://img.icons8.com/ios-glyphs/30/github.png',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/rogexlabs/',
    icon: 'https://img.icons8.com/ios-filled/50/linkedin.png',
  },
  {
    label: 'X',
    href: 'https://x.com/rogexlabs',
    icon: 'https://img.icons8.com/ios-filled/50/twitterx.png',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/rogexlaboratories',
    icon: 'https://img.icons8.com/ios-filled/50/instagram-new.png',
  },
  {
    label: 'Linktree',
    href: 'https://linktr.ee/rogynavy',
    icon: 'https://img.icons8.com/ios-filled/50/linktree.png',
  },
];


const prisma3Article = {
  es: {
    eyebrow: 'Artículo científico / Rogex Laboratories',
    title: 'PRISMA 3: un traductor neuroinformacional individual para estudiar la variabilidad interindividual.',
    subtitle:
      'PRISMA 3 no busca un patrón universal de cerebro. Busca aprender el idioma neurofisiológico de cada individuo.',
    date: 'Julio 2026',
    author: 'Roger Navarro · Rogex Laboratories',
    abstractTitle: 'Resumen',
    abstract:
      'PRISMA 3 es una plataforma experimental de software neuroinformacional construida para estudiar una hipótesis concreta: la variabilidad interindividual no debe tratarse como ruido a eliminar, sino como parte central del traductor biológico de cada persona. El sistema usa EEG simulado, extracción de features, baseline individual, normalización intrasujeto, machine learning y reportes explicables para probar una arquitectura de análisis que después podrá conectarse a EEG real. No es diagnóstico, no es dispositivo médico y no mide neurotransmisores ni receptores. Es una base experimental para investigar.',
    thesisTitle: 'Tesis central',
    thesis:
      'La misma tarea mental no produce exactamente la misma firma EEG en todas las personas. Por eso, un modelo universal puede fallar: interpreta a todos desde el mismo molde. PRISMA 3 propone otro enfoque: primero construir una línea base individual, luego interpretar cada señal como desviación respecto al propio patrón del usuario.',
    formulaTitle: 'Traducción de la Teoría del Todo Dual a software',
    formula: 'Sp = Tb(Is, A, E, Mp)',
    mapping: [
      ['Is', 'Información sobreviviente', 'features EEG disponibles: bandpower, ratios, entropía, Hjorth, calidad de señal.'],
      ['A', 'Ausencia / incertidumbre', 'ruido, artefactos, datos incompletos, baja calidad de señal, incertidumbre del modelo.'],
      ['E', 'Estado/contexto', 'tarea, ejercicio, emoción reportada, respiración, fatiga, sueño o priming experimental.'],
      ['Mp', 'Memoria personal', 'baseline individual, historia de sesiones, varianza propia, respuesta a tareas.'],
      ['Tb', 'Traductor biológico individual', 'motor que normaliza por sujeto, estima confianza y explica desviaciones personales.'],
      ['Sp', 'Estado estimado', 'salida interpretable: estado probable, confianza, incertidumbre y advertencias.'],
    ],
    pipelineTitle: 'Flujo de uso',
    pipeline: [
      {
        title: '1. Generar o importar señal',
        text: 'En la Parte 1, PRISMA 3 usa EEG simulado para probar la arquitectura sin hardware. En una fase posterior, esta entrada puede sustituirse por Muse, OpenBCI, LSL, CSV, EDF, MAT u otros formatos EEG reales.',
      },
      {
        title: '2. Extraer features',
        text: 'La señal se convierte en métricas: potencia relativa delta/theta/alpha/beta/gamma, theta/alpha, beta/alpha, entropía espectral, Hjorth, RMS, artifact score y signal quality index.',
      },
      {
        title: '3. Construir baseline personal',
        text: 'Cada usuario tiene su propia línea base. PRISMA 3 no compara directamente una persona con otra: compara el estado actual de una persona con su propio patrón histórico.',
      },
      {
        title: '4. Normalizar por usuario',
        text: 'Las features se transforman en desviaciones personales, como z-scores intrasujeto. Esto permite reducir el efecto de variabilidad interindividual.',
      },
      {
        title: '5. Entrenar y evaluar modelos',
        text: 'El sistema compara modelos globales crudos, modelos normalizados por usuario y modelos personalizados. La evaluación principal es LOSO: Leave-One-Subject-Out.',
      },
      {
        title: '6. Explicar, no diagnosticar',
        text: 'Las salidas explican qué features cambiaron respecto al baseline y con qué confianza. No diagnostican enfermedades ni afirman estados clínicos.',
      },
    ],
    resultsTitle: 'Resultados sintéticos iniciales',
    resultsIntro:
      'Los resultados actuales son sintéticos: prueban la ingeniería y la arquitectura, no rendimiento clínico. La demo compara tres enfoques sobre usuarios simulados con firmas distintas.',
    results: [
      ['Modelo global con features crudas', '76.7%', 'El modelo intenta aprender un patrón común para todos. Funciona, pero sufre por diferencias entre usuarios.'],
      ['Modelo global normalizado por usuario', '94.4%', 'La normalización intrasujeto produce el mayor salto. Apoya la idea de que la baseline personal reduce variabilidad interindividual.'],
      ['Modelo personalizado por usuario', '96.1%', 'El modelo individual añade una mejora extra. No prueba EEG real todavía, pero sí demuestra la lógica del enfoque.'],
    ],
    figuresTitle: 'Cómo leer las figuras',
    figures: [
      {
        file: '/prisma3/user_variability_comparison.png',
        title: 'user_variability_comparison.png',
        text:
          'Es la figura clave. Muestra que una misma etiqueta simulada puede expresarse con perfiles espectrales diferentes según el usuario. Lectura correcta: los umbrales universales son insuficientes; hace falta baseline individual.',
      },
      {
        file: '/prisma3/confusion_matrix.png',
        title: 'confusion_matrix.png',
        text:
          'Muestra aciertos y confusiones del modelo. Una diagonal fuerte indica buena clasificación sintética. Si aparecen errores fuera de la diagonal, muestran qué estados se confunden.',
      },
      {
        file: '/prisma3/bandpower_over_time.png',
        title: 'bandpower_over_time.png',
        text:
          'Muestra cómo cambian las bandas EEG simuladas en el tiempo. Sirve para visualizar transiciones entre estados y comprobar que el simulador genera señales coherentes.',
      },
      {
        file: '/prisma3/baseline_deviation.png',
        title: 'baseline_deviation.png',
        text:
          'Muestra cuánto se aleja una sesión del baseline personal. No significa enfermedad ni mejora clínica: solo mide desviación respecto al patrón individual.',
      },
      {
        file: '/prisma3/personal_clusters.png',
        title: 'personal_clusters.png',
        text:
          'Visualiza clusters personales mediante reducción dimensional. Sirve para ver si los estados simulados se agrupan, pero no debe interpretarse como prueba clínica.',
      },
    ],
    codeTitle: 'Qué hace cada parte del código',
    codeModules: [
      ['eeg_simulator.py', 'Genera EEG sintético con bandas delta/theta/alpha/beta/gamma, ruido, artefactos de parpadeo, músculo, drift y diferencias por usuario.'],
      ['feature_extraction.py', 'Convierte la señal en features numéricas: bandpower, ratios, entropía, Hjorth, calidad de señal y artefactos.'],
      ['baseline_engine.py', 'Construye la línea base individual y calcula desviaciones personales. Es una pieza central para la variabilidad interindividual.'],
      ['individual_translator.py', 'Implementa el traductor individual: normalización por sujeto, umbrales adaptativos, confianza, incertidumbre y explicación.'],
      ['ml/', 'Entrena, evalúa y compara modelos globales, normalizados y personalizados. Usa evaluación LOSO para evitar conclusiones tramposas.'],
      ['exercise_engine.py', 'Define ejercicios simulados como Alpha Calm, Focus Beta, Theta Imagery, Noise Control y Baseline Builder.'],
      ['theory/', 'Mapea la Teoría del Todo Dual a variables computables: Is, A, E, Mp, Tb y Sp.'],
      ['reports/', 'Genera informes legibles para explicar resultados, límites y próximos pasos.'],
    ],
    guideTitle: 'Guía de interpretación',
    guide: [
      {
        title: 'Qué prueban estos resultados',
        text:
          'Prueban que, en datos sintéticos, normalizar por sujeto y usar baseline individual puede mejorar mucho la clasificación entre estados simulados. También prueban que la arquitectura es ejecutable y revisable.',
      },
      {
        title: 'Qué NO prueban',
        text:
          'No prueban diagnóstico, no prueban lectura mental, no prueban rendimiento clínico, no prueban que PRISMA 3 funcione igual en EEG real y no miden CB1/CB2 ni neurotransmisores.',
      },
      {
        title: 'Cómo debe leerse el accuracy',
        text:
          'El accuracy actual pertenece a una demo sintética. Sirve para validar el flujo de software. La validación real requerirá EEG real, sujetos reales, repetición entre sesiones y comparación contra baselines publicados.',
      },
      {
        title: 'Qué significa LOSO',
        text:
          'Leave-One-Subject-Out: entrenar con algunos sujetos y probar en un sujeto no visto. Es más honesto que mezclar ventanas de todos los usuarios, porque mide generalización entre individuos.',
      },
      {
        title: 'Qué significa baseline personal',
        text:
          'La señal actual se interpreta como desviación respecto al propio historial del usuario. Esto evita imponer umbrales universales rígidos.',
      },
    ],
    limitsTitle: 'Límites científicos',
    limits: [
      'PRISMA 3 no es un dispositivo médico.',
      'PRISMA 3 no diagnostica enfermedades.',
      'PRISMA 3 no mide neurotransmisores, receptores CB1/CB2 ni sistema endocannabinoide de forma directa.',
      'Los resultados actuales son sintéticos y sirven para probar arquitectura, no eficacia clínica.',
      'Cualquier uso con EEG real requiere validación, consentimiento, documentación y revisión externa.',
    ],
    nextTitle: 'Siguientes pasos',
    next: [
      'Convertir los ejercicios simulados en ejercicios interactivos dentro de la UI.',
      'Añadir importación CSV desde la interfaz.',
      'Preparar conexión LSL para Muse/OpenBCI.',
      'Usar datos EEG reales y repetir evaluación LOSO.',
      'Comparar test-retest entre sesiones.',
      'Publicar reportes reproducibles y límites metodológicos.',
    ],
  },
  en: {
    eyebrow: 'Scientific article / Rogex Laboratories',
    title: 'PRISMA 3: an individual neuroinformational translator for inter-individual variability.',
    subtitle:
      'PRISMA 3 does not search for a universal brain pattern. It learns the neurophysiological language of each individual.',
    date: 'July 2026',
    author: 'Roger Navarro · Rogex Laboratories',
    abstractTitle: 'Abstract',
    abstract:
      'PRISMA 3 is an experimental neuroinformational software platform designed to study one concrete hypothesis: inter-individual variability should not be treated as noise to erase, but as a central part of each person’s biological translator. The system uses simulated EEG, feature extraction, individual baseline, within-subject normalization, machine learning and explainable reports to test an architecture that can later connect to real EEG. It is not diagnostic, not a medical device and does not measure neurotransmitters or receptors. It is an experimental research base.',
    thesisTitle: 'Central thesis',
    thesis:
      'The same mental task does not produce exactly the same EEG signature in every person. A universal model can fail because it interprets everyone through the same template. PRISMA 3 proposes a different approach: first build an individual baseline, then interpret each signal as a deviation from the user’s own pattern.',
    formulaTitle: 'Dual Theory of Everything translated into software',
    formula: 'Sp = Tb(Is, A, E, Mp)',
    mapping: [
      ['Is', 'Surviving information', 'available EEG features: bandpower, ratios, entropy, Hjorth, signal quality.'],
      ['A', 'Absence / uncertainty', 'noise, artifacts, missing data, low signal quality, model uncertainty.'],
      ['E', 'State/context', 'task, exercise, reported emotion, breathing, fatigue, sleep or experimental priming.'],
      ['Mp', 'Personal memory', 'individual baseline, session history, personal variance, response to tasks.'],
      ['Tb', 'Individual biological translator', 'engine that normalizes by subject, estimates confidence and explains personal deviations.'],
      ['Sp', 'Estimated state', 'interpretable output: probable state, confidence, uncertainty and warnings.'],
    ],
    pipelineTitle: 'Usage flow',
    pipeline: [
      {
        title: '1. Generate or import signal',
        text: 'In Part 1, PRISMA 3 uses simulated EEG to test the architecture without hardware. Later this input can be replaced by Muse, OpenBCI, LSL, CSV, EDF, MAT or other real EEG formats.',
      },
      {
        title: '2. Extract features',
        text: 'The signal is converted into metrics: relative delta/theta/alpha/beta/gamma power, theta/alpha, beta/alpha, spectral entropy, Hjorth, RMS, artifact score and signal quality index.',
      },
      {
        title: '3. Build personal baseline',
        text: 'Each user has their own baseline. PRISMA 3 does not directly compare one person with another: it compares the current state of a person with their own historical pattern.',
      },
      {
        title: '4. Normalize by user',
        text: 'Features are transformed into personal deviations, such as within-subject z-scores. This helps reduce the effect of inter-individual variability.',
      },
      {
        title: '5. Train and evaluate models',
        text: 'The system compares raw global models, user-normalized models and personalized models. The main evaluation is LOSO: Leave-One-Subject-Out.',
      },
      {
        title: '6. Explain, do not diagnose',
        text: 'Outputs explain which features changed from baseline and with what confidence. They do not diagnose disease or claim clinical states.',
      },
    ],
    resultsTitle: 'Initial synthetic results',
    resultsIntro:
      'Current results are synthetic: they test engineering and architecture, not clinical performance. The demo compares three approaches over simulated users with different signatures.',
    results: [
      ['Global model with raw features', '76.7%', 'The model tries to learn one common pattern for everyone. It works, but suffers from user differences.'],
      ['Global model normalized by user', '94.4%', 'Within-subject normalization produces the largest jump. It supports the idea that personal baseline reduces inter-individual variability.'],
      ['Personalized model by user', '96.1%', 'The individual model adds an extra gain. It does not prove real EEG performance yet, but demonstrates the logic of the approach.'],
    ],
    figuresTitle: 'How to read the figures',
    figures: [
      {
        file: '/prisma3/user_variability_comparison.png',
        title: 'user_variability_comparison.png',
        text:
          'The key figure. It shows that the same simulated label can be expressed through different spectral profiles depending on the user. Correct reading: universal thresholds are insufficient; individual baseline is required.',
      },
      {
        file: '/prisma3/confusion_matrix.png',
        title: 'confusion_matrix.png',
        text:
          'Shows model hits and confusions. A strong diagonal means good synthetic classification. Errors outside the diagonal show which states get confused.',
      },
      {
        file: '/prisma3/bandpower_over_time.png',
        title: 'bandpower_over_time.png',
        text:
          'Shows how simulated EEG bands change over time. It helps visualize transitions between states and check that the simulator produces coherent signals.',
      },
      {
        file: '/prisma3/baseline_deviation.png',
        title: 'baseline_deviation.png',
        text:
          'Shows how far a session moves away from personal baseline. It does not mean disease or clinical improvement: it only measures deviation from the individual pattern.',
      },
      {
        file: '/prisma3/personal_clusters.png',
        title: 'personal_clusters.png',
        text:
          'Visualizes personal clusters through dimensionality reduction. It helps inspect whether simulated states group together, but must not be interpreted as clinical proof.',
      },
    ],
    codeTitle: 'What each code part does',
    codeModules: [
      ['eeg_simulator.py', 'Generates synthetic EEG with delta/theta/alpha/beta/gamma bands, noise, blink artifacts, muscle artifacts, drift and user differences.'],
      ['feature_extraction.py', 'Converts the signal into numerical features: bandpower, ratios, entropy, Hjorth, signal quality and artifacts.'],
      ['baseline_engine.py', 'Builds the individual baseline and calculates personal deviations. This is central for inter-individual variability.'],
      ['individual_translator.py', 'Implements the individual translator: subject normalization, adaptive thresholds, confidence, uncertainty and explanation.'],
      ['ml/', 'Trains, evaluates and compares global, normalized and personalized models. Uses LOSO evaluation to avoid misleading conclusions.'],
      ['exercise_engine.py', 'Defines simulated exercises such as Alpha Calm, Focus Beta, Theta Imagery, Noise Control and Baseline Builder.'],
      ['theory/', 'Maps the Dual Theory into computable variables: Is, A, E, Mp, Tb and Sp.'],
      ['reports/', 'Generates readable reports to explain results, limitations and next steps.'],
    ],
    guideTitle: 'Interpretation guide',
    guide: [
      {
        title: 'What these results prove',
        text:
          'They show that, in synthetic data, subject normalization and individual baseline can greatly improve classification between simulated states. They also show the architecture is executable and reviewable.',
      },
      {
        title: 'What they do NOT prove',
        text:
          'They do not prove diagnosis, mind reading, clinical performance, equal performance on real EEG, or measurement of CB1/CB2 or neurotransmitters.',
      },
      {
        title: 'How accuracy should be read',
        text:
          'Current accuracy belongs to a synthetic demo. It validates the software flow. Real validation will require real EEG, real subjects, session repetition and comparison against published baselines.',
      },
      {
        title: 'What LOSO means',
        text:
          'Leave-One-Subject-Out: train on some subjects and test on an unseen subject. It is more honest than mixing windows from all users because it measures cross-individual generalization.',
      },
      {
        title: 'What personal baseline means',
        text:
          'The current signal is interpreted as deviation from the user’s own history. This avoids imposing rigid universal thresholds.',
      },
    ],
    limitsTitle: 'Scientific limits',
    limits: [
      'PRISMA 3 is not a medical device.',
      'PRISMA 3 does not diagnose disease.',
      'PRISMA 3 does not directly measure neurotransmitters, CB1/CB2 receptors or the endocannabinoid system.',
      'Current results are synthetic and test architecture, not clinical efficacy.',
      'Any real EEG usage requires validation, consent, documentation and external review.',
    ],
    nextTitle: 'Next steps',
    next: [
      'Turn simulated exercises into interactive UI exercises.',
      'Add CSV import from the interface.',
      'Prepare LSL connection for Muse/OpenBCI.',
      'Use real EEG data and repeat LOSO evaluation.',
      'Compare test-retest across sessions.',
      'Publish reproducible reports and methodological limits.',
    ],
  },
};

function Prisma3ArticlePage({ lang }) {
  const data = prisma3Article[lang] || prisma3Article.es;

  return (
    <>
      <section className="prisma3-hero">
        <div className="section-kicker">{data.eyebrow}</div>
        <h1>{data.title}</h1>
        <p className="prisma3-subtitle">{data.subtitle}</p>
        <div className="prisma3-meta">
          <span>{data.author}</span>
          <span>{data.date}</span>
        </div>
      </section>

      <article className="prisma3-article">
        <section className="prisma3-paper-section">
          <div className="section-kicker">{data.abstractTitle}</div>
          <p className="paper-lead">{data.abstract}</p>
        </section>

        <section className="prisma3-paper-section prisma3-thesis">
          <h2>{data.thesisTitle}</h2>
          <p>{data.thesis}</p>
        </section>

        <section className="prisma3-paper-section">
          <div className="section-kicker">{data.formulaTitle}</div>
          <div className="prisma3-formula">{data.formula}</div>
          <div className="mapping-table">
            {data.mapping.map(([symbol, label, explanation]) => (
              <div className="mapping-row" key={symbol}>
                <strong>{symbol}</strong>
                <span>{label}</span>
                <p>{explanation}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prisma3-paper-section">
          <h2>{data.pipelineTitle}</h2>
          <div className="prisma3-grid">
            {data.pipeline.map((item) => (
              <div className="prisma3-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prisma3-paper-section">
          <h2>{data.resultsTitle}</h2>
          <p>{data.resultsIntro}</p>
          <div className="results-table">
            {data.results.map(([model, value, note]) => (
              <div className="results-row" key={model}>
                <strong>{model}</strong>
                <span>{value}</span>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prisma3-paper-section">
          <h2>{data.figuresTitle}</h2>
          <div className="figure-list">
            {data.figures.map((figure) => (
              <figure className="prisma3-figure" key={figure.title}>
                <img src={figure.file} alt={figure.title} loading="lazy" />
                <figcaption>
                  <strong>{figure.title}</strong>
                  <span>{figure.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="prisma3-paper-section">
          <h2>{data.codeTitle}</h2>
          <div className="code-table">
            {data.codeModules.map(([module, explanation]) => (
              <div className="code-row" key={module}>
                <code>{module}</code>
                <p>{explanation}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prisma3-paper-section">
          <h2>{data.guideTitle}</h2>
          <div className="prisma3-grid">
            {data.guide.map((item) => (
              <div className="prisma3-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prisma3-paper-section prisma3-limits">
          <h2>{data.limitsTitle}</h2>
          <ul>
            {data.limits.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
        </section>

        <section className="prisma3-paper-section">
          <h2>{data.nextTitle}</h2>
          <ol className="prisma3-next">
            {data.next.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </article>
    </>
  );
}



const prisma4Article = {
  es: {
    eyebrow: 'Artículo científico / Rogex Laboratories',
    title: 'PRISMA 4: baseline dinámico y adaptación a la variabilidad neurofisiológica real.',
    subtitle: 'PRISMA 3 demuestra la arquitectura. PRISMA 4 debe demostrar adaptación al mundo real.',
    date: 'Julio 2026',
    author: 'Roger Navarro · Rogex Laboratories',
    abstractTitle: 'Resumen',
    abstract: 'PRISMA 4 es la evolución experimental propuesta después de PRISMA 3. Si PRISMA 3 demuestra que la normalización individual puede reducir variabilidad interindividual en datos sintéticos, PRISMA 4 busca estudiar una fase más difícil: variabilidad real entre días, fatiga, respiración, emoción no etiquetada, cambios de postura, calidad de electrodos, drift fisiológico y adaptación dinámica del baseline. No es diagnóstico, no es dispositivo médico y no pretende leer la mente. Es una línea de investigación para convertir una teoría neuroinformacional en arquitectura experimental verificable.',
    thesisTitle: 'Tesis central',
    thesis: 'PRISMA 3 aprende el idioma neurofisiológico de cada individuo. PRISMA 4 debe aprender cómo ese idioma cambia con el tiempo, el cuerpo, el contexto y la calidad de señal.',
    relationTitle: 'De PRISMA 3 a PRISMA 4',
    relation: [
      ['PRISMA 3', 'Arquitectura individual demostrada en simulación', 'EEG simulado, baseline personal, normalización intrasujeto, machine learning, traductor individual y reportes explicables.'],
      ['PRISMA 4', 'Arquitectura adaptativa preparada para variabilidad real', 'EEG real o simulación avanzada, baseline dinámico, drift entre sesiones, filtros adaptativos, test-retest y validación con datos reales.'],
    ],
    formulaTitle: 'Modelo conceptual',
    formula: 'Sp = Tb(Is, A, E, Mp, T)',
    formulaText: 'PRISMA 4 añade T: tiempo. El estado estimado no depende solo de la señal actual, sino de cómo cambia el usuario entre sesiones, días, estados corporales y condiciones de medida.',
    mapping: [
      ['Is', 'Información sobreviviente', 'Features EEG reales o simuladas que sobreviven a ruido, artefactos y filtrado.'],
      ['A', 'Ausencia / incertidumbre', 'Información incompleta, mala calidad de señal, artefactos, drift, baja confianza y ruido instrumental.'],
      ['E', 'Estado/contexto', 'Respiración, fatiga, emoción, postura, hora del día, tarea, atención o estado no etiquetado.'],
      ['Mp', 'Memoria personal', 'Baseline histórico, sesiones recientes, variabilidad propia y respuesta individual a tareas.'],
      ['T', 'Tiempo', 'Cambios entre días, sesiones, ciclos de fatiga, drift fisiológico y evolución del usuario.'],
      ['Tb', 'Traductor individual adaptativo', 'Motor que interpreta la señal usando baseline dinámico, calidad de señal y contexto temporal.'],
    ],
    architectureTitle: 'Arquitectura propuesta',
    architecture: [
      ['1. EEG real o simulador avanzado', 'La entrada puede venir de EEG real o de un simulador que represente variabilidad entre días, fatiga, respiración, impedancia y drift fisiológico.'],
      ['2. Signal Quality Engine', 'Evalúa si la señal es usable. Detecta artefactos, mala impedancia, ruido muscular, parpadeos, drift y baja estabilidad.'],
      ['3. Artifact and Physiology Separator', 'Intenta separar ruido instrumental, artefactos corporales y cambios fisiológicos lentos para evitar falsas interpretaciones.'],
      ['4. Dynamic Baseline Engine', 'Actualiza el baseline de forma prudente usando historial, sesiones recientes, estabilidad y calidad de señal.'],
      ['5. Individual Translator Engine v2', 'Interpreta desviaciones personales en vez de aplicar umbrales universales rígidos.'],
      ['6. Adaptive ML', 'Compara modelo global, baseline estático, baseline dinámico y personalización adaptativa.'],
      ['7. Explainable State Estimate', 'Devuelve estado probable, confianza, incertidumbre, razones principales y límites de interpretación.'],
    ],
    dynamicTitle: 'Baseline dinámico',
    dynamicFormula: 'baseline_dynamic = weighted(historical_baseline, recent_sessions, current_stability, signal_quality, context)',
    dynamicText: 'El baseline no debe actualizarse siempre. PRISMA 4 debe evitar actualizarlo cuando hay baja calidad de señal, exceso de artefactos, drift fuerte, estado extremo o confianza baja. El objetivo no es perseguir cualquier cambio, sino distinguir cambio real, ruido y variabilidad temporal.',
    variabilityTitle: 'Variabilidad que PRISMA 4 debe simular o aprender',
    variability: [
      'Variabilidad fisiológica entre días.',
      'Fatiga progresiva dentro de una sesión.',
      'Respiración irregular y cambios autonómicos.',
      'Fluctuaciones emocionales no etiquetadas.',
      'Microtransiciones internas de atención.',
      'Cambios de impedancia de electrodos.',
      'Variabilidad por postura, hidratación, temperatura y hora del día.',
      'Drift fisiológico no lineal.',
      'Mala calidad de señal y artefactos dinámicos.',
    ],
    modulesTitle: 'Módulos técnicos propuestos',
    modules: [
      ['dynamic_baseline.py', 'Crea y actualiza baselines dinámicos con reglas de confianza.'],
      ['session_drift.py', 'Mide cambios entre sesiones y detecta drift temporal.'],
      ['impedance_simulator.py', 'Simula degradación por mala impedancia o contacto irregular.'],
      ['fatigue_model.py', 'Modela fatiga progresiva y cambios lentos de banda.'],
      ['respiration_model.py', 'Introduce modulación respiratoria y cambios autonómicos.'],
      ['adaptive_filters.py', 'Aplica filtros que cambian según calidad de señal y tipo de artefacto.'],
      ['test_retest_evaluation.py', 'Evalúa estabilidad del mismo usuario en distintos días.'],
      ['real_eeg_importer.py', 'Importa CSV, EDF, MAT, FIF u otros formatos de EEG real.'],
      ['lsl_stream.py', 'Prepara entrada en tiempo real para Muse, OpenBCI u otros dispositivos vía LSL.'],
      ['calibration_protocols.py', 'Define protocolos de calibración por tarea, sesión y usuario.'],
    ],
    validationTitle: 'Plan de validación',
    validation: [
      ['Test-retest', 'El mismo usuario repite la misma tarea en días distintos. Se mide si PRISMA reconoce el patrón pese a cambios fisiológicos.'],
      ['Comparación de modelos', 'raw_global < static_baseline < dynamic_baseline < personalized_adaptive. Esta progresión sería la señal de que el baseline dinámico aporta valor.'],
      ['Datos reales', 'La validación debe incluir EEG real, sujetos reales, sesiones repetidas, control de calidad y revisión externa.'],
      ['Métricas', 'accuracy, f1, estabilidad intrasujeto, drift entre sesiones, signal quality, uncertainty, personalization gain y dynamic baseline gain.'],
    ],
    interpretationTitle: 'Cómo interpretar PRISMA 4',
    interpretation: [
      ['Lectura correcta', 'PRISMA 4 propone una arquitectura para estudiar adaptación temporal e individual en señales EEG. Busca separar variabilidad útil, ruido y contexto.'],
      ['Lectura incorrecta', 'No debe leerse como diagnóstico, medicina, lectura mental, medición directa de neurotransmisores o prueba clínica.'],
      ['Objetivo científico', 'Medir si un traductor individual con baseline dinámico generaliza mejor que un baseline estático cuando aparece variabilidad real.'],
    ],
    limitsTitle: 'Límites científicos',
    limits: [
      'PRISMA 4 no es un dispositivo médico.',
      'PRISMA 4 no diagnostica enfermedades.',
      'PRISMA 4 no mide CB1, CB2 ni neurotransmisores de forma directa.',
      'PRISMA 4 no lee pensamientos.',
      'La teoría guía la arquitectura, pero debe ser probada con datos reales.',
      'Cualquier resultado debe mostrar incertidumbre, calidad de señal y límites metodológicos.',
    ],
    nextTitle: 'Siguientes pasos',
    next: [
      'Construir un prototipo de Dynamic Baseline Engine.',
      'Crear simulador avanzado de variabilidad entre días.',
      'Añadir importación EEG real desde CSV/EDF/MAT/FIF.',
      'Preparar LSL para Muse/OpenBCI.',
      'Diseñar protocolos de test-retest.',
      'Comparar baseline estático contra baseline dinámico.',
      'Publicar reportes reproducibles con límites científicos claros.',
    ],
  },
  en: {
    eyebrow: 'Scientific article / Rogex Laboratories',
    title: 'PRISMA 4: dynamic baseline and adaptation to real neurophysiological variability.',
    subtitle: 'PRISMA 3 demonstrates the architecture. PRISMA 4 must demonstrate adaptation to the real world.',
    date: 'July 2026',
    author: 'Roger Navarro · Rogex Laboratories',
    abstractTitle: 'Abstract',
    abstract: 'PRISMA 4 is the proposed experimental evolution after PRISMA 3. If PRISMA 3 shows that individual normalization can reduce inter-individual variability in synthetic data, PRISMA 4 studies a harder phase: real day-to-day variability, fatigue, breathing, unlabeled emotion, posture changes, electrode quality, physiological drift and dynamic baseline adaptation. It is not diagnostic, not a medical device and does not attempt to read minds. It is a research line for turning a neuroinformational theory into a verifiable experimental architecture.',
    thesisTitle: 'Central thesis',
    thesis: 'PRISMA 3 learns the neurophysiological language of each individual. PRISMA 4 must learn how that language changes with time, body state, context and signal quality.',
    relationTitle: 'From PRISMA 3 to PRISMA 4',
    relation: [
      ['PRISMA 3', 'Individual architecture demonstrated in simulation', 'Simulated EEG, personal baseline, within-subject normalization, machine learning, individual translator and explainable reports.'],
      ['PRISMA 4', 'Adaptive architecture prepared for real variability', 'Real EEG or advanced simulation, dynamic baseline, session drift, adaptive filters, test-retest and validation with real data.'],
    ],
    formulaTitle: 'Conceptual model',
    formula: 'Sp = Tb(Is, A, E, Mp, T)',
    formulaText: 'PRISMA 4 adds T: time. The estimated state depends not only on the current signal, but on how the user changes across sessions, days, body states and measurement conditions.',
    mapping: [
      ['Is', 'Surviving information', 'Real or simulated EEG features that survive noise, artifacts and filtering.'],
      ['A', 'Absence / uncertainty', 'Incomplete information, low signal quality, artifacts, drift, low confidence and instrumental noise.'],
      ['E', 'State/context', 'Breathing, fatigue, emotion, posture, time of day, task, attention or unlabeled state.'],
      ['Mp', 'Personal memory', 'Historical baseline, recent sessions, personal variability and individual task response.'],
      ['T', 'Time', 'Day-to-day changes, sessions, fatigue cycles, physiological drift and user evolution.'],
      ['Tb', 'Adaptive individual translator', 'Engine that interprets the signal using dynamic baseline, signal quality and temporal context.'],
    ],
    architectureTitle: 'Proposed architecture',
    architecture: [
      ['1. Real EEG or advanced simulator', 'Input can come from real EEG or from a simulator representing day-to-day variability, fatigue, breathing, impedance and physiological drift.'],
      ['2. Signal Quality Engine', 'Evaluates whether the signal is usable. Detects artifacts, bad impedance, muscle noise, blinks, drift and low stability.'],
      ['3. Artifact and Physiology Separator', 'Attempts to separate instrumental noise, body artifacts and slow physiological changes to avoid false interpretations.'],
      ['4. Dynamic Baseline Engine', 'Updates baseline carefully using history, recent sessions, stability and signal quality.'],
      ['5. Individual Translator Engine v2', 'Interprets personal deviations instead of applying rigid universal thresholds.'],
      ['6. Adaptive ML', 'Compares global model, static baseline, dynamic baseline and adaptive personalization.'],
      ['7. Explainable State Estimate', 'Returns probable state, confidence, uncertainty, main reasons and interpretation limits.'],
    ],
    dynamicTitle: 'Dynamic baseline',
    dynamicFormula: 'baseline_dynamic = weighted(historical_baseline, recent_sessions, current_stability, signal_quality, context)',
    dynamicText: 'The baseline should not always update. PRISMA 4 should avoid updating it when signal quality is low, artifacts are high, drift is strong, the state is extreme or confidence is low. The goal is not to chase every change, but to distinguish real change, noise and temporal variability.',
    variabilityTitle: 'Variability PRISMA 4 must simulate or learn',
    variability: [
      'Day-to-day physiological variability.',
      'Progressive fatigue within a session.',
      'Irregular breathing and autonomic changes.',
      'Unlabeled emotional fluctuations.',
      'Internal micro-transitions of attention.',
      'Electrode impedance changes.',
      'Posture, hydration, temperature and time-of-day variability.',
      'Non-linear physiological drift.',
      'Low signal quality and dynamic artifacts.',
    ],
    modulesTitle: 'Proposed technical modules',
    modules: [
      ['dynamic_baseline.py', 'Creates and updates dynamic baselines with confidence rules.'],
      ['session_drift.py', 'Measures session-to-session change and detects temporal drift.'],
      ['impedance_simulator.py', 'Simulates degradation from bad impedance or unstable contact.'],
      ['fatigue_model.py', 'Models progressive fatigue and slow band changes.'],
      ['respiration_model.py', 'Introduces respiratory modulation and autonomic changes.'],
      ['adaptive_filters.py', 'Applies filters that change depending on signal quality and artifact type.'],
      ['test_retest_evaluation.py', 'Evaluates same-user stability across different days.'],
      ['real_eeg_importer.py', 'Imports CSV, EDF, MAT, FIF or other real EEG formats.'],
      ['lsl_stream.py', 'Prepares real-time input for Muse, OpenBCI or other devices through LSL.'],
      ['calibration_protocols.py', 'Defines calibration protocols by task, session and user.'],
    ],
    validationTitle: 'Validation plan',
    validation: [
      ['Test-retest', 'The same user repeats the same task across days. PRISMA measures whether it recognizes the pattern despite physiological changes.'],
      ['Model comparison', 'raw_global < static_baseline < dynamic_baseline < personalized_adaptive. This progression would indicate that dynamic baseline adds value.'],
      ['Real data', 'Validation must include real EEG, real subjects, repeated sessions, quality control and external review.'],
      ['Metrics', 'accuracy, f1, within-subject stability, session drift, signal quality, uncertainty, personalization gain and dynamic baseline gain.'],
    ],
    interpretationTitle: 'How to interpret PRISMA 4',
    interpretation: [
      ['Correct reading', 'PRISMA 4 proposes an architecture to study temporal and individual adaptation in EEG signals. It tries to separate useful variability, noise and context.'],
      ['Incorrect reading', 'It must not be read as diagnosis, medicine, mind reading, direct neurotransmitter measurement or clinical proof.'],
      ['Scientific goal', 'Measure whether an individual translator with dynamic baseline generalizes better than a static baseline when real variability appears.'],
    ],
    limitsTitle: 'Scientific limits',
    limits: [
      'PRISMA 4 is not a medical device.',
      'PRISMA 4 does not diagnose disease.',
      'PRISMA 4 does not directly measure CB1, CB2 or neurotransmitters.',
      'PRISMA 4 does not read thoughts.',
      'The theory guides the architecture, but must be tested with real data.',
      'Every result must show uncertainty, signal quality and methodological limits.',
    ],
    nextTitle: 'Next steps',
    next: [
      'Build a Dynamic Baseline Engine prototype.',
      'Create an advanced simulator for day-to-day variability.',
      'Add real EEG import from CSV/EDF/MAT/FIF.',
      'Prepare LSL for Muse/OpenBCI.',
      'Design test-retest protocols.',
      'Compare static baseline against dynamic baseline.',
      'Publish reproducible reports with clear scientific limits.',
    ],
  },
};

function Prisma4ArticlePage({ lang }) {
  const data = prisma4Article[lang] || prisma4Article.es;

  const renderPairs = (items) => (
    <div className="prisma4-pair-table">
      {items.map(([title, label, text]) => (
        <div className="prisma4-pair-row" key={title}>
          <strong>{title}</strong>
          <span>{label}</span>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );

  const renderCards = (items) => (
    <div className="prisma4-grid">
      {items.map(([title, text]) => (
        <div className="prisma4-card" key={title}>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section className="prisma4-hero">
        <div className="section-kicker">{data.eyebrow}</div>
        <h1>{data.title}</h1>
        <p className="prisma4-subtitle">{data.subtitle}</p>
        <div className="prisma4-meta">
          <span>{data.author}</span>
          <span>{data.date}</span>
        </div>
      </section>

      <article className="prisma4-article">
        <section className="prisma4-section">
          <div className="section-kicker">{data.abstractTitle}</div>
          <p className="prisma4-lead">{data.abstract}</p>
        </section>

        <section className="prisma4-section prisma4-thesis">
          <h2>{data.thesisTitle}</h2>
          <p>{data.thesis}</p>
        </section>

        <section className="prisma4-section">
          <h2>{data.relationTitle}</h2>
          {renderPairs(data.relation)}
        </section>

        <section className="prisma4-section">
          <div className="section-kicker">{data.formulaTitle}</div>
          <div className="prisma4-formula">{data.formula}</div>
          <p>{data.formulaText}</p>
          {renderPairs(data.mapping)}
        </section>

        <section className="prisma4-section">
          <h2>{data.architectureTitle}</h2>
          {renderCards(data.architecture)}
        </section>

        <section className="prisma4-section">
          <h2>{data.dynamicTitle}</h2>
          <div className="prisma4-formula small">{data.dynamicFormula}</div>
          <p>{data.dynamicText}</p>
        </section>

        <section className="prisma4-section">
          <h2>{data.variabilityTitle}</h2>
          <ul className="prisma4-list">
            {data.variability.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="prisma4-section">
          <h2>{data.modulesTitle}</h2>
          {renderCards(data.modules)}
        </section>

        <section className="prisma4-section">
          <h2>{data.validationTitle}</h2>
          {renderCards(data.validation)}
        </section>

        <section className="prisma4-section">
          <h2>{data.interpretationTitle}</h2>
          {renderCards(data.interpretation)}
        </section>

        <section className="prisma4-section prisma4-limits">
          <h2>{data.limitsTitle}</h2>
          <ul>
            {data.limits.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
        </section>

        <section className="prisma4-section">
          <h2>{data.nextTitle}</h2>
          <ol className="prisma4-next">
            {data.next.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </article>
    </>
  );
}



const carouselSets = {
  home: [
    '/carousel/prisma-signal-01.svg',
    '/carousel/prisma-signal-02.svg',
    '/carousel/prisma-signal-03.svg',
  ],
  research: [
    '/carousel/research-01.svg',
    '/carousel/research-02.svg',
    '/carousel/research-03.svg',
  ],
  prisma: [
    '/carousel/prisma-signal-01.svg',
    '/carousel/prisma-signal-02.svg',
    '/carousel/prisma-signal-03.svg',
  ],
  methods: [
    '/carousel/methods-01.svg',
    '/carousel/methods-02.svg',
    '/carousel/methods-03.svg',
  ],
  collaborations: [
    '/carousel/research-02.svg',
    '/carousel/prisma-signal-03.svg',
    '/carousel/methods-01.svg',
  ],
  advances: [
    '/carousel/prisma-signal-03.svg',
    '/carousel/research-01.svg',
    '/carousel/methods-02.svg',
  ],
  notes: [
    '/carousel/methods-03.svg',
    '/carousel/research-03.svg',
    '/carousel/prisma-signal-02.svg',
  ],
  contact: [
    '/carousel/research-02.svg',
    '/carousel/methods-02.svg',
    '/carousel/prisma-signal-01.svg',
  ],
  prisma3: [
    '/carousel/prisma-signal-01.svg',
    '/carousel/research-01.svg',
    '/carousel/methods-01.svg',
  ],
  prisma4: [
    '/carousel/prisma-signal-02.svg',
    '/carousel/prisma-signal-03.svg',
    '/carousel/research-03.svg',
  ],
};

function inferCarouselSet(eyebrow = '', title = '') {
  const text = `${eyebrow} ${title}`.toLowerCase();

  if (text.includes('prisma 4')) return 'prisma4';
  if (text.includes('prisma 3')) return 'prisma3';
  if (text.includes('prisma')) return 'prisma';
  if (text.includes('método') || text.includes('method')) return 'methods';
  if (text.includes('colabor') || text.includes('collab')) return 'collaborations';
  if (text.includes('avance') || text.includes('progress')) return 'advances';
  if (text.includes('nota') || text.includes('note')) return 'notes';
  if (text.includes('contact')) return 'contact';
  if (text.includes('research') || text.includes('investig')) return 'research';

  return 'home';
}

function BlendCarousel({ setName = 'home', label = 'Rogex visual carousel' }) {
  const images = carouselSets[setName] || carouselSets.home;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="blend-carousel" aria-label={label}>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={index === active ? 'is-active' : ''}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}
      <div className="blend-carousel__grain" aria-hidden="true" />
    </div>
  );
}


function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (href) => {
    window.history.pushState({}, '', href);
    setPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [path, navigate];
}

function InternalLink({ href, navigate, children, className }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function Header({ lang, setLang, navigate, t }) {
  return (
    <header className="site-header">
      <InternalLink href="/" navigate={navigate} className="brand" aria-label="Rogex Laboratories home">
        <img src={logo} alt="Rogex Laboratories logo" />
        <span>
          <strong>ROGEX</strong>
          <small>LABORATORIES</small>
        </span>
      </InternalLink>

      <div className="header-right">
        <nav className="nav" aria-label="Main navigation">
          {routes.map((route) => (
            <InternalLink key={route} href={`/${route}`} navigate={navigate}>
              {t.nav[route]}
            </InternalLink>
          ))}
        </nav>

        <button
          type="button"
          className="language-toggle"
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label="Change language"
        >
          {t.ui.language}
        </button>
      </div>
    </header>
  );
}

function BrainVisual() {
  return <BlendCarousel setName="home" label="Rogex Laboratories visual carousel" />;
}

function PageHero({ eyebrow, title, text, children, visualKey }) {
  const carouselKey = visualKey || inferCarouselSet(eyebrow, title);

  return (
    <section className="page-hero split-visual-hero">
      <div className="split-visual-copy">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>

      <BlendCarousel setName={carouselKey} label={`${title} visual carousel`} />
    </section>
  );
}) {
  return (
    <section className="page-hero section-block">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {children}
    </section>
  );
}


const researchAdvances = {
  es: {
    eyebrow: 'Avances de investigación',
    title: 'Teoría del Todo Dual: del audio ambiguo al traductor biológico.',
    intro:
      'Registro público de avances experimentales alrededor de percepción reconstructiva, degradación material de señales, emergencia simbólica y desarrollo futuro de PRISMA 2 / rogex-neuro-2.',
    statusLabel: 'Estado actual',
    status: [
      {
        title: 'Probado hasta ahora',
        text:
          'El audio original no contiene evidencia fonética robusta de “hiéreme”. Los controles y nulos se mezclan con el objetivo. El símbolo debe tratarse como reconstrucción perceptiva, no como transcripción objetiva.',
      },
      {
        title: 'Altamente posible',
        text:
          'La materia filtra el sonido, elimina detalles del habla y crea ausencia de información. Esa ausencia puede aumentar la intervención del traductor biológico: memoria, emoción, cuerpo y lenguaje.',
      },
      {
        title: 'Teorizado',
        text:
          'Información sobreviviente + ausencia + emoción + memoria pueden producir símbolo percibido. La formulación actual es: Sp = Tb(Is, A, E, Mp).',
      },
      {
        title: 'Pendiente de replicación',
        text:
          'Faltan experimentos con humanos, priming, grupos de control, escucha ciega y correlación entre inteligibilidad objetiva y símbolo reportado.',
      },
    ],
    experimentsTitle: 'Experimentos y resultados',
    experiments: [
      {
        tag: 'Experimento 01',
        title: 'Matching acústico contra controles',
        result: 'Negativo útil',
        text:
          'Las plantillas objetivo no se separaron de los nulos. Esto desplaza la hipótesis: el fenómeno no está en una palabra oculta en el audio, sino en la reconstrucción del perceptor.',
        image: '/research/distribucion_coincidencias.png',
      },
      {
        tag: 'Experimento 02',
        title: 'Curva paramétrica de inteligibilidad',
        result: 'Instrumento experimental',
        text:
          'Se generaron estímulos degradados con vocoder para estudiar cómo cambia la inteligibilidad cuando se reduce o transforma la información acústica.',
        image: '/research/stoi_curve.png',
      },
      {
        tag: 'Experimento 03',
        title: 'Escalera de degradación material',
        result: 'Traductor material',
        text:
          'Filtros tipo puerta/pared reducen la estructura útil del habla. Esto permite modelar la materia como H(f), un filtro físico de información.',
        image: '/research/qc_ladder.png',
      },
    ],
    formulaTitle: 'Formulación actual',
    formula: 'Sp = Tb(Is, A, E, Mp)',
    formulaText:
      'Símbolo percibido = traductor biológico aplicado a información sobreviviente, ausencia, emoción y memoria del perceptor.',
    nextTitle: 'Siguientes pasos',
    next: [
      'Construir experimento de escucha humana ciega.',
      'Comparar grupos sin contexto, con priming “hiéreme”, con priming “quiéreme” y con priming falso.',
      'Medir palabra reportada, confianza, emoción percibida y efecto del contexto.',
      'Publicar código reproducible para generar estímulos degradados y métricas.',
      'Separar PRISMA 2 como línea neuroinformacional experimental, sin promesas diagnósticas.',
    ],
    disclaimer:
      'Esta línea no afirma que exista una voz oculta en el audio. El resultado actual apunta a un fenómeno de reconstrucción perceptiva bajo información degradada.',
  },
  en: {
    eyebrow: 'Research progress',
    title: 'Dual Theory of Everything: from ambiguous audio to biological translation.',
    intro:
      'Public research log on reconstructive perception, material signal degradation, symbolic emergence and the future development of PRISMA 2 / rogex-neuro-2.',
    statusLabel: 'Current status',
    status: [
      {
        title: 'Confirmed so far',
        text:
          'The original audio does not contain robust phonetic evidence for “hiéreme”. Controls and nulls overlap with target templates. The symbol must be treated as perceptual reconstruction, not objective transcription.',
      },
      {
        title: 'Highly plausible',
        text:
          'Matter filters sound, removes speech detail and creates absence of information. That absence may increase the role of the biological translator: memory, emotion, body and language.',
      },
      {
        title: 'Theorized',
        text:
          'Surviving information + absence + emotion + memory may produce perceived symbol. Current formulation: Sp = Tb(Is, A, E, Mp).',
      },
      {
        title: 'Not yet replicated',
        text:
          'Human listening experiments, priming groups, blind controls and correlation between objective intelligibility and reported symbol are still required.',
      },
    ],
    experimentsTitle: 'Experiments and results',
    experiments: [
      {
        tag: 'Experiment 01',
        title: 'Acoustic matching against controls',
        result: 'Useful negative',
        text:
          'Target templates did not separate from nulls. This moves the hypothesis: the phenomenon is not a hidden word in the audio, but reconstruction inside the perceiver.',
        image: '/research/distribucion_coincidencias.png',
      },
      {
        tag: 'Experiment 02',
        title: 'Parametric intelligibility curve',
        result: 'Experimental instrument',
        text:
          'Degraded stimuli were generated with vocoder methods to study how intelligibility changes when acoustic information is reduced or transformed.',
        image: '/research/stoi_curve.png',
      },
      {
        tag: 'Experiment 03',
        title: 'Material degradation ladder',
        result: 'Material translator',
        text:
          'Door/wall-like filters reduce useful speech structure. This models matter as H(f), a physical filter of information.',
        image: '/research/qc_ladder.png',
      },
    ],
    formulaTitle: 'Current formulation',
    formula: 'Sp = Tb(Is, A, E, Mp)',
    formulaText:
      'Perceived symbol = biological translator applied to surviving information, absence, emotion and the perceiver’s memory.',
    nextTitle: 'Next steps',
    next: [
      'Build a blind human listening experiment.',
      'Compare groups with no context, “hiéreme” priming, “quiéreme” priming and false priming.',
      'Measure reported word, confidence, perceived emotion and context effect.',
      'Publish reproducible code for degraded stimulus generation and metrics.',
      'Keep PRISMA 2 as an experimental neuroinformational line, without diagnostic claims.',
    ],
    disclaimer:
      'This line does not claim there is a hidden voice in the audio. Current results point to perceptual reconstruction under degraded information.',
  },
};

function ResearchProgressPreview({ lang, navigate }) {
  const data = researchAdvances[lang] || researchAdvances.es;

  return (
    <section className="research-progress-preview">
      <div className="section-kicker">{data.eyebrow}</div>

      <div className="research-progress-header">
        <div>
          <h2>{data.title}</h2>
          <p>{data.intro}</p>
        </div>

        <a
          href="/advances"
          onClick={(event) => {
            event.preventDefault();
            navigate('/advances');
          }}
          className="button button-outline"
        >
          {lang === 'es' ? 'Ver avances' : 'View progress'} <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="status-grid">
        {data.status.map((item) => (
          <article className="status-card" key={item.title}>
            <span>{data.statusLabel}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="formula-strip">
        <span>{data.formulaTitle}</span>
        <strong>{data.formula}</strong>
        <p>{data.formulaText}</p>
      </div>
    </section>
  );
}

function AdvancesPage({ lang }) {
  const data = researchAdvances[lang] || researchAdvances.es;

  return (
    <>
      <section className="advances-hero">
        <div className="section-kicker">{data.eyebrow}</div>
        <h1>{data.title}</h1>
        <p>{data.intro}</p>
      </section>

      <section className="research-progress-page">
        <div className="formula-panel">
          <span>{data.formulaTitle}</span>
          <h2>{data.formula}</h2>
          <p>{data.formulaText}</p>
        </div>

        <div className="status-grid">
          {data.status.map((item) => (
            <article className="status-card" key={item.title}>
              <span>{data.statusLabel}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="section-heading">
          <span>{data.experimentsTitle}</span>
          <h2>{data.experimentsTitle}</h2>
        </div>

        <div className="experiment-list">
          {data.experiments.map((experiment) => (
            <article className="experiment-card" key={experiment.title}>
              <div className="experiment-copy">
                <div className="experiment-meta">
                  <span>{experiment.tag}</span>
                  <strong>{experiment.result}</strong>
                </div>
                <h3>{experiment.title}</h3>
                <p>{experiment.text}</p>
              </div>

              <img
                src={experiment.image}
                alt={experiment.title}
                loading="lazy"
              />
            </article>
          ))}
        </div>

        <div className="next-steps">
          <span>{data.nextTitle}</span>
          <h2>{data.nextTitle}</h2>
          <ol>
            {data.next.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="research-disclaimer">
          <strong>Nota</strong>
          <p>{data.disclaimer}</p>
        </div>
      </section>
    </>
  );
}


function Home({ t, lang, navigate }) {
  return (
    <>
      <section className="hero section-block">
        <div className="hero-copy">
          <p className="eyebrow">{t.home.eyebrow}</p>
          <h1>{t.home.title}</h1>
          <p className="hero-text">{t.home.text}</p>
          <p className="hero-subtext">{t.home.secondary}</p>
          <div className="hero-actions">
            <InternalLink href="/prisma" navigate={navigate} className="button-primary">
              {t.ui.viewPrisma}
            </InternalLink>
            <InternalLink href="/methods" navigate={navigate} className="button-secondary">
              {t.ui.documentation} <ArrowRight size={16} />
            </InternalLink>
          </div>
        </div>

        <BrainVisual />
      </section>

      <section className="home-index section-block">
        {routes.map((route, index) => (
          <InternalLink href={`/${route}`} navigate={navigate} className="index-card" key={route}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{t.nav[route]}</h2>
            <ArrowRight size={20} />
          </InternalLink>
        ))}
      </section>
    </>
  );
}

function ResearchPage({ t }) {
  return (
    <>
      <PageHero eyebrow={t.research.eyebrow} title={t.research.title} text={t.research.text}>
        <div className="research-figure">
          <LineChart size={72} />
          <span>EEG / PSD / IAF / Resting-state</span>
        </div>
      </PageHero>

      <section className="three-grid section-block">
        {t.research.blocks.map((item) => (
          <article className="feature-card stacked" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function PrismaPage({ t }) {
  return (
    <>
      <PageHero eyebrow={t.prisma.eyebrow} title={t.prisma.title} text={t.prisma.text}>
        <BrainVisual />
      </PageHero>

      <section className="workflow-section section-block">
        <p className="eyebrow">{t.prisma.workflowTitle}</p>
        <div className="workflow-grid">
          {t.prisma.workflow.map((step, index) => {
            const Icon = step.icon;
            return (
              <article className="workflow-card" key={step.number}>
                <span className="card-number">{step.number}</span>
                <Icon className="card-icon" size={30} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {index < t.prisma.workflow.length - 1 && <span className="connector">›</span>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <p className="eyebrow">{t.prisma.featuresTitle}</p>
        <div className="feature-grid">
          {t.prisma.features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="feature-card" key={feature.title}>
                <Icon size={34} />
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function MethodsPage({ t }) {
  return (
    <>
      <PageHero eyebrow={t.methods.eyebrow} title={t.methods.title} text={t.methods.text} />
      <section className="section-block">
        <div className="methods-grid">
          {t.methods.items.map((method) => {
            const Icon = method.icon;
            return (
              <article className="method-card" key={method.title}>
                <Icon size={30} />
                <h3>{method.title}</h3>
                <p>{method.text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function CollaborationsPage({ t }) {
  return (
    <>
      <PageHero
        eyebrow={t.collaborations.eyebrow}
        title={t.collaborations.title}
        text={t.collaborations.text}
      />
      <section className="section-block">
        <div className="collab-grid page-collab-grid">
          {t.collaborations.items.map((item) => (
            <article className="collab-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function NotesPage({ t }) {
  return (
    <>
      <PageHero eyebrow={t.notes.eyebrow} title={t.notes.title} text={t.notes.text} />
      <section className="section-block">
        <div className="notes-grid">
          {t.notes.items.map((note) => (
            <article className="note-card" key={note.title}>
              <div className="note-meta">
                <span>{note.type}</span>
                <time>{note.date}</time>
              </div>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage({ t }) {
  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} text={t.contact.text} />
      <section className="contact-section section-block">
        <div>
          <p className="eyebrow">{t.ui.follow}</p>
          <h2>Rogex Laboratories</h2>
          <p>{t.footer}</p>
        </div>

        <div className="contact-actions">
          <a href="mailto:rogernav06@gmail.com">
            <Mail size={18} /> {t.contact.email}
          </a>
          {socialLinks.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              <img src={link.icon} alt="" /> {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function Footer({ t, navigate }) {
  return (
    <footer className="site-footer">
      <InternalLink href="/" navigate={navigate} className="brand footer-brand" aria-label="Rogex Laboratories home">
        <img src={logo} alt="Rogex Laboratories logo" />
        <span>
          <strong>ROGEX</strong>
          <small>LABORATORIES</small>
        </span>
      </InternalLink>

      <p>
        {t.footer}
        <br />
        <span>© 2026 Rogex Laboratories. All rights reserved.</span>
      </p>

      <div className="footer-links">
        {socialLinks.map((link) => (
          <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
            <img src={link.icon} alt="" />
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

function App() {
  const [path, navigate] = usePath();
  const [lang, setLang] = useState(() => localStorage.getItem('rogex-lang') || 'es');

  useEffect(() => {
    localStorage.setItem('rogex-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = copy[lang];

  const page = useMemo(() => {
    const key = path.replace('/', '') || 'home';

    if (key === 'research') return <ResearchPage t={t} />;
    if (key === 'prisma') return <PrismaPage t={t} />; if (key === 'prisma3') return <Prisma3ArticlePage lang={lang} />;
    if (key === 'prisma4') return <Prisma4ArticlePage lang={lang} />;
    if (key === 'methods') return <MethodsPage t={t} />;
    if (key === 'collaborations') return <CollaborationsPage t={t} />;
    if (key === 'advances') return <AdvancesPage lang={lang} />;
    if (key === 'notes') return <NotesPage t={t} />;
    if (key === 'contact') return <ContactPage t={t} />;

    return <Home t={t} lang={lang} navigate={navigate} />;
  }, [path, t, lang, navigate]);

  return (
    <div className="page-shell">
      <Header lang={lang} setLang={setLang} navigate={navigate} t={t} />
      <main>{page}</main>
      <Footer t={t} navigate={navigate} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
