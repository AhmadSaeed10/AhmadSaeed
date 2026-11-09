// Prints the /resume page to public/Ahmad_Saeed_CV.pdf.
// Usage: npm run build && npm run preview (in another terminal), then: node scripts/make-cv-pdf.mjs
// Requires Playwright with Chromium (npx playwright install chromium).
import { chromium } from 'playwright';

const url = process.env.CV_URL || 'http://localhost:4321/resume';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.emulateMedia({ media: 'print', colorScheme: 'light' });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => (document.documentElement.dataset.theme = 'light'));
await page.pdf({ path: 'public/Ahmad_Saeed_CV.pdf', format: 'A4', printBackground: true, margin: { top: '14mm', bottom: '16mm', left: '14mm', right: '14mm' } });
await browser.close();
console.log('Wrote public/Ahmad_Saeed_CV.pdf from', url);
