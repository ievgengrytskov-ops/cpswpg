// All site content lives here. Edit text in one place.

export const site = {
  name: 'Canadian Prime Solutions Inc.',
  url: 'https://cpswpg.ca',
  shortName: 'Canadian Prime Solutions',
  title: 'Porcelain Bathtub Surrounds & Backsplashes in Winnipeg | Canadian Prime Solutions',
  description:
    'Large-format natural porcelain tile in Winnipeg: showroom, sales and installation of bathtub surrounds and kitchen backsplashes. Call 204 951 6379.',
  // Owner 2026-11-16: public email, also the address for form requests
  email: 'winnipegcps@gmail.com',
  // Web3Forms access key for winnipegcps@gmail.com (owner 2026-11-17). Public by design: it only
  // delivers to that inbox. Env vars PUBLIC_FORM_ENDPOINT / PUBLIC_WEB3FORMS_KEY override it.
  form: { endpoint: 'https://api.web3forms.com/submit', web3formsKey: 'd3acab6f-357b-490d-98b6-cf9bd05ee811' },
  phones: [
    { label: '204 951 6379', href: 'tel:+12049516379' },
    { label: '204 869 6379', href: 'tel:+12048696379' },
  ],
  // Messengers on the main number (owner 2026-11-17)
  messengers: [
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/12049516379' },
    { id: 'viber', label: 'Viber', href: 'viber://chat?number=%2B12049516379' },
  ],
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/cps.winnipeg' },
    { label: 'Facebook', href: 'https://www.facebook.com/cpswpg' },
    { label: 'Twitter', href: 'https://twitter.com/cps_wpg' },
    { label: 'YouTube', href: 'https://www.youtube.com/@cpswpginc113' },
  ],
  videos: { intro: 'cj5w4yEg5w0', goals: 'faXd3IZoF1g' },
  // Image paths are inside src/assets/wp (see src/lib/images.ts)
  // Old logo (red/grey, for light backgrounds). The site now uses src/assets/brand/emblem.png (gold, owner 2026-11-16).
  logo: '2023/02/LOGO_cps_wpg_l.png',
  ogImage: 'cps/25.jpg',
  // Values from the old site (Elementor counters). A counter with value null is not shown.
  stats: [
    { value: 1200 as number | null, suffix: '+', label: 'Projects Done' },
    { value: 99.9 as number | null, suffix: '%', label: 'Client Satisfaction' },
  ],
  // From the Google Business Profile pin (owner-provided link, 2026-11-16).
  // Main address confirmed by the owner 2026-11-16
  address: { street: '1081 Colby Ave', city: 'Winnipeg', region: 'MB', postal: 'R3T 2P8', country: 'CA' },
  geo: { lat: 49.7988439, lng: -97.1597431 },
  mapUrl: 'https://www.google.com/maps?cid=1818885901365916689',
  areaServed: 'Winnipeg',
  // Office hours from the Google Business Profile (owner screenshot 2026-11-16). The showroom has its own hours (showroom.hours)
  hours: { text: 'Mon–Fri 9 am – 5 pm', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
  // Confirmed by the owner 2026-11-16
  facts: {
    googleRating: 5.0,
    googleReviews: 14,
    installDays: '2–3 days',
    warranty: '5-year warranty on the porcelain tile',
    // Price (bathtub surround from $1,300) is deliberately NOT shown on the site: owner decision, too many variables.
    serviceArea: 'Winnipeg and surrounding areas',
  },
};

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;

