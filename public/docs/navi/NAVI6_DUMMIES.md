# NAVI 6 para dummies — el mecánico, no el loro

NAVI 6 **no** es ChatGPT en un pendrive.  
Es un **mecánico de causas**: mira un fallo, nombra la pieza que lo provoca y te dice qué pasaría si cambias esa pieza.

El castellano que lees es una **máscara**. Por dentro viajan postales de 16 bytes (WSP) y un grafo de causas.

## Analogía de un minuto

Un LLM ha leído internet y apuesta la siguiente sílaba.  
NAVI 6 tiene un **tablero de fichas** (causas → efectos). Si preguntas “¿y si cambio X?”, no improvisa: **mueve la ficha X** y mira qué se cae.

| | ChatGPT | NAVI 6 |
| --- | --- | --- |
| Unidad | token | postal WSP 16 B + arista causal |
| Si no está en el tablero | inventa con confianza | no finge física que no ha modelado |
| “Qué pasaría si…” | prosa plausible | `do(X)` sobre el grafo |
| Dónde corre | API / GPU | `./navi6` en el host o tecla `v` en rxOS |

## Qué hace bien (hoy)

- **Diagnóstico de contención.** “La GPU se bloquea y la RAM se dispara” → no es falta de VRAM: es un *spin-lock* en la cola de la CPU.
- **Contrafácticos.** “¿Y si uso memoria compartida?” → sube la latencia de bus; el *ring-buffer* sigue ganando.
- **Metabolismo.** Si la red dispara de más, sube el umbral sola. No hace falta que un humano retuerza `tau`.

## Qué no hace (y no lo vende)

- No escribe tu tesina ni un compilador.
- No es un computador cuántico. “Q-WSP” son amplitudes de números complejos en el portátil. **Cero qubits.**
- No hay millones de nodos. Hay un enjambre pequeño.
- No diagnostica personas. No es clínico.

## Cómo tocarlo en 30 segundos

En el repo RXos:

```bash
./navi6 --ask "activo varios hilos la GPU se bloquea y la RAM se dispara"
./navi6 --ask "que pasaria si en lugar del ring buffer uso memoria compartida"
```

Dentro de rxOS 9 (tecla `v` = Navi 7): la misma pregunta sigue yendo
al tutor cuando es un «por qué / qué pasaría si».  
Los comandos del sistema (`status`, `/prove`) siguen siendo el operador **4.5**. NAVI 6 entra cuando la duda es *por qué / qué pasaría si*.

## Tres piezas, en cristiano

1. **Postal WSP** — 16 bytes: quién, verbo, objeto, cuándo, y seis ejes de “cómo se siente” el paquete.
2. **Tablero causal (DAG)** — flechas que no se pueden circular. Cortar una flecha es un contrafáctico.
3. **Modelo del mundo** — tira el dado muchas veces (rollouts) y se queda con la vía de menos “sorpresa”.

Si quieres números, archivos y el blob `NAVI6W01`: [NAVI 6 para expertos](NAVI6_EXPERTS.md).  
Índice: [NAVI6.md](NAVI6.md).
