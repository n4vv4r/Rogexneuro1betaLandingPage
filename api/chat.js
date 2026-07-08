import fs from 'node:fs/promises';
import path from 'node:path';

async function loadMemory() {
  if (process.env.ROGEX_MEMORY_URL) {
    try {
      const res = await fetch(process.env.ROGEX_MEMORY_URL, { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch {}
  }

  try {
    const localPath = path.join(process.cwd(), 'content', 'rogex-memory.json');
    return JSON.parse(await fs.readFile(localPath, 'utf8'));
  } catch {
    return { brand: 'Rogex Laboratories' };
  }
}

function systemPrompt(memory) {
  return `You are Navi / Nivalynx, the concise AI guide for Rogex Laboratories.

Output rules:
Plain text only.
No Markdown.
No bold.
No headings.
No bullets using symbols.
No code blocks.
Keep it short: 3 to 6 lines.
Ask one useful question at the end.
Offer simple options only when useful.

Role:
Explain Rogex clearly to visitors.
Help them understand PRISMA, RogexOS, Moscovium, donations and collaborations.
Be honest about what is real today and what is roadmap.
Do not exaggerate medical, scientific, AI or crypto claims.
Encourage support naturally, without pressure.

Live memory:
${JSON.stringify(memory, null, 2)}

Default language: Spanish, unless the visitor writes in another language.`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ reply: 'Method not allowed.' });
    return;
  }

  const { message } = req.body || {};
  if (!message) {
    res.status(400).json({ reply: 'Falta el mensaje.' });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    res.status(200).json({
      reply: 'Navi todavía no está conectado a la API. Añade OPENAI_API_KEY para activarme. ¿Quieres ver productos, roadmap o cómo colaborar?'
    });
    return;
  }

  const memory = await loadMemory();
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-5.4-mini',
      input: [
        { role: 'system', content: systemPrompt(memory) },
        { role: 'user', content: String(message).slice(0, 1800) }
      ],
      max_output_tokens: 220,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const text = await response.text();
    res.status(500).json({ reply: `Navi no pudo responder ahora. Error: ${text.slice(0, 180)}` });
    return;
  }

  const data = await response.json();
  const reply =
    data.output_text ||
    data.output?.flatMap((item) => item.content || []).map((c) => c.text || '').join(' ') ||
    'No pude generar respuesta.';

  res.status(200).json({ reply });
}
