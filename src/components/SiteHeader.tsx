/* ==========================================================================
   SITE HEADER
   Sticky cream bar: logo + wordmark, main nav, "Come & sing" CTA.
   Collapses to a menu toggle below 1024px.
   ========================================================================== */

import { useState } from 'react';
import { Link } from 'react-router';
import { mainNav, site } from '../content';
import { useOpenContact } from '../contact-context';
import { NavLink } from './NavLink';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const openContact = useOpenContact();
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* ---- Brand ---- */}
        <Link to="/" className="brand" onClick={close}>
          <span className="brand__mark">
            <img src="/images/ycc-logo-gold.webp" alt="" width="46" height="46" />
          </span>
          <span className="brand__text">
            <span className="brand__name">{site.name}</span>
            <span className="brand__tagline">{site.tagline}</span>
          </span>
        </Link>

        {/* ---- Mobile menu toggle ---- */}
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="menu-toggle__bars" aria-hidden="true" />
        </button>

        {/* ---- Main nav ---- */}
        <nav id="main-nav" className={`main-nav${open ? ' is-open' : ''}`} aria-label="Main">
          <ul>
            {mainNav.map((item) => (
              <li key={item.label}>
                <NavLink item={item} className="main-nav__link" onNavigate={close} />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn btn--gold main-nav__cta"
            onClick={() => {
              close();
              openContact('Joining the choir');
            }}
          >
            Come &amp; sing
          </button>
        </nav>
      </div>
    </header>
  );
}
