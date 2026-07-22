const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldLine = `      if (budget && !isNaN(budget) && Number(budget) > 0) {`;
const newLine = `      if (budget && !isNaN(Number(budget)) && Number(budget) > 0) {`;

if (p.includes(oldLine)) {
  p = p.replace(oldLine, newLine);
  console.log('OK: Fixed isNaN type error');
} else {
  console.log('SKIP: Pattern not found');
}

fs.writeFileSync('src/app/page.tsx', p);
