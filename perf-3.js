const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async () => {
  const dir = 'public/screenshots';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
  let before = 0, after = 0;

  for (const file of files) {
    const input = path.join(dir, file);
    const tmp = path.join(dir, file + '.tmp');
    const sizeBefore = fs.statSync(input).size;

    await sharp(input)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(tmp);

    const sizeAfter = fs.statSync(tmp).size;
    fs.renameSync(tmp, input);
    before += sizeBefore;
    after += sizeAfter;

    console.log(`${file.padEnd(38)} ${(sizeBefore/1024).toFixed(0).padStart(5)}KB → ${(sizeAfter/1024).toFixed(0).padStart(4)}KB`);
  }

  console.log(`\nTotal: ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (${Math.round((1-after/before)*100)}% smaller)`);
})();
