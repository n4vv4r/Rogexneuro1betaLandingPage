===================================================================
                   NAVI 2 NEUROMORPHIC CHAT ENGINE
                 rxOS v7 "MONAD" Unikernel Architecture
===================================================================

[AVISO IMPORTANTE PARA EL USUARIO]

1. ARQUITECTURA TERNARIA Y CONSUMO:
   NAVI 2 no es un modelo LLM comercial de gigabytes corriendo en GPU.
   Es un motor neuromórfico bare-metal en C99 ejecutándose en ~480 KiB
   de pesos + 66 KiB HDC L2. Consume menos memoria que la app de una
   calculadora. El eslogan se afirma de ESTA capa, no de toda la ISO.

2. ENTRADA Y SALIDA ACORTADAS:
   - Capacidad actual: procesamiento exclusivo de TEXTO PLANO.
   - NO se admite el envío ni procesamiento de archivos, imágenes
     o multimedia. La GUI no tiene clip, ni cámara, ni adjuntos.
   - El dominio está acotado: estado del kernel, sintaxis C99,
     comandos de shell y RAG asociativo (texto HTTP → L2).

3. ESTADO Y APRENDIZAJE:
   - El estado de conversación (S) se mantiene entre turnos en la
     sesión (ventana `v`, `navi2 chat`, `navi2 + texto`).
   - `navi2 .` o `/clear` borra S.
   - Los pesos W ∈ {-1,0,1} NO se reentrenan dentro de rxOS.
     Un fetch HTTP se inyecta en memoria HDC L2 (veto), no en W.

4. QUÉ ESPERAR:
   - Respuestas cortas (hasta 16 bytes generados por turno).
   - Un run de entrenamiento corto deja un generador real y a menudo
     ruidoso. Más `train.py --steps` + `make iso-refresh` lo mejora.
   - L2 puede sustituir un carácter si el prototipo HDC gana (veto).
   - Internet requiere `www on` y un NIC (virtio / e1000 / r8169 /
     rtl8139). HTTPS sin TLS completo: usa `http://` para RAG.

5. CÓMO MEDIR (benchmark):
   - En el OS: `navi2 bench`  o  `/bench` en el chat.
     Reporta ciclos `rdtsc` min/med/max por token, footprint L2+W,
     vetos, docs RAG y ms del último fetch.
   - En el host: `cd NAVI_AI_SNN && make l2-bench`.
   - Humo ISO: `make test` (incluye `NAVI2 weights: … (module2)`).

GUI: tecla `v` / icono NAVI2 / Start. Barra de texto + ENVIAR.
Shell: `navi2 chat`  luego mensajes; `navi2 fetch URL`; `navi2 bench`.

===================================================================
