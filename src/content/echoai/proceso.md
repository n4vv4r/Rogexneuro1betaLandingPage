# Cómo se construyó

echoAI se desarrolla en RxLabs como un programa de ingeniería experimental:
cada avance parte de una afirmación acotada, incorpora un control causal,
produce evidencia propia y termina en una puerta que debe poder decir que no.

## Dirección y trazabilidad

Roger Navarro dirige el producto y su arquitectura, fija los invariantes,
opera el laboratorio y acepta o rechaza cada fase. La evolución técnica queda
trazada en especificaciones, código, pruebas, informes y commits reproducibles.

Las herramientas auxiliares del proceso interno no forman parte de la
evidencia publicada. Las afirmaciones públicas se sostienen únicamente en el
comportamiento del sistema, sus controles y resultados reproducibles.

## El ciclo de trabajo

```text
objetivo → invariante → hipótesis causal → especificación acotada
         → implementación → banco y controles → contraejemplo
         → endurecer o rechazar → siguiente incremento
```

Cada incremento tiene un KPI principal. No se permite arreglar un experimento
moviendo la recompensa, hardcodeando el nombre del mundo o rebajando una
condición después de ver el resultado.

## Verde no significa “el script terminó”

Un informe verde sólo vale si su predicado puede discrepar de él. Por eso la
revisión intenta construir certificados contradictorios:

- contadores resumen que no coinciden con las filas;
- tres controles iguales entre sí pero todos configurados de forma incorrecta;
- acciones del gate atribuidas por error al córtex;
- desconocidos eliminados del denominador;
- una ablación que cambia también la percepción y deja de aislar la memoria;
- mutantes futuros vivos ocultos por un listado cerrado;
- una narración que comparte tablas con su propio auditor.

TALK-1 necesitó tres cierres y XFER-1 cuatro. Las cifras causales no cambiaron;
se endureció la evidencia hasta que esos falsos verdes dejaron de pasar.

## Controles habituales

1. **Transfer frente a scratch.** Mismo protocolo, distinta experiencia.
2. **Control de edad.** Mismos turnos, sin la regularidad que se quiere medir.
3. **Ablación perceptualmente emparejada.** Cambia una memoria, no la entrada.
4. **Held-out congelado.** El examen no llama a `observe()`.
5. **Mutación.** Cada candado debe matar al menos una alteración que antes
   podría haber pasado.
6. **Regresión.** El anillo y los informes anteriores conservan sus cifras.

## Disciplina de arquitectura

- Un solo bus WSP de 16 bytes.
- CAM, Q y T son estructuras diferentes.
- Cero coma flotante en la decisión rápida.
- El córtex está apagado por defecto y sólo propone.
- Una hipótesis nunca se escribe como hecho.
- La narración sucede después y no vuelve al animal.
- Un mundo nuevo cambia la física, no el código del agente.
- Hardware ausente se declara ausente.

## Reproducibilidad

Cada fase escribe un informe separado en `echoai/lab/`. Los bancos canónicos
no requieren red, pesos de modelo ni placa. Las ejecuciones con Qwen se guardan
como informes de operador y no sustituyen la suite determinista.

El estado publicado de ECHO-1 corresponde a 488 pruebas correctas, un
`expectedFailure` conocido y los informes verdes de ROOM-1, OBJ-1, OPEN-1,
SIGN-C, TALK-1, PATTERN-0 y XFER-1.

— R.N.
