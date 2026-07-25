const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove the wrongly placed burnIn
p = p.replace('const [burnIn, setBurnIn] = useState(false);\n\n  // Burn-in effect on theme switch', '// Burn-in effect on theme switch');

// Place it inside Portfolio component, after formData state
p = p.replace(
  'const [budgetError, setBudgetError] = useState("");',
  'const [budgetError, setBudgetError] = useState("");\n  const [burnIn, setBurnIn] = useState(false);'
);
console.log('✅ burnIn state placed inside Portfolio component');

fs.writeFileSync('src/app/page.tsx', p);
