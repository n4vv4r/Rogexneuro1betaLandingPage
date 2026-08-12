/**
 * GET  /api/rxos/packages          — public package catalog (static INDEX + dynamic)
 * POST /api/rxos/packages          — admin upload { secret, name, version, desc, body }
 * DELETE /api/rxos/packages?name=  — admin delete dynamic package
 *
 * Header: X-Admin-Secret: <RXOS_PACKAGES_ADMIN_SECRET>
 */
import {
  adminConfigured,
  channelInfo,
  checkAdmin,
  deleteDynamic,
  listDynamic,
  putDynamic,
  storeConfigured,
} from '../../../lib/rxos-packages.js';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Secret, Authorization');
}

function parseBody(req) {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body || '{}');
    } catch {
      return {};
    }
  }
  return req.body || {};
}

async function fetchStaticIndex(req) {
  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'www.rogexlaboratories.com';
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const base = `${proto}://${host}`;
    const res = await fetch(`${base}/rx-os/packages/INDEX.json`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** Fallback seed when static INDEX cannot be fetched (e.g. local serverless). */
const SEED_FALLBACK = {
  channel: 'https://www.rogexlaboratories.com/rx-os/packages',
  format: 'rxc-v1',
  packages: [
    {
      name: 'echo',
      version: '1.0.0',
      desc: 'echo args / demo command package',
      cmd: 'echo',
      file: 'echo.rxc',
    },
    {
      name: 'fortune',
      version: '1.0.0',
      desc: 'one-line fortune app',
      cmd: 'fortune',
      file: 'fortune.rxc',
    },
    {
      name: 'hellopkg',
      version: '1.0.1',
      desc: 'hello from the package channel',
      cmd: 'hellopkg',
      file: 'hellopkg.rxc',
    },
    {
      name: 'tree-view',
      version: '1.0.0',
      desc: 'tree companion Roxenite page',
      cmd: 'tree-view',
      file: 'tree-view.rxc',
    },
  ],
};

function normalizeStatic(index) {
  const packages = Array.isArray(index?.packages) ? index.packages : [];
  return packages.map((p) => ({
    ...p,
    source: 'static',
    url: p.url || `https://www.rogexlaboratories.com/rx-os/packages/${p.file || `${p.name}.rxc`}`,
  }));
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const staticIndex = (await fetchStaticIndex(req)) || SEED_FALLBACK;
      const staticPkgs = normalizeStatic(staticIndex);
      const dynamic = storeConfigured() ? await listDynamic() : [];
      const byName = new Map();
      for (const p of staticPkgs) byName.set(p.name, p);
      for (const p of dynamic) byName.set(p.name, { ...p, source: 'dynamic' });
      const packages = Array.from(byName.values()).sort((a, b) => a.name.localeCompare(b.name));

      res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=120');
      res.status(200).json({
        ok: true,
        ...channelInfo(),
        updated: staticIndex.updated || new Date().toISOString().slice(0, 10),
        note:
          staticIndex.note ||
          'Official RXos package channel. Install inside the OS with: rx app add <name>',
        packages,
        counts: {
          total: packages.length,
          static: staticPkgs.length,
          dynamic: dynamic.length,
        },
      });
    } catch (err) {
      console.error('[rxos/packages GET]', err);
      res.status(500).json({ ok: false, error: 'server_error', message: err.message });
    }
    return;
  }

  if (req.method === 'POST') {
    if (!adminConfigured()) {
      res.status(503).json({
        ok: false,
        error: 'admin_not_configured',
        message: 'Define RXOS_PACKAGES_ADMIN_SECRET (o NEWSPAPER_ADMIN_SECRET) en Vercel.',
      });
      return;
    }

    const body = parseBody(req);
    if (!checkAdmin(req, body.secret)) {
      res.status(401).json({ ok: false, error: 'unauthorized', message: 'Secreto admin incorrecto.' });
      return;
    }
    if (!storeConfigured()) {
      res.status(503).json({
        ok: false,
        error: 'not_configured',
        message:
          'Para subir sin redeploy hace falta Upstash Redis (mismas vars que el newspaper). Alternativa: node tools/sync-rxos-packages.mjs add file.rxc && deploy.',
      });
      return;
    }

    try {
      const result = await putDynamic({
        name: body.name || body.file,
        version: body.version,
        desc: body.desc || body.description,
        cmd: body.cmd,
        body: body.body || body.content || body.source,
      });
      res.status(result.ok ? 200 : 400).json(result);
    } catch (err) {
      console.error('[rxos/packages POST]', err);
      res.status(500).json({ ok: false, error: 'server_error', message: err.message });
    }
    return;
  }

  if (req.method === 'DELETE') {
    if (!adminConfigured()) {
      res.status(503).json({
        ok: false,
        error: 'admin_not_configured',
        message: 'Define RXOS_PACKAGES_ADMIN_SECRET en Vercel.',
      });
      return;
    }

    const body = parseBody(req);
    if (!checkAdmin(req, body.secret)) {
      res.status(401).json({ ok: false, error: 'unauthorized', message: 'Secreto admin incorrecto.' });
      return;
    }
    if (!storeConfigured()) {
      res.status(503).json({
        ok: false,
        error: 'not_configured',
        message:
          'Redis no configurado. Para seed packages: node tools/sync-rxos-packages.mjs del <name> && deploy.',
      });
      return;
    }

    try {
      const name = req.query?.name || body.name;
      const result = await deleteDynamic(name);
      res.status(result.ok ? 200 : 404).json(result);
    } catch (err) {
      console.error('[rxos/packages DELETE]', err);
      res.status(500).json({ ok: false, error: 'server_error', message: err.message });
    }
    return;
  }

  res.status(405).json({ ok: false, error: 'method_not_allowed' });
}
