import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getFeaturedProjects } from '@/lib/content';

type Card = { eyebrow: string; title: string; footer: string };

const base: Record<string, Card> = {
  home: { eyebrow: 'Shopify Expert and E-Commerce Consultant', title: 'Shopify storefronts that load fast, convert, and are easy for teams to run.', footer: 'Senior UX/UI Designer' },
  about: { eyebrow: 'About', title: 'A Shopify specialist who started as a designer.', footer: '5+ years on Shopify' },
  work: { eyebrow: 'Work', title: 'Shopify storefronts, Astro websites and the data behind them.', footer: 'Shopify and Astro' },
  'case-studies': { eyebrow: 'Case studies', title: 'The details behind each project.', footer: 'Role, scope, tools, outcome' },
  services: { eyebrow: 'Services', title: 'Store builds, store management, tracking and CRO.', footer: 'Request a quote' },
  contact: { eyebrow: 'Contact', title: 'Tell me about your store.', footer: 'Open to remote contracts' },
  resume: { eyebrow: 'Resume', title: 'Experience, skills and education.', footer: 'PDF download available' },
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getFeaturedProjects();
  const cards: Record<string, Card> = { ...base };
  for (const p of projects) {
    cards[`work-${p.id}`] = { eyebrow: `Case study, ${p.data.client}`, title: p.data.title, footer: [p.data.platform, p.data.theme && !p.data.theme.startsWith('TODO') ? `${p.data.theme} theme` : ''].filter(Boolean).join(', ') };
  }
  return Object.entries(cards).map(([slug, card]) => ({ params: { slug }, props: { card } }));
};

const fontsDir = 'node_modules/@fontsource';
const fontsPromise = Promise.all([
  readFile(`${fontsDir}/newsreader/files/newsreader-latin-500-normal.woff`),
  readFile(`${fontsDir}/inter/files/inter-latin-600-normal.woff`),
]);

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { card } = props as { card: Card };
  const [serif, sans] = await fontsPromise;
  const svg = await satori(
    h('div', { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FBFAF7', padding: '72px 80px', fontFamily: 'Inter', color: '#14161A', borderTop: '16px solid #1A56DB' }, [
      h('div', { display: 'flex', fontSize: 26, letterSpacing: 3, textTransform: 'uppercase', color: '#5C626B', fontWeight: 600 }, card.eyebrow),
      h('div', { display: 'flex', fontFamily: 'Newsreader', fontSize: card.title.length > 60 ? 64 : 78, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }, card.title),
      h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #14161A', paddingTop: 28, fontSize: 28, fontWeight: 600 }, [
        h('div', { display: 'flex', fontFamily: 'Newsreader', fontSize: 40 }, 'Ahmad Saeed'),
        h('div', { display: 'flex', color: '#1A56DB' }, card.footer),
      ]),
    ]) as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Newsreader', data: serif, weight: 500, style: 'normal' },
        { name: 'Inter', data: sans, weight: 600, style: 'normal' },
      ],
    },
  );
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
