/* ==========================================================================
   NAV LINK
   Renders a nav item as either a router link (page or homepage section)
   or a button that opens the contact dialog ("Contact", "Join us",
   "Safeguarding"). Marks the current page with aria-current.
   ========================================================================== */

import { Link, useLocation } from 'react-router';
import type { NavItem } from '../content';
import { useOpenContact } from '../contact-context';

type Props = { item: NavItem; className?: string; onNavigate?: () => void };

export function NavLink({ item, className, onNavigate }: Props) {
  const openContact = useOpenContact();
  const { pathname } = useLocation();

  if ('to' in item) {
    const isCurrent = !item.to.includes('#') && pathname === item.to;
    return (
      <Link
        to={item.to}
        className={className}
        aria-current={isCurrent ? 'page' : undefined}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onNavigate?.();
        openContact(item.topic);
      }}
    >
      {item.label}
    </button>
  );
}
