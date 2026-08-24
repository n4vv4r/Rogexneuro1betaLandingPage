# EchOS Editions — Product Rationale

**Rogex Laboratories · 2026-08-22**

One kernel tree, three product lines. No forks: the edition is a compile-time
capability set resolved in `kernel/version.h`.

## Why three editions

| | Complete | Minimal | Edge |
|---|---|---|---|
| Person it serves | Developer / power user | Everyday desktop user | Robot / drone / camera / IoT builder |
| Desktop | Eclipse Shell + dock | Eclipse Shell + dock | none — CLI only |
| ECHO AI | Navi 10 (Lang, Code, Sys) | none | Navi Mini (retrainable) |
| IDE / SDK | yes | no | no |
| Media | browser + video/image viewer | browser + video/image viewer | `files` command (browser + media viewer) |
| Hardware | standard CPUs and NPUs (Akida) | standard CPUs | headless boards, NPUs |

## Design rules

1. **Minimal is not crippled Complete.** It shares the exact desktop shell and
   drivers; only the AI runtime and IDE are compiled out. Same dock, same
   context menus, same drag & drop.
2. **Edge has no hidden GUI.** There is nothing to fall back to: the console
   *is* the product. The `files` command embeds the file browser and the
   image/video viewers so an operator never needs a desktop.
3. **Navi Mini is retrainable in the field.** Operators feed datasets with
   `navi teach`; training runs on-device (integer STDP), never cloud-side.
4. **Editions are honest.** Capability macros (`ECHOS_HAS_ECHO`,
   `ECHOS_HAS_IDE`, `ECHOS_HAS_DESKTOP`) are checked at compile time — an
   edition cannot ship a half-linked feature.

## Build

```sh
make edition-complete
make edition-minimal
make edition-edge
```

ISOs land in `build/` named `EchOS-<version>-<edition>-{vm,metal}.iso`.
