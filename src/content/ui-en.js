export const en = {
  meta: {
    home: {
      title: 'EchOS 1.0 — Rogex Laboratories',
      desc: 'EchOS 1.0 by Rogex Laboratories — an independent operating system with a proprietary browser engine (Rogex Nova), the ECHO AI assistant (Navi 10), and a native IDE. Complete, Minimal and Edge editions. GNU GPLv3.',
    },
    downloads: {
      title: 'Downloads — EchOS 1.0 — Rogex Laboratories',
      desc: 'Download EchOS 1.0 by Rogex Laboratories: Complete, Minimal and Edge editions. Direct ISO/img downloads and GitHub Releases, with published SHA256 checksums.',
    },
    docs: {
      title: 'Documentation — EchOS — Rogex Laboratories',
      desc: 'Official documentation for EchOS 1.0: architecture, editions, ECHO models, packages and install guide.',
    },
    faq: {
      title: 'FAQ — EchOS — Rogex Laboratories',
      desc: 'Frequently asked questions about EchOS 1.0: hardware requirements, editions, ECHO AI offline operation, BrainChip Akida NPU support, .rxp package system, GPLv3 licensing, contributing and support.',
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
    docs: 'Docs',
    faq: 'FAQ',
    privacy: 'Privacy',
    legal: 'Legal',
    ariaMain: 'Main navigation',
    toggleAria: 'Switch language to Spanish',
    toggleShort: 'ES',
  },

  hero: {
    eclipseAlt: 'Solar eclipse ring glow',
    tagline:
      'An operating system born in darkness. Built from scratch by Rogex Laboratories — a complete desktop environment, a proprietary browser engine, and an AI that lives on your machine. No cloud required. No telemetry. Ever.',
    ctaDownload: 'Download EchOS 1.0',
    ctaDocs: 'Read the Docs',
  },

  editions: {
    kicker: 'Editions',
    title: 'Three ways to enter the eclipse',
    sub: 'One codebase, three shapes. Pick the one that matches your hardware and your day.',
    complete: {
      badge: 'Complete Edition',
      name: 'EchOS Complete',
      desc: 'The full experience. Everything the platform can do, nothing hidden.',
      items: [
        'Full desktop with Eclipse Shell & dock',
        'Rogex Nova — proprietary web browser engine',
        'ECHO AI assistant powered by Navi 10, fully offline',
        'Native integrated IDE',
        'Video & image viewers out of the box',
        'Runs on standard CPUs or neuromorphic processors (BrainChip Akida)',
      ],
      cta: 'Get Complete',
    },
    minimal: {
      badge: 'Minimal Edition',
      name: 'EchOS Minimal',
      desc: 'Daily-use efficiency edition. Same desktop, same drivers — less weight.',
      items: [
        'Identical desktop & hardware drivers',
        'No ECHO AI assistant',
        'No bundled IDE',
        'Tuned for everyday responsiveness',
      ],
      cta: 'Get Minimal',
    },
    edge: {
      badge: 'Edge Edition',
      name: 'EchOS Edge',
      desc: 'CLI-only build for IoT boards, robotics, drones and cameras.',
      items: [
        'Command-line only footprint',
        'Navi Mini — retrainable on-device edge model',
        'Built-in files command: file browser + media viewer',
        'Made for constrained and embedded targets',
      ],
      cta: 'Get Edge',
    },
  },

  features: {
    kicker: 'Proprietary stack',
    title: 'Everything built in-house',
    sub: 'EchOS is not a remix of existing distributions. Every layer below is engineered by Rogex Laboratories from first principles.',
    rows: [
      { icon: '◉', title: 'EchOS Kernel', text: 'A from-scratch kernel driving scheduling, memory, drivers and power across desktop-class CPUs and neuromorphic silicon alike.' },
      { icon: '▤', title: 'Eclipse Shell — window server with dock', text: 'Our window server renders the whole composited desktop. A macOS-style dock anchors your apps; windows snap, blur and glow through the eclipse theme.' },
      { icon: '◎', title: 'Rogex Nova — proprietary browser engine', text: "Not a WebKit/Blink wrapper. Nova parses, lays out and renders the web itself, integrated directly with the shell's security model." },
      { icon: '▶', title: 'Native video pipeline', text: 'Hardware-aware decoding and a custom image/video stack feed the bundled viewers — smooth playback without foreign media frameworks.' },
      { icon: '✦', title: 'ECHO — the AI inside', text: 'Powered by the Navi 10 model running entirely on-device. ECHO answers, automates and assists with zero network dependency.' },
      { icon: '⌘', title: 'Native IDE', text: 'Edit, build, debug and deploy for EchOS targets from within the OS itself — the same toolchain we use.' },
    ],
  },

  carousel: {
    kicker: 'Real screenshots',
    title: 'Booted in QEMU. No mockups.',
    sub: 'Captured straight from EchOS 1.0 ECLIPSE running under emulation.',
    prev: 'Previous screenshot',
    next: 'Next screenshot',
    goTo: 'Go to slide',
    slides: [
      { img: '/shots/preview-1.jpg', caption: 'EchOS Minimal 1.0 — preview build' },
      { img: '/shots/preview-2.jpg', caption: 'EchOS Minimal 1.0 — preview build' },
      { img: '/shots/preview-3.jpg', caption: 'EchOS Minimal 1.0 — preview build' },
      { img: '/shots/preview-4.jpg', caption: 'EchOS Minimal 1.0 — preview build' },
      { img: '/shots/preview-5.jpg', caption: 'EchOS Minimal 1.0 — preview build' },
      { img: '/shots/preview-6.jpg', caption: 'EchOS Minimal 1.0 — preview build' },
      { img: '/shots/preview-7.jpg', caption: 'EchOS Minimal 1.0 — preview build' },
    ],
  },

  ctaStrip: {
    title: 'Ready for totality?',
    text: 'Grab an image, flash it, boot into the dark.',
    btnDownloads: 'Go to Downloads',
    btnGithub: 'Source on GitHub ↗',
  },

  downloads: {
    title: 'Downloads',
    tagline: 'EchOS 1.0 — stable line v1.0.0. All images are checksummed. Verify the SHA256 digest before flashing.',
    bridgesKicker: 'Sources',
    bridgesTitle: 'Two ways to get EchOS',
    bridgesSub: 'Every file can be downloaded directly from this site or fetched from the official GitHub release tag v1.0.0.',
    cardDirect: {
      badge: 'Direct · Official',
      name: 'rogexlaboratories.com',
      desc: 'Direct HTTP downloads served from this site.',
      linkLabel: 'Browse files below ↓',
    },
    cardGithub: {
      badge: 'Mirror · GitHub',
      name: 'GitHub Releases',
      desc: 'All assets attached to release tag v1.0.0, plus source archives.',
      linkLabel: 'Open release v1.0.0 ↗',
    },
    schedule: {
      badge: 'Pre-release',
      title: 'Public availability — August 30, 2026',
      body: 'EchOS Minimal and EchOS Edge 1.0 publish on August 30, 2026. The Complete edition follows at a later date: ECHO AI v1 is in its final training and testing pass before it ships.',
    },
    lockedDate: 'Available {date}',
    lockedTba: 'Date to be announced — Echo AI v1 in final training & testing',
    tableHeaders: {
      file: 'File',
      target: 'Target',
      format: 'Format',
      size: 'Size',
      sha256: 'SHA256',
      links: 'Links',
    },
    labels: {
      direct: 'Direct download',
      github: 'GitHub ↗',
    },
    targets: {
      metal: 'Bare metal — x86_64 PC / laptop',
      vm: 'Virtual machine — QEMU / VirtualBox / VMware',
      usb: 'Bootable USB drive (physical install)',
    },
    completeSection: {
      kicker: 'Edition',
      title: 'EchOS Complete Edition',
      sub: 'Full desktop · Rogex Nova browser engine · ECHO AI (Navi 10) · native IDE · video/image viewers · CPU or BrainChip Akida NPU.',
    },
    minimalSection: {
      kicker: 'Edition',
      title: 'EchOS Minimal Edition',
      sub: 'Same desktop and drivers as Complete — without ECHO AI and without the IDE. Built for daily-use efficiency.',
    },
    edgeSection: {
      kicker: 'Edition',
      title: 'EchOS Edge Edition',
      sub: 'CLI-only for IoT boards, robotics, drones and cameras. Includes the retrainable Navi Mini edge model and the built-in files command (file browser + media viewer).',
    },
    usbSection: {
      kicker: 'USB installer',
      title: 'USB image (.img.gz)',
      sub: 'Bootable USB image for physical installs. Decompress it, then write it straight to your drive:',
      note: 'After decompression you can verify the resulting image against the SHA256 of the uncompressed file published alongside the release.',
      gunzipHint: 'gunzip + dd example',
    },
    verifySection: {
      kicker: 'Safety',
      title: 'Verify before you flash',
      body1: 'Every image ships with a SHA256 checksum. Compare your local digest against the values above or against SHA256SUMS.txt attached to the GitHub release:',
      body2: 'If a checksum does not match, do not boot the image and report it via GitHub Issues.',
    },
  },

  docsPage: {
    hubTitle: 'Documentation',
    hubSub: 'Everything worth knowing about EchOS internals, editions and tooling.',
    sidebarTitle: 'Documents',
    onThisHub: 'Overview',
    pages: {
      architecture: { label: 'Architecture', blurb: 'Kernel, Eclipse Shell, Nova engine, video pipeline.' },
      editions: { label: 'Editions', blurb: 'Complete vs Minimal vs Edge, and hardware targets.' },
      echo: { label: 'ECHO models', blurb: 'Navi 10 assistant and the retrainable Navi Mini.' },
      packages: { label: 'Packages', blurb: '.rxp archives, rx-pkg and core tools.' },
      install: { label: 'Install guide', blurb: 'Verify, flash, boot — step by step.' },
    },
    hubCardsTitle: 'Start here',
    backToHub: '← All documents',
  },

  faqPage: {
    kicker: 'Answers',
    title: 'Frequently Asked Questions',
    sub: 'Everything people ask before crossing into totality.',
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
    small: 'EchOS 1.0 · Author: Roger Navarro · Licensed under GNU GPLv3',
    contact: 'Contact:',
    onePerson: 'A one-person company, run by Roger Navarro.',
  },
};
