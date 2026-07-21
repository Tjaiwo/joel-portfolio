const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix TS error: 'start' is possibly null (line 16)
const re = /(const step = \(ts(?:\s*,\s*\w+)?\) => \{)\s*\n(\s*)if \(start === null\) start = ts;\s*\n(\s*)const progress = Math\.min\(\(ts - start\) \/ duration/;
p = p.replace(re, '$1\n$2const s = start ?? ts;\n$2start = s;\n$3const progress = Math.min((ts - s) / duration');
console.log('1. Fixed start null error');

// 2. Fix Framer Motion ease type error (line 401)
p = p.replace(/ease: (\[[\d.,\s]+\])(?!\s*as\s)/g, 'ease: $1 as const');
console.log('2. Fixed ease type error');

fs.writeFileSync('src/app/page.tsx', p);

const { execSync } = require('child_process');
execSync('git add src/app/page.tsx && git commit -m "fix: TS errors for Vercel deploy" && git push', { stdio: 'inherit' });
console.log('Pushed. Vercel should deploy now.');
