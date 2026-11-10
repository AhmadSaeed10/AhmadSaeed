import icons from '@iconify-json/simple-icons/icons.json';

/**
 * Brand logos for skill chips, from the Simple Icons set (CC0) via Iconify.
 * Key: the exact skill text in src/content/skills/*.json.
 * hex: brand colour shown on hover; null keeps the text colour (for black logos that vanish in dark mode).
 * Klaviyo is not in any open icon set, so it shows as text only.
 */
const map: Record<string, { slug: string; hex: string | null }[]> = {
  Shopify: [{ slug: 'shopify', hex: '#7AB55C' }],
  Astro: [{ slug: 'astro', hex: '#BC52EE' }],
  HTML5: [{ slug: 'html5', hex: '#E34F26' }],
  CSS3: [{ slug: 'css3', hex: '#1572B6' }],
  'JavaScript / jQuery': [{ slug: 'javascript', hex: '#E5C800' }, { slug: 'jquery', hex: '#0769AD' }],
  Bootstrap: [{ slug: 'bootstrap', hex: '#7952B3' }],
  WordPress: [{ slug: 'wordpress', hex: '#21759B' }],
  Elementor: [{ slug: 'elementor', hex: '#D63362' }],
  'Hostinger e-commerce': [{ slug: 'hostinger', hex: '#673DE6' }],
  Figma: [{ slug: 'figma', hex: '#F24E1E' }],
  'Adobe XD': [{ slug: 'adobexd', hex: '#FF61F6' }],
  Canva: [{ slug: 'canva', hex: '#00C4CC' }],
  GA4: [{ slug: 'googleanalytics', hex: '#E37400' }],
  'Google Tag Manager': [{ slug: 'googletagmanager', hex: '#246FDB' }],
  'Google Search Console': [{ slug: 'googlesearchconsole', hex: '#458CF5' }],
  'Meta Pixel': [{ slug: 'meta', hex: '#0467DF' }],
  'Google Ads conversion tracking': [{ slug: 'googleads', hex: '#4285F4' }],
  Hotjar: [{ slug: 'hotjar', hex: '#FF3C00' }],
  'Google PageSpeed Insights': [{ slug: 'pagespeedinsights', hex: '#4285F4' }],
  Mailchimp: [{ slug: 'mailchimp', hex: '#D4A700' }],
  'AI-assisted development with Claude Code': [{ slug: 'claude', hex: '#D97757' }],
  'GitHub and Vercel deployment workflow': [{ slug: 'github', hex: null }, { slug: 'vercel', hex: null }],
};

type IconData = { body: string; width?: number; height?: number };
const set = icons as unknown as { icons: Record<string, IconData>; width?: number; height?: number };

export function brandIconsFor(skill: string) {
  return (map[skill] ?? [])
    .map(({ slug, hex }) => {
      const icon = set.icons[slug];
      if (!icon) return null;
      return { slug, hex, body: icon.body, width: icon.width ?? set.width ?? 24, height: icon.height ?? set.height ?? 24 };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}
