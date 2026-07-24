const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldLine = `      variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}`;

const newLine = `      variants={staggerContainer}`;

p = p.replace(oldLine, newLine);
console.log('✅ Fixed Section component - removed duplicate');
fs.writeFileSync('src/app/page.tsx', p);
