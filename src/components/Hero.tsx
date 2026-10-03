/* ==========================================================================
   HERO
   Dark intro block ("Great singing starts with belonging.") with the two
   primary CTAs, followed by the rehearsal photo + play button that opens
   the Rutter performance video.
   ========================================================================== */

import { Link } from 'react-router';
import { useOpenContact } from '../contact-context';
import { VideoDialog, useVideoDialog } from './VideoDialog';

export function Hero() {
  const openContact = useOpenContact();
  const video = useVideoDialog();

  return (
    <section className="hero">
      {/* ---- Intro copy ---- */}
      <div className="hero__intro container">
        <p className="eyebrow eyebrow--light">York voices · One brilliant sound</p>
        <h1 className="hero__title">Great singing starts with belonging.</h1>
        <p className="hero__lead">
          A welcoming York choir with ambitious standards, joyful rehearsals and a social life
          worth singing about.
        </p>
        <div className="hero__actions">
          <button type="button" className="btn btn--gold" onClick={() => openContact('Joining the choir')}>
            Join the choir
          </button>
          <Link to="/concerts" className="btn btn--cream">
            See our concerts
          </Link>
        </div>
      </div>

      {/* ---- Media + play button ---- */}
      <div className="hero__media">
        <img
          src="/images/hero-rehearsal.webp"
          alt="The choir singing in a candlelit York church, led by their conductor"
          width="1584"
          height="672"
          fetchPriority="high"
        />
        <button type="button" className="play-button" onClick={video.open}>
          <span className="sr-only">Watch the choir perform Rutter</span>
          <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
            <path d="M8 5.5v13l10.5-6.5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <VideoDialog
        ref={video.ref}
        src="/media/rutter-720.mp4"
        poster="/images/hero-rehearsal.webp"
        title="York Community Choir performing Rutter"
      />
    </section>
  );
}
