/* ==========================================================================
   PAGE HERO
   Dark intro band for inner pages (About, Concerts). Matches the homepage
   hero's style at a smaller scale. Optional children render below the copy
   (e.g. the About page video).
   ========================================================================== */

import type { ReactNode } from 'react';

type Props = { eyebrow: string; title: string; lead?: string; children?: ReactNode };

export function PageHero({ eyebrow, title, lead, children }: Props) {
  return (
    <section className="page-hero">
      <div className="container page-hero__intro">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
      </div>
      {children}
    </section>
  );
}
