# Hoja de ruta — ECHO-3

ECHO-1 y ECHO-2 están cerrados. Esta página contiene únicamente el futuro de
echoAI: llevar las capacidades medidas en simulación a percepción y robótica
al edge. Todo elemento sigue siendo **plan** hasta que exista su banco, informe
y cierre.

## Objetivo

Un dron despega en un entorno controlado, inspecciona una ruta, reconoce
objetos persistentes, detecta que un paso aprendido cambió, evita un obstáculo
móvil, decide volver según su energía y aterriza. El control crítico permanece
local y la pérdida de red no detiene la misión.

El autopiloto mantendrá estabilización, actitud y failsafes. echoAI escogerá
objetivos o acciones de alto nivel mediante el gate. Ningún LLM escribirá
directamente en los motores.

## Fases de ECHO-3

| Slice | Resultado esperado |
|---|---|
| SIM-3 | tres mapas 3D declarativos; aprender en A y examinar caminos no vistos en B/C |
| FLIGHT-1 | más voxeles y rumbos, motores, dinámica, aerodinámica y viento medidos |
| SENSOR-1 | cámara, IMU y LiDAR sincronizados, con ruido, latencia y fallos explícitos |
| GROUND-1 | convertir observaciones físicas en WSP sin abrir un segundo bus |
| PATTERN-1R | asociar vistas y clusters 3D al mismo objeto aprendido en ECHO-2 |
| FUSION-1 | cámara y LiDAR aportan evidencia independiente; la discrepancia reduce confianza |
| DYNAMIC-1 | detectar objetos móviles y predecir trayectorias a corto plazo |
| PX4-1 | integrar PID, SITL/HIL y setpoints acotados manteniendo failsafes |
| COMMAND-1 | aceptar órdenes verificadas: despegar, aterrizar, ir a coordenadas, volver o cancelar |
| POWER-1 | medir vatios y energía por misión; despertar cómputo pesado sólo cuando aporta valor |
| SAFE-1 | sensores congelados, desconexiones y propuestas erróneas no saltan el gate ni PX4 |
| DRONE-3 | misión completa en simulación avanzada, jaula y entorno controlado |

## Laboratorio 3D

La evolución de NEURAL-VIZ-1 será una aplicación Python nativa con el mundo
3D, red neuronal, WSP, sensores, PX4/PID, motores, misión, timeline y replay.
El mundo A servirá para aprender. Los mundos B y C tendrán otros caminos,
paredes y movimientos reservados para medir transferencia sin hardcodear
escenarios.

El renderer puede usar GPU; la documentación distinguirá siempre renderizado,
física y cómputo neuronal. Una apariencia realista no cuenta como vuelo ni
inteligencia demostrada.

## AKD1500 M.2, cuando exista en el laboratorio

El primer paso será comparar CPU y AKD1500 con el mismo modelo, datos y host:
precisión, latencia, memoria, consumo y fallback. El acelerador podrá producir
rasgos y confianzas enteras hacia WSP. Q, T, CAM, VERIFY y gate seguirán bajo
control del núcleo.

No hay una tarjeta AKD1500 en el laboratorio hoy. ECHO-3 puede avanzar en
software, PX4 y simulación sin fingir el hardware.

## Puerta final

La demostración deberá sobrevivir pérdida de cámara, pérdida de LiDAR,
reinicio del companion computer, salida neuronal errónea, viento reservado y
retirada completa del acelerador opcional. Los mundos B y C permanecerán
congelados hasta el examen.

— R.N.
