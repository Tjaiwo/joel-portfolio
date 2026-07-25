const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add MatrixRain right before the hero section
p = p.replace(
  '<section id="home"',
  '<MatrixRain />\n      <section id="home"'
);
console.log('✅ MatrixRain component added to render tree');

fs.writeFileSync('src/app/page.tsx', p);
