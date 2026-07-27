const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Add konami state and effect
p = p.replace(
  'const [glitchDone, setGlitchDone] = useState(false);',
  'const [glitchDone, setGlitchDone] = useState(false);\n  const [konami, setKonami] = useState(false);'
);

// Add konami listener after glitch timer
p = p.replace(
  'useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 1500); return () => clearTimeout(t); }, []);',
  `useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 1500); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
    let pos = 0;
    const handler = (e) => {
      if (e.key === code[pos] || e.code === code[pos]) {
        pos++;
        if (pos === code.length) {
          setKonami(true);
          setTimeout(() => setKonami(false), 4000);
          pos = 0;
        }
      } else {
        pos = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);`
);

// Add konami celebration overlay
p = p.replace(
  '<main className="flex-1 lg:ml-[280px]"',
  `{konami && (
        <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="text-center"
          >
            <div className="text-6xl md:text-8xl font-black text-primary mb-4 animate-bounce">
              ⬆⬆⬇⬇⬅➡⬅➡🅱🅰
            </div>
            <p className="text-2xl md:text-4xl font-bold text-primary animate-pulse">
              CHEAT CODE ACTIVATED
            </p>
            <p className="text-sm md:text-lg text-muted-foreground mt-2 font-mono">
              You found the secret. Now go build something great.
            </p>
          </motion.div>
          <div className="absolute inset-0 konami-confetti pointer-events-none" />
        </div>
      )}
      <main className="flex-1 lg:ml-[280px]"`
);

// Add confetti CSS
css += `
.konami-confetti {
  background:
    radial-gradient(circle at 20% 30%, rgba(80,200,120,0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 60%, rgba(80,200,120,0.2) 0%, transparent 40%),
    radial-gradient(circle at 50% 80%, rgba(80,200,120,0.25) 0%, transparent 45%);
  animation: konami-pulse 0.5s ease-out forwards;
}
@keyframes konami-pulse {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
`;

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log('Konami code easter egg added!');
