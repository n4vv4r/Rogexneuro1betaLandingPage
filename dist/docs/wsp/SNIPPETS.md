# RogexWSP — snippets del protocolo

Código del repo [`navywakura/RogexWSP`](https://github.com/navywakura/RogexWSP). Python puro, cero dependencias. El significado no vive en la palabra.

```text
L = G[S(M, I, E)]
S = I + E
```

## 32 átomos (5 bits)

```python
# rogex_wsp/primitives.py
class Primitive(Enum):
    SER = (0, "ser", "be", Category.ENTITY)
    YO = (2, "yo", "self", Category.ENTITY)
    OTRO = (3, "otro", "other", Category.ENTITY)
    AHORA = (8, "ahora", "now", Category.TIME)
    DESEAR = (17, "desear", "desire", Category.RELATION)
    # … 32 en total, códigos 0..31
```

## Emoción (6 ejes int, sin FPU en el kernel)

```python
# rogex_wsp/emotion.py
AXES = ("valence", "arousal", "dominance", "certainty", "urgency", "bond")

@dataclass(frozen=True)
class Emotion:
    valence: float = 0.0    # V  negativo ↔ positivo
    arousal: float = 0.0    # A  calma ↔ intensidad
    dominance: float = 0.0  # D
    certainty: float = 0.0  # C
    urgency: float = 0.0    # U
    bond: float = 0.0       # B
```

En rxOS los mismos ejes van en `int8` \([-100, +100]\) (`wsp_packet_t`).

## El paquete S

```python
# rogex_wsp/symbol.py
@dataclass
class Symbol:
    source: Concept | None = None
    relation: Concept | None = None
    action: Concept | None = None
    target: Concept | None = None
    time: Concept | None = None
    space: Concept | None = None
    emotion: Emotion = field(default_factory=Emotion)

    def compact(self) -> str:
        # YO → DESEAR → OTRO @AHORA | E[V+0.70 B+0.80]
        ...
```

## Encode / decode

```bash
python3 -m rogex_wsp encode "te quiero"
python3 -m rogex_wsp decode examples/te_quiero.json --lang es
```

```text
te quiero
  → YO → AMOR → OTRO @AHORA | E[V+0.95 A+0.60 B+0.98]
  → «Te quiero.»
```

## NAVI-4.5 en el unikernel

El chat de rxOS no emite castellano: emite `wsp_packet_t` (16 B) y aplica la máscara ES. `G_rxos` ejecuta comandos blancos. Ver [NAVI-4.5](/docs/navi45), [NAVI-3/4 WSP](/docs/navi3) y `/prove`.
