/* ==========================================================================
   DATE HELPERS
   Concert dates are stored as ISO strings (yyyy-mm-dd) in content.ts.
   ========================================================================== */

import type { Concert } from '../content';

const parse = (iso: string) => new Date(`${iso}T12:00:00Z`);
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...opts }).format(parse(iso));

/** "12 Dec" */
export const shortDate = (iso: string) => fmt(iso, { day: 'numeric', month: 'short' });
/** "Saturday 12 December 2026" */
export const longDate = (iso: string) =>
  fmt(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export const dayNum = (iso: string) => fmt(iso, { day: 'numeric' });
export const monthShort = (iso: string) => fmt(iso, { month: 'short' });
export const weekdayShort = (iso: string) => fmt(iso, { weekday: 'short' });

/** Concerts from today onwards, soonest first. Past concerts drop off automatically. */
export function upcoming(list: Concert[]) {
  const today = new Date().toISOString().slice(0, 10);
  return list.filter((c) => c.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}
