# TODO: content to supply or confirm

Everything below is visible on the site as a dashed placeholder or flagged in a source comment.

## Before launch (blocking)

- [ ] **Domain**: set `SITE_URL` in Vercel. Currently defaults to `https://ahmadsaeed.com`.
- [ ] **Contact form**: create a Web3Forms (or Formspree) key and set `PUBLIC_FORM_KEY`. Until then the form tells visitors to email you.
- [ ] **GTM**: set `PUBLIC_GTM_ID` and set up the custom event triggers listed in the README.
- [x] **Professional photo**: `src/assets/about/ahmad-saeed.webp`. To change it, overwrite that file (square works best) and update `photoAlt` in `src/content/pages/about.md`.
- [ ] **CV PDF**: `public/Ahmad_Saeed_CV.pdf` is currently printed from `/resume`. Replace it with your designed CV if you have one.

## Case studies

For each of WeWear, Hushpuppies, OneDegree, Eirene Studio and CookieDrama (`src/content/projects/*.md`):

- [x] Cover mockups (`src/assets/projects/*.webp`), with alt text
- [x] Gallery screens cropped from the mockups (`src/assets/screens/`); swap in full-size screenshots when you have them
- [ ] Confirm the live URLs found by page title: hushpuppies.com.pk and onedegree.com.pk
- [ ] CookieDrama: confirm the case study copy, which was promoted from the compact list now that it has a mockup
- [ ] `challenge`: the business problem behind the project, in one or two sentences
- [ ] `outcome` and `results`: measurable results you can share (conversion, speed, AOV, revenue)
- [ ] Live site URL for WeWear, Hushpuppies and OneDegree
- [ ] Confirm the `role` wording for WeWear, Hushpuppies and OneDegree, and whether these were delivered as part of your WPP Media role
- [ ] Eirene Studio: confirm which theme it uses
- [ ] Dagny.pk: add the project date

## Speed tests

- [x] Lighthouse mobile and desktop results for all 11 live sites (10 November 2026).
- [ ] Review the mobile scores before launch. Several Shopify stores score under 50 on mobile, mostly from third-party apps and scripts. Consider optimising first and re-running (`npm run speed`, see README), or showing desktop results only for those stores.
- [ ] CookieDrama (both runs) and Eirene Studio (desktop) hit Lighthouse's load time limit. Re-run them for a cleaner result.

## Astro builds (The Growth Lab, SigmaPrinto)

- [ ] `challenge` for The Growth Lab, and results for both (for example PageSpeed before and after the WordPress move, enquiries, search impressions). The rest of the copy comes from your Contra post.
- [ ] Confirm the role wording "Logo, brand, design and Astro build" for both.
- [ ] Optional: add detail screenshots as a `gallery`, like the Shopify case studies.

## Appearances

- [ ] Confirm the summary for the UMT talk in `src/content/appearances/` (drafted from the session title).
- [ ] Add more talks as new files in `src/content/appearances/`. The newest one is shown as the large feature, and older ones are listed below it.

## Confirm the drafted copy

- [ ] **Experience dates**: CreatExc (both roles), Savvy Programmers, Tetralogicx and ZmaSta overlap on the CV. Each file in `src/content/experience/` has a `# CONFIRM` comment.
- [ ] **Services**: "Who it is for" lines are drafted, not taken from your CV (`src/content/services/0*.md`).
- [ ] **Services deliverables**: check "Launch checklist and handover walkthrough" (store build) and "Regular progress notes" (store management) match how you work.
- [ ] **Tracking pitches**: the first automotive and the insurance pitch entries (`10-pitch-automotive-a.json`, `11-pitch-insurance.json`) say "Contributed to the Media Solutions Team pitch" because the scope was not specified. Add the scope if you want it shown.
- [ ] **Anonymised labels** in `src/content/tracking/`: check each sector label is accurate.
- [ ] **About page copy** and the four "How I work" principles in `src/content/pages/about.md`.
- [ ] **Testimonials**: confirm both people are happy to be quoted with name, role and date.

## When you have permission

- [ ] To name WPP Media clients: add a `"name"` field to each file in `src/content/tracking/` (for example `"name": "Client name"`), then set `anonymiseClients: false` in `src/config/site.ts`. Real names are deliberately not stored in this repository until you have permission, so they cannot leak through a public repo.

## Optional

- [ ] Klaviyo logo for the skills chip: not in any open icon set. If you have an SVG of their logomark from their press kit, add it to `src/lib/brandIcons.ts`.

- [ ] `showPhone: true` plus `CONTACT_PHONE` if you want the phone number on the site.
- [ ] Reference sites or a logo mark if you want the wordmark and favicon refined.
