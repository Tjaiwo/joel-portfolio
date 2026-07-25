const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Check if burnIn state exists
if (!p.includes('const [burnIn, setBurnIn]')) {
  // Add it after glitchDone
  p = p.replace(
    'const [glitchDone, setGlitchDone] = useState(false);',
    'const [glitchDone, setGlitchDone] = useState(false);\n  const [burnIn, setBurnIn] = useState(false);'
  );
  console.log('✅ Added missing burnIn state');
} else {
  console.log('✅ burnIn state already exists');
}

fs.writeFileSync('src/app/page.tsx', p);
