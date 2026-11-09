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
| `npm run placeholders` | Regenerate the labelled placeholder images |
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

### Feature flags (`src/config/site.ts`)

| Flag | Default | Effect |
|---|---|---|
| `availability.show` / `availability.label` | `true` / "Open to remote contracts" | Hero and contact page badge |
| `anonymiseClients` | `true` | Replaces WPP Media client names with sector labels. Names are never written into the HTML while this is on. |
| `showPhone` | `false` | Renders `CONTACT_PHONE` in the footer, contact page and resume |

## How to add a case study

1. Create `src/content/projects/<slug>.md`. The file name becomes the URL: `/work/<slug>`.
2. Copy the frontmatter from `wewear.md` and set `featured: true` and an `order`.
3. Put screenshots in `src/assets/` (PNG or JPG, ideally 1600 x 1000 or larger) and reference them with relative paths in `cover` and `gallery`. Astro generates AVIF and WebP sizes automatically.
4. Any field that starts with `TODO` renders as a visible dashed placeholder, so gaps are obvious before launch.
5. Add `results` as `{ value, label }` pairs when you have numbers you can share.
6. Run `npm run check` to validate the schema.

For a smaller project, leave `featured` out: it appears in the "More client work" list without its own page.

### Replacing placeholder images

Placeholders live in `src/assets/placeholders/`. Either overwrite a file with the real screenshot using the same name, or add new files and update the paths in the project's frontmatter. Update `coverAlt` and gallery `alt` text to describe the real screenshot.

## How to update the CV

`public/Ahmad_Saeed_CV.pdf` is what the "Download PDF" button serves.

- **Recommended:** replace it with your designed CV, keeping the same file name.
- **Or generate it from the site:** the `/resume` page has print styles. Run `npm run build && npm run preview`, then in another terminal run `npm i -D playwright && npx playwright install chromium && npm run cv`. You can also open `/resume` in Chrome and use Print, Save as PDF.

## Analytics

GTM loads after the page is idle, so it never blocks rendering. Events are pushed to `window.dataLayer`:

| Event | When | Parameters |
|---|---|---|
| `cta_click` | Any primary or secondary CTA | `label`, `link_url`, `page_path` |
| `contact_form_submit` | Successful form submission | `form_id`, `topic`, `page_path` |
| `cv_download` | "Download PDF" on `/resume` | `label`, `link_url` |
| `linkedin_click` | Any LinkedIn link | `label`, `link_url` |
| `outbound_click` | "Visit site" links | `label`, `link_url` |
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
