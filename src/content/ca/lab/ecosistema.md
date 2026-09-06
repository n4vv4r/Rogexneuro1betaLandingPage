# El laboratori

Rogex Laboratories / RxLabs. Laboratori independent a Girona. Tres línies de
recerca, amb codi executable i límits publicats.

No hi ha cap binari que les uneixi. Comparteixen un mètode: camí calent petit,
esdeveniments en comptes de sondeig quan aporta valor, memòria acotada i cap
afirmació de maquinari que no sigui sobre la taula.

| Línia | Què és | Estat |
|---|---|---|
| **echOS** | Unikernel x86_64 de consola, un ELF | 2.1.0-honest; arrenca en QEMU i en metall |
| **PRISMA Engine** | EEG a esdeveniments, Rust i anàlisi reproduïble | Engine 0.1.0 mesurat; no és un producte sanitari |
| **echoAI** | Agent situat de dos rellotges | ECHO-1 tancat; ECHO-2 en disseny |

## On es toquen

echOS i echoAI comparteixen el contracte **WSP de 16 bytes**. No comparteixen
procés: actualment echoAI s'executa en host i no és dins de la ISO.

PRISMA i echOS fan servir el vocabulari d'una futura sonda neuromòrfica. PRISMA
i echoAI no s'importen: l'un analitza un senyal continu; l'altre aprèn a actuar
en un món discret.

## Estat d'echoAI

ECHO-1 integra memòria episòdica, política, model del món, cos, objectes,
operacions, llenguatge acotat, narració pòstuma, patrons temporals i
transferència. El seu tancament reprodueix 488 proves correctes, una fallada
esperada documentada i guanys de transferència de `+56` i `+72`.

ECHO-2 està planificat per al reconeixement d'objectes, l'homeòstasi i la
supervivència entre vides. ECHO-3 traslladarà aquestes capacitats a la robòtica
a l'edge: primer simulació i HIL; després càmera, LiDAR i un dron controlat per
PX4/Pixhawk.

## Maquinari

No hi ha cap AKD1000 al laboratori. Akida apareix únicament com a sonda, stub o
maquinari futur. Si s'hi incorpora, es publicaran mesures pròpies i no xifres
heretades d'un fullet.

— R.N.
