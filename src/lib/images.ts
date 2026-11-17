import type { ImageMetadata } from 'astro';

// Two image sources:
//   '2022/12/5.jpg'  -> src/assets/wp/...  downloaded from the old WordPress site (npm run assets)
//   'cps/16.jpg'     -> src/assets/cps/... new photos from the owner (scripts/import-photos.mjs)
// The globs are relative on purpose: an absolute '/src/...' glob breaks the build on Windows
// when the project is opened as 'c:\cpswpg' (lower-case drive letter).
const all = {
  ...import.meta.glob<{ default: ImageMetadata }>('../assets/wp/**/*.{jpg,jpeg,png,webp,gif}', { eager: true }),
  ...import.meta.glob<{ default: ImageMetadata }>('../assets/cps/**/*.{jpg,jpeg,png,webp}', { eager: true }),
};

/** Image metadata for 'YYYY/MM/name' (old site) or 'cps/name' (new photos). Fails the build on a typo. */
export function wp(path: string): ImageMetadata {
  const key = path.startsWith('cps/') ? `../assets/${path}` : `../assets/wp/${path}`;
  const mod = all[key];
  if (!mod) throw new Error(`Image not found: ${path} (looked for src/assets/${key.slice(10)})`);
  return mod.default;
}
