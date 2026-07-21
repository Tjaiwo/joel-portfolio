const fs = require('fs');
const p = fs.readFileSync('src/app/page.tsx', 'utf8');
const lines = p.split(/\r?\n/);
lines.forEach((line, i) => {
  if (i >= 12 && i <= 20) console.log('L' + (i+1) + ': ' + JSON.stringify(line));
});
console.log('---');
lines.forEach((line, i) => {
  if (i >= 398 && i <= 405) console.log('L' + (i+1) + ': ' + JSON.stringify(line));
});
