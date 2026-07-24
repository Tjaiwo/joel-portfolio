const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ 1. SMOOTH PAGE TRANSITIONS ═══
// Add AnimatePresence to the main content wrapper
const mainStart = '<main className="relative min-h-screen">';
const mainWithTransition = '<AnimatePresence mode="wait">\n      <motion.main\n        key="main-content"\n        initial={{ opacity: 0 }}\n        animate={{ opacity: 1 }}\n        exit={{ opacity: 0 }}\n        transition={{ duration: 0.3 }}\n        className="relative min-h-screen"\n      >';

p = p.replace(mainStart, mainWithTransition);

// Close the motion.main and AnimatePresence
const mainClose = '</main>';
const mainCloseWithTransition = '      </motion.main>\n    </AnimatePresence>';

p = p.replace(mainClose, mainCloseWithTransition);
console.log('✅ 1. Page transitions added');

// ═══ 2. SOUND EFFECTS ═══
// Add click sound function and state
const stateLine = 'const [cursorY, setCursorY] = useState(-100);';
const soundState = stateLine + '\n  const [soundEnabled, setSoundEnabled] = useState(false);';

p = p.replace(stateLine, soundState);

// Add sound utility function
const soundUtil = `
function playClick() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 1200;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {}
}

`;

p = p.replace("export default function Portfolio() {", soundUtil + "\nexport default function Portfolio() {");
console.log('✅ Sound utility added');

// Add sound toggle button near the theme toggle
// Find the header area
const headerArea = '<ThemeToggle />';
const headerWithSound = `<ThemeToggle />
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-md border border-border hover:border-primary/30 transition-colors text-[11px] font-mono text-muted-foreground hover:text-primary"
              title={soundEnabled ? "Sound on" : "Sound off"}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>`;

p = p.replace(headerArea, headerWithSound);
console.log('✅ Sound toggle added');

// Add onClick with sound to CTA buttons
p = p.replace(
  'onClick={() => scrollTo("contact")}',
  'onClick={() => { if (soundEnabled) playClick(); scrollTo("contact"); }}'
);
console.log('✅ Sound on CTA buttons');

fs.writeFileSync('src/app/page.tsx', p);

// Add page transition CSS
css += `
/* Page transitions */
main {
  will-change: opacity;
}
`;
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Transition CSS added');
