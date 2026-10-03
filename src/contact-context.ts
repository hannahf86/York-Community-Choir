/* ==========================================================================
   CONTACT CONTEXT
   Lets any CTA on the page open the contact dialog with a topic pre-selected.
   ========================================================================== */

import { createContext, useContext } from 'react';
import type { ContactTopic } from './content';

export const ContactContext = createContext<(topic: ContactTopic) => void>(() => {});

export const useOpenContact = () => useContext(ContactContext);
