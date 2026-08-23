import { Link } from 'react-router-dom';
// FAQ content — English
export const faqEn = [
  {
    q: 'What exactly is EchOS?',
    a: (
      <>
        <p>
          EchOS is an independent operating system developed from scratch by Rogex Laboratories (a Knights Labs brand).
          Version 1.0 ships a full desktop environment (the <strong>Eclipse Shell</strong>, including a macOS-style dock),
          a proprietary web browser engine called <strong>Rogex Nova</strong>, an on-device AI assistant named{' '}
          <strong>ECHO</strong> powered by the Navi 10 model, a native IDE, and video/image viewers. It was formerly known
          as <em>rxOS</em> and was renamed to EchOS for the 1.0 release.
        </p>
      </>
    ),
  },
  {
    q: 'What are the hardware requirements?',
    a: (
      <ul>
        <li><strong>Complete / Minimal:</strong> x86_64 CPU (2 cores minimum recommended), 4 GB RAM (8 GB comfortable), 16 GB storage, any GPU supported by our drivers. Complete also runs on neuromorphic processors such as the <strong>BrainChip Akida</strong>, where ECHO executes natively on the NPU.</li>
        <li><strong>Edge:</strong> x86_64 boards with as little as 256 MB RAM, plus ARM targets. Designed for IoT devices, robotics platforms, drones and cameras.</li>
      </ul>
    ),
  },
  {
    q: "What's the difference between the three editions?",
    a: (
      <ul>
        <li><strong>Complete:</strong> everything — desktop, Rogex Nova browser, ECHO AI (Navi 10), IDE, media viewers, CPU + Akida support.</li>
        <li><strong>Minimal:</strong> identical desktop environment and driver set, but no ECHO AI assistant and no bundled IDE. Tuned for daily-use efficiency.</li>
        <li><strong>Edge:</strong> CLI-only build for embedded and headless targets. No desktop at all. Includes the retrainable <strong>Navi Mini</strong> edge model and the built-in <code>files</code> command (file browser plus media viewer in the terminal).</li>
      </ul>
    ),
  },
  {
    q: 'Is it really built from scratch?',
    a: (
      <p>
        Yes. The kernel, the Eclipse Shell window server, the Rogex Nova browser engine, the video pipeline and the AI
        runtime are all engineered by Rogex Laboratories. EchOS is not a fork of Linux, BSD or any existing distribution
        — it is an independent codebase, and its source is available under GNU GPLv3.
      </p>
    ),
  },
  {
    q: 'How does ECHO work offline?',
    a: (
      <p>
        ECHO runs on the <strong>Navi 10</strong> model which ships inside the OS image itself. Inference happens
        locally: nothing leaves your machine, ever. On standard CPUs the runtime uses optimized kernels; when a BrainChip
        Akida NPU is present, inference is offloaded to it, dramatically reducing power draw. There is no cloud component
        and no fallback to remote APIs.
      </p>
    ),
  },
  {
    q: 'Does EchOS support NPUs like BrainChip Akida?',
    a: (
      <p>
        Yes. The kernel and driver stack include first-class support for neuromorphic processors, with BrainChip Akida as
        the reference platform. On Akida-equipped systems the Complete Edition routes Navi 10 inference through spiking
        neural cores. Standard CPU-only systems are fully supported too — the NPU simply accelerates things further.
      </p>
    ),
  },
  {
    q: 'How does the package system work? What is .rxp / rx-pkg?',
    a: (
      <p>
        EchOS uses its own package format: <code>.rxp</code> archives, managed by the <code>rx-pkg</code> command-line
        tool. Packages declare dependencies, signatures and install hooks; rx-pkg verifies checksums against signed
        manifests before anything touches your system. On Edge builds, rx-pkg works entirely offline against local
        repositories or removable media.
      </p>
    ),
  },
  {
    q: 'What license does EchOS use? Can I use it commercially?',
    a: (
      <p>
        EchOS is licensed under the <strong>GNU General Public License v3</strong>. You may use, study, modify and
        redistribute it — including commercially — provided you comply with GPLv3 terms: derivative works must remain
        free software under the same license and source must be offered. "Rogex Laboratories", "Knights Labs", "EchOS",
        "Rogex Nova", "Eclipse Shell" and "ECHO" remain trademarks of their respective owners; trademark use is separate
        from code licensing.
      </p>
    ),
  },
  {
    q: 'How can I contribute?',
    a: (
      <p>
        The official development repository lives at{' '}
        <a href="https://github.com/knightslabs/echos" target="_blank" rel="noopener noreferrer">github.com/knightslabs/echos ↗</a>.
        Fork the repo, branch from <code>main</code>, and open pull requests. Good first contributions include driver
        improvements, Edge target ports, documentation translations and bug reports with reproducible steps. All
        contributions are accepted under GPLv3.
      </p>
    ),
  },
  {
    q: 'Where do I get support?',
    a: (
      <ul>
        <li>
          <strong>GitHub Issues:</strong> bugs and feature requests at{' '}
          <a href="https://github.com/knightslabs/echos/issues" target="_blank" rel="noopener noreferrer">
            github.com/knightslabs/echos/issues ↗
          </a>.
        </li>
        <li>
          <strong>Email:</strong> write to <a href="mailto:knightsys@proton.me">knightsys@proton.me</a>. Rogex
          Laboratories is a one-person company, so please allow a few days for a reply.
        </li>
      </ul>
    ),
  },
  {
    q: 'Why the eclipse theme?',
    a: (
      <p>
        An eclipse is the moment a body becomes fully visible by blocking its own light source — a fitting metaphor for
        an OS that shows you exactly what runs on your hardware, with no hidden processes phoning home. It also looks
        great in pure CSS.
      </p>
    ),
  },
  {
    q: 'EchOS collects no data — really?',
    a: (
      <p>
        Really. EchOS is amnesic by default and contains zero telemetry. Read the full details in our{' '}
        <Link to="/privacy">Privacy Policy</Link>. This website likewise sets no tracking cookies.
      </p>
    ),
  },
];
