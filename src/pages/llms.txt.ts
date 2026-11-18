// /llms.txt: a plain-text summary of the business for AI assistants (llmstxt.org format).
// Built from the same data as the site, so facts never drift from the pages.
import type { APIRoute } from 'astro';
import { site, fullAddress, showroom, showroomFullAddress, homeServices, homeFaq, navLinks } from '../data/site';
import { guides } from '../lib/guides';

export const GET: APIRoute = () => {
  const f = site.facts;
  const u = (p: string) => `${site.url}${p}`;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    '## Key facts',
    `- Business: ${site.name}, a home renovation company in Winnipeg, Manitoba, Canada`,
    `- Speciality: large-format natural porcelain tile (made from clay and minerals, fired; not plastic) for bathtub surrounds, showers, kitchen backsplashes and feature walls`,
    `- Service area: ${f.serviceArea}`,
    `- Typical bathtub surround installation: ${f.installDays}, often over the existing tile`,
    `- Warranty: ${f.warranty}`,
    `- Google rating: ${f.googleRating.toFixed(1)} from ${f.googleReviews} reviews`,
    `- Address (showroom, visit us here): ${fullAddress}; ${site.hours.text}`,
    `- Phone: ${site.phones.map((p) => p.label).join(', ')}; WhatsApp and Viber: ${site.phones[0].label}`,
    `- Email: ${site.email}`,
    `- Prices: free estimate after a visit; the price depends on wall size, tile and wall condition`,
    '',
    `## Showroom: ${showroom.name}`,
    `- Address: ${showroomFullAddress}; ${showroom.hours}`,
    ...showroom.products.map((p) => `- ${p.title}${p.sizes.length ? ` (${p.sizes.join(', ')})` : ''}`),
    `- ${showroom.delivery}`,
    `- Tiles can be bought for your own project or installed by the team`,
    '',
    '## Services',
    ...homeServices.map((s) => `- [${s.title}](${u(s.href)}): ${s.text}`),
    '',
    '## Pages',
    ...navLinks.filter((n) => !homeServices.some((s) => s.href === n.href)).map((n) => `- [${n.label}](${u(n.href)})`),
    '',
    '## Guides',
    ...guides.map((g) => `- [${g.data.title}](${u(`/guides/${g.id}/`)}): ${g.data.description}`),
    '',
    '## Frequently asked questions',
    ...homeFaq.flatMap((q) => [`- Q: ${q.q}`, `  A: ${q.a}`]),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
