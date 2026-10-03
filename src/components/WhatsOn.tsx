/* ==========================================================================
   WHAT'S ON  (#whats-on)
   Two columns on the cream band: "Next performances" (next two upcoming
   concerts, linking to the concerts page) and "Follow the sound" social
   link cards.
   ========================================================================== */

import { Link } from 'react-router';
import { concerts, features, socialCards } from '../content';
import { shortDate, upcoming } from '../lib/dates';

export function WhatsOn() {
  const next = upcoming(concerts).slice(0, 2);

  return (
    <section className="section section--cream" id="whats-on">
      <div className="container whats-on">
        {/* ---- Next performances ---- */}
        <div>
          <h2 className="h2 h2--md">Next performances</h2>
          {next.length > 0 ? (
            <ul className="gigs">
              {next.map((g) => (
                <li key={g.date + g.title} className="gig">
                  <span className="gig__date">{shortDate(g.date)}</span>
                  <div>
                    <h3 className="gig__title">
                      <Link to="/concerts">{g.title}</Link>
                    </h3>
                    <p className="gig__meta">
                      {g.venue} · {g.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="body-muted gigs">New dates are coming soon. Follow us to hear first.</p>
          )}
          <Link to="/concerts" className="btn btn--gold">
            {features.tickets ? 'All concerts & tickets' : 'All concerts'}
          </Link>
        </div>

        {/* ---- Follow the sound ---- */}
        <div>
          <h2 className="h2 h2--md">Follow the sound</h2>
          <p className="body-muted">
            Meet the choir, watch rehearsal-to-concert stories and catch the best 15 seconds from
            every performance.
          </p>
          <ul className="socials">
            {socialCards.map((s) => (
              <li key={s.name}>
                <a href={s.href} className="social-card" target="_blank" rel="noopener noreferrer">
                  <span className="social-card__name">{s.name}</span>
                  <span className="social-card__blurb">
                    {s.blurb} <span aria-hidden="true">→</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
