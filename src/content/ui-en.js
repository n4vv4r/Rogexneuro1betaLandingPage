export const en = {
  meta: {
    home: {
      title: 'echOS 2.0 Universal — Rogex Laboratories',
      desc: 'echOS 2.0 Universal by Rogex Laboratories: a bare-metal x86_64 unikernel. One Heap-0 kernel, console-only, local epk. Public ISO after Akida hardware validation.',
    },
    downloads: {
      title: 'Downloads — echOS 2.0 Universal — Rogex Laboratories',
      desc: 'echOS 2.0 Universal is a single public edition. The ISO is held until BrainChip Akida is measured on real silicon. Checksums will ship with the drop.',
    },
    packages: {
      title: 'Packages — echOS epk / RXP1 — Rogex Laboratories',
      desc: 'Public echOS package channel. Download .rxp files here, or from the OS: www on && epk get <name>.',
    },
    validation: {
      title: 'Validation — echOS + Akida — Rogex Laboratories',
      desc: 'The publication bar for echOS 2.0: energy, latency, sparsity, Heap-0 drift and open datasets. No silicon numbers until Akida is in the lab.',
    },
    docs: {
      title: 'Documentation — echOS 2.0 — Rogex Laboratories',
      desc: 'Official documentation for echOS 2.0 Universal (console, Heap-0, man, curl, epk) and EchOS 1.0 ECLIPSE (desktop). Architecture, install, limits, neuromorphic stack.',
    },
    faq: {
      title: 'FAQ — echOS 2.0 — Rogex Laboratories',
      desc: 'What echOS 2.0 Universal is, why the ISO is held for Akida hardware validation, epk, and how editions work.',
    },
    privacy: {
      title: 'Privacy Policy — Rogex Laboratories',
      desc: 'Privacy Policy of Rogex Laboratories: EchOS is amnesic by default, collects no telemetry, and this website uses no tracking cookies. GDPR-aligned policy.',
    },
    legal: {
      title: 'Legal Notice & Terms of Use — Rogex Laboratories',
      desc: 'Aviso Legal y Términos de Uso of rogexlaboratories.com: ownership, intellectual property, GPLv3 licensing, usage rules, liability limitations and jurisdiction.',
    },
    notFound: {
      title: '404 — Lost in eclipse — Rogex Laboratories',
      desc: 'Page not found. You drifted into the corona. Head back to EchOS home, downloads or docs.',
    },
  },

  nav: {
    home: 'Home',
    downloads: 'Downloads',
    packages: 'Packages',
    docs: 'Docs',
    validation: 'Validation',
    faq: 'FAQ',
    privacy: 'Privacy',
    legal: 'Legal',
    ariaMain: 'Main navigation',
    toggleAria: 'Switch language to Spanish',
    toggleShort: 'ES',
  },

  hero: {
    eclipseAlt: 'Solar eclipse ring glow',
    kicker: 'Rogex Laboratories',
    tagline:
      'A bare-metal x86_64 unikernel. One Heap-0 kernel, a console, local packages. No Linux underneath. No telemetry. The public ISO waits on Akida silicon — not on a calendar.',
    ctaDownload: 'Downloads',
    ctaDocs: 'Documentation',
    ctaValidation: 'Validation bar',
    bannerAlt: 'echOS 2.0 Universal LIVE — echofetch system card with Braille droplet logo and Heap-0 stats',
    bannerCaption: 'echOS 2.0 Universal — LIVE. echofetch + Heap-0. Captured from the machine, not a mockup.',
  },

  releaseGate: {
    badge: 'Publication gate',
    title: 'The ISO ships when Akida has been measured on metal',
    body: 'Software on QEMU is not the product we will ask a lab to cite. We are bringing a BrainChip AKD1000 into the bench: shunt on the 3.3 V rail, PRISMA 5 latency, sparsity, Heap-0 drift, public EEG sets. Until those logs exist, Downloads stays closed. Minimal / Complete / Edge / Server are install-time manifests — they live in Docs, not as four storefronts.',
    cta: 'Read the validation bar',
    ctaLimits: 'Honest limits',
  },

  product: {
    kicker: 'The product',
    title: 'One public edition',
    sub: 'Universal is the ISO. Other profiles are chosen in the installer, documented under Docs → Editions.',
    badge: 'echOS 2.0 Universal',
    name: 'Console. Heap-0. Four manifests.',
    desc: 'Liberation Mono, TUI installer, LIVE in RAM, local epk, IPv4/TLS client, SNN software path with a real PCI probe for Akida. No window manager on this line.',
    items: [
      'Shared Heap-0 kernel — edition applied at install, not four ELFs',
      'LIVE / memtest / recovery in GRUB; q skips the wizard',
      'man, nano, curl, wdl, ipconf on the console',
      'epk get pulls .rxp from /packages when www is on',
      'PCI 1e7c:bca1 probed; no board → software LIF, never a fake NPU',
    ],
    cta: 'Downloads (held)',
    ctaDocs: 'Editions in Docs',
  },

  features: {
    kicker: 'In-house stack',
    title: 'Built here. Named honestly.',
    sub: 'Not a Linux remix. Kernel, filesystem, package tool, HTTP client and SNN path are first-party code.',
    rows: [
      { icon: '◉', title: 'Unikernel', text: 'One ELF, Multiboot2, cooperative idle (HLT). No ring-3 zoo. The machine is the program.' },
      { icon: '▣', title: 'Heap-0', text: 'Critical buffers live in BSS. O(1), no hot-path malloc. Drift of zero bytes is a publication metric, not a slogan.' },
      { icon: '⌘', title: 'Console contract', text: 'Liberation Mono, termtheme, man pages, nano. The CLI is the product — not a fallback from a desktop.' },
      { icon: '◎', title: 'Network as a tool', text: 'www, curl, wdl, ipconf. HTTP/1.0, SNI, TLS 1.3 offered. One socket. No Wi-Fi theatre.' },
      { icon: '✦', title: 'Spiking path', text: 'Event fabric + PRISMA 5 SNN in software. Akida is a PCI device we probe, not a render in a slide.' },
      { icon: '▤', title: 'epk channel', text: 'The ISO still carries a catalog. The live tree is https://www.rogexlaboratories.com/packages — browser download or `epk get`.' },
    ],
  },

  carousel: {
    kicker: 'From the machine',
    title: 'LIVE captures. No mockups.',
    sub: 'echOS 2.0 Universal, 27 August 2026. Wizard, echofetch, man curl, ipconf.',
    prev: 'Previous screenshot',
    next: 'Next screenshot',
    goTo: 'Go to slide',
    slides: [
      { img: '/shots/shot-02-echofetch.png', caption: 'echofetch — official droplet, Heap-0, Universal LIVE' },
      { img: '/shots/shot-01-tree-ipconf.png', caption: 'tree + ping + ipconf — virtio-net, 10.0.2.15' },
      { img: '/shots/shot-03-man-curl.png', caption: 'man curl — HTTP/1.0, TLS 1.3 / 1.2, -dom' },
      { img: '/shots/shot-04-wizard-lang.png', caption: 'TUI installer — language, q = LIVE' },
      { img: '/shots/shot-05-wizard-tz.png', caption: 'Timezone step' },
      { img: '/shots/shot-06-wizard-kbd.png', caption: 'Keyboard map' },
      { img: '/shots/shot-07-wizard-locale.png', caption: 'Locale' },
      { img: '/shots/shot-08-wizard-edition.png', caption: 'Edition manifest — Minimal, Complete, Edge, Server, LIVE' },
    ],
  },

  ctaStrip: {
    title: 'Read before you wait for an ISO',
    text: 'The tree is public. The binary drop is not — not until Akida has a lab log. Docs and the validation bar are the product today.',
    btnDocs: 'Open the docs',
    btnValidation: 'Validation bar',
    btnGithub: 'Source on GitHub ↗',
  },

  downloads: {
    title: 'Downloads',
    tagline: 'One edition: echOS 2.0 Universal. The files are listed so the names are not a surprise. The bits stay here until Akida has a lab log.',
    gate: {
      badge: 'Held',
      title: 'No public ISO until Akida is on the bench',
      body: 'We will not put a checksummed image on this page because a QEMU capture looks finished. Publication follows a hardware campaign: real AKD1000 current, PRISMA 5 latency, sparsity, Heap-0 drift, open EEG sets. When those plots exist, vm + metal land here with SHA256. Until then, the tree is readable and this table is a promise of names, not a download.',
      cta: 'Validation campaign',
    },
    universal: {
      kicker: 'The ISO',
      title: 'echOS 2.0 Universal',
      sub: 'Same ELF for QEMU and metal. Installer picks Minimal, Complete, Edge or Server from a local manifest. LIVE writes nothing.',
      otherEditions: 'Complete, Edge, Server and 1.0 Eclipse are documented, not sold as extra downloads.',
      otherLink: 'Editions in Docs →',
    },
    tableHeaders: {
      file: 'File',
      target: 'Target',
      format: 'Format',
      size: 'Size',
      links: 'Status',
    },
    labels: {
      direct: 'Direct download',
      github: 'GitHub ↗',
      held: 'Held — Akida campaign',
    },
    targets: {
      metal: 'Bare metal — x86_64 PC / USB (CSM)',
      vm: 'Virtual machine — QEMU / VirtualBox',
    },
    verifySection: {
      kicker: 'When it ships',
      title: 'Checksums travel with the image',
      body1: 'The public drop will include SHA256SUMS.txt. Verify before you flash:',
      body2: 'A mismatch means you stop. No image, no sum — that is the honest state today.',
    },
  },

  packagesPage: {
    title: 'Packages',
    tagline: 'The public epk channel. RXP1 files you can save in a browser or pull from echOS with www on.',
    badge: 'Live channel',
    howTitle: 'Not local-only anymore',
    howBody: 'The ISO still carries a catalog for LIVE. The files themselves live here. Download a .rxp, or from the console:',
    howCode: 'www on\nepk get rg\n# saved /tmp/rg-2.0.0.rxp',
    docsLink: 'epk in Docs',
    kicker: 'INDEX',
    listTitle: 'All packages',
    listSub: 'Format RXP1. SHA-256 is in INDEX.json. RXFS on the unikernel is 64 KiB per file — large .rxp stay on this site.',
    error: 'Could not load INDEX.json.',
    table: {
      name: 'Name',
      version: 'Version',
      edition: 'Edition',
      size: 'Size',
      desc: 'Description',
      file: 'Download',
    },
  },

  docsPage: {
    kicker: 'Laboratory notes',
    hubTitle: 'Documentation',
    hubSub: 'echOS 2.0 Universal is the console line. EchOS 1.0 ECLIPSE remains the desktop. Specs, how to boot it, what it will not pretend to be — written in-house.',
    sidebarTitle: 'Contents',
    onThisHub: 'Index',
    hubCardsTitle: 'Start here',
    backToHub: '← All documents',
    unknown: 'Unknown document.',
    lead20Title: 'echOS 2.0 Universal',
    lead20Body: 'One Heap-0 kernel, four editions, no window manager. LIVE, man, curl, epk, TLS 1.3 handshake.',
    lead20Cta: 'Read 2.0 overview',
    lead10Title: 'EchOS 1.0 ECLIPSE',
    lead10Body: 'Eclipse Shell, dock, Nova, ECHO Navi 10. Still the graphical product line.',
    lead10Cta: '1.0 architecture',
  },

  validation: {
    kicker: 'Lab bar',
    title: 'What has to be true before we publish',
    lead: 'A console that boots in QEMU is a prototype. A platform other labs can cite needs joules, microseconds, and a confusion matrix on public data — measured on Akida, not estimated from a software LIF.',
    gate: {
      badge: 'Not yet on silicon',
      title: 'The suite is specified. The traces are not.',
      body: 'We will buy, seat, and instrument a BrainChip AKD1000. Until the shunt, the scope, and a 72-hour Heap-0 log exist, every milliwatt on this page is a bar, not a result. That is deliberate.',
    },
    metrics: {
      kicker: 'Publication bars',
      title: 'Numbers the drop has to beat',
      sub: 'Targets for the metal campaign. Empty cells until the bench is live.',
      cards: [
        { value: '< 100 mW', label: 'Inference power', note: 'AKD1000 rail, shunt on 3.3 V. Energy also as pJ/spike.' },
        { value: 'µs, not ms', label: 'Spike latency', note: 'Biosignal in → PRISMA 5 out. Jitter versus Linux context-switch, same workload.' },
        { value: '0 B', label: 'Heap-0 drift', note: '72 h EEG soak. Kernel log must show Δ RAM = 0.' },
        { value: '< 16 MiB', label: 'Edge RAM envelope', note: 'Text LIVE, no 1280×720 backbuffer tax. Desktop 1.0 is a different ISO.' },
      ],
    },
    suite: {
      kicker: 'Campaign',
      title: 'Five measurements, then a checksum',
      sub: 'Same harness names you already have in the tree: bench-snn, prisma5 stress, epk stress.',
      items: [
        {
          title: 'Energy on the rail',
          method: 'Precision meter or scope across a shunt on the AKD1000 3.3 V feed (PCIe/M.2). Real-time inference, not idle datasheet.',
          bar: 'Bar: stay under 100 mW; report pJ per spike.',
        },
        {
          title: 'Deterministic latency',
          method: 'Inject events on the input path; timestamp the outgoing spike in PRISMA 5. Compare bare-metal to the same graph on Linux + GPU/Jetson.',
          bar: 'Bar: microseconds, and a jitter plot that does not hide in a mean.',
        },
        {
          title: 'Sparsity',
          method: 'White noise and flat EEG — no events. Count FLOPs and spikes. The idle story is only real if both collapse.',
          bar: 'Bar: work and draw fall with the events, not with a sleep() in a demo.',
        },
        {
          title: 'Heap-0 soak',
          method: 'Continuous EEG for 72 hours. Kernel allocator log before and after.',
          bar: 'Bar: one byte of growth is a failed run.',
        },
        {
          title: 'Open datasets',
          method: 'PRISMA 5 on public sets (PhysioNet motor imagery, BCI Competition IV class). Accuracy and confusion versus a conventional CNN/RNN on the same split.',
          bar: 'Bar: numbers with a repo, not a slide.',
        },
      ],
    },
    bench: {
      kicker: 'Comparisons',
      title: 'echOS + Akida against the default stack',
      body: 'When silicon is seated we will plot latency and joules next to Linux + Jetson/GPU on identical tasks. No chart until both sides ran in this lab. Software LIF on x86 is a development path, not a substitute row in that figure.',
    },
    industry: {
      kicker: 'If the bars hold',
      title: 'Where this stack is aimed',
      sub: 'Not a product SKU list. The workloads that actually need spikes, milliwatts, and no cloud round-trip.',
      cards: [
        { title: 'BCI and prostheses', body: 'Tight loop from biosignal to actuator. Battery mass matters; a GPU in the backpack does not.' },
        { title: 'Wearable monitors', body: 'Always-on seizure or rhythm flags on a badge budget. Inference stays on the device.' },
        { title: 'Edge drones and robots', body: 'Event cameras and cheap navigation where the thermal envelope is the design constraint.' },
        { title: 'Plant-floor sensing', body: 'Vibration spectra on heavy kit, predictive flags without a rack in the cabinet.' },
      ],
    },
    repro: {
      kicker: 'Reproduce',
      title: 'The harness is already in the tree',
      body: 'You can run the software side today. The metal side waits on the card. When the campaign closes we will publish traces, scripts, and a PDF with methods — not a press sentence.',
      code: 'hwprobe\nbench-snn\nprisma5 stress\nepk stress 32\n# later: shunt log + PhysioNet split, same commands, Akida present',
      ctaDocs: 'Research notes',
      ctaBuild: 'How to build',
    },
  },

  faqPage: {
    kicker: 'Answers',
    title: 'Frequently Asked Questions',
    sub: 'What this is, what it is not, and when an ISO appears.',
  },

  privacyPage: {
    kicker: 'Your data stays in the dark',
    title: 'Privacy Policy',
    updated: 'Last updated: 2026-08-23 · Applies to rogexlaboratories.com and the EchOS operating system.',
  },

  legalPage: {
    kicker: 'The fine print',
    title: 'Legal Notice & Terms of Use',
    updated: 'Last updated: 2026-08-23.',
  },

  notFound: {
    code: '404',
    title: 'Lost in eclipse.',
    body: 'This page slipped behind the moon. It either never existed, was renamed, or was swallowed by totality.',
    btnHome: 'Back to Home',
    btnDownloads: 'Downloads',
    btnDocs: 'Docs',
  },

  footer: {
    brandLine: 'Rogex Laboratories — a Knights Labs brand',
    small: 'echOS 2.0 Universal · Author: Roger Navarro · GNU GPLv3',
    contact: 'Contact:',
    onePerson: 'A one-person company, run by Roger Navarro.',
  },
};
