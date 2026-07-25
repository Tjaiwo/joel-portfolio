const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove burnIn from line 1002
p = p.replace('const [burnIn, setBurnIn] = useState(false);\n', '');

// Add it earlier, before the first useEffect that uses it
// Find a good spot - right after mobileMenuOpen state
p = p.replace(
  'const [mobileMenuOpen, setMobileMenuOpen] = useState(false);',
  'const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n  const [burnIn, setBurnIn] = useState(false);'
);
console.log('✅ burnIn state moved before usage');

fs.writeFileSync('src/app/page.tsx', p);
