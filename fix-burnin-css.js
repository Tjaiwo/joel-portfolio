const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove the JS burn-in
p = p.replace(/\n  const \[burnIn, setBurnIn\] = useState\(false\);/, '');
p = p.replace(/\n  useEffect\(\(\) => \{\s*const obs = new MutationObserver[\s\S]*?\}, \[\]\);/, '');
p = p.replace(/\{burnIn && \(\s*<div className="fixed inset-0 z-\[99999\][\s\S]*?<\/div>\s*\)\}\s*/, '');

// Remove old burn CSS
css = css.replace(/\.burn-scanlines[\s\S]*?@keyframes burn-flash[\s\S]*?\}/, '');

// Add CSS-only burn-in that triggers when .dark class is removed
css += `
/* Burn-in: triggers when switching to light mode */
html:not(.dark) .burn-overlay {
  animation: burn-in-trigger 0.7s ease-out forwards;
  pointer-events: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 99999;
  background: transparent;
}
html:not(.dark) .burn-overlay::before {
  content: "";
  position: absolute;
  width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.12) 2px, rgba(255,255,255,0.12) 4px);
  animation: burn-scanlines 0.7s ease-out forwards;
}
html:not(.dark) .burn-overlay::after {
  content: "";
  position: absolute;
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.25);
  animation: burn-white 0.7s ease-out forwards;
}
@keyframes burn-in-trigger {
  0%, 100% { opacity: 0; }
  1% { opacity: 1; }
  99% { opacity: 0; }
}
@keyframes burn-scanlines {
  0% { opacity: 0; }
  40% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes burn-white {
  0% { opacity: 0; }
  25% { opacity: 1; }
  100% { opacity: 0; }
}
`;

// Add the overlay div to the page
p = p.replace(
  '<main className="flex-1 lg:ml-[280px]"',
  '<div className="burn-overlay" aria-hidden="true" />\n      <main className="flex-1 lg:ml-[280px]"'
);

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ CSS-only burn-in added');
