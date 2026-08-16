# NAVI 6 — tutor causal local (no un loro más grande)

NAVI 6 **no** es un LLM ni un computador cuántico. Es el salto de laboratorio
desde [NAVI 5](/docs/navi5): de SNN orquestadas a un **sistema
cognitivo pequeño** con DAG causal, modelo del mundo discreto, neurogénesis
de sinapsis y un ejecutable local.

El operador de lista blanca `G_rxos` sigue en 4.5. El chat (tecla `v`) usa
NAVI 6 **cuando la pregunta es causal/diagnóstico**; el resto sigue en 4.5.

## Lo que hay / lo que no

| Escalón | Implementado | Límite honesto |
| --- | --- | --- |
| Plasticidad topológica | Crece/retira **sinapsis**, microcircuitos por dominio, auto `V_th`/`τ` | No crea neuronas ilimitadas; no poda instancias (KCC) |
| Inferencia causal | DAG + `do(x)` + contrafácticos | Grafos curados + aprendidos. No es un solver de IMO |
| Enjambre | Clusters jerárquicos + meta-voto | Decenas de nodos, no millones |
| World model | Rollouts ruidosos + energía libre clásica | Escenarios discretos, no vídeo/física continua |
| Q-WSP | Amplitudes complejas sobre átomos | **No hay qubits.** Consenso en ms, no ns |

## Cómo entrenar y publicar el modelo

```bash
chmod +x navi6
python3 navi6_train.py --epochs5 16 --instances5 3 --rounds6 20
# escribe NAVI_AI_SNN/l3/navi6_weights.bin  (módulo GRUB NAVI6W01)
./navi6 --ask "hilos GPU RAM se dispara"
make iso-refresh   # mete el blob en la ISO, sin recompilar si el kernel ya está
```

Cualquier ISO rxOS con `module2 /boot/navi6_weights.bin navi6` lleva el
**mismo conocimiento global** del laboratorio. Entrenar otra vez y
`iso-refresh` actualiza el mundo.

## Ejecutable local

```
./navi6              # REPL
./navi6 --ask "…"
navi6 bench          # dentro de rxOS
```

## Kernel

- `kernel/navi/navi6.c` — entero, heap 0, plantillas + keywords
- Magic `NAVI6W01`, header 64 B (igual que 2/3)
- `mb2_take_navi2` también reloca `navi6`

## Lectura

- [Para dummies](/docs/navi6-dummies) — el mecánico, no el loro.
- [Para expertos](/docs/navi6-experts) — blob, do-calculus, hook del kernel.

## Pruebas

```bash
python3 tests/test_navi6.py
python3 tests/test_navi5_manual.py
```
