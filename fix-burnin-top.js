const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove any existing burnIn
p = p.replace(/const \[burnIn, setBurnIn\] = useState\(false\);\n?/g, '');

// Insert right after "export default function Portfolio() {"
p = p.replace(
  'export default function Portfolio() {',
  'export default function Portfolio() {\n  const [burnIn, setBurnIn] = useState(false);'
);
console.log('✅ burnIn state at top of component');

fs.writeFileSync('src/app/page.tsx', p);
