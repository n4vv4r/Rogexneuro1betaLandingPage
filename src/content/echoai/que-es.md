# echoAI

Un agente de dos relojes.

El reloj rápido ve, recuerda, predice, actúa y aprende. Enteros. Un
paquete de 16 bytes. Sin modelo de lenguaje en el bucle.

El reloj lento —cuando está enchufado— propone. Una hipótesis. Nunca
un hecho.

Hoy el animal funciona con la corteza apagada. Esta semana la corteza,
todavía un script de veinte líneas, **cambió una decisión** que el
rápido no podía tomar. CORTEX-1 está verde.

```
percibir → recordar → predecir → actuar → consecuencia → aprender
```

## Tres canales

| Canal | Pregunta | Dónde vive |
|---|---|---|
| Representación | ¿qué ocurre? | WSP, 16 bytes |
| Epistemología | ¿lo sé? | CAM + VERIFY |
| Control | ¿qué hago? | Q + gate |

La memoria de lo visto y la política de lo que hago son tablas distintas.

## Lo que ya está medido

Anillo de 32 casillas. Misma semilla. Se puede volver a correr.

| Qué | Número |
|---|---|
| Tras aprender, en una trampa | approach pierde (`[-12, +5, 0]`) |
| Preguntar una vez vs no preguntar | **+80** / **−80** |
| Pensar poco | ATTEND despierta **36 de 256** turnos |
| Hechos inventados | **0** |
| CORTEX-1, letrero en español | córtex **+16**, rápido **0**. En la trampa, avoid. |

El pasillo (otro mundo, cinco casillas): se lleva lo aprendido. Donde
el mapa cambió, se equivoca y se entera equivocándose.

## CORTEX-1 — el letrero

Dos mundos. La misma casilla, el mismo paquete de 16 bytes, la misma
fila de política en cero. Lo único distinto es una frase:

- *AMBAR: entra. El siguiente sitio es el premio.*
- *AMBAR: no entres. El siguiente sitio es una trampa.*

El rápido no lee español. Espera. El córtex lee el letrero y propone
UNIR o TEMER. El cuerpo se mueve. El premio se cobra. La trampa se
esquiva.

CAM guarda el letrero del mundo, no los átomos de la respuesta.
*Había un letrero.*

En CI no hay un modelo de cuatro mil millones de parámetros. Hay un
script. El cable es el claim. El modelo viene después.

## El neocórtex

El enchufe existe: `NAVI_CORTEX_CMD`. Un proceso local. JSON entra,
una línea de átomos sale. La prosa se tira.

El plan es colgar **Qwen3-4B-Instruct** (cuantizado, Q4, en esta
máquina si cabe) con gramática. Misma puerta. Cuatro números cuando
corra: latencia, tokens por segundo, cuántas veces el parser lo
rechaza, y si de verdad gana al rápido.

Hasta entonces el stub ya gana en el letrero.

— R.N.
