const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// 1. Add CSS
if (!css.includes('matrix-rain')) {
  css += `
.matrix-rain {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 1; overflow: hidden;
}
.matrix-rain span {
  position: absolute; top: -20px; font-family: monospace; font-size: 14px;
  color: #50C878; animation: matrix-drop linear infinite;
}
:root:not(.dark) .matrix-rain span { opacity: 0.45; }
.dark .matrix-rain span { opacity: 0.18; }
@keyframes matrix-drop {
  0% { transform: translateY(-20px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}
`;
  fs.writeFileSync('src/app/globals.css', css);
  console.log('✅ CSS added');
}

// 2. Add rain div before hero section
const oldSection = `        {/* ─── HERO ─── */}
        <section
          id="home"
          className="flex flex-col justify-start lg:justify-center lg:min-h-screen relative overflow-hidden pt-[120px] lg:pt-0 px-4 md:px-4 lg:px-5"`;

const newSection = `        {/* ─── HERO ─── */}
        <div className="matrix-rain" aria-hidden="true">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&".split("").map((char, i) => (
            <span key={i} style={{
              left: ((i * 37) % 100) + '%',
              animationDuration: (3 + (i % 5)) + 's',
              animationDelay: ((i * 0.7) % 5) + 's',
              fontSize: (10 + (i % 16)) + 'px'
            }}>{char}</span>
          ))}
        </div>
        <section
          id="home"
          className="flex flex-col justify-start lg:justify-center lg:min-h-screen relative overflow-hidden pt-[120px] lg:pt-0 px-4 md:px-4 lg:px-5"`;

p = p.replace(oldSection, newSection);
console.log('✅ Rain div inserted');

fs.writeFileSync('src/app/page.tsx', p);
