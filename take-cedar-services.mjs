import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies', 'cedar-rush');
mkdirSync(OUT, { recursive: true });

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const URL = 'https://cedarrush.ng/our-services/';

async function waitForLoaded(page) {
  try { await page.waitForLoadState('networkidle', { timeout: 25000 }); } catch (e) {}
  try {
    await page.waitForFunction(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.length > 0 && imgs.some(img => img.complete && img.naturalWidth > 200);
    }, { timeout: 15000 });
  } catch (e) {}
  await page.waitForTimeout(5000);
}

async function shoot(page, device, name, width) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  const buf = await page.screenshot({ type: 'png', fullPage: false });
  const target = path.join(OUT, `${device}-${name}.webp`);
  await sharp(buf)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(target);
  console.log(`  ok ${device}-${name}.webp`);
}

(async () => {
  console.log('Recapturing Cedar Rush /our-services/ screenshots...\n');
  const browser = await chromium.launch({ headless: true });

  // Desktop
  {
    const ctx = await browser.newContext({ viewport: DESKTOP });
    const page = await ctx.newPage();
    try {
      console.log('  loading desktop /our-services/...');
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await waitForLoaded(page);
      await shoot(page, 'desktop', 'services', 1440);
    } catch (err) {
      console.error('  desktop error:', err.message.split('\n')[0]);
    } finally { await ctx.close(); }
  }

  // Mobile
  {
    const ctx = await browser.newContext({ viewport: MOBILE });
    const page = await ctx.newPage();
    try {
      console.log('  loading mobile /our-services/...');
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await waitForLoaded(page);
      await shoot(page, 'mobile', 'services', 390);
    } catch (err) {
      console.error('  mobile error:', err.message.split('\n')[0]);
    } finally { await ctx.close(); }
  }

  await browser.close();
  console.log('\n=== Done ===');
})();
