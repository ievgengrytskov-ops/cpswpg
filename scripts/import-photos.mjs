// Copies new photos from the owner into src/assets/cps, ready for astro:assets.
// - applies EXIF rotation, then strips ALL metadata (phone photos can contain GPS location;
//   Astro also publishes the original file, so metadata would leak to the public site)
// - limits the long side to 2000 px, JPEG quality 85
// Usage: node scripts/import-photos.mjs "<input folder>" name1 name2 ...   (names without .jpg)
//        crop:  name@left,top,width,height   e.g. 30@0,195,738,1235
//        rename: name>newname               e.g. 3>showroom-1 (crop goes first: 3@0,0,100,100>x)
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [dir, ...names] = process.argv.slice(2);
if (!dir || !names.length) {
  console.error('Usage: node scripts/import-photos.mjs "<folder>" 1 2 30@0,195,738,1235');
  process.exit(1);
}
const OUT = 'src/assets/cps';
await mkdir(OUT, { recursive: true });
for (const spec of names) {
  const [src, outName] = spec.split(">");
  const [name, crop] = src.split("@");
  let img = sharp(path.join(dir, `${name}.jpg`)).rotate();
  if (crop) {
    const [left, top, width, height] = crop.split(',').map(Number);
    img = img.extract({ left, top, width, height });
  }
  const out = path.join(OUT, `${outName || name}.jpg`);
  const info = await img
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(out); // sharp drops metadata unless .withMetadata() is called
  console.log(out, `${info.width}x${info.height}`);
}
