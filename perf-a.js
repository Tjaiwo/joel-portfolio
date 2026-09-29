const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async () => {
  const dir = 'public/screenshots';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));

  for (const file of files) {
    const input = path.join(dir, file);
    const before = await sharp(input).metadata();

    // Resize to 800px wide, preserve aspect ratio
    const buf = await sharp(input)
      .resize({ width: 800 })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();

    fs.writeFileSync(input, buf);

    const after = await sharp(input).metadata();
    console.log(
      file.padEnd(38) +
      `${before.width}x${before.height}`.padEnd(12) +
      '→ ' +
      `${after.width}x${after.height}`.padEnd(12) +
      `${(buf.length/1024).toFixed(0)}KB`
    );
  }
})();
