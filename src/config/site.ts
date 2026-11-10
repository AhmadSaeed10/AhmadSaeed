/**
 * Site-wide settings and feature flags.
 * Page copy lives in src/content. This file holds identity, contact details and switches.
 */
export const site = {
  name: 'Ahmad Saeed',
  title: 'Shopify Expert and E-Commerce Consultant',
  secondaryTitle: 'Senior UX/UI Designer',
  locale: 'en_GB',

  /** Availability badge shown in the hero and on the contact page. Set show to false to hide it. */
  availability: {
    show: true,
    label: 'Open to remote contracts',
  },

  /**
   * When true, WPP Media client names in the tracking section are replaced by sector labels.
   * Keep true until you have confirmed you can name these clients publicly.
   */
  anonymiseClients: true,

  /** When false, the phone number is never written into page HTML. Value comes from CONTACT_PHONE. */
  showPhone: false,

  /** Pricing mode for services. Only "quote" is implemented, as agreed. */
  pricing: 'quote' as const,

  contact: {
    email: 'ahmadchamp1997@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ahmadsaeed10',
    linkedinLabel: 'linkedin.com/in/ahmadsaeed10',
    contra: 'https://contra.com/ahmad_saeed_wq41r3sc',
    contraLabel: 'contra.com/ahmad_saeed_wq41r3sc',
    location: 'Lahore, Pakistan',
    timezone: 'PKT, UTC+5',
    overlap: 'Overlap available with European and Oceania working hours',
  },

  /**
   * Which Lighthouse runs to show per platform (data for both is kept in src/content/speed).
   * Shopify stores show desktop only; add 'mobile' back to show mobile scores again.
   */
  speedModes: {
    Shopify: ['desktop'],
    default: ['mobile', 'desktop'],
  } as Record<string, ('mobile' | 'desktop')[]>,

  cvFile: '/Ahmad_Saeed_CV.pdf',

  nav: [
    { label: 'Work', href: '/work' },
    { label: 'Case studies', href: '/case-studies' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Resume', href: '/resume' },
  ],
  primaryCta: { label: 'Work with me', href: '/contact' },
};

export const phone = site.showPhone ? (import.meta.env.CONTACT_PHONE as string | undefined) || '' : '';

const gtm = (import.meta.env.PUBLIC_GTM_ID as string | undefined) || '';
export const gtmId = /^GTM-[A-Z0-9]+$/.test(gtm) && gtm !== 'GTM-XXXXXXX' ? gtm : '';

export const form = {
  provider: ((import.meta.env.PUBLIC_FORM_PROVIDER as string | undefined) || 'web3forms') as 'web3forms' | 'formspree',
  key: (import.meta.env.PUBLIC_FORM_KEY as string | undefined) || '',
};
