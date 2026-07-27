const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

p = p.replace('useRef<NodeJS.Timeout>()', 'useRef<ReturnType<typeof setTimeout>>()');
console.log('Fixed timer type');

fs.writeFileSync('src/app/page.tsx', p);
