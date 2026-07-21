const fs = require('fs');
let lines = fs.readFileSync('src/app/page.tsx', 'utf8').split('\n');
let n = 0;

// 1. Hero h1: insert style prop after line 836 (custom={1})
if (lines[836]?.includes('custom={1}')) {
  lines.splice(837, 0, '                style={{ fontSize: "clamp(40px, 10vw, 72px)", lineHeight: "clamp(44px, 1.1em, 68px)" }}');
  console.log('Line 838: hero h1 inline style added');
  n++;
}

// 2. Description: insert style prop after line 848 (className line, now shifted by +1)
// After inserting above, original line 848 becomes 849
const descIdx = lines.findIndex((l, i) => i >= 845 && i <= 855 && l.includes('text-sm') && l.includes('max-w-xl'));
if (descIdx !== -1) {
  const indent = lines[descIdx].match(/^(\s*)/)[1];
  lines.splice(descIdx + 1, 0, indent + 'style={{ fontSize: "18px" }}');
  console.log('Line ' + (descIdx + 2) + ': description inline style added');
  n++;
} else {
  console.log('WARNING: description line not found');
}

fs.writeFileSync('src/app/page.tsx', lines.join('\n'));
console.log('Changes: ' + n);
