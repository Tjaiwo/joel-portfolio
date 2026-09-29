const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async () => {
  const dir = path.resolve('public/screenshots');
  console.log('Looking in:', dir);
  console.log('Exists:', fs.existsSync(dir));
  console.log('---');

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
  console.log('Found', files.length, 'webp files\n');

  for (const file of files) {
    const input = path.join(dir, file);
    try {
      const before = await sharp(input).metadata();
      const stat = fs.statSync(input);
      console.log(`${file}: ${before.width}x${before.height} (${(stat.size/1024).toFixed(0)}KB)`);

      // Skip if already 800px wide
      if (before.width <= 800) {
        console.log(`  → already ≤800px, skipping`);
        continue;
      }

      const buf = await sharp(input)
        .resize({ width: 800 })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();

      console.log(`  → new buffer: ${(buf.length/1024).toFixed(0)}KB`);

      fs.writeFileSync(input, buf);
      console.log(`  → written`);

      const after = await sharp(input).metadata();
      console.log(`  → verified: ${after.width}x${after.height}`);
    } catch (err) {
      console.log(`  ✗ ERROR: ${err.message}`);
      console.log(`  Stack: ${err.stack.split('\n').slice(0,3).join('\n')}`);
    }
  }

  console.log('\nDone.');
})();
