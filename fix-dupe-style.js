const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Merge the two style attributes on the h1
const oldH1Style = 'className="hero-blur-reveal text-[36px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-6 glow-text" style={{ animationDelay: "0.25s" }}\n                style={{ minHeight: \'clamp(48px, 12vw, 80px)\' }}';

const newH1Style = 'className="hero-blur-reveal text-[36px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-6 glow-text" style={{ animationDelay: "0.25s", minHeight: \'clamp(48px, 12vw, 80px)\' }}';

p = p.replace(oldH1Style, newH1Style);
console.log('✅ Merged duplicate style attributes');

fs.writeFileSync('src/app/page.tsx', p);
