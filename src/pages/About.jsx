const COPY = {
  es: {
    intro: "Laboratorio de software de Roger Navarro. 20 años. Girona, España.",
    lines: "Tres líneas de trabajo, las tres ya en marcha.",
    echos: "unikernel 3.0 para robótica al edge. Arranca en x86_64 BIOS/UEFI y AArch64 UEFI. Runtime sensor→intención sin reservas dinámicas, safety gate y puente PX4. Sin Linux, chatbot, LLM o SLM.",
    prisma: "software de análisis de EEG para investigación. Motor de tiempo real en Rust. Capa de análisis sobre MNE-Python. No es un producto sanitario.",
    echoai: "agente de dos relojes. El rápido ve, recuerda, predice, actúa y aprende. El lento propone. ECHO-1 está cerrado: objetos, operaciones, conflicto, narración, patrones y transferencia entre tres mundos. Siguiente: supervivencia autónoma y robótica al edge.",
  },
  en: {
    intro: "Roger Navarro's software laboratory. Age 20. Girona, Spain.",
    lines: "Three lines of work, all three already under way.",
    echos: "3.0 robotic edge unikernel. Boots on x86_64 BIOS/UEFI and AArch64 UEFI. Allocation-free sensor-to-intent runtime, safety gate and PX4 bridge. No Linux, chatbot, LLM or SLM.",
    prisma: "EEG analysis software for research. Real-time engine in Rust. Analysis layer built on MNE-Python. Not a medical device.",
    echoai: "two-clock situated agent. The fast clock sees, remembers, predicts, acts and learns. The slow clock proposes. ECHO-1 is closed: objects, operations, conflict, narration, patterns and transfer across three worlds. Next: autonomous survival and edge robotics.",
  },
  ca: {
    intro: "Laboratori de programari de Roger Navarro. 20 anys. Girona, Catalunya.",
    lines: "Tres línies de treball, totes tres ja en marxa.",
    echos: "unikernel 3.0 per a robòtica a l'edge. Arrenca en x86_64 BIOS/UEFI i AArch64 UEFI. Runtime sensor→intenció sense reserves dinàmiques, safety gate i pont PX4. Sense Linux, chatbot, LLM o SLM.",
    prisma: "programari d'anàlisi d'EEG per a recerca. Motor de temps real en Rust. Capa d'anàlisi sobre MNE-Python. No és un producte sanitari.",
    echoai: "agent situat de dos rellotges. El ràpid veu, recorda, prediu, actua i aprèn. El lent proposa. ECHO-1 està tancat: objectes, operacions, conflicte, narració, patrons i transferència entre tres mons. Següent: supervivència autònoma i robòtica a l'edge.",
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
