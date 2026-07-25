const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// 1. Remove ALL rain-related code from page.tsx
p = p.replace(/<div className="matrix-rain"[\s\S]*?<\/div>\n\s*/, '');

// 2. Remove ALL rain CSS
css = css.replace(/\/\* Matrix Rain[\s\S]*?@keyframes beam-drop[\s\S]*?\}/, '');
css = css.replace(/\.matrix-rain[\s\S]*?@keyframes matrix-drop[\s\S]*?\}/g, '');
css = css.replace(/\.rain-beam[\s\S]*?@keyframes beam-drop[\s\S]*?\}/, '');

// 3. Add clean CSS
css += `
.rain-container {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 1; overflow: hidden;
}
.rain-beam {
  position: absolute; top: -120px;
  width: 2px;
  background: linear-gradient(to bottom, transparent, rgba(80,200,120,0.25), rgba(80,200,120,0.5), rgba(80,200,120,0.25), transparent);
  border-radius: 2px;
  filter: blur(2px);
  animation: rain-fall linear infinite;
}
:root:not(.dark) .rain-beam { opacity: 0.8; }
.dark .rain-beam { opacity: 0.35; }
@keyframes rain-fall {
  0% { transform: translateY(-120px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(calc(100vh + 120px)); opacity: 0; }
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ CSS cleaned and rebuilt');

// 4. Add clean rain HTML
const heroStart = `        {/* ─── HERO ─── */}
        <section`;

const rainHTML = `        {/* ─── MATRIX RAIN ─── */}
        <div className="rain-container" aria-hidden="true">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="rain-beam"
              style={{
                left: ((i * 29 + 7) % 100) + '%',
                height: (60 + Math.random() * 100) + 'px',
                animationDuration: (2.5 + Math.random() * 4) + 's',
                animationDelay: (Math.random() * 3) + 's',
                opacity: undefined
              }}
            />
          ))}
        </div>

        {/* ─── HERO ─── */}
        <section`;

p = p.replace(heroStart, rainHTML);
console.log('✅ Rain HTML added');

fs.writeFileSync('src/app/page.tsx', p);
