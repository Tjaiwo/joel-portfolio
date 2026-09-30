import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies', 'elin-air');
mkdirSync(OUT, { recursive: true });

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

(async () => {
  console.log('Recapturing Elin Air mobile fleet screenshot from /fleet/...');
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: MOBILE });
  const page = await ctx.newPage();

  try {
    console.log('  loading https://flyelinair.com/fleet/ on mobile...');
    await page.goto('https://flyelinair.com/fleet/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitForLoaded(page);

    // Scroll to top, take screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    const buf = await page.screenshot({ type: 'png', fullPage: false });
    const target = path.join(OUT, 'mobile-fleet.webp');
    await sharp(buf)
      .resize({ width: 390, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(target);
    console.log('  ok mobile-fleet.webp overwritten');
  } catch (err) {
    console.error('  error:', err.message);
  } finally {
    await ctx.close();
    await browser.close();
  }
})();
