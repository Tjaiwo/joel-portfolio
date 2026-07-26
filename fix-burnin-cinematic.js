const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove old burn-in HTML
p = p.replace('<div className="burn-overlay" aria-hidden="true" />\n      ', '');

// Remove old burn CSS
css = css.replace(/\/\* Burn-in[\s\S]*?@keyframes burn-white[\s\S]*?\}/, '');

// Add new cinematic burn overlay
p = p.replace(
  '<main className="flex-1 lg:ml-[280px]"',
  `<div className="theme-burn" aria-hidden="true">
        <div className="burn-scanlines" />
        <div className="burn-glitch-red" />
        <div className="burn-glitch-cyan" />
        <div className="burn-flash" />
        <div className="burn-vignette" />
      </div>
      <main className="flex-1 lg:ml-[280px]"`
);

// Add cinematic CSS
css += `
/* Cinematic burn-in on theme switch (both directions) */
.theme-burn {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 99999;
  opacity: 0;
}
html:not(.dark) .theme-burn {
  animation: burn-trigger 0.8s ease-out forwards;
}
html.dark .theme-burn {
  animation: burn-trigger 0.6s ease-out forwards;
}
.burn-scanlines {
  width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 6px);
}
html:not(.dark) .burn-scanlines { animation: burn-scan-in 0.8s ease-out forwards; }
html.dark .burn-scanlines { animation: burn-scan-in 0.6s ease-out forwards; }
.burn-glitch-red {
  position: absolute; width: 100%; height: 100%;
  background: rgba(255,0,0,0.08);
  animation: burn-glitch-r 0.8s ease-out forwards;
}
html.dark .burn-glitch-red { animation: burn-glitch-r 0.6s ease-out forwards; }
.burn-glitch-cyan {
  position: absolute; width: 100%; height: 100%;
  background: rgba(0,255,255,0.08);
  animation: burn-glitch-c 0.8s ease-out forwards;
}
html.dark .burn-glitch-cyan { animation: burn-glitch-c 0.6s ease-out forwards; }
.burn-flash {
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.3);
}
html:not(.dark) .burn-flash { animation: burn-white 0.8s ease-out forwards; }
html.dark .burn-flash { animation: burn-dark-flash 0.6s ease-out forwards; }
.burn-vignette {
  position: absolute; width: 100%; height: 100%;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%);
  animation: burn-vignette 0.8s ease-out forwards;
}
html.dark .burn-vignette { animation: burn-vignette 0.6s ease-out forwards; }
@keyframes burn-trigger {
  0%, 100% { opacity: 0; }
  2% { opacity: 1; }
  98% { opacity: 0; }
}
@keyframes burn-scan-in {
  0% { opacity: 0; }
  30% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes burn-glitch-r {
  0% { opacity: 0; transform: translateX(0); }
  15% { opacity: 0.8; transform: translateX(-6px); }
  30% { opacity: 0; transform: translateX(8px); }
  50% { opacity: 0.5; transform: translateX(-3px); }
  70% { opacity: 0; transform: translateX(0); }
  100% { opacity: 0; }
}
@keyframes burn-glitch-c {
  0% { opacity: 0; transform: translateX(0); }
  15% { opacity: 0.8; transform: translateX(6px); }
  30% { opacity: 0; transform: translateX(-8px); }
  50% { opacity: 0.5; transform: translateX(3px); }
  70% { opacity: 0; transform: translateX(0); }
  100% { opacity: 0; }
}
@keyframes burn-white {
  0% { opacity: 0; }
  20% { opacity: 1; }
  60% { opacity: 0.5; }
  100% { opacity: 0; }
}
@keyframes burn-dark-flash {
  0% { opacity: 0; }
  20% { opacity: 0.15; }
  100% { opacity: 0; }
}
@keyframes burn-vignette {
  0% { opacity: 0; }
  40% { opacity: 1; }
  100% { opacity: 0; }
}
`;

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Cinematic burn-in both directions');
