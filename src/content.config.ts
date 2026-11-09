import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const yearMonth = z.string().regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM');

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    companyNote: z.string().optional(),
    location: z.string(),
    mode: z.enum(['On-site', 'Hybrid', 'Remote']),
    start: yearMonth,
    end: z.union([yearMonth, z.literal('present')]),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    datesToConfirm: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      summary: z.string(),
      /** featured projects get a full case study page; others appear in "More client work". */
      featured: z.boolean().default(false),
      order: z.number().default(99),
      role: z.string(),
      timeline: z.string(),
      started: yearMonth.optional(),
      platform: z.string().default('Shopify'),
      theme: z.string().optional(),
      scope: z.string(),
      url: z.url().optional(),
      overview: z.string().optional(),
      challenge: z.string().optional(),
      approach: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      outcome: z.string().optional(),
      results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      tools: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
    }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    kind: z.enum(['core', 'secondary']),
    order: z.number(),
    summary: z.string(),
    deliverables: z.array(z.string()).default([]),
    forWho: z.string().optional(),
    cta: z.string().default('Request a quote'),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    relationship: z.string(),
    date: yearMonth,
    quote: z.string(),
    order: z.number(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/skills' }),
  schema: z.object({
    group: z.string(),
    order: z.number(),
    items: z.array(z.string()),
    note: z.string().optional(),
  }),
});

const tracking = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tracking' }),
  schema: z.object({
    kind: z.enum(['client', 'pitch', 'capability']),
    order: z.number(),
    /** Real client name. Only rendered when site.anonymiseClients is false. */
    name: z.string().optional(),
    /** Anonymised label used by default. */
    label: z.string(),
    work: z.string(),
  }),
});

/** Long-form page copy (hero, about, services intro, contact). */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      seoTitle: z.string(),
      seoDescription: z.string().max(170),
      eyebrow: z.string().optional(),
      heading: z.string(),
      lede: z.string().optional(),
      proof: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
      principles: z
        .array(z.object({ title: z.string(), heuristic: z.string(), text: z.string() }))
        .optional(),
      education: z
        .object({ degree: z.string(), school: z.string(), location: z.string(), dates: z.string() })
        .optional(),
      photo: image().optional(),
      photoAlt: z.string().optional(),
      hint: z.array(z.string()).optional(),
      /** Section labels and headings for the home page, keyed by section id. */
      sections: z
        .record(z.string(), z.object({ label: z.string(), heading: z.string(), intro: z.string().optional() }))
        .optional(),
    }),
});

export const collections = { experience, projects, services, testimonials, skills, tracking, pages };
