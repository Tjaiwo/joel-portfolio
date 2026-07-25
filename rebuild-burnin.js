const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Delete ALL lines containing setBurnIn or burnIn references
let lines = p.split('\n');
let newLines = [];
let skipBurnIn = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Burn-in effect on theme switch')) {
    // Skip this entire useEffect block
    skipBurnIn = true;
    braceCount = 0;
  }
  if (skipBurnIn) {
    braceCount += (lines[i].match(/\{/g) || []).length;
    braceCount -= (lines[i].match(/\}/g) || []).length;
    if (braceCount === 0 && lines[i].includes('}, []);')) {
      skipBurnIn = false;
    }
    continue;
  }
  newLines.push(lines[i]);
}

p = newLines.join('\n');
console.log('✅ Removed old burn-in code');

// 2. Add burnIn state inside Portfolio
p = p.replace(
  'const [budgetError, setBudgetError] = useState("");',
  'const [budgetError, setBudgetError] = useState("");\n  const [burnIn, setBurnIn] = useState(false);'
);

// 3. Add burn-in useEffect inside Portfolio (find a good spot)
const insertAfter = "useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 1500); return () => clearTimeout(t); }, []);";
const burninEffect = `

  useEffect(() => {
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          if (!isDark && m.oldValue?.includes('dark')) {
            setBurnIn(true);
            setTimeout(() => setBurnIn(false), 600);
          }
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true, attributeOldValue: true });
    return () => obs.disconnect();
  }, []);`;

if (p.includes(insertAfter)) {
  p = p.replace(insertAfter, insertAfter + burninEffect);
  console.log('✅ Burn-in effect added to Portfolio');
}

fs.writeFileSync('src/app/page.tsx', p);
