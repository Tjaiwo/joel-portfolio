const fs = require('fs');
const path = require('path');
const file = path.join('src', 'app', 'page.tsx');
let code = fs.readFileSync(file, 'utf8');
let changes = 0;

// 1. fadeInUp ease - line 307
const a1 = 'transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }';
const b1 = 'transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }';
if (code.includes(a1)) { code = code.replace(a1, b1); changes++; }

// 2. slideInLeft ease - line 321
const a2 = 'transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }';
const b2 = 'transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }';
if (code.includes(a2)) { code = code.replace(a2, b2); changes++; }

// 3. inline ease at accordion - line 954
const a3 = 'transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}';
const b3 = 'transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] as const }}';
if (code.includes(a3)) { code = code.replace(a3, b3); changes++; }

// 4. inline ease at modal - line 1283
const a4 = 'transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}';
const b4 = 'transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}';
if (code.includes(a4)) { code = code.replace(a4, b4); changes++; }

// 5. Mobile menu scroll fix - close menu first, then scroll after animation
const a5 = `  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);`;
const b5 = `  const scrollTo = useCallback((id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  }, []);`;
if (code.includes(a5)) { code = code.replace(a5, b5); changes++; }

fs.writeFileSync(file, code, 'utf8');
console.log('Changes applied: ' + changes);
if (changes === 0) console.log('WARNING: No patterns matched - file may already be fixed');
