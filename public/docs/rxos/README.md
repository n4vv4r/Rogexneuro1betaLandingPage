# rxOS 9 SMOKE — pack de lecturas

**Autor:** r. navarro  
**ISO:** `rxOS-9.0.0-vm.iso` / `rxOS-9.0.0-metal.iso`  
**Eslogan:** *An AI that consumes less than your calculator app*

El producto de hoy es **9 SMOKE + NAVI 7**. Tutorial: [`tutorial-monad.md`](tutorial-monad.md). ISOs: [`ISOS.md`](ISOS.md).

| Si eres… | Lee esto |
| --- | --- |
| Quieres arrancar ya | [`tutorial-monad.md`](tutorial-monad.md) |
| Curioso, 3 minutos | [`para-curiosos.md`](para-curiosos.md) |
| Dónde están las ISOs | [`ISOS.md`](ISOS.md) |

Capturas en [`img/`](img/). Todas salen de QEMU (`tools/capture_monad.py`) o del bench del host (`make l2-bench`). Nada de mockups.

NAVI 2 (chat acotado + veto): [`../NAVI2_ARCHITECTURE.md`](../NAVI2_ARCHITECTURE.md). Tecla `v` / `navi2 hola`.

```bash
make iso-vm
make test                 # 37 checks, incluye NAVI
cd NAVI_AI_SNN && make l2-bench
python3 tools/capture_monad.py
```
