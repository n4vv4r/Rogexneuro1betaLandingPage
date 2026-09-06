# echoAI — límits

La política del laboratori és separar resultats, plans i hipòtesis.

## El que ECHO-1 no demostra

- No és intel·ligència general ni una persona artificial.
- No reconeix objectes en imatges reals.
- No fa SLAM, control de vol ni navegació certificada.
- Encara no opera amb soroll, vent, latència física o sensors incomplets.
- No demostra supervivència autònoma; això pertany a ECHO-2.
- No conté cap AKD1000 ni cap altre NPU físic.
- No converteix el rendiment d'un món sintètic en una afirmació de seguretat
  robòtica.

## Deute visible

WALK-1 sense resta entera no propaga valor fins a l'objectiu i continua com a
`expectedFailure`. La variant opt-in CREDIT-1 sí que camina, però no es va
canviar l'algoritme per defecte.

El Qwen local va encertar els exemples canònics de SIGN-C i va superar l'stub
en paràfrasis, però va triar `approach` en dues amenaces no canòniques i va
rebre `-16`. Això demostra per què la seva sortida és una proposta i no una
ordre segura.

CAM té 4.096 ranures i no fa servir LRU. Els mons actuals encara són petits;
SLEEP-2 només es justificarà quan hi hagi pressió de memòria mesurada.

## Condicions per a la robòtica

Abans de volar, ECHO-3 haurà de demostrar:

- deadlines i latència P99 sota càrrega;
- sincronització i caducitat dels sensors;
- watchdog, retorn i aterratge davant la pèrdua del companion computer;
- veto independent davant d'observacions contradictòries;
- límits de bateria, massa, temperatura i vibració;
- registre reproduïble de cada decisió;
- simulació, HIL i gàbia abans de camp obert;
- compliment de la normativa aplicable i operació humana d'emergència.

Un model neuronal, un LLM o un NPU no serà l'única barrera contra una col·lisió.
L'autopilot i els mecanismes de seguretat continuen separats.

## Akida

No hi ha cap AKD1000 al laboratori. Les xifres de consum o aprenentatge del
fabricant no són resultats de RxLabs. Si arriba una placa, es publicaran la
compatibilitat, el model exacte, la toolchain, la potència mesurada i la
comparació amb CPU/Jetson abans de parlar d'avantatge.

## Estat de les paraules

- **Fet:** existeixen un informe reproduïble i una porta verda.
- **Vermell mesurat:** l'experiment s'executa i no arriba al KPI.
- **Pla:** ordre proposat; encara no és una capacitat.
- **Absent:** no existeix al laboratori.

— R.N.
