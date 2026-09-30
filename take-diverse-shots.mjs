import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT_ROOT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies');

const TARGETS = {
  'elin-air': {
    base: 'https://flyelinair.com',
    pages: [
      { name: 'home',            path: '/' },
      { name: 'fleet',           path: '/fleet' },
      { name: 'charter-request', path: '/charter-request/' },
      { name: 'safety',          path: '/help/safety-protocol' },
      { name: 'press',           path: '/category/press/' },
    ],
  },
  'elin-group': {
    base: 'https://elin-group.com',
    pages: [
      { name: 'home',           path: '/' },
      { name: 'about',          path: '/about/' },
      { name: 'businesses',     path: '/businesses/' },
      { name: 'oil-gas',        path: '/businesses/elin-oil-and-gas-services/' },
      { name: 'aviation',       path: '/businesses/elin-air-and-aviation-services/' },
      { name: 'mining',         path: '/businesses/elin-mining-limited/' },
      { name: 'construction',   path: '/businesses/elin-construction/' },
      { name: 'realty',         path: '/businesses/elin-realty/' },
      { name: 'power',          path: '/businesses/ene-gas-and-power/' },
      { name: 'meffio',         path: '/businesses/meffio-turbine-energy-limited/' },
      { name: 'leadership',     path: '/leadership/' },
      { name: 'sustainability', path: '/greener-future/' },
      { name: 'vision-2030',    path: '/vision-2030/' },
      { name: 'elin-way',       path: '/the-elin-way/' },
    ],
  },
  'mediapool': {
    base: 'https://mediapool.ng',
    pages: [
      { name: 'home',       path: '/' },
      { name: 'services',   path: '/services/' },
      { name: 'consultancy', path: '/services/media-consultancy/' },
      { name: 'buying',     path: '/services/media-buying/' },
      { name: 'planning',   path: '/services/media-planning/' },
      { name: 'works',      path: '/works/' },
      { name: 'renmoney',   path: '/works/renmoney/' },
      { name: 'about',     path: '/about/' },
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
  console.log('Capturing diverse screenshots from sub-pages...\n');
  const browser = await chromium.launch({ headless: true });

  for (const [slug, config] of Object.entries(TARGETS)) {
    console.log(`\n=== ${slug} (${config.pages.length} pages) ===`);

    // Desktop: every page hero
    {
      const ctx = await browser.newContext({ viewport: DESKTOP });
      const page = await ctx.newPage();
      for (const p of config.pages) {
        const url = config.base + p.path;
        try {
          process.stdout.write(`  loading desktop: ${p.path}... `);
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
          await waitForLoaded(page);
          await shoot(page, slug, 'desktop', p.name, 1440);
        } catch (err) {
          console.error(`FAIL: ${err.message.split('\n')[0]}`);
        }
      }
      await ctx.close();
    }

    // Mobile: first 5 pages
    {
      const ctx = await browser.newContext({ viewport: MOBILE });
      const page = await ctx.newPage();
      for (const p of config.pages.slice(0, 5)) {
        const url = config.base + p.path;
        try {
          process.stdout.write(`  loading mobile: ${p.path}... `);
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
