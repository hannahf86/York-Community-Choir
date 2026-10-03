/* ==========================================================================
   ABOUT PAGE  (/about)
   Life in the choir: video, intro, a typical Thursday, what it's like,
   the choir year, gallery, member stories, rehearsal info and FAQs.
   ========================================================================== */

import { Link } from 'react-router';
import { aboutIntro, choirYear, faqs, lifeInChoir, memberStories, typicalEvening } from '../content';
import { usePageTitle } from '../lib/usePageTitle';
import { PageHero } from '../components/PageHero';
import { AboutVideo } from '../components/AboutVideo';
import { RehearsalInfo } from '../components/RehearsalInfo';
import { PhotoGallery } from '../components/PhotoGallery';

export function AboutPage() {
  usePageTitle('Life in the choir');

  return (
    <>
      {/* ---- Hero + video ---- */}
      <PageHero
        eyebrow="About the choir"
        title="Life in the choir"
        lead="Ambitious music, a warm welcome and a lot of tea. Here's what being part of York Community Choir is really like."
      >
        <AboutVideo />
      </PageHero>

      {/* ---- Intro ---- */}
      <section className="section section--light">
        <div className="container about-intro">
          <h2 className="h2 h2--md">A choir for anyone who loves to sing</h2>
          <div className="about-intro__body">
            {aboutIntro.map((p) => (
              <p key={p.slice(0, 20)} className="body-muted">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- A typical Thursday (timeline) ---- */}
      <section className="section section--dark" aria-labelledby="evening-title">
        <div className="container">
          <p className="eyebrow eyebrow--light">Thursday nights</p>
          <h2 id="evening-title" className="h2 h2--md h2--light">A typical rehearsal</h2>
          <ol className="evening">
            {typicalEvening.map((step) => (
              <li key={step.time} className="evening__step">
                <span className="evening__time">{step.time}</span>
                <h3 className="evening__title">{step.title}</h3>
                <p className="evening__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- What it's like (words) ---- */}
      <section className="section section--light" aria-labelledby="life-title">
        <div className="container">
          <p className="eyebrow">In our members' words</p>
          <h2 id="life-title" className="h2 h2--md">What it's like</h2>
          <div className="life-grid">
            {lifeInChoir.map((item) => (
              <article key={item.title} className="life-card">
                <h3 className="life-card__title">{item.title}</h3>
                <p className="body-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- The choir year (timeline) ---- */}
      <section className="section section--dark" aria-labelledby="year-title">
        <div className="container year">
          <div className="year__intro">
            <p className="eyebrow eyebrow--light">Dates for the diary</p>
            <h2 id="year-title" className="h2 h2--md h2--light">The choir year</h2>
            <p className="year__lead">
              We sing from September to July, with breaks in line with York school holidays. You can join
              at any point.
            </p>
          </div>
          <ol className="year__list">
            {choirYear.map((item) => (
              <li key={item.when} className="year__item">
                <span className="year__when">{item.when}</span>
                <div>
                  <h3 className="year__title">{item.title}</h3>
                  <p className="year__text">{item.text}</p>
                  {item.link && (
                    <Link to={item.link.to} className="year__link">
                      {item.link.label} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Gallery ---- */}
      <PhotoGallery />

      {/* ---- Member stories ---- */}
      <section className="section section--cream" id="stories" aria-labelledby="stories-title">
        <div className="container">
          <p className="eyebrow">Stories</p>
          <h2 id="stories-title" className="h2 h2--md">Why our members sing</h2>
          <ul className="stories">
            {memberStories.map((s, i) => (
              <li key={i} className="story">
                <blockquote className="story__quote">"{s.quote}"</blockquote>
                <p className="story__who">
                  {s.name}, <span>{s.part.toLowerCase()}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Rehearsal info ---- */}
      <RehearsalInfo id="about-rehearsals" />

      {/* ---- FAQs ---- */}
      <section className="section section--light" aria-labelledby="faq-title">
        <div className="container faq">
          <div>
            <p className="eyebrow">Good to know</p>
            <h2 id="faq-title" className="h2 h2--md">Questions new singers ask</h2>
          </div>
          <div className="faq__list">
            {faqs.map((f) => (
              <details key={f.q} className="faq__item">
                <summary>{f.q}</summary>
                <p className="body-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
