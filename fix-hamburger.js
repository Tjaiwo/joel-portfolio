const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix broken hamburger button
const broken = '            <ThemeToggle />\n              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}';

const fixed = '            <ThemeToggle />\n            <button\n              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}';

p = p.replace(broken, fixed);
console.log('Fixed hamburger button');

fs.writeFileSync('src/app/page.tsx', p);
