const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix Framer Motion ease type: number[] -> readonly tuple via 'as const'
// Matches ease: [0.25, 0.1, 0.25, 1] but NOT if already has 'as const' or 'as ['
const before = (p.match(/ease: \[[\d.,\s]+\](?!\s*as\s)/g) || []).length;
p = p.replace(/ease: (\[[\d.,\s]+\])(?!\s*as\s)/g, 'ease: $1 as const');
const after = (p.match(/ease: \[[\d.,\s]+\] as const/g) || []).length;

console.log('Fixed ' + (after - (p.match(/ease: \[[\d.,\s]+\] as const/g) || []).length + before) + ' ease arrays with as const');
console.log('Total ease with as const: ' + after);

fs.writeFileSync('src/app/page.tsx', p);
console.log('Done.');
