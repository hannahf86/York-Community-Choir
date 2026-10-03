/* ==========================================================================
   CHOIR LIFE  (#life-in-the-choir)
   "Life in the choir" — masonry-style photo grid with a "Behind the scenes"
   caption card (linking to /about), plus the "View the gallery" CTA
   (links to the full gallery on the About page).
   ========================================================================== */

import { Link } from 'react-router';

export function ChoirLife() {
  return (
    <section className="section section--light" id="life-in-the-choir">
      <div className="container">
        {/* ---- Heading row ---- */}
        <div className="section-head">
          <div>
            <p className="eyebrow">In harmony, on and off stage</p>
            <h2 className="h2 h2--lg">Life in the choir</h2>
          </div>
          <Link to="/about#gallery" className="btn btn--gold">
            View the gallery
          </Link>
        </div>

        {/* ---- Photo grid ---- */}
        <div className="gallery">
          <img
            className="gallery__item gallery__item--concert"
            src="/images/gallery-concert.webp"
            alt="The choir on stage in a cathedral with a full audience"
            loading="lazy"
          />
          <img
            className="gallery__item gallery__item--conductor"
            src="/images/gallery-conductor.webp"
            alt="The conductor leading a rehearsal"
            loading="lazy"
          />
          <img
            className="gallery__item gallery__item--sectional"
            src="/images/gallery-sectional.webp"
            alt="Singers sharing a score during a sectional rehearsal"
            loading="lazy"
          />
          <img
            className="gallery__item gallery__item--pub"
            src="/images/gallery-pub.webp"
            alt="Choir members chatting outside a York pub after a concert"
            loading="lazy"
          />
          <div className="gallery__card">
            <p className="eyebrow eyebrow--gold">Behind the scenes</p>
            <h3 className="gallery__card-title">Rehearsals, tea breaks and the moments between notes.</h3>
            <p className="body-muted body-muted--sm">A glimpse into the warmth and camaraderie of choir life.</p>
            <Link to="/about" className="btn btn--gold gallery__card-btn">
              Read more about life in the choir
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
