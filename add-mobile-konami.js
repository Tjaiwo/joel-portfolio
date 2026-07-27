const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add tap counter ref and handler
p = p.replace(
  'const [konami, setKonami] = useState(false);',
  'const [konami, setKonami] = useState(false);\n  const logoTapRef = useRef(0);\n  const logoTapTimer = useRef<NodeJS.Timeout>();'
);

// Update the sidebar logo button to track taps
const oldLogoBtn = `<button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-left hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Scroll to top"
            >`;

const newLogoBtn = `<button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                logoTapRef.current += 1;
                if (logoTapTimer.current) clearTimeout(logoTapTimer.current);
                if (logoTapRef.current >= 5) {
                  setKonami(true);
                  setTimeout(() => setKonami(false), 4000);
                  logoTapRef.current = 0;
                } else {
                  logoTapTimer.current = setTimeout(() => { logoTapRef.current = 0; }, 1500);
                }
              }}
              className="text-left hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Scroll to top"
            >`;

p = p.replace(oldLogoBtn, newLogoBtn);

// Also update mobile logo
const oldMobileBtn = `<button\n              onClick={() => window.scrollTo({ top: 0, behavior: \'smooth\' })}\n              className="text-left hover:opacity-70 transition-opacity"\n              aria-label="Scroll to top"\n            >`;

const newMobileBtn = `<button\n              onClick={() => {\n                window.scrollTo({ top: 0, behavior: \'smooth\' });\n                logoTapRef.current += 1;\n                if (logoTapTimer.current) clearTimeout(logoTapTimer.current);\n                if (logoTapRef.current >= 5) {\n                  setKonami(true);\n                  setTimeout(() => setKonami(false), 4000);\n                  logoTapRef.current = 0;\n                } else {\n                  logoTapTimer.current = setTimeout(() => { logoTapRef.current = 0; }, 1500);\n                }\n              }}\n              className="text-left hover:opacity-70 transition-opacity"\n              aria-label="Scroll to top"\n            >`;

p = p.replace(oldMobileBtn, newMobileBtn);
console.log('Mobile: tap logo 5 times for easter egg');

fs.writeFileSync('src/app/page.tsx', p);
