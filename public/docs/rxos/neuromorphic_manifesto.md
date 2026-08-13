# Manifiesto Tecnológico y Bases de I+D — Rev 0.2
## Computación Neuromórfica, Lógica Memristiva y un Tejido de Eventos para RXos

**Rogex Laboratories — Oficina del Director Científico (CSO) y Arquitectura de Sistemas Principal**
Documento de Investigación y Desarrollo · **Rev 0.2** · Clasificación: Interno / Fundacional
Ámbito: RXos (Rogex OS) · rogexgreen.com

> **Qué cambia frente a Rev 0.1.** La Rev 0.1 fijó la *visión*. Esta Rev 0.2 la
> **aterriza en ingeniería ejecutable**: incorpora el análisis y la validación de
> un prototipo *host-side* (`rxos_neuromorphic_blueprint`) que fue inspeccionado
> contra esta misma rama y **ejecutado y medido** en banco. El manifiesto deja de
> ser solo aspiracional: ahora distingue con números lo que ya es demostrable
> (asincronía por eventos, plasticidad software) de lo que sigue siendo objetivo
> de hardware (memristores físicos, cómputo analógico en memoria).

---

### Nota de estado científico (honestidad de ingeniería)

Este documento es un **manifiesto de I+D y una arquitectura objetivo**, no un
informe de producto. RXos, hoy (v4 Foundation), es un SO experimental
**bare-metal x86_64 de arquitectura von Neumann**. Nada de lo aquí descrito como
*hardware neuromórfico* está embarcado. Lo que **sí** existe y se ha validado es
un **modelo software** del paradigma —un tejido de eventos con actores que
duermen en colas y sinapsis memristivas simuladas— que corre en Fedora como
co-simulador. Regla de comunicación del laboratorio, sin excepciones:

- **VALIDADO (software):** demostrado y medido en banco; se puede enseñar.
- **OBJETIVO DE I+D (hardware):** memristores físicos, crossbars analógicos,
  cómputo en memoria; aún no existe en Rogex.
- **x86 sigue siendo x86.** El sustrato permanece con reloj. «Consumo cero» nunca
  es literal: significa *ausencia de bucle de sondeo en espacio de usuario*, no un
  cero termodinámico.

---

## 1. Executive Summary & Manifesto

### 1.1 Declaración de misión

Rogex Laboratories existe para construir cómputo que no cueste un planeta. La
industria del software ha externalizado su factura termodinámica a la atmósfera:
cada capa de abstracción «gratuita» se paga en julios disipados. Nuestra misión es
invertir esa ecuación —código radicalmente eficiente sobre sustratos que fusionen
memoria y cómputo— bajo soberanía del usuario, no de la nube corporativa.

El hardware tradicional ha entrado en un régimen de **rendimientos decrecientes
estructurales**. El fin del escalado de Dennard desacopló la densidad de
transistores del presupuesto de potencia: seguimos empaquetando más lógica, pero
ya no podemos alimentarla ni refrigerarla al mismo ritmo (*dark silicon*), justo
cuando la demanda de cómputo crece de forma superlineal.

### 1.2 Denuncia técnica: el coste ecológico de von Neumann

La arquitectura von Neumann separa físicamente procesamiento y memoria y los une
por un bus finito. De ahí el **cuello de botella de von Neumann** (*memory wall*):
en cargas dominadas por datos —la IA lo es— el sistema gasta su energía
**moviendo bits, no computándolos**. Según Horowitz (ISSCC 2014, 45 nm), una suma
en coma flotante de 32 bits cuesta **~0,9 pJ**, mientras que **leer esos 32 bits
desde DRAM cuesta ~640 pJ**: un factor de **~700×**. Escalado a un datacenter:

- **Consumo a escala de gigavatios**, con proyección al alza por la IA generativa.
- **Refresco perpetuo de DRAM**: la memoria volátil gasta energía solo para *no
  olvidar*, incluso en reposo.
