# NAVI 6 — tutor causal local (no un loro más grande)

NAVI 6 **no** es un LLM ni un computador cuántico. Es el salto de laboratorio
desde [NAVI 5](../NAVI_AI_SNN/README.md): de SNN orquestadas a un **sistema
cognitivo pequeño** con DAG causal, modelo del mundo discreto, neurogénesis
de sinapsis y un ejecutable local.

NAVI 6.5 es el contrato RLC (máscaras de 4.5 más reason/math/debug/plan/teach).
En rxOS 9 la cara oficial es [NAVI 7-WORLD](NAVI7.md). NAVI 6 sigue
siendo el tutor causal que 6.5 llama desde `G_debug` / `G_reason`.
Ver [NAVI 6.5](NAVI65.md).

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

- [NAVI 6.5 — RLC](NAVI65.md) — el modelo oficial de razonamiento/lengua/código.
- [Para dummies](NAVI6_DUMMIES.md) — el mecánico, no el loro.
- [Para expertos](NAVI6_EXPERTS.md) — blob, do-calculus, hook del kernel.

## Pruebas

```bash
python3 tests/test_navi6.py
python3 tests/test_navi5_manual.py
```
