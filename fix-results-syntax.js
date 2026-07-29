const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix: add missing commas before results
p = p.replace(/"SEO"\]\n    results:/g, '"SEO"],\n    results:');
p = p.replace(/"SEO"]\n    results:/g, '"SEO"],\n    results:');

console.log('Fixed missing commas before results');
fs.writeFileSync('src/app/page.tsx', p);
