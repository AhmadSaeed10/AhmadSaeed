# Ahmad Saeed, portfolio

Personal portfolio for Ahmad Saeed, Shopify Expert and E-Commerce Consultant, Senior UX/UI Designer.
Built with Astro (static output), TypeScript and plain CSS with design tokens. No UI framework, no animation library.

## Quick start

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Type-check Astro, TS and content schemas |
| `npm run screens` | Re-crop the case study gallery screens from the mockups |
| `npm run speed -- <dir>` | Turn Lighthouse reports into speed test screens and data (see below) |
| `npm run cv` | Print `/resume` to `public/Ahmad_Saeed_CV.pdf` (see below) |

## Environment variables

Set these in `.env` locally and in **Vercel, Project Settings, Environment Variables** for production.

| Variable | Required | Purpose |
|---|---|---|
| `SITE_URL` | Yes | Production URL, for canonical links, sitemap and OG images. Defaults to `https://ahmadsaeed.com`. |
| `PUBLIC_GTM_ID` | No | Google Tag Manager container ID (`GTM-XXXXXXX`). GTM only loads when this is a real ID. |
| `PUBLIC_FORM_PROVIDER` | No | `web3forms` (default) or `formspree`. |
| `PUBLIC_FORM_KEY` | Yes, for the form | Web3Forms access key, or the Formspree form ID (the part after `/f/`). Without it the form shows a "not connected" message and points to email. |
| `CONTACT_PHONE` | No | Only rendered when `showPhone` is `true` in `src/config/site.ts`. Kept out of the repo on purpose. |

## Where things live

```
src/
  config/site.ts        Identity, contact details and feature flags
  content.config.ts     Typed schemas for every collection
  content/
    pages/              Hero, about, services intro, contact and resume copy (Markdown)
    projects/           Case studies (featured: true) and "More client work" entries
    services/           Core and secondary services
    experience/         Timeline entries, one file per role
    skills/             Grouped skills (JSON)
    testimonials/       Verbatim testimonials (JSON)
    tracking/           Tracking and analytics work, with real names and anonymised labels
  styles/tokens.css     Design tokens: colour, type, spacing, motion (light and dark)
  components/           Astro components, scoped CSS
  pages/                Routes, plus og/[slug].png.ts (OG images) and robots.txt.ts
public/                 Favicon and the CV PDF
scripts/                Placeholder and CV PDF generators
```

### Pages

| Route | What it shows |
|---|---|
| `/` | Home: hero, selected work, Astro builds, services, tracking, skills, experience, testimonials, appearances, contact |
| `/work` | Every project: Shopify case studies, Astro websites, more client work and tracking work, with summary counts |
| `/case-studies` | Every full case study in detail: role, timeline, platform, theme, scope, tools, challenge, what I did, outcome |
| `/work/[slug]` | A single case study with screenshots |
| `/services`, `/about`, `/contact`, `/resume`, `/404` | As named |

New projects appear on `/work` and `/case-studies` automatically. Copy for both pages lives in `src/content/pages/work.md` and `case-studies.md`.

### Feature flags (`src/config/site.ts`)

| Flag | Default | Effect |
|---|---|---|
| `availability.show` / `availability.label` | `true` / "Open to remote contracts" | Hero and contact page badge |
| `anonymiseClients` | `true` | Replaces WPP Media client names with sector labels. Names are never written into the HTML while this is on. |
| `showPhone` | `false` | Renders `CONTACT_PHONE` in the footer, contact page and resume |

## How to add a case study

1. Create `src/content/projects/<slug>.md`. The file name becomes the URL: `/work/<slug>`.
2. Copy the frontmatter from `wewear.md` and set `featured: true` and an `order`. With an odd number of case studies, the first one is shown full width on the home page.
3. Put the cover in `src/assets/projects/` (3:2, WebP, PNG or JPG, 1536 x 1024 or larger) and screenshots in `src/assets/` and reference them with relative paths in `cover` and `gallery`. Astro generates AVIF and WebP sizes automatically.
4. Any field that starts with `TODO` renders as a visible dashed placeholder, so gaps are obvious before launch.
5. Add `results` as `{ value, label }` pairs when you have numbers you can share.
6. Run `npm run check` to validate the schema.

