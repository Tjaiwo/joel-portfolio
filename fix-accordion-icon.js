const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Make icon 2px bigger: w-4 h-4 lg:w-[18px] -> w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]
const oldSvg = `<svg className="w-4 h-4 lg:w-[18px] lg:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
const newSvg = `<svg className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;

p = p.replace(oldSvg, newSvg);
console.log('✅ Icon size +2px');

// 2. Add ripple pulse keyframes to globals.css
let css = fs.readFileSync('src/app/globals.css', 'utf8');

const rippleKeyframes = `
/* Accordion chevron ripple pulse */
@keyframes pulse-chevron {
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--primary), 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(var(--primary), 0); }
}`;

if (!css.includes('@keyframes pulse-chevron')) {
  css += rippleKeyframes;
  console.log('✅ Added ripple pulse keyframes');
} else {
  // Update existing keyframes
  const oldKF = /@keyframes pulse-chevron\s*\{[^}]*\}/;
  if (css.match(oldKF)) {
    css = css.replace(oldKF, rippleKeyframes.trim());
    console.log('✅ Updated pulse-chevron keyframes');
  }
}

fs.writeFileSync('src/app/globals.css', css);

// 3. Update the motion.span to apply pulse only when closed
const oldSpan = `<motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0 ml-4"
                      style={isOpen ? {} : { animation: 'pulse-chevron 2s ease-in-out infinite' }}
                    >`;

const newSpan = `<motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={\`text-primary shrink-0 ml-4 rounded-full \${!isOpen ? 'animate-[pulse-chevron_2s_ease-in-out_infinite]' : ''}\`}
                    >`;

if (p.includes(oldSpan)) {
  p = p.replace(oldSpan, newSpan);
  console.log('✅ Pulse with ripple waves when closed');
}

fs.writeFileSync('src/app/page.tsx', p);
