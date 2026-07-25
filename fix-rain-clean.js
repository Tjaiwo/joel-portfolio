const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove the toggle button from sidebar
const oldToggle = `          <button
            onClick={() => setMatrixRain(!matrixRain)}
            className="p-2 rounded-md border border-border hover:border-primary/30 transition-colors text-[11px] font-mono text-muted-foreground hover:text-primary"
            title={matrixRain ? "Matrix rain on" : "Matrix rain off"}
          >
            {matrixRain ? "🌧️" : "💧"}
          </button>`;

p = p.replace(oldToggle, '');

// Remove matrixRain state
p = p.replace('  const [matrixRain, setMatrixRain] = useState(false);\n', '');

// Replace conditional MatrixRain with always-on
p = p.replace('{matrixRain && <MatrixRain />}', '<MatrixRain />');

console.log('✅ Toggle removed, rain always on');
fs.writeFileSync('src/app/page.tsx', p);
