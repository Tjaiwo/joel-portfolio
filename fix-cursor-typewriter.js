const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ═══ 1. FIX CURSOR - force visible ═══
const oldCursor1 = '<motion.div className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[99999]" animate={{ x: cursorX - 6, y: cursorY - 6 }} transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }} />';
const newCursor1 = '<motion.div className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[99999]" animate={{ x: cursorX - 8, y: cursorY - 8 }} transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }} style={{ opacity: cursorX > 0 ? 1 : 0 }} />';

const oldCursor2 = '<motion.div className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[99998]" animate={{ x: cursorX - 16, y: cursorY - 16 }} transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }} />';
const newCursor2 = '<motion.div className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[99998]" animate={{ x: cursorX - 16, y: cursorY - 16 }} transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }} style={{ opacity: cursorX > 0 ? 1 : 0 }} />';

p = p.replace(oldCursor1, newCursor1);
p = p.replace(oldCursor2, newCursor2);
console.log('✅ 1. Cursor always visible, opacity controlled by position');

// ═══ 2. CYCLING TYPEWRITER ═══
// Replace the fade cycler with a typewriter that cycles words
const oldCycler = `                  <motion.span
                    key={titleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {["DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"][titleIndex]}
                  </motion.span>`;

const newTypewriter = `                  <AnimatePresence mode="wait">
                    <motion.span
                      key={titleIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {useTypewriter([["DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"][titleIndex]], { loop: false, typeSpeed: 60 })}
                      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                    </motion.span>
                  </AnimatePresence>`;

p = p.replace(oldCycler, newTypewriter);
console.log('✅ 2. Cycling typewriter effect');

// ═══ 3. RESTORE useTypewriter HOOK ═══
const hook = `function useTypewriter(words, { loop = false, typeSpeed = 60, deleteSpeed = 40, pauseTime = 1500 } = {}) {
  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const word = words[wordIndex] || words[0] || "";
    let timer;
    if (!deleting && charIndex < word.length) {
      timer = setTimeout(() => setCharIndex(charIndex + 1), typeSpeed);
    } else if (!deleting && charIndex === word.length) {
      timer = setTimeout(() => setDeleting(true), pauseTime);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex(charIndex - 1), deleteSpeed);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((wordIndex + 1) % words.length);
    }
    setText(word.substring(0, charIndex));
    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex, words, typeSpeed, deleteSpeed, pauseTime]);

  return text;
}

`;

// Check if hook exists, if not add it
if (!p.includes('function useTypewriter(')) {
  p = p.replace("export default function Portfolio() {", hook + "\nexport default function Portfolio() {");
  console.log('✅ 3. useTypewriter hook added');
} else {
  // Replace existing
  const hookPattern = /function useTypewriter\([\s\S]*?return text;\n\}\n\n/;
  p = p.replace(hookPattern, hook);
  console.log('✅ 3. useTypewriter hook updated');
}

fs.writeFileSync('src/app/page.tsx', p);