export type NavItem = { label: string; href?: string; children?: { label: string; href: string }[] };
export const nav: NavItem[] = [
  {
    label: 'Services',
    children: [
      { label: 'Bathtub Surround', href: '/bathroom/' },
      { label: 'Kitchen Backsplash', href: '/kitchen/' },
      { label: 'Bathtub Refinishing', href: '/bathtub-repair/' },
    ],
  },
  { label: 'Porcelain Tile', href: '/porcelain-tiles/' },
  { label: 'Showroom', href: '/showroom/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];
/** Every page link in the menu, flat (breadcrumbs, footer) */
export const navLinks = nav.flatMap((i) => i.children ?? (i.href ? [{ label: i.label, href: i.href }] : []));

// ---------- Home page content (redesign 2026-11-16). Facts only from the owner / old site. ----------

export const homeServices = [
  { title: 'Bathtub Surround', href: '/bathroom/', image: 'cps/4.jpg', alt: 'Bathtub surround with large white marble-look porcelain tiles', text: 'Large natural porcelain tiles around your tub instead of dozens of small ones. Usually done in 2–3 days.' },
  { title: 'Kitchen Backsplash', href: '/kitchen/', image: 'cps/40.jpg', alt: 'Kitchen with white shaker cabinets, black counters and a marble-look porcelain backsplash', text: 'Natural porcelain with a continuous stone look behind the counter and almost no grout to clean.' },
  { title: 'Bathtub Refinishing', href: '/bathtub-repair/', image: '2022/12/2-4-scaled.jpg', alt: 'Bathtub after enamel restoration', text: 'Rust, stains and chips taken care of. After restoration the tub is ready in 24 hours.' },
  { title: 'Bathroom Renovation', href: '/bathroom/', image: 'cps/3.jpg', alt: 'Bathroom with a marble-look porcelain tub surround, white vanity and round LED mirror', text: 'Tub, flooring, vanity, toilet, faucets, painting and lighting.' },
];

export const compareRows = [
  { label: 'Material', porcelain: 'Natural porcelain: fine clay and minerals fired at over 1,200 °C', ceramic: 'Coarser clay, fired at lower temperature' },
  { label: 'Size', porcelain: '24″ × 48″, 71″ × 36″, up to 47″ × 106″', ceramic: 'Small tiles, laid one by one' },
  { label: 'Thickness', porcelain: '1/4″, less than half of traditional tile', ceramic: 'Thick and heavy' },
  { label: 'Grout lines', porcelain: 'Almost none', ceramic: 'Many joints to clean and reseal' },
  { label: 'Old tile', porcelain: 'Can often stay: large tiles go over it if it is in good condition', ceramic: 'Has to be torn out first' },
  { label: 'Durability', porcelain: 'Scratch, chip and stain resistant; colour does not fade', ceramic: 'Chips show the clay underneath' },
];

export const beforeAfter = [
  { before: '2022/12/Mold1.jpg', after: '2022/12/mold3.jpg', beforeAlt: 'Old beige ceramic tile around a bathtub', afterAlt: 'The same bathtub with marble-look porcelain tiles', caption: 'Beige ceramic tile replaced with marble-look tiles and black fixtures.' },
  { before: '2022/12/mold4.jpg', after: '2022/12/mold2.jpg', beforeAlt: 'Bathtub with broken and missing ceramic wall tiles', afterAlt: 'The same bathtub with a white marble-look porcelain surround', caption: 'Broken tile around the tub replaced with a white marble-look surround.' },
];

export const steps = [
  { title: 'Call or write', text: 'Tell us about your bathroom or kitchen and what you would like to change.' },
  { title: 'Visit and choose', text: 'We measure and help you choose the tile size and the stone look.' },
  { title: 'Installation', text: 'Most bathtub surrounds are installed in 2–3 days, often right over the old tile.' },
  { title: 'Enjoy it', text: 'A wipe-clean surface with a 5-year warranty on the tile.' },
];

// Home gallery preview: first photo is shown large
export const recentWork = [
  { image: 'cps/25.jpg', alt: 'Shower with a black grid glass enclosure and grey marble-look porcelain walls' },
  { image: 'cps/29.jpg', alt: 'Bathroom with a blue stone-look porcelain wall, vanity and round LED mirror' },
  { image: 'cps/23.jpg', alt: 'Walk-in shower with grey marble-look porcelain walls and a built-in niche' },
  { image: 'cps/41.jpg', alt: 'White kitchen with a marble-look porcelain backsplash and dark countertop' },
  { image: 'cps/39.jpg', alt: 'Shower with a glass door, marble-look porcelain walls and a lit niche' },
];

export const homeFaq = [
  { q: 'How long does a bathtub surround take?', a: 'Most bathtub surrounds are installed in 2–3 days.' },
  { q: 'Can large porcelain tiles go over my old tile?', a: 'Often, yes. At 1/4″ they are light enough to be installed over existing tile when the tile is in good condition. We check this during the visit.' },
  { q: 'How much does it cost?', a: 'Every bathroom is different: size, the tiles you choose and the condition of the walls all matter. We give you a quote after a visit.' },
  { q: 'What sizes are available?', a: 'Large-format porcelain tile comes in 24″ × 48″, 71″ × 36″ and 47″ × 106″, all 1/4″ thick, plus other sizes on request. You can see them at our showroom.' },
  { q: 'Is there a warranty?', a: 'Yes, there is a 5-year warranty on the porcelain tile.' },
  { q: 'Is porcelain tile a natural material?', a: 'Yes. Porcelain is made from natural kaolin clay, quartz and feldspar, pressed and fired at over 1,200 °C. It contains no plastic or resin, absorbs almost no water and its colour does not fade.' },
  { q: 'How do I clean porcelain tiles?', a: 'Wipe them with a damp cloth and mild soap. The few grout lines should be sealed from time to time.' },
  { q: 'Do you renovate the whole bathroom?', a: 'Yes: bathtub replacement, flooring, vanity, toilet, faucets, painting and lighting, as well as the surround itself.' },
  { q: 'Where do you work?', a: 'Winnipeg and surrounding areas.' },
];

// ---------- Showroom and sales (owner 2026-11-16) ----------
export const showroom = {
  name: 'Canadian Porcelain Surfaces by CPS', // showroom brand, confirmed by the owner 2026-11-16
  legalName: '10286168 Manitoba Inc.', // tile sales and showroom company, a subsidiary of CPS (owner 2026-11-16)
  // Owner 2026-11-16: same hours as the office (site.hours), Mon–Fri 9 am – 5 pm, closed on weekends
  street: '1041 Erin St',
  city: 'Winnipeg, MB R3G 2X1',
  postal: 'R3G 2X1',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('1041 Erin St, Winnipeg, MB R3G 2X1'),
  hours: 'Mon–Fri, 9 am – 5 pm',
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  opens: '09:00',
  closes: '17:00',
  delivery: 'Free delivery in Winnipeg when you buy 4 tiles or more, any size',
  photo: { image: 'cps/showroom-1.jpg', alt: 'Showroom with large marble-look porcelain tiles on display, a marble-look floor and a vanity with a round lit mirror' },
  // Showroom/supplier images of the tile (owner 2026-11-16). Product illustrations: keep on /showroom/ only, not in the gallery or "our work"
  visuals: [
    { image: 'cps/showroom-viz-1.jpg', alt: 'Bathtub and walk-in shower with white marble-look porcelain tiles with gold veining', caption: 'White marble look with gold veining · tub and walk-in shower' },
    { image: 'cps/showroom-viz-2.jpg', alt: 'Bathtub surround of large white marble-look porcelain tiles with gold veining', caption: 'White marble look with gold veining · bathtub surround' },
  ],
  products: [
    {
      title: 'Large-format porcelain tile',
      text: 'Natural porcelain made from fine clay and minerals, with the look of marble, onyx and stone. For bathtub surrounds, showers, backsplashes and feature walls.',
      sizes: ['24″ × 48″ × 1/4″', '71″ × 36″ × 1/4″', '47″ × 106″ × 1/4″', 'Other sizes on request'],
    },
    {
      title: 'XPS boards',
      text: 'Lightweight XPS boards for preparing walls before tile goes up.',
      sizes: ['60″ × 36″ × 1/2″'],
    },
    {
      title: 'Stone veneer',
      text: 'Stone veneer for feature walls and accents. Ask us about the styles available.',
      sizes: [],
    },
  ],
  // From the owner's flyer "Canadian Porcelain Surfaces by CPS" (2026-11). Thickness 6 mm (~1/4″).
  collections: [
    {
      name: 'Premium Selection',
      size: '47″ × 106″',
      metric: '1200 × 2700 × 6 mm',
      count: 8,
      designs: [
        { code: 'MN113', name: 'Roman Onyx' },
        { code: 'MN072', name: 'Panda White' },
        { code: 'MN019', name: 'Statuario White' },
        { code: 'MN034', name: 'Calacatta Gold' },
        { code: 'MN178', name: 'Taj Mahal' },
        { code: 'LHTA1008', name: 'Green Malachite' },
        { code: 'MN277', name: 'Pietra Grey' },
        { code: 'MN728', name: 'Galaxy Black' },
      ],
    },
    {
      name: 'Showroom Mix',
      size: '36″ × 71″',
      metric: '900 × 1800 × 6 mm',
      count: 18,
      designs: [],
      note: 'Marble, stone, terrazzo and wood looks. Come and see all 18 at the showroom.',
    },
  ],
  // Texture close-ups of the tiles
  samples: [
    { image: '2022/12/8-3.jpg', alt: 'White marble-look porcelain tile' },
    { image: '2022/12/3-2.jpg', alt: 'Grey marble-look porcelain tile' },
    { image: '2022/12/5-2.jpg', alt: 'Onyx-look porcelain tile' },
    { image: '2022/12/9-2.jpg', alt: 'Beige onyx-look porcelain tile' },
    { image: '2022/12/2-3.jpg', alt: 'Dark marble-look porcelain tile with gold veining' },
  ],
};
export const showroomAddress = `${showroom.street}, Winnipeg`; // short, for headings
export const showroomFullAddress = `${showroom.street}, ${showroom.city}`;

export const showroomFaq = [
  { q: 'Can I buy tile without installation?', a: 'Yes. You can buy tiles, XPS boards and stone veneer for your own project, or have our team install them.' },
  { q: 'Do you deliver?', a: 'Yes. Delivery in Winnipeg is free when you buy 4 tiles or more, of any size.' },
  { q: 'What sizes do you carry?', a: 'Large-format porcelain tile in 24″ × 48″, 71″ × 36″ and 47″ × 106″, all 1/4″ thick, plus other sizes on request. XPS boards are 60″ × 36″ × 1/2″.' },
  { q: 'Why porcelain and not natural stone?', a: 'Porcelain is made from natural clay and minerals fired at high temperature. It gives the look of marble or onyx, but it is thinner, lighter, absorbs almost no water and its colour does not fade.' },
];

export const teamPhoto ={ image: '2025/12/cps-team-building.jpg', alt: 'The Canadian Prime Solutions team' };

// Logos from the old home page. None of them was a link there.
// dark: white logo, needs a dark tile
// Logos in src/assets/brand/partners (trimmed copies of the WP files + Globe/Shindico from their sites).
// url: optional link (opens in a new tab). TODO: link for Best in Winnipeg from the owner
export const partners: { name: string; image: string; dark?: boolean; url?: string }[] = [
  { name: 'Kinew Housing Inc.', image: 'brand/partners/kinew.png' },
  { name: 'BBB Accredited Business, A+ rating', image: 'brand/partners/bbb.png' },
  { name: 'Best in Winnipeg', image: 'brand/partners/best-in-winnipeg.png' },
  { name: 'Professional Property Managers Association (PPMA)', image: 'brand/partners/ppma.png' },
  { name: 'BUILD', image: 'brand/partners/build.png', dark: true },
  { name: 'Purpose Construction', image: 'brand/partners/purpose.png' },
  { name: 'Good Karma Interiors Inc.', image: 'brand/partners/good-karma.png' },
  { name: 'Akman Property Management', image: 'brand/partners/akman.png', dark: true },
  { name: 'Globe Property Management', image: 'brand/partners/globe.png', dark: true, url: 'https://globepm.ca/' },
  { name: 'Shindico Realty Inc.', image: 'brand/partners/shindico.png', url: 'https://shindico.com/' },
];

export const testimonials = [
  { name: 'Al Sto', url: 'https://www.google.com/maps/contrib/115400638699076632874/reviews/', text: `We had Canadian Prime Solutions Inc. Bathtub surround remodel our bathroom. CPS and it team were terrific to work with and it's pricing was very reasonable. They started and completed the job exactly on schedule. We're very pleased with the new bathroom. I highly recommend Canadian Prime Solutions Inc.` },
  { name: 'Jasmine Oane', url: 'https://www.google.com/maps/contrib/101447676243074929504/photos/', text: `I recently got my tubsurround done by CPS and I am so happy with the results! They were friendly and efficient. Definitely recommend Igor and his team!` },
  { name: 'Iryna Maiboroda', url: 'https://www.google.com/maps/contrib/117361580807618418134/photos/', text: `I'm very happy with the quality of work that have been done. My bathroom looks amazing with the new tub surround! I woud highly recommend this company.` },
  { name: 'Lindsay Menard', url: 'https://www.google.com/maps/contrib/103343532860376168663/photos/', text: `We had CPS redo our bathroom tub surround. We absolutely love the way it turned it. They were friendly, on time and got the job done exactly as we wanted!` },
  { name: 'Gisele Berard', url: 'https://www.google.com/maps/contrib/103512202595325613706/photos/', text: `WOW!! absolutely gorgeous!! The remodeling of our bathroom, was way more than we expected. Giving 20 stars on 5. Igor and his helper were fantastic, professional, respectful, punctual, and great to work with. He knew exactly what I wanted, and was just fabulous to work with. The craftsmanship of their work is just extraordinary, the care and details. We will surely recommend him to friends and family. Will not hesitate to hire him again, in a heartbeat. Beautiful work done in a short period of time at a very reasonable price. I cannot say enough glowing words about him and his work. Thank you so much Igor!!` },
  { name: 'Bala C.', url: 'https://www.google.com/maps/contrib/113521285246626930509/photos/', text: `Very prompt, clean and professional. I hired CPS to install porcelain panel for my bathroom tub surround. Fantastic outcome and we are very happy to recommend to others.` },
];
