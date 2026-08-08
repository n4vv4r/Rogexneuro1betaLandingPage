import { addSubscriber, storeConfigured, isValidEmail, normalizeEmail } from '../../lib/newspaper-store.js';
import { emailConfigured, sendResend, welcomeEmailHtml, SITE } from '../../lib/newspaper-email.js';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const email = normalizeEmail(body.email);
  const honeypot = body.website || body.company || '';

  // bot trap
  if (honeypot) {
    res.status(200).json({ ok: true, already: false });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ ok: false, error: 'invalid_email', message: 'Correo no válido.' });
    return;
  }

  if (!storeConfigured()) {
    res.status(503).json({
      ok: false,
      error: 'not_configured',
      message:
        'Suscripciones aún no configuradas (falta Upstash Redis). Mientras tanto usa el RSS en /feed.xml.',
    });
    return;
  }

  try {
    const result = await addSubscriber(email);

    // Welcome mail best-effort
    if (emailConfigured() && result.ok && !result.already && result.token) {
      const unsub = `${SITE}/?unsubscribe=${encodeURIComponent(result.token)}`;
      try {
        await sendResend({
          to: email,
          subject: 'Rogex Newspaper — suscripción activa',
          html: welcomeEmailHtml({
            confirmNote: `Cancelar: ${unsub}`,
          }),
          text: `Suscripción activa a Rogex Newspaper.\nRSS: ${SITE}/feed.xml\nCancelar: ${unsub}`,
        });
      } catch (err) {
        console.error('[newspaper/subscribe] welcome email failed', err.message);
      }
    }

    res.status(200).json({
      ok: true,
      already: Boolean(result.already),
      message: result.already
        ? 'Este correo ya estaba suscrito.'
        : 'Listo. Te avisaremos en cada nuevo artículo.',
    });
  } catch (err) {
    console.error('[newspaper/subscribe]', err);
    res.status(500).json({ ok: false, error: 'server_error', message: 'No se pudo guardar la suscripción.' });
  }
}
