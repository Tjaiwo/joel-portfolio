const fs = require('fs');
const F = 'src/data/case-studies.ts';

if (!fs.existsSync(F)) {
  console.error('Cannot find ' + F);
  process.exit(1);
}

let s = fs.readFileSync(F, 'utf8');
fs.writeFileSync(F + '.corrupt.bak', s, 'utf8');

// The corruption: my previous patch's regex consumed too much when replacing sections arrays.
// It ate the closing `},\n  {` between two case study objects, leaving:
//   stack: [...],
//   designer: {...},
//   nextSlug: "...",
//   },   <-- orphan close brace
//   sections: [...]   <-- no opening {
//
// Fix: find each `nextSlug: "...",` and check what follows.
// If followed by `},` then `sections:` (orphan close + missing open), fix it.

const lines = s.split('\n');
let fixes = 0;

for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^(\s*)nextSlug:\s*"([^"]+)",?\s*$/);
  if (!m) continue;

  // Look at next 3 non-empty lines
  let next = [];
  for (let k = i + 1; k < Math.min(lines.length, i + 5) && next.length < 3; k++) {
    if (lines[k].trim() !== '') next.push({ idx: k, text: lines[k].trim() });
  }

  // Check for orphan pattern: nextSlug -> }, -> sections: [
  if (next.length >= 2 && next[0].text === '},' && next[1].text.startsWith('sections:')) {
    // Insert `{` before the sections: line
    lines.splice(next[1].idx, 0, '  {');
    fixes++;
    console.log('Fixed at line ' + (next[1].idx + 1) + ' (nextSlug="' + m[2] + '")');
  }
}

fs.writeFileSync(F, lines.join('\n'), 'utf8');
console.log('Total fixes: ' + fixes);
console.log('Test: npm run dev');
