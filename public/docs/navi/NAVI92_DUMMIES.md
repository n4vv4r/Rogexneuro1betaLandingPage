# NAVI 9.2 para dummies

Piensa en un **zorro**, no en un loro.

Un loro repite lo que suena bien. Un zorro elige *qué cazar*.
NAVI 9.2 lee la **cabeza** de lo que escribes (`resume este texto`)
y trata el resto como **carga**. Si en la carga sale «frecuencia»,
no se pone a hacer Echo.

## Cinco cosas que puedes pedirle

1. **Una pregunta** — `/ask qué es WSP`  
   Busca ficha o Wikipedia. Si no hay extracto, lo dice.
2. **Un resumen** — `/resume este texto:` y pegas el párrafo.  
   Te devuelve *tu* texto, corto. No lo convierte en verdad científica.
3. **Un eco** — `/echo Te quiero`  
   Sale una postal `YO → AMOR → OTRO` y un audio que es un cubo vibrando.
4. **Enseñarle** — `/teach-ecosystem` o un `.md`  
   Guarda fichas. No olvida a propósito (KCC).
5. **Ver cómo piensa** — `/think el color del plátano`  
   Ves PARSE, la tarea, la fuente, VERIFY.

## Tres cosas que no hace

- No ve por una cámara.
- No mueve un robot.
- No inventa un virus de 13.000 letras porque dijiste «gripe».

## Cómo arrancar (2 minutos)

```bash
git clone https://github.com/navywakura/RXos
cd RXos
python3 ./navi9
```

Tab completa los comandos. Esc sale. No hace falta GPU.
