import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT_ROOT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies');

const TARGETS = {
  'clayton-prints': {
    base: 'https://claytonprints.com',
    ignoreCert: true,
    pages: [
      { name: 'home',              path: '/' },
      { name: 'shop',              path: '/shop/' },
      { name: 'machines',          path: '/product-category/machines/' },
      { name: 'cutting-machines',  path: '/product-category/machines/cutting-machines/' },
      { name: 'heat-press',        path: '/product-category/machines/heat-press-machines/' },
      { name: 'printers',          path: '/product-category/machines/printers-personal/' },
      { name: 'dtf-printers',      path: '/product-category/machines/dtf-printers/' },
      { name: 'vinyls',            path: '/product-category/vinyls-stickers-transfers/consumables-vinyls-stickers-transfers/heat-transfer-vinyls/' },
      { name: 'silhouette',        path: '/product-category/silhouette/cutting-machines-silhouette/' },
      { name: 'cricut',            path: '/product-category/cricut/cutting-machines-cricut/' },
    ],
  },
  'evan-micky': {
    base: 'https://evanmickyphotography.com',
    ignoreCert: false,
    pages: [
      { name: 'home',              path: '/' },
      { name: 'about',             path: '/about/' },
      { name: 'portfolio',         path: '/portfolio/' },
      { name: 'nengi-tobi',        path: '/portfolio/nengi-tobi/' },
      { name: 'jenn-oduwa',        path: '/portfolio/jenn-oduwa/' },
      { name: 'andrea-jeremiah',   path: '/portfolio/andrea-jeremiah/' },
      { name: 'investment',        path: '/investment/' },
      { name: 'engagement',        path: '/more-from-me/engagement-sessions/' },
      { name: 'portraits',         path: '/more-from-me/portraits/' },
      { name: 'family',            path: '/more-from-me/family-portraits/' },
      { name: 'newborn',           path: '/more-from-me/newborn-maternity/' },
      { name: 'contact',           path: '/contact/' },
    ],
  },
};

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };
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

async function shoot(page, slug, device, name, width) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  const buf = await page.screenshot({ type: 'png', fullPage: false });
  const outDir = path.join(OUT_ROOT, slug);
  mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, `${device}-${name}.webp`);
  await sharp(buf)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(target);
  console.log(`  ok ${slug}/${device}-${name}.webp`);
}

(async () => {
  console.log('Capturing diverse screenshots for Clayton Prints + Evan Micky...\n');
  const browser = await chromium.launch({ headless: true });

  for (const [slug, config] of Object.entries(TARGETS)) {
    console.log(`\n=== ${slug} (${config.pages.length} pages) ===`);

    // Desktop
    {
      const ctx = await browser.newContext({
        viewport: DESKTOP,
        ignoreHTTPSErrors: config.ignoreCert,
      });
      const page = await ctx.newPage();
      for (const p of config.pages) {
        const url = config.base + p.path;
        try {
          process.stdout.write(`  desktop: ${p.path}... `);
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
          await waitForLoaded(page);
          await shoot(page, slug, 'desktop', p.name, 1440);
        } catch (err) {
          console.error(`FAIL: ${err.message.split('\n')[0]}`);
        }
      }
      await ctx.close();
    }

    // Mobile (first 5 pages)
    {
      const ctx = await browser.newContext({
        viewport: MOBILE,
        ignoreHTTPSErrors: config.ignoreCert,
      });
      const page = await ctx.newPage();
      for (const p of config.pages.slice(0, 5)) {
        const url = config.base + p.path;
        try {
          process.stdout.write(`  mobile: ${p.path}... `);
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
          await waitForLoaded(page);
          await shoot(page, slug, 'mobile', p.name, 390);
        } catch (err) {
          console.error(`FAIL: ${err.message.split('\n')[0]}`);
        }
      }
      await ctx.close();
    }
  }

  await browser.close();
  console.log('\n=== Done ===');
})();
