const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ REMOVE MATRIX RAIN ═══
p = p.replace(/<MatrixRain \/>\n\s*/, '');
// Remove MatrixRain function
const matrixFunc = p.indexOf('function MatrixRain()');
const backToTop = p.indexOf('/* ──────────────────────── BACK TO TOP ──────────────────────── */');
if (matrixFunc > 0) {
  p = p.slice(0, matrixFunc) + p.slice(backToTop);
}
console.log('✅ Matrix Rain removed');

// ═══ REMOVE BURN-IN ═══
// Remove burnIn state
p = p.replace(/const \[burnIn, setBurnIn\] = useState\(false\);\n?/g, '');
// Remove burn-in useEffect
p = p.replace(/\n\s*useEffect\(\(\) => \{\s*const obs = new MutationObserver[\s\S]*?\}, \[\]\);\n?/, '');
// Remove burnIn overlay
p = p.replace(/\{burnIn && \(\s*<div className="fixed inset-0 z-\[99999\][\s\S]*?<\/div>\s*\)\}\n\s*/, '');
console.log('✅ Burn-in removed');

// ═══ REMOVE TIMELINE ═══
const timelineStart = p.indexOf('{/* ─── PROCESS TIMELINE ─── */}');
const contactStart = p.indexOf('{/* ─── CONTACT ─── */}');
if (timelineStart > 0 && contactStart > timelineStart) {
  p = p.slice(0, timelineStart) + p.slice(contactStart);
}
console.log('✅ Timeline removed');

// ═══ CLEAN CSS ═══
css = css.replace(/\.burn-in-scanlines[\s\S]*?@keyframes burn-flash[\s\S]*?\}/, '');
css = css.replace(/\.scrollbar-none[\s\S]*?\}/, '');
console.log('✅ CSS cleaned');

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
