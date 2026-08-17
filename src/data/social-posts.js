/** Copy-ready posts. Counts are approximate (X = 280). Attach shots listed in `shot`. */

export const SOCIAL_POSTS = [
  {
    id: 'x-tech-9',
    net: 'x',
    audience: 'tech',
    title: 'rxOS 9 SMOKE — números',
    shot: 'Escritorio + Navi 7 (/rxos/9/14-mac-desktop-photos.jpg, /rxos/9/13-mac-navi-explorer.png)',
    text: `rxOS 9 SMOKE no es Linux recortado.

Unikernel x86_64. Dark Aero. NAVI 7-WORLD: 73 fichas, bench 15/15.
WSP = 16 B (_Static_assert).
7-NPU (Akida): PLAN. neurocpu akida se niega.

Si no hay ficha: DESCONOCIDO.

ISO v9.0.0 → rogexlaboratories.com/rx-os`,
  },
  {
    id: 'x-tech-85',
    net: 'x',
    audience: 'tech',
    title: '8.5 metal — julios, no datasheet',
    shot: 'HP RAPL + navi joules (/rxos/hp-ac195nl-85/02-power-rapl.jpg, 06-navi-joules.jpg)',
    text: `Cifras que no salieron de QEMU (QEMU se niega):

HP 15-ac195nl · i7-5500U · rxOS 8.5 metal · 17 ago 2026
idle pkg 3678 mW · cores 73 mW · MWAIT C7
Q6 burst 18554 µJ / 256 = 72.5 µJ/run RAPL pkg

Eso es CPU. No es J/NPU. Akida no está en el lab.

rogexlaboratories.com/docs/hp-metal-85`,
  },
  {
    id: 'x-tech-not-llm',
    net: 'x',
    audience: 'tech',
    title: 'NAVI no predice tokens',
    shot: 'Navi 7 + Explorer (/rxos/9/13-mac-navi-explorer.png)',
    text: `NAVI no es un LLM.

No hay KV-cache. No hay next-token.
Hay un router de máscaras G_* y un paquete de 16 bytes.

PARSE → RETRIEVE → INFER → VERIFY → RENDER.
Sin esquema: DESCONOCIDO.

Eso es más pobre que un loro. También es más difícil de falsificar.

rogexlaboratories.com/navi`,
  },
  {
    id: 'x-user-boot',
    net: 'x',
    audience: 'user',
    title: 'Arranca. Pulsa V.',
    shot: 'Escritorio QEMU Mac (/rxos/9/14-mac-desktop-photos.jpg)',
    text: `No te pedimos una cuenta.
No te pedimos una GPU.
No te pedimos que nos creas.

Bajas una ISO. Arranca. Pulsa V. Pregunta.

Si no sabe, lo dice.

Eso es rxOS 9.

rogexlaboratories.com/downloads`,
  },
  {
    id: 'x-user-desconocido',
    net: 'x',
    audience: 'user',
    title: 'La palabra más honesta',
    shot: 'Ventana Navi 7',
    text: `La palabra más rara en un asistente es DESCONOCIDO.

rxOS 9 la imprime cuando no tiene ficha.
No rellena. No adivina. No te da una receta inventada.

Es menos mágico. Es más de fiar.

Eso queremos que sea hablar con una máquina.`,
  },
  {
    id: 'x-user-here',
    net: 'x',
    audience: 'user',
    title: 'Dónde estamos, en cristiano',
    shot: 'Línea de tiempo /roadmap',
    text: `Dónde estamos, sin teatro:

Tenemos un sistema que arranca y un compañero que, si no sabe, lo dice.
Lo medimos en un portátil de verdad.
La siguiente versión ya se puede bajar (se llama 9, el escritorio es negro).

El eclipse —cuando sistema y mente coincidan en el 10— todavía no llegó.

Mapa: rogexlaboratories.com/roadmap`,
  },
  {
    id: 'x-vision-eclipse',
    net: 'x',
    audience: 'vision',
    title: 'Hilo: El Eclipse',
    shot: 'NAVI 7 QEMU Mac (/rxos/9/13-mac-navi-explorer.png)',
    thread: true,
    parts: [
      `1/ El eclipse no es un logo.

Es el día en que NAVI y rxOS lleguen los dos al 10.
Dos órbitas. Un cruce. Ahí se acaba el nombre de laboratorio.

Hoy estamos en 6.5/8.5 (medido) y 7/9 (SMOKE).
El mapa: rogexlaboratories.com/roadmap`,
      `2/ Después del cruce, el lab se llama Eternal Eclipse.

No borra Knights Computer Club.
El club es la plaza.
La logia es el taller: I+D, aceleración, vanguardia.

rogexlaboratories.com sigue hasta ese día.`,
      `3/ Más allá: EchOS.

Una sola ISO. Sistema + mente + puerta a Internet.
Dejas de “abrir Navi”. Hablas con Echo.

Eso no existe. Se cuenta para no fingir que el destino es un misterio.`,
    ],
  },
  {
    id: 'x-vision-one',
    net: 'x',
    audience: 'vision',
    title: '10 + 10',
    shot: 'GRUB eclipse',
    text: `6.5/8 → 7/9 → 8/9 → 9/10 → 10/10.

El último par se llama Eclipse.
Ahí rogexlaboratories.com se convierte en EternalEclipse.com.
Ahí el club gana una logia.
Más tarde, un solo sistema: EchOS.

Hoy: ISO 9. Julios de un 8.5. Cero placas NPU.

rogexlaboratories.com/roadmap`,
  },
  {
    id: 'li-tech-9',
    net: 'linkedin',
    audience: 'tech',
    title: 'Specs: qué es (y no es) rxOS 9',
    shot: 'Desktop 9 + Navi 7 + tabla /roadmap',
    text: `rxOS 9 SMOKE — nota de ingeniería, no de lanzamiento teatral.

Qué es
• Unikernel x86_64 (C freestanding + NASM + Rust no_std). No es Linux recortado.
• Escritorio Dark Aero. Apps: Ajustes, Terminal, Explorer, Photos, Neuro, Navi 7.
• NAVI 7-WORLD: catálogo de 73 fichas + harvest HTTP. Bench 15/15. Debajo sigue el contrato RLC 6.5 (once máscaras G_*, bucle PARSE-RETRIEVE-INFER-VERIFY-RENDER).
• WSP = 16 bytes exactos. Pesos NAVI3 = 474 560 B, heap del modelo = 0.

Qué no es
• No es un LLM. No predice el siguiente token.
• No es 7-NPU. No hay Akida en el laboratorio. El hook neurocpu akida se niega a propósito.
• No es producción, no está auditado, no es clínico.

La última línea medida en metal sigue siendo rxOS 8.5 + NAVI 6.5 en un HP 15-ac195nl (i7-5500U): idle 3678 mW de paquete, 72.5 µJ/run Q6 RAPL. QEMU no publica julios: se niega.

ISO v9.0.0 (VM + metal) y el mapa honesto de lo que viene — incluido lo que todavía no existe — en:
https://www.rogexlaboratories.com/roadmap`,
  },
  {
    id: 'li-tech-here',
    net: 'linkedin',
    audience: 'tech',
    title: 'Roadmap de parejas, no de fechas',
    shot: 'Timeline interactiva',
    text: `Publicamos una hoja de ruta de parejas de versión, no de calendario.

NAVI 6.5 + rxOS 8.5 — hecho y medido en metal.
NAVI 7-WORLD + rxOS 9 SMOKE — ISO viva. El NPU no.
NAVI 8 + rxOS 9 — plan. Sin spec de código.
NAVI 9 + rxOS 10 — plan / visión.
NAVI 10 + rxOS 10 — el Eclipse. Visión. Único hito que autoriza el rebrand.

Después: EternalEclipse.com como logia de I+D sobre Knights Computer Club.
Después: EchOS = una ISO (sistema + modelo + API a Internet). El usuario habla con Echo.

NAVI 8/9/10 no tienen rama. EternalEclipse.com no es la marca viva. EchOS no tiene artefacto. Se dice en voz alta para que nadie tenga que adivinar si estamos mintiendo con el 10.

Cianotipo técnico (Akida, USB, energía CPU vs NPU) aparte. Este papel es el contrato de alineación.

https://www.rogexlaboratories.com/roadmap
https://www.rogexlaboratories.com/docs/eternal-eclipse`,
  },
  {
    id: 'li-user-9',
    net: 'linkedin',
    audience: 'user',
    title: 'Un sistema que se niega a inventar',
    shot: 'Escritorio 9 + “DESCONOCIDO”',
    text: `La mayoría de las IAs actuales hacen una cosa muy bien: no callarse.

rxOS 9 hace lo contrario. Arrancas un sistema operativo pequeño, pulsas una tecla, preguntas, y si no tiene ficha escribe DESCONOCIDO. No te inventa una receta. No te finge una cita. No te pide una cuenta de la nube.

No es Windows. No es ChatGPT. Es un laboratorio independiente (Knights Labs / Rogex) que publica el binario, el código y también lo que le falta: no hay chip neuromórfico en la mesa, no hay fecha mágica, no hay uso clínico.

Si te interesa un futuro donde hablar con la máquina no sea hablar con un loro, el mapa está aquí — incluido el rebrand a largo plazo, con nombre y todo, y con la etiqueta VISIÓN bien grande:

https://www.rogexlaboratories.com/roadmap`,
  },
  {
    id: 'li-user-eclipse',
    net: 'linkedin',
    audience: 'user',
    title: 'Por qué un eclipse',
    shot: 'GRUB eclipse',
    text: `Hay una imagen que nos sirve mejor que un eslogan.

Durante años el sistema operativo y la inteligencia van a tener números distintos. 6.5 con 8. 7 con 9. 8 con 9. 9 con 10. El día en que los dos lleguen al 10, se alinean. Eso es un eclipse: no desaparece nada, se cubren el uno al otro y se ve otra cosa.

Ese día el laboratorio (rogexlaboratories.com) pasa a llamarse Eternal Eclipse: la logia de investigación dentro de Knights Computer Club. El club no se cierra. Gana un taller.

Más tarde, si el cruce se sostiene, deja de haber dos productos. Hay uno: EchOS. Hablas con Echo. El sistema es la voz.

Hoy no estamos ahí. Hoy hay una ISO negra que puedes arrancar y un portátil viejo que ya nos dio julios. El resto es el mapa, no el territorio.

https://www.rogexlaboratories.com/roadmap`,
  },
  {
    id: 'li-en-tech',
    net: 'linkedin',
    audience: 'tech',
    lang: 'en',
    title: 'EN — pairing roadmap, not a calendar',
    shot: 'Timeline + GRUB eclipse',
    text: `A public pairing roadmap — not a ship date.

What you can boot today
• rxOS 9 SMOKE: x86_64 unikernel, Dark Aero desktop, NAVI 7-WORLD (73 cards, 15/15 bench). Not an LLM. Unknown if no card.
• Last energy-measured line is still rxOS 8.5 + NAVI 6.5 on a 2015 HP laptop: 3678 mW idle package, 72.5 µJ/run Q6 (RAPL). QEMU refuses to invent joules.

What you cannot boot
• NAVI 7-NPU (Akida): planned. Zero boards in the lab. The hook declines on purpose.
• NAVI 8 / 9 / 10: names on a map, no branches.
• EternalEclipse.com as a live brand, and EchOS as a unified ISO: vision.

The alignment story
6.5/8 → 7/9 → 8/9 → 9/10 → 10/10 (the Eclipse). Only 10+10 authorizes the lab-to-lodge rebrand. After that, EchOS would be one artifact (OS + model + internet API) and you would talk to Echo, not to a sidecar chatbot.

We published the pin on the timeline so nobody has to guess whether we are pretending to be at 10.

https://www.rogexlaboratories.com/roadmap`,
  },
  {
    id: 'li-en-user',
    net: 'linkedin',
    audience: 'user',
    lang: 'en',
    title: 'EN — a computer that will say it does not know',
    shot: 'Desktop 9',
    text: `Most software that calls itself intelligent is allergic to the sentence “I don’t know.”

rxOS 9 is a small operating system you can boot. Press V. Ask. If it has no card, it prints DESCONOCIDO. That is the feature.

It is not Windows. It is not ChatGPT. It is not a medical device. It will not book you a GPU. The lab (Knights / Rogex) also published where this is going — including a future name, Eternal Eclipse, and a future single system, EchOS — clearly marked as vision.

If you like machines that refuse to bluff, the map is public.

https://www.rogexlaboratories.com/roadmap`,
  },
];

export const POST_FILTERS = [
  { id: 'all', label: 'TODOS' },
  { id: 'x', label: 'X' },
  { id: 'linkedin', label: 'LINKEDIN' },
  { id: 'tech', label: 'INGENIERÍA' },
  { id: 'user', label: 'USUARIOS' },
  { id: 'vision', label: 'VISIÓN' },
];
