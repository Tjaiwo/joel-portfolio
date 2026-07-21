const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

// 1. H1 heading: find the h1/motion.h1 with the hero heading
// Match the className line that contains the heading text size pattern
const h1Pattern = /className="([^"]*)\btext-\[40px\]\s+md:text-\[72px\]\b([^"]*)"/;
const h1Match = p.match(h1Pattern);
if (h1Match) {
  const newH1 = h1Match[0].replace(
    /text-\[40px\]\s+md:text-\[72px\]\b[^"]*/,
    'text-[40px] md:text-[72px] font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text hero-heading"'
  ).replace(/className="[^"]+"/, (full) => {
    // Remove duplicates and clean up
    let classes = full.replace('className="', '').replace('"', '');
    // Add hero-heading if not present
    if (!classes.includes('hero-heading')) classes += ' hero-heading';
    // Ensure correct text/leading classes
    classes = classes.replace(/\bleading-\[\d+px\]\b/g, '').replace(/\bleading-\[[\d.]+\]\b/g, '');
    classes = classes.replace(/\s+/g, ' ').trim();
    return `className="${classes} text-[40px] md:text-[72px] font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text hero-heading"`;
  });
  p = p.replace(h1Match[0], newH1);
  changes++;
  console.log('✓ H1 updated with hero-heading class');
} else {
  console.log('⚠ H1 pattern not found - searching for FRONTEND fallback...');
  // Fallback: find by content
  const lines = p.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('FRONTEND') && !lines[i].includes('import')) {
      for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
        if (lines[j].includes('className="')) {
          let classes = lines[j].match(/className="([^"]+)"/)[1];
          if (!classes.includes('hero-heading')) classes += ' hero-heading';
          if (!classes.includes('leading-[44px]')) {
            classes = classes.replace(/\bleading-\S+\b/g, '');
            classes += ' leading-[44px] md:leading-[0.95]';
          }
          classes = classes.replace(/\s+/g, ' ').trim();
          lines[j] = `            className="${classes}"`;
          changes++;
          console.log('✓ H1 updated via fallback');
          break;
        }
      }
      break;
    }
  }
  p = lines.join('\n');
}

// 2. Section headers: match motion.h2 with fadeInUp and font-bold mb-12
const secPattern = /(<motion\.h2[^>]*variants=\{fadeInUp\}[^>]*>\s*\n\s*)([^<]*className="[^"]*font-bold mb-12[^"]*")([^<]*)/g;
let secMatch;
let secCount = 0;
while ((secMatch = secPattern.exec(p)) !== null) {
  const oldClass = secMatch[2];
  if (oldClass.includes('text-[28px]')) {
    console.log('  Section header already at 28px');
  } else {
    const newClass = oldClass.replace(/text-\[\d+px\](\s+md:text-\[\d+px\])?/, 'text-[28px] md:text-[40px]');
    p = p.replace(oldClass, newClass);
    secCount++;
  }
}
console.log(`✓ Section headers updated: ${secCount}`);

// 3. Description: find by "Joel Akinlosotu" with proper parentheses
const descPattern = /(className="[^"]*)\btext-\[(?:16|18)\d*px\](?:\s+md:text-\[\d+px\])?([^"]*muted-foreground[^"]*leading-relaxed[^"]*")/;
const descMatch = p.match(descPattern);
if (descMatch) {
  const newDesc = descMatch[0].replace(
    /\btext-\[\d+px\](?:\s+md:text-\[\d+px\])?/,
    'text-[18px]'
  );
  p = p.replace(descMatch[0], newDesc);
  changes++;
  console.log('✓ Description set to 18px');
} else {
  console.log('⚠ Description pattern not found (may already be fixed)');
}

fs.writeFileSync('src/app/page.tsx', p);

// 4. CSS: append hero-heading rule safely
let css = fs.readFileSync('src/app/globals.css', 'utf8');
if (!css.includes('.hero-heading')) {
  const rule = `
@media (max-width: 767px) {
  .hero-heading {
    font-size: 40px !important;
    line-height: 44px !important;
  }
}
`;
  css += rule;
  fs.writeFileSync('src/app/globals.css', css);
  changes++;
  console.log('✓ CSS hero-heading rule added');
} else {
  console.log('  CSS hero-heading rule already exists');
}

console.log(`\n✅ Done. Total changes: ${changes}`);
