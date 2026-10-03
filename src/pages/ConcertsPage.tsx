/* ==========================================================================
   CONCERTS PAGE  (/concerts)
   Upcoming concerts with date, venue, details and — when features.tickets
   is on — price and a ticket button. Concerts without a ticketUrl get a
   "Reserve tickets" button that opens the contact form instead.
   ========================================================================== */

import { concerts, features, social, type Concert } from '../content';
import { useOpenContact } from '../contact-context';
import { dayNum, longDate, monthShort, upcoming, weekdayShort } from '../lib/dates';
import { usePageTitle } from '../lib/usePageTitle';
import { PageHero } from '../components/PageHero';

export function ConcertsPage() {
  const title = features.tickets ? 'Concerts & tickets' : 'Concerts';
  usePageTitle(title);
  const list = upcoming(concerts);

  return (
    <>
      {/* ---- Hero ---- */}
      <PageHero
        eyebrow="What's on"
        title={title}
        lead={
          features.tickets
            ? 'Come and hear us sing. Book your seats below.'
            : "Come and hear us sing. Here's where you can find us next."
        }
      />

      {/* ---- Concert list ---- */}
      <section className="section section--light" aria-label="Upcoming concerts">
        <div className="container">
          {list.length > 0 ? (
            <ul className="concerts">
              {list.map((c) => (
                <ConcertCard key={c.date + c.title} concert={c} />
              ))}
            </ul>
          ) : (
            <div className="concerts-empty">
              <h2 className="h2 h2--md">New dates coming soon</h2>
              <p className="body-muted">
                We're planning our next concerts now. Follow us on{' '}
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> or{' '}
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> to hear first.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ---- Good to know ---- */}
      <section className="section section--cream" aria-labelledby="concert-info-title">
        <div className="container">
          <h2 id="concert-info-title" className="h2 h2--md">Good to know</h2>
          <div className="info-grid">
            {/* TODO: confirm details with the choir */}
            <div className="info-card">
              <h3 className="info-card__title">Accessibility</h3>
              <p className="body-muted body-muted--sm">
                If you have any access needs, let us know before the concert and we'll do everything we can
                to help.
              </p>
            </div>
            <div className="info-card">
              <h3 className="info-card__title">Groups & schools</h3>
              <p className="body-muted body-muted--sm">
                Bringing ten or more? Get in touch about group rates.
              </p>
            </div>
            <div className="info-card">
              <h3 className="info-card__title">Can't make it?</h3>
              <p className="body-muted body-muted--sm">
                Full concert recordings go up on our{' '}
                <a href={social.youtube} target="_blank" rel="noopener noreferrer">YouTube channel</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---- Single concert row ---- */
function ConcertCard({ concert: c }: { concert: Concert }) {
  const openContact = useOpenContact();

  return (
    <li className="concert">
      {/* Date block */}
      <div className="concert__date" aria-hidden="true">
        <span className="concert__weekday">{weekdayShort(c.date)}</span>
        <span className="concert__day">{dayNum(c.date)}</span>
        <span className="concert__month">{monthShort(c.date)}</span>
      </div>

      {/* Details */}
      <div className="concert__body">
        <h2 className="concert__title">{c.title}</h2>
        <p className="concert__when">
          {longDate(c.date)} · {c.time}
        </p>
        <p className="concert__where">
          {c.venue}
          {c.address && `, ${c.address}`}
        </p>
        {c.description && <p className="body-muted body-muted--sm">{c.description}</p>}
      </div>

      {/* Tickets */}
      {features.tickets && (
        <div className="concert__tickets">
          {c.price && <p className="concert__price">{c.price}</p>}
          {c.ticketUrl ? (
            <a href={c.ticketUrl} className="btn btn--gold" target="_blank" rel="noopener noreferrer">
              Buy tickets<span className="sr-only"> for {c.title}</span>
            </a>
          ) : (
            <button type="button" className="btn btn--gold" onClick={() => openContact('Concerts & tickets')}>
              Reserve tickets<span className="sr-only"> for {c.title}</span>
            </button>
          )}
        </div>
      )}
    </li>
  );
}
