# PRISMA — documentació tècnica

**Versió 0.1.0 · Linux x86_64 · programari de recerca, no és un producte sanitari.**

Aquest document descriu què fa el programa, com ho fa i on no se n'ha de
confiar. Cada xifra s'ha mesurat en aquesta màquina o sobre dades públiques; res
no és estimat ni projectat. Quan una funció és prima, o una afirmació s'ha
provat i ha fallat, es diu aquí.

---

## 1. Què és

Dues capes que viatgen juntes i es poden fer servir per separat.

**PRISMA ENGINE** — nucli d'EEG en temps real, orientat a esdeveniments, escrit
en Rust (~8.100 línies). En comptes de fer FFT sobre finestres fixes, codifica
el senyal en impulsos i el processa esdeveniment a esdeveniment.

**PRISMA 5 SNN** — capa clàssica d'anàlisi i interfície d'escriptori, en Python
(~5.500 línies) sobre MNE-Python. Suite d'EEG fora de línia: neteja, ERP,
espectre, connectivitat, localització de fonts, pipelines reproduïbles i
estadística de grup.

Estan separades expressament. El motor no depèn de Python i funciona sol; la
capa d'anàlisi funciona sense el motor. El pont és una funció que passa el
senyal net al motor.

---

## 2. Com funciona el motor

```
senyal → modulació delta → LIF (SIMD) → STDP → predicció → telemetria
```

**Modulació delta.** Només s'emet un impuls quan el senyal es mou més que un
llindar adaptatiu θ_adp. Un canal en silenci no produeix esdeveniments: la feina
és proporcional a quant canvia el senyal, no a la freqüència de mostreig.

**Capa LIF.** Neurones leaky integrate-and-fire integren el flux d'impulsos,
vectoritzades amb AVX2, i cauen a codi escalar si la CPU no en té.

**STDP.** La plasticitat segons el temps dels impulsos ajusta els pesos
sinàptics a partir de l'ordre pre / post.

**Codificació predictiva.** Es compara la taxa observada amb una taxa esperada;
un desajust gran apuja l'SPEI i marca un *possible artefacte* (parpelleig,
múscul, un cable). No és un detector clínic d'esdeveniments.

### Rendiment mesurat

En aquesta màquina (`--headless --bench-samples 200000`), 32 canals:

| | |
|---|---|
| Latència mitjana del camí calent | **1,81 µs** |
| Pitjor latència observada | 43,9 µs (en 200.000 mostres) |
| Cabal | ~183.000 mostres/s, un nucli |
| Reserva de memòria al camí calent | **zero**, per construcció — només búfers fixos |
| Mida del binari | 9,0 MB, sense runtime per instal·lar |

En un sistema en temps real importa la pitjor xifra, i es publica al costat de
la mitjana, no en lloc seu.

### Condicionament del senyal

Apagat per defecte. Alterar el senyal en silenci també canviaria cada mètrica
respecte d'una execució anterior.

- Notch (50/60 Hz), passaalt, passabaix — biquads RBJ, estat f64
- Rereferenciació: mitjana comuna (sense canals dolents) o canals amb nom
- Detecció de canals dolents sobre **tota la sessió**, no una finestra de vista prèvia

Els filtres d'aquí són **IIR causals d'una passada**: desplacen la fase segons
la freqüència. No comparis latències ERP mesurades amb aquests filtres amb eines
de fase zero.

### Entrada en viu

El motor escolta un sòcol TCP simple: una línia JSON de capçalera i després
mostres `float32` intercalades per canal. Qualsevol cosa que obri un sòcol el pot
alimentar. Un script pont reenvia qualsevol flux LSL i pot generar senyal
sintètic per provar el camí en viu sense maquinari.

**Per què no hi ha LSL natiu, amb honestedat:** `lsl-core` (Rust pur) és
GPL-3.0, incompatible amb un binari tancat; els bindings oficials necessiten un
`liblsl` el codi encastat del qual ja no compila amb glibc moderna. El sòcol
genèric deixa el binari sense dependències i accepta més productors.

---

## 3. Com funciona la capa d'anàlisi

Tots els mètodes numèrics són de MNE-Python, SciPy o mne-connectivity. **No es
reimplementa res numèric.** ICA i localització de fonts, en particular, són
feina numèrica de recerca amb dècades de validació; reescriure-les afegiria
risc i no restaria res. PRISMA hi afegeix el flux de treball, el pipeline
declaratiu, l'etapa de grup, la capa d'integritat i un límit documentat al costat
de cada mètode.

### Importació

