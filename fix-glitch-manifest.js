const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ 1. CHANGE TEXT TO MANIFEST ═══
p = p.replace(/WELCOME/g, 'MANIFEST');
p = p.replace(/welcome/g, 'manifest');
console.log('✅ 1. Text changed to MANIFEST');

// ═══ 2. MORE AGGRESSIVE GLITCH CSS ═══
css = css.replace(/\.cinematic-preloader[\s\S]*/, '');

css += `
.cinematic-preloader { position: relative; text-align: center; width: 100%; }
.preloader-scanlines {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.25) 1px, rgba(0,0,0,0.25) 3px);
  pointer-events: none; z-index: 2;
}
.preloader-scanlines-heavy {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(0,0,0,0.4) 6px, rgba(0,0,0,0.4) 8px);
  pointer-events: none; z-index: 2;
}
.preloader-vignette {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.9) 100%);
  pointer-events: none; z-index: 3;
}
.preloader-noise {
  position: fixed; top: -50%; left: -50%; width: 200%; height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.2'/%3E%3C/svg%3E");
  background-size: 80px 80px;
  pointer-events: none; z-index: 4;
  animation: noise-shift 0.2s steps(3) infinite;
}
.preloader-flash {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(80,200,120,0.08);
  pointer-events: none; z-index: 5;
  animation: flash-cinematic 1.5s ease-out forwards;
}
.preloader-glitch-slice {
  position: fixed; left: -10%; width: 130%; height: 6px;
  background: rgba(80,200,120,0.4);
  pointer-events: none; z-index: 6;
  opacity: 0;
}
.preloader-slice-1 { top: 20%; animation: slice-aggressive 1.5s ease-out forwards; }
.preloader-slice-2 { top: 45%; animation: slice-aggressive 1.5s ease-out 0.08s forwards; }
.preloader-slice-3 { top: 70%; animation: slice-aggressive 1.5s ease-out 0.15s forwards; }
.preloader-slice-4 { top: 88%; animation: slice-aggressive 1.5s ease-out 0.22s forwards; }
.preloader-text-wrapper {
  position: relative;
  animation: text-warp 1.5s ease-out forwards;
}
.cinematic-text {
  position: relative;
  text-shadow: 0 0 80px rgba(80,200,120,0.5), 0 0 160px rgba(80,200,120,0.2), 0 0 250px rgba(80,200,120,0.08);
  animation: text-flicker 1.5s ease-out forwards;
}
.cinematic-text::before,
.cinematic-text::after {
  content: attr(data-text);
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0;
}
.cinematic-text::before {
  color: #0ff;
  animation: chromatic-cyan-v3 1.5s ease-out forwards;
}
.cinematic-text::after {
  color: #f00;
  animation: chromatic-red-v3 1.5s ease-out forwards;
}
.preloader-bar {
  width: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(80,200,120,0.9), rgba(80,200,120,0.9), transparent);
  animation: bar-cinematic 1.3s ease-out forwards;
}
.preloader-bar-fast {
  width: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(80,200,120,0.4), transparent);
  animation: bar-cinematic-fast 0.9s ease-out forwards;
}
.preloader-boot-seq { opacity: 0; animation: fade-in-up 0.5s ease-out 0.15s forwards; }
.preloader-dots { animation: dots-blink 0.5s steps(3) infinite; }
@keyframes text-warp {
  0% { transform: scale(0.9) skew(-2deg); filter: blur(6px); opacity: 0; }
  15% { transform: scale(1.05) skew(1deg); filter: blur(0); opacity: 1; }
  30% { transform: scale(0.96) skew(-0.5deg); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); filter: blur(0); opacity: 1; }
}
@keyframes text-flicker {
  0%,100% { opacity: 1; }
  3% { opacity: 0.2; }
  6% { opacity: 1; }
  9% { opacity: 0.5; }
  12% { opacity: 1; }
  40% { opacity: 0.1; }
  43% { opacity: 1; }
  60% { opacity: 0.3; }
  63% { opacity: 1; }
  85% { opacity: 0.15; }
  88% { opacity: 1; }
}
@keyframes chromatic-cyan-v3 {
  0% { opacity: 0; transform: translate(0); }
  8% { opacity: 0.9; transform: translate(-12px, -4px); }
  18% { opacity: 0; transform: translate(15px, 3px); }
  30% { opacity: 0.7; transform: translate(-6px, -2px); }
  45% { opacity: 0; transform: translate(8px, 0); }
  65% { opacity: 0.5; transform: translate(-3px, -3px); }
  80% { opacity: 0; transform: translate(4px, 1px); }
  100% { opacity: 0; transform: translate(0); }
}
@keyframes chromatic-red-v3 {
  0% { opacity: 0; transform: translate(0); }
  8% { opacity: 0.9; transform: translate(12px, 4px); }
  18% { opacity: 0; transform: translate(-15px, -3px); }
  30% { opacity: 0.7; transform: translate(6px, 2px); }
  45% { opacity: 0; transform: translate(-8px, 0); }
  65% { opacity: 0.5; transform: translate(3px, 3px); }
  80% { opacity: 0; transform: translate(-4px, -1px); }
  100% { opacity: 0; transform: translate(0); }
}
@keyframes slice-aggressive {
  0% { opacity: 0; transform: translateX(-15%) scaleX(0.5); }
  10% { opacity: 1; transform: translateX(8%) scaleX(1.5); }
  20% { opacity: 0.8; transform: translateX(-5%) scaleX(0.8); }
  30% { opacity: 0; transform: translateX(15%) scaleX(1.2); }
  45% { opacity: 0.9; transform: translateX(-8%) scaleX(2); }
  55% { opacity: 0; transform: translateX(-15%) scaleX(0.3); }
  75% { opacity: 0.6; transform: translateX(5%) scaleX(1); }
  85% { opacity: 0; transform: translateX(0) scaleX(0); }
  100% { opacity: 0; transform: translateX(0) scaleX(0); }
}
@keyframes bar-cinematic { 0% { width: 0; } 75% { width: 0; } 100% { width: 200px; } }
@keyframes bar-cinematic-fast { 0% { width: 0; } 45% { width: 0; } 100% { width: 90px; } }
@keyframes flash-cinematic {
  0% { opacity: 0.03; }
  35% { opacity: 0.1; }
  55% { opacity: 0.03; }
  75% { opacity: 0.18; }
  100% { opacity: 0; }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes noise-shift { 0%,100% { transform: translate(0,0); } 25% { transform: translate(-4px,3px); } 50% { transform: translate(3px,-4px); } 75% { transform: translate(-2px,-2px); } }
@keyframes dots-blink { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ 2. More aggressive glitch CSS');

// ═══ 3. ADD 4TH GLITCH SLICE ═══
const threeSlices = `<div className="preloader-glitch-slice preloader-slice-3" />`;
const fourSlices = `<div className="preloader-glitch-slice preloader-slice-3" />
            <div className="preloader-glitch-slice preloader-slice-4" />`;

p = p.replace(threeSlices, fourSlices);
console.log('✅ 3. Added 4th glitch slice');

fs.writeFileSync('src/app/page.tsx', p);
