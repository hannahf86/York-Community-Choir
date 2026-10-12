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
            Looking for somewhere to start singing in York? New members are welcome all year, and
            September and January are the easiest times to join. {rehearsals.day}, {rehearsals.time}{' '}
            at St Aelred’s, Fifth Avenue. Your first rehearsal is free.
          </p>
        </div>
        <button type="button" className="btn btn--gold" onClick={() => openContact('Joining the choir')}>
          Book your free first rehearsal
        </button>
      </div>
    </section>
  );
}
