/**
 * apply-v2.js — Applies the v2 case study structure (Clay Sky style)
 * with full parallax animations, block-based content, and Clay-style hero.
 */
const fs = require('fs');
const path = require('path');

const FILES = {
  'src/data/case-studies.ts': `DATA_PLACEHOLDER`,
  'src/components/case-study/hero.tsx': `HERO_PLACEHOLDER`,
  'src/components/case-study/intro.tsx': `INTRO_PLACEHOLDER`,
  'src/components/case-study/blocks.tsx': `BLOCKS_PLACEHOLDER`,
  'src/components/case-study/next-project.tsx': `NEXT_PLACEHOLDER`,
  'src/app/projects/[slug]/page.tsx': `PAGE_PLACEHOLDER`,
};

console.log('=== Applying v2 case study structure ===\n');

for (const [relPath, content] of Object.entries(FILES)) {
  const outPath = path.join(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  // Backup if exists
  if (fs.existsSync(outPath)) {
    const bakPath = outPath + '.v2.bak';
    if (!fs.existsSync(bakPath)) {
      fs.copyFileSync(outPath, bakPath);
      console.log('  backup: ' + relPath + '.v2.bak');
    }
  }

  fs.writeFileSync(outPath, content, 'utf8');
  console.log('  ok ' + relPath + ' (' + content.length + ' bytes)');
}

console.log('\n=== Done ===');
console.log('\nTest: npm run dev');
console.log('Visit: http://localhost:3000/projects/elin-group');
