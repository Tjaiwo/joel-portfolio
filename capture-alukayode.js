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
      
      console.log(`Capturing desktop-about...`);
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate(() => window.scrollTo(0, 1800));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, `desktop-about.webp`), type: 'webp' });

      console.log(`Capturing desktop-contact...`);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 900));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, `desktop-contact.webp`), type: 'webp' });

      console.log(`Capturing mobile-about...`);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, `mobile-about.webp`), type: 'webp' });

      console.log(`Capturing mobile-contact...`);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 844));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, `mobile-contact.webp`), type: 'webp' });
      
    } catch (e) {
      console.log(`Error on ${name}:`, e.message);
    }
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
