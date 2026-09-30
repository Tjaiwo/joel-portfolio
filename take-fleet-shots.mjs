import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies', 'elin-air');
mkdirSync(OUT, { recursive: true });

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const URL = 'https://flyelinair.com/fleet/';

async function waitForLoaded(page) {
  try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch (e) {}
  try {
    await page.waitForFunction(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.length > 0 && imgs.some(img => img.complete && img.naturalWidth > 200);
    }, { timeout: 15000 });
  } catch (e) {}
  await page.waitForTimeout(5000);
}

async function shoot(page, device, name, scrollY, width) {
  if (scrollY > 0) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(2000);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
  }
  const buf = await page.screenshot({ type: 'png', fullPage: false });
  const target = path.join(OUT, `${device}-${name}.webp`);
  await sharp(buf)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(target);
  console.log(`  ok ${device}-${name}.webp`);
}

(async () => {
  console.log('Capturing Elin Air fleet page screenshots...\n');
  const browser = await chromium.launch({ headless: true });

  // Desktop — 4 shots across the fleet page
  {
    const ctx = await browser.newContext({ viewport: DESKTOP });
    const page = await ctx.newPage();
    try {
      console.log('  loading desktop fleet page...');
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await waitForLoaded(page);
      await shoot(page, 'desktop', 'fleet-top', 0, 1440);
      await shoot(page, 'desktop', 'fleet-grid', 800, 1440);
      await shoot(page, 'desktop', 'fleet-detail', 1800, 1440);
      await shoot(page, 'desktop', 'fleet-specs', 2800, 1440);
    } catch (err) {
      console.error('  desktop error:', err.message);
    } finally { await ctx.close(); }
  }

  // Mobile — 3 shots
  {
    const ctx = await browser.newContext({ viewport: MOBILE });
    const page = await ctx.newPage();
    try {
      console.log('  loading mobile fleet page...');
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await waitForLoaded(page);
      await shoot(page, 'mobile', 'fleet-top', 0, 390);
      await shoot(page, 'mobile', 'fleet-grid', 1200, 390);
      await shoot(page, 'mobile', 'fleet-detail', 2400, 390);
    } catch (err) {
      console.error('  mobile error:', err.message);
    } finally { await ctx.close(); }
  }

  await browser.close();
  console.log('\nDone. Fleet screenshots saved.');
})();
