const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ 1. HERO TEXT BLUR REVEAL ON LOAD ═══
// Add CSS keyframes
css += `
@keyframes hero-blur-reveal {
  0% { opacity: 0; transform: translateY(28px); filter: blur(12px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}
.hero-blur-reveal {
  opacity: 0;
  animation: hero-blur-reveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@media (prefers-reduced-motion: reduce) {
  .hero-blur-reveal { animation: none; opacity: 1; }
}
`;

// Apply to hero h1 and subtitle
// h1 gets delay 0.25s
p = p.replace(
  'className="text-[36px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-6 glow-text"',
  'className="hero-blur-reveal text-[36px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-6 glow-text" style={{ animationDelay: "0.25s" }}'
);

// Subtitle gets delay 0.42s
p = p.replace(
  'className="text-[18px] text-muted-foreground max-w-xl leading-relaxed mb-8"',
  'className="hero-blur-reveal text-[18px] text-muted-foreground max-w-xl leading-relaxed mb-8" style={{ animationDelay: "0.42s" }}'
);

// Available badge gets delay 0.1s
p = p.replace(
  'className="mb-4"',
  'className="hero-blur-reveal mb-4" style={{ animationDelay: "0.1s" }}'
);

console.log('✅ 1. Hero blur reveal on load');

// ═══ 2. GLASS PILL FOR AVAILABLE BADGE ═══
const oldBadge = '<span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[12px] font-mono">';
const newBadge = '<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary text-[12px] font-mono shadow-[0_0_20px_rgba(80,200,120,0.1)]">';

p = p.replace(oldBadge, newBadge);
console.log('✅ 2. Glass pill badge');

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
