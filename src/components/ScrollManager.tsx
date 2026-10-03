/* ==========================================================================
   SCROLL MANAGER
   On route change: scroll to the #hash section if there is one (e.g.
   "/programmes#northern-lights" from the homepage carousel), otherwise
   back to the top. Retries for a few frames in case the new page hasn't
   finished rendering yet.
   ========================================================================== */

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    let frame = 0;
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        // 'instant' so the global smooth-scroll doesn't animate across pages
        el.scrollIntoView({ behavior: 'instant' });
      } else if (tries++ < 20) {
        frame = requestAnimationFrame(tryScroll);
      }
    };
    tryScroll();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
