import { Link } from 'react-router-dom';
// Docs — Packages (EN)
export const blocks = [
  {
    h2: 'The .rxp package format',
    body: (
      <p>
        EchOS uses its own package format: <code>.rxp</code> archives. An .rxp file bundles the package payload, a
        dependency manifest, a cryptographic signature and optional install hooks (pre/post scripts executed in a
        restricted sandbox).
      </p>
    ),
  },
  {
    h2: 'rx-pkg — the package manager',
    body: (
      <>
        <p><code>rx-pkg</code> is the command-line tool that manages the full package lifecycle:</p>
        <ul>
          <li><code>rx-pkg install &lt;name&gt;</code> — resolve, verify and install a package.</li>
          <li><code>rx-pkg remove &lt;name&gt;</code> — uninstall and reclaim space.</li>
          <li><code>rx-pkg search &lt;term&gt;</code> — query local or configured repositories.</li>
          <li><code>rx-pkg verify</code> — re-check installed files against signed manifests.</li>
          <li><code>rx-pkg list</code> — inventory everything installed on the system.</li>
        </ul>
        <p>
          Before anything touches your system, rx-pkg validates checksums against signed manifests. A failed signature
          check aborts the install with no partial writes.
        </p>
      </>
    ),
  },
  {
    h2: 'Offline-first repositories',
    body: (
      <p>
        On Edge builds, rx-pkg works entirely offline: point it at a local repository directory or removable media and
        it will resolve dependencies from there. Desktop editions can additionally use network repositories when you
        connect — never automatically.
      </p>
    ),
  },
  {
    h2: 'Core tools',
    body: (
      <>
        <p>Beyond rx-pkg, every edition ships a small set of core tools:</p>
        <ul>
          <li><code>files</code> — terminal file browser + media viewer (the only file interface on Edge).</li>
          <li><code>settings</code> — system settings CLI; desktop editions expose the same engine as the Ajustes app.</li>
          <li><code>explorer</code> — graphical File Explorer over the RXFS vault (Complete/Minimal).</li>
          <li><code>echo</code> — talk to the assistant from any terminal.</li>
        </ul>
      </>
    ),
  },
];
