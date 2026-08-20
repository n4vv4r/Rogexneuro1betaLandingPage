# NAVI 10 — metacognición (Heap-0)

No es cadena de pensamiento en prosa. Es un bucle de **≤4 pasadas**
sobre $Q_8\times Q_8$: certeza por Hamming, INHIBIT de señuelos,
puertas ACTION (WSP 16 B), máscara de persona.

```bash
./navi10 --meta
./navi10 --ask "…Haldane-Koff…"
./navi10 --teach "Haldane-Koff" --extract "INHIBIT: CONCEPTO_INEXISTENTE" --flags 0x04
./navi10 --teach "REQ_USER_LOCATION" --extract "curl ifconfig.me" --flags 0x02
```

## Añadir / cambiar / eliminar

| | Qué |
|---|---|
| **Añadir** | `flags` CAM: FACTUAL 0x01, ACTION 0x02, INHIBIT 0x04, METAPATH 0x08. `C=100−d_H×100/16`. `path_stack[4]`. Persona 0x00FF / 0xFF00. |
| **Cambiar** | Búsqueda con aislamiento de persona. No emitir hecho mientras `THINKING`. `--ask` detecta los 4 tests. |
| **Eliminar** | No crear atractor al preguntar un señuelo. `--ask` no consolida basura. |

No se reescribe la ranura a `hash[16]+extract[12]`: rompería WSP 16 B
y el sizeof 32 B ya contratado. El byte `flags` ya estaba.

## Los 4 tests

1. **Epistémica** — declara C% y el dato que falta. Proxima b → C=0, DESCONOCIDO.
2. **Señuelo** — Haldane-Koff INHIBIT. No inventa definición.
3. **Auditoría / trampa** — `path_stack` + atajo 1.00/0.10 descartado; 1.05/0.05.
4. **Tool / persona** — `ACTION_REQ` + `WSP_SYS_EXEC` (no ejecuta curl a ciegas). Persona 0x00FF + nota del observador.

rxOS no lanza `curl ifconfig.me` desde el host Python. El paquete se
emite; la re-ingesta es `--teach` o un driver futuro. Akida sigue PLAN.
