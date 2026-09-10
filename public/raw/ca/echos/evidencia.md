# Evidència d'echOS 3.0

La versió es considera completa **respecte del seu abast publicat**, no per una etiqueta. El tancament exigeix arrencada multiplataforma, runtime acotat, persistència, PX4 i absència de promeses falses.

## Resultat del tancament

| Certificat | Comprovacions | Fallades |
|---|---:|---:|
| x86_64 BIOS | 130 | 0 |
| x86_64 UEFI | 130 | 0 |
| NVMe + GPT + reinici | 20 | 0 |
| PX4 x86_64 | 25 | 0 |
| AArch64 directe + PX4 | 76 | 0 |
| AArch64 UEFI | 60 | 0 |
| **Total** | **541** | **0** |

Una auditoria posterior també va reconstruir x86 dues vegades des d'arbres nets: `rxos.elf`, `rxos.bin` i la ISO van ser idèntics byte a byte.

## Què s'ha mesurat

- 61 registres injectats: 50 acceptats, 3 rebutjats i 8 descartats per una cua saturada intencionadament.
- Safety gate: 43 acceptacions intactes, 4 modificacions i 1 bloqueig.
- Zero crides a `kmalloc` en el camí sensor→intenció.
- Marques màximes, drops, expiracions, deadlines i watchdog publicats.
- Zero errors CRC i zero salts de seqüència als assajos PX4 finals.
- Persistència: 21 bytes escrits a NVMe, reinici i lectura idèntica.

## Com llegir la latència

Els percentils són cotes de buckets (`<31 µs`, `<127 µs`, etc.) sota emulació. No formen part del conjunt determinista: l'host pot moure una mostra d'un bucket a un altre. L'estructura, els balanços, les decisions del gate i els artefactes de build són l'evidència reproduïble.

## Fonts descarregables

- [Informe JSON complet](/data/echos3/report.json)
- [Captures i registres sèrie](./galeria)

Les imatges no són mockups: cadascuna prové d'una arrencada independent i conserva el registre sèrie complet d'aquella sessió.

— R.N.
