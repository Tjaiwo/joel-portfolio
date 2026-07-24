const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix missing closing quote on skill-tag classNames
p = p.replace(/className="skill-tag px-4 py-2\.5 rounded-lg text-sm md:text-\[18px\] text-foreground bg-card\/50\n/g, 'className="skill-tag px-4 py-2.5 rounded-lg text-sm md:text-[18px] text-foreground bg-card/50"\n');

console.log('✅ Fixed missing quotes');
fs.writeFileSync('src/app/page.tsx', p);
