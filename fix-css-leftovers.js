const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove orphaned keyframe percentages
css = css.replace(/\n\s*30% \{ opacity: 1; \}\n\s*100% \{ opacity: 0; \}\n\}/, '');

// Remove scrollbar-none if still there
css = css.replace(/\.scrollbar-none::-webkit-scrollbar \{ display: none; \}\n?/, '');

console.log('✅ Leftover CSS fragments removed');
fs.writeFileSync('src/app/globals.css', css);
