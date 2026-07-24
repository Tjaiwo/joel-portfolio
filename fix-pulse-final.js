const fs = require('fs');

// 1. Add pulse-chevron keyframe to globals.css
let css = fs.readFileSync('src/app/globals.css', 'utf8');

const keyframe = `
/* Accordion chevron pulse */
@keyframes pulse-chevron {
  0%, 100% { opacity: 0.5; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(2px); }
}
`;

// Insert before "/* Reveal animation */"
css = css.replace('/* Reveal animation */', keyframe + '\n/* Reveal animation */');
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Added pulse-chevron keyframe');

// 2. Ensure span has the animation class
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldSpan = `<motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0 ml-4 [animation:pulse-chevron_2s_ease-in-out_infinite]"
                    >`;

const newSpan = `<motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0 ml-4 [animation:pulse-chevron_2s_ease-in-out_infinite]"
                    >`;

if (p.includes('className="text-primary shrink-0 ml-4"')) {
  p = p.replace('className="text-primary shrink-0 ml-4"', 'className="text-primary shrink-0 ml-4 [animation:pulse-chevron_2s_ease-in-out_infinite]"');
  console.log('✅ Pulse class added to span');
}

fs.writeFileSync('src/app/page.tsx', p);
