/* ==========================================================================
   JOIN CTA
   "Your voice belongs here." — dark closing band above the footer.
   ========================================================================== */

import { rehearsals } from '../content';
import { useOpenContact } from '../contact-context';

export function JoinCta() {
  const openContact = useOpenContact();

  return (
    <section className="join-cta">
      <div className="container join-cta__inner">
        <div>
          <h2 className="h2 h2--lg h2--light">Your voice belongs here.</h2>
          <p className="join-cta__text">
            New members are welcome throughout the year. {rehearsals.day}, {rehearsals.time}, at{' '}
            {rehearsals.venue}. Your first rehearsal is free.
          </p>
        </div>
        <button type="button" className="btn btn--gold" onClick={() => openContact('Joining the choir')}>
          Find out more about the choir
        </button>
      </div>
    </section>
  );
}
