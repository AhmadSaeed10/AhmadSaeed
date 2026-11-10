---
title: From WordPress to Astro for speed and SEO
client: SigmaPrinto
summary: A printing company website moved from WordPress to Astro for speed and SEO, taken from logo to live site with Claude Code as the build partner.
featured: true
category: web
order: 21
role: Logo, brand, design and Astro build
timeline: Launched Oct 2026
started: 2026-10
platform: Astro
scope: WordPress to Astro rebuild, logo to live site, analytics setup
url: https://sigmaprinto.com
writeup:
  label: Build notes on Contra
  url: https://contra.com/community/QwaMeSDn-astro-website-builds-with-claude-code
overview: SigmaPrinto is a printing business. I rebuilt its website in Astro, taking it from logo to live site with Claude Code as my build partner.
challenge: The previous site ran on WordPress. The move to Astro was made for two reasons, speed and SEO.
approach:
  - title: Brand and layout first
    text: Designed the logo, brand and page layouts before the build, so the new site starts from a settled design.
  - title: Rebuilt in Astro
    text: Astro ships almost no JavaScript by default, so pages stay light and load fast, which is what the move from WordPress was for.
  - title: Claude Code as build partner
    text: Claude Code writes and edits the site, from new sections to copy changes and layout tweaks.
  - title: GitHub and Vercel
    text: Every change goes to GitHub and Vercel deploys each push automatically, so updates go live in minutes.
  - title: Content in simple files
    text: Page content lives in simple files, so updating a service or page is a request, not a rebuild.
  - title: Search and analytics
    text: Set up GA4 with custom events and Google Search Console, so content decisions come from what people search, read and where they drop off.
outcome: "Live at sigmaprinto.com. TODO: add results, for example PageSpeed scores before and after the move from WordPress, or search impressions."
tools: [Astro, Claude Code, GitHub, Vercel, GA4, Google Search Console]
cover: ../../assets/projects/sigmaprinto.webp
coverAlt: "SigmaPrinto website mockup: dark navy desktop homepage with the headline Printing that matches the proof, a print proof illustration and a client logo row, alongside mobile screens for brand printing, print formats, services and core values."
gallery:
  - src: ../../assets/screens/sigmaprinto-desktop.webp
    alt: "SigmaPrinto homepage on desktop with the Printing that matches the proof headline, a print proof illustration and client logos"
    caption: "Homepage hero and client logos"
    device: desktop
  - src: ../../assets/screens/sigmaprinto-mobile.webp
    alt: "SigmaPrinto brand printing section on mobile with uniforms and branded apparel"
    caption: "Brand printing section on mobile"
    device: mobile
---
