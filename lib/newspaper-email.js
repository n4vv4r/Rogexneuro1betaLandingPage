/**
 * Transactional email for Rogex Newspaper via Resend.
 * Env: RESEND_API_KEY, NEWSPAPER_FROM (optional)
 */

const SITE = 'https://newspaper.rogexlaboratories.com';
const LAB = 'https://www.rogexlaboratories.com';

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

function fromAddress() {
  return (
    process.env.NEWSPAPER_FROM ||
    process.env.RESEND_FROM ||
    'Rogex Newspaper <onboarding@resend.dev>'
  );
}

export async function sendResend({ to, subject, html, text }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY missing');
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress(),
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || `Resend ${res.status}`);
  }
  return data;
}

export function articleEmailHtml(article, { unsubscribeUrl }) {
  const title = escapeHtml(article.title);
  const summary = escapeHtml(article.summary || '');
  const url = escapeHtml(article.url || `${SITE}/${article.slug}`);
  const date = escapeHtml(article.date || '');

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#f0eee6;color:#11110f;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0eee6;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#fffef8;border:1.5px solid #11110f;">
        <tr><td style="padding:18px 22px;border-bottom:1.5px solid #11110f;background:#0b0b0a;color:#fffef8;font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;">
          Rogex Newspaper · Knights Labs
        </td></tr>
        <tr><td style="padding:28px 22px 12px;">
          <p style="margin:0 0 8px;font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#333;">${date} · NUEVO DESPACHO</p>
          <h1 style="margin:0 0 14px;font-size:26px;line-height:1.15;font-weight:700;">${title}</h1>
          <p style="margin:0 0 22px;font-size:16px;line-height:1.55;color:#33322d;">${summary}</p>
          <a href="${url}" style="display:inline-block;padding:12px 18px;background:#e64a32;color:#fffef8;text-decoration:none;font-family:ui-monospace,Menlo,monospace;font-size:12px;letter-spacing:.06em;text-transform:uppercase;border:1.5px solid #11110f;">Leer artículo →</a>
        </td></tr>
        <tr><td style="padding:18px 22px 24px;font-size:12px;line-height:1.5;color:#555;border-top:1px solid #ddd;">
          <p style="margin:0 0 8px;">Publicado en <a href="${SITE}/" style="color:#111;">newspaper.rogexlaboratories.com</a> · Lab: <a href="${LAB}/" style="color:#111;">rogexlaboratories.com</a></p>
          <p style="margin:0;">PRISMA es experimental y no clínico. <a href="${escapeHtml(unsubscribeUrl)}" style="color:#111;">Cancelar suscripción</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function articleEmailText(article, { unsubscribeUrl }) {
  return [
    `Rogex Newspaper — ${article.date || ''}`,
    '',
    article.title,
    '',
    article.summary || '',
    '',
    `Leer: ${article.url || `${SITE}/${article.slug}`}`,
    '',
    `RSS: ${SITE}/feed.xml`,
    `Cancelar suscripción: ${unsubscribeUrl}`,
    '',
    'PRISMA es software experimental, no clínico.',
  ].join('\n');
}

export function welcomeEmailHtml({ confirmNote }) {
  return `<!DOCTYPE html>
<html lang="es"><body style="font-family:Georgia,serif;background:#f0eee6;color:#111;padding:24px;">
  <div style="max-width:520px;margin:0 auto;border:1.5px solid #111;background:#fffef8;padding:24px;">
    <p style="font-family:monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;">Rogex Newspaper</p>
    <h1 style="font-size:22px;">Suscripción activa</h1>
    <p>Recibirás un correo cada vez que publiquemos un avance en <a href="${SITE}/">newspaper.rogexlaboratories.com</a>.</p>
    <p>También puedes seguir el canal por RSS: <a href="${SITE}/feed.xml">${SITE}/feed.xml</a></p>
    ${confirmNote ? `<p style="font-size:13px;color:#555;">${escapeHtml(confirmNote)}</p>` : ''}
  </div>
</body></html>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export { SITE };
