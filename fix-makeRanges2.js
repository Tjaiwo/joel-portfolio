const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix makeRanges to have optional 3rd param in the remaining copy
const oldFunc = /function makeRanges\(symbol, rate, thresholds\) \{/g;
const newFunc = 'function makeRanges(symbol, rate, thresholds) {\n  thresholds = thresholds || USD_THRESHOLDS;';

const matches = p.match(oldFunc);
console.log('Found ' + (matches ? matches.length : 0) + ' makeRanges function(s)');

if (p.match(oldFunc)) {
  p = p.replace(oldFunc, newFunc);
  console.log('OK: makeRanges now uses thresholds || USD_THRESHOLDS');
} else {
  console.log('SKIP: pattern not found');
}

fs.writeFileSync('src/app/page.tsx', p);