- **Disipación térmica y su cola ambiental**: refrigeración activa con dos
  externalidades poco contabilizadas, el **estrés hídrico** y la **contaminación
  acústica** (enfriadoras operando en **decenas de decibelios sobre el ruido de
  fondo**, 24/7).

Von Neumann no es un defecto de implementación; es un límite de paradigma.

### 1.3 Tesis central

> **La computación sostenible no se logra apagando servidores ecocidas más rápido,
> sino construyendo sistemas que, como la biología, gasten energía solo cuando y
> donde ocurre algo.**

Tres principios como doctrina de diseño: **cómputo en memoria** (la memoria *es* el
procesador), **asincronía por eventos** (sin reloj global; el cómputo se dispara
por picos ante estímulos), y **localidad de ultra-bajo consumo** (la inteligencia
vive en el borde, desconectada de la nube).

---

## 2. Neuromorphic Paradigm & Memristive Logic

### 2.1 El memristor: resistencia con memoria

Cuarto elemento pasivo fundamental (Chua, 1971; realizado por HP Labs, Strukov
*et al.*, 2008). Su resistencia —la **memristancia**— depende de la integral
histórica de la corriente, codificada en una variable de estado interna `w`:

```
v(t) = M(w(t)) · i(t)        dw/dt = f(w, i)
```

En una celda de TiO₂ₓ la conductancia la gobierna la **distribución de vacantes de
oxígeno**; el campo eléctrico provoca su **migración iónica**, desplazando la
frontera dopada/no-dopada. La clave de sostenibilidad es la **no volatilidad**:
sin alimentación las vacantes quedan ancladas y el estado **persiste durante años
con cero vatios de retención** — se elimina de raíz el refresco de la DRAM. Su
firma es la **histéresis pellizcada** (lazo I–V que pasa por el origen).

### 2.2 La matriz sináptica: el crossbar memristivo

En rejilla (*crossbar*), los memristores materializan una **matriz de pesos
sinápticos** donde la multiplicación matriz-vector se ejecuta **en el dominio
físico, O(1)**: la ley de Ohm pondera (`I = G·V`) y Kirchhoff suma por columna
(`Iᵢ = Σⱼ Gᵢⱼ·Vⱼ`). El producto sináptico ocurre por física, no por instrucciones.

### 2.3 Redes de impulsos (SNN), asincronía por eventos y STDP

Sobre ese sustrato operan las **SNN**: neuronas *integra-y-dispara con fuga* (LIF)
que **solo emiten un pico —y solo entonces consumen energía— al cruzar el
umbral**. En reposo, la mayoría permanece **latente** con consumo estático que
tiende al suelo de fuga. El aprendizaje es **local**: la **STDP** ajusta cada peso
según el orden temporal entre pico presináptico y postsináptico (Hebb temporizado).

**Anclaje empírico (hardware de terceros):** IBM TrueNorth ejecuta 10⁶ neuronas con
decenas de mW; Intel Loihi demuestra ganancias de eficiencia de uno a varios
órdenes de magnitud en cargas dispersas; SpiNNaker escala a millones de núcleos.
El sustrato existe; la tesis de Rogex es **construir el OS que lo gobierne** — y el
§3/§5 muestran que ese OS se puede empezar a construir **hoy, en software**.

---

## 3. Architecture Target for RXos

> **El error a evitar** no es «un SO de sondeo que sustituir por una SNN». RXos
> **ya** es event-driven en su base: los IRQ de teclado/ratón encolan mensajes
> IPC y la CPU hace `hlt` mientras no hay entrada. El trabajo real es **generalizar
> esa base**, no reemplazarla.

### 3.1 De la base actual a un tejido de eventos tipado

