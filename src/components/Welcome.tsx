/* ==========================================================================
   WELCOME  (#about)
   "Come for the music. Stay for the people." — tea-break photo, intro copy,
   member quote and a link through to the About page.
   ========================================================================== */

import { Link } from 'react-router';

export function Welcome() {
  return (
    <section className="section section--light" id="about">
      <div className="container split">
        <img
          className="split__media"
          src="/images/tea-break.webp"
          alt="Choir members laughing over tea and biscuits in the community hall"
          width="1152"
          height="928"
          loading="lazy"
        />
        <div className="split__body">
          <p className="eyebrow">Everyone has a first rehearsal</p>
          <h2 className="h2">Come for the music. Stay for the people.</h2>
          <p className="body-muted">
            No awkward auditions. No need to know anyone. We'll pair you with a friendly choir
            buddy, help you find your voice part and make sure the kettle is on.
          </p>
          <blockquote className="pull-quote">
            "By the tea break, I already felt like I belonged." <cite>- Hannah, alto</cite>
          </blockquote>
          <Link to="/about" className="btn btn--gold">
            Find out more about life in the choir
          </Link>
        </div>
      </div>
    </section>
  );
}
