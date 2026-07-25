const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add burnIn state
p = p.replace(
  'const [glitchDone, setGlitchDone] = useState(false);',
  'const [glitchDone, setGlitchDone] = useState(false);\n  const [burnIn, setBurnIn] = useState(false);'
);
console.log('✅ burnIn state restored');

fs.writeFileSync('src/app/page.tsx', p);
