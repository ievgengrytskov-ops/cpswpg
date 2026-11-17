import type { MarkdownInstance } from 'astro';

// Guides (articles): one Markdown file per guide in src/content/guides, URL /guides/<file name>/.
// Loaded with a relative import.meta.glob on purpose: Astro content collections lose all CSS in
// the build on Windows when the project is opened as 'c:\cpswpg' (lower-case drive letter).
export type GuideData = {
  title: string;
  /** <title> tag; defaults to title */
  seoTitle?: string;
  /** Meta description, up to 160 characters */
  description: string;
  /** Short intro under the h1 */
  lead: string;
  date: Date;
  updated?: Date;
  /** Cover image: path for wp(), e.g. 'cps/38.jpg' */
  image: string;
  imageAlt: string;
  /** Related service page for the box next to the text */
  related: string;
  order: number;
};

const mods = import.meta.glob<MarkdownInstance<Record<string, unknown>>>('../content/guides/*.md', { eager: true });

const required = ['title', 'description', 'lead', 'date', 'image', 'imageAlt', 'related'] as const;

export const guides = Object.entries(mods)
  .map(([file, mod]) => {
    const id = file.split('/').pop()!.replace(/\.md$/, '');
    const fm = mod.frontmatter;
    for (const k of required) if (fm[k] === undefined || fm[k] === '') throw new Error(`Guide ${id}: missing "${k}" in frontmatter`);
    if (String(fm.description).length > 160) throw new Error(`Guide ${id}: description is longer than 160 characters`);
    const data: GuideData = {
      title: String(fm.title),
      seoTitle: fm.seoTitle ? String(fm.seoTitle) : undefined,
      description: String(fm.description),
      lead: String(fm.lead),
      date: new Date(fm.date as string),
      updated: fm.updated ? new Date(fm.updated as string) : undefined,
      image: String(fm.image),
      imageAlt: String(fm.imageAlt),
      related: String(fm.related),
      order: Number(fm.order ?? 99),
    };
    return { id, data, Content: mod.Content, words: mod.rawContent().split(/\s+/).filter(Boolean).length };
  })
  .sort((a, b) => a.data.order - b.data.order);

export type Guide = (typeof guides)[number];
