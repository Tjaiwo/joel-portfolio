const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix all broken classNames - remove the messed up style injection
p = p.replace(/className=" style=\{\{ animationDelay: "[^"]*" \}\}skill-tag/g, 'className="skill-tag');

// Remove duplicate style attributes
p = p.replace(/" style=\{\{ animationDelay: "[^"]*" \}\}/g, '');

console.log('✅ Fixed broken classNames');
fs.writeFileSync('src/app/page.tsx', p);
