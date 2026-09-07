# Superficie de echOS 3.0

## Plataformas verificadas

| Plataforma | Arranque | Consola | Demo robótica | Red/PX4 |
|---|---|---|---|---|
| x86_64 | BIOS + GRUB Multiboot2 | framebuffer y VGA | sí | sí |
| x86_64 | UEFI + OVMF | framebuffer | sí | certificación base |
| AArch64 `virt` | imagen directa y UEFI edk2 | PL011 serie | sí | sí |

## Camino caliente

```text
Sensor ABI (64 B)
        ↓
cola sensor, cap. 32
        ↓
runtime productor
        ↓
Intent ABI (72 B)
        ↓
safety gate: OK / MODIFY / BLOCK
        ↓
MAVLink 2 → PX4
```

Las cuatro colas son estáticas y publican capacidad, entradas, salidas, descartes, expiraciones y marca de agua. El watchdog emite una conducta segura cuando deja de llegar una intención válida.

## Almacenamiento

El controlador NVMe identifica la controladora y su namespace, ejecuta comandos con timeouts y propaga errores. El instalador escribe una tabla GPT válida; la certificación monta un namespace de 128 MiB, escribe un centinela, reinicia y comprueba que el mismo contenido persiste.

## Consola x86

La superficie humana conserva la consola gráfica, JetBrains Mono, paneles, historial, RXFS, diagnóstico, red y ayuda incorporada. `pane split` divide la vista; sigue habiendo un solo shell, y un panel puede funcionar como monitor vivo.

Los nombres que no hacen trabajo real no deben presentarse como servicios. La página [Comandos](./comandos) separa uso normal de verificación.

— R.N.
