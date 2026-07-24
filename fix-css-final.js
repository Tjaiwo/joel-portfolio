const fs = require('fs');
let lines = fs.readFileSync('src/app/globals.css', 'utf8').split('\n');

// Fix subtle-pulse block (lines 208-211, 0-indexed 207-210)
// Current:
// 208: @keyframes subtle-pulse {
// 209:   0%, 100% { opacity: 0.6; }
// 210: .stat-pulse {
// 211:   animation: subtle-pulse 3s ease-in-out infinite;
// 212: }
// Should be:
// 208: @keyframes subtle-pulse {
// 209:   0%, 100% { opacity: 0.6; }
// 210:   50% { opacity: 1; }
// 211: }
// 212: .stat-pulse {
// 213:   animation: subtle-pulse 3s ease-in-out infinite;
// 214: }

let newLines = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('@keyframes subtle-pulse {')) {
    newLines.push(lines[i]); // @keyframes subtle-pulse {
    newLines.push(lines[i+1]); // 0%, 100% { opacity: 0.6; }
    newLines.push('  50% { opacity: 1; }');
    newLines.push('}');
    newLines.push('.stat-pulse {');
    newLines.push('  animation: subtle-pulse 3s ease-in-out infinite;');
    newLines.push('}');
    i += 4; // skip the broken lines
    console.log('✅ Fixed subtle-pulse');
  } else {
    newLines.push(lines[i]);
  }
}

fs.writeFileSync('src/app/globals.css', newLines.join('\n'));
