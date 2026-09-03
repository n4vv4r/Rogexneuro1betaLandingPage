export default function About() {
  return (
    <main className="page">
      <article className="sheet">
        <h1>RxLabs®</h1>
        <p>
          Laboratorio de software de Roger Navarro. 20 años. Girona, España.
        </p>
        <p>
          Tres líneas de trabajo, las tres ya en marcha.
        </p>
        <p>
          <strong>echOS</strong> — unikernel x86_64 de consola. Version 2.1.0-honest.
          Un ELF. Sin Linux. Sin escritorio. SNN in-kernel (LIF / Q6).
          Sonda PCI para Akida.
        </p>
        <p>
          <strong>PRISMA</strong> — software de análisis de EEG para
          investigación. Motor de tiempo real en Rust. Capa de análisis
          sobre MNE-Python. No es un producto sanitario.
        </p>
        <p>
          <strong>echoAI</strong> — agente de dos relojes. El rápido ve,
          recuerda, predice, actúa y aprende. El lento propone. CORTEX-1
          verde: un letrero en español ya mueve el cuerpo. El 4B se cuelga
          del mismo enchufe.
        </p>
        <p className="meta">knightsys@proton.me</p>
      </article>
    </main>
  );
}
