# RFC-2026-08-Q6: campaña de investigación abierta

**Título:** Mapeo de espacios de estado topológicamente restringidos en redes neuronales por impulsos (topología de hipercubo Q₆ en SNN)

**Fecha de lanzamiento:** 13 de agosto de 2026

**Lead de investigación:** [@navywakura](https://github.com/navywakura)

**Estado:** llamada abierta a contribuciones (Open Research Call)

PDF original: [RFC-2026-08-Q6_CAMPANA.pdf](/docs/navi/RFC-2026-08-Q6_CAMPANA.pdf)

La versión técnica ya medida (codebook [6,3,3], benches 48/48 y hop) está en [RFC-2026-08-Q6.md](/docs/rfc-q6). Este documento es la convocatoria.

---

## 1. Resumen ejecutivo e hipótesis central

La campaña aborda el diseño de arquitecturas neuromórficas de bajo consumo para ejecución en dispositivos edge. Se evalúa si restringir un espacio de estados binario a un hipercubo de 6 dimensiones (Q₆, 2⁶ = 64 estados) aporta ventajas en tolerancia al ruido, reducción de enlaces y latencia de convergencia frente a capas densas o aleatorias.

### Hipótesis principal

> Un espacio de estados discreto de 64 nodos, interconectado mediante la simetría de un hipercubo de 6 dimensiones (Q₆) y gobernado por la distancia de Hamming, actúa como un atractor topológico natural en una red neuronal por impulsos (SNN). Esto permite filtrar ruido simbólico y reducir la matriz de conexiones de O(V²) a O(V log V) sin perder la capacidad de representación de estados.

---

## 2. Fundamentos teóricos

1. **Estructura binaria combinatoria (2⁶ = 64).** Historización del sistema binario de 6 bits como un autómata finito completo. Cada nodo es un vector único v ∈ {0, 1}⁶ (mapeado simbólicamente a los 64 hexagramas del *I Ching* como etiqueta de estados dinámicos).

2. **Geometría de grafo (Q₆).** |V| = 64, |E| = 192. Dos estados u, v ∈ V están conectados si y solo si su distancia de Hamming es 1:

   d_H(u, v) = Σ (u_i ⊕ v_i) = 1  (i = 1…6)

3. **Simetrías fractales / geométricas.** Aplicación de simetrías de polítopos regulares (proyecciones estilo Sri Yantra / grafos hipercúbicos) para mapear campos de activación espacial. En el PoC medido estas analogías quedan **fuera** hasta que alguien las convierta en un test con número.

---

## 3. Objetivos

- **Compresión de red.** Sustituir una capa densa de 64 neuronas (4096 conexiones) por una topología Q₆ de 192 aristas sin degradar la transición de estados.
- **Filtrado de ruido (auto-corrección).** Ver si una inyección con bit-flips es arrastrada por la dinámica LIF hacia el estado Q₆ válido más cercano.
- **Memoria de ultra-bajo consumo.** Validar el modelo como módulo asociativo con restricciones severas de RAM/caché.

---

## 4. Pasos técnicos

### Fase 1 — Grafo

1. Construir la matriz de adyacencia A ∈ {0, 1}⁶⁴ˣ⁶⁴ de Q₆.
2. Comprobar que el grado de cada vértice sea estrictamente k = 6.
3. Calcular el espectro del laplaciano L = D − A (velocidad de difusión).

### Fase 2 — SNN

1. Capa de 6 neuronas de entrada (un bit del vector), modelo LIF.
2. Codificación por tiempo de disparo: impulso = 1 lógico; ausencia o retardo = 0.
3. Conectar la entrada a la red interna con la topología A.

### Fase 3 — Experimentos

1. **Inyección de ruido.** Estado objetivo S ∈ {0, 1}⁶; invertir n bits (n ∈ {1, 2, 3}); medir time-steps hasta estabilizar el tren correcto.
2. **Comparativa.** Tasa de recuperación Q₆ frente a Hopfield clásico y SNN de conectividad aleatoria.

---

## 5. Dónde buscar

- **Grafos y topología:** hipercubos Q_n, Hamming, códigos de bloque.
- **Neuromórfica:** LIF, memorias asociativas por impulsos. El PoC del lab **no** usa `snntorch` / `brian2` / `PyNN` en el núcleo (el kernel de rxOS es `-mno-sse`); esas libs valen para réplicas host.
- **Combinatoria:** matrices de transición discreta; Leibniz, *Explication de l'Arithmétique Binaire*.

---

## 6. Entregables y KPI

| Entregable | Formato | KPI |
| --- | --- | --- |
| Script base | Python (numpy, networkx; snntorch opcional) | Grafo Q₆ reproducible y simulación de 64 estados |
| Benchmark de ruido | Notebook / gráficas | Corrección > 90 % ante 1 bit |
| Implementación C / bare-metal | C99 / Rust | Matriz de transición con memoria < 16 KiB |

### Dónde enviar

- Repositorio: [github.com/navywakura/RXos](https://github.com/navywakura/RXos) · org [knightslabs](https://github.com/knightslabs)
- Discusión: Discord / @navywakura / [knightscomputer.club](https://www.knightscomputer.club)

---

## Nota del laboratorio (tras el PoC)

El enunciado de “64 estados válidos corrigen un bit-flip” es **falso** si todos los vértices son legales. La corrección exige un codebook C con d_min ≥ 3. El código lineal [6,3,3] (8 palabras) es el que mide el PoC: 1-bit 48/48, hop Hamming 120/120. Ver [RFC-2026-08-Q6.md](/docs/rfc-q6).
