const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ═══ 1. REVERT once: false TO once: true ═══
p = p.replace(/viewport=\{\{ once: false, margin: "-100px" \}\}/g, 'viewport={{ once: true, margin: "-100px" }}');
p = p.replace(/viewport=\{\{ once: false, margin: "-50px" \}\}/g, 'viewport={{ once: true, margin: "-50px" }}');
console.log('✅ 1. Reverted to once: true');

// ═══ 2. FIX CURSOR ═══
// Remove mix-blend-difference and add higher z-index
const oldCursor1 = '<motion.div className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference" animate={{ x: cursorX - 6, y: cursorY - 6 }} transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }} />';
const newCursor1 = '<motion.div className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[99999]" animate={{ x: cursorX - 6, y: cursorY - 6 }} transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }} />';

const oldCursor2 = '<motion.div className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9998]" animate={{ x: cursorX - 16, y: cursorY - 16 }} transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }} />';
const newCursor2 = '<motion.div className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[99998]" animate={{ x: cursorX - 16, y: cursorY - 16 }} transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }} />';

p = p.replace(oldCursor1, newCursor1);
p = p.replace(oldCursor2, newCursor2);
console.log('✅ 2. Cursor z-index raised, blend mode removed');

// ═══ 3. CYCLING HERO TITLES ═══
// Replace the typewriter with a cycling text effect
const oldTypewriter = `                  {useTypewriter(["DEVELOPER"], { loop: false, typeSpeed: 80 })}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} className="inline-block ml-0.5">|</motion.span>`;

const newCycler = `                  <motion.span
                    key={titleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {["DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"][titleIndex]}
                  </motion.span>`;

p = p.replace(oldTypewriter, newCycler);
console.log('✅ 3. Cycling hero titles');

// ═══ 4. ADD titleIndex STATE ═══
p = p.replace(
  'const [cursorY, setCursorY] = useState(-100);',
  'const [cursorY, setCursorY] = useState(-100);\n  const [titleIndex, setTitleIndex] = useState(0);'
);

// Add cycling useEffect
p = p.replace(
  '}, [mobileMenuOpen]);',
  '}, [mobileMenuOpen]);\n\n  useEffect(() => { const t = setInterval(() => setTitleIndex((i) => (i + 1) % 3), 2500); return () => clearInterval(t); }, []);'
);
console.log('✅ 4. Title cycling state + interval');

// ═══ 5. ADD AIO TO SKILLS ═══
p = p.replace(
  '"Make (Integromat)", "Zapier", "Airtable"',
  '"Make (Integromat)", "Zapier", "Airtable", "AIO"'
);
console.log('✅ 5. AIO added to skills');

// ═══ 6. REMOVE UNUSED useTypewriter HOOK ═══
const hookStart = p.indexOf('function useTypewriter(');
const hookEnd = p.indexOf('\nexport default function Portfolio() {');
if (hookStart > 0 && hookEnd > hookStart) {
  p = p.slice(0, hookStart) + p.slice(hookEnd);
  console.log('✅ 6. Removed unused useTypewriter hook');
}

fs.writeFileSync('src/app/page.tsx', p);
