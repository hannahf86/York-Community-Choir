/* ==========================================================================
   HOMEPAGE
   Section order follows the "Classic warm" design, plus the rehearsal
   info band straight after the welcome section.
   ========================================================================== */

import { usePageTitle } from '../lib/usePageTitle';
import { Hero } from '../components/Hero';
import { Welcome } from '../components/Welcome';
import { RehearsalInfo } from '../components/RehearsalInfo';
import { RehearsalNight } from '../components/RehearsalNight';
import { ChoirLife } from '../components/ChoirLife';
import { Programmes } from '../components/Programmes';
import { WhatsOn } from '../components/WhatsOn';

export function HomePage() {
  usePageTitle();

  return (
    <>
      {/* ---- Hero ---- */}
      <Hero />
      {/* ---- About teaser: Come for the music ---- */}
      <Welcome />
      {/* ---- Rehearsal info: when / where / first visit ---- */}
      <RehearsalInfo />
      {/* ---- More than a rehearsal night ---- */}
      <RehearsalNight />
      {/* ---- Gallery: Life in the choir ---- */}
      <ChoirLife />
      {/* ---- Programmes carousel ---- */}
      <Programmes />
      {/* ---- What's on: next performances + socials ---- */}
      <WhatsOn />
    </>
  );
}
