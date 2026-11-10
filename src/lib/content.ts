import { getCollection, getEntry } from 'astro:content';
import { site } from '@/config/site';

export async function getPage(id: string) {
  const entry = await getEntry('pages', id);
  if (!entry) throw new Error(`Missing page content: src/content/pages/${id}.md`);
  return entry;
}

/** All projects with a case study page, optionally filtered by category. */
export async function getFeaturedProjects(category?: 'shopify' | 'web') {
  const all = await getCollection('projects', ({ data }) => data.featured && (!category || data.category === category));
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getMoreWork() {
  const all = await getCollection('projects', ({ data }) => !data.featured);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getServices(kind?: 'core' | 'secondary') {
  const all = await getCollection('services', ({ data }) => !kind || data.kind === kind);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getExperience() {
  // Order follows the numeric file prefix (01-, 02-...), newest first, as on the CV.
  return (await getCollection('experience')).sort((a, b) => a.id.localeCompare(b.id));
}

export async function getSkills() {
  return (await getCollection('skills')).sort((a, b) => a.data.order - b.data.order);
}

export async function getTestimonials() {
  return (await getCollection('testimonials')).sort((a, b) => a.data.order - b.data.order);
}

/** Tracking work with client names resolved according to site.anonymiseClients. */
export async function getTrackingWork() {
  const all = (await getCollection('tracking')).sort((a, b) => a.data.order - b.data.order);
  const resolve = (d: (typeof all)[number]['data']) => ({
    kind: d.kind,
    who: !site.anonymiseClients && d.name ? d.name : d.label,
    work: d.work,
  });
  return {
    clients: all.filter((e) => e.data.kind !== 'pitch').map((e) => resolve(e.data)),
    pitches: all.filter((e) => e.data.kind === 'pitch').map((e) => resolve(e.data)),
  };
}

export async function getAppearances() {
  return (await getCollection('appearances')).sort((a, b) => b.data.date.localeCompare(a.data.date));
}
