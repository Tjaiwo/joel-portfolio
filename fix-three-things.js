const fs = require('fs');

// ═══ 1. GRAIN MORE PRONOUNCED IN LIGHT MODE ═══
let css = fs.readFileSync('src/app/globals.css', 'utf8');

css += `
/* Grain more visible in light mode */
.light .grain-overlay,
:root:not(.dark) .grain-overlay {
  opacity: 0.09 !important;
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ 1. Grain 0.09 in light mode');

// ═══ 2. DARKER TYPEWRITER TEXT ═══
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Change text-muted-foreground to a darker shade on the typewriter
const oldTypewriterSpan = '<span className="text-muted-foreground">';
const newTypewriterSpan = '<span className="text-foreground/70">';

p = p.replace(oldTypewriterSpan, newTypewriterSpan);
console.log('✅ 2. Typewriter text darker');

// ═══ 3. INCREASE STAT FONT SIZE ═══
// text-lg md:text-xl -> text-xl md:text-2xl
const oldStatSize = 'className="text-lg md:text-xl font-bold text-primary"';
const newStatSize = 'className="text-xl md:text-2xl font-bold text-primary"';

p = p.replace(new RegExp(oldStatSize, 'g'), newStatSize);

// Also for CountUp
const oldCountUp = 'className="text-lg md:text-xl font-bold text-primary"';
const newCountUp = 'className="text-xl md:text-2xl font-bold text-primary"';

p = p.replace(new RegExp(oldCountUp, 'g'), newCountUp);
console.log('✅ 3. Stat font size increased');

fs.writeFileSync('src/app/page.tsx', p);
