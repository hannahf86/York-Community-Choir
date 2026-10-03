/* ==========================================================================
   SITE HEADER
   Sticky cream bar: logo + wordmark, main nav, "Come & sing" CTA.
   Below 1024px the nav becomes a hamburger that opens a full-screen
   overlay (under the header bar) with large links, the CTA and rehearsal
   details. While open: page scroll is locked, Esc closes it, and it closes
   itself on navigation or if the window widens to desktop.
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { mainNav, rehearsals, site } from '../content';
import { useOpenContact } from '../contact-context';
import { NavLink } from './NavLink';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const openContact = useOpenContact();
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const close = () => setOpen(false);

  // Overlay starts directly under the header bar, whatever its height
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => header.style.setProperty('--header-h', `${header.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // Close on route change
  useEffect(close, [pathname]);

  // While open: lock page scroll, Esc to close, close if resized to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onWide = () => desktop.matches && close();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onWide);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <header className="site-header" ref={headerRef}>
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

        {/* ---- Hamburger toggle (mobile/tablet) ---- */}
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

        {/* ---- Main nav (inline on desktop, full-screen overlay on mobile) ---- */}
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

          {/* Overlay-only footer: rehearsal details */}
          <p className="main-nav__meta">
            Rehearsals {rehearsals.day}, {rehearsals.time}
            <br />
            {rehearsals.venue}, {rehearsals.address}
          </p>
        </nav>
      </div>
    </header>
  );
}
