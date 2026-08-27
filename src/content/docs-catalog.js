/* Documentation catalogue for /docs.
   v2 markdown lives in md/v2/{en,es}/. 1.0 reference stays in md/*.md. */
import architectureMd from './md/architecture.md?raw';
import echoMd from './md/echo.md?raw';
import packagesSpecMd from './md/packages-spec.md?raw';
import packagesMd from './md/packages.md?raw';
import videoMd from './md/video.md?raw';
import roadmapMd from './md/roadmap.md?raw';

const v2en = import.meta.glob('./md/v2/en/*.md', { query: '?raw', import: 'default', eager: true });
const v2es = import.meta.glob('./md/v2/es/*.md', { query: '?raw', import: 'default', eager: true });

function v2(id) {
  const hit = (map) => {
    const key = Object.keys(map).find((k) => k.endsWith(`/${id}.md`));
    return key ? map[key] : '';
  };
  return { en: hit(v2en), es: hit(v2es) };
}

export const DOC_GROUPS = [
  {
    id: 'start',
    label: { en: 'echOS 2.0 Universal', es: 'echOS 2.0 Universal' },
    hint: {
      en: 'Console line. One Heap-0 kernel, four editions, no window manager.',
      es: 'Línea de consola. Un kernel Heap-0, cuatro ediciones, sin gestor de ventanas.',
    },
    ids: ['overview', 'whats-new', 'users', 'curious', 'technical', 'research'],
  },
  {
    id: 'use',
    label: { en: 'Using the system', es: 'Usar el sistema' },
    hint: {
      en: 'Install, CLI, commands, network, packages.',
      es: 'Instalación, CLI, comandos, red, paquetes.',
    },
    ids: ['install', 'cli', 'commands', 'network', 'epk', 'editions', 'faq-echos'],
  },
  {
    id: 'inside',
    label: { en: 'Internals', es: 'Interior' },
    hint: {
      en: 'Memory contract, neuromorphic stack, filesystem, limits, build.',
      es: 'Contrato de memoria, pila neuromórfica, filesystem, límites, build.',
    },
    ids: ['heap-0', 'neuromorphic', 'filesystem', 'limits', 'building'],
  },
  {
    id: 'v1',
    label: { en: '1.0 Eclipse (reference)', es: '1.0 Eclipse (referencia)' },
    hint: {
      en: 'Desktop line: architecture, ECHO, packages, video, roadmap.',
      es: 'Línea de escritorio: arquitectura, ECHO, paquetes, vídeo, hoja de ruta.',
    },
    ids: ['architecture', 'echo', 'packages', 'packages-spec', 'video', 'roadmap'],
  },
];

