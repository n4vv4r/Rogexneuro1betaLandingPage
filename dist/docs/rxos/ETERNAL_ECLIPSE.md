# Eternal Eclipse — hoja de ruta pública

**Estado mixto.** Este papel dice dónde estamos, qué se puede arrancar
hoy, y qué es visión. Si una casilla no tiene ISO, comando o cifra
medida, no está hecha. Fecha de este corte: **20 agosto 2026** (host NAVI **10 Echo** LIVE; rxOS **10** próximo; ISO de hoy **9.0.0**).

Lectura viva en la web: [`/roadmap`](https://www.rogexlaboratories.com/roadmap).

## 0. Dónde estamos — dos verdades a la vez

| Cosa | Qué es | Estado |
| --- | --- | --- |
| rxOS **8.5** + NAVI **6.5 RLC** | Última línea **medida en metal** | HECHO. HP 15-ac195nl, 17 ago 2026 |
| rxOS **9.0 SMOKE** + NAVI **7-WORLD** | ISO que se descarga hoy | EN CURSO. Escritorio + catálogo. No es NPU |
| NAVI **7-NPU** (Akida) | 6.5 + silicio real | PLAN. `neurocpu akida` se niega. 0 placas en el lab |
| NAVI **8.8 / 8.9** + host | Supervivencia + dual + desk | **HECHO** en host (no en la ISO 9) |
| NAVI **9.2 zorro** + host | Tarea, Echo, resume, léxico | **HECHO** en host. No es NPU. No ve. |
| NAVI 9 + rxOS 10 | El SO salta a 10 | PLAN / VISIÓN |
| NAVI **10** + rxOS **10** | **El Eclipse** + Akida + visión/cuerpo | MIXTO. Host SNN/CAM **LIVE** (`./navi10 --bench`). rxOS 10 **PRÓXIMO** (sin ISO). Akida/cuerpo VISIÓN |
| EternalEclipse.com | Logia de I+D | VISIÓN de marca. Hoy el dominio es rogexlaboratories.com |
| **EchOS** | ISO unificada (SO + modelo + API a Internet) | VISIÓN de producto. No existe el artefacto |

No estamos en el Eclipse. No existe EchOS. El laboratorio se llama
todavía **Rogex Laboratories** y la comunidad se llama
**Knights Computer Club / Knights Labs**.

## 1. La frase

Dos versiones que crecieron aparte — el sistema y la mente —
van a coincidir en el **10**. Ese cruce es el eclipse. Después
el laboratorio deja de llamarse laboratorio y se llama logia.
Después el sistema y la mente dejan de ser dos descargas.

```
6.5 / 8     →   7 / 9     →   8 / 9     →   9 / 10     →   10 / 10
laboratorio     SMOKE          alineación     aproximación      ECLIPSE
medido          shipping       plan           plan              visión
```

## 2. Tres fases

### I. Laboratorio — `rogexlaboratories.com`

Proyectos que se pueden tocar por separado. El SO es un unikernel.
NAVI es una línea SNN dentro (y a veces al lado) de ese unikernel.
PRISMA es otro producto. Knights Labs licencia y publica.

Esto **ya existe**.

### II. Alineación — `EternalEclipse.com`

Cuando NAVI 10 y rxOS 10 coincidan, el laboratorio experimental
cierra su nombre. **Eternal Eclipse** será la logia de I+D:
investigación, aceleración, vanguardia. **Knights Computer Club**
sigue siendo el núcleo / la comunidad. No se borra; se ordena.

Esto **no existe**. Es el destino del rebrand.

### III. Unificación — EchOS (Echo-OS / Echoes)

Un solo artefacto: ISO + API directa a Internet. rxOS 10 es la
base. NAVI 10 es el modelo interno. El usuario ya no “abre Navi”:
habla con **Echo**, la voz que habita el sistema. Las instancias
en red son **Echoes**.

Esto **no existe**. No hay ISO EchOS. No hay API Echo.

## 3. Parejas de versión (el contrato público)

| # | NAVI | rxOS | Rol | Estado honesto |
| --- | --- | --- | --- | --- |
| 0 | 6.5 RLC | 8.5 | Línea medida (RAPL, metal) | **HECHO** |
| 1 | 7-WORLD | 9 SMOKE | Escritorio negro + catálogo + harvest | **EN CURSO** (ISO v9.0.0) |
| 1b | 7-NPU | 9 | Mismo router, spikes en Akida | **PLAN**. Sin placa |
| 2 | 8.8 / 8.9 | host | Supervivencia + dual | **HECHO** (Python/TUI) |
| 2b | **9.2 zorro** | host | Tarea + Echo + teach | **HECHO** (no ISO, no Akida) |
| 3 | 9 | 10 | El SO salta. NAVI aún no es 10 | **PLAN / VISIÓN** |
| 4 | 10 | 10 | **El Eclipse**: Akida, cámara, cuerpo Pi/Arduino | **VISIÓN** |
| 5 | Echo | EchOS | Un solo paquete, API a Internet | **VISIÓN** |

NAVI **9.2** sí tiene código (`./navi9` en el host). NAVI **10** también (`./navi10`). rxOS **10** no tiene ISO.
No se vende visión como ISO. Se vende el orden y la negativa a fingir
el cruce: sin placa Akida no hay 7-NPU; sin cámara no hay visión.

## 4. Qué se puede comprobar hoy (no es marketing)

| Hecho | Dónde |
| --- | --- |
| ISO 9.0.0 VM + metal | [release v9.0.0](https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0) |
| NAVI 7-WORLD = 73 fichas, bench 15/15 | `./navi7 --bench` |
| WSP = 16 bytes | `_Static_assert` en `wsp.h` |
| 8.5 metal, idle 3678 mW, Q6 72.5 µJ/run | `docs/HP_AC195NL_85.md` |
| 7-NPU ausente | `neurocpu akida` se niega |
| Event fabric bench | 6/6 en boot |

NAVI no es un LLM. Si no hay ficha: **DESCONOCIDO**.

## 5. Arquitectura de marca (visión, no registro mercantil)

| Enfoque | Ahora / base | Destino / élite |
| --- | --- | --- |
| Dominio | rogexlaboratories.com | EternalEclipse.com |
| Rol | Laboratorio experimental | Logia de I+D y aceleración |
| Comunidad | Knights Computer Club | Sigue. No se disuelve |
| Hito que autoriza el cambio | Navi 6.5→9 / rxOS 8→9 | **Navi 10 + rxOS 10** |

Eternal Eclipse no sustituye al club. Es la logia *dentro* del
club: la parte que investiga y empuja. El club es la plaza.

## 6. EchOS — qué significaría (cuando exista)

- **EchOS** = Echo-OS. Una ISO. Un sistema. Una API a Internet.
- **Echo** = la entidad con la que hablas. Hoy se llama NAVI.
- **Echoes** = las instancias / señales que resuenan en red.

Hasta que NAVI 10 y rxOS 10 existan *y* se empaqueten juntos,
decir EchOS es contar el final de una película que estamos
rodando. Se cuenta. No se cobra como estreno.

## 7. Lo que no prometemos

- Fecha del Eclipse. Hay orden, no calendario.
- Que 7-WORLD “ya es 7 de verdad” en el sentido NPU. No lo es.
- Silicio Akida, TLS de cuerpo, Wi-Fi, UEFI nativo, >4 GiB.
- Que Echo vaya a predecir el siguiente token. La tesis no cambia:
  esquema o DESCONOCIDO.
- Uso clínico. Nada de esto es dispositivo médico.

## 8. Lectura

| Doc | Para qué |
| --- | --- |
| [CIANOTIPO.md](CIANOTIPO.md) | Plano técnico rxOS / NAVI / PRISMA / Akida |
| [NAVI7.md](NAVI7.md) | 7-WORLD vs 7-NPU |
| [RXOS9.md](RXOS9.md) | Qué es la ISO 9 |
| [HP_AC195NL_85.md](HP_AC195NL_85.md) | Cifras metal |
| [ROADMAP.md](../ROADMAP.md) | Backlog de ingeniería por versión histórica |

Experimental. GPLv3 en el árbol rxOS. No clínico.
Knights Labs / Rogex Laboratories · 2026.
