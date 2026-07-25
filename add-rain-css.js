const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// 1. Remove the broken MatrixRain canvas component and its usage
const funcStart = p.indexOf('function MatrixRain()');
const funcEnd = p.indexOf('/* ──────────────────────── BACK TO TOP ──────────────────────── */');
if (funcStart > 0) {
  p = p.slice(0, funcStart) + p.slice(funcEnd);
}
p = p.replace('<MatrixRain />\n      ', '');
console.log('✅ Removed broken canvas MatrixRain');

// 2. Add CSS-only rain effect
css += `
/* Matrix Rain - CSS only */
.matrix-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}
.matrix-rain span {
  position: absolute;
  top: -100px;
  font-family: monospace;
  font-size: 14px;
  color: #50C878;
  animation: matrix-drop linear infinite;
  opacity: 0;
}
:root:not(.dark) .matrix-rain span {
  opacity: 0.5;
}
.dark .matrix-rain span {
  opacity: 0.2;
}
@keyframes matrix-drop {
  0% { transform: translateY(-100px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ CSS rain added');

// 3. Add the rain div to the page
p = p.replace(
  '<section id="home"',
  `<div className="matrix-rain" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: Math.random() * 100 + '%',
              animationDuration: 3 + Math.random() * 5 + 's',
              animationDelay: Math.random() * 5 + 's',
              fontSize: 10 + Math.random() * 14 + 'px'
            }}
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </span>
        ))}
      </div>
      <section id="home"`
);

console.log('✅ Rain div added to page');

fs.writeFileSync('src/app/page.tsx', p);
