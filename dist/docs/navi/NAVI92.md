# NAVI 9.2 — zorro

**Estado: HOST LIVE.** Codename **zorro**. Fecha de corte: 17 agosto 2026.

No es un LLM. Es el cuervo de 9 más un enrutador de *tarea*:
elige UNA acción por turno (ask, resume, echo, teach, code, think, talk).

```bash
./navi9
navi> /ask color del plátano
navi> /resume este texto: …
navi> /echo Te quiero
navi> /think marihuana
navi> /teach-ecosystem
```

Repo de producto: [github.com/knightslabs/Navi-9.2](https://github.com/knightslabs/Navi-9.2).
Código de laboratorio: [github.com/navywakura/RXos](https://github.com/navywakura/RXos).
Padre simbólico: [RogexWSP](https://github.com/navywakura/RogexWSP).

## Qué puede hacer

| Tarea | Qué hace de verdad |
| --- | --- |
| **ask** | Recupera ficha o cosecha Wikipedia/DDG. VERIFY. Sin extracto: lo dice. |
| **resume** | Comprime el texto que *tú* pegas. Cita, no hecho. |
| **echo** | Postal RogexWSP + E[6] + cubo modal 256/384/320 Hz + glifo SVG. |
| **teach** | Ingesta documentos → fichas con fuente. KCC: solo crece. |
| **code** | Esqueletos del catálogo. COBOL no es un `for` de C. |
| **think** | Anima PARSE → TAREA → VERIFY → RENDER. |
| **talk** | Charla. «quiero preguntarte algo» no abre Wikipedia. |
| **onto** | Categoría BIO/MATTER/… e id físico si hay semilla o extracto. |

También: laberinto BFS, puzzles cerrados, math entero, dual propose/critic de 8.9, léxico que crece al chatear.

## Qué no puede (aún)

- Ver el mundo con una cámara en tiempo real.
- Mover un robot Arduino / Raspberry Pi.
- Correr Q6-retrieve en **Akida** (0 placas en el lab; `neurocpu akida` se niega).
- Inventar hechos, secuencias de ARN o un puente entre fichas.
- Ganar LMSYS ni «entender la conciencia» como un cerebro.
- Sustituir a un médico, un abogado o un copiloto de vuelo.

Eso no es modestia de marketing. Es el contrato VERIFY.

## Misión → NAVI 10

10 es el **Eclipse** (ver [Eternal Eclipse](ETERNAL_ECLIPSE.md)): misma mente, manos y, si hay silicio, NPU.

1. **Akida** — el DAG de retrieve/VERIFY en la placa, o se dice que no hay placa.
2. **Visión** — cámara en vivo como *sensor*, no como oráculo: un fotograma → ficha (etiqueta + fuente del modelo local). Sin ficha: DESCONOCIDO.
3. **Cuerpo sencillo** — Arduino o Raspberry Pi. Un relé, un servo, un stop VERIFY. No un humanoide.
4. **Echo en el cable** — la postal 16 B + cuerpo 3D como interfaz hacia el mundo, no un chatbot aparte.

Hasta que haya placa, hay código host. Hasta que haya cámara, hay harvest. No se finge el cruce.

## Cómo se mide

```bash
python3 tests/test_navi9.py          # 32 tests
python3 ./navi9 --no-live --train-social
python3 ./navi9 --teach-ecosystem
```

No MMLU. El tablero es: verdad (0 wiki en charla), skill (banco VERIFY), calibración (social), coste (host CPU, 0 FPU en el motor).

## Documentos

- Dummies: [`NAVI92_DUMMIES.md`](NAVI92_DUMMIES.md)
- Expertos: [`NAVI92_EXPERTS.md`](NAVI92_EXPERTS.md)
- Blueprint: [`NAVI92_BLUEPRINT.md`](NAVI92_BLUEPRINT.md)
- Entrenar: [`NAVI92_TRAIN.md`](NAVI92_TRAIN.md)
- Echo: [`ECHO.md`](ECHO.md)
