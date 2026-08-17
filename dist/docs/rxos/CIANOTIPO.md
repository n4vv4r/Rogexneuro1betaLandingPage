# Cianotipo — futuro de rxOS, NAVI y PRISMA

**Estado mixto.** Este papel junta lo que **ya corre**, lo que está
**dibujado** y lo que depende de silicio que **no está en el lab**.
Sirve para que un extraño pueda auditar si sabemos qué estamos
haciendo. Si una casilla no tiene comando o commit, no está hecha.

Fecha de este corte: 17 agosto 2026.
Línea viva: rxOS 9 SMOKE + NAVI 7-WORLD (73 fichas) + RLC 6.5 + PRISMA Engine 0.1.
7-NPU (Akida) sigue PLAN.

## 0. Una imagen

```
mundo físico
    │  EEG, mic, red, teclado
    ▼
PRISMA Engine          Δ-mod, SPSC, LIF AVX2     [software hoy]
    │  spikes / eventos
    ▼
rxOS event fabric      rx_event_t 64 B, LIF Q16.16, STDP local
    │
    ├─ caminos de corrección (IRQ, disco, wired)
    │     NUNCA umbralizados. El NPU no los toca.
    │
    └─ caminos blandos
          │
          ▼
        NAVI 7-WORLD     catálogo + harvest + 11 G_* + 5 cajas
          │
          ├─ CPU          talk, logic, poem, news, code, rxos,
          │               math, plan, teach, reason, debug
          │
          └─ NPU          [PLAN] Akida: Q6 / SNN / front-end PRISMA
                          neurocpu akida  → hoy se niega
```

Tres productos, un idioma (eventos enteros). Ninguno es un LLM.

## 1. Qué hay hoy (se puede medir)

| Pieza | Dónde se demuestra | Número o comando |
| --- | --- | --- |
| rxOS unikernel x86_64 | ISO 9 VM / metal | `make iso-vm` / tecla `v` |
| Tejido de eventos | boot + `bench` | 6/6, evento 64 B |
| LIF / STDP software | fabric + NAVI 5 | Q16.16, 0% FPU en el motor |
| WSP 16 B | `wsp.h` | `_Static_assert` 16 |
| NAVI 1 Q6 | `navi_q6.c` | 1-bit 48/48, hop 120/120 |
| NAVI 4.5 operador | `/prove` | `G_rxos` = Terminal |
| NAVI 5 lab | `tests/test_navi5_manual.py` | KCC: 0 destruidas |
| NAVI 6 tutor | `tests/test_navi6.py` | 6/6 DAG / world-model |
| NAVI 6.5 RLC | `./navi65`, `test_navi65.py` | 16/16, 11 G_* |
| NAVI 7-WORLD | `./navi7 --bench`, tecla `v` | 15/15, 73 fichas |
| PRISMA Engine 0.1 | `/downloads` | SPSC, Δ-mod, LIF AVX2 |
| Hook Akida / Loihi | `neurocpu akida` | **stub honesto, sin placa** |

Niveles de la [hoja de ruta neuromórfica](paper/rxos_hoja_de_ruta_4_niveles_rev1.3.html):

| Nivel | Nombre | Estado |
| --- | --- | --- |
| 1 | Tejido de eventos | **Cerrado** |
| 2 | Límites x86_64 + energía | **Cerrado** (RAPL en metal; QEMU se niega) |
| 3 | Delegar spikes a un NPU | **Objetivo** — 0/5. Este cianotipo es su plano |
| 4 | Memristor / in-memory / sin reloj | **Horizonte** de la industria, no un sprint |

## 2. Tres líneas, un contrato

### rxOS

El unikernel es el **sitio**. Event fabric, WSP, NAVI, escritorio,
persistencia RXFS. No es Linux. No hay libc. El NPU entra como
actor, no como “el SO corre en Akida”.

Próximo trabajo de SO que el Nivel 3 **exige** (no es NAVI):

1. Pila USB XHCI + bulk, o MMIO PCIe si el kit es AXI/PCIe.
2. Reloj más fino que el PIT a 100 Hz (HPET / LAPIC) si se
   entregan trenes de spikes con sentido temporal.
3. Driver `HardwareDriver` (ver [AKIDA.md](AKIDA.md)).
4. Energía comparada CPU vs NPU.

Sin (1) no hay kit USB. Sin (3) el interruptor sigue siendo teatro
educado. Sin (4) no se publica un vatio.

### NAVI

Línea SNN propia. Cada generación **añade una capa**:

| Gen | Rol | Estado |
| --- | --- | --- |
| 1 | Hipercubo Q6 | Cerrado en kernel |
| 2 | ASCII L3 | Legado, el binario sigue |
| 3 | WSP 16 B | Contrato cerrado |
| 4.5 | Operador `G_rxos` | Actual en la ISO 8 |
| 5 | Lab cooperativo KCC | Host / Docker air-gap |
| 6 | Tutor causal | Host + kernel |
| **6.5** | **RLC oficial** | Host + router en kernel |
| **7** | **6.5 + NPU** | [Plan](NAVI7.md). No hay código |

