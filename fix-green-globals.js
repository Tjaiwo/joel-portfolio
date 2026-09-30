/**
 * fix-green-globals.js
 *
 * Replaces ALL remaining green references in globals.css with ochre.
 * Targets: rgba(80, 200, 120, ...) and #2da55e (light mode)
 */
const fs = require('fs');
const F = 'src/app/globals.css';
let s = fs.readFileSync(F, 'utf8');
fs.writeFileSync(F + '.green-fix.bak', s, 'utf8');

// Replace all rgba(80, 200, 120, X) with rgba(184, 149, 106, X) — ochre equivalent
// Match various spacing patterns: rgba(80, 200, 120, 0.2) and rgba(80,200,120,0.2)
let count = 0;
s = s.replace(/rgba\(\s*80\s*,\s*200\s*,\s*120\s*,\s*([0-9.]+)\s*\)/g, (match, alpha) => {
  count++;
  return `rgba(184, 149, 106, ${alpha})`;
});

// Replace #2da55e (light mode ring + chart-1) with darker ochre
s = s.split('#2da55e').join('#9B7E50');
count += 2;

fs.writeFileSync(F, s, 'utf8');
console.log('  ok replaced ' + count + ' green references with ochre');
console.log('Test: npm run dev');
