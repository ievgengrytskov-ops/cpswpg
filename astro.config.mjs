import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// trailingSlash + directory format keep the same URLs as the old WordPress site
// (/about/, /porcelain-tiles/ ...), so search rankings are not lost.
export default defineConfig({
  site: 'https://cpswpg.ca',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
