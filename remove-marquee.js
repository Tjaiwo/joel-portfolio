const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove marquee usage
p = p.replace(/^\s*<SkillsMarquee \/>\s*\n\s*\n/, '');
p = p.replace('className="space-y-12 mt-20"', 'className="space-y-12"');

// Remove SkillsMarquee component
const marqueeStart = p.indexOf('function SkillsMarquee()');
const backToTop = p.indexOf('/* ──────────────────────── BACK TO TOP ──────────────────────── */');
if (marqueeStart > 0) {
  p = p.slice(0, marqueeStart) + p.slice(backToTop);
}

// Remove CSS
css = css.replace(/\.skills-marquee[\s\S]*\.marquee-tag:hover[\s\S]*?\}/, '');

console.log('✅ Marquee removed');
fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
