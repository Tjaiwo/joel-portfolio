const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove rain HTML
p = p.replace(/        \{\/\* ─── MATRIX RAIN ─── \*\/\}\n        <div className="rain-container"[\s\S]*?<\/div>\n\n/, '');

// Remove all rain CSS
css = css.replace(/\.rain-container[\s\S]*?@keyframes rain-fall[\s\S]*?\}/, '');
// Remove orphaned lines if any
css = css.replace(/\n\s*\d+% \{ opacity: 1; \}\n\s*\d+% \{ opacity: 1; \}\n\s*100% \{ transform: translateY\(100vh\); opacity: 0; \}\n\}/g, '');

console.log('✅ Rain completely removed');
fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
