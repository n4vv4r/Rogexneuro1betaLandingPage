# ECHO-2 — tancament, resultats i demostració

**ECHO-2 va quedar tancat el 9 de setembre de 2026.** L'agent conserva el
nucli d'ECHO-1 i afegeix viabilitat, reconeixement de patrons, operació en
flux, consolidació, herència d'una predisposició i regulació de dues variables
internes. CAPACITY-1 va justificar una arquitectura de monitor de 512 LIF +
128 Adaptive-LIF i NEURAL-VIZ-1 la va fer observable en una GUI nativa.

## Demostració directa

<figure class="echo2-video">
  <video controls preload="metadata" playsinline poster="/media/echoai/opengraph/echo2.png" aria-label="Demostració de la GUI nativa d'ECHO-2">
    <source src="/media/echoai/echo2-neural-viz-demo.mp4" type="video/mp4">
    El navegador no pot reproduir MP4. <a href="/media/echoai/echo2-neural-viz-demo.mp4">Descarrega el vídeo</a>.
  </video>
  <figcaption>Enregistrament directe de 2:03 fet el 9 de setembre de 2026. Recorre la xarxa neuronal, el dron 3D, el mapa WSP de 16 bytes i el tutorial.</figcaption>
</figure>

No és una animació promocional. L'aplicació executa `Agent.turn()` i mostra
WSP, CAM, T, PATTERN, Q, gate, homeòstasi, mort, respawn, herència i crides
eventuals al còrtex. El dron representa la pose real del cos discret Body3D.
VTK/OpenGL renderitza la vista; encara no hi ha aerodinàmica, IMU, motors ni
PID.

## Comparació directa amb l'escala anterior

CAPACITY-1 va repetir l'examen amb l'arquitectura de 256 LIF usada com a
baseline de mida ECHO-1 i amb l'ampliació d'ECHO-2. La comparació es va
executar dins del mateix banc, amb llavors reservades i memòria congelada; no
reconstrueix retrospectivament una puntuació del llançament ECHO-1.

<div class="release-chart" role="img" aria-label="Signatures perceptives correctes: baseline de 256 LIF, 829 de 2048; ECHO-2 amb 512 LIF, 2048 de 2048">
  <h3>Signatures perceptives reservades</h3>
  <div class="release-bar"><span>Baseline · 256 LIF</span><i><b style="width:40.48%"></b></i><strong>829 / 2.048</strong></div>
  <div class="release-bar is-echo2"><span>ECHO-2 · 512 LIF</span><i><b style="width:100%"></b></i><strong>2.048 / 2.048</strong></div>
</div>

La millora és de **+1.219 encerts**, del 40,48% al 100%. En barrejar les
signatures, el mateix sistema cau a 142/2.048: el resultat depèn de la
representació i no només d'afegir files.

<div class="release-chart" role="img" aria-label="Discriminació temporal: control de 640 LIF estàtiques, 0 de 256; ECHO-2 amb 512 LIF i 128 Adaptive-LIF, 256 de 256">
  <h3>Discriminació temporal amb 640 neurones totals</h3>
  <div class="release-bar"><span>Control · 640 LIF</span><i><b style="width:0%"></b></i><strong>0 / 256</strong></div>
  <div class="release-bar is-echo2"><span>ECHO-2 · 512 LIF + 128 ALIF</span><i><b style="width:100%"></b></i><strong>256 / 256</strong></div>
</div>

El total de neurones és idèntic. La causa que canvia és l'adaptació temporal:
desactivar-la retorna 0/256. El banc va seleccionar memòria de 8 ticks i guany
adaptatiu 4.

<div class="release-chart" role="img" aria-label="Escala de seqüència exercitada: ECHO-1, 352 torns; ECHO-2 STREAM-1, 4608 frames">
  <h3>Escala de seqüència exercitada</h3>
  <div class="release-bar"><span>ECHO-1 · nucli</span><i><b style="width:7.64%"></b></i><strong>352 torns</strong></div>
  <div class="release-bar is-echo2"><span>ECHO-2 · STREAM-1</span><i><b style="width:100%"></b></i><strong>4.608 frames</strong></div>
</div>

La tercera gràfica mesura escala recorreguda, **no precisió en la mateixa
tasca**: són càrregues diferents. STREAM-1 va processar 48 blocs, va obtenir
4.512/4.512 prediccions conegudes al braç coherent i `dynamic_alias=0`.

## Què va afegir cada fase

| Fase | Evidència de tancament |
|---|---|
| VITA-1 / FOOD-1 | `H` baixa, la mort acaba una vida i aliment/verí s'aprenen per conseqüències |
| SURV-1 | medianes conservant memòria: 28/40/40 torns; reiniciant: 16/16/16 |
| SHIFT-S | adaptació davant Q congelada: +421/+416/+446 torns; la transferència negativa també es publica |
| PATTERN-1 | 32/32 variants reservades davant 0/32 per coincidència exacta; zero ids d'objecte o posició |
| STREAM-1 | 4.608 frames, 48 blocs i 4.512/4.512 prediccions coherents |
| SLEEP-2 | 8.208 files es compacten en 144 regles; 720/720 a l'examen davant T 0/720, sense reescriure CAM/T/Q |
| GEN-1f | pressupost heretat 8: 360 errors tardans davant 602 del naïf; 52 victòries, 24 derrotes, 52 empats |
| HEAT-1b | energia + temperatura: 20.786 torns davant 7.221 sense temperatura i 7.186 sense Q; examen carregar/refredar 12/12 |
| CAPACITY-1 | 512 LIF: 2.048/2.048; 512 LIF + 128 ALIF: 256/256 temporal |
| NEURAL-VIZ-1 | una GUI Python mostra en directe l'arquitectura i tots els components auditables |

## Què millora respecte d'ECHO-1

ECHO-1 va tancar memòria, predicció, objectes, accions físiques discretes,
patrons temporals i transferència entre mons. ECHO-2 ho conserva i afegeix una
conseqüència entre episodis: el cos pot morir, reaparèixer, regular energia i
temperatura, conservar experiència i transmetre només una predisposició
d'exploració a un descendent amb memòries buides.

L'ampliació neuronal tampoc s'accepta pel número `640`. S'accepta perquè
millora dos exàmens causals i perd quan s'elimina o es barreja la
característica responsable.

## Integritat i dades

- WSP es manté en 16 bytes i no existeix un segon thought-bus.
- `false_facts=0`, `destroyed=0` i còrtex apagat als bancs principals.
- La branca neuronal de la GUI és un monitor perceptiu; Q manté la decisió causal.
- Els exàmens reservats estan congelats durant la puntuació.
- Els resultats negatius anteriors de GEN-1 i HEAT-1 es conserven en vermell.
- No hi ha robot físic, càmera, LiDAR, IMU, PX4 ni AKD1500 en aquest tancament.

[Descarrega el resum ECHO-2 i les empremtes SHA-256](/data/echo2-benchmark.json).
El fitxer també inclou el hash del MP4.

— R.N.