Diagnóstico de esta rama (`claude/rogex-os-baremetal-arch-s2uo7e`): base
event-driven sólida (IRQ → cola IPC → `hlt`), *pero* el scheduler es un stub, el
sistema es un único flujo, y el camino pseudo-periódico que queda es la red Rogex
Wired (`wired_service()` colgado como único *idle hook*, drenando `net_poll()` tras
los despertares del PIT; el ISR de virtio-net solo marca `g_pending`, y el
protocolo drena siempre porque INTx no es fiable en todas las máquinas QEMU).

El refactor correcto, en orden:

1. **Generalizar el IPC en un tejido de eventos tipado** (colas MPSC acotadas,
   prioridad, destino, contrapresión).
2. **Convertir las recepciones del NIC en eventos encolados**: el ISR de virtio
   encola `RX_EVENT_NET_RX_READY`; un *actor de red* drena el anillo usado.
   Además, **eliminar la espera activa de TX en `vnet_send()`**: publicar el
   descriptor, marcar el actor `WAITING_TX` y reactivarlo con un evento de
   compleción de TX.
3. **Sustituir el único idle hook por fuentes/actores registrados.**
4. **Activación por umbral solo para servicios blandos y diferibles.**
5. **Preservar deterministas** los caminos de IRQ, memoria, cripto y *deadlines*.

### 3.2 La frontera crítica (no negociable)

> Un umbral neuronal **jamás** debe decidir si RXos atiende un fallo de página,
> reconoce una interrupción, completa una escritura a disco, atiende un *watchdog*
> o aplica un control de acceso.

La activación tipo SNN pertenece a: batching adaptativo, refresco de UI,
agregación de anomalías, **telemetría ambiental**, *prefetch* de caché, o pistas de
enrutado no críticas. La corrección del kernel no se somete a votación estadística.

### 3.3 Plasticidad lógica y tolerancia a fallos

La fiabilidad en von Neumann es **frágil y binaria** (un puntero nulo → colapso).
La biología es **redundante y plástica**. Rogex traslada eso como **plasticidad
lógica**: redundancia descentralizada (degradación graciosa, no fallo
catastrófico) y **reconfiguración de rutas por ensayo y error** vía STDP local — el
sistema *rodea* el defecto en lugar de detenerse ante él. **OBJETIVO DE I+D**: sobre
x86 esto se aproxima con el tejido de actores; la plasticidad física plena requiere
el crossbar.

### 3.4 Puerto a C tras validar en Python (fases)

- **Fase A — tejido de eventos, sin SNN aún.** `kernel/event/event.{h,c}` con un
  paquete de tamaño fijo. El ISR solo reconoce el dispositivo y encola un
  descriptor; **no se parsean tramas en contexto de interrupción**.
  ```c
  typedef struct {
      uint32_t type;
      uint16_t source;
      uint16_t destination;
      uint8_t  priority;
      uint8_t  flags;
      uint16_t payload_len;
      uint64_t timestamp_ticks;
      int32_t  stimulus_q16;     /* punto fijo Q16.16 */
      uint8_t  payload[48];
  } rx_event_t;
  ```
- **Fase B — conversión de red.** `events_set_idle_hook(wired_service)` → evento
  `RX_EVENT_NET_RX_READY` desde el ISR; el actor de red drena el anillo. Mantener
  un *deadline* de baja frecuencia como red de seguridad hasta verificar
  MSI-X/INTx en todas las máquinas QEMU soportadas.
- **Fase C — actores por umbral.** Bloque de control con potencial en punto fijo,
  umbral, último tick, *deadline* refractario y callback acotado. **Decaimiento
  perezoso** al llegar un evento; nunca un «tick neuronal» periódico.
- **Fase D — persistencia y telemetría.** Persistir pesos aprendidos a RXFS solo en
  *checkpoints* controlados (no en cada pico). Exportar *snapshots* muestreados a un
  proceso host; **no** embeber FastAPI ni Python en la imagen bare-metal.

---

## 4. Impact Matrix (Rogex Green)

