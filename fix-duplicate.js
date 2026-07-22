const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Find the first handleCustomBudget and remove it (keep the second one)
const lines = p.split('\n');
let firstFound = false;
let newLines = [];

for (let i = 0; i < lines.length; i++) {
  if (!firstFound && lines[i].includes('function handleCustomBudget(ranges, currencyCode, onBudgetSelect)')) {
    firstFound = true;
    // Skip this function block entirely
    let braceCount = 0;
    let j = i;
    for (; j < lines.length; j++) {
      braceCount += (lines[j].match(/\{/g) || []).length;
      braceCount -= (lines[j].match(/\}/g) || []).length;
      if (braceCount === 0 && j > i) break;
    }
    i = j; // skip to end of this function
    console.log('Removed duplicate handleCustomBudget at line ' + (i + 1));
    continue;
  }
  newLines.push(lines[i]);
}

p = newLines.join('\n');
fs.writeFileSync('src/app/page.tsx', p);
