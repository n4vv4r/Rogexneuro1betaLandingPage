/**
 * config.ts — configuración PÚBLICA del sitio.
 * No hay secretos aquí (las claves privadas van en variables de entorno).
 */

/* ──────────────────────────────────────────────────────────────────────────
 * ESTADO DEL PRODUCTO
 * PRISMA Beta está EN DESARROLLO y todavía NO se vende. La web lo deja claro
 * y canaliza el interés hacia la newsletter (abajo). Cuando llegue el momento
 * de vender, pon IS_FOR_SALE = true y reactiva el enlace de compra.
 * ──────────────────────────────────────────────────────────────────────── */
export const IS_FOR_SALE = false;

// Checkout (desactivado mientras IS_FOR_SALE = false). Se conserva para el futuro.
export const BUY_URL =
  "https://rogexlaboratories.lemonsqueezy.com/checkout/buy/2e3f9052-5d36-4979-a154-8bf02a0a26b8";

/* ──────────────────────────────────────────────────────────────────────────
 * NEWSLETTER
 * El formulario de la landing manda el email al proveedor que elijas aquí.
 *
 *  provider: "buttondown" | "formspree" | "custom"
 *
 *  ▸ buttondown (recomendado, gratis hasta 100 subs, ideal para "envía una
 *    actualización a toda la lista"): crea tu cuenta en https://buttondown.com,
 *    coge tu usuario (buttondown.com/TU_USUARIO) y ponlo en buttondownUser.
 *    Cada vez que escribas un email en Buttondown, se envía a todos los
 *    suscriptores. (Automatización total: Buttondown puede auto-enviar desde
 *    un feed RSS — Settings → Automations.)
 *
 *  ▸ formspree: crea un form en https://formspree.io y pega su id en formspreeId
 *    (te llegan los emails a tu correo; luego los importas a tu newsletter).
 *
 *  ▸ custom: cualquier endpoint propio que acepte POST { email }.
 *
 * fallbackEmail se usa solo si no hay proveedor configurado (abre el cliente
 * de correo del visitante como último recurso).
 * ──────────────────────────────────────────────────────────────────────── */
export const NEWSLETTER = {
  provider: "buttondown" as "buttondown" | "formspree" | "custom",
  buttondownUser: "rogexlabs", // ← VERIFICA/REEMPLAZA con tu usuario de Buttondown
  formspreeId: "", // p. ej. "xmyzabcd"
  customEndpoint: "", // p. ej. "https://api.rogexlaboratories.com/subscribe"
  fallbackEmail: "hello@rogexlaboratories.com",
};
