const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldLine = `                variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}`;

const newLine = `                variants={slideInLeft}`;

p = p.replace(oldLine, newLine);
console.log('✅ Fixed nav button duplicate');
fs.writeFileSync('src/app/page.tsx', p);