### 4.1 Proyección de ahorro energético (paradigma) + medición real (software)

**Proyección de paradigma** (anclada en hardware de terceros, no medición de RXos):

| Dimensión | Kernel tradicional (von Neumann) | Kernel neuromórfico (objetivo) |
|---|---|---|
| Localización del cómputo | CPU y DRAM separadas por bus | Cómputo en memoria (crossbar) |
| Coste dominante | Movimiento de datos (~700×, Horowitz 2014) | Conmutación de picos; el acarreo se elimina |
| Memoria en reposo | Refresco perpetuo de DRAM | No volátil · **0 W** de retención |
| Escala de potencia (referente) | 10²–10³ W (aceleradores IA) | 10⁻²–10⁻¹ W (Loihi/TrueNorth) |
| Diferencial de eficiencia | 1× (línea base) | 10²–10⁴× en cargas dispersas* |
| Modo de fallo | Colapso (pantalla azul) | Degradación graciosa + reconfiguración |

*Rango reportado por terceros; dependiente de la carga.

**Medición real en banco** (§5): el modelo software **ya demuestra** el principio
que hace posible ese ahorro —no gastar CPU en reposo—: **0,04 % de CPU** con actores
suspendidos frente a **99,6 %** de una línea base de sondeo equivalente. Es el
mecanismo, medido; no una extrapolación de energía de hardware.

### 4.2 Software descentralizado como resistencia climática

La eficiencia es el **habilitador de la soberanía**. Un modelo que consume decenas
de vatios en el borde puede vivir **en el dispositivo del usuario, desconectado de
la nube**. Conexión con **rogexgreen.com**:

- **Democratización de la IA local.** Devolver la inferencia al borde: IA que no
  requiere permiso, conexión, ni el datacenter de un tercero.
- **Sensórica ambiental de ultra-bajo consumo (*remote sensing*).** El régimen
  «latente hasta que ocurre algo» es ideal para monitoreo distribuido: nodos que
  duermen meses y **despiertan solo ante el evento crítico** —un pico de
  contaminante, un umbral de **contaminación acústica en decibelios**, una firma
  espectral de deforestación—. Una SNN embarcada procesa *in situ* y transmite solo
  la conclusión.
- **Integración honesta en el panel.** El prototipo trae un adaptador para el
  panel de Rogex Green que **conserva el contrato de sondeo de 30 s** de Vercel
  (no abre un WebSocket por visitante), degrada con gracia
  (`Promise.allSettled`), usa token solo-servidor, y **etiqueta el bloque como
  `SOFTWARE SIMULATION`**. Regla explícita: **no mezclar la energía sináptica
  simulada con la energía medida de datacenters ni con los datos ambientales
  reales**. Coherencia antes que espectáculo.

---

## 5. Validación ejecutable (nuevo en Rev 0.2)

El prototipo `rxos_neuromorphic_blueprint` es un **paquete Python de cero
dependencias en su núcleo** (asyncio de la stdlib) que modela el paradigma en
software. Fue **inspeccionado contra esta rama y ejecutado en banco**. Componentes:

- **`MemristorSynapse`** — sinapsis memristiva software: estado interno acotado
  `x∈[0,1]`, `R(x) = R_on·x + R_off·(1−x)`, deriva por historia de corriente con
  ventana tipo Joglekar, **STDP por pares** con trazas pre/post de **decaimiento
  perezoso**, actualización Hebbiana explícita, y **persistencia JSON atómica**. No
  crea hilos ni temporizadores: el estado solo cambia ante eventos.
- **`SpikeDispatcher`** — planificador de actores tipo SNN: una `asyncio.Queue`
  acotada por *task neuron*, *workers* suspendidos en `await queue.get()` (sin bucle
  de sondeo), LIF de decaimiento perezoso, umbral/refractario, plasticidad local y
  por conexión, **contrapresión con métrica de eventos descartados**, y *listeners*
  de telemetría que **no pueden detener la planificación**.