Set `category: web` for a non-Shopify website (for example an Astro build). It then appears in the "Built with Astro" section on the home page instead of Selected work, and can link a write-up with `writeup: { label, url }`. The numbered "How I build them" steps come from `workflow` in `src/content/pages/home.md`.

For a smaller project, leave `featured` out: it appears in the "More client work" list without its own page.

### Images

Case study covers live in `src/assets/projects/` (3:2 mockups, 1536 x 1024 or larger). The site generates AVIF and WebP sizes from them at build time.

Gallery screens in `src/assets/screens/` are cropped from the mockups by `scripts/crop-screens.mjs` (one desktop and one phone screen per project, laid out by the gallery's `device` field). They are limited to the mockup's resolution, so swap in full-size screenshots under the same file names when you have them.

## How to update the CV

`public/Ahmad_Saeed_CV.pdf` is what the "Download PDF" button serves.

- **Recommended:** replace it with your designed CV, keeping the same file name.
- **Or generate it from the site:** the `/resume` page has print styles. Run `npm run build && npm run preview`, then in another terminal run `npm i -D playwright && npx playwright install chromium && npm run cv`. You can also open `/resume` in Chrome and use Print, Save as PDF.

## Motion

`src/components/Motion.astro` is a small inline script that runs on every page:

- **Section reveal:** blocks inside each section fade and rise in as they enter the viewport, staggered within grids and lists.
- **Line reveal:** 1px divider rules draw from left to right when they reach the middle of the screen.
- Anything already on screen at load shows immediately, so first paint is never delayed.
- It is switched off for `prefers-reduced-motion`, and without JavaScript nothing is hidden.
- To reveal a new grid item by item, add its selector to `GROUPS` in the script.

## Skill logos

Skill chips show brand logos from Simple Icons (CC0, via `@iconify-json/simple-icons`). The mapping from skill text to logo is in `src/lib/brandIcons.ts`. Logos are monochrome and switch to the brand colour on hover. Klaviyo is not in any open icon set, so it shows as text.

## Speed tests

Every live site has a Lighthouse result (mobile and desktop are stored; which ones show is set per platform by `speedModes` in `src/config/site.ts`, currently desktop only for Shopify stores), shown on its case study page, in compact form on `/case-studies`, and for all sites on `/work`. Data lives in `src/content/speed/<project-id>.json`, and screenshots in `src/assets/speed/`.

To refresh them (for example after optimising a store), run Lighthouse for each site with both outputs, then convert:

```bash
npx lighthouse https://example.com --output=json --output=html --output-path=reports/<project-id>-mobile
npx lighthouse https://example.com --preset=desktop --output=json --output=html --output-path=reports/<project-id>-desktop
npm i -D playwright && npx playwright install chromium
npm run speed -- reports
```

Lab scores vary between runs, so for a fair picture run each site two or three times and keep a typical result.

## Analytics

GTM loads after the page is idle, so it never blocks rendering. Events are pushed to `window.dataLayer`:

| Event | When | Parameters |
|---|---|---|
| `cta_click` | Any primary or secondary CTA | `label`, `link_url`, `page_path` |
| `contact_form_submit` | Successful form submission | `form_id`, `topic`, `page_path` |
| `cv_download` | "Download PDF" on `/resume` | `label`, `link_url` |
| `linkedin_click` | Any LinkedIn link | `label`, `link_url` |
| `contra_click` | Any Contra profile link | `label`, `link_url` |
| `outbound_click` | "Visit site" links and the Contra build post | `label`, `link_url` |
| `case_study_view` | Case study page load | `case_study`, `page_path` |

In GTM, create a **Custom Event** trigger for each event name and a GA4 Event tag that forwards the parameters as data layer variables. To track a new element, add `data-track="event_name"` and optionally `data-track-label="..."` to it.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New Project** and import the repository. The Astro preset is detected automatically (build `npm run build`, output `dist`).
3. Add the environment variables above.
4. Deploy, then add your custom domain under **Project Settings, Domains** and make sure `SITE_URL` matches it.

`vercel.json` sets long-term caching for hashed assets and basic security headers.

## Quality targets

Lighthouse 95+ on mobile in all four categories, WCAG 2.2 AA, no layout shift. Run Lighthouse against `npm run preview` after content changes, especially after adding large images.
