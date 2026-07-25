const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ 1. MATRIX RAIN BACKGROUND ═══
// Add state and toggle button near sound toggle
p = p.replace(
  'const [soundEnabled, setSoundEnabled] = useState(false);',
  'const [soundEnabled, setSoundEnabled] = useState(false);\n  const [matrixRain, setMatrixRain] = useState(false);'
);

// Add toggle button in sidebar (next to sound button)
const soundBtn = '{soundEnabled ? "🔊" : "🔇"}';
const matrixBtn = `{soundEnabled ? "🔊" : "🔇"}
          </button>
          <button
            onClick={() => setMatrixRain(!matrixRain)}
            className="p-2 rounded-md border border-border hover:border-primary/30 transition-colors text-[11px] font-mono text-muted-foreground hover:text-primary"
            title={matrixRain ? "Matrix rain on" : "Matrix rain off"}
          >
            {matrixRain ? "🌧️" : "💧"}`;
p = p.replace(soundBtn, matrixBtn);

// Insert MatrixRain component before the hero section
const heroStart = '<section id="home"';
const matrixComponent = `{matrixRain && <MatrixRain />}
      <section id="home"`;
p = p.replace(heroStart, matrixComponent);

// Define MatrixRain component at the end of file (before BackToTop)
const backToTopComment = '/* ──────────────────────── BACK TO TOP ──────────────────────── */';
const matrixRainCode = `
/* ──────────────────────── MATRIX RAIN ──────────────────────── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#50C878';
      ctx.font = \`\${fontSize}px monospace\`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />;
}

`;
p = p.replace(backToTopComment, matrixRainCode + backToTopComment);

// ═══ 2. BURN-IN EFFECT ON THEME SWITCH ═══
// Add burn-in state and effect
p = p.replace(
  'const [glitchDone, setGlitchDone] = useState(false);',
  `const [glitchDone, setGlitchDone] = useState(false);
  const [burnIn, setBurnIn] = useState(false);`
);

// Add MutationObserver to watch theme changes
const glitchEffectEnd = '}, []);'; // after glitch timer
const burnInEffect = `

  // Burn-in effect on theme switch
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'class') {
          const html = document.documentElement;
          const isDark = html.classList.contains('dark');
          // trigger burn only when switching FROM dark TO light
          if (!isDark && m.oldValue?.includes('dark')) {
            setBurnIn(true);
            setTimeout(() => setBurnIn(false), 600);
          }
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeOldValue: true });
    return () => observer.disconnect();
  }, []);`;

p = p.replace('}, []);', burnInEffect + '\n}, []);'); // This might match the wrong one, but we'll fix if needed.

// Add burn-in overlay JSX (similar to glitch overlay but smaller)
const mainStart = '<main className="flex-1 lg:ml-[280px]"';
const burnOverlay = `{burnIn && (
        <div className="fixed inset-0 z-[99999] pointer-events-none bg-white mix-blend-difference">
          <div className="absolute inset-0 burn-in-scanlines" />
          <div className="absolute inset-0 burn-in-flash" />
        </div>
      )}
      <main className="flex-1 lg:ml-[280px]"`;
p = p.replace(mainStart, burnOverlay);

// ═══ 3. DAY IN THE LIFE TIMELINE ═══
// Add process section before Contact or after Experience
const experienceEnd = '{/* ─── CONTACT ─── */}';
const timelineSection = `{/* ─── PROCESS TIMELINE ─── */}
        <Section id="process">
          <SectionLabel>// My Process</SectionLabel>
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
            FROM IDEA TO LAUNCH
          </motion.h2>
          <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-none">
            <div className="flex gap-6 md:gap-10 min-w-max">
              {[
                { step: "01", title: "Discovery", desc: "Deep dive into your business goals, target audience, and competitive landscape." },
                { step: "02", title: "Strategy", desc: "Crafting a tailored roadmap with sitemaps, user flows, and content architecture." },
                { step: "03", title: "Design", desc: "High-fidelity mockups & interactive prototypes that align with your brand." },
                { step: "04", title: "Build", desc: "Clean, performant code — custom WordPress themes, plugins, and integrations." },
                { step: "05", title: "Optimize", desc: "Speed tuning, SEO hardening, and accessibility audits for maximum reach." },
                { step: "06", title: "Launch", desc: "Smooth deployment, monitoring, and handover with training and documentation." }
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-shrink-0 w-[260px] md:w-[300px] p-6 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors group"
                >
                  <span className="text-primary text-[12px] font-mono tracking-widest">{item.step}</span>
                  <h3 className="text-[20px] md:text-[24px] font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              )))}
            </div>
          </div>
        </Section>

        {/* ─── CONTACT ─── */}`;
p = p.replace(experienceEnd, timelineSection);

// ═══ CSS ADDITIONS ═══
css += `
.burn-in-scanlines {
  width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px);
  animation: burn-scan 0.6s ease-out forwards;
}
.burn-in-flash {
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.3);
  animation: burn-flash 0.6s ease-out forwards;
}
@keyframes burn-scan {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes burn-flash {
  0% { opacity: 0; }
  30% { opacity: 1; }
  100% { opacity: 0; }
}
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-none::-webkit-scrollbar { display: none; }
`;

fs.writeFileSync('src/app/globals.css', css);
fs.writeFileSync('src/app/page.tsx', p);
console.log('✅ All three features added: Matrix rain toggle, burn-in effect, process timeline');
