# Com es va construir

echoAI es desenvolupa a RxLabs com un programa d'enginyeria experimental: cada
avenç parteix d'una afirmació acotada, incorpora un control causal, produeix
evidència pròpia i acaba en una porta que ha de poder dir que no.

## Direcció i traçabilitat

Roger Navarro dirigeix el producte i la seva arquitectura, fixa els invariants,
opera el laboratori i accepta o rebutja cada fase. L'evolució tècnica queda
traçada en especificacions, codi, proves, informes i commits reproduïbles.

Les eines auxiliars del procés intern no formen part de l'evidència publicada.
Les afirmacions públiques se sostenen únicament en el comportament del sistema,
els seus controls i els resultats reproduïbles.

## El cicle de treball

```text
objectiu → invariant → hipòtesi causal → especificació acotada
         → implementació → banc i controls → contraexemple
         → endurir o rebutjar → increment següent
```

Cada increment té un KPI principal. No es permet arreglar un experiment movent
la recompensa, codificant el nom del món de manera fixa o rebaixant una
condició després de veure el resultat.

## Verd no significa «l'script ha acabat»

Un informe verd només val si el seu predicat pot discrepar-ne. Per això la
revisió intenta construir certificats contradictoris:

- comptadors resum que no coincideixen amb les files;
- tres controls iguals entre si però tots configurats incorrectament;
- accions del gate atribuïdes per error al còrtex;
- desconeguts eliminats del denominador;
- una ablació que també canvia la percepció i deixa d'aïllar la memòria;
- mutants futurs vius amagats per una llista tancada;
- una narració que comparteix taules amb el seu propi auditor.

TALK-1 va necessitar tres tancaments i XFER-1, quatre. Les xifres causals no van
canviar; es va endurir l'evidència fins que aquests falsos verds van deixar de
passar.

## Controls habituals

1. **Transfer davant de scratch.** Mateix protocol, experiència diferent.
2. **Control d'edat.** Mateixos torns, sense la regularitat que es vol mesurar.
3. **Ablació perceptivament aparellada.** Canvia una memòria, no l'entrada.
4. **Held-out congelat.** L'examen no crida `observe()`.
5. **Mutació.** Cada cadenat ha de matar almenys una alteració que abans podria
   haver passat.
6. **Regressió.** L'anell i els informes anteriors conserven les seves xifres.

## Disciplina d'arquitectura

- Un sol bus WSP de 16 bytes.
- CAM, Q i T són estructures diferents.
- Zero coma flotant a la decisió ràpida.
- El còrtex està apagat per defecte i només proposa.
- Una hipòtesi mai no s'escriu com a fet.
- La narració passa després i no torna a l'animal.
- Un món nou canvia la física, no el codi de l'agent.
- El maquinari absent es declara absent.

## Reproductibilitat

Cada fase escriu un informe separat a `echoai/lab/`. Els bancs canònics no
requereixen xarxa, pesos de model ni placa. Les execucions amb Qwen es desen
com a informes d'operador i no substitueixen la suite determinista.

L'estat publicat d'ECHO-1 correspon a 488 proves correctes, un
`expectedFailure` conegut i els informes verds de ROOM-1, OBJ-1, OPEN-1,
SIGN-C, TALK-1, PATTERN-0 i XFER-1.

ECHO-2 es va tancar després amb informes verds separats per a supervivència,
PATTERN-1, STREAM-1, SLEEP-2, GEN-1f, HEAT-1b i CAPACITY-1. El resum públic
inclou les empremtes SHA-256 d'aquests informes i de la demostració en vídeo.

— R.N.
