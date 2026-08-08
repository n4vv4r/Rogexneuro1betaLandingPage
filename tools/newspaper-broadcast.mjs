#!/usr/bin/env node
/**
 * Broadcast a published article to all email subscribers.
 *
 * Usage:
 *   NEWSPAPER_ADMIN_SECRET=... node tools/newspaper-broadcast.mjs 2026-08-08-inaugural
 *   npm run newspaper:broadcast -- 2026-08-08-inaugural
 *
 * Env:
 *   NEWSPAPER_ADMIN_SECRET  (required)
 *   NEWSPAPER_API_BASE      (default https://www.rogexlaboratories.com)
 */
const slug = process.argv[2];
const secret = process.env.NEWSPAPER_ADMIN_SECRET;
const base = (process.env.NEWSPAPER_API_BASE || 'https://www.rogexlaboratories.com').replace(/\/$/, '');

if (!slug) {
  console.error('Usage: npm run newspaper:broadcast -- <article-slug>');
  process.exit(1);
}
if (!secret) {
  console.error('Missing NEWSPAPER_ADMIN_SECRET');
  process.exit(1);
}

const url = `${base}/api/newspaper/broadcast`;
const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-newspaper-secret': secret,
  },
  body: JSON.stringify({ slug }),
});

const data = await res.json().catch(() => ({}));
if (!res.ok) {
  console.error('Broadcast failed', res.status, data);
  process.exit(1);
}
console.log('Broadcast OK', data);
