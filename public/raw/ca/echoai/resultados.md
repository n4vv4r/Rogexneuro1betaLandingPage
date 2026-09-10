# ECHO-1 — resultats

Aquesta pàgina converteix els informes de tancament en una lectura visual de
l'agent. És un **benchmark canònic determinista d'acceptació**: mesura
capacitats i controls causals, no compara echoAI amb un LLM ni demostra encara
un robot físic.

## Llegenda mínima

| Terme | Significat |
|---|---|
| WSP | paquet compartit de 16 bytes que representa el que s'ha percebut |
| CAM | memòria episòdica; conserva el que ha passat amb evidència verificable |
| Q | taula que puntua apropar-se, evitar i esperar en cada estat |
| T | model que prediu l'estat següent per a una acció |
| PatternMemory | context addicional quan una transició d'un pas és ambigua |
| gate | porta que accepta, modifica o bloqueja una proposta |
| ATTEND | condició que pot despertar el rellotge lent |
| còrtex | rellotge lent opcional; proposa, no controla directament el cos |
| δ | diferència entre el que s'esperava i la conseqüència observada |
| scratch | control que comença des de zero amb el mateix protocol |
| held-out | examen congelat els casos del qual no es fan servir per aprendre |
| ROI | recompensa addicional davant del control en la mateixa finestra |

## Xifres principals

- La política davant del perill passa de `[0,0,0]` a `[-12,+5,0]` per a
  apropar-se, evitar i esperar.
- T arriba al 99,68 % sobre 312 torns amb predicció coneguda.
- PATTERN-0 passa de 40/80 amb T a 80/80 amb context: +40 encerts.
- XFER-1 obté 208 davant de 152 a B i 224 davant de 152 a C: guany agregat +128.
- SIGN-C produeix una única crida per conflicte i +16 davant de 0 del control.
- TALK-1 conserva 496/496 clàusules i no escriu causalment sobre l'agent.
- Integritat: `false_facts=0`, `destroyed=0` i zero crides corticals al banc
  principal.

La versió web incorpora gràfiques de línies i barres, un diagrama del cicle de
decisió i un reproductor dels 352 torns de la traça canònica. Les dades es poden
descarregar com a JSON i inclouen les empremtes SHA-256 dels informes d'origen.

— R.N.
