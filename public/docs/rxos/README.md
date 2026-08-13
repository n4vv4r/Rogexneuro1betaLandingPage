# rxOS 8 DESKTOP — pack de lecturas

**Autor:** r. navarro  
**ISO:** `build/rxOS-7.0.0-vm.iso`  
**Eslogan:** *An AI that consumes less than your calculator app*

Aquí no hay humo. Hay capturas del sistema arrancado, números que puedes repetir, y dos textos según con qué ganas vengas.

| Si eres… | Lee esto |
| --- | --- |
| Curioso, quieres el click en 3 minutos | [`para-curiosos.md`](para-curiosos.md) |
| Quieres ver que de verdad corre y los benches | [`demostracion.md`](demostracion.md) |

Capturas en [`img/`](img/). Todas salen de QEMU (`tools/capture_monad.py`) o del bench del host (`make l2-bench`). Nada de mockups.

NAVI 2 (chat acotado + veto): [`../NAVI2_ARCHITECTURE.md`](../NAVI2_ARCHITECTURE.md). Tecla `v` / `navi2 hola`.

```bash
make iso-vm
make test                 # 37 checks, incluye NAVI
cd NAVI_AI_SNN && make l2-bench
python3 tools/capture_monad.py
```
