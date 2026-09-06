# ECHO-1 — tancament

ECHO-1 és la primera integració completa de l'animal. No és una puntuació
única: és una cadena de capacitats en què cada pas conserva els cadenats
anteriors.

```text
SELF-1 → ROOM-1 → GUI-3 → GUI-3.5 → OBJ-1 → OPEN-1
       → SIGN-C → TALK-1 → PATTERN-0 → XFER-1
```

## Base situada

Abans d'ECHO-1 es van tancar l'anell d'aprenentatge, la pregunta externa,
ATTEND, el model T, el gate, el cos 2D, el crèdit enter, el cub 3D i
l'atribució entre moviment propi i moviment del món.

El banc principal continua funcionant sense còrtex i sense maquinari
neuromòrfic. Els seus cadenats continuen sent WSP de 16 bytes, CAM de 4.096
ranures, tres accions per defecte, `destroyed=0`, `false_facts=0` i zero crides
al còrtex.

## Cadena de capacitats

| Slice | Què hi va afegir | Evidència de tancament |
|---|---|---|
| SELF-1 | jo davant del moviment del món | offset motor 1 davant de 0; T 56 davant de 46 |
| ROOM-1 | dues habitacions i frame extern | 324 llocs, 162 paquets, transferència 64 davant de 0 |
| GUI-3.5 | volum 3D i diari viu | 27 posicions × 6 orientacions; `--live` no atura l'animal |
| OBJ-1b | transportar X fins a Y | 51 lliuraments; control 0; deixar l'objecte no cobra |
| OPEN-1 | operació física nova | 46 lliuraments, 47 obertures; control de tres accions 0 |
| SIGN-C | una contradicció coneguda desperta llenguatge | una crida; proposta al torn següent; ROI `+16` |
| TALK-1c | narració pòstuma independent | 496/496 clàusules; 256/256 registres; zero escriptures causals |
| PATTERN-0b | regularitat contextual | 80/80 davant de T 40/80; examen congelat |
| XFER-1d | el mateix animal en tres mons | guanys `+56` i `+72`; agregat `+128` |

## SIGN-C i el model local

La contradicció només existeix després d'actuar: T prediu un successor i el món
en lliura un altre. L'origen tenia una predicció coneguda, prou marge de
política i un cartell real; aleshores s'arma un latch d'un torn. Al torn següent
es consumeix la proposta sense afirmar que l'atenció continua encesa.

L'stub determinista demostra el cable a CI. Una execució separada amb
Qwen3-4B-Instruct Q4_K_M, servida localment, va donar:

```text
8 crides · 0 rebutjos · 6/8 respostes correctes
4/6 paràfrasis davant de 0/6 de l'stub
dos canònics correctes · CortexROI +16 · false_facts 0
```

La gramàtica específica d'acció permet `UNIR`, `TEMER`, `OBSERVAR` o `NONE`,
sempre com a relació local. La gramàtica general continua intacta. Les dues
amenaces no canòniques equivocades continuen visibles a l'informe.

## PATTERN-0

T només pot desar una resposta per a `(estat, acció)`. El riff necessita saber
d'on venia el cos:

```text
... B → A → C → A → B → A → C → A ...
```

PatternMemory fa servir `(anterior, actual, acció)` i prediu els dos successors
d'A. L'examen conté quatre rotacions independents, no aprèn durant la prova i
manté els desconeguts al denominador. El control sense context col·lapsa
exactament sobre T.

## XFER-1

Un sol objecte Agent conserva les mateixes instàncies de CAM, Q, T i
PatternMemory quan travessa tres físiques. Cada frontera es compara amb un
animal nou i amb un altre que ha viscut el mateix nombre de torns sense rebre
la regularitat útil.

| Frontera | Transferit | Nou | Guany | Control d'edat |
|---|---:|---:|---:|---:|
| B | 208 | 152 | +56 | 152 → +0 |
| C | 224 | 152 | +72 | 152 → +0 |

Abans de caminar pel món nou, la memòria transferida resol 96/96 contextos; les
memòries nova i envellida declaren 96 desconeguts. L'ablació fa servir la
mateixa CAM per aïllar PatternMemory: entrenada 96, buida 0, zero escriptures.

XFER-1 va passar quatre rondes d'enduriment del certificat. La porta final
recalcula protocols, recorreguts, denominadors, ablació i canal a partir de les
files; no creu els resums del mateix informe. L'informe conté 51 mutants
requerits, tots morts.

## Tancament reproduïble

```bash
cd /ruta/al/repo/RXos
PYTHONPATH=. python3 -m echoai.nexus0.xfer1
PYTHONPATH=. python3 -m echoai.tests.test_nexus0
```

Resultat auditat: `xfer1 rc=0`, `green=true`, 488 proves correctes i una fallada
esperada documentada.

— R.N.
