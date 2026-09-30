import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT_ROOT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies');

const SITES = [
  { slug: 'elin-air',   url: 'https://flyelinair.com/' },
  { slug: 'elin-group', url: 'https://elin-group.com/' },
  { slug: 'mediapool',  url: 'https://mediapool.ng/' },
];

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

async function waitForLoaded(page) {
  try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch (e) {}
  try {
    await page.waitForFunction(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.length > 0 && imgs.some(img => img.complete && img.naturalWidth > 200);
    }, { timeout: 20000 });
  } catch (e) {}
  await page.waitForTimeout(8000);
}

async function shootAt(page, slug, device, label, scrollY, width) {
  await page.evaluate(y => window.scrollTo(0, y), scrollY);
  await page.waitForTimeout(2000);
  const buf = await page.screenshot({ type: 'png', fullPage: false });
  const outDir = path.join(OUT_ROOT, slug);
  mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, `${device}-${label}.webp`);
  await sharp(buf)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(target);
  console.log(`  ok ${slug}/${device}-${label}.webp`);
}

(async () => {
  console.log('Capturing all screenshots for case studies v2...\n');
  const browser = await chromium.launch({ headless: true });

  for (const site of SITES) {
    const { slug, url } = site;
    console.log(`=== ${slug} ===`);

    // Desktop: 4 shots at different scroll positions
    {
      const ctx = await browser.newContext({ viewport: DESKTOP });
      const page = await ctx.newPage();
      try {
        console.log('  loading desktop...');
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await waitForLoaded(page);
        await shootAt(page, slug, 'desktop', 'shot-1', 0, 1440);
        await shootAt(page, slug, 'desktop', 'shot-2', 1200, 1440);
        await shootAt(page, slug, 'desktop', 'shot-3', 2400, 1440);
        await shootAt(page, slug, 'desktop', 'shot-4', 3600, 1440);
      } catch (err) {
        console.error(`  desktop error: ${err.message}`);
      } finally { await ctx.close(); }
    }

    // Mobile: 3 shots at different scroll positions
    {
      const ctx = await browser.newContext({ viewport: MOBILE });
      const page = await ctx.newPage();
      try {
        console.log('  loading mobile...');
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await waitForLoaded(page);
        await shootAt(page, slug, 'mobile', 'shot-1', 0, 390);
        await shootAt(page, slug, 'mobile', 'shot-2', 1500, 390);
        await shootAt(page, slug, 'mobile', 'shot-3', 3000, 390);
      } catch (err) {
        console.error(`  mobile error: ${err.message}`);
      } finally { await ctx.close(); }
    }
    console.log('');
  }

  await browser.close();
  console.log('=== Done ===');
  console.log('Screenshots saved to: public/screenshots/case-studies/');
})();
