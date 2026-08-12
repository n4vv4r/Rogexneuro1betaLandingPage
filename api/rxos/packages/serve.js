/**
 * Serve a dynamic .rxc body from Redis when the static file is not present.
 * Rewritten from: /rx-os/packages/:name.rxc → /api/rxos/packages/serve?name=:name.rxc
 * (Static files in public/ still win on Vercel.)
 */
import { getDynamicBody, sanitizeName } from '../../../lib/rxos-packages.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const raw = req.query?.name || req.query?.file || '';
  const name = sanitizeName(raw);
  if (!name) {
    res.status(400).json({ ok: false, error: 'invalid_name' });
    return;
  }

  try {
    const body = await getDynamicBody(name);
    if (body == null) {
      res.status(404).json({
        ok: false,
        error: 'not_found',
        message: `Package ${name}.rxc not found in dynamic store. Check static /rx-os/packages/${name}.rxc`,
      });
      return;
    }
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `inline; filename="${name}.rxc"`);
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    res.setHeader('X-RXos-Package', name);
    res.status(200).send(body);
  } catch (err) {
    console.error('[rxos/packages/serve]', err);
    res.status(500).json({ ok: false, error: 'server_error', message: err.message });
  }
}
