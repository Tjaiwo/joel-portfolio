import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies', 'designed-spaces');
mkdirSync(OUT, { recursive: true });

const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

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

(async () => {
  console.log('Capturing Designed Spaces mobile contact page...');
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: MOBILE });
  const page = await ctx.newPage();

  try {
    console.log('  loading https://designedspacesbyyemi.com/contact/...');
    await page.goto('https://designedspacesbyyemi.com/contact/', { waitUntil: 'domcontentloaded', timeout: 45000 });
    await waitForLoaded(page);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    const buf = await page.screenshot({ type: 'png', fullPage: false });
    const target = path.join(OUT, 'mobile-contact.webp');
    await sharp(buf)
      .resize({ width: 390, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(target);
    console.log('  ok mobile-contact.webp saved');
  } catch (err) {
    console.error('  error:', err.message.split('\n')[0]);
  } finally {
    await ctx.close();
    await browser.close();
  }
})();
