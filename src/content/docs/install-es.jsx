import { Link } from 'react-router-dom';
// Docs — Guía de instalación (ES)
export const blocks = [
  {
    h2: '1. Elige una edición',
    body: (
      <p>
        Ve a <Link to="/downloads">Descargas</Link> y elige Complete, Minimal o Edge. Las ISO bare-metal son para PCs
        físicos; las ISO <code>-vm</code> están afinadas para máquinas virtuales. También hay imagen USB comprimida (
        <code>.img.gz</code>) para flashear un pendrive arrancable.
      </p>
    ),
  },
  {
    h2: '2. Verifica el checksum',
    body: (
      <>
        <p>
          La página de descargas lista los digests SHA256, y <code>SHA256SUMS.txt</code> viaja con cada release.
          Compara antes de flashear:
        </p>
        <pre><code>{`sha256sum EchOS-1.0.0-complete-metal.iso
# compáralo con el digest publicado`}</code></pre>
      </>
    ),
  },
  {
    h2: '3a. Flashea la imagen USB',
    body: (
      <>
        <p>Descomprime y escribe la imagen USB en tu unidad (sustituye sdX por tu dispositivo):</p>
        <pre><code>{`gunzip EchOS-1.0.0-usb.img.gz
sudo dd if=EchOS-1.0.0-usb.img of=/dev/sdX bs=4M status=progress conv=fsync`}</code></pre>
        <p>
          Comprueba dos veces el dispositivo de destino — dd lo sobrescribe sin preguntar. Haz copia de seguridad
          primero; consulta el <Link to="/legal">Aviso Legal</Link> para el descargo de responsabilidad.
        </p>
      </>
    ),
  },
  {
    h2: '3b. O arranca en una máquina virtual',
    body: (
      <>
        <p>Con QEMU:</p>
        <pre><code>{`qemu-system-x86_64 -m 2048 -cdrom EchOS-1.0.0-complete-vm.iso`}</code></pre>
        <p>
          El menú GRUB mostrará la entrada <strong>EchOS 1.0 ECLIPSE</strong> — selecciónala y el escritorio Eclipse
          Shell debería aparecer en menos de un minuto en hardware soportado.
        </p>
      </>
    ),
  },
  {
    h2: '4. Tras el primer arranque',
    body: (
      <>
        <ul>
          <li>Abre <strong>Ajustes</strong> para revisar drivers y configuración de pantalla.</li>
          <li>En Complete, saluda a ECHO desde el dock.</li>
          <li>Instala software con <code>rx-pkg install &lt;nombre&gt;</code> — véase <Link to="/docs/packages">Paquetes</Link>.</li>
        </ul>
      </>
    ),
  },
];
