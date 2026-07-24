const fs = require('fs');
let lines = fs.readFileSync('src/app/globals.css', 'utf8').split('\n');

// Remove lines 219-220 (the leftover fragment)
// Line 219: "  50% { opacity: 1; transform: translateY(2px); }"
// Line 220: "}"
if (lines[218] && lines[218].includes('50% { opacity: 1; transform: translateY(2px); }')) {
  lines.splice(218, 2); // Remove line 219 and 220 (0-indexed)
  console.log('✅ Removed fragment at lines 219-220');
} else {
  console.log('⚠️ Lines 219-220:');
  console.log('219:', lines[218]);
  console.log('220:', lines[219]);
}

fs.writeFileSync('src/app/globals.css', lines.join('\n'));
