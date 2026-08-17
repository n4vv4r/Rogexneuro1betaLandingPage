# Entrenar NAVI 9.2

No es SFT. No hay gradientes sobre prosa.

## 1. Enseñar el ecosistema (el padre)

```bash
./navi9 --teach-ecosystem
./navi9 --teach docs/ECHO.md
```

Wikipedia/DDG solo si pides un dato con red. Cada ficha trae fuente.

## 2. Banco social (VERIFY 0/1)

```bash
./navi9 --no-live --train-social
```

Ítems en `navi9_social.py`: `need` / `forbid` / a veces `prev`.
Un fallo del desk → una fila nueva. Wikipedia en charla = 0.

## 3. Supervivencia 8.8/8.9

```bash
./navi89 --train
```

Torneo de organismos. El perdedor se duerme. KCC: no se borra.

## 4. Léxico Echo

Al hacer `/echo` de una palabra nueva *con red*, se cosecha, se clasifica
(BIO/MATTER/…) y se escribe `lab/navi9/lexicon.json`.

Semilla honesta: H (Z=1), gripe (clase Influenza/ARN), no un genoma inventado.

## 5. Tests

```bash
python3 tests/test_navi9.py
```

Si un eje (fluidez) sube y la verdad baja, 9.2 no avanza.
