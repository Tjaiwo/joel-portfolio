const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldSpan = '<span className="text-foreground/70">';
const newSpan = '<span className="text-foreground/70 inline-block" style={{ minWidth: "320px" }}>';

p = p.replace(oldSpan, newSpan);
console.log('✅ Fixed min-width on scramble container');

fs.writeFileSync('src/app/page.tsx', p);
