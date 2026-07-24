const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ═══ 1. ADD SOUND TO ALL CLICKABLE ELEMENTS ═══
// Add a global click listener instead of per-button
const oldEffect = `  useEffect(() => {
    const move = (e) => { setCursorX(e.clientX); setCursorY(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);`;

const newEffect = `  useEffect(() => {
    const move = (e) => { setCursorX(e.clientX); setCursorY(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (!soundEnabled) return;
    const handler = (e) => {
      const el = e.target.closest('a, button, [role="button"], .clickable');
      if (el) playClick();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [soundEnabled]);`;

p = p.replace(oldEffect, newEffect);
console.log('✅ 1. Sound on all links/buttons');

// ═══ 2. HIDE CURSOR ON MOBILE/TOUCH ═══
const oldCursor1 = 'className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[99999]"';
const newCursor1 = 'className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[99999]"';

const oldCursor2 = 'className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[99998]"';
const newCursor2 = 'className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[99998]"';

p = p.replace(oldCursor1, newCursor1);
p = p.replace(oldCursor2, newCursor2);
console.log('✅ 2. Cursor hidden on mobile');

fs.writeFileSync('src/app/page.tsx', p);
