const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

p = p.replace('useRef<ReturnType<typeof setTimeout>>()', 'useRef<any>(null)');
console.log('Fixed with any type');

fs.writeFileSync('src/app/page.tsx', p);
