// Crops the desktop and phone screens out of each project mockup in src/assets/projects
// into src/assets/screens/<slug>-desktop.webp and <slug>-mobile.webp, used as case study gallery images.
// Usage: node scripts/crop-screens.mjs   (box values are left, top, width, height in source pixels)
// Replace with real full-resolution screenshots when available; the crops are limited by the mockup size.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const boxes = {
  cookiedrama: { desktop: [474, 180, 590, 656], mobile: [1080, 215, 207, 592] },
  'eirene-studio': { desktop: [452, 140, 634, 806], mobile: [254, 212, 198, 566] },
  hushpuppies: { desktop: [463, 168, 614, 686], mobile: [1082, 222, 206, 536] },
  onedegree: { desktop: [459, 160, 622, 730], mobile: [14, 256, 216, 568] },
  wewear: { desktop: [445, 134, 648, 812], mobile: [1098, 222, 214, 560] },
  'the-growth-lab': { desktop: [433, 108, 665, 815], mobile: [216, 222, 210, 580] },
  sigmaprinto: { desktop: [426, 172, 686, 546], mobile: [228, 256, 186, 484] },
};

await mkdir('src/assets/screens', { recursive: true });
for (const [slug, b] of Object.entries(boxes)) {
  for (const [kind, [left, top, width, height]] of Object.entries(b)) {
    await sharp(`src/assets/projects/${slug}.webp`)
      .extract({ left, top, width, height })
      .webp({ quality: 92 })
      .toFile(`src/assets/screens/${slug}-${kind}.webp`);
    console.log('wrote', `${slug}-${kind}.webp`, `${width}x${height}`);
  }
}
