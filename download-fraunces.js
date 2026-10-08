const fs = require('fs');
const path = require('path');

(async () => {
  // Fetch Google Fonts CSS with a modern UA to get woff2 URLs
  const cssRes = await fetch(
    'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,100..900&display=swap',
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      },
    }
  );

  if (!cssRes.ok) {
    console.error('Failed to fetch CSS:', cssRes.status, cssRes.statusText);
    process.exit(1);
  }

  const css = await cssRes.text();

  // Grab the latin subset block (contains U+0000-00FF)
  const blocks = css.split('@font-face').filter((b) => b.includes('U+0000-00FF'));
  if (blocks.length === 0) {
    console.error('No latin subset found in CSS');
    console.error(css.slice(0, 500));
    process.exit(1);
  }

  const block = blocks[blocks.length - 1];
  const urlMatch = block.match(/url\((https:\/\/[^)]+\.woff2)\)/);
  if (!urlMatch) {
    console.error('No woff2 URL found in latin block');
    console.error(block);
    process.exit(1);
  }

  const fontUrl = urlMatch[1];
  console.log('Downloading:', fontUrl);

  const fontRes = await fetch(fontUrl);
  if (!fontRes.ok) {
    console.error('Failed to fetch font:', fontRes.status);
    process.exit(1);
  }

  const buffer = Buffer.from(await fontRes.arrayBuffer());
  const outDir = path.join('src', 'fonts');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Fraunces.woff2');
  fs.writeFileSync(outPath, buffer);

  const kb = (buffer.length / 1024).toFixed(1);
  console.log(`Saved ${kb}KB to ${outPath}`);
})();
