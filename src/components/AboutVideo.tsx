/* ==========================================================================
   ABOUT VIDEO
   16:9 video under the About page hero. Until `aboutVideo.src` is set in
   content.ts it shows a "coming soon" placeholder over the poster image.
   ========================================================================== */

import { aboutVideo } from '../content';

export function AboutVideo() {
  return (
    <div className="container about-video">
      {aboutVideo.src ? (
        <video controls playsInline preload="metadata" poster={aboutVideo.poster}>
          <source src={aboutVideo.src} type="video/mp4" />
        </video>
      ) : (
        <div className="about-video__placeholder">
          <img src={aboutVideo.poster} alt="" />
          <div className="about-video__overlay">
            <span className="about-video__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M8 5.5v13l10.5-6.5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <p>Our film is coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
