const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

p = p.replace(
  'bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none',
  'bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none hero-bg-accent'
);
console.log('Breathing glow applied to hero accent');

fs.writeFileSync('src/app/page.tsx', p);
