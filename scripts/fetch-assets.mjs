// Downloads every image used on the old WordPress site into src/assets/wp
// (same YYYY/MM/name layout as wp-content/uploads) and writes:
//   src/data/media.json    which originals each page uses, with size and WP alt/title
//   src/data/gallery.json  the /gallery/ grid (Happy Addons Image Grid) with categories
// Originals are resolved through the WP REST API media catalog, so resized copies
// (-1024x684 etc.) map to their source file exactly.
// Usage: npm run assets   (Node 18+, needs internet). Already downloaded files are skipped.
import { mkdir, writeFile, copyFile, readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://cpswpg.ca';
const UPLOADS = `${ORIGIN}/wp-content/uploads/`;
// Images go through astro:assets (src/lib/images.ts), so they live in src/, not public/
const OUT = 'src/assets/wp';
const PAGES = {
  home: '/',
  about: '/about/',
  'porcelain-tiles': '/porcelain-tiles/',
  bathroom: '/bathroom/',
  'bathtub-repair': '/bathtub-repair/',
  kitchen: '/kitchen/',
  gallery: '/gallery/',
  'privacy-policy': '/privacy-policy/',
  reviews: '/reviews/',
};

const decode = (s) =>
  s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();

async function get(url, as = 'text') {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      return as === 'json' ? res.json() : as === 'buffer' ? Buffer.from(await res.arrayBuffer()) : res.text();
    } catch (err) {
      if (attempt >= 3) throw err;
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
}

// 1. Media catalog: every URL (original + all sizes) -> media item
console.log('Reading WP media catalog...');
const catalog = [];
// Some items have broken metadata and make the API answer HTTP 500 when media_details
// is requested. Such a page is re-read item by item; broken items come without sizes.
const API = `${ORIGIN}/wp-json/wp/v2/media`;
const BASIC = 'id,source_url,alt_text,title,mime_type';
const PER_PAGE = 50;
for (let page = 1; ; page++) {
  const q = `per_page=${PER_PAGE}&page=${page}&orderby=id&order=asc`;
  let res = await fetch(`${API}?${q}&_fields=${BASIC},media_details`);
  if (res.status === 400) break; // past the last page
  let items;
  if (res.ok) {
    items = await res.json();
  } else {
    items = [];
    for (const { id } of await get(`${API}?${q}&_fields=id`, 'json')) {
      const one = await fetch(`${API}/${id}?_fields=${BASIC},media_details`);
      if (one.ok) items.push(await one.json());
      else {
        console.warn(`  media ${id}: broken metadata, no size info`);
        items.push(await get(`${API}/${id}?_fields=${BASIC}`, 'json'));
      }
    }
  }
  catalog.push(...items);
  if (items.length < PER_PAGE) break;
}
if (!catalog.length) throw new Error('Media API returned nothing');
const byUrl = new Map();
for (const m of catalog) {
  byUrl.set(m.source_url, m);
  for (const s of Object.values(m.media_details?.sizes ?? {})) byUrl.set(s.source_url, m);
  if (m.media_details?.original_image) {
    byUrl.set(new URL(m.media_details.original_image, m.source_url).href, m);
  }
}
console.log(`  ${catalog.length} media items`);

const rel = (m) => m.source_url.slice(UPLOADS.length); // 2022/12/foo.jpg
const resolve = (u) => byUrl.get(u) ?? byUrl.get(u.replace(/-\d+x\d+(?=\.\w+$)/, ''));
const IMG_RE = /wp-content\/uploads\/(?!elementor\/)[^"'\s)<>,\\]+?\.(?:jpe?g|png|webp|svg|gif)/gi;

// Renders and stock photos that the old site showed among real projects.
// Owner decision 2026-11-16: not used on the new site. Not downloaded; deleted if present.
const EXCLUDE = new Set([
  '2022/12/argo-1.png', // owner 2026-11-16: no longer a partner
  '2022/12/4.jpg',
  '2022/12/6.jpg',
  '2022/12/15.jpg',
  '2022/12/1-2.jpg',
  '2022/12/2-1.jpg',
  '2022/12/5-1.jpg',
  '2022/12/6-1.jpg',
  '2022/12/9.webp',
  '2022/12/13-2.jpg',
  '2023/02/2-6.jpg',
  '2022/12/Kitchen-Countertops-Services.jpg',
  '2022/12/1562072733266-00-1.jpeg',
  '2022/12/Mirage_Jewels_Bagno_JW01_JW06_Bookmatch-2-1024x724-2.jpg',
]);

// 2. Which images each page uses (HTML + its Elementor CSS)
const usage = {};
const unknown = new Set();
const cssCache = new Map();
let galleryHtml = '';
for (const [name, p] of Object.entries(PAGES)) {
  const html = await get(ORIGIN + p);
  if (name === 'gallery') galleryHtml = html;
  let text = html;
  for (const [cssUrl] of html.matchAll(/https:\/\/cpswpg\.ca\/wp-content\/uploads\/elementor\/css\/[^"'?\s]+\.css/g)) {
    if (!cssCache.has(cssUrl)) cssCache.set(cssUrl, await get(cssUrl).catch(() => ''));
    text += cssCache.get(cssUrl);
  }
  const set = new Set();
  for (const [hit] of text.matchAll(IMG_RE)) {
    const m = resolve(`${ORIGIN}/${hit}`);
    if (!m) unknown.add(hit);
    else if (!EXCLUDE.has(rel(m))) set.add(rel(m));
  }
  usage[name] = [...set].sort();
  console.log(`  ${name}: ${set.size} images`);
}
if (unknown.size) console.warn('Not in media catalog (skipped):', [...unknown]);
for (const r of EXCLUDE) await rm(path.join(OUT, r), { force: true });

// 3. Download originals
const files = {};
for (const m of catalog) {
  const r = rel(m);
  if (!Object.values(usage).some((list) => list.includes(r))) continue;
  files[r] = {
    src: r, // path inside src/assets/wp, pass to wp() / <Photo src>

    width: m.media_details?.width ?? null,
    height: m.media_details?.height ?? null,
    alt: decode(m.alt_text ?? ''),
    title: decode(m.title?.rendered ?? ''),
    wpId: m.id,
  };
}
let fetched = 0;
let failed = 0;
for (const r of Object.keys(files)) {
  const dest = path.join(OUT, r);
  if (existsSync(dest)) continue;
  try {
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, await get(UPLOADS + r, 'buffer'));
    fetched++;
  } catch (err) {
    failed++;
    console.warn('FAIL', r, err.message);
  }
}
console.log(`Images: ${Object.keys(files).length} used, ${fetched} downloaded now, ${failed} failed`);

await writeFile('src/data/media.json', JSON.stringify({ pages: usage, files }, null, 2) + '\n');

// 4. Gallery: Happy Addons Image Grid, categories from the filter buttons
const filters = Object.fromEntries(
  [...galleryHtml.matchAll(/data-filter="\.(__fltr-\d+)"[^>]*>([^<]+)</g)].map(([, cls, label]) => [cls, decode(label).toLowerCase()]),
);
// Alt texts are written by hand in gallery.json; keep them when the script is re-run
const oldAlts = new Map();
if (existsSync('src/data/gallery.json')) {
  for (const g of JSON.parse(await readFile('src/data/gallery.json', 'utf8'))) oldAlts.set(g.src, g.alt);
}
const gallery = [];
const count = {};
for (const [tag] of galleryHtml.matchAll(/<a\b[^>]*ha-image-grid__item[^>]*>/g)) {
  const href = tag.match(/data-mfp-src="([^"]+)"/)?.[1] ?? tag.match(/href="(http[^"]+)"/)?.[1];
  const m = href && resolve(decode(href));
  if (!m) {
    console.warn('Gallery item not resolved:', href);
    continue;
  }
  if (EXCLUDE.has(rel(m))) continue;
  const category = filters[tag.match(/__fltr-\d+/)?.[0]] ?? '';
  count[category] = (count[category] ?? 0) + 1;
  const f = files[rel(m)];
  gallery.push({
    src: f.src,
    alt: oldAlts.get(f.src) || f.alt || `Completed ${category || 'renovation'} project ${count[category]}`,
    category,
  });
}
if (gallery.length) {
  await writeFile('src/data/gallery.json', JSON.stringify(gallery, null, 2) + '\n');
  console.log(`gallery.json: ${gallery.length} images`, count);
} else {
  console.warn('Gallery: no items found, gallery.json left unchanged');
}

// 5. Favicon is served as-is from public/
await copyFile(path.join(OUT, '2022/08/favicon-1.png'), 'public/favicon.png');
