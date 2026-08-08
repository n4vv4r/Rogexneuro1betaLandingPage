/**
 * Subscriber store for Rogex Newspaper.
 * Uses Upstash Redis REST (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).
 * Keys:
 *   newspaper:subs          → SET of emails
 *   newspaper:sub:{email}   → JSON { email, token, createdAt }
 *   newspaper:token:{token} → email
 */

const SET_KEY = 'newspaper:subs';

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.NEWSPAPER_REDIS_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.NEWSPAPER_REDIS_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ''), token };
}

export function storeConfigured() {
  return Boolean(redisConfig());
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

function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 200;
}

function randomToken() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function addSubscriber(rawEmail) {
  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) {
    return { ok: false, error: 'invalid_email' };
  }

  const existing = await redis('GET', `newspaper:sub:${email}`);
  if (existing) {
    return { ok: true, already: true, email };
  }

  const token = randomToken();
  const record = JSON.stringify({
    email,
    token,
    createdAt: new Date().toISOString(),
  });

  await redis('SET', `newspaper:sub:${email}`, record);
  await redis('SET', `newspaper:token:${token}`, email);
  await redis('SADD', SET_KEY, email);

  return { ok: true, already: false, email, token };
}

export async function removeSubscriberByToken(token) {
  if (!token || String(token).length < 16) {
    return { ok: false, error: 'invalid_token' };
  }
  const email = await redis('GET', `newspaper:token:${token}`);
  if (!email) {
    return { ok: false, error: 'not_found' };
  }
  await redis('DEL', `newspaper:sub:${email}`);
  await redis('DEL', `newspaper:token:${token}`);
  await redis('SREM', SET_KEY, email);
  return { ok: true, email };
}

export async function removeSubscriberByEmail(rawEmail) {
  const email = normalizeEmail(rawEmail);
  const raw = await redis('GET', `newspaper:sub:${email}`);
  if (!raw) return { ok: false, error: 'not_found' };
  const rec = typeof raw === 'string' ? JSON.parse(raw) : raw;
  if (rec?.token) await redis('DEL', `newspaper:token:${rec.token}`);
  await redis('DEL', `newspaper:sub:${email}`);
  await redis('SREM', SET_KEY, email);
  return { ok: true, email };
}

export async function listSubscribers() {
  const emails = (await redis('SMEMBERS', SET_KEY)) || [];
  const out = [];
  for (const email of emails) {
    const raw = await redis('GET', `newspaper:sub:${email}`);
    if (!raw) continue;
    try {
      out.push(typeof raw === 'string' ? JSON.parse(raw) : raw);
    } catch {
      out.push({ email, token: null });
    }
  }
  return out;
}

export { isValidEmail, normalizeEmail };
