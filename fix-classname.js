const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix broken className on submit button
const broken = 'className= active:scale-[0.97]"w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-medium text-sm md:text-[18px] rounded-md hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(80,200,120,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"';

const fixed = 'className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-medium text-sm md:text-[18px] rounded-md hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(80,200,120,0.15)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]"';

p = p.replace(broken, fixed);
console.log('✅ Fixed broken className');

fs.writeFileSync('src/app/page.tsx', p);
