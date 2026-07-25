const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Remove the burn-in effect from useActiveSection
const oldEffect = `
  // Burn-in effect on theme switch
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'class') {
          const html = document.documentElement;
          const isDark = html.classList.contains('dark');
          if (!isDark && m.oldValue?.includes('dark')) {
            setBurnIn(true);
            setTimeout(() => setBurnIn(false), 600);
          }
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeOldValue: true });
    return () => observer.disconnect();
  }, []);`;

p = p.replace(oldEffect, '');
console.log('✅ Removed burn-in from useActiveSection');

// 2. Add it to the Portfolio component, after the glitch timer
const glitchTimer = "useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 1500); return () => clearTimeout(t); }, []);";
const withBurnin = glitchTimer + `

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'class') {
          const html = document.documentElement;
          const isDark = html.classList.contains('dark');
          if (!isDark && m.oldValue?.includes('dark')) {
            setBurnIn(true);
            setTimeout(() => setBurnIn(false), 600);
          }
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeOldValue: true });
    return () => observer.disconnect();
  }, []);`;

p = p.replace(glitchTimer, withBurnin);
console.log('✅ Burn-in effect moved to Portfolio component');

fs.writeFileSync('src/app/page.tsx', p);
