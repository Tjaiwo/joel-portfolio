const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ 1. REMOVE SHUFFLE FROM CARDS ═══
const oldShuffle = `<motion.div
                key={project.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(-1)}
                animate={{
                  scale: hoveredCard === idx ? 1.05 : hoveredCard >= 0 ? 0.97 : 1,
                  rotateZ: hoveredCard === idx ? 0 : hoveredCard >= 0 ? (idx - hoveredCard) * 2 : 0,
                  x: hoveredCard >= 0 && hoveredCard !== idx ? (idx - hoveredCard) * 8 : 0,
                  zIndex: hoveredCard === idx ? 10 : 1,
                  filter: hoveredCard >= 0 && hoveredCard !== idx ? 'brightness(0.85)' : 'brightness(1)',
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{ position: 'relative', transformOrigin: 'center center' }}
              >
                <motion.div id={project.slug ? \`project-\${project.slug}\` : undefined} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}>
                  <BrowserMockupCard project={project} index={idx} />
                </motion.div>
              </motion.div>`;

const cleanCards = `<motion.div key={project.id} id={project.slug ? \`project-\${project.slug}\` : undefined} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}>
                <BrowserMockupCard project={project} index={idx} />
              </motion.div>`;

p = p.replace(oldShuffle, cleanCards);

// Remove hoveredCard state
p = p.replace('const [hoveredCard, setHoveredCard] = useState(-1);\n', '');
console.log('✅ 1. Shuffle removed');

// ═══ 2. ADD GLITCH INTRO STATE ═══
p = p.replace(
  'const [soundEnabled, setSoundEnabled] = useState(false);',
  'const [soundEnabled, setSoundEnabled] = useState(false);\n  const [glitchDone, setGlitchDone] = useState(false);'
);

// Auto-finish glitch after 800ms
p = p.replace(
  '}, [mobileMenuOpen]);',
  `}, [mobileMenuOpen]);

  useEffect(() => {
    const t = setTimeout(() => setGlitchDone(true), 800);
    return () => clearTimeout(t);
  }, []);`
);
console.log('✅ 2. Glitch state + timer');

// ═══ 3. GLITCH OVERLAY JSX ═══
const mainStart = '<main className="relative min-h-screen">';
const glitchOverlay = `{!glitchDone && (
        <div className="fixed inset-0 z-[99999] bg-background flex items-center justify-center overflow-hidden">
          <div className="glitch-container">
            <h1 className="glitch-text text-4xl md:text-6xl font-bold text-primary" data-text="WELCOME">
              WELCOME
            </h1>
            <div className="glitch-scanlines" />
            <div className="glitch-flash" />
          </div>
        </div>
      )}
      <main className="relative min-h-screen">`;

p = p.replace(mainStart, glitchOverlay);
console.log('✅ 3. Glitch overlay added');

// ═══ 4. GLITCH CSS ═══
css += `
.glitch-container {
  position: relative;
  text-align: center;
}
.glitch-text {
  position: relative;
  animation: glitch-skew 0.8s ease-out forwards;
}
.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.glitch-text::before {
  animation: glitch-r 0.8s ease-out forwards;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  color: #f00;
  z-index: -1;
}
.glitch-text::after {
  animation: glitch-b 0.8s ease-out forwards;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  color: #0ff;
  z-index: -1;
}
.glitch-scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px);
  pointer-events: none;
  z-index: 2;
}
.glitch-flash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(80,200,120,0.15);
  pointer-events: none;
  z-index: 3;
  animation: glitch-flash 0.8s ease-out forwards;
}
@keyframes glitch-skew {
  0% { transform: skew(0deg); }
  20% { transform: skew(-2deg); }
  40% { transform: skew(2deg); }
  60% { transform: skew(-1deg); }
  80% { transform: skew(0.5deg); }
  100% { transform: skew(0deg); }
}
@keyframes glitch-r {
  0% { transform: translateX(0); opacity: 1; }
  20% { transform: translateX(-8px); opacity: 0.8; }
  40% { transform: translateX(12px); opacity: 0.6; }
  60% { transform: translateX(-4px); opacity: 0.4; }
  80% { transform: translateX(6px); opacity: 0.2; }
  100% { transform: translateX(0); opacity: 0; }
}
@keyframes glitch-b {
  0% { transform: translateX(0); opacity: 1; }
  20% { transform: translateX(8px); opacity: 0.8; }
  40% { transform: translateX(-12px); opacity: 0.6; }
  60% { transform: translateX(4px); opacity: 0.4; }
  80% { transform: translateX(-6px); opacity: 0.2; }
  100% { transform: translateX(0); opacity: 0; }
}
@keyframes glitch-flash {
  0% { opacity: 0.3; }
  30% { opacity: 0.6; }
  60% { opacity: 0.1; }
  100% { opacity: 0; }
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ 4. Glitch CSS added');

fs.writeFileSync('src/app/page.tsx', p);
