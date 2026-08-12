# rxOS update channel

Official tree for `rx update check` / `rx update apply`.

| File | Role |
|---|---|
| `INDEX.json` | Current version + release list |
| `6.0.1.rxpatch` | First file patch (solar wallpaper recipe) |

In the OS:

```text
rx update check
rx update now
```

`kind=patch` writes vault files (wallpaper recipes, notes, apps).
`kind=iso` means flash a new `rxOS-*-metal.iso` — the USB cannot rewrite itself.

Site path: https://www.rogexlaboratories.com/rx-os/updates/
