# Guia d'ús

Aquesta guia explica què veu una persona quan arrenca echOS 3.0. No és un manual de vol ni substitueix una revisió de seguretat.

## 1. Triar l'arrencada

En x86 apareix un selector abans del nucli: executar una sessió **LIVE** o entrar al flux d'instal·lació. Per conèixer el sistema sense escriure al disc, fes servir LIVE.

## 2. Comprovar la màquina

En arribar a la consola:

```text
about
status
devices
limits
```

`status` mostra quins subsistemes són actius. `devices` diferencia maquinari detectat de maquinari suportat. `limits` publica els sostres fixos d'aquella compilació.

## 3. Llegir l'evidència local

```text
mem
robot run
robot
report
```

`robot run` injecta un escenari explícitament **sintètic**. Després, `robot` mostra què ha acceptat, modificat o bloquejat el safety gate. `report` genera el bloc que alimenta l'informe tècnic.

## 4. Treballar amb la consola

`help` i `man` són la font de veritat. Pots treballar amb RXFS, consultar la xarxa i dividir la consola:

```text
pane split
pane monitor
pane next
```

Hi ha un shell i diverses vistes; el monitor continua actualitzant-se mentre s'usa un altre panell.

## 5. Connectar PX4 al laboratori

Amb PX4 SITL ja arrencat a l'host:

```text
px4 start 10.0.2.2 14580
px4
```

La pantalla ha de mostrar telemetria rebuda, intencions transmeses i `COMMAND_ACK`. La pèrdua d'enllaç es prova interrompent la connexió i observant la degradació a `HOLD`; echOS no ordena cap motor.

## 6. AArch64

En ARM la interacció és per sèrie PL011. És normal no veure framebuffer: les transcripcions reals són a la [galeria](./galeria).

— R.N.
