# The CLI

The echOS 2.0 interface *is* this. There is no “text mode” of a desktop.
There is no `startx`.

## Visual contract

- Typeface: **Liberation Mono**, 8×16 cell on the framebuffer.
- Serial: ANSI, 80-column courtesy (the TUI is 80×25).
- CLI palette, not 1.0 chrome:

```text
termtheme          # rotate
termtheme night    # default, dark
termtheme matrix
termtheme ocean
termtheme amber
termtheme paper    # light
```

`termcolor` is an alias. `clear` / `cls` use that background, not the
phosphorescent green that leaked through in 1.0.

## Prompt

```text
user@echos /path/cwd#
```

Blinking caret. Software cursor on the FB; TTY cursor on serial.

## Line editing

| Key | Role |
|---|---|
| Tab | complete the command (`CMD_NAMES`) |
| Up / Down | history |
| PgUp / PgDn | scrollback (~120 lines) |
| Wheel | same, PS/2 0x08 / 0x10 |
| Ctrl+C | in some places; not POSIX |

`history` prints the ring. Not written to disk (amnesia).

## Installer TUI

`userland/cli/tui.c`. Compact serial frames (not a CSI per cell — that
flooded COM1). Arrows, Enter, Esc, `q`, 1–9 to jump.

`nano` is another TUI: line numbers, C/Python/JS/HTML/Rust colours.
Ctrl+W saves. Esc exits. `pico` is the same binary.

## Logo and banner

- **Boot banner:** FIGlet `echOS`, `[echOS]` status block.
- **echofetch:** Braille droplet on the left, specs on the right.

If the logo is missing on the OS and present in GNOME Terminal, that was
the old `c >= 0x80` bug. Fixed in 2.0.

## `man`

The most useful command I put on this machine. `help` is a list.
`man curl` is a page: NAME, SYNOPSIS, OPTIONS, EXAMPLES.

```text
man
man curl
man 1 wdl          # section number ignored; this is not man-db
manual ipconf      # alias
man -k tls
apropos download
```

Pages live in `userland/cli/man.c`. A command without a page is my bug.

## Language

Wizard is ES/EN. Commands are English (unix/BSD). Keyboard: `kbd es` /
`kbd us` / `kbd mac`.

## Scrollback

120-row ring. Not GNU `less`. `less` exists as a file command. Console
scroll is global.

## What the CLI does not do

- A real tmux multiplexer (the `tmux` command on LIVE is a stub).
- Full Unicode. Latin-1 + logo Braille + UTF-8 that does not crash.
- X11 copy/paste. Serial and keyboard.

— R.N.
