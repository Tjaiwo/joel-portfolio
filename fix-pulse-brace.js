const fs = require('fs');
let lines = fs.readFileSync('src/app/globals.css', 'utf8').split('\n');

// Line 219 (0-indexed 218): "  50% { box-shadow: 0 0 0 8px rgba(var(--primary), 0); }"
// Line 220 (0-indexed 219): "" (empty)
// Line 221 (0-indexed 220): "/* Reveal animation */"
// Missing closing } after line 219

if (lines[218] && lines[218].includes('50% { box-shadow')) {
  lines.splice(219, 0, '}');
  console.log('✅ Added missing closing brace for pulse-chevron');
}

fs.writeFileSync('src/app/globals.css', lines.join('\n'));
