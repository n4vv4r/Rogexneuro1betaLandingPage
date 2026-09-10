# echoAI — arquitectura

Les analogies biològiques ajuden a llegir el disseny, però el codi no fingeix
anatomia. Cada peça té un contracte comprovable.

## WSP — l'únic bus

Un paquet fix de 16 bytes: origen, relació, destinació, temps, sis enters d'estat
i camps de domini. És la mateixa representació des de la percepció fins a
l'acció. No existeix un segon bus per a Pattern, el còrtex o la narració.

## CAM — episodis verificats

4.096 ranures, sense LRU destructiu. VERIFY necessita prou similitud i un
extracte lliurat pel món. Una hipòtesi del còrtex mai no s'escriu com a fet. En
tots els tancaments d'ECHO-1, `destroyed=0` i `false_facts=0`.

## T — model d'un pas

`T(s,a)` conserva el successor dominant, el nombre d'observacions i els
conflictes. KCC impedeix que una observació aïllada esborri el que s'ha après.
Quan el món contradiu una predicció coneguda, la contradicció pot despertar
ATTEND al torn següent.

## PatternMemory — context temporal

PATTERN-0 afegeix l'estat anterior al context: `(anterior, actual, acció)`. Fa
servir una taula fixa, adreçament obert i enters. Una regla només s'ofereix quan
és madura i no ha estat contradita; si no hi ha regla, la predicció cau a T.

Està apagada per defecte i comparteix exactament el canal d'observació de T. Al
riff de prova obté 80/80 prediccions davant de 40/80 de T.

## Q — política

Q és una taula `int8` separada de CAM. El banc per defecte té tres accions:
apropar-se, apartar-se i esperar. OPEN-1 demostra que un món pot optar per una
quarta acció, obrir, sense canviar el contracte de l'anell.

L'aprenentatge fa servir conseqüències enteres. La resta de divisió que permet
propagar el crèdit més lluny és opt-in; WALK-1 sense aquesta resta continua
vermell i documentat.

## Cos i món

L'agent no és el seu mapa. BODY-1 va introduir posició i orientació; SELF-1 va
separar el desplaçament produït pel motor del produït pel terra. ROOM-1 va
afegir frames externs sense gastar el camp `domain` del WSP.

OBJ-1 i OPEN-1 distingeixen ser en un lloc, transportar una cosa i executar
l'operació física necessària per lliurar-la.

## Gate — control i veto

Tota proposta acaba en `OK`, `MODIFY` o `BLOCK`. El gate pot convertir una
espera en evitació davant d'una amenaça o bloquejar una acció. El còrtex
proposa; el gate decideix; l'autopilot físic conservarà, a més, els seus propis
failsafes.

## ATTEND i còrtex

ATTEND decideix quan val la pena gastar el rellotge lent: novetat, manca
d'extracte, baixa confiança, mapa desconegut o contradicció confirmada. El
còrtex rep un torn serialitzat i retorna un WSP vàlid o silenci. La prosa lliure
es rebutja.

SIGN-C va demostrar la latència causal correcta: el món contradiu T, l'animal
es desperta una vegada per `conflict` i la proposta es consumeix al torn
següent. El registre de consum ja mostra l'atenció apagada.

## TALK — narració pòstuma

TALK-1 tradueix el diari després de l'escena. Llegeix, valida i narra, però no
importa l'animal ni obre vies d'escriptura. El seu auditor independent compara
les setze clàusules de cada subtítol amb el registre original.

## Instrumentació

La placa web representa el diari de torns i el pot seguir en viu mitjançant
polling local. És observabilitat, mai una entrada de control. El GIF de la home
prové d'una execució real.

## Monitor neuronal d'ECHO-2

CAPACITY-1 va seleccionar 512 neurones LIF per a signatures perceptives i 128
Adaptive-LIF per al context temporal. És un monitor causal i observable; Q i
el gate conserven la decisió. NEURAL-VIZ-1 mostra les capes i els dispars al
costat de WSP, CAM, T, patrons, homeòstasi, mort i herència.

## Maquinari futur

Avui echoAI s'executa en host i no hi ha cap AKD1500 M.2 al laboratori. Un futur
accelerador neuromòrfic es tractaria com a coprocessador perceptiu o head
acotat, mai com a VERIFY, memòria sobirana o pilot.

— R.N.
