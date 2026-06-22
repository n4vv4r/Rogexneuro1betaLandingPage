# Newsletter — puesta en marcha (2 minutos)

La landing ya tiene el formulario de newsletter (sección "Sé el primero en probar PRISMA").
Solo falta conectar tu proveedor. Todo se configura en **`src/config.ts`** → objeto `NEWSLETTER`.

## Opción recomendada: Buttondown (gratis hasta 100 suscriptores)

Buttondown es ideal porque hace las dos cosas: **guarda los emails** y te deja **enviar una
actualización a toda la lista** desde su panel.

1. Crea tu cuenta en https://buttondown.com
2. Mira tu usuario en la URL de tu página pública: `buttondown.com/TU_USUARIO`.
3. En `src/config.ts` pon:
   ```ts
   provider: "buttondown",
   buttondownUser: "TU_USUARIO",
   ```
4. Listo. Cada email que captures aparece en Buttondown.

### Enviar una actualización
Escribe un email nuevo en Buttondown → **Send**. Llega a todos los suscriptores.

### Envío automático (opcional)
Si publicas un feed RSS de tus novedades, en Buttondown → **Settings → Automations** puedes
activar el envío automático cada vez que el feed tenga una entrada nueva. Así cada actualización
se manda sola.

## Alternativas

- **Formspree** (https://formspree.io): crea un form, copia su id y pon
  `provider: "formspree"`, `formspreeId: "xxxx"`. Te llegan los emails a tu correo (luego los
  importas a tu newsletter). Bueno para empezar sin newsletter dedicada.
- **Endpoint propio**: `provider: "custom"`, `customEndpoint: "https://..."` (acepta `POST { email }`).
- **Mailchimp / Kit (ConvertKit)**: usa su formulario embebido o un endpoint y conéctalo como `custom`.

> Mientras no configures nada, el formulario abre el cliente de correo del visitante hacia
> `fallbackEmail` (configúralo también en `src/config.ts`).

## Volver a activar la venta (en el futuro)
Cuando PRISMA esté listo para venderse: en `src/config.ts` pon `IS_FOR_SALE = true`, reactiva el
`BUY_URL` y vuelve a mostrar el bloque de precio. Toda la lógica de "en desarrollo" está centralizada
para que el cambio sea fácil.