6.5 ya razona, habla y emite código **con esquema**. 7 no es un
cerebro nuevo: es el mismo router con un sitio donde Q6 y las
poblaciones pueden ejecutarse en Akida.

### PRISMA

Front-end de sensor. Engine 0.1 es real y se descarga. **PRISMA 5
SNN no tiene descarga pública.** El roadmap de P5 ya dice: Akida
es acelerador, no bloquea el diseño software.

El día del NPU, PRISMA no se fusiona con NAVI. Entrega spikes.
NAVI decide. rxOS transporta.

## 3. El gancho Akida, en una página

Detalle en [AKIDA.md](AKIDA.md). Resumen para auditoría:

1. **Hoy:** `rx_backend.c` conoce `akida` y se niega.
2. **Host:** MetaTF 2.19 (Keras/ONNX → `quantizeml` → `cnn2snn` →
   `.fbz`). Simulador CPU o placa USB en Linux.
3. **Kernel:** Akida Engine C++ (`akida engine deploy`). Nosotros
   implementamos `read/write/scratch/visible`. Ellos
   `program/enqueue/fetch`.
4. **Codec:** WSP y rasters uint8. El DAG y las máscaras se quedan
   en CPU.
5. **Legal:** runtime Akida propietario. No se mete en el tarball
   GPLv3. El driver nuestro sí.
6. **Medida:** floor ~914 mW en **su** placa de referencia (MetaTF
   CLI, DS-CNN). No es un número de Knights Labs.

Loihi sigue como stub. Acceso peor, no es el camino 7.

## 4. Planning (orden, no calendario)

No hay fecha de ISO-con-NPU. Hay un orden que se puede fallar en
público.

| Fase | Qué se cierra | Se ve así | Bloqueado por |
| --- | --- | --- | --- |
| A | `.fbz` de Q6 en el **simulador** MetaTF | `tests/` compara Hamming vs LIF | Nadie. Se puede empezar |
| B | Kit AKD1000 en un Linux del lab | `akida devices` lista el SoC | Comprar / pedir el kit |
| C | USB XHCI o probe PCIe en rxOS | `devices` muestra el NPU | Pila USB / IDs / docs de registro |
| D | `HardwareDriver` + `program` de un sequence | `neurocpu akida` imprime HwVersion | C + NDA/docs BrainChip |
| E | Offload Q6, test 48/48 en silicio | `navi` / `navi65` backend=akida | D |
| F | Blob `NAVI7W01` + ISO | tag NAVI 7, según [NAVI7.md](NAVI7.md) | E + energía medida |
| G | PRISMA → tensor → mismo driver | demo sensor, no clínico | F + HAL P5 |

Fase A no espera a nadie. B espera a una caja. C–D son ingeniería
de SO. F no se nombra NAVI 7 si E no cierra.

## 5. NAVI después de 7 (horizonte, no backlog)

Se escribe para que 7 tenga un destino, no para vender 8.

- **7.x** — más secuencias en el NPU (poblaciones 5/6, no el
  razonador). Edge learning de Akida 1 etiquetado como **suyo**.
- **8 (horizonte)** — si existiera un chip memristivo accesible,
  el fabric dejaría de simular la sinapsis. Eso es Nivel 4. No hay
  proveedor, no hay fecha, no hay issue.
- Nunca: “NAVI GPT”, “NAVI en qubits”, “NAVI clínico”.

## 6. Cómo se usa este papel

- Inversores / prensa: las tablas del §1 son lo entregado. El §4
  es un plano. El Nivel 4 no es un hito de esta empresa.
- Usuarios de la ISO: `neurocpu akida` tiene que seguir negándose
  hasta D. Si un día dice “active” y no hay placa, es un bug.
- Desarrolladores: no mezclar MetaTF (Python, host) con el Engine
  (C++, MCU). No umbralizar wired. No meter `.so` propietarios
  en el kernel GPLv3.
- Lab PRISMA: P5 no espera a F. El Engine se mide en software.

## 7. Lectura

| Doc | Para qué |
| --- | --- |
| [AKIDA.md](AKIDA.md) | Contrato BrainChip + cinco cerraduras |
| [NAVI7.md](NAVI7.md) | Criterios para atreverse a llamar 7 a un commit |
| [NAVI65.md](NAVI65.md) | El modelo que ya se ejecuta |
| [hoja 4 niveles](paper/rxos_hoja_de_ruta_4_niveles_rev1.3.html) | Niveles 1–4, rev 1.3 |
| [PRISMA 5 roadmap](../ROGEX-LABORATORIES/public/docs/prisma/PRISMA_5_ROADMAP.md) | P5 no es el Engine |
| [USER_GUIDE](USER_GUIDE.md) | `neurocpu` tal como lo ve el usuario |

Fuentes de terceros: [BrainChip IP](https://brainchip.com/ip/),
[MetaTF](https://doc.brainchipinc.com/). Experimental. No clínico.
GPLv3 en el árbol rxOS. Akida es marca de BrainChip, Inc.