| Format | Lector | Comprovat amb |
|---|---|---|
| BrainVision `.vhdr` | MNE | ds006018, ds007655 (reals) |
| EDF / EDF+ | MNE | anada i tornada + real |
| BDF (BioSemi) | MNE | escrit amb pyedflib |
| GDF | MNE | BCI Competition IV 2a (real) |
| Neuroscan CNT | MNE | enregistraments de prova de MNE |
| EEGLAB `.set`, FIF | MNE | anada i tornada |

**Una fallada real que va sortir aquí:** de vegades la capçalera de Neuroscan
no diu l'amplada de mostra, i llegir 16 bits com a 32 (o al revés) no llança cap
error: descodifica en silenci un senyal amb una altra forma i llegeix la taula
d'esdeveniments a l'offset equivocat. PRISMA prova totes dues amplades, conserva
la que dona amplituds fisiològicament plausibles i anota la decisió. Si totes
dues semblen plausibles, es nega i pregunta, en comptes d'endevinar.

### Neteja

- **Filtres**: fase zero (anada i tornada) per defecte fora de línia; hi ha un
  mode causal per reproduir el que fa el motor en viu.
- **Canals dolents**: escombratge de tota la sessió amb criteris PREP (pla,
  desviació robusta, soroll d'alta freqüència, correlació per finestres amb
  veïns), informant de *per què* se n'ha marcat cadascun. Estadística robusta a
  tot arreu, perquè un canal saturat no n'amagui un altre.
- **Interpolació**: splines esfèrics (Perrin et al., 1989).
- **ICA**: Infomax estès / FastICA / Picard, amb etiquetatge automàtic. Els
  parpelleigs fan servir un canal EOG o un proxy frontal. **No s'intenten
  components cardíacs sense un canal ECG real** — no hi ha cap detector fiable
  només amb EEG, de manera que no se n'inventa cap. Els musculars s'etiqueten
  però no s'eliminen si no ho demanes: en dades reals el detector en va marcar
  11 de 20.

### Anàlisi

Epoching amb noms d'esdeveniment llegibles, correcció de línia base, mitjana ERP
i mesura de pics; PSD (Welch/multitaper), potència per banda, freqüència alfa
individual; temps-freqüència (Morlet, multitaper, Stockwell, STFT) i ERD/ERS;
connectivitat (coh, imcoh, plv, ciplv, ppc, pli, wpli); localització de fonts
(sLORETA, dSPM, eLORETA, MNE, beamformer LCMV).

### Pipelines reproduïbles

Un YAML llista els passos; s'executen sobre un fitxer, un glob o un dataset
BIDS sencer. Quinze tipus de pas: `montage, filter, bad_channels, interpolate,
reference, ica, epochs, baseline, erp, psd, tfr, connectivity, sources, engine,
save_raw`.

Cada execució escriu `pipeline_summary.json` amb l'especificació, cada versió
de paquet i, per subjecte, els paràmetres, temps i resultat de cada pas. Un
subjecte que falla s'anota i el lot continua.

### Etapa de grup

El pipeline per subjecte escriu a disc; l'etapa de grup ho llegeix i **mai no
recalcula un subjecte**. Tornar a llançar l'estadística amb altres paràmetres
costa segons, no una altra passada sobre les dades.

- **ERP**: permutació de clústers espaciotemporals sobre canals × temps
- **Temps-freqüència**: clústers sobre freqüència × temps × canals *alhora*,
  perquè un efecte que s'estén a bandes veïnes sigui una troballa, no diverses
- **Connectivitat**: tests aparellats per enllaç amb FDR (només el triangle
  superior — comptar una matriu simètrica dues vegades diluiria la correcció),
  més el Network-Based Statistic (Zalesky et al., 2010) per a subxarxes connexes

---

## 4. La capa d'integritat

Aquesta part no existeix en altres suites d'EEG, i el motiu no és afalagador:
l'afirmació principal d'aquest projecte — que calibrar el llindar per subjecte
prediu el comportament — es va provar amb dos datasets públics independents i
**no es va replicar**. La disciplina necessària per descobrir-ho ara és codi.

`integrity_report` pren una *família* de tests i, en una passada:

1. **Corregeix sobre tota la família**, no per test. Afegir una mètrica
   exploratòria més apuja el llistó, com ha de ser.
2. **Marca resultats que depenen d'extrems** — un buit gran Pearson/Spearman
   significa que el resultat lineal es recolza en uns quants punts.
3. **Marca resultats que desapareixen sota un confusor** (correlació parcial).
4. **Marca tests sense potència** i diu quants subjectes caldrien.
5. **Treu de la família els tests no computables (NaN)** en comptes de deixar
   que corrompin la resta de valors p corregits — una fallada real, ara una
   garantia.
6. Acaba amb `defensible: true/false` i una frase plana.

