/**
 * RXos package channel store (dynamic packages on top of static seed).
 *
 * Static seed lives in public/rx-os/packages/*.rxc + INDEX.json (git-deployed).
 * Dynamic admin uploads live in Upstash Redis when configured:
 *   rxos:pkg:index          → JSON array of package meta
 *   rxos:pkg:body:{name}    → raw .rxc text
 *
 * Channel URL: https://www.rogexlaboratories.com/rx-os/packages
 */

import { createHash } from 'node:crypto';

const INDEX_KEY = 'rxos:pkg:index';
const bodyKey = (name) => `rxos:pkg:body:${name}`;

const CHANNEL = 'https://www.rogexlaboratories.com/rx-os/packages';
const MAX_BODY = 256 * 1024; // 256 KiB per package
const NAME_RE = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,46}$/;

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.NEWSPAPER_REDIS_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.NEWSPAPER_REDIS_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ''), token };
}

export function storeConfigured() {
  return Boolean(redisConfig());
}

export function adminSecret() {
  return (
    process.env.RXOS_PACKAGES_ADMIN_SECRET ||
    process.env.NEWSPAPER_ADMIN_SECRET ||
    ''
  );
}

export function adminConfigured() {
  return Boolean(adminSecret());
}

export function checkAdmin(req, bodySecret) {
  const secret = adminSecret();
  if (!secret) return false;
  const header = req.headers['x-admin-secret'] || req.headers['authorization'] || '';
  const bearer = String(header).replace(/^Bearer\s+/i, '').trim();
  const q = typeof req.query?.secret === 'string' ? req.query.secret : '';
  const body = bodySecret != null ? String(bodySecret) : '';
  return bearer === secret || q === secret || (body && body === secret);
}

async function redis(...command) {
  const cfg = redisConfig();
  if (!cfg) throw new Error('Redis not configured');
  const res = await fetch(`${cfg.url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Redis error ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.result;
}

export function sanitizeName(raw) {
  let name = String(raw || '').trim();
  if (name.toLowerCase().endsWith('.rxc')) name = name.slice(0, -4);
  if (!NAME_RE.test(name)) return null;
  if (name.toLowerCase() === 'index' || name.includes('/') || name.includes('..')) return null;
  return name;
}

export function sha3Hex(text) {
  return createHash('sha3-256').update(text, 'utf8').digest('hex');
}

export function packageMeta({ name, version, desc, cmd, body, source = 'dynamic' }) {
  const file = `${name}.rxc`;
  const sha3 = sha3Hex(body);
  return {
    name,
    version: version || '1.0.0',
    desc: desc || `${name} package`,
    cmd: cmd || name,
    file,
    size: Buffer.byteLength(body, 'utf8'),
    sha3,
    sha3_8: sha3.slice(0, 16),
    source,
    url: `${CHANNEL}/${file}`,
  };
}

export async function listDynamic() {
  if (!storeConfigured()) return [];
  const raw = await redis('GET', INDEX_KEY);
  if (!raw) return [];
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function getDynamicBody(name) {
  if (!storeConfigured()) return null;
  const clean = sanitizeName(name);
  if (!clean) return null;
  const body = await redis('GET', bodyKey(clean));
  return typeof body === 'string' ? body : null;
}

export async function putDynamic({ name, version, desc, cmd, body }) {
  if (!storeConfigured()) {
    return { ok: false, error: 'not_configured', message: 'Falta Upstash Redis (UPSTASH_REDIS_REST_*).' };
  }
  const clean = sanitizeName(name);
  if (!clean) {
    return { ok: false, error: 'invalid_name', message: 'Nombre inválido (a-z, 0-9, ._- ; max 47).' };
  }
  if (typeof body !== 'string' || !body.trim()) {
    return { ok: false, error: 'empty_body', message: 'El .rxc está vacío.' };
  }
  if (Buffer.byteLength(body, 'utf8') > MAX_BODY) {
    return { ok: false, error: 'too_large', message: `Máximo ${MAX_BODY} bytes por paquete.` };
  }

  const meta = packageMeta({
    name: clean,
    version: String(version || '1.0.0').slice(0, 32),
    desc: String(desc || `${clean} package`).slice(0, 200),
    cmd: sanitizeName(cmd || clean) || clean,
    body,
    source: 'dynamic',
  });

  await redis('SET', bodyKey(clean), body);
  const list = await listDynamic();
  const next = list.filter((p) => p.name !== clean);
  next.push(meta);
  next.sort((a, b) => a.name.localeCompare(b.name));
  await redis('SET', INDEX_KEY, JSON.stringify(next));

  return { ok: true, package: meta };
}

export async function deleteDynamic(name) {
  if (!storeConfigured()) {
    return { ok: false, error: 'not_configured', message: 'Falta Upstash Redis (UPSTASH_REDIS_REST_*).' };
  }
  const clean = sanitizeName(name);
  if (!clean) {
    return { ok: false, error: 'invalid_name', message: 'Nombre inválido.' };
  }
  const list = await listDynamic();
  const found = list.some((p) => p.name === clean);
  if (!found) {
    return { ok: false, error: 'not_found', message: `No hay paquete dinámico «${clean}».` };
  }
  const next = list.filter((p) => p.name !== clean);
  await redis('SET', INDEX_KEY, JSON.stringify(next));
  await redis('DEL', bodyKey(clean));
  return { ok: true, name: clean };
}

export function channelInfo() {
  return {
    channel: CHANNEL,
    format: 'rxc-v1',
    adminConfigured: adminConfigured(),
    storeConfigured: storeConfigured(),
  };
}
