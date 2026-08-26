import { Link } from 'react-router-dom';

export const faqEs = [
  {
    q: '¿Qué es echOS 2.0?',
    a: (
      <p>
        Un unikernel x86_64 bare-metal de Rogex Laboratories. Un kernel Heap-0, consola (Liberation Mono),
        <code> epk</code> local, sin gestor de ventanas en esta línea. Antes rxOS. El producto público es{' '}
        <strong>echOS 2.0 Universal</strong>. 1.0 Eclipse (escritorio) está documentado, no es la descarga.
      </p>
    ),
  },
  {
    q: '¿Por qué no hay nada que descargar?',
    a: (
      <p>
        La ISO se retiene hasta sentar y medir un BrainChip AKD1000 en este laboratorio — potencia, latencia, dispersión,
        deriva Heap-0, EEG público. Una captura de QEMU no es un release. Ver{' '}
        <Link to="/validation">Validación</Link> y <Link to="/downloads">Descargas</Link>.
      </p>
    ),
  },
  {
    q: '¿Dónde están Complete / Minimal / Edge?',
    a: (
      <p>
        Son manifiestos de instalación sobre el mismo ELF Universal, no cuatro escaparates.{' '}
        <Link to="/docs/editions">Docs → Ediciones</Link>. Los flags de escritorio 1.0 son la línea anterior.
      </p>
    ),
  },
  {
    q: '¿Es Linux?',
    a: (
      <p>
        No. GRUB carga un ELF. Sin systemd, sin apt, sin driver Wi-Fi. NICs que sí sondamos: virtio-net, e1000, Realtek
        810/8139.
      </p>
    ),
  },
  {
    q: '¿Soporta BrainChip Akida?',
    a: (
      <p>
        El PCI <code>1e7c:bca1</code> se sonda. Sin placa → LIF software, y se dice. No pintamos un NPU fantasma. La
        publicación de la ISO está atada a medir un AKD1000 de verdad.
      </p>
    ),
  },
  {
    q: '¿Cómo van los paquetes?',
    a: (
      <p>
        <code>epk</code> es solo local. El catálogo viaja en la ISO. Nunca abre un socket.{' '}
        <Link to="/docs/epk">Docs → epk</Link>.
      </p>
    ),
  },
  {
    q: '¿Licencia?',
    a: (
      <p>
        GNU GPLv3. Rogex Laboratories, Knights Labs, echOS, ECHO son marcas; la licencia del código va aparte.
      </p>
    ),
  },
];
