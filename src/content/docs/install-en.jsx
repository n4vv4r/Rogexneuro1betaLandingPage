import { Link } from 'react-router-dom';
// Docs — Install guide (EN)
export const blocks = [
  {
    h2: '1. Pick an edition',
    body: (
      <p>
        Head to <Link to="/downloads">Downloads</Link> and choose Complete, Minimal or Edge. Bare-metal ISOs are for
        physical PCs; the <code>-vm</code> ISOs are tuned for virtual machines. There is also a compressed USB image
        (<code>.img.gz</code>) for flashing a bootable stick.
      </p>
    ),
  },
  {
    h2: '2. Verify the checksum',
    body: (
      <>
        <p>
          Every download page lists SHA256 digests, and <code>SHA256SUMS.txt</code> ships with each release. Compare
          before you flash:
        </p>
        <pre><code>{`sha256sum EchOS-1.0.0-complete-metal.iso
# compare against the published digest`}</code></pre>
      </>
    ),
  },
  {
    h2: '3a. Flash the USB image',
    body: (
      <>
        <p>Decompress and write the USB image to your drive (replace sdX with your device):</p>
        <pre><code>{`gunzip EchOS-1.0.0-usb.img.gz
sudo dd if=EchOS-1.0.0-usb.img of=/dev/sdX bs=4M status=progress conv=fsync`}</code></pre>
        <p>
          Double-check the target device — dd overwrites it without asking. Back up your data first; see the{' '}
          <Link to="/legal">Legal Notice</Link> for the liability disclaimer.
        </p>
      </>
    ),
  },
  {
    h2: '3b. Or boot in a virtual machine',
    body: (
      <>
        <p>With QEMU:</p>
        <pre><code>{`qemu-system-x86_64 -m 2048 -cdrom EchOS-1.0.0-complete-vm.iso`}</code></pre>
        <p>
          The GRUB menu will show an <strong>EchOS 1.0 ECLIPSE</strong> entry — select it and the Eclipse Shell desktop
          should come up within a minute on supported hardware.
        </p>
      </>
    ),
  },
  {
    h2: '4. After first boot',
    body: (
      <>
        <ul>
          <li>Open <strong>Ajustes</strong> to review drivers and display configuration.</li>
          <li>On Complete, say hello to ECHO from the dock.</li>
          <li>Install software with <code>rx-pkg install &lt;name&gt;</code> — see <Link to="/docs/packages">Packages</Link>.</li>
        </ul>
      </>
    ),
  },
];
