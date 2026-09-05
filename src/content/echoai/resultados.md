# ECHO-1 — resultados

Esta página convierte los informes de cierre en una lectura visual del agente.
Es un **benchmark canónico determinista de aceptación**: mide capacidades y
controles causales, no compara echoAI con un LLM ni demuestra todavía un robot
físico.

## Leyenda mínima

| Término | Significado |
|---|---|
| WSP | paquete compartido de 16 bytes que representa lo percibido |
| CAM | memoria episódica; conserva lo ocurrido con evidencia verificable |
| Q | tabla que puntúa acercarse, evitar y esperar en cada estado |
| T | modelo que predice el siguiente estado para una acción |
| PatternMemory | contexto adicional cuando una transición de un paso es ambigua |
| gate | puerta que acepta, modifica o bloquea una propuesta |
| ATTEND | condición que puede despertar el reloj lento |
| córtex | reloj lento opcional; propone, no controla directamente el cuerpo |
| δ | diferencia entre lo esperado y la consecuencia observada |
| scratch | control que empieza desde cero con el mismo protocolo |
| held-out | examen congelado cuyos casos no se usan para aprender |
| ROI | recompensa adicional frente al control en la misma ventana |

## Cifras principales

- La política ante peligro pasa de `[0,0,0]` a `[-12,+5,0]` para
  acercarse, evitar y esperar.
- T alcanza 99,68 % sobre 312 turnos con predicción conocida.
- PATTERN-0 pasa de 40/80 con T a 80/80 con contexto: +40 aciertos.
- XFER-1 obtiene 208 frente a 152 en B y 224 frente a 152 en C:
  ganancia agregada +128.
- SIGN-C produce una única llamada por conflicto y +16 frente a 0 del control.
- TALK-1 conserva 496/496 cláusulas y no escribe causalmente sobre el agente.
- Integridad: `false_facts=0`, `destroyed=0` y cero llamadas corticales en el
  banco principal.

La versión web incorpora gráficas de líneas y barras, un diagrama del ciclo de
decisión y un reproductor de los 352 turnos de la traza canónica. Los datos se
pueden descargar como JSON e incluyen las huellas SHA-256 de sus informes de
origen.

— R.N.
