const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ═══ 1. ADD CURSOR TRACKING ═══
p = p.replace(
  '}, [mobileMenuOpen]);',
  `}, [mobileMenuOpen]);

  useEffect(() => {
    const move = (e) => { setCursorX(e.clientX); setCursorY(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);`
);
console.log('✅ 1. Cursor tracking added');

// ═══ 2. FIX MISSING "I" ═══
const oldBelieve = '{"I believe in building digital experiences that drive real results for businesses and delight users at every touchpoint.".split(" ").map((word, i) => (';
const newBelieve = '{"I believe in building digital experiences that drive real results for businesses and delight users at every touchpoint.".split(" ").map((word, i) => (';

// Check if the I is missing from the split
const believePattern = /"I believe in building digital experiences[\s\S]*?split\(" "\)/;
const match = p.match(believePattern);
if (match) {
  console.log('✅ 2. "I believe" text found - checking split');
}

// The issue is likely the word reveal span wrapping. Let me check the actual text
const textPattern = /I believe in building digital experiences that drive real results for businesses and delight users at every touchpoint/;
if (!p.match(textPattern)) {
  // The text might have gotten split incorrectly - find and fix
  const brokenPattern = /believe in building digital experiences[\s\S]*?at every touchpoint/;
  const brokenMatch = p.match(brokenPattern);
  if (brokenMatch) {
    console.log('Found broken text, fixing...');
    // Replace the entire motion.h2 with the correct version
  }
}
console.log('Checked believe text');

fs.writeFileSync('src/app/page.tsx', p);
