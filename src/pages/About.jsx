export default function About() {
  return (
    <main className="page">
      <article className="sheet">
        <h1>RxLabs®</h1>
        <p>
          Laboratorio de software de Roger Navarro. 20 años. Girona, España.
        </p>
        <p>
          Dos líneas de trabajo, las dos ya en marcha.
        </p>
        <p>
          <strong>echOS 2.1.0-honest</strong> — unikernel x86_64 de consola.
          Un ELF. Sin Linux. Sin escritorio. SNN in-kernel (LIF / Q6).
          Sonda PCI para Akida. No es un sistema comercial. No es un
          navegador.
        </p>
        <p>
          <strong>PRISMA</strong> — software de análisis de EEG para
          investigación. Motor de tiempo real en Rust. Capa de análisis
          sobre MNE-Python. No es un producto sanitario. No diagnostica,
          no trata, no predice ninguna condición.
        </p>
        <p className="meta">knightsys@proton.me</p>
      </article>
    </main>
  );
}
