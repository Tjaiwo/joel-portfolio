const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix: range is now an object { label, isCustom }, so use range.label for key and display
const oldMap = /currency\.ranges\.map\(\(range\)\s*=>\s*\(\s*\n\s*<option key=\{range\} value=\{range\}>\s*\n\s*\{range\}/;
const newMap = `currency.ranges.map((range) => (
                          <option key={range.label} value={range.label}>
                            {range.label}`;

if (p.match(oldMap)) {
  p = p.replace(oldMap, newMap);
  console.log('OK: Fixed dropdown to use range.label');
} else {
  console.log('SKIP: Pattern not found - check line 1478-1482');
}

fs.writeFileSync('src/app/page.tsx', p);
