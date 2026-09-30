import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const OUT_ROOT = path.join(process.cwd(), 'public', 'screenshots', 'case-studies');

if (!existsSync(path.join(process.cwd(), 'package.json'))) {
  console.error('Run this from your portfolio root (where package.json lives).');
  process.exit(1);
}

const SITES = [
  { slug: 'elin-air',   url: 'https://flyelinair.com/' },
  { slug: 'elin-group', url: 'https://elin-group.com/' },
  { slug: 'mediapool',  url: 'https://mediapool.ng/' },
];

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

const POST_LOAD_DELAY = 8000; // 8 seconds — let everything settle

async function saveShot(page, slug, device, view, scrollY = 0) {
  if (scrollY > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(2000);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
  }
  const pngBuf = await page.screenshot({ type: 'png', fullPage: false });
  const outDir = path.join(OUT_ROOT, slug);
  mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, `${device}-${view}.webp`);
  await sharp(pngBuf)
    .resize({ width: device === 'desktop' ? 1440 : 390, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(target);
  console.log(`  ok ${slug}/${device}-${view}.webp`);
}

async function shootSite(browser, site) {
  const { slug, url } = site;
  console.log(`\n--- ${slug} ---`);

  // Desktop
  {
    const ctx = await browser.newContext({ viewport: DESKTOP });
    const page = await ctx.newPage();
    try {
      console.log(`  loading desktop...`);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      // Wait for network to quiet down OR 30s, whichever first
      try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch (e) {}
      // Force 8s settle regardless
      await page.waitForTimeout(POST_LOAD_DELAY);
      await saveShot(page, slug, 'desktop', 'hero', 0);
      await saveShot(page, slug, 'desktop', 'detail', 800);
    } catch (err) {
      console.error(`  desktop error: ${err.message}`);
    } finally { await ctx.close(); }
  }

  // Mobile
  {
    const ctx = await browser.newContext({ viewport: MOBILE });
    const page = await ctx.newPage();
    try {
      console.log(`  loading mobile...`);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch (e) {}
      await page.waitForTimeout(POST_LOAD_DELAY);
      await saveShot(page, slug, 'mobile', 'hero', 0);
      await saveShot(page, slug, 'mobile', 'detail', 1200);
    } catch (err) {
      console.error(`  mobile error: ${err.message}`);
    } finally { await ctx.close(); }
  }
}

(async () => {
  console.log(`Output: ${OUT_ROOT}`);
  console.log(`Post-load delay: ${POST_LOAD_DELAY}ms per page\n`);
  const browser = await chromium.launch({ headless: true });

  for (const site of SITES) {
    await shootSite(browser, site);
  }

  await browser.close();
  console.log('\n done. all screenshots saved.');
})();
