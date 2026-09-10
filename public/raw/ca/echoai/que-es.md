# echoAI

echoAI és un agent situat de dos rellotges. No és un chatbot ni un model de
llenguatge amb eines.

El rellotge ràpid percep, recorda, prediu, actua i aprèn fent servir taules i
enters. El rellotge lent, quan es connecta, pot llegir llenguatge i proposar una
hipòtesi. El gate conserva l'última paraula i cap proposta del còrtex no es
converteix per si sola en un fet.

```text
percebre → recordar → predir → actuar → conseqüència → aprendre
                                      ↑
                       hipòtesi lenta, només quan ATTEND la demana
```

## Estat actual

**ECHO-1 va quedar tancat el 5 de setembre de 2026 i ECHO-2 el 9 de setembre
de 2026.** La suite canònica d'ECHO-1 acaba amb 488 proves correctes i un
`expectedFailure` explícit: WALK-1 sense la resta
entera opt-in. No s'amaga com a verd.

ECHO-1 demostra que el mateix animal:

- conserva CAM, Q, T i PatternMemory quan travessa mons;
- distingeix els canvis propis dels canvis de l'entorn;
- aprèn a transportar un objecte i a obrir un recipient;
- desperta el còrtex després d'una contradicció coneguda, no abans;
- narra el que ha passat sense que la narració pugui modificar l'animal;
- aprèn una regularitat temporal que la T d'un pas no pot representar;
- obté un avantatge causal davant de controls nous o només envellits.

El tancament de transferència fa servir tres mons. A les dues fronteres
mesurades, l'animal transferit obté `208 vs 152` (`+56`) i `224 vs 152` (`+72`).
El guany agregat és `+128`. No hi intervenen cap LLM ni etiquetes humanes.

ECHO-2 conserva aquest nucli i afegeix supervivència entre vides,
generalització de patrons, flux continu, consolidació, herència d'una
predisposició i regulació conjunta d'energia i temperatura. CAPACITY-1 va
seleccionar un monitor de 512 LIF + 128 Adaptive-LIF: 2.048/2.048 signatures
perceptives i 256/256 seqüències temporals. [Tancament, gràfiques i vídeo
d'ECHO-2](./echo2).

## Tres canals que no es barregen

| Canal | Pregunta | On viu |
|---|---|---|
| Representació | què passa? | WSP de 16 bytes |
| Epistemologia | ho sé? | CAM + VERIFY + extracte |
| Control | què faig? | Q + gate |

CAM registra el que ha passat. Q aprèn què convé fer. T prediu el resultat
d'una acció. Que una frase soni convincent no canvia cap d'aquests contractes.

## Xifres que es poden tornar a mesurar

| Banc | Resultat |
|---|---|
| Anell, política apresa davant d'una amenaça | `[-12, +5, 0]` |
| Preguntar davant de no preguntar | `+80` davant de `-80` |
| ATTEND amb el còrtex habilitat | 36 despertars de 256 torns |
| SIGN-C, decisió que el ràpid no resolia | còrtex `+16`, ràpid `0` |
| TALK-1 | 496/496 clàusules; 256/256 registres |
| PATTERN-0 | 80/80 davant de T 40/80 |
| XFER-1 | `+56` i `+72` en fronteres independents |
| Fets falsos / ranures destruïdes | `0 / 0` |

L'execució principal manté el còrtex apagat. Qwen3-4B es va provar a part,
localment i quantitzat, darrere del mateix connector i d'una gramàtica de
sortida. A SIGN-C va resoldre els dos exemples canònics, 4 de 6 paràfrasis que
l'stub no resolia i va produir `CortexROI +16`; dues amenaces no canòniques
errònies queden registrades com a deute de seguretat, no amagades.

## Què significa i què no

És evidència de memòria, control, predicció, composició i transferència en mons
sintètics. Encara no és un robot, no demostra percepció visual i no autoritza a
posar un model generatiu en el control de motors.

ECHO-3 portarà el contracte tancat d'ECHO-2 a tres mons 3D, sensors, dinàmica
de vol, PX4 i finalment un cos físic a l'edge.

— R.N.
