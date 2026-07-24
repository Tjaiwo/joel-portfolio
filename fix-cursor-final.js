const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ═══ 1. ADD CURSOR TRACKING ═══
const target = `  useEffect(() => {
    setCurrency(getCurrencyFromTimezone());
  }, []);`;

const withCursor = target + `

  useEffect(() => {
    const move = (e) => { setCursorX(e.clientX); setCursorY(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);`;

p = p.replace(target, withCursor);
console.log('✅ 1. Cursor tracking added');

// ═══ 2. FIX MISSING "I" ON MOBILE ═══
// The word "I" wrapped in motion.span with inline-block can collapse
// Change mr-[0.25em] to include a non-breaking behavior
const oldWordSpan = 'className="inline-block mr-[0.25em]"';
const newWordSpan = 'className="inline-block mr-[0.25em] min-w-[0.5em]"';

p = p.replace(new RegExp(oldWordSpan, 'g'), newWordSpan);
console.log('✅ 2. Fixed word spacing for mobile');

fs.writeFileSync('src/app/page.tsx', p);
