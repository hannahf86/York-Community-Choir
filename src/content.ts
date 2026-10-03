/* ==========================================================================
   SITE CONTENT
   All copy, links and listings live here so they can be updated without
   touching the components. Links marked TODO need the choir's real URLs.
   ========================================================================== */

export const site = {
  name: 'York Community Choir',
  tagline: 'Sounding as good as we sing',
  email: 'hello@yorkcommunitychoir.co.uk', // TODO: domain not bought yet; set up this inbox once it is
  year: 2026,
};

// TODO: replace with the choir's real social profiles
export const social = {
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  youtube: 'https://www.youtube.com/',
};

/* Topics shown in the contact form. CTAs around the site open the form
   with one of these pre-selected. */
export const contactTopics = [
  'Joining the choir',
  'Concerts & tickets',
  'Safeguarding',
  'Something else',
] as const;
export type ContactTopic = (typeof contactTopics)[number];

export const voiceParts = ['Not sure yet', 'Soprano', 'Alto', 'Tenor', 'Bass'] as const;

/* ---- Feature switches ----
   tickets: set to false if the director decides against selling tickets
   online. The concerts page then drops all ticket buttons and prices. */
export const features = {
  tickets: true,
};

/* ---- Rehearsals ---- */
export const rehearsals = {
  day: 'Thursdays',
  time: '7:30–9:00pm',
  venue: "St Aelred's RC Church",
  address: 'Fifth Avenue, York',
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=St+Aelred's+RC+Church+Fifth+Avenue+York",
  // TODO: confirm with the choir
  firstVisit: 'Your first rehearsal is free. No audition, no need to read music.',
  bring: "Just yourself and a water bottle. We'll sort out your music.",
};

/* ---- Navigation ----
   `to` = a route or a section on a page ("/about#gallery"); `topic` = opens the
   contact form with that topic selected. Order follows the page. */
export type NavItem =
  | { label: string; to: string }
  | { label: string; topic: ContactTopic };

export const mainNav: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: "What's on", to: '/concerts' },
];

export const footerNav: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/about#gallery' },
  { label: 'Programmes', to: '/programmes' },
  { label: features.tickets ? 'Concerts & tickets' : 'Concerts', to: '/concerts' },
  { label: 'Join us', topic: 'Joining the choir' },
  { label: 'Safeguarding', topic: 'Safeguarding' },
  { label: 'Contact', topic: 'Something else' },
];

/* ---- "More than a rehearsal night" cards ---- */
export const pillars = [
  { title: 'Belonging', text: 'First rehearsals, tea breaks and the friendships between notes.' },
  { title: 'Craft', text: 'Sectional detail, conductor insight and a piece coming together.' },
  { title: 'Performance', text: 'Polished concerts, soloist moments and audience reactions.' },
  { title: 'Community', text: 'Charity events, choir socials and the pub afterwards.' },
];

/* ---- Programmes ----
   Shown in the homepage carousel (in this order) and on /programmes
   (current first, then newest to oldest by `starts`).
   `current: true` marks the season shown in gold; the carousel opens on it.
   TODO: placeholder descriptions and repertoire — replace with the real lists. */
export type Piece = { title: string; composer: string };

export type Programme = {
  slug: string; // used in the URL: /programmes#slug
  season: string;
  starts: string; // yyyy-mm, used for ordering
  title: string;
  repertoire?: string; // one-line summary for the carousel
  description: string;
  pieces: Piece[];
  current?: boolean;
  recordingUrl?: string; // TODO: YouTube playlist for each programme
};

