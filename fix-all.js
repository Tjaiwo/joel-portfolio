const fs = require('fs');
const path = require('path');
let changes = 0;

// ─── 0. Create avatar from base64 (pixel art, optimized) ───
// If you already have joel-avatar.png in public/, skip this
const avatarPath = path.join('public', 'joel-avatar.png');
if (!fs.existsSync(avatarPath)) {
  // Download from a temporary hosting - runs once
  const https = require('https');
  const url = 'https://i.imgur.com/placeholder.png'; // We'll handle this separately
  console.log('! Avatar not found in public/. Skipping photo addition.');
  console.log('  (Will add photo in a follow-up)');
}

// ─── 1. Fix page.tsx ───
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1a. Hero H1: ANY text-[Npx] before md:text → 40px
const h1Regex = /(<motion\.h1[\s\S]*?className=")text-\[\d+px\](\s+md:text-)/;
if (h1Regex.test(p)) {
  p = p.replace(h1Regex, '$1text-[40px]$2');
  console.log('OK Hero H1 mobile -> 40px');
  changes++;
}

// 1b. Hero H1 line-height
const lhRegex = /(className="[^"]*text-\[40px\][^"]*?)(?:leading-\[[\d.]+px\]|leading-\[[\d.]+\]|leading-\w+)([^"]*")/;
if (lhRegex.test(p)) {
  p = p.replace(lhRegex, '$1leading-[44px] md:leading-[0.95]$2');
  console.log('OK Hero H1 line-height -> 44px mobile');
  changes++;
}

// 1c. Hero description: find I&apos;m, walk back to className
const descIdx = p.indexOf("I&apos;m");
if (descIdx > -1) {
  let start = p.lastIndexOf('<motion.p', descIdx);
  if (start > -1) {
    let cs = p.indexOf('className="', start);
    let ce = p.indexOf('"', cs + 11);
    if (cs > -1 && ce > -1 && cs < descIdx) {
      let cls = p.substring(cs + 11, ce);
      let newCls = cls.replace(/text-(?:sm|\[\d+px\])(\s+md:text-\[\d+\])?/, 'text-[18px]');
      if (newCls !== cls) {
        p = p.substring(0, cs + 11) + newCls + p.substring(ce);
        console.log('OK Hero description -> 18px');
        changes++;
      }
    }
  }
}

// 1d. Section headers with mb-12
const secRegex = /(<motion\.h2[^>]*className=")text-(?:xl|\[\d+px\])(\s+md:text-\[\d+px\][^"]*font-bold\s+mb-12")/g;
let sc = 0;
p = p.replace(secRegex, (m, pre, post) => { sc++; return pre + 'text-[28px]' + post; });
if (sc) { console.log('OK ' + sc + ' section headers -> 28px mobile'); changes += sc; }

// 1e. All remaining motion.h2
const h2r = /(<motion\.h2[^>]*className=")text-\[\d+px\](\s+md:text-\[\d+px\][^"]*(?:font-bold|leading))/g;
let h2c = 0;
p = p.replace(h2r, (m, pre, post) => { h2c++; return pre + 'text-[28px]' + post; });
if (h2c) { console.log('OK ' + h2c + ' more h2 -> 28px mobile'); changes += h2c; }

// 1f. Remove broken style lines
const br = /^\s+style=\{\{\s*fontSize:.*\}\}\s*$/gm;
const bm = p.match(br);
if (bm) { p = p.replace(br, ''); console.log('OK Removed ' + bm.length + ' broken style lines'); changes += bm.length; }

// 1g. Remove hero-heading class
if (p.includes('hero-heading')) { p = p.replace(/\s*hero-heading/g, ''); console.log('OK Removed hero-heading'); changes++; }

// 1h. Add photo to About section
if (fs.existsSync(avatarPath) && !p.includes('joel-avatar')) {
  const ar = /(\/\* ─── ABOUT ─── \*\/\}\s*\n\s*<Section id="about"[^>]*>)\s*\n(\s*)<SectionLabel>/;
  if (ar.test(p)) {
    const pb = `
 $2<div className="mb-10 flex justify-center lg:justify-start">
 $2  <motion.div variants={fadeInUp} className="relative group">
 $2    <div className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-500 shadow-[0_0_40px_rgba(80,200,120,0.08)] group-hover:shadow-[0_0_60px_rgba(80,200,120,0.15)]">
 $2      <img src="/joel-avatar.png" alt="Joel Akinlosotu" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 $2    </div>
 $2    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary stat-pulse" />
 $2  </motion.div>
 $2</div>
 $2<SectionLabel>`;
    p = p.replace(ar, '$1\n' + pb);
    console.log('OK Photo added to About section');
    changes++;
  }
}

fs.writeFileSync('src/app/page.tsx', p);

// ─── 2. Clean globals.css ───
let css = fs.readFileSync('src/app/globals.css', 'utf8');
let cc = 0;
if (css.includes('MOBILE OVERRIDES')) { css = css.replace(/\/\* === MOBILE OVERRIDES[\s\S]*?\*\//g, ''); console.log('OK Cleaned MOBILE OVERRIDES'); cc++; }
if (css.includes('hero-heading')) { css = css.replace(/\/\*[\s\S]*?hero-heading[\s\S]*?\}\s*\}/g, ''); console.log('OK Cleaned hero-heading CSS'); cc++; }
if (css.includes('font-size: 16px !important')) { css = css.replace(/\/\*\s*[\s\S]*?font-size:\s*16px\s*!important[\s\S]*?\*\//g, ''); console.log('OK Cleaned !important block'); cc++; }
css = css.replace(/\n{4,}/g, '\n\n');
fs.writeFileSync('src/app/globals.css', css);
changes += cc;

console.log('\n=== TOTAL: ' + changes + ' changes ===');
if (changes === 0) { console.log('Nothing changed.'); process.exit(1); }