`defensible: false` és el resultat normal d'una exploració honesta, no un error.

---

## 5. Contra què s'ha comprovat

**135 tests automàtics.** L'enregistrament sintètic que fa servir la majoria té
veritat de base plantada — alfa occipital, parpelleigs, brunzit de xarxa, un
canal mort, un canal saturat, respostes N1/P3 — i els tests comproven que cada
etapa *recupera el que s'ha plantat*, no només que s'executa.

Els mètodes estadístics es proven **en tots dos sentits**: han de trobar un
efecte plantat al lloc exacte **i no trobar res en soroll aparellat**. Un mòdul
estadístic validat només amb casos positius no val res.

### Sobre dades públiques reals

**ds006018** (tasca Flanker, 73 subjectes, actiCHamp, 500 Hz), tots 73
processats sense cap fallada. Tres tests de grup sobre la mateixa execució:

| Test | Resultat |
|---|---|
| ERP (canals × temps) | 2 de 18 clústers significatius, p = 0,0005, 0,18–0,80 s, 22 canals centroparietals |
| Temps-freqüència | 2 de 32 significatius: theta migfrontal 4–18 Hz (p = 0,0010) i desincronització alfa/beta (p = 0,043) |
| Connectivitat (wPLI theta) | **Res.** Cap enllaç sobreviu FDR en 325 proves; l'NBS troba 3 components candidats, cap de significatiu |

Dos efectes Flanker ja establerts recuperats, 30 de 32 clústers candidats
rebutjats i un negatiu clar a la tercera anàlisi. Una suite que trobés efecte en
totes tres no seria creïble.

**BCI Competition IV 2a** (GDF, Graz, imaginació motora) — pipeline complet,
288 epochs, 72 per classe, sense errors.

---

## 6. Límits

**No és un producte sanitari.** Programari de recerca. No diagnostica, no tracta
ni prediu cap condició, i no està validat per a cap ús clínic.

**La localització de fonts fa servir un cap plantilla.** fsaverage, no la
ressonància del subjecte, amb un coregistre de plantilla. L'error de localització
és de l'ordre d'1–2 cm. Informa els mapes com a basats en plantilla.

**La connectivitat en espai de sensors està contaminada per conducció de
volum.** Dos elèctrodes propers veuen la mateixa font i mostraran coherència o
PLV altes sense interacció. Per afirmar interacció, fes servir wPLI o coherència
imaginària.

**La permutació de clústers localitza poc.** Un clúster significatiu vol dir que
les condicions difereixen *en algun lloc* de la finestra. Les seves vores no són
els límits de l'efecte, i un efecte fort s'estén a canals veïns per disseny.

**El Network-Based Statistic depèn del seu llindar.** Fixa'l abans de mirar i
declara el valor que has fet servir.

**L'etiquetatge automàtic d'ICA és un suggeriment**, no un veredicte.

**La calibració per subjecte del motor no està validada.** Adapta el codificador
al senyal que té al davant. Es va provar si això millorava un resultat posterior
amb dos datasets públics independents de paradigmes diferents i no es va
replicar. No s'afirma res més.

**El backend Akida (neuromòrfic) és un esbós de simulació.** No hi ha placa
física ni xifres d'energia mesurades.

**No hi ha controladors natius de casc.** L'entrada en viu va pel protocol TCP
genèric o l'script pont LSL. Connectar-hi un casc i veure'l analitzat en directe
— l'objectiu original — no està construït.

**El render 3D real necessita un context GPU/OpenGL.** No hi ha alternativa per
programari.

**No hi ha desfer a la interfície.** El preprocessament edita una còpia en
memòria; torna a carregar l'enregistrament per començar de zero.

---

## 7. Requisits

**Motor**: Linux x86_64, glibc 2.30 o més nova (2019 — inclou Ubuntu 20.04+,
Debian 11+, RHEL/Rocky 9+, Fedora 31+, Arch, Mint 20+). Les úniques dependències
dinàmiques són biblioteques del sistema; OpenGL es carrega sota demanda, de
manera que també funciona en un servidor sense pantalla.

**Capa d'anàlisi**: Python 3.10+. Extres opcionals afegeixen la interfície
d'escriptori (PySide6) i el render 3D real (PyVista/VTK).

Construït sobre MNE-Python (BSD-3-Clause), NumPy, SciPy, scikit-learn,
matplotlib i mne-connectivity.

---

## 8. Estat

El motor, la capa d'anàlisi, l'estadística i la interfície funcionen i estan
comprovats. Falta la paperassa — una llicència de debò, una via de pagament, un
contacte de suport — i la funció que era el punt de l'exercici: connectar-hi un
casc i veure'l analitzat en directe, sense un script pont pel mig.
