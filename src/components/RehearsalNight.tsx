/* ==========================================================================
   REHEARSAL NIGHT
   "More than a rehearsal night" — four numbered cards on the cream band.
   ========================================================================== */

import { pillars } from '../content';

export function RehearsalNight() {
  return (
    <section className="section section--cream" id="rehearsal-night">
      <div className="container">
        <h2 className="h2 h2--md">More than a rehearsal night</h2>
        <ol className="pillars">
          {pillars.map((p, i) => (
            <li key={p.title} className="pillar">
              <span className="pillar__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__text">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
