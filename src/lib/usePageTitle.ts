/* ==========================================================================
   usePageTitle
   Sets the browser tab title per page.
   ========================================================================== */

import { useEffect } from 'react';
import { site } from '../content';

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
  }, [title]);
}
