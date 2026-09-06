# Full de ruta — ECHO-2 i ECHO-3

ECHO-1 està tancat. El següent no consisteix a engrandir el mapa ni a deixar
que un LLM condueixi. L'objectiu empresarial és la robòtica autònoma a l'edge,
amb els drons com a plataforma principal.

Tot element d'aquesta pàgina és **pla** fins que existeixin el seu banc, el seu
informe i el seu tancament.

## ECHO-2 — un animal que manté la viabilitat

ECHO-2 continuarà en simulació controlada. Afegirà necessitats internes,
identitat d'objectes i vides completes sense trencar el camí ràpid enter.

| Slice | Pregunta que ha de tancar |
|---|---|
| VITA-1 | Un estat homeostàtic `H` viu a l'Agent, baixa amb el temps i acaba un episodi quan arriba a zero? |
| PATTERN-1 | Reconeix el mateix objecte o categoria a través d'observacions, posicions i contextos diferents sense fer servir el seu id com a resposta? |
| FOOD-1 | Descobreix per les conseqüències quin objecte restaura `H` i quin el redueix, sense `if gana: menjar`? |
| SURV-1 | L'experiència conservada entre vides augmenta la mediana de supervivència davant de reiniciar Q/T/CAM? |
| SHIFT-S | S'adapta quan canvien els riscos o els recursos sense esborrar la memòria a mà? |
| STREAM-1 | Opera durant un flux llarg amb frames externs i alias mesurat? |
| SLEEP-2 | Consolida episodis en regles sense destruir CAM ni cridar el còrtex? |
| GEN-1 | Un enter heretable redueix el temps d'aprenentatge sense copiar Q al descendent? |
| HEAT-1 | Una segona necessitat crea un trade-off real després de tancar la supervivència amb una de sola? |

### La supervivència no és una recompensa per continuar viu

`H` serà una restricció de viabilitat, no `reward += 1`. La recompensa
continuarà ensenyant política local; `H` decidirà si existeix un torn següent.
La mort tancarà una vida i reiniciarà cos i homeòstasi, però l'experiment
compararà conservar la memòria amb esborrar-la.

PATTERN-1 és la porta cap als objectes reals: primer ha de demostrar identitat i
categoria sense píxels ni sensors sorollosos. ECHO-3 connectarà aquesta
capacitat amb observacions físiques.

## ECHO-3 — percepció i cos físic

ECHO-3 traslladarà l'agent a un companion computer d'un dron. L'autopilot
mantindrà l'estabilització, l'actitud i els failsafes; echoAI escollirà objectius
i accions d'alt nivell a través del gate.

| Slice | Resultat esperat |
|---|---|
| SIM-3 | la mateixa missió en simulació, software-in-the-loop i hardware-in-the-loop |
| SENSOR-1 | càmera estèreo, IMU i LiDAR sincronitzats amb timestamps i fallades explícites |
| GROUND-1 | convertir observacions físiques en estats WSP sense obrir un segon bus |
| PATTERN-1R | associar vistes i clústers 3D amb el mateix objecte après a ECHO-2 |
| FUSION-1 | càmera i LiDAR aporten evidència independent; la discrepància redueix la confiança |
| DYNAMIC-1 | detectar objectes mòbils i predir trajectòries a curt termini |
| POWER-1 | mesurar watts i energia per missió; despertar còmput pesant només quan aporta valor |
| SAFE-1 | desconnexions, sensors congelats i propostes errònies no poden saltar-se el gate ni l'autopilot |
| DRONE-3 | missió completa en gàbia i entorn controlat: inspeccionar, evitar, tornar i aterrar |

### Paper d'Akida, si arriba al laboratori

Un AKD1000 podria funcionar com a percepció dispersa sempre activa:
classificació de regions, novetat, moviment o prefiltratge de núvols de punts.
La seva sortida serien identificadors i confiances enteres que entrarien per
l'adaptador sensorial existent.

No seria el cervell complet, no escriuria CAM, no decidiria VERIFY ni manaria
motors. Jetson conservaria la fusió complexa, la instrumentació i els models de
desenvolupament; Pixhawk conservaria el control de vol.

Abans d'atribuir-li una capacitat s'exigiran un driver real, un model compilat
per a AKD1000 i mesures pròpies de potència i latència. Les capacitats
publicades per a generacions posteriors d'Akida no s'atribuiran automàticament
a l'AKD1000.

## Demostració objectiu

Un dron s'enlaira en un entorn controlat, inspecciona una ruta, reconeix
objectes persistents, detecta que un pas après ha canviat, evita un obstacle
mòbil, decideix tornar segons l'energia disponible i aterra en una zona
alternativa. Tot el control crític continua local i no cal cap connexió al
núvol.

La demo només serà verda si també supera la pèrdua de càmera, la pèrdua de
LiDAR, el reinici del companion computer, una sortida neuronal errònia i la
retirada completa de l'accelerador opcional.

— R.N.
