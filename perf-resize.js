const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async () => {
  const dir = path.resolve('public/screenshots');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));

  for (const file of files) {
    const input = path.join(dir, file);
    const tmp = path.join(dir, '_tmp_' + file);

    try {
      const before = await sharp(input).metadata();
      if (before.width <= 800) {
        console.log(`${file}: ${before.width}px — skip`);
        continue;
      }

      await sharp(input)
        .resize({ width: 800 })
        .webp({ quality: 80, effort: 6 })
        .toFile(tmp);

      fs.renameSync(tmp, input);
      const after = await sharp(input).metadata();
      console.log(`${file}: ${before.width} → ${after.width}px OK`);
    } catch (err) {
      console.log(`${file}: FAILED — ${err.message}`);
      if (fs.existsSync(tmp)) {
        try { fs.unlinkSync(tmp); } catch (e) {}
      }
    }
  }
})();
