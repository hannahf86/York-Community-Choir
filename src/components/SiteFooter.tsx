/* ==========================================================================
   SITE FOOTER
   Logo + wordmark, footer nav, email, social links and copyright.
   ========================================================================== */

import { Link } from 'react-router';
import { footerNav, rehearsals, site, social } from '../content';
import { NavLink } from './NavLink';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* ---- Top row: brand + nav ---- */}
        <div className="site-footer__top">
          <Link to="/" className="brand brand--footer">
            <span className="brand__mark brand__mark--lg">
              <img src="/images/ycc-logo-gold.webp" alt="" width="56" height="56" loading="lazy" />
            </span>
            <span className="brand__name">{site.name}</span>
          </Link>
          <nav aria-label="Footer">
            <ul className="footer-nav">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} className="footer-nav__link" />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ---- Bottom row: email + rehearsals, socials, copyright ---- */}
        <div className="site-footer__bottom">
          <div className="site-footer__contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p className="site-footer__rehearsals">
              Rehearsals: {rehearsals.day} {rehearsals.time}, {rehearsals.venue}, {rehearsals.address}
            </p>
          </div>
          <p className="footer-socials">
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> ·{' '}
            <a href={social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> ·{' '}
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          </p>
          <p className="site-footer__copy">© {site.name} {site.year}</p>
        </div>
      </div>
    </footer>
  );
}
