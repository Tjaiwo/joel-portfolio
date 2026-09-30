import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies', 'elin-group');
mkdirSync(OUT, { recursive: true });

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const URL = 'https://elin-group.com/';

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
  console.log('Recapturing Elin Group (waiting for hero image + vertical marquee)...');
  const browser = await chromium.launch({ headless: true });

  // Desktop
  console.log('\n--- Desktop ---');
  {
    const ctx = await browser.newContext({ viewport: DESKTOP });
    const page = await ctx.newPage();
    try {
      console.log('  loading...');
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

      // Wait for any hero image to actually be loaded (not just present in DOM)
      console.log('  waiting for hero image to load...');
      try {
        await page.waitForFunction(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs.length > 0 && imgs.some(img => img.complete && img.naturalWidth > 200);
        }, { timeout: 30000 });
        console.log('  hero image loaded');
      } catch (e) {
        console.log('  (image load timeout, continuing anyway)');
      }

      // Wait for network to settle (deferred JS, Elementor animations)
      try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch (e) {}

      // Extra time for the vertical marquee animation to initialize
      console.log('  waiting 12s for marquee + animations...');
      await page.waitForTimeout(12000);

      await saveShot(page, 'desktop', 'hero', 0);
      await saveShot(page, 'desktop', 'detail', 800);
    } catch (err) {
      console.error('  desktop error:', err.message);
    } finally { await ctx.close(); }
  }

  // Mobile
  console.log('\n--- Mobile ---');
  {
    const ctx = await browser.newContext({ viewport: MOBILE });
    const page = await ctx.newPage();
    try {
      console.log('  loading...');
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

      console.log('  waiting for hero image to load...');
      try {
        await page.waitForFunction(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs.length > 0 && imgs.some(img => img.complete && img.naturalWidth > 200);
        }, { timeout: 30000 });
        console.log('  hero image loaded');
      } catch (e) {
        console.log('  (image load timeout, continuing anyway)');
      }

      try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch (e) {}

      console.log('  waiting 12s for marquee + animations...');
      await page.waitForTimeout(12000);

      await saveShot(page, 'mobile', 'hero', 0);
      await saveShot(page, 'mobile', 'detail', 1200);
    } catch (err) {
      console.error('  mobile error:', err.message);
    } finally { await ctx.close(); }
  }

  await browser.close();
  console.log('\ndone. screenshots saved to public/screenshots/case-studies/elin-group/');
})();
