const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Change to 34px
p = p.replace('text-[36px] md:text-6xl', 'text-[34px] md:text-6xl');

// 2. Make typewriter cursor green
p = p.replace(
  '<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>',
  '<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }} className="text-primary">|</motion.span>'
);

console.log('✅ 34px mobile + green typewriter cursor');

fs.writeFileSync('src/app/page.tsx', p);
