const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ═══ 1. INSTANT CURSOR (no spring lag) ═══
const oldCursor1 = 'animate={{ x: cursorX - 8, y: cursorY - 8 }} transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}';
const newCursor1 = 'animate={{ x: cursorX - 8, y: cursorY - 8 }} transition={{ duration: 0.05, ease: "easeOut" }}';

const oldCursor2 = 'animate={{ x: cursorX - 16, y: cursorY - 16 }} transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}';
const newCursor2 = 'animate={{ x: cursorX - 16, y: cursorY - 16 }} transition={{ duration: 0.08, ease: "easeOut" }}';

p = p.replace(oldCursor1, newCursor1);
p = p.replace(oldCursor2, newCursor2);
console.log('✅ 1. Cursor now instant');

// ═══ 2. FIX "I" - force first word visible ═══
// The issue: first word "I" has initial opacity 0 but whileInView may not trigger on mobile
// Fix: remove whileInView from individual words, use parent animation instead
const oldParent = `              <motion.h2
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="text-[28px] md:text-[40px] font-bold leading-tight mb-8"
              >`;

const newParent = `              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-[28px] md:text-[40px] font-bold leading-tight mb-8"
              >`;

p = p.replace(oldParent, newParent);

// Now make words use parent's visibility via CSS instead of their own whileInView
const oldWords = `.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px", amount: 0.1 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="inline-block mr-[0.25em]"
                    style={{ display: "inline-block" }}
                  >
                    {word}
                  </motion.span>
                ))}`;

const newWords = `.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}`;

p = p.replace(oldWords, newWords);
console.log('✅ 2. Words animate on parent trigger, no viewport issues');

fs.writeFileSync('src/app/page.tsx', p);
