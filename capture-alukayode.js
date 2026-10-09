const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URLS = [
  { name: 'home', url: 'https://alukayode.com/' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const dir = path.join(__dirname, 'public', 'screenshots', 'case-studies', 'alukayode');
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const { name, url } of URLS) {
    try {
      console.log(`Navigating to ${url}...`);
      await page.goto(url, { waitUntil: 'load', timeout: 15000 });
      await page.waitForTimeout(5000);
      
      console.log(`Capturing desktop-${name}...`);
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.screenshot({ path: path.join(dir, `desktop-${name}.webp`), type: 'webp' });

      await page.evaluate(() => window.scrollBy(0, 1000));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, `desktop-work.webp`), type: 'webp' });

      console.log(`Capturing mobile-${name}...`);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, `mobile-${name}.webp`), type: 'webp' });

      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, `mobile-work.webp`), type: 'webp' });
      
    } catch (e) {
      console.log(`Error on ${name}:`, e.message);
    }
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
