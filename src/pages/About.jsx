const COPY = {
  es: {
    intro: "Laboratorio de software de Roger Navarro. 20 años. Girona, España.",
    lines: "Tres líneas de trabajo, las tres ya en marcha.",
    echos: "unikernel x86_64 de consola. Versión 2.1.0-honest. Un ELF. Sin Linux. Sin escritorio. SNN in-kernel (LIF / Q6). Sonda PCI para Akida.",
    prisma: "software de análisis de EEG para investigación. Motor de tiempo real en Rust. Capa de análisis sobre MNE-Python. No es un producto sanitario.",
    echoai: "agente de dos relojes. El rápido ve, recuerda, predice, actúa y aprende. El lento propone. ECHO-1 está cerrado: objetos, operaciones, conflicto, narración, patrones y transferencia entre tres mundos. Siguiente: supervivencia autónoma y robótica al edge.",
  },
  en: {
    intro: "Roger Navarro's software laboratory. Age 20. Girona, Spain.",
    lines: "Three lines of work, all three already under way.",
    echos: "x86_64 console unikernel. Version 2.1.0-honest. One ELF. No Linux. No desktop. In-kernel SNN (LIF / Q6). PCI probe for Akida.",
    prisma: "EEG analysis software for research. Real-time engine in Rust. Analysis layer built on MNE-Python. Not a medical device.",
    echoai: "two-clock situated agent. The fast clock sees, remembers, predicts, acts and learns. The slow clock proposes. ECHO-1 is closed: objects, operations, conflict, narration, patterns and transfer across three worlds. Next: autonomous survival and edge robotics.",
  },
};

export default function About({ language = "es" }) {
  const copy = COPY[language];
  return (
    <main className="page">
      <article className="sheet">
        <h1>RxLabs®</h1>
        <p>
          {copy.intro}
        </p>
        <p>
          {copy.lines}
        </p>
        <p>
          <strong>echOS</strong> — {copy.echos}
        </p>
        <p>
          <strong>PRISMA</strong> — {copy.prisma}
        </p>
        <p>
          <strong>echoAI</strong> — {copy.echoai}
        </p>
        <p className="meta">knightsys@proton.me</p>
      </article>
    </main>
  );
}
