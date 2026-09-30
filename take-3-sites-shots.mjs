import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT_ROOT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies');

const TARGETS = {
  'diamond-source': {
    base: 'https://www.diamondsourcejewelers.com',
    ignoreCert: false,
    pages: [
      { name: 'home',           path: '/' },
      { name: 'engagement',     path: '/product-category/engagement-rings/' },
      { name: 'wedding-bands',  path: '/product-category/wedding-bands/' },
      { name: 'lab-grown',      path: '/product-category/lab-grown-diamonds/' },
      { name: 'shapes',         path: '/shop/' },
      { name: 'about',          path: '/about-us/' },
      { name: 'contact',       path: '/contact/' },
      { name: 'consultation',  path: '/schedule-a-consultation/' },
    ],
  },
  'designed-spaces': {
    base: 'https://designedspacesbyyemi.com',
    ignoreCert: false,
    pages: [
      { name: 'home',           path: '/' },
      { name: 'about',          path: '/about-us/' },
      { name: 'services',      path: '/services/' },
      { name: 'projects',      path: '/projects/' },
      { name: 'gallery',       path: '/gallery/' },
      { name: 'contact',       path: '/contact/' },
    ],
  },
  'cedar-rush': {
    base: 'https://cedarrush.ng',
    ignoreCert: false,
    pages: [
      { name: 'home',           path: '/' },
      { name: 'about',          path: '/about-us/' },
      { name: 'services',      path: '/services/' },
      { name: 'work',          path: '/work/' },
      { name: 'contact',       path: '/contact-us/' },
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
  console.log('Capturing screenshots for 3 new sites...\n');
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
