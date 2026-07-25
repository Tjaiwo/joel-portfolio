const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove orphaned keyframe lines
css = css.replace(/\n\s*10% \{ opacity: 1; \}\n\s*90% \{ opacity: 1; \}\n\s*100% \{ transform: translateY\(100vh\); opacity: 0; \}\n\}/, '');

console.log('✅ Orphaned rain CSS removed');
fs.writeFileSync('src/app/globals.css', css);