export const programmes: Programme[] = [
  {
    slug: 'songs-of-the-city',
    season: 'Winter 2025',
    starts: '2025-09',
    title: 'Songs of the City',
    description:
      'A love letter to York: songs about streets, rivers and the people who live here, from medieval carols to brand-new arrangements.',
    pieces: [
      { title: 'The York Carol', composer: 'Traditional, arr. placeholder' },
      { title: 'Streets of London', composer: 'Ralph McTell, arr. placeholder' },
      { title: 'Lux Aurumque', composer: 'Eric Whitacre' },
      { title: 'In the Bleak Midwinter', composer: 'Harold Darke' },
    ],
    recordingUrl: social.youtube,
  },
  {
    slug: 'light-across-the-ouse',
    season: 'Autumn 2026',
    starts: '2026-09',
    title: 'Light Across the Ouse',
    repertoire: 'Whitacre · Rutter · Gjeilo · contemporary folk arrangements',
    description:
      'Our most ambitious programme yet: shimmering modern choral works set alongside folk songs arranged especially for the choir.',
    pieces: [
      { title: 'Sleep', composer: 'Eric Whitacre' },
      { title: 'For the Beauty of the Earth', composer: 'John Rutter' },
      { title: 'Ubi Caritas', composer: 'Ola Gjeilo' },
      { title: 'The Water Is Wide', composer: 'Traditional, arr. placeholder' },
      { title: 'Shenandoah', composer: 'Traditional, arr. placeholder' },
    ],
    current: true,
  },
  {
    slug: 'northern-lights',
    season: 'Spring 2026',
    starts: '2026-01',
    title: 'Northern Lights',
    description:
      'Music from the far north: Nordic choral pieces and songs inspired by long winter nights and the first light of spring.',
    pieces: [
      { title: 'Northern Lights', composer: 'Ola Gjeilo' },
      { title: 'A Gaelic Blessing', composer: 'John Rutter' },
      { title: 'Even When He Is Silent', composer: 'Kim André Arnesen' },
      { title: 'Ave Maria', composer: 'Franz Biebl' },
    ],
    recordingUrl: social.youtube,
  },
];

/* ---- Upcoming concerts ----
   Used on the homepage (first two) and the concerts page (all).
   `ticketUrl`: link to the ticket seller (TicketSource, Eventbrite etc.).
   Leave it out and the button opens the contact form to reserve instead. */
export type Concert = {
  date: string; // ISO yyyy-mm-dd
  title: string;
  venue: string;
  address?: string;
  time: string;
  description?: string;
  price?: string;
  ticketUrl?: string;
};

export const concerts: Concert[] = [
  {
    date: '2026-12-12',
    title: 'Christmas at the Guildhall',
    venue: 'York Guildhall',
    address: "St Helen's Square, York",
    time: '7:30pm',
    // TODO: real descriptions, prices and ticket links
    description: 'Carols old and new, a few surprises and mince pies at the interval.',
    price: '£12 · £6 under-18s',
  },
  {
    date: '2027-03-21',
    title: 'Light Across the Ouse',
    venue: 'Central Methodist Church',
    address: 'St Saviourgate, York',
    time: '7pm',
    description: 'Our spring programme: Whitacre, Rutter, Gjeilo and contemporary folk arrangements.',
    price: '£12 · £6 under-18s',
  },
];

/* ---- "Follow the sound" social links ---- */
export const socialCards = [
  { name: 'Instagram', blurb: 'Behind the scenes & reels', href: social.instagram },
  { name: 'Facebook', blurb: 'Our community hub', href: social.facebook },
  { name: 'YouTube', blurb: 'Full concert recordings', href: social.youtube },
];

/* ==========================================================================
   ABOUT PAGE
   Placeholder copy throughout. TODO: replace with the choir's own words.
   ========================================================================== */

// Set `src` once the video is ready, e.g. '/media/about.mp4'
/* ---- About page gallery ----
   Add photos to public/images and list them here. `shape` controls the
   grid tile: 'wide' spans two columns, 'tall' spans two rows.
   TODO: add more photos from the choir. */
export type Photo = { src: string; alt: string; caption?: string; shape?: 'wide' | 'tall' };

export const galleryPhotos: Photo[] = [
  { src: '/images/hero-rehearsal.webp', alt: 'The choir singing in a candlelit York church, led by their conductor', caption: 'Rehearsing for Christmas', shape: 'wide' },
  { src: '/images/gallery-conductor.webp', alt: 'The conductor leading a rehearsal', caption: 'Our director in full flow', shape: 'tall' },
  { src: '/images/tea-break.webp', alt: 'Choir members laughing over tea and biscuits in the community hall', caption: 'The all-important tea break' },
  { src: '/images/gallery-concert.webp', alt: 'The choir on stage in a cathedral with a full audience', caption: 'Concert night', shape: 'tall' },
  { src: '/images/gallery-sectional.webp', alt: 'Singers sharing a score during a sectional rehearsal', caption: 'Sectional rehearsal' },
  { src: '/images/gallery-pub.webp', alt: 'Choir members chatting outside a York pub after a concert', caption: 'The pub afterwards', shape: 'tall' },
];

export const aboutVideo: { src: string | null; poster: string } = {
  src: null,
  poster: '/images/gallery-conductor.webp',
};

