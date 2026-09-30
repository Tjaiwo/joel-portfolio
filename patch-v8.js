/**
 * patch-v8.js
 * 1. Remove "View live page" badge from hero
 * 2. Move metadata section up 10px on mobile (reduce py-10 to py-6 on mobile)
 * 3. Update dates for 5 case studies
 */
const fs = require('fs');

// ─────────────────────────────────────────────────────────────
// 1 & 2: Patch hero.tsx — remove "View live page" badge + reduce mobile padding
// ─────────────────────────────────────────────────────────────
const HERO_FILE = 'src/components/case-study/hero.tsx';
if (fs.existsSync(HERO_FILE)) {
  let h = fs.readFileSync(HERO_FILE, 'utf8');
  fs.writeFileSync(HERO_FILE + '.v8.bak', h, 'utf8');

  // Remove the "View live page" badge block (the {cs.heroImageLink && ...} JSX)
  // Pattern matches the whole conditional rendering block
  const badgeRegex = /\s*\{cs\.heroImageLink && \([\s\S]*?\)\s*\}/;
  if (badgeRegex.test(h)) {
    h = h.replace(badgeRegex, '');
    console.log('  ok removed "View live page" badge from hero');
  } else {
    console.log('  - badge pattern not found');
  }

  // Reduce mobile padding on the content container
  // Was: py-10 sm:px-8 lg:px-12
  // New: py-6 sm:px-8 lg:px-12 (16px less top padding on mobile)
  const oldPad = 'py-10 sm:px-8 lg:px-12';
  const newPad = 'py-6 sm:px-8 lg:px-12';
  if (h.includes(oldPad)) {
    h = h.replace(oldPad, newPad);
    console.log('  ok reduced mobile padding (py-10 -> py-6)');
  }

  fs.writeFileSync(HERO_FILE, h, 'utf8');
}

// ─────────────────────────────────────────────────────────────
// 3: Update dates in case-studies.ts
// ─────────────────────────────────────────────────────────────
const DATA_FILE = 'src/data/case-studies.ts';
if (fs.existsSync(DATA_FILE)) {
  let d = fs.readFileSync(DATA_FILE, 'utf8');
  fs.writeFileSync(DATA_FILE + '.v8.bak', d, 'utf8');

  const dateUpdates = [
    // Evan Micky
    { slug: 'evan-micky', oldDate: 'October 2025', newDate: 'July 2026' },
    // Designed Spaces by Yemi
    { slug: 'designed-spaces', oldDate: 'June 2026', newDate: 'May 2024' },
    // Cedar Rush
    { slug: 'cedar-rush', oldDate: 'September 2025', newDate: 'February 2026' },
    // Atom
    { slug: 'atomdsn', oldDate: 'July 2026', newDate: 'November 2024' },
    // Diamond Source
    { slug: 'diamond-source', oldDate: 'May 2026', newDate: 'September 2022' },
  ];

  let count = 0;
  for (const { slug, oldDate, newDate } of dateUpdates) {
    // Find the slug, then find the next 'date:' field after it, then replace its value
    const slugIdx = d.indexOf('slug: "' + slug + '"');
    if (slugIdx === -1) {
      console.log('  ! slug not found: ' + slug);
      continue;
    }

    const dateIdx = d.indexOf('date:', slugIdx);
    if (dateIdx === -1) {
      console.log('  ! date field not found after slug: ' + slug);
      continue;
    }

    // Find the date value (between quotes)
    const valueStart = d.indexOf('"', dateIdx) + 1;
    const valueEnd = d.indexOf('"', valueStart);
    const currentValue = d.substring(valueStart, valueEnd);

    if (currentValue === newDate) {
      console.log('  - ' + slug + ' date already ' + newDate);
      continue;
    }

    // Replace the date value
    d = d.substring(0, valueStart) + newDate + d.substring(valueEnd);
    count++;
    console.log('  ok ' + slug + ': "' + currentValue + '" -> "' + newDate + '"');
  }

  fs.writeFileSync(DATA_FILE, d, 'utf8');
  console.log('\n  ok ' + count + ' dates updated');
}

console.log('\n=== Done ===');
console.log('Test: npm run dev');