export const MD_DOCS = {
  overview: {
    title: { en: 'What 2.0 is', es: 'Qué es 2.0' },
    blurb: {
      en: 'Unikernel console. One ELF. Four editions. Zero graphics.',
      es: 'Consola unikernel. Un ELF. Cuatro ediciones. Cero gráficos.',
    },
    src: v2('overview'),
  },
  'whats-new': {
    title: { en: 'What’s new vs 1.0', es: 'Novedades vs 1.0' },
    blurb: {
      en: 'ECLIPSE desktop versus Universal console — table and decisions.',
      es: 'Escritorio ECLIPSE frente a consola Universal — tabla y decisiones.',
    },
    src: v2('whats-new'),
  },
  users: {
    title: { en: 'For users', es: 'Para usuarios' },
    blurb: {
      en: 'LIVE, files, network, nano. What to type first.',
      es: 'LIVE, archivos, red, nano. Qué escribir primero.',
    },
    src: v2('users'),
  },
  curious: {
    title: { en: 'For the curious', es: 'Para curiosos' },
    blurb: {
      en: 'Why a console, OpenBSD names, no fake NPUs.',
      es: 'Por qué consola, nombres OpenBSD, ningún NPU falso.',
    },
    src: v2('curious'),
  },
  technical: {
    title: { en: 'For engineers', es: 'Para técnicos' },
    blurb: {
      en: 'Tree, dispatcher, TLS, IRQ, contracts.',
      es: 'Árbol, dispatcher, TLS, IRQ, contratos.',
    },
    src: v2('technical'),
  },
  research: {
    title: { en: 'For researchers', es: 'Para investigadores' },
    blurb: {
      en: 'Heap-0, event fabric, PRISMA 5, Akida, what you may cite.',
      es: 'Heap-0, tejido de eventos, PRISMA 5, Akida, qué se puede citar.',
    },
    src: v2('research'),
  },
  install: {
    title: { en: 'Install / LIVE', es: 'Instalar / LIVE' },
    blurb: {
      en: 'QEMU, USB, wizard, GRUB. q is LIVE.',
      es: 'QEMU, USB, wizard, GRUB. q es LIVE.',
    },
    src: v2('install'),
  },
  cli: {
    title: { en: 'The CLI', es: 'El CLI' },
    blurb: {
      en: 'Liberation Mono, termtheme, man, nano, Tab, history.',
      es: 'Liberation Mono, termtheme, man, nano, Tab, historial.',
    },
    src: v2('cli'),
  },
  commands: {
    title: { en: 'Command map', es: 'Comandos' },
    blurb: {
      en: 'CMD_NAMES grouped. man <cmd> for flags.',
      es: 'CMD_NAMES agrupados. man <cmd> para flags.',
    },
    src: v2('commands'),
  },
  network: {
    title: { en: 'Network', es: 'Red' },
    blurb: {
      en: 'www, curl, wdl, TLS 1.3, ipconf. Honest limits.',
      es: 'www, curl, wdl, TLS 1.3, ipconf. Límites honestos.',
    },
    src: v2('network'),
  },
  epk: {
    title: { en: 'epk packages', es: 'Paquetes epk' },
    blurb: {
      en: 'Local catalogue. Never opens a socket.',
      es: 'Catálogo local. Nunca abre un socket.',
    },
    src: v2('epk'),
  },
  editions: {
    title: { en: 'Editions', es: 'Ediciones' },
    blurb: {
      en: '2.0 manifests and how they differ from 1.0 compile flags.',
      es: 'Manifiestos 2.0 y cómo se apartan de los flags de 1.0.',
    },
    src: v2('editions'),
  },
  'faq-echos': {
    title: { en: 'FAQ (2.0)', es: 'FAQ (2.0)' },
    blurb: {
      en: 'Linux? Dock? Wi-Fi? https? Akida? Direct answers.',
      es: '¿Linux? ¿Dock? ¿Wi-Fi? ¿https? ¿Akida? Respuestas directas.',
    },
    src: v2('faq-echos'),
  },
  'heap-0': {
    title: { en: 'Heap-0', es: 'Heap-0' },
    blurb: {
      en: 'Static BSS layout. O(1). What is not Heap-0.',
      es: 'Layout BSS estático. O(1). Qué no es Heap-0.',
    },
    src: v2('heap-0'),
  },
  neuromorphic: {
    title: { en: 'Neuromorphic', es: 'Neuromórfico' },
    blurb: {
      en: 'Event fabric, PRISMA 5, Akida probe, NAVI in-kernel.',
      es: 'Tejido de eventos, PRISMA 5, sonda Akida, NAVI en el kernel.',
    },
    src: v2('neuromorphic'),
  },
  filesystem: {
    title: { en: 'Filesystem', es: 'Sistema de ficheros' },
    blurb: {
      en: '/users not /home. RXFS 64 × 64 KiB.',
      es: '/users, no /home. RXFS 64 × 64 KiB.',
    },
    src: v2('filesystem'),
  },
  limits: {
    title: { en: 'Limits', es: 'Límites' },
    blurb: {
      en: 'What we do not ship. Policy, not fine print.',
      es: 'Lo que no enviamos. Política, no letra pequeña.',
    },
    src: v2('limits'),
  },
  building: {
    title: { en: 'Building', es: 'Construir' },
    blurb: {
      en: 'make EDITION=universal. Toolchain, tests, do-nots.',
      es: 'make EDITION=universal. Toolchain, tests, lo que no hacer.',
    },
    src: v2('building'),
  },
  architecture: {
    title: { en: '1.0 architecture', es: 'Arquitectura 1.0' },
    blurb: {
      en: 'Eclipse Shell, Nova, kernel layers — desktop line.',
      es: 'Eclipse Shell, Nova, capas del kernel — línea de escritorio.',
    },
    src: { en: architectureMd, es: architectureMd },
  },
  echo: {
    title: { en: 'ECHO AI', es: 'ECHO AI' },
    blurb: {
      en: 'Navi 10: datasets, A/B contract, Lang / Code / Sys.',
      es: 'Navi 10: datasets, contrato A/B, Lang / Code / Sys.',
    },
    src: { en: echoMd, es: echoMd },
  },
  packages: {
    title: { en: 'Packages (1.0)', es: 'Paquetes (1.0)' },
    blurb: {
      en: '.rxp format, rx-pkg and the ten core tools.',
      es: 'Formato .rxp, rx-pkg y las diez herramientas base.',
    },
    src: { en: packagesMd, es: packagesMd },
  },
  'packages-spec': {
    title: { en: 'Package spec', es: 'Spec de paquetes' },
    blurb: {
      en: 'Binary specification of the .rxp archive.',
      es: 'Especificación binaria del archivo .rxp.',
    },
    src: { en: packagesSpecMd, es: packagesSpecMd },
  },
  video: {
    title: { en: 'Video pipeline', es: 'Pipeline de vídeo' },
    blurb: {
      en: 'MP4/H.264 status and the 1.0 test asset.',
      es: 'Estado MP4/H.264 y el asset de prueba 1.0.',
    },
    src: { en: videoMd, es: videoMd },
  },
  roadmap: {
    title: { en: 'Roadmap', es: 'Hoja de ruta' },
    blurb: {
      en: '2.0 now, 1.0 next. Milestones close when demonstrated.',
      es: '2.0 ahora, 1.0 después. Hitos al demostrarse.',
    },
    src: { en: roadmapMd, es: roadmapMd },
  },
};

export const MD_ORDER = DOC_GROUPS.flatMap((g) => g.ids);

export function docTitle(id, lang) {
  const d = MD_DOCS[id];
  if (!d) return id;
  return d.title[lang] || d.title.en;
}

export function docBlurb(id, lang) {
  const d = MD_DOCS[id];
  if (!d) return '';
  return d.blurb[lang] || d.blurb.en;
}

export function docSource(id, lang) {
  const d = MD_DOCS[id];
  if (!d) return '';
  return d.src[lang] || d.src.en || '';
}
