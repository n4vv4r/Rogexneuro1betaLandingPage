import { removeSubscriberByToken, storeConfigured } from '../../lib/newspaper-store.js';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (!storeConfigured()) {
    res.status(503).json({ ok: false, error: 'not_configured' });
    return;
  }

  let token = '';
  if (req.method === 'GET') {
    token = String(req.query?.token || '');
  } else if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    token = String(body.token || req.query?.token || '');
  } else {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  try {
    const result = await removeSubscriberByToken(token);
    if (!result.ok) {
      res.status(400).json({
        ok: false,
        error: result.error,
        message: 'Enlace de baja no válido o ya usado.',
      });
      return;
    }
    res.status(200).json({
      ok: true,
      message: 'Suscripción cancelada. No recibirás más despachos.',
    });
  } catch (err) {
    console.error('[newspaper/unsubscribe]', err);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
}
