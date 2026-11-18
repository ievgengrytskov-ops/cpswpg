// Text shown above the gallery grid for each filter (owner's texts, 2026-11-17; edited for site
// terminology: "tiles", not "panels"). Keys must match "category" in gallery-new.json / gallery.json.
export type GalleryIntro = {
  /** id for links: /gallery/#kitchen */
  hash: string;
  label: string;
  title: [string, string];
  lead: string;
  text: string[];
  servicesTitle: string;
  services: string[];
  whyTitle: string;
  why: string[];
  cta: string;
  tagline: string;
  links: { label: string; href: string }[];
};

export const galleryIntros: Record<string, GalleryIntro> = {
  kitchen: {
    hash: 'kitchen',
    label: 'Kitchen',
    title: ['Kitchen projects:', 'porcelain backsplashes and walls'],
    lead: 'Transform your kitchen with beautiful, durable and easy-to-maintain natural porcelain.',
    text: [
      'At Canadian Prime Solutions we install porcelain tile professionally, including large-format porcelain tiles for kitchen backsplashes and feature walls.',
      'Whether you like the timeless elegance of Calacatta marble, a modern stone look or a clean contemporary design, we help bring your idea to life.',
    ],
    servicesTitle: 'Our kitchen services',
    services: [
      'Large-format porcelain backsplash installation',
      'Marble-look porcelain tiles',
      'Full-height kitchen backsplashes',
      'Porcelain feature walls',
      'Custom cuts and professional finishing',
      'Removal and replacement of an existing backsplash',
    ],
    whyTitle: 'Why porcelain?',
    why: [
      'Durable, moisture resistant and easy to clean, in designs inspired by natural stone.',
      'Precise measurements, clean installation and attention to detail.',
    ],
    cta: 'Looking to upgrade your kitchen?',
    tagline: 'Style you want. Price you need.',
    links: [
      { label: 'Kitchen backsplash', href: '/kitchen/' },
      { label: 'Our tile collections', href: '/showroom/' },
    ],
  },
  bathroom: {
    hash: 'bathroom',
    label: 'Bathroom',
    title: ['Bathroom projects:', 'tub surrounds and renovations'],
    lead: 'A beautiful, modern bathroom with professional installation by Canadian Prime Solutions.',
    text: [
      'We renovate bathrooms with large-format porcelain tiles: a clean, elegant look with far fewer grout lines.',
      'From bathtub surrounds to complete bathroom makeovers, we offer practical solutions that combine style, durability and a fair price.',
    ],
    servicesTitle: 'Our bathroom services',
    services: [
      'Large-format porcelain bathtub surrounds',
      'Walk-in shower walls',
      'Porcelain shower walls and niches',
      'Bathroom wall and floor tile installation',
      'Modern marble-look porcelain designs',
      'Bathroom renovations and upgrades',
      'Custom large-format tile installation',
    ],
    whyTitle: 'Why large-format porcelain?',
    why: [
      'Large tiles give an almost seamless, luxurious look with fewer grout lines, so everyday cleaning is easier.',
      'Choose from Calacatta marble-inspired finishes and modern stone patterns.',
    ],
    cta: 'Planning a bathroom renovation?',
    tagline: 'Bathroom renovation specialists.',
    links: [
      { label: 'Bathtub surround', href: '/bathroom/' },
      { label: 'Visit the showroom', href: '/showroom/' },
    ],
  },
  'bathtub refinishing': {
    hash: 'refinishing',
    label: 'Bathtub refinishing',
    title: ['Bathtub refinishing:', 'restored, not replaced'],
    lead: "A worn, stained or discoloured bathtub doesn't always need to be replaced.",
    text: [
      'We refinish and restore existing bathtubs for homeowners and property managers in Winnipeg.',
      'Refinishing is an affordable alternative to replacing the tub: it saves time and keeps renovation costs down.',
    ],
    servicesTitle: 'Our bathtub refinishing services',
    services: [
      'Bathtub refinishing and reglazing',
      'Bathtub surface restoration',
      'Repair of minor chips and surface imperfections',
      'Professional cleaning and preparation',
      'Residential and multi-unit property projects',
      'Bathtub refinishing for property management companies',
    ],
    whyTitle: 'Why refinish?',
    why: [
      'More affordable than replacing the bathtub',
      'Less demolition and construction',
      'Faster turnaround and a fresh, clean look',
      'Ideal for rental properties and apartment buildings',
    ],
    cta: 'Need to restore your bathtub?',
    tagline: 'Restore your bathtub. Save time. Save money.',
    links: [{ label: 'Bathtub refinishing', href: '/bathtub-repair/' }],
  },
};
