/* ==========================================================================
   PROGRAMMES  (#programmes)
   "Programmes with heart and ambition" — three-up carousel. The active
   programme sits in the centre in gold; neighbours sit either side in
   charcoal. Arrows (and the side cards) move the carousel; it wraps.
   "Explore this programme" sits below the carousel and links to the active
   programme on /programmes.
   ========================================================================== */

import { useState } from 'react';
import { Link } from 'react-router';
import { programmes } from '../content';

const startIndex = Math.max(
  0,
  programmes.findIndex((p) => p.current),
);

export function Programmes() {
  const [active, setActive] = useState(startIndex);
  const count = programmes.length;
  const at = (offset: number) => (active + offset + count) % count;
  const go = (offset: number) => setActive(at(offset));

  const prev = programmes[at(-1)];
  const curr = programmes[active];
  const next = programmes[at(1)];

  const label = (p: (typeof programmes)[number]) => `${p.current ? 'Current' : 'Previous'} · ${p.season}`;

  return (
    <section className="section section--dark" id="programmes">
      <div className="container">
        <p className="eyebrow eyebrow--light">What we're singing</p>
        <h2 className="h2 h2--lg h2--light">Programmes with heart and ambition</h2>

        <div className="carousel" aria-roledescription="carousel" aria-label="Programmes">
          {/* ---- Previous arrow ---- */}
          <button type="button" className="carousel__arrow" onClick={() => go(-1)} aria-label="Previous programme">
            <Arrow dir="left" />
          </button>

          {/* ---- Side card (previous) ---- */}
          <SideCard p={prev} label={label(prev)} onSelect={() => go(-1)} />

          {/* ---- Active card ---- */}
          <article className="programme programme--active" aria-live="polite" key={curr.title}>
            <p className="programme__label programme__label--caps">{label(curr)}</p>
            <h3 className="programme__title programme__title--lg">{curr.title}</h3>
            {curr.repertoire && <p className="programme__rep">{curr.repertoire}</p>}
          </article>

          {/* ---- Position counter (shown on mobile, between the arrows) ---- */}
          <p className="carousel__count" aria-hidden="true">
            {active + 1} of {count}
          </p>

          {/* ---- Side card (next) ---- */}
          <SideCard p={next} label={label(next)} onSelect={() => go(1)} />

          {/* ---- Next arrow ---- */}
          <button type="button" className="carousel__arrow" onClick={() => go(1)} aria-label="Next programme">
            <Arrow dir="right" />
          </button>
        </div>

        {/* ---- Explore CTA (follows the active card) ---- */}
        <div className="carousel__cta">
          <Link to={`/programmes#${curr.slug}`} className="btn btn--gold">
            Explore this programme<span className="sr-only">: {curr.title}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---- Charcoal side card ---- */
function SideCard({
  p,
  label,
  onSelect,
}: {
  p: (typeof programmes)[number];
  label: string;
  onSelect: () => void;
}) {
  return (
    <article className="programme programme--side">
      <p className="programme__label">{label}</p>
      <h3 className="programme__title">
        <button type="button" className="programme__select" onClick={onSelect}>
          {p.title}
        </button>
      </h3>
      <Link to={`/programmes#${p.slug}`} className="programme__link">
        Listen &amp; view programme <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d={dir === 'left' ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
