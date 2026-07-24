const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove duplicate initial="hidden" where it appears twice
p = p.replace(/initial="hidden"\s+initial="hidden"/g, 'initial="hidden"');
p = p.replace(/initial="hidden"\s+animate=\{isInView[^}]*\}\s+initial="hidden"/g, (match) => {
  return match.replace(' initial="hidden"', ''); // remove the second one
});

// Remove duplicate animate attributes too
p = p.replace(/animate=\{isInView[^}]*\}\s+whileInView="visible"/g, (match) => {
  // Keep whileInView, remove the animate={isInView...}
  return match.replace(/animate=\{isInView[^}]*\}\s*/, '');
});

console.log('✅ Fixed duplicate attributes');
fs.writeFileSync('src/app/page.tsx', p);
