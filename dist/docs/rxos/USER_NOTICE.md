===================================================================
                   NAVI-4.5  ·  WSP v0.5  ·  operador rxOS
                 rxOS 8.0.0 DESKTOP  (unikernel x86_64)
===================================================================

Copia pública: https://github.com/knightslabs/RXos-Packages/blob/main/docs/USER_NOTICE.md
Fuente:        https://github.com/navywakura/RXos/blob/main/docs/USER_NOTICE.md

[AVISO IMPORTANTE PARA EL USUARIO]

1. ARQUITECTURA TERNARIA Y CONSUMO:
   NAVI-4.5 no es un LLM. Habla paquetes RogexWSP v0.5 de 16 bytes
   (átomos + emoción int8). El castellano es una máscara.
   ~475 KiB de pesos ternarios (NAVI3W01, module2) + 66 KiB HDC L2.
   Cero heap para W. El eslogan se afirma de ESTA capa, no de toda la ISO.
   Es el operador de rxOS (lista blanca sobre la Terminal), no un asistente general.

2. ENTRADA Y SALIDA ACORTADAS:
   - La GUI acepta TEXTO PLANO. Por dentro: encode → S → L3 → veto L2 → máscara.
   - NO hay archivos, imágenes ni multimedia.
   - El encoder in-kernel es una tabla de keywords, no un parser de español.

3. ESTADO Y APRENDIZAJE:
   - S (memoria L3) se conserva entre turnos (`v`, `navi3 chat`, `navi2 +`).
   - `navi2 .` o `/clear` borra S.
   - W no se reentrena en el ISO. RAG HTTP → L2, no backprop.

4. QUÉ ESPERAR:
   - Respuesta = una línea ES + forma compacta YO -> DESEAR -> CONEXION | E[…].
   - L2 puede sustituir átomos si el paquete de L3 es incoherente (sim < 640).
   - `/demo` corre 5 frases: talk, poema, lógica, esqueleto C, briefing local.
   - `/prove` es el operador: ejecuta `navi3 bench` y `status` de verdad.
   - F12 / `capture` guarda un BMP 48×27 (límite RXFS 4 KiB/fichero).

5. CÓMO MEDIR:
   - `navi3 bench` o `/bench`: rdtsc por paquete, heap 0, % corrección HDC.
   - Arquitectura: docs/NAVI3_WSP_ARCHITECTURE.md
   - Host: python3 NAVI_AI_SNN/l3/train_wsp.py && make iso-refresh

GUI: tecla `v`. Shell: `navi3` / `navi2` (alias). RAG: `navi2 fetch URL`.

===================================================================
