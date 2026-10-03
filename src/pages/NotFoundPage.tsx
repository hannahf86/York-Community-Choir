/* ==========================================================================
   404 PAGE
   ========================================================================== */

import { Link } from 'react-router';
import { usePageTitle } from '../lib/usePageTitle';
import { PageHero } from '../components/PageHero';

export function NotFoundPage() {
  usePageTitle('Page not found');

  return (
    <PageHero eyebrow="404" title="That's a wrong note." lead="We couldn't find the page you were looking for.">
      <div className="container page-hero__actions">
        <Link to="/" className="btn btn--gold">Back to the homepage</Link>
      </div>
    </PageHero>
  );
}
