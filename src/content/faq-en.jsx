import { Link } from 'react-router-dom';

export const faqEn = [
  {
    q: 'What is echOS 2.0?',
    a: (
      <p>
        A bare-metal x86_64 unikernel from Rogex Laboratories. One Heap-0 kernel, a console (Liberation Mono), local
        <code> epk</code>, no window manager on this line. Formerly rxOS. The public product is{' '}
        <strong>echOS 2.0 Universal</strong>. 1.0 Eclipse (desktop) is documented, not the download.
      </p>
    ),
  },
  {
    q: 'Why is there nothing to download?',
    a: (
      <p>
        The ISO is held until a BrainChip AKD1000 has been seated and measured in this lab — power, latency, sparsity,
        Heap-0 drift, public EEG sets. QEMU captures are not a release. See{' '}
        <Link to="/validation">Validation</Link> and <Link to="/downloads">Downloads</Link>.
      </p>
    ),
  },
  {
    q: 'Where did Complete / Minimal / Edge go?',
    a: (
      <p>
        They are install-time manifests on the same Universal ELF, not four storefronts.{' '}
        <Link to="/docs/editions">Docs → Editions</Link>. 1.0 desktop flags are the older line.
      </p>
    ),
  },
  {
    q: 'Is it Linux?',
    a: (
      <p>
        No. GRUB loads one ELF. No systemd, no apt, no Wi-Fi driver. Ethernet NICs we actually probe: virtio-net, e1000,
        Realtek 810/8139.
      </p>
    ),
  },
  {
    q: 'Does it support BrainChip Akida?',
    a: (
      <p>
        PCI <code>1e7c:bca1</code> is probed. No board → software LIF, and we say so. We do not paint a ghost NPU.
        Publication of the ISO is gated on measuring a real AKD1000.
      </p>
    ),
  },
  {
    q: 'How do packages work?',
    a: (
      <p>
        <code>epk</code> is local only. The catalogue rides in the ISO. It never opens a socket.{' '}
        <Link to="/docs/epk">Docs → epk</Link>.
      </p>
    ),
  },
  {
    q: 'Licence?',
    a: (
      <p>
        GNU GPLv3. Rogex Laboratories, Knights Labs, echOS, ECHO are marks; the code licence is separate.
      </p>
    ),
  },
];
