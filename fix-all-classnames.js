const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix all broken classNames where the regex mangled the quote
p = p.replace(/className= active:scale-\[0\.97\]"/g, 'className="');
// Then add active:scale-[0.97] before the closing quote on buttons/links
p = p.replace(/hover:bg-primary\/90 transition-all"/g, 'hover:bg-primary/90 transition-all active:scale-[0.97]"');

console.log('✅ All classNames fixed');
fs.writeFileSync('src/app/page.tsx', p);
