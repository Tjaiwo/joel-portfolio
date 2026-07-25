const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Change text to LOW-CODE PRO
p = p.replace('"LOW-CODE HASHIRA."', '"LOW-CODE PRO."');

// 2. Set 36px
p = p.replace('text-[32px] md:text-6xl', 'text-[36px] md:text-6xl');

console.log('✅ LOW-CODE PRO at 36px mobile');
fs.writeFileSync('src/app/page.tsx', p);
