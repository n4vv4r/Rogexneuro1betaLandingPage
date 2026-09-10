# Full de ruta — ECHO-3

ECHO-1 i ECHO-2 estan tancats. Aquesta pàgina conté únicament el futur
d'echoAI: portar les capacitats mesurades en simulació a la percepció i la
robòtica a l'edge. Cada element continua sent **pla** fins que existeixin el
seu banc, informe i tancament.

## Objectiu

Un dron s'enlaira en un entorn controlat, inspecciona una ruta, reconeix
objectes persistents, detecta que un pas après ha canviat, evita un obstacle
mòbil, decideix tornar segons l'energia disponible i aterra. El control crític
continua local i la pèrdua de xarxa no atura la missió.

L'autopilot mantindrà l'estabilització, l'actitud i els failsafes. echoAI
escollirà objectius o accions d'alt nivell mitjançant el gate. Cap LLM
escriurà directament als motors.

## Fases d'ECHO-3

| Slice | Resultat esperat |
|---|---|
| SIM-3 | tres mapes 3D declaratius; aprendre a A i examinar camins no vistos a B/C |
| FLIGHT-1 | més voxels i rumbs, motors, dinàmica, aerodinàmica i vent mesurats |
| SENSOR-1 | càmera, IMU i LiDAR sincronitzats, amb soroll, latència i fallades explícites |
| GROUND-1 | convertir observacions físiques en WSP sense obrir un segon bus |
| PATTERN-1R | associar vistes i clústers 3D amb l'objecte après a ECHO-2 |
| FUSION-1 | càmera i LiDAR aporten evidència independent; la discrepància redueix la confiança |
| DYNAMIC-1 | detectar objectes mòbils i predir trajectòries a curt termini |
| PX4-1 | integrar PID, SITL/HIL i setpoints acotats mantenint els failsafes |
| COMMAND-1 | acceptar ordres verificades: enlairar-se, aterrar, anar a coordenades, tornar o cancel·lar |
| POWER-1 | mesurar watts i energia per missió; despertar còmput pesant només quan aporta valor |
| SAFE-1 | sensors congelats, desconnexions i propostes errònies no salten el gate ni PX4 |
| DRONE-3 | missió completa en simulació avançada, gàbia i entorn controlat |

## Laboratori 3D

NEURAL-VIZ-1 evolucionarà cap a una aplicació Python nativa amb el món 3D,
xarxa neuronal, WSP, sensors, PX4/PID, motors, missió, timeline i replay. El
món A servirà per aprendre. Els mons B i C tindran altres camins, parets i
moviments reservats per mesurar transferència sense hardcodejar escenaris.

El renderer pot usar GPU; la documentació distingirà sempre renderitzat,
física i còmput neuronal. Una aparença realista no compta com a vol ni
intel·ligència demostrada.

## AKD1500 M.2, quan existeixi al laboratori

El primer pas serà comparar CPU i AKD1500 amb el mateix model, dades i host:
precisió, latència, memòria, consum i fallback. L'accelerador podrà produir
trets i confiances enteres cap a WSP. Q, T, CAM, VERIFY i gate continuaran
sota el control del nucli.

Avui no hi ha cap targeta AKD1500 al laboratori. ECHO-3 pot avançar en
programari, PX4 i simulació sense fingir el maquinari.

## Porta final

La demostració haurà de superar pèrdua de càmera, pèrdua de LiDAR, reinici del
companion computer, sortida neuronal errònia, vent reservat i retirada completa
de l'accelerador opcional. Els mons B i C romandran congelats fins a l'examen.

— R.N.
