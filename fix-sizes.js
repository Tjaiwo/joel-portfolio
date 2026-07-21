const fs = require('fs');
let n = 0;

// 1. Force hero h1 to 40px on mobile via CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');
if (!css.includes('hero-heading')) {
  css += '\n/* Force hero heading size on mobile */\n@media (max-width: 767px) {\n  .hero-heading {\n    font-size: 40px !important;\n    line-height: 44px !important;\n  }\n}\n';
  fs.writeFileSync('src/app/globals.css', css);
  console.log('globals.css: hero-heading rule added');
  n++;
} else { console.log('globals.css: already has hero-heading rule'); }

// 2. Add hero-heading class to the h1 in page.tsx
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
const h1Old = 'className="text-[40px] md:text-[72px] font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text"';
const h1Old2 = 'className="text-[40px] md:text-[72px] font-bold tracking-tight leading-[0.95] mb-6 glow-text"';
const h1New = 'className="hero-heading text-[40px] md:text-[72px] font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text"';
if (p.includes(h1Old)) { p = p.replace(h1Old, h1New); n++; }
else if (p.includes(h1Old2)) { p = p.replace(h1Old2, h1New); n++; }

// 3. Section headers: 32px -> 28px on mobile
const secOld = 'text-[32px] md:text-[40px] font-bold mb-12';
const secNew = 'text-[28px] md:text-[40px] font-bold mb-12';
if (p.includes(secOld)) {
  const count = (p.match(/text-\[32px\] md:text-\[40px\] font-bold mb-12/g) || []).length;
  p = p.split(secOld).join(secNew);
  n += count;
  console.log('page.tsx: ' + count + ' section headers -> 28px mobile');
}

// 4. Description: 18px on mobile
const dOld = 'text-[16px] md:text-[18px] text-muted-foreground w-full lg:w-4/5';
const dOld2 = 'text-[18px] text-muted-foreground w-full lg:w-4/5';
if (p.includes(dOld)) { p = p.replace(dOld, dOld2); n++; }
else if (p.includes(dOld2)) { console.log('Description already at 18px'); }

fs.writeFileSync('src/app/page.tsx', p);
console.log('Total changes: ' + n);
