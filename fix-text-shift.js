const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Find the scramble text wrapper and add a min-height container
const oldScramble = `                <span className="text-foreground/70">
                  {useScramble(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"])}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                </span>`;

const newScramble = `                <span className="text-foreground/70 inline-block min-h-[1.2em]">
                  <span className="inline-block">
                    {useScramble(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"])}
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                  </span>
                </span>`;

p = p.replace(oldScramble, newScramble);
console.log('✅ Fixed-height container for scramble text');

// Also ensure the h1 doesn't shift - give it stable dimensions
const oldH1 = 'className="text-[40px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text"';
const newH1 = 'className="text-[40px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text min-h-[1.2em]"';

p = p.replace(oldH1, newH1);
console.log('✅ H1 minimum height set');

fs.writeFileSync('src/app/page.tsx', p);
