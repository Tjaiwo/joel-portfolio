const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Replace text
p = p.replace(
  '"NO/LOW CODE HASHIRA."',
  '"LOW-CODE HASHIRA."'
);

// 2. Bump to 40px
p = p.replace('text-[32px] md:text-6xl', 'text-[40px] md:text-6xl');

// 3. Remove the minWidth hack
p = p.replace('inline-block" style={{ minWidth: "320px" }}', '');

console.log('✅ "LOW-CODE HASHIRA." at 40px mobile');

fs.writeFileSync('src/app/page.tsx', p);
