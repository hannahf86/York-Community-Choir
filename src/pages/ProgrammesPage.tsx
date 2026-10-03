/* ==========================================================================
   PROGRAMMES PAGE  (/programmes)
   Every programme, current first then newest to oldest. Each one has its
   own anchor (/programmes#slug) so the homepage carousel can link straight
   to it. Left: season, title, description and actions. Right: repertoire.
   ========================================================================== */

import { Link } from 'react-router';
import { features, programmes, social, type Programme } from '../content';
import { useOpenContact } from '../contact-context';
import { usePageTitle } from '../lib/usePageTitle';
import { PageHero } from '../components/PageHero';

const ordered = [...programmes].sort(
  (a, b) => Number(!!b.current) - Number(!!a.current) || b.starts.localeCompare(a.starts),
);

export function ProgrammesPage() {
  usePageTitle('Programmes');

  return (
    <>
      {/* ---- Hero ---- */}
      <PageHero
        eyebrow="What we're singing"
        title="Our programmes"
        lead="Each term we build a programme around a theme, mixing choral classics, new music and arrangements written just for us."
      />

      {/* ---- Programme list ---- */}
      <section className="section section--light" aria-label="Programmes">
        <div className="container programmes-list">
          {ordered.map((p) => (
            <ProgrammeBlock key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* ---- Listen back ---- */}
      <section className="section section--cream">
        <div className="container listen-back">
          <div>
            <h2 className="h2 h2--md">Listen back</h2>
            <p className="body-muted">
              Full concert recordings from past programmes are on our YouTube channel.
            </p>
          </div>
          <a href={social.youtube} className="btn btn--dark" target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </a>
        </div>
      </section>
    </>
  );
}

/* ---- Single programme ---- */
function ProgrammeBlock({ p }: { p: Programme }) {
  const openContact = useOpenContact();

  return (
    <article id={p.slug} className={`prog${p.current ? ' prog--current' : ''}`} aria-labelledby={`${p.slug}-title`}>
      {/* Overview */}
      <div className="prog__overview">
        <p className="prog__label">
          {p.current ? 'Current' : 'Previous'} · {p.season}
        </p>
        <h2 id={`${p.slug}-title`} className="prog__title">{p.title}</h2>
        <p className="prog__desc">{p.description}</p>

        <div className="prog__actions">
          {p.current ? (
            <>
              <Link to="/concerts" className="btn btn--dark">
                {features.tickets ? 'See dates & tickets' : 'See concert dates'}
              </Link>
              <button type="button" className="btn btn--outline" onClick={() => openContact('Joining the choir')}>
                Sing it with us
              </button>
            </>
          ) : (
            p.recordingUrl && (
              <a href={p.recordingUrl} className="btn btn--gold" target="_blank" rel="noopener noreferrer">
                Listen to the recording<span className="sr-only">: {p.title}</span>
              </a>
            )
          )}
        </div>
      </div>

      {/* Repertoire */}
      <div className="prog__rep">
        <h3 className="prog__rep-title">Repertoire</h3>
        <ol className="pieces">
          {p.pieces.map((piece) => (
            <li key={piece.title} className="piece">
              <span className="piece__title">{piece.title}</span>
              <span className="piece__composer">{piece.composer}</span>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
