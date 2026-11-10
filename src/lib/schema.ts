import { site } from '@/config/site';

export function personSchema(origin: URL, image?: string) {
  return {
    ...(image ? { image } : {}),
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': new URL('/#person', origin).href,
    name: site.name,
    jobTitle: [site.title, site.secondaryTitle],
    url: origin.href,
    email: `mailto:${site.contact.email}`,
    sameAs: [site.contact.linkedin, site.contact.contra],
    address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Bahria University' },
    knowsAbout: ['Shopify', 'Liquid', 'Astro', 'E-commerce', 'UX design', 'UI design', 'GA4', 'Google Tag Manager', 'Conversion rate optimisation'],
  };
}

export function serviceSchema(origin: URL, services: { title: string; summary: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': new URL('/#service', origin).href,
    name: `${site.name}, Shopify and E-Commerce Consulting`,
    url: origin.href,
    email: site.contact.email,
    founder: { '@id': new URL('/#person', origin).href },
    address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
    areaServed: ['United States', 'United Kingdom', 'Australia', 'New Zealand', 'Europe'],
    priceRange: 'Request a quote',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.summary },
      })),
    },
  };
}

export function caseStudySchema(origin: URL, url: string, p: { title: string; client: string; summary: string; started?: string; tools: string[] }, image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${p.client}: ${p.title}`,
    headline: p.title,
    description: p.summary,
    url,
    ...(image ? { image } : {}),
    ...(p.started ? { dateCreated: p.started } : {}),
    creator: { '@id': new URL('/#person', origin).href },
    about: p.client,
    keywords: p.tools.join(', '),
  };
}
