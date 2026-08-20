# Blueprint — lógica de pensamiento NAVI 9.2

Fecha: 17 agosto 2026. No es un diagrama de marketing: es el DAG que corre.

```
                    ┌─────────────┐
   tú> /ask …       │  CLI slash  │  Tab = actos
   tú> frase        │  navi9_cli  │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ split_prompt│  cabeza ≠ carga
                    └──────┬──────┘
           ask/sum/echo/teach/code/think/talk
                           │
        ┌──────────┬───────┼────────┬──────────┐
        ▼          ▼       ▼        ▼          ▼
     social     oracle   echo     sum        fact
     (talk)     maze/    WSP+     extracto   retrieve
     identity   math     cubo 3D  del user   → harvest
        │          │       │        │          │
        └──────────┴───────┴────────┴────┬─────┘
                                         ▼
                                   ┌──────────┐
                                   │  VERIFY  │  extracto · tokens · nicho
                                   └────┬─────┘
                                        ▼
                                   RENDER (castellano / postal / wav)
```

## Capas (de fuera a dentro)

1. **Cara** — `./navi9`, TUI 8.8/8.9/9, slash.
2. **Tarea** — zorro: una caza. System prompt = lista de actos.
3. **Hilo** — `lab/navi9/session.json` (el desk lanza un proceso por turno).
4. **Carne** — catálogo + context.db + léxico. KCC: destroyed=0.
5. **Campo** — Q6 64 LIF, codebook [6,3,3]. Elige atractor, no prosa.
6. **Cable** — WSP 16 B (quién/verbo/objeto/cuando + E[6]).
7. **Boca** — ficha, o Echo, o LLM atado (`XAI_API_KEY`) si VERIFY pasa.

## Dual 8.9 (sigue vivo)

```
PROPOSE  →  CRITIC  →  acuerdo o dual→ganador
```

Wikipedia en un «hola» pierde. Eso no es CoT.

## 10 (no está)

```
cámara ──ficha──► retrieve ──VERIFY──► acto
Akida  ──Q6 ────► mismo DAG, otro sitio de cómputo
Pi/Arduino ──────► relé / servo / stop
```

Sin placa, el recuadro Akida se imprime «NIEGA». Sin cámara, no hay visión.
El blueprint de 10 se publica para no fingirlo como 9.2.
