# echoAI

echoAI es un agente situado de dos relojes. No es un chatbot y no es un
modelo de lenguaje con herramientas.

El reloj rápido percibe, recuerda, predice, actúa y aprende usando tablas y
enteros. El reloj lento, cuando se conecta, puede leer lenguaje y proponer una
hipótesis. El gate conserva la última palabra y ninguna propuesta del córtex se
convierte por sí sola en un hecho.

```text
percibir → recordar → predecir → actuar → consecuencia → aprender
                                      ↑
                          hipótesis lenta, sólo cuando ATTEND la solicita
```

## Estado actual

**ECHO-1 quedó cerrado el 5 de septiembre de 2026 y ECHO-2 el 9 de septiembre
de 2026.** La suite canónica de ECHO-1 termina con 488 pruebas correctas y un
`expectedFailure` explícito: WALK-1
sin el resto entero opt-in. No se oculta como verde.

ECHO-1 demuestra que el mismo animal:

- conserva CAM, Q, T y PatternMemory al cruzar mundos;
- distingue cambios propios de cambios del entorno;
- aprende a transportar un objeto y a abrir un recipiente;
- despierta el córtex después de una contradicción conocida, no antes;
- narra lo ocurrido sin que la narración pueda modificar el animal;
- aprende una regularidad temporal que T de un paso no puede representar;
- obtiene una ventaja causal frente a controles nuevos o sólo envejecidos.

El cierre de transferencia usa tres mundos. En las dos fronteras medidas, el
animal transferido obtiene `208 vs 152` (`+56`) y `224 vs 152` (`+72`). La
ganancia agregada es `+128`. No intervienen un LLM ni etiquetas humanas.

ECHO-2 conserva ese núcleo y añade supervivencia entre vidas, generalización
de patrones, flujo continuo, consolidación, herencia de una predisposición y
regulación conjunta de energía y temperatura. CAPACITY-1 seleccionó un monitor
de 512 LIF + 128 Adaptive-LIF: 2.048/2.048 firmas perceptivas y 256/256
secuencias temporales. [Cierre, gráficas y vídeo de ECHO-2](./echo2).

## Tres canales que no se mezclan

| Canal | Pregunta | Dónde vive |
|---|---|---|
| Representación | ¿qué ocurre? | WSP de 16 bytes |
| Epistemología | ¿lo sé? | CAM + VERIFY + extracto |
| Control | ¿qué hago? | Q + gate |

CAM registra lo que ocurrió. Q aprende lo que conviene hacer. T predice el
resultado de una acción. Que una frase suene convincente no cambia ninguno de
esos contratos.

## Cifras que se pueden volver a medir

| Banco | Resultado |
|---|---|
| Anillo, política aprendida ante amenaza | `[-12, +5, 0]` |
| Preguntar frente a no preguntar | `+80` frente a `-80` |
| ATTEND con córtex habilitado | 36 despertares de 256 turnos |
| SIGN-C, decisión que el rápido no resolvía | córtex `+16`, rápido `0` |
| TALK-1 | 496/496 cláusulas; 256/256 registros |
| PATTERN-0 | 80/80 frente a T 40/80 |
| XFER-1 | `+56` y `+72` en fronteras independientes |
| Hechos falsos / ranuras destruidas | `0 / 0` |

La ejecución principal mantiene el córtex apagado. Qwen3-4B se probó aparte,
local y cuantizado, detrás del mismo enchufe y de una gramática de salida. En
SIGN-C resolvió los dos ejemplos canónicos, 4 de 6 paráfrasis que el stub no
resolvía y produjo `CortexROI +16`; dos amenazas no canónicas equivocadas
quedan registradas como deuda de seguridad, no escondidas.

## Qué significa y qué no

Es evidencia de memoria, control, predicción, composición y transferencia en
mundos sintéticos. No es todavía un robot, no demuestra percepción visual y no
autoriza a poner un modelo generativo en el control de motores.

ECHO-3 llevará el contrato cerrado de ECHO-2 a tres mundos 3D, sensores,
dinámica de vuelo, PX4 y finalmente un cuerpo físico en el edge.

— R.N.
