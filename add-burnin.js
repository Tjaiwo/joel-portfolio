const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// 1. Add burnIn state after budgetError
p = p.replace(
  'const [budgetError, setBudgetError] = useState("");',
  'const [budgetError, setBudgetError] = useState("");\n  const [burnIn, setBurnIn] = useState(false);'
);

// 2. Add burn-in useEffect after the glitch timer
p = p.replace(
  'useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 1500); return () => clearTimeout(t); }, []);',
  `useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 1500); return () => clearTimeout(t); }, []);

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
  }, []);`
);

// 3. Add burn-in overlay before main
p = p.replace(
  '<main className="flex-1 lg:ml-[280px]"',
  `{burnIn && (
        <div className="fixed inset-0 z-[99999] pointer-events-none">
          <div className="burn-scanlines" />
          <div className="burn-flash" />
        </div>
      )}
      <main className="flex-1 lg:ml-[280px]"`
);

// 4. Add CSS
css += `
.burn-scanlines {
  width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.12) 2px, rgba(255,255,255,0.12) 4px);
  animation: burn-scan 0.6s ease-out forwards;
}
.burn-flash {
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.25);
  animation: burn-flash 0.6s ease-out forwards;
}
@keyframes burn-scan {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes burn-flash {
  0% { opacity: 0; }
  30% { opacity: 1; }
  100% { opacity: 0; }
}
`;

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Burn-in effect added');
