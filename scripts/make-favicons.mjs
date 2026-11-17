// Builds favicons from the gold emblem (src/assets/brand/emblem.png, 600x600).
// - small sizes (16/32/48, favicon.ico + favicon.png): only the centre of the emblem, the C·P·S
//   tiles and the tub inside the inner gold ring (the ring text is unreadable at 16–32 px)
// - large sizes (apple-touch-icon 180, icon-192, icon-512): the whole emblem on the dark background
// Usage: node scripts/make-favicons.mjs
import fs from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'src/assets/brand/emblem.png';
const OUT = 'public';
const BG = '#151413';
const GOLD = '#c9a46a';

// Inner part of the emblem: a square around the inner ring (centre 300,300).
const C = 300, R = 172;
const inner = await sharp(SRC).extract({ left: C - R, top: C - R, width: R * 2, height: R * 2 }).toBuffer();

async function smallIcon(size) {
  const ring = Math.max(1, Math.round(size / 16)); // gold border width
  const r = size / 2;
  const disc = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r - ring / 2}" fill="${BG}" stroke="${GOLD}" stroke-width="${ring}"/></svg>`);
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r - ring}" fill="#fff"/></svg>`);
  // a slightly larger crop than the ring so the tiles fill the icon
  // tiny sizes: lift the dark tiles off the dark background and sharpen so C·P·S stays visible
  let img = sharp(inner).resize(size, size, { kernel: "lanczos3" });
  if (size <= 32) img = img.modulate({ brightness: 1.45, saturation: 1.15 }).sharpen({ sigma: 0.6 });
  const resized = await img.png().toBuffer();
  const art = await sharp(resized).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  return sharp(disc).composite([{ input: art }]).png().toBuffer();
}

async function bigIcon(size, pad) {
  const inside = Math.round(size * (1 - pad * 2));
  const art = await sharp(SRC).resize(inside, inside).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: art, gravity: 'center' }]).png({ palette: true, quality: 92, effort: 10 }).toBuffer();
}

// ICO with embedded PNGs (supported by all current browsers)
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, buf }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, e); header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt8(0, e + 2); header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(buf.length, e + 8); header.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, ...images.map((x) => x.buf)]);
}

const small = await Promise.all([16, 32, 48].map(async (size) => ({ size, buf: await smallIcon(size) })));
await fs.writeFile(`${OUT}/favicon.ico`, ico(small));
await fs.writeFile(`${OUT}/favicon.png`, await smallIcon(96)); // modern browsers pick this (sizes="96x96")
await fs.writeFile(`${OUT}/apple-touch-icon.png`, await bigIcon(180, 0.04));
await fs.writeFile(`${OUT}/icon-192.png`, await bigIcon(192, 0.04));
await fs.writeFile(`${OUT}/icon-512.png`, await bigIcon(512, 0.04));
await fs.writeFile(`${OUT}/site.webmanifest`, JSON.stringify({
  name: 'Canadian Prime Solutions',
  short_name: 'CPS Winnipeg',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
  theme_color: BG,
  background_color: BG,
  display: 'browser',
}, null, 2) + '\n');
console.log('favicons written to public/');
