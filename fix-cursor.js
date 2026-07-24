const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add cursor tracking useEffect
// Find a useEffect to insert after
const target = '}, [mobileMenuOpen]);';
const cursorEffect = `
  useEffect(() => {
    const move = (e) => { setCursorX(e.clientX); setCursorY(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);`;

if (p.includes(target)) {
  p = p.replace(target, target + cursorEffect);
  console.log('✅ Cursor tracking useEffect added');
}

// 2. Fix cursor elements to use motion x/y instead of style translate
const oldCursor1 = '<motion.div className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference" style={{ translateX: cursorX - 6, translateY: cursorY - 6 }} />';
const newCursor1 = '<motion.div className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference" animate={{ x: cursorX - 6, y: cursorY - 6 }} transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }} />';

const oldCursor2 = '<motion.div className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9998]" style={{ translateX: cursorX - 16, translateY: cursorY - 16 }} />';
const newCursor2 = '<motion.div className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9998]" animate={{ x: cursorX - 16, y: cursorY - 16 }} transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }} />';

p = p.replace(oldCursor1, newCursor1);
p = p.replace(oldCursor2, newCursor2);
console.log('✅ Cursor elements fixed to use motion x/y');

fs.writeFileSync('src/app/page.tsx', p);
