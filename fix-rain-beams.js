const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// 1. Replace rain spans with beam divs
const oldRain = `<div className="matrix-rain" aria-hidden="true">
          {[...Array(30)].map((_, i) => (
            <span key={i} style={{
              left: ((i * 37) % 100) + '%',
              animationDuration: (3 + (i % 5)) + 's',
              animationDelay: ((i * 0.7) % 5) + 's',
              fontSize: (10 + (i % 16)) + 'px'
            }}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</span>
          ))}
        </div>`;

const newRain = `<div className="matrix-rain" aria-hidden="true">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="rain-beam" style={{
              left: ((i * 23) % 100) + '%',
              animationDuration: (2 + Math.random() * 4) + 's',
              animationDelay: (Math.random() * 3) + 's',
              height: (40 + Math.random() * 80) + 'px',
              width: (1 + Math.random() * 2) + 'px'
            }} />
          ))}
        </div>`;

p = p.replace(oldRain, newRain);
console.log('✅ Rain spans replaced with beams');

// 2. Update CSS
css = css.replace(/\.matrix-rain[\s\S]*?@keyframes matrix-drop[\s\S]*?\}/, '');

css += `
.matrix-rain {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 1; overflow: hidden;
}
.rain-beam {
  position: absolute; top: -100px;
  background: linear-gradient(to bottom, transparent, rgba(80, 200, 120, 0.3), rgba(80, 200, 120, 0.6), rgba(80, 200, 120, 0.3), transparent);
  border-radius: 1px;
  animation: beam-drop linear infinite;
  filter: blur(1px);
}
:root:not(.dark) .rain-beam { opacity: 0.7; }
.dark .rain-beam { opacity: 0.3; }
@keyframes beam-drop {
  0% { transform: translateY(-100px); opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Beam CSS added');

fs.writeFileSync('src/app/page.tsx', p);
