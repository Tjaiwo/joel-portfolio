const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove existing burnIn declaration
p = p.replace(/const \[burnIn, setBurnIn\] = useState\(false\);\n?/g, '');

// Insert right before the burn-in useEffect (line 615)
p = p.replace(
  '// Burn-in effect on theme switch',
  'const [burnIn, setBurnIn] = useState(false);\n\n  // Burn-in effect on theme switch'
);
console.log('✅ burnIn state placed directly before its useEffect');

fs.writeFileSync('src/app/page.tsx', p);
