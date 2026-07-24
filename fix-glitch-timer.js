const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add the timer useEffect right after the glitchDone state
const stateLine = 'const [glitchDone, setGlitchDone] = useState(false);';
const withTimer = stateLine + '\n\n  useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 1000); return () => clearTimeout(t); }, []);';

p = p.replace(stateLine, withTimer);
console.log('✅ Glitch timer added - will clear after 1 second');

fs.writeFileSync('src/app/page.tsx', p);
