/* ==========================================================================
   CONTACT DIALOG
   Modal enquiry form opened by every join/contact CTA. Posts JSON to
   /api/contact (Vercel function → Resend). Includes a hidden honeypot field.
   ========================================================================== */

import { forwardRef, useState, type FormEvent } from 'react';
import { contactTopics, voiceParts, type ContactTopic } from '../content';

type Status = 'idle' | 'sending' | 'sent' | 'error';

type Props = { topic: ContactTopic; onTopicChange: (t: ContactTopic) => void };

export const ContactDialog = forwardRef<HTMLDialogElement, Props>(function ContactDialog(
  { topic, onTopicChange },
  ref,
) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  const isJoining = topic === 'Joining the choir';

  return (
    <dialog
      ref={ref}
      className="dialog dialog--contact"
      aria-labelledby="contact-title"
      onClose={() => setStatus((s) => (s === 'sent' ? 'idle' : s))}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="contact">
        <form method="dialog" className="dialog__close-form">
          <button className="dialog__close dialog__close--dark" aria-label="Close">
            ×
          </button>
        </form>

        {status === 'sent' ? (
          /* ---- Success state ---- */
          <div className="contact__done" role="status">
            <p className="eyebrow eyebrow--gold">Message sent</p>
            <h2 id="contact-title" className="h2 h2--md">Thank you!</h2>
            <p className="body-muted">
              We've got your message and someone from the choir will be in touch soon. The kettle's
              already on.
            </p>
            <form method="dialog">
              <button className="btn btn--gold">Close</button>
            </form>
          </div>
        ) : (
          /* ---- Form ---- */
          <>
            <p className="eyebrow">{isJoining ? 'Your first rehearsal is free' : 'Get in touch'}</p>
            <h2 id="contact-title" className="h2 h2--md">
              {isJoining ? 'Come & sing with us' : 'Contact the choir'}
            </h2>

            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" name="name" required maxLength={100} autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="cf-email">Email</label>
                <input id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="cf-topic">What's it about?</label>
                  <select
                    id="cf-topic"
                    name="topic"
                    value={topic}
                    onChange={(e) => onTopicChange(e.target.value as ContactTopic)}
                  >
                    {contactTopics.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                {isJoining && (
                  <div className="field">
                    <label htmlFor="cf-voice">Voice part</label>
                    <select id="cf-voice" name="voicePart" defaultValue={voiceParts[0]}>
                      {voiceParts.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="field">
                <label htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  required
                  maxLength={5000}
                  placeholder={isJoining ? 'Tell us a little about yourself and any singing experience (none is fine!)' : ''}
                />
              </div>

              {/* Honeypot: hidden from people, tempting to bots */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="cf-website">Website</label>
                <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {status === 'error' && (
                <p className="contact__error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="btn btn--gold" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
});
