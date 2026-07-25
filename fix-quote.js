const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

p = p.replace('className="text-foreground/70 >', 'className="text-foreground/70">');
console.log('✅ Fixed missing quote');

fs.writeFileSync('src/app/page.tsx', p);
