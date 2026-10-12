/* ==========================================================================
   usePageTitle
   Sets the browser tab title (and optionally the meta description) per page.
   - usePageTitle()                      → homepage title from content.ts
   - usePageTitle('Programmes')          → "Programmes | York Community Choir"
   - usePageTitle('Full title', { exact: true, description: '…' })
   Pages without their own description fall back to the homepage one in
   index.html.
   ========================================================================== */

import { useEffect } from 'react';
import { site } from '../content';

const descTag = () => document.querySelector<HTMLMetaElement>('meta[name="description"]');
const defaultDescription = descTag()?.content ?? '';

type Options = { exact?: boolean; description?: string };

export function usePageTitle(title?: string, { exact = false, description }: Options = {}) {
  useEffect(() => {
    document.title = !title ? site.homeTitle : exact ? title : `${title} | ${site.name}`;
    const tag = descTag();
    if (tag) tag.content = description ?? defaultDescription;
  }, [title, exact, description]);
}
