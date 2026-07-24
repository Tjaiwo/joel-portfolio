const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ 1. EXTEND TO 2.5s ═══
p = p.replace(
  "useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 2000); return () => clearTimeout(t); }, []);",
  "useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 2500); return () => clearTimeout(t); }, []);"
);

// ═══ 2. UPGRADE THE OVERLAY ═══
const oldOverlay = `{!glitchDone && (
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

const newOverlay = `{!glitchDone && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="cinematic-preloader">
            <div className="preloader-scanlines" />
            <div className="preloader-scanlines-heavy" />
            <div className="preloader-vignette" />
            <div className="preloader-noise" />
            <div className="preloader-flash" />
            <div className="preloader-glitch-slice preloader-slice-1" />
            <div className="preloader-glitch-slice preloader-slice-2" />
            <div className="preloader-glitch-slice preloader-slice-3" />
            
            <div className="relative z-10 text-center">
              <div className="preloader-boot-seq text-[9px] md:text-[10px] font-mono text-primary/40 uppercase tracking-[0.4em] mb-8">
                <div>SYS_BOOT_SEQ_v2.4</div>
                <div className="mt-1">INITIALIZING_KERNEL<span className="preloader-dots">...</span></div>
              </div>
              
              <div className="preloader-text-wrapper">
                <h1 className="cinematic-text text-6xl md:text-8xl lg:text-9xl font-black text-primary tracking-tighter" data-text="WELCOME">
                  WELCOME
                </h1>
              </div>
              
              <div className="preloader-bar mt-10 mx-auto" />
              <div className="preloader-bar-fast mt-1 mx-auto" />
              
              <p className="text-[9px] md:text-[10px] font-mono text-primary/30 mt-8 uppercase tracking-[0.4em]">
                ESTABLISHING_CONNECTION<span className="preloader-dots">...</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}`;

p = p.replace(oldOverlay, newOverlay);
console.log('✅ 1-2. Cinematic v2 overlay');

// ═══ 3. UPGRADE CSS ═══
css = css.replace(/\.cinematic-preloader[\s\S]*/, ''); // wipe old cinematic CSS

css += `
.cinematic-preloader { position: relative; text-align: center; width: 100%; }
.preloader-scanlines {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px);
  pointer-events: none; z-index: 2;
}
.preloader-scanlines-heavy {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px);
  pointer-events: none; z-index: 2;
}
.preloader-vignette {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%);
  pointer-events: none; z-index: 3;
}
.preloader-noise {
  position: fixed; top: -50%; left: -50%; width: 200%; height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E");
  background-size: 100px 100px;
  pointer-events: none; z-index: 4;
  animation: noise-shift 0.25s steps(4) infinite;
}
.preloader-flash {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(80,200,120,0.06);
  pointer-events: none; z-index: 5;
  animation: flash-cinematic 2.5s ease-out forwards;
}
.preloader-glitch-slice {
  position: fixed; left: -10%; width: 120%; height: 4px;
  background: rgba(80,200,120,0.3);
  pointer-events: none; z-index: 6;
  opacity: 0;
}
.preloader-slice-1 { top: 25%; animation: slice-move 2.5s ease-out forwards; }
.preloader-slice-2 { top: 50%; animation: slice-move 2.5s ease-out 0.1s forwards; }
.preloader-slice-3 { top: 75%; animation: slice-move 2.5s ease-out 0.2s forwards; }
.preloader-text-wrapper {
  position: relative;
  animation: text-warp 2.5s ease-out forwards;
}
.cinematic-text {
  position: relative;
  text-shadow: 0 0 60px rgba(80,200,120,0.4), 0 0 120px rgba(80,200,120,0.15), 0 0 200px rgba(80,200,120,0.05);
  animation: text-flicker 2.5s ease-out forwards;
}
.cinematic-text::before,
.cinematic-text::after {
  content: attr(data-text);
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0;
}
.cinematic-text::before {
  color: #0ff;
  animation: chromatic-cyan-v2 2.5s ease-out forwards;
}
.cinematic-text::after {
  color: #f00;
  animation: chromatic-red-v2 2.5s ease-out forwards;
}
.preloader-bar {
  width: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(80,200,120,0.8), transparent);
  animation: bar-cinematic 2.2s ease-out forwards;
}
.preloader-bar-fast {
  width: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(80,200,120,0.3), transparent);
  animation: bar-cinematic-fast 1.5s ease-out forwards;
}
.preloader-boot-seq { opacity: 0; animation: fade-in-up 0.6s ease-out 0.2s forwards; }
.preloader-dots { animation: dots-blink 0.6s steps(3) infinite; }
@keyframes text-warp {
  0% { transform: scale(0.95); filter: blur(4px); opacity: 0; }
  20% { transform: scale(1.02); filter: blur(0); opacity: 1; }
  40% { transform: scale(0.98); }
  60% { transform: scale(1.01); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes text-flicker {
  0%,100% { opacity: 1; }
  5% { opacity: 0.4; }
  10% { opacity: 1; }
  15% { opacity: 0.7; }
  20% { opacity: 1; }
  50% { opacity: 0.3; }
  52% { opacity: 1; }
  80% { opacity: 0.6; }
  82% { opacity: 1; }
}
@keyframes chromatic-cyan-v2 {
  0% { opacity: 0; transform: translate(0); }
  10% { opacity: 0.7; transform: translate(-8px, -3px); }
  20% { opacity: 0; transform: translate(10px, 2px); }
  35% { opacity: 0.5; transform: translate(-4px, -1px); }
  50% { opacity: 0; transform: translate(6px, 0); }
  70% { opacity: 0.3; transform: translate(-2px, -2px); }
  100% { opacity: 0; transform: translate(0); }
}
@keyframes chromatic-red-v2 {
  0% { opacity: 0; transform: translate(0); }
  10% { opacity: 0.7; transform: translate(8px, 3px); }
  20% { opacity: 0; transform: translate(-10px, -2px); }
  35% { opacity: 0.5; transform: translate(4px, 1px); }
  50% { opacity: 0; transform: translate(-6px, 0); }
  70% { opacity: 0.3; transform: translate(2px, 2px); }
  100% { opacity: 0; transform: translate(0); }
}
@keyframes slice-move {
  0% { opacity: 0; transform: translateX(-10%); }
  15% { opacity: 1; transform: translateX(5%); }
  25% { opacity: 0; transform: translateX(10%); }
  40% { opacity: 1; transform: translateX(-5%); }
  50% { opacity: 0; transform: translateX(-10%); }
  70% { opacity: 0.8; transform: translateX(3%); }
  80% { opacity: 0; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(0); }
}
@keyframes bar-cinematic { 0% { width: 0; } 80% { width: 0; } 100% { width: 180px; } }
@keyframes bar-cinematic-fast { 0% { width: 0; } 50% { width: 0; } 100% { width: 80px; } }
@keyframes flash-cinematic {
  0% { opacity: 0.02; }
  40% { opacity: 0.08; }
  60% { opacity: 0.02; }
  80% { opacity: 0.15; }
  100% { opacity: 0; }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes noise-shift { 0%,100% { transform: translate(0,0); } 25% { transform: translate(-3px,2px); } 50% { transform: translate(2px,-3px); } 75% { transform: translate(-1px,-1px); } }
@keyframes dots-blink { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ 3. Cinematic v2 CSS');

fs.writeFileSync('src/app/page.tsx', p);
