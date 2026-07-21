const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let n = 0;

// 1. H1: force 40px on mobile + line-height 44px (1.1x of 40px)
const patterns = [
  'text-[40px] md:text-[72px] font-bold tracking-tight leading-[0.95] mb-6',
  'text-[40px] md:text-[72px] font-bold tracking-tight leading-[30px] md:leading-[0.95] mb-6',
  'text-[40px] md:text-[72px] font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6',
];
const h1New = 'text-[40px] md:text-[72px] font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6';
for (const old of patterns) {
  if (p.includes(old)) { p = p.replace(old, h1New); n++; break; }
}

// 2. Description: 18px on mobile
const descOld = 'text-[16px] md:text-[18px] text-muted-foreground w-full lg:w-4/5';
const descOld2 = 'text-[18px] text-muted-foreground w-full lg:w-4/5';
const descNew = 'text-[18px] text-muted-foreground w-full lg:w-4/5';
if (p.includes(descOld)) { p = p.replace(descOld, descNew); n++; }
else if (p.includes(descOld2)) { console.log('Description already at 18px'); }

fs.writeFileSync('src/app/page.tsx', p);
console.log('Changes applied: ' + n);
