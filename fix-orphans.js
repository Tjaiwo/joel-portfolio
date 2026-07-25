const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove the orphaned lines 762-765
css = css.replace(/\n\s*15% \{ opacity: 1; \}\n\s*85% \{ opacity: 1; \}\n\s*100% \{ transform: translateY\(100vh\); opacity: 0; \}\n\}/, '');

console.log('✅ Orphaned keyframe fragments removed');
fs.writeFileSync('src/app/globals.css', css);
