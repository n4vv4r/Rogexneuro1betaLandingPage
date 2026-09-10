# El laboratori

Rogex Laboratories / RxLabs. Laboratori independent a Girona. Tres línies de
recerca, amb codi executable i límits publicats.

No hi ha cap binari que les uneixi. Comparteixen un mètode: camí calent petit,
esdeveniments en comptes de sondeig quan aporta valor, memòria acotada i cap
afirmació de maquinari que no sigui sobre la taula.

| Línia | Què és | Estat |
|---|---|---|
| **echOS** | Unikernel per a robòtica a l'edge | 3.0 tancat; x86_64 BIOS/UEFI i AArch64 UEFI |
| **PRISMA Engine** | EEG a esdeveniments, Rust i anàlisi reproduïble | Engine 0.1.0 mesurat; no és un producte sanitari |
| **echoAI** | Agent situat de dos rellotges | ECHO-1 i ECHO-2 tancats; ECHO-3 en disseny |

## On es toquen

echOS i echoAI no comparteixen procés: actualment echoAI s'executa en host i
no és dins de la ISO. echOS 3.0 publica un contracte acotat de sensors i
intencions que pot ser la unió futura sense posar un chatbot dins de l'OS.

PRISMA i echoAI tampoc no s'importen: l'un analitza un senyal continu; l'altre
aprèn a actuar en un món discret. Les tres línies continuen separades i només
es troben mitjançant contractes explícits.

## Estat d'echoAI

ECHO-1 integra memòria episòdica, política, model del món, cos, objectes,
operacions, llenguatge acotat, narració pòstuma, patrons temporals i
transferència. El seu tancament reprodueix 488 proves correctes, una fallada
esperada documentada i guanys de transferència de `+56` i `+72`.

ECHO-2 afegeix supervivència entre vides, patrons perceptius, streaming,
consolidació, herència i regulació conjunta d'energia i temperatura. El seu
monitor neuronal seleccionat conté 512 LIF + 128 Adaptive-LIF. ECHO-3 portarà
aquestes capacitats a tres mons 3D i a la robòtica a l'edge: primer simulació
i HIL; després càmera, LiDAR i un dron controlat per PX4/Pixhawk.

## Maquinari

No hi ha cap AKD1500 M.2 al laboratori. Akida apareix únicament com a sonda o
maquinari futur. Si s'hi incorpora, es publicaran mesures pròpies i no xifres
heretades d'un fullet.

— R.N.
