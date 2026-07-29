const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove glitchDone timer
p = p.replace("useEffect(() => { const t = setTimeout(() => setGlitchDone(true), 2000); return () => clearTimeout(t); }, []);\n  ", "");

// Remove titleIndex
p = p.replace("const [titleIndex, setTitleIndex] = useState(0);\n  ", "");

console.log('Removed stale state references');
fs.writeFileSync('src/app/page.tsx', p);
