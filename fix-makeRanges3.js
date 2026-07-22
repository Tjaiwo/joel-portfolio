const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix: remove duplicate line AND make thresholds optional
const oldFunc = `function makeRanges(symbol, rate, thresholds) {
  thresholds = thresholds || USD_THRESHOLDS;
  thresholds = thresholds || USD_THRESHOLDS;`;

const newFunc = `function makeRanges(symbol, rate, thresholds?) {
  thresholds = thresholds || USD_THRESHOLDS;`;

if (p.includes(oldFunc)) {
  p = p.replace(oldFunc, newFunc);
  console.log('OK: makeRanges - removed duplicate, made thresholds optional');
} else {
  console.log('SKIP: pattern not found. Current state:');
  const match = p.match(/function makeRanges\([^)]+\) \{\n[\s\S]*?var loc/);
  if (match) console.log(match[0]);
}

fs.writeFileSync('src/app/page.tsx', p);