### 5.1 Resultados medidos (ejecución propia, host de banco)

| Prueba | Resultado | Lectura |
|---|---|---|
| Suite unitaria | **8/8 OK** | memristor + dispatcher (Python 3.11)† |
| Demo (integración de eventos) | Primer estímulo 0,45 **suprimido**; 0,45+0,60 → potencial 1,05 > 1,0 → **dispara** y resetea | LIF por umbral, correcto |
| CPU en reposo · 1000 neuronas · 3 s | **0,08 %** de un núcleo | actores suspendidos, no *spinning* |
| Rendimiento de eventos · 100 000 | **~65 000 eventos/s** | coste por evento bajo y acotado |
| Event-driven **vs** sondeo · 2 s · 200 workers | **0,04 %** vs **99,6 %** de CPU (63,7 M iteraciones desperdiciadas) | el mecanismo del ahorro, medido |

† El `pyproject.toml` declara `requires-python >=3.12` (por el extra de
investigación Brian2); el núcleo corre sin problemas en 3.11. **Recomendación:**
relajar el requisito del núcleo a `>=3.11` y aislar 3.12 al extra `research`, o
documentar 3.12 como requisito duro.

### 5.2 Juicio técnico del prototipo

Es **ingeniería honesta y competente**, el complemento exacto de este manifiesto:
código defensivo (validación de entradas, *fail-safe* en telemetría), la
reformulación correcta del problema (tejido de eventos + actores, no «x86 se vuelve
neuromórfico»), la **frontera crítica** bien trazada, y **se niega a sobre-afirmar**
(mide CPU de proceso, no energía, y lo dice). Decisiones de librería sensatas
(asyncio en el núcleo; Brian2/Nengo fuera del kernel; descarta Lava —archivado en
2026— y BindsNET como dependencia núcleo por licencia AGPL/PyTorch). Se adopta como
**banco de validación oficial** de la línea neuromórfica de RXos.

---

## Apéndice A — Decisiones de tooling (del prototipo, ratificadas)

- **asyncio (stdlib):** núcleo del prototipo; semántica de eventos, CPU de reposo baja.
- **Brian2:** validación de ecuaciones diferenciales/STDP — fuera del kernel.
- **Nengo:** modelos SNN de alto nivel y visualización — fuera del kernel.
- **BindsNET:** **no** como núcleo (release PyPI antiguo, arrastra PyTorch, AGPL-3.0).
- **Lava:** **no** adoptar (proyecto archivado por Intel en 2026).
- **FastAPI + WebSockets / prometheus-client:** telemetría local de ingeniería.
- **Medición:** `perf stat`, `/usr/bin/time -v`, y RAPL/medidor externo para energía
  real. **No** afirmar ahorro energético solo desde el % de CPU.

## Apéndice B — Referencias

1. L. O. Chua, *«Memristor — The Missing Circuit Element»*, IEEE TCT, 1971.
2. D. B. Strukov *et al.*, *«The missing memristor found»*, Nature, 2008.
3. M. Horowitz, *«Computing's Energy Problem…»*, ISSCC, 2014.
4. P. Merolla *et al.*, *«A million spiking-neuron integrated circuit»* (TrueNorth), Science, 2014.
5. M. Davies *et al.*, *«Loihi: A Neuromorphic Manycore Processor»*, IEEE Micro, 2018.
6. W. Maass, *«Networks of spiking neurons: the third generation…»*, Neural Networks, 1997.

---

*Rogex Laboratories · Oficina del Director Científico · Rev 0.2 — Bases conceptuales
validadas por prototipo software. Ninguna capacidad marcada OBJETIVO DE I+D debe
comunicarse como embarcada hasta su verificación reproducible. Lo etiquetado
VALIDADO (software) se ha ejecutado y medido en banco.*
