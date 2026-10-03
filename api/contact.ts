/* ==========================================================================
   API: POST /api/contact
   Vercel function. Validates the contact form and sends it to the choir
   inbox via Resend, with Reply-To set to the enquirer.

   Env vars (set in Vercel → Project → Settings → Environment Variables):
     RESEND_API_KEY      Resend API key
     CONTACT_TO_EMAIL    where enquiries go (e.g. hello@yorkcommunitychoir.co.uk)
     CONTACT_FROM_EMAIL  verified Resend sender, e.g.
                         "York Community Choir <website@yorkcommunitychoir.co.uk>"
   ========================================================================== */

import { Resend } from 'resend';

const TOPICS = ['Joining the choir', 'Concerts & tickets', 'Safeguarding', 'Something else'];
const VOICE_PARTS = ['Not sure yet', 'Soprano', 'Alto', 'Tenor', 'Bass'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const field = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Honeypot filled in → pretend it worked so bots don't retry
  if (field(body.website, 200)) return json({ ok: true });

  const name = field(body.name, 100);
  const email = field(body.email, 200);
  const message = field(body.message, 5000);
  const topic = TOPICS.includes(field(body.topic, 50)) ? field(body.topic, 50) : 'Something else';
  const voicePart = VOICE_PARTS.includes(field(body.voicePart, 30)) ? field(body.voicePart, 30) : '';

  if (!name || !email || !message) return json({ error: 'Please fill in your name, email and message.' }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: 'Please enter a valid email address.' }, 400);

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Contact form: missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL');
    return json({ error: "Sorry, the form isn't set up yet. Please email us directly." }, 500);
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Topic', topic],
    ...(voicePart ? ([['Voice part', voicePart]] as [string, string][]) : []),
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#161817;line-height:1.5">
      <h2 style="margin:0 0 16px">New website enquiry: ${escapeHtml(topic)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join('')}
      </table>
      <p style="margin:16px 0 4px"><strong>Message</strong></p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>`;

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${message}`;

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL.split(',').map((s) => s.trim()),
    replyTo: email,
    subject: `Website enquiry: ${topic} — ${name}`,
    html,
    text,
  });

  if (error) {
    console.error('Resend error', error);
    return json({ error: "Sorry, we couldn't send your message. Please try again or email us directly." }, 502);
  }

  return json({ ok: true });
}
