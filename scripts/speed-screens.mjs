// Turns Lighthouse reports into speed test screens and data for the site.
//
// 1. Run Lighthouse for each live site (mobile is the default preset, desktop uses --preset=desktop),
//    saving both outputs with this naming: <dir>/<project-id>-<mobile|desktop>.report.{json,html}
//      npx lighthouse https://example.com --output=json --output=html --output-path=<dir>/<id>-mobile
//      npx lighthouse https://example.com --preset=desktop --output=json --output=html --output-path=<dir>/<id>-desktop
//    <project-id> is the project's file name in src/content/projects (for example "wewear").
// 2. node scripts/speed-screens.mjs <dir>
//    Writes src/assets/speed/<id>-<mode>.webp (score summary and core metrics from the report)
//    and src/content/speed/<id>.json (scores, metrics, test date, Lighthouse version).
//
// Requires Playwright with Chromium (npm i -D playwright && npx playwright install chromium).
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('Usage: node scripts/speed-screens.mjs <reports-dir>');
  process.exit(1);
}

await mkdir('src/assets/speed', { recursive: true });
await mkdir('src/content/speed', { recursive: true });

const files = (await readdir(dir)).filter((f) => f.endsWith('.report.json'));
const byProject = new Map();
for (const f of files) {
  const m = f.match(/^(.+)-(mobile|desktop)\.report\.json$/);
  if (!m) continue;
  const [, id, mode] = m;
  if (!byProject.has(id)) byProject.set(id, {});
  byProject.get(id)[mode] = path.join(dir, f);
}

const score = (c) => (c && c.score != null ? Math.round(c.score * 100) : null);
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1000, height: 1600 }, colorScheme: 'light', deviceScaleFactor: 2 })).newPage();

for (const [id, modes] of byProject) {
  const out = { project: id };
  for (const mode of ['mobile', 'desktop']) {
    if (!modes[mode]) continue;
    const lhr = JSON.parse(await readFile(modes[mode], 'utf8'));
    const c = lhr.categories;
    const a = lhr.audits;
    out.url = out.url || lhr.finalDisplayedUrl || lhr.finalUrl || lhr.requestedUrl;
    out.tested = lhr.fetchTime.slice(0, 10);
    out.lighthouse = lhr.lighthouseVersion;

    // Screenshot: four score gauges down to the end of the performance metrics.
    await page.goto('file://' + path.resolve(modes[mode].replace(/\.json$/, '.html')), { waitUntil: 'load' });
    await page.waitForTimeout(4500); // let the gauges finish animating
    // The performance gauge opens in a "peek" state that overlays metric labels; settle it to the plain gauge.
    await page.evaluate(() =>
      document.querySelectorAll('.lh-exp-gauge').forEach((g) => g.classList.remove('state--peek', 'state--expanded', 'state--highlight')),
    );
    await page.waitForTimeout(1500);
    const clip = await page.evaluate(() => {
      const box = (s) => document.querySelector(s)?.getBoundingClientRect();
      const top = box('.lh-scores-container');
      const cat = box('.lh-category');
      const metrics = box('.lh-metrics-container');
      return { x: cat.x, y: top.y + scrollY, width: cat.width, height: metrics.bottom + 16 - top.y };
    });
    const png = await page.screenshot({ clip });
    await sharp(png).webp({ quality: 86 }).toFile(`src/assets/speed/${id}-${mode}.webp`);

    out[mode] = {
      scores: {
        performance: score(c.performance),
        accessibility: score(c.accessibility),
        bestPractices: score(c['best-practices']),
        seo: score(c.seo),
      },
      metrics: {
        fcp: a['first-contentful-paint']?.displayValue,
        lcp: a['largest-contentful-paint']?.displayValue,
        tbt: a['total-blocking-time']?.displayValue,
        cls: a['cumulative-layout-shift']?.displayValue,
        si: a['speed-index']?.displayValue,
      },
      image: `../../assets/speed/${id}-${mode}.webp`,
      ...(lhr.runWarnings?.length ? { warning: lhr.runWarnings[0].split('.')[0] + '.' } : {}),
    };
    console.log(id, mode, JSON.stringify(out[mode].scores));
  }
  await writeFile(`src/content/speed/${id}.json`, JSON.stringify(out, null, 2) + '\n');
}
await browser.close();
