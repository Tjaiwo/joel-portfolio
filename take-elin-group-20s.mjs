import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies', 'elin-group');
mkdirSync(OUT, { recursive: true });

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const URL = 'https://elin-group.com/';
const DELAY = 20000; // 20 seconds

async function saveShot(page, device, view, scrollY) {
  if (scrollY > 0) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(2500);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);
  }
  const buf = await page.screenshot({ type: 'png', fullPage: false });
  const target = path.join(OUT, device + '-' + view + '.webp');
  await sharp(buf)
    .resize({ width: device === 'desktop' ? 1440 : 390, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(target);
  console.log('  ok ' + device + '-' + view + '.webp');
}

(async () => {
  console.log('Recapturing Elin Group with 20s post-load delay...');
  console.log('Output dir:', OUT);
  console.log('');
  const browser = await chromium.launch({ headless: true });

  // Desktop
  console.log('--- Desktop ---');
  {
    const ctx = await browser.newContext({ viewport: DESKTOP });
    const page = await ctx.newPage();
    try {
      console.log('  loading desktop...');
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
      try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch (e) { console.log('  (networkidle timeout, continuing)'); }
      console.log('  waiting 20s for full render...');
      await page.waitForTimeout(DELAY);
      await saveShot(page, 'desktop', 'hero', 0);
      await saveShot(page, 'desktop', 'detail', 800);
    } catch (err) {
      console.error('  desktop error:', err.message);
    } finally { await ctx.close(); }
  }

  // Mobile
  console.log('');
  console.log('--- Mobile ---');
  {
    const ctx = await browser.newContext({ viewport: MOBILE });
    const page = await ctx.newPage();
    try {
      console.log('  loading mobile...');
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
      try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch (e) { console.log('  (networkidle timeout, continuing)'); }
      console.log('  waiting 20s for full render...');
      await page.waitForTimeout(DELAY);
      await saveShot(page, 'mobile', 'hero', 0);
      await saveShot(page, 'mobile', 'detail', 1200);
    } catch (err) {
      console.error('  mobile error:', err.message);
    } finally { await ctx.close(); }
  }

  await browser.close();
  console.log('');
  console.log('done. screenshots saved to public/screenshots/case-studies/elin-group/');
})();
