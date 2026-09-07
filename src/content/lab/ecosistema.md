# El laboratorio

Rogex Laboratories / RxLabs. Laboratorio independiente en Girona. Tres líneas
de investigación, con código ejecutable y límites publicados.

No hay un binario que las una. Comparten un método: camino caliente pequeño,
eventos en vez de sondeo cuando aporta valor, memoria acotada y ninguna
afirmación de hardware que no esté en la mesa.

| Línea | Qué es | Estado |
|---|---|---|
| **echOS** | Unikernel para robótica al edge | 3.0 cerrado; x86_64 BIOS/UEFI y AArch64 UEFI |
| **PRISMA Engine** | EEG a eventos, Rust y análisis reproducible | Engine 0.1.0 medido; no es producto sanitario |
| **echoAI** | Agente situado de dos relojes | ECHO-1 cerrado; ECHO-2 en diseño |

## Dónde se tocan

echOS y echoAI no comparten proceso: echoAI corre actualmente en host y no
está dentro de la ISO. echOS 3.0 publica un contrato acotado de sensores e
intenciones que puede actuar como costura futura sin meter un chatbot en el OS.

PRISMA y echoAI tampoco se importan: uno analiza una señal continua; el otro
aprende a actuar en un mundo discreto. Las tres líneas siguen separadas y se
encuentran sólo a través de contratos explícitos.

## Estado de echoAI

ECHO-1 integra memoria episódica, política, modelo del mundo, cuerpo, objetos,
operaciones, lenguaje acotado, narración póstuma, patrones temporales y
transferencia. Su cierre reproduce 488 pruebas correctas, un fallo esperado
documentado y ganancias de transferencia de `+56` y `+72`.

ECHO-2 está planificado para reconocimiento de objetos, homeostasis y
supervivencia entre vidas. ECHO-3 trasladará esas capacidades a robótica al
edge: primero simulación y HIL; después cámara, LiDAR y un dron controlado por
PX4/Pixhawk.

## Hardware

No hay AKD1000 en el laboratorio. Akida aparece únicamente como sonda, stub o
hardware futuro. Si se incorpora, se publicarán medidas propias y no cifras
heredadas de un folleto.

— R.N.
