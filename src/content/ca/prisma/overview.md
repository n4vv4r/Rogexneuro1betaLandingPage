# PRISMA

**Programari d'anàlisi d'EEG. Ús en recerca — no és un producte sanitari.**

---

## Què és, en una frase

PRISMA obre un enregistrament d'EEG, el neteja, l'analitza i et diu si el que
has trobat **aguanta un examen seriós** o no.

---

## Per a qui

- Qui enregistra EEG i no vol escriure codi per mirar-lo
- Qui ja fa servir MNE-Python o EEGLAB i vol un flux reproduïble al damunt
- Qui ensenya electrofisiologia i necessita que l'alumne vegi el senyal, no un script
- Qui construeix BCI o neurofeedback i necessita processament en temps real

---

## Què fa

**Obre gairebé qualsevol cosa.** BrainVision, EDF/EDF+, BDF de BioSemi, GDF,
Neuroscan CNT, EEGLAB, FIF. Arrossegues el fitxer i veus què hi ha dins: canals,
freqüència, marcadors i també les decisions que el lector ha hagut de prendre
pel seu compte.

**Neteja el senyal i s'explica.** Filtres, rereferenciació, detecció de canals
dolents **sobre tota la sessió** — i et diu *per què* n'ha marcat cadascun. ICA
per treure parpelleigs i múscul, amb les seves etiquetes i advertiments: els
components musculars es marquen però no s'eliminen si no ho demanes.

**Analitza.** ERP, espectre de potència, temps-freqüència, connectivitat
funcional i localització de fonts amb vista 3D del cervell.

**Repeteix la feina per tu.** Escrius els passos una vegada en un fitxer i
s'apliquen igual a 1 subjecte o a 73. Cada execució desa quina versió de quin
programa ha fet què i amb quins paràmetres: d'aquí a un any sabràs exactament
com vas arribar d'A a B.

**I el que gairebé ningú fa: et diu quan NO tens res.**

---

## El que ens diferencia de debò

Qualsevol programa et calcula un valor p. PRISMA respon la pregunta difícil:
**això sobreviuria a una revisió?**

Quan demanes diverses comparacions, PRISMA les corregeix **com a família** — no
una a una. Si hi afegeixes una mètrica exploratòria més, el llistó puja, com ha
de ser. I marca, per separat:

- Si el resultat depèn d'**uns quants punts extrems**
- Si **desapareix** en controlar un factor de confusió evident
- Si la mostra **mai no ha tingut potència** per detectar allò, i quants
  subjectes caldrien

Acaba amb una frase clara i un veredicte: **defensable sí o no**.

**Per què existeix això.** La hipòtesi principal d'aquest projecte — que
calibrar el llindar per subjecte predeia el comportament — es va provar amb dos
datasets públics independents i **no es va replicar**. En comptes d'amagar-ho,
la disciplina necessària per descobrir-ho ara forma part del producte.

`defendible: no` és el resultat **normal** d'una exploració honesta. No és un
error del programa.

---

## Com sabem que funciona

Amb dades públiques reals, no amb demos preparades.

Sobre **ds006018** (tasca Flanker, 73 subjectes), processats tots 73 sense cap
fallada, PRISMA va recuperar **dos efectes ja establerts a la literatura**: la
resposta ERP de conflicte i la theta migfrontal. Va descartar correctament 30 de
32 clústers candidats. I en la tercera anàlisi, connectivitat, va dir clarament:
**aquí no hi ha res**.

Que no trobi efecte en totes tres és precisament el que el fa fiable.

---

## Les dues meitats

**PRISMA** — l'aplicació d'escriptori i la capa d'anàlisi. Sis panells: Sessió,
Senyal, Preprocessament, Anàlisi, Grup i Límits. Tema clar i fosc.

**PRISMA ENGINE** — un motor de temps real escrit en Rust, amb **1,8
microsegons** de latència mitjana i zero reserves de memòria al camí crític. En
comptes d'analitzar finestres fixes, converteix el senyal en impulsos i processa
esdeveniment a esdeveniment. És un binari únic, sense res a instal·lar.

Es fan servir juntes o per separat.

---

## El que NO fa

Està escrit a la mateixa aplicació, en un panell anomenat **Límits**, perquè una
eina que només enumera les seves virtuts no és honesta:

- **No és un producte sanitari.** No diagnostica ni prediu res.
- **La localització de fonts fa servir un cap plantilla**, no la ressonància
  del subjecte: compta amb 1–2 cm d'error.
- **La connectivitat entre elèctrodes està contaminada** per conducció de
  volum. Per afirmar interacció, fes servir les mesures robustes incloses.
- **Un clúster significatiu no localitza amb precisió.** Les seves vores no són
  els límits de l'efecte.
- **L'etiquetatge automàtic d'ICA és un suggeriment**, no un veredicte.
- **Encara no pots connectar-hi un casc i veure'l en viu** sense un script
  pont. Aquest era l'objectiu original i encara no hi és.

---

## Requisits

Linux de 64 bits (pràcticament qualsevol des de 2020). El motor no necessita
instal·lar res. La capa d'anàlisi necessita Python 3.10 o superior.

Construït sobre MNE-Python, la biblioteca estàndard de la comunitat
d'electrofisiologia.

---

## Estat

**Encara no és a la venda.** El programari funciona i està provat; el que falta
és la paperassa — llicència, forma de pagament, contacte de suport — i la
funció que era l'objectiu original: connectar-hi un casc i veure'l analitzat en
directe.
