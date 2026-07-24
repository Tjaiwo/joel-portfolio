const fs = require('fs');

// 1. Restore the span to simple pulse class
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldSpan = `<motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={\`text-primary shrink-0 ml-4 rounded-full \${!isOpen ? 'animate-[pulse-chevron_2s_ease-in-out_infinite]' : ''}\`}
                    >`;

const newSpan = `<motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0 ml-4"
                    >`;

p = p.replace(oldSpan, newSpan);
fs.writeFileSync('src/app/page.tsx', p);
console.log('✅ Restored simple arrow (no pulse)');

// 2. Remove pulse-chevron keyframe from CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/\/\* Accordion chevron ripple pulse \*\/\n@keyframes pulse-chevron \{[^}]*\}\n/, '');
css = css.replace(/\n\n\n\/\* Reveal animation/, '\n\n/* Reveal animation'); // clean up extra blank lines
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Removed pulse-chevron keyframe');
