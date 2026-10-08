const fs = require('fs');
const path = require('path');

(async () => {
  const cssRes = await fetch(
    'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,100..900&display=swap',
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      },
    }
  );

  if (!cssRes.ok) {
    console.error('Failed to fetch CSS:', cssRes.status);
    process.exit(1);
  }

  const css = await cssRes.text();
  const blocks = css.split('@font-face').filter((b) => b.includes('U+0000-00FF'));

  if (blocks.length === 0) {
    console.error('No latin subset found. Full CSS:');
    console.error(css);
    process.exit(1);
  }

  const block = blocks[blocks.length - 1];

  if (!block.includes('font-style: italic')) {
    console.error('WARNING: latin block is not italic. Full CSS:');
    console.error(css);
    process.exit(1);
  }

  const urlMatch = block.match(/url\((https:\/\/[^)]+\.woff2)\)/);
  if (!urlMatch) {
    console.error('No woff2 URL in italic block');
    process.exit(1);
  }

  const fontUrl = urlMatch[1];
  console.log('Downloading:', fontUrl);

  const fontRes = await fetch(fontUrl);
  const buffer = Buffer.from(await fontRes.arrayBuffer());

  const outPath = path.join('src', 'fonts', 'Fraunces-Italic.woff2');
  fs.writeFileSync(outPath, buffer);

  const kb = (buffer.length / 1024).toFixed(1);
  console.log(`Saved ${kb}KB to ${outPath}`);
})();
