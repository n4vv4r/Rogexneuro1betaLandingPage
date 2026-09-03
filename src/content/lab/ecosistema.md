# El laboratorio

Rogex Laboratories / Knights Labs. Una persona. Tres líneas.

No hay un binario que las una. Hay un mismo método: enteros en el
camino caliente, eventos en vez de sondeo, memoria estática, y no
fingir hardware que no está en la mesa.

| Línea | Qué es | Hoy |
|---|---|---|
| **echOS** | Unikernel de consola. Un ELF. 2.1.0-honest. | Arranca en QEMU y en metal. |
| **PRISMA Engine** | EEG a spikes, Rust, microsegundos. | 0.1.0 se mide. P5 es hoja de ruta. |
| **echoAI** | Agente de dos relojes. | Laboratorio verde. CORTEX-1 verde. |

## Dónde se tocan

echOS y echoAI comparten el paquete **WSP de 16 bytes**. El contrato
es el mismo; los procesos no. echoAI corre en el host. No va dentro
de la ISO.

PRISMA y echOS hablan el mismo vocabulario de sonda Akida. No hay
binding en el kernel todavía.

PRISMA y echoAI no se importan. Uno mira una señal continua. El otro
decide en un mundo discreto.

## Akida

Aparece como stub o sonda. Sin placa, se dice ausente.

— R.N.
