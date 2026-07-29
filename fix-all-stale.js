const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove useLocalTime calls
p = p.replace(/\{useLocalTime\(\)\}/g, '');
p = p.replace(/<span className="text-primary font-mono text-\[11px\] mr-2" style=\{\{ fontFamily: 'var\(--font-geist-mono\)' \}\}><\/span>/g, '');
p = p.replace(/<span className="text-primary font-mono text-\[12px\].*?useLocalTime.*?<\/span>/g, '');

// Remove soundEnabled references
p = p.replace("onClick={() => setSoundEnabled(!soundEnabled)}", "onClick={() => {}}");
p = p.replace(/\{soundEnabled \? ".*?" : ".*?"\}/g, '""');

// Remove copied state if unused
// (keep it, it's used for copy email)

console.log('Cleaned all stale references');
fs.writeFileSync('src/app/page.tsx', p);
