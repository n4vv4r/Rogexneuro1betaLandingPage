# Hoja de ruta — ECHO-2 y ECHO-3

ECHO-1 está cerrado. Lo siguiente no consiste en agrandar el mapa ni en dejar
que un LLM conduzca. El objetivo empresarial es robótica autónoma en el edge,
con drones como plataforma principal.

Todo elemento de esta página es **plan** hasta que exista su banco, su informe
y su cierre.

## ECHO-2 — un animal que mantiene su viabilidad

ECHO-2 seguirá en simulación controlada. Añadirá necesidades internas,
identidad de objetos y vidas completas sin romper el rápido entero.

| Slice | Pregunta que debe cerrar |
|---|---|
| VITA-1 | ¿un estado homeostático `H` vive en el Agent, baja con el tiempo y termina un episodio al llegar a cero? |
| PATTERN-1 | ¿reconoce un mismo objeto o categoría a través de observaciones, posiciones y contextos distintos sin usar su id como respuesta? |
| FOOD-1 | ¿descubre por consecuencias qué objeto restaura `H` y cuál lo reduce, sin `if hambre: comer`? |
| SURV-1 | ¿la experiencia conservada entre vidas aumenta la mediana de supervivencia frente a resetear Q/T/CAM? |
| SHIFT-S | ¿se adapta cuando cambian riesgos o recursos sin borrar la memoria a mano? |
| STREAM-1 | ¿opera durante un flujo largo con frames externos y alias medido? |
| SLEEP-2 | ¿consolida episodios en reglas sin destruir CAM ni llamar al córtex? |
| GEN-1 | ¿un entero heredable reduce el tiempo de aprendizaje sin copiar Q al descendiente? |
| HEAT-1 | ¿una segunda necesidad crea un trade-off real después de cerrar supervivencia con una sola? |

### Supervivencia no es una recompensa por seguir vivo

`H` será una restricción de viabilidad, no `reward += 1`. La recompensa seguirá
enseñando política local; `H` decidirá si existe un turno siguiente. La muerte
cerrará una vida y reiniciará cuerpo y homeostasis, pero el experimento
comparará conservar memoria con borrarla.

PATTERN-1 es la puerta hacia objetos reales: primero debe demostrar identidad y
categoría sin píxeles ni sensores ruidosos. ECHO-3 conectará esa capacidad a
observaciones físicas.

## ECHO-3 — percepción y cuerpo físico

ECHO-3 trasladará el agente a un companion computer de un dron. El autopiloto
mantendrá estabilización, actitud y failsafes; echoAI escogerá objetivos y
acciones de alto nivel a través del gate.

| Slice | Resultado esperado |
|---|---|
| SIM-3 | la misma misión en simulación, software-in-the-loop y hardware-in-the-loop |
| SENSOR-1 | cámara estéreo, IMU y LiDAR sincronizados con timestamps y fallos explícitos |
| GROUND-1 | convertir observaciones físicas en estados WSP sin abrir un segundo bus |
| PATTERN-1R | asociar vistas y clusters 3D al mismo objeto aprendido en ECHO-2 |
| FUSION-1 | cámara y LiDAR aportan evidencia independiente; la discrepancia reduce confianza |
| DYNAMIC-1 | detectar objetos móviles y predecir trayectorias a corto plazo |
| POWER-1 | medir vatios y energía por misión; despertar cómputo pesado sólo cuando aporta valor |
| SAFE-1 | desconexiones, sensores congelados y propuestas erróneas no pueden saltarse el gate ni el autopiloto |
| DRONE-3 | misión completa en jaula y entorno controlado: inspeccionar, evitar, volver y aterrizar |

### Papel de Akida, si llega al laboratorio

Un AKD1000 podría funcionar como percepción dispersa siempre activa:
clasificación de regiones, novedad, movimiento o prefiltrado de nubes de
puntos. Su salida serían identificadores y confianzas enteras que entrarían por
el adaptador sensorial existente.

No sería el cerebro completo, no escribiría CAM, no decidiría VERIFY y no
mandaría motores. Jetson conservaría fusión compleja, instrumentación y modelos
de desarrollo; Pixhawk conservaría el control de vuelo.

Antes de atribuirle una capacidad se exigirán driver real, modelo compilado para
AKD1000 y medidas propias de potencia y latencia. Las capacidades publicadas
para generaciones Akida posteriores no se atribuirán automáticamente al
AKD1000.

## Demostración objetivo

Un dron despega en un entorno controlado, inspecciona una ruta, reconoce
objetos persistentes, detecta que un paso aprendido ha cambiado, evita un
obstáculo móvil, decide volver por energía disponible y aterriza en una zona
alternativa. Todo el control crítico permanece local y ninguna conexión a la
nube es necesaria.

La demo sólo será verde si también supera pérdida de cámara, pérdida de LiDAR,
reinicio del companion computer, salida neuronal errónea y retirada completa
del acelerador opcional.

— R.N.
