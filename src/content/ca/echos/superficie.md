# Superfície d'echOS 3.0

## Plataformes verificades

| Plataforma | Arrencada | Consola | Demo robòtica | Xarxa/PX4 |
|---|---|---|---|---|
| x86_64 | BIOS + GRUB Multiboot2 | framebuffer i VGA | sí | sí |
| x86_64 | UEFI + OVMF | framebuffer | sí | certificació base |
| AArch64 `virt` | imatge directa i UEFI edk2 | sèrie PL011 | sí | sí |

## Camí calent

```text
Sensor ABI (64 B)
        ↓
cua sensor, cap. 32
        ↓
runtime productor
        ↓
Intent ABI (72 B)
        ↓
safety gate: OK / MODIFY / BLOCK
        ↓
MAVLink 2 → PX4
```

Les quatre cues són estàtiques i publiquen capacitat, entrades, sortides, descartes, expiracions i marca màxima. El watchdog emet un comportament segur quan deixa d'arribar una intenció vàlida.

## Emmagatzematge

El controlador NVMe identifica la controladora i el namespace, executa ordres amb timeouts i propaga errors. L'instal·lador escriu una GPT vàlida; la certificació munta un namespace de 128 MiB, escriu un sentinella, reinicia i comprova que el mateix contingut persisteix.

## Consola x86

La superfície humana conserva la consola gràfica, JetBrains Mono, panells, historial, RXFS, diagnòstic, xarxa i ajuda incorporada. `pane split` divideix la vista; continua havent-hi un sol shell, i un panell pot funcionar com a monitor viu.

Els noms que no fan treball real no es presenten com a serveis. La pàgina [Ordres](./comandos) separa l'ús normal de la verificació.

— R.N.
