# Evidencia de echOS 3.0

La versión se considera completa **respecto a su alcance publicado**, no por una etiqueta. El cierre exige arranque multiplataforma, runtime acotado, persistencia, PX4 y ausencia de promesas falsas.

## Resultado del cierre

| Certificado | Comprobaciones | Fallos |
|---|---:|---:|
| x86_64 BIOS | 130 | 0 |
| x86_64 UEFI | 130 | 0 |
| NVMe + GPT + reboot | 20 | 0 |
| PX4 x86_64 | 25 | 0 |
| AArch64 directo + PX4 | 76 | 0 |
| AArch64 UEFI | 60 | 0 |
| **Total** | **541** | **0** |

Una auditoría posterior repitió además el build x86 dos veces desde árboles limpios: `rxos.elf`, `rxos.bin` y la ISO fueron idénticos byte a byte.

## Qué se midió

- 61 registros inyectados: 50 aceptados, 3 rechazados y 8 descartados por una cola llena ejercitada a propósito.
- Safety gate: 43 aceptaciones intactas, 4 modificaciones y 1 bloqueo.
- Cero llamadas a `kmalloc` en el camino sensor→intención.
- Marcas de agua, drops, expiraciones, deadlines y watchdog publicados.
- En los ensayos PX4 finales: cero errores CRC y cero huecos de secuencia.
- Persistencia: 21 bytes escritos en NVMe, reinicio y lectura idéntica.

## Cómo leer la latencia

Los percentiles son cotas de buckets (`<31 µs`, `<127 µs`, etc.) y se ejecutan bajo emulación. No forman parte del conjunto determinista: el host puede mover una muestra de un bucket a otro. Lo reproducible son la estructura, los balances, las decisiones del gate y los artefactos de build.

## Fuentes descargables

- [Informe JSON completo](/data/echos3/report.json)
- [Capturas y registros serie](./galeria)

Las imágenes no son mockups: cada una procede de un arranque independiente y conserva el log serie de esa misma sesión.

— R.N.
