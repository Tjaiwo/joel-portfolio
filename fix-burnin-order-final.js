const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove any existing burnIn declarations (in case of duplicates)
p = p.replace(/const \[burnIn, setBurnIn\] = useState\(false\);\n?/g, '');

// Insert right after mobileMenuOpen, before any useEffects
p = p.replace(
  'const [mobileMenuOpen, setMobileMenuOpen] = useState(false);',
  'const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n  const [burnIn, setBurnIn] = useState(false);'
);
console.log('✅ burnIn state placed before all useEffects');

fs.writeFileSync('src/app/page.tsx', p);
