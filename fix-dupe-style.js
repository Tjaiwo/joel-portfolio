const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldLine = '<div className="absolute inset-0 iframe-scale-container" style={{ clipPath: "none", overflow: "hidden" }} style={{ zIndex: loaded ? 10 : 5 }}>';
const newLine = '<div className="absolute inset-0 iframe-scale-container" style={{ clipPath: "none", overflow: "hidden", zIndex: loaded ? 10 : 5 }}>';

p = p.replace(oldLine, newLine);
console.log('✅ Merged duplicate style attributes');

fs.writeFileSync('src/app/page.tsx', p);