export const aboutIntro = [
  "York Community Choir is a non-auditioned choir of singers from all over the city. Some of us have sung all our lives. Some of us hadn't sung since school. We rehearse every Thursday, perform three main concerts a year, and spend a fair amount of time in the pub afterwards.",
  'We take the music seriously but never ourselves. Our director chooses ambitious repertoire, from Whitacre and Rutter to folk arrangements written just for us, and then helps every section get there one bar at a time.',
];

export const lifeInChoir = [
  {
    title: 'Your first evening',
    text: "You'll be met at the door, introduced to a choir buddy from your voice part and handed a folder of music. Nobody expects you to know anything yet. Sit next to your buddy, follow along and enjoy it.",
  },
  {
    title: 'How rehearsals feel',
    text: "We start with a warm-up that's half breathing exercise, half comedy. Then we work through two or three pieces, sometimes as a full choir, sometimes in sections. Expect lots of laughter and the odd goosebump moment.",
  },
  {
    title: 'Concert season',
    text: 'In the weeks before a concert we add an extra rehearsal and a run-through in the venue. On the night, there are black outfits, nerves, a full house and an incredible feeling when it all comes together.',
  },
  {
    title: 'The after-party',
    text: "Once the last note has rung out and the chairs are stacked, we celebrate. After every concert there's a little party for the choir, with drinks, food and plenty of reliving the best bits.",
  },
  {
    title: 'Beyond the music',
    text: 'Summer picnics, quiz nights and a lot of tea. Many of our members say the friendships are the best part.',
  },
  {
    title: 'Staying in touch',
    text: "Once you've joined, we'll add you to the choir WhatsApp groups. There's one for the whole choir with notices and social plans, and one for your section where you can share practice tracks and ask questions between rehearsals.",
  },
];

export const typicalEvening = [
  { time: '7:15pm', title: 'Arrive & say hello', text: 'Grab your music and find your section.' },
  { time: '7:30pm', title: 'Warm-up', text: 'Breathing, stretching and a few silly noises.' },
  { time: '7:45pm', title: 'Rehearsal', text: "Full choir and section work on this term's pieces." },
  { time: '8:15pm', title: 'Tea break', text: 'Tea, biscuits and notices. The kettle is always on.' },
  { time: '8:30pm', title: 'Second half', text: 'Putting it together and singing it through.' },
  { time: '9:00pm', title: 'Finish', text: 'Home, or the pub for anyone who fancies it.' },
];

export const choirYear: { when: string; title: string; text: string; link?: { label: string; to: string } }[] = [
  { when: 'September', title: 'Autumn term begins', text: 'New repertoire, and the best time to join as we prepare for Christmas.' },
  {
    when: 'December',
    title: 'Christmas concert',
    text: 'Our biggest night of the year: Christmas at the Guildhall.',
    link: { label: 'See dates & tickets', to: '/concerts' },
  },
  { when: 'January', title: 'Spring term begins', text: 'New members welcome again as we start fresh pieces.' },
  { when: 'March', title: 'Spring concert', text: 'Our most ambitious programme of the year.' },
  { when: 'April–July', title: 'Summer term', text: 'A lighter programme, community events and the summer social.' },
  { when: 'August', title: 'Summer break', text: 'A well-earned rest before it all starts again.' },
];

export const memberStories = [
  { quote: 'By the tea break, I already felt like I belonged.', name: 'Hannah', part: 'Alto' },
  { quote: "I hadn't sung since school. Two years later I'm singing Whitacre to a full house.", name: 'Placeholder name', part: 'Tenor' },
  { quote: 'I moved to York knowing nobody. Now half my friends are basses.', name: 'Placeholder name', part: 'Bass' },
];

export const faqs = [
  { q: 'Do I need to audition?', a: 'No. Everyone is welcome. We help you find the voice part that suits you.' },
  { q: 'Do I need to read music?', a: "Not at all. Many members don't. We provide learning tracks so you can practise at home." },
  { q: 'Can I join partway through a term?', a: 'Yes, you can join at any point. September and January are the easiest times to start, because that is when we begin new music.' },
  { q: 'How much does it cost?', a: 'Your first rehearsal is free. After that there is a termly membership fee. Get in touch for the current rate and concessions.' },
  { q: 'Do I have to sing in the concerts?', a: "We'd love you to, but it's never compulsory." },
  {
    q: "How will I know what's going on?",
    a: "Through our WhatsApp groups. There's a whole-choir group for notices, rehearsal changes and socials, plus a group for your section. We'll add you after your first few rehearsals.",
  },
];
