# ECHO-2 — cierre, resultados y demostración

**ECHO-2 quedó cerrado el 9 de septiembre de 2026.** El agente conserva el
núcleo de ECHO-1 y añade viabilidad, reconocimiento de patrones, operación en
flujo, consolidación, herencia de una predisposición y regulación de dos
variables internas. CAPACITY-1 justificó una arquitectura de monitor de 512
LIF + 128 Adaptive-LIF y NEURAL-VIZ-1 la hizo observable en una GUI nativa.

## Demostración directa

<figure class="echo2-video">
  <video controls preload="metadata" playsinline poster="/media/echoai/opengraph/echo2.png" aria-label="Demostración de la GUI nativa de ECHO-2">
    <source src="/media/echoai/echo2-neural-viz-demo.mp4" type="video/mp4">
    Tu navegador no puede reproducir MP4. <a href="/media/echoai/echo2-neural-viz-demo.mp4">Descarga el vídeo</a>.
  </video>
  <figcaption>Grabación directa de 2:03 realizada el 9 de septiembre de 2026. Recorre la red neuronal, el dron 3D, el mapa WSP de 16 bytes y el tutorial.</figcaption>
</figure>

La grabación no es una animación promocional. La aplicación ejecuta
`Agent.turn()` y enseña sus WSP, CAM, T, PATTERN, Q, gate, homeostasis,
muerte, respawn, herencia y llamadas eventuales al córtex. El dron representa
la pose real del cuerpo discreto Body3D. El render usa VTK/OpenGL; todavía no
hay aerodinámica, IMU, motores ni PID.

## Comparación directa con la escala anterior

CAPACITY-1 repitió el examen con la arquitectura de 256 LIF usada como
baseline de tamaño ECHO-1 y con la ampliación de ECHO-2. Esta comparación se
ejecutó dentro del mismo banco, con semillas reservadas y memoria congelada;
no reconstruye retrospectivamente una puntuación del lanzamiento ECHO-1.

<div class="release-chart" role="img" aria-label="Firmas perceptivas correctas: baseline de 256 LIF, 829 de 2048; ECHO-2 con 512 LIF, 2048 de 2048">
  <h3>Firmas perceptivas reservadas</h3>
  <div class="release-bar"><span>Baseline 256 LIF</span><i><b style="width:40.48%"></b></i><strong>829 / 2.048</strong></div>
  <div class="release-bar is-echo2"><span>ECHO-2 · 512 LIF</span><i><b style="width:100%"></b></i><strong>2.048 / 2.048</strong></div>
</div>

La mejora es de **+1.219 aciertos** y pasa de 40,48 % a 100 %. Al barajar las
firmas, el mismo sistema cae a 142/2.048: el resultado depende de la
representación y no de contar filas.

<div class="release-chart" role="img" aria-label="Discriminación temporal: control de 640 LIF estáticas, 0 de 256; ECHO-2 con 512 LIF y 128 Adaptive-LIF, 256 de 256">
  <h3>Discriminación temporal con 640 neuronas totales</h3>
  <div class="release-bar"><span>Control · 640 LIF</span><i><b style="width:0%"></b></i><strong>0 / 256</strong></div>
  <div class="release-bar is-echo2"><span>ECHO-2 · 512 LIF + 128 ALIF</span><i><b style="width:100%"></b></i><strong>256 / 256</strong></div>
</div>

Aquí el total de neuronas es idéntico. La diferencia es la adaptación
temporal: apagarla devuelve 0/256. El banco seleccionó memoria de 8 ticks y
ganancia adaptativa 4.

<div class="release-chart" role="img" aria-label="Escala de secuencia ejercitada: ECHO-1, 352 turnos; ECHO-2 STREAM-1, 4608 frames">
  <h3>Escala de secuencia ejercitada</h3>
  <div class="release-bar"><span>ECHO-1 · núcleo</span><i><b style="width:7.64%"></b></i><strong>352 turnos</strong></div>
  <div class="release-bar is-echo2"><span>ECHO-2 · STREAM-1</span><i><b style="width:100%"></b></i><strong>4.608 frames</strong></div>
</div>

Esta tercera gráfica mide escala recorrida, **no precisión en la misma tarea**:
son cargas diferentes. STREAM-1 procesó 48 bloques, obtuvo 4.512/4.512
predicciones conocidas en el brazo coherente y `dynamic_alias=0`.

## Qué añadió cada fase

| Fase | Evidencia de cierre |
|---|---|
| VITA-1 / FOOD-1 | `H` baja, la muerte termina la vida y alimento/veneno se aprenden por consecuencias |
| SURV-1 | medianas conservando memoria: 28/40/40 turnos; reseteando: 16/16/16 |
| SHIFT-S | adaptación frente a Q congelada: +421/+416/+446 turnos; la transferencia negativa también se publica |
| PATTERN-1 | 32/32 variantes reservadas frente a 0/32 por coincidencia exacta; cero ids de objeto o posición |
| STREAM-1 | 4.608 frames, 48 bloques y 4.512/4.512 predicciones coherentes |
| SLEEP-2 | 8.208 filas se compactan en 144 reglas; 720/720 en examen frente a T 0/720, sin reescribir CAM/T/Q |
| GEN-1f | presupuesto heredado 8: 360 errores tardíos frente a 602 del naïf; 52 victorias, 24 derrotas, 52 empates |
| HEAT-1b | energía + temperatura: 20.786 turnos frente a 7.221 sin temperatura y 7.186 sin Q; examen cargar/enfriar 12/12 |
| CAPACITY-1 | 512 LIF: 2.048/2.048; 512 LIF + 128 ALIF: 256/256 temporal |
| NEURAL-VIZ-1 | una GUI Python muestra en directo la arquitectura y todos los componentes auditables |

## Qué mejora respecto a ECHO-1

ECHO-1 cerró memoria, predicción, objetos, acciones físicas discretas,
patrones temporales y transferencia entre mundos. ECHO-2 conserva todo eso y
añade una consecuencia que cruza episodios: el cuerpo puede morir, reaparecer,
regular energía y temperatura, conservar experiencia y transmitir sólo una
predisposición de exploración a un descendiente con memorias vacías.

La ampliación neuronal tampoco se acepta por el número `640`. Se acepta porque
mejora dos exámenes causales y pierde al eliminar o barajar la característica
responsable.

## Integridad y datos

- WSP permanece en 16 bytes y no existe un segundo thought-bus.
- `false_facts=0`, `destroyed=0` y córtex apagado en los bancos principales.
- La rama neuronal de la GUI es un monitor perceptivo; Q sigue tomando la
  decisión causal.
- Los exámenes reservados están congelados durante la puntuación.
- Los resultados negativos previos de GEN-1 y HEAT-1 se conservan como rojos.
- No hay robot físico, cámara, LiDAR, IMU, PX4 ni AKD1500 en este cierre.

[Descargar el resumen ECHO-2 y sus huellas SHA-256](/data/echo2-benchmark.json).
El vídeo MP4 también incluye su hash en ese archivo.

— R.N.
