// Generates neutral, clearly labelled placeholder images in src/assets/placeholders.
// Run with: node scripts/make-placeholders.mjs
// Replace the generated files with real screenshots (same file name) when you have them.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const font = await readFile('node_modules/@fontsource/inter/files/inter-latin-600-normal.woff');
const fontReg = await readFile('node_modules/@fontsource/inter/files/inter-latin-400-normal.woff');
const out = 'src/assets/placeholders';
await mkdir(out, { recursive: true });

const h = (type, style, children) => ({ type, props: { style, children } });

async function make(file, title, subtitle, w = 1600, hgt = 1000) {
  const node = h(
    'div',
    {
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: '#E9E6E0',
      border: '4px dashed #A9A39A', fontFamily: 'Inter', color: '#3B3F45', gap: 20, padding: 60,
    },
    [
      h('div', { fontSize: 28, letterSpacing: 4, textTransform: 'uppercase', color: '#6B655C', fontWeight: 600 }, 'Placeholder'),
      h('div', { fontSize: 60, fontWeight: 600, textAlign: 'center' }, title),
      h('div', { fontSize: 32, textAlign: 'center', color: '#5A554D', fontWeight: 400 }, subtitle),
    ],
  );
  const svg = await satori(node, {
    width: w, height: hgt,
    fonts: [
      { name: 'Inter', data: font, weight: 600, style: 'normal' },
      { name: 'Inter', data: fontReg, weight: 400, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: w } }).render().asPng();
  await writeFile(`${out}/${file}`, png);
  console.log('wrote', file);
}

const projects = {
  wewear: 'WeWear Pakistan',
  hushpuppies: 'Hushpuppies Pakistan',
  onedegree: 'OneDegree Pakistan',
  eirene: 'Eirene Studio',
};
for (const [slug, name] of Object.entries(projects)) {
  await make(`${slug}-cover.png`, name, 'TODO: homepage screenshot, desktop, 1600 x 1000');
  await make(`${slug}-detail-1.png`, name, 'TODO: product or collection page screenshot');
  await make(`${slug}-detail-2.png`, name, 'TODO: mobile or feature detail screenshot');
}
await make('portrait.png', 'Ahmad Saeed', 'TODO: professional photo, 4:5 portrait', 1200, 1500);
