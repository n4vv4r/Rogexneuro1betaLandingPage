import { Link } from 'react-router-dom';
// Docs — Editions (EN)
export const blocks = [
  {
    h2: 'One codebase, three shapes',
    body: (
      <p>
        Every EchOS edition is built from the same source tree and shares the kernel, drivers and update tooling. They
        differ only in what gets packaged into the final image.
      </p>
    ),
  },
  {
    h2: 'Complete',
    body: (
      <>
        <p>The flagship edition. Includes:</p>
        <ul>
          <li>Full Eclipse Shell desktop with dock.</li>
          <li>Rogex Nova browser.</li>
          <li>ECHO assistant on Navi 10 — fully offline.</li>
          <li>Native IDE with the EchOS SDK.</li>
          <li>Video & image viewers, multimedia stack.</li>
          <li>CPU or BrainChip Akida NPU inference.</li>
        </ul>
        <p>Target: x86_64 desktops and laptops, 4 GB RAM minimum recommended (8 GB comfortable).</p>
      </>
    ),
  },
  {
    h2: 'Minimal',
    body: (
      <>
        <p>Daily-use efficiency edition:</p>
        <ul>
          <li>Identical desktop environment and driver set as Complete.</li>
          <li>No ECHO AI assistant.</li>
          <li>No bundled IDE.</li>
          <li>Tuned for responsiveness on everyday hardware.</li>
        </ul>
        <p>Target: x86_64 desktops and laptops with 4 GB RAM.</p>
      </>
    ),
  },
  {
    h2: 'Edge',
    body: (
      <>
        <p>CLI-only build for embedded and headless targets:</p>
        <ul>
          <li>No desktop; serial/SSH-first workflow.</li>
          <li>Navi Mini — retrainable on-device edge model.</li>
          <li>Built-in <code>files</code> command: file browser + media viewer inside the terminal.</li>
          <li>Runs in as little as 256 MB RAM depending on target.</li>
        </ul>
        <p>
          Targets: IoT boards, robotics platforms, drones and cameras. See{' '}
          <Link to="/downloads">Downloads</Link> for the exact images available per edition.
        </p>
      </>
    ),
  },
];
