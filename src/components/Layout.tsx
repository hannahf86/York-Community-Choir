/* ==========================================================================
   LAYOUT
   Shared shell for every page: header, page content, the "Your voice
   belongs here" join band, footer and the contact dialog.
   ========================================================================== */

import { useCallback, useRef, useState } from 'react';
import { Outlet } from 'react-router';
import type { ContactTopic } from '../content';
import { ContactContext } from '../contact-context';
import { SiteHeader } from './SiteHeader';
import { JoinCta } from './JoinCta';
import { SiteFooter } from './SiteFooter';
import { ContactDialog } from './ContactDialog';
import { ScrollManager } from './ScrollManager';

export function Layout() {
  const contactRef = useRef<HTMLDialogElement>(null);
  const [topic, setTopic] = useState<ContactTopic>('Joining the choir');

  const openContact = useCallback((t: ContactTopic) => {
    setTopic(t);
    contactRef.current?.showModal();
  }, []);

  return (
    <ContactContext.Provider value={openContact}>
      <ScrollManager />
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteHeader />

      <main id="main">
        <Outlet />
        {/* ---- Join CTA (every page) ---- */}
        <JoinCta />
      </main>

      <SiteFooter />
      <ContactDialog ref={contactRef} topic={topic} onTopicChange={setTopic} />
    </ContactContext.Provider>
  );
}
