/**
 * Admin: email all subscribers about a published article.
 *
 * POST /api/newspaper/broadcast
 * Headers: x-newspaper-secret: $NEWSPAPER_ADMIN_SECRET
 * Body: { "slug": "2026-08-08-inaugural" }
 *
 * Loads article JSON from public/newspaper/articles/{slug}.json
 * (or content built into the deployment).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { listSubscribers, storeConfigured } from '../../lib/newspaper-store.js';
import {
  articleEmailHtml,
  articleEmailText,
  emailConfigured,
  sendResend,
  SITE,
} from '../../lib/newspaper-email.js';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-newspaper-secret');
}

async function loadArticle(slug) {
  const safe = String(slug || '').replace(/[^a-zA-Z0-9._-]/g, '');
  if (!safe || safe !== slug) return null;

  const candidates = [
    path.join(process.cwd(), 'public', 'newspaper', 'articles', `${safe}.json`),
    path.join(process.cwd(), 'dist', 'newspaper', 'articles', `${safe}.json`),
  ];

  for (const file of candidates) {
    try {
      const raw = await fs.readFile(file, 'utf8');
      return JSON.parse(raw);
    } catch {
      /* try next */
    }
  }

  // Fallback: fetch from own public URL (works after deploy)
  try {
    const base = (
      process.env.NEWSPAPER_PUBLIC_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : null) ||
      'https://www.rogexlaboratories.com'
    ).replace(/\/$/, '');
    const res = await fetch(`${base}/newspaper/articles/${safe}.json`, {
      cache: 'no-store',
    });
    if (res.ok) return await res.json();
  } catch {
    /* ignore */
  }
  return null;
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

  const secret = process.env.NEWSPAPER_ADMIN_SECRET;
  const provided = req.headers['x-newspaper-secret'] || req.headers['authorization']?.replace(/^Bearer\s+/i, '');
  if (!secret || provided !== secret) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }

  if (!storeConfigured() || !emailConfigured()) {
    res.status(503).json({
      ok: false,
      error: 'not_configured',
      message: 'Faltan UPSTASH_REDIS_* y/o RESEND_API_KEY.',
    });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const slug = body.slug;
  if (!slug) {
    res.status(400).json({ ok: false, error: 'missing_slug' });
    return;
  }

  const article = await loadArticle(slug);
  if (!article) {
    res.status(404).json({ ok: false, error: 'article_not_found', slug });
    return;
  }

  // Ensure absolute URL on subdomain
  article.url = article.url || `${SITE}/${article.slug}`;

  try {
    const subs = await listSubscribers();
    if (!subs.length) {
      res.status(200).json({ ok: true, sent: 0, failed: 0, message: 'No hay suscriptores.' });
      return;
    }

    let sent = 0;
    let failed = 0;
    const errors = [];

    // Sequential to respect Resend free-tier rate limits
    for (const sub of subs) {
      if (!sub?.email || !sub?.token) {
        failed += 1;
        continue;
      }
      const unsubscribeUrl = `${SITE}/?unsubscribe=${encodeURIComponent(sub.token)}`;
      try {
        await sendResend({
          to: sub.email,
          subject: `Rogex Newspaper: ${article.title}`,
          html: articleEmailHtml(article, { unsubscribeUrl }),
          text: articleEmailText(article, { unsubscribeUrl }),
        });
        sent += 1;
      } catch (err) {
        failed += 1;
        errors.push({ email: sub.email, error: err.message });
        console.error('[newspaper/broadcast] fail', sub.email, err.message);
      }
    }

    res.status(200).json({
      ok: true,
      slug: article.slug,
      title: article.title,
      sent,
      failed,
      total: subs.length,
      errors: errors.slice(0, 10),
    });
  } catch (err) {
    console.error('[newspaper/broadcast]', err);
    res.status(500).json({ ok: false, error: 'server_error', message: err.message });
  }
}
