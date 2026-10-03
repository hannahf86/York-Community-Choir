/* ==========================================================================
   REHEARSAL INFO
   When / where / first visit / what to bring, with directions and a
   "Come & sing" CTA. Used on the homepage and the About page.
   ========================================================================== */

import { rehearsals } from '../content';
import { useOpenContact } from '../contact-context';

export function RehearsalInfo({ id = 'rehearsals' }: { id?: string }) {
  const openContact = useOpenContact();

  return (
    <section className="rehearsal-info" id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="rehearsal-info__head">
          <div>
            <p className="eyebrow eyebrow--gold">Come along</p>
            <h2 id={`${id}-title`} className="h2 h2--md h2--light">
              Rehearsals every Thursday
            </h2>
          </div>
          <button type="button" className="btn btn--gold" onClick={() => openContact('Joining the choir')}>
            Book your free first rehearsal
          </button>
        </div>

        <dl className="rehearsal-info__grid">
          <div className="rehearsal-info__item">
            <dt>When</dt>
            <dd>
              {rehearsals.day}, {rehearsals.time}
            </dd>
          </div>
          <div className="rehearsal-info__item">
            <dt>Where</dt>
            <dd>
              {rehearsals.venue}, {rehearsals.address}
              <a href={rehearsals.mapsUrl} target="_blank" rel="noopener noreferrer" className="rehearsal-info__link">
                Get directions <span aria-hidden="true">→</span>
              </a>
            </dd>
          </div>
          <div className="rehearsal-info__item">
            <dt>Your first visit</dt>
            <dd>{rehearsals.firstVisit}</dd>
          </div>
          <div className="rehearsal-info__item">
            <dt>What to bring</dt>
            <dd>{rehearsals.bring}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
