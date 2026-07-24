const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ 1. EXTEND TIMER TO 2 SECONDS ═══
p = p.replace(
  "useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 1000); return () => clearTimeout(t); }, []);",
  "useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 2000); return () => clearTimeout(t); }, []);"
);

// ═══ 2. BLOCK SITE CONTENT UNTIL PRELOADER DONE ═══
p = p.replace(
  '<main className="flex-1 lg:ml-[280px]">',
  '<main className="flex-1 lg:ml-[280px]" style={{ opacity: glitchDone ? 1 : 0, transition: "opacity 0.6s ease-out 0.3s" }}>'
);
console.log('✅ 1-2. Timer extended, site blocked until done');

// ═══ 3. REPLACE GLITCH OVERLAY WITH CINEMATIC VERSION ═══
const oldOverlay = `{!glitchDone && (
        <div className="fixed inset-0 z-[99999] bg-background flex items-center justify-center overflow-hidden">
          <div className="glitch-container">
            <h1 className="glitch-text text-4xl md:text-6xl font-bold text-primary" data-text="WELCOME">
              WELCOME
            </h1>
            <div className="glitch-scanlines" />
            <div className="glitch-flash" />
          </div>
        </div>
      )}`;

const newOverlay = `{!glitchDone && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="cinematic-preloader">
            <div className="preloader-scanlines" />
            <div className="preloader-vignette" />
            <div className="preloader-noise" />
            <div className="preloader-flash" />
            
            <div className="relative z-10 text-center">
              <div className="preloader-status text-[10px] md:text-[12px] font-mono text-primary/60 uppercase tracking-[0.5em] mb-6">
                <span className="animate-pulse">●</span> System Init
              </div>
              
              <h1 className="cinematic-text text-5xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tighter" data-text="WELCOME">
                WELCOME
              </h1>
              
              <div className="preloader-bar mt-8 mx-auto" />
              <div className="preloader-bar-fast mt-1 mx-auto" />
              
              <p className="text-[10px] md:text-[11px] font-mono text-muted-foreground/40 mt-6 uppercase tracking-[0.3em]">
                Loading<span className="preloader-dots">...</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}`;

p = p.replace(oldOverlay, newOverlay);
console.log('✅ 3. Cinematic preloader overlay');

// ═══ 4. REPLACE CSS WITH CINEMATIC VERSION ═══
css = css.replace(/\.glitch-text[\s\S]*?@keyframes glitch-flash[\s\S]*?\}/, '');

css += `
.cinematic-preloader { position: relative; text-align: center; }
.preloader-scanlines {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px);
  pointer-events: none; z-index: 2;
}
.preloader-vignette {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%);
  pointer-events: none; z-index: 3;
}
.preloader-noise {
  position: fixed; top: -50%; left: -50%; width: 200%; height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
  background-size: 128px 128px;
  pointer-events: none; z-index: 4;
  animation: noise-shift 0.3s steps(3) infinite;
}
.preloader-flash {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(80,200,120,0.08);
  pointer-events: none; z-index: 5;
  animation: flash-pulse 1.5s ease-in-out infinite;
}
.cinematic-text {
  position: relative;
  animation: text-glitch 2s ease-out forwards;
  text-shadow: 0 0 40px rgba(80,200,120,0.3), 0 0 80px rgba(80,200,120,0.1);
}
.cinematic-text::before,
.cinematic-text::after {
  content: attr(data-text);
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0;
}
.cinematic-text::before {
  color: #0ff;
  animation: chromatic-cyan 2s ease-out forwards;
  z-index: -1;
}
.cinematic-text::after {
  color: #f00;
  animation: chromatic-red 2s ease-out forwards;
  z-index: -1;
}
.preloader-bar {
  width: 0;
  height: 1px;
  background: rgba(80,200,120,0.6);
  animation: bar-load 1.8s ease-out forwards;
}
.preloader-bar-fast {
  width: 0;
  height: 1px;
  background: rgba(80,200,120,0.2);
  animation: bar-load-fast 1.2s ease-out forwards;
}
.preloader-dots { animation: dots-blink 0.8s steps(3) infinite; }
@keyframes text-glitch {
  0% { transform: translateX(0); opacity: 0.3; }
  10% { transform: translateX(-3px); opacity: 1; }
  20% { transform: translateX(3px); opacity: 0.8; }
  30% { transform: translateX(-1px); opacity: 1; }
  40% { transform: translateX(2px); opacity: 0.9; }
  60% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(0); opacity: 1; }
}
@keyframes chromatic-cyan {
  0% { opacity: 0; transform: translate(0); }
  15% { opacity: 0.6; transform: translate(-4px, -2px); }
  30% { opacity: 0; transform: translate(6px, 1px); }
  45% { opacity: 0.4; transform: translate(-2px, -1px); }
  60% { opacity: 0; transform: translate(3px, 0); }
  100% { opacity: 0; transform: translate(0); }
}
@keyframes chromatic-red {
  0% { opacity: 0; transform: translate(0); }
  15% { opacity: 0.6; transform: translate(4px, 2px); }
  30% { opacity: 0; transform: translate(-6px, -1px); }
  45% { opacity: 0.4; transform: translate(2px, 1px); }
  60% { opacity: 0; transform: translate(-3px, 0); }
  100% { opacity: 0; transform: translate(0); }
}
@keyframes bar-load { 0% { width: 0; } 100% { width: 120px; } }
@keyframes bar-load-fast { 0% { width: 0; } 40% { width: 0; } 100% { width: 60px; } }
@keyframes dots-blink { 0% { opacity: 0; } 33% { opacity: 1; } 66% { opacity: 0; } 100% { opacity: 1; } }
@keyframes noise-shift { 0%,100% { transform: translate(0,0); } 33% { transform: translate(-2px,1px); } 66% { transform: translate(2px,-1px); } }
@keyframes flash-pulse { 0%,100% { opacity: 0.04; } 50% { opacity: 0.12; } }
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ 4. Cinematic CSS');

fs.writeFileSync('src/app/page.tsx', p);
