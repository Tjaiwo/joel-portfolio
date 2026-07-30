const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Update preloader logo
p = p.replace(
  '<h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">\n              Joel<span className="text-foreground">.</span>\n            </h2>',
  '<h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-geist-sans)" }}>\n              <span className="text-foreground">&lt;JA</span><span className="text-primary">/&gt;</span>\n            </h2>'
);

// Remove empty sound toggle buttons
p = p.replace(/<button\s*\n\s*onClick=\{\(\) => \{\}\}\s*\n\s*className="p-2 rounded-md border border-border hover:border-primary\/30 transition-colors text-\[11px\] font-mono text-muted-foreground hover:text-primary"\s*\n\s*title=""\s*\n\s*>\s*\n\s*""\s*\n\s*<\/button>/g, '');

// Remove mobile sound button
p = p.replace(/<button\s*\n\s*onClick=\{\(\) => setSoundEnabled\(!soundEnabled\)\)\}\s*\n\s*className="p-2 rounded-md border border-border hover:border-primary\/30 transition-colors text-\[11px\] font-mono text-muted-foreground hover:text-primary"\s*\n\s*title=""\s*\n\s*>\s*\n\s*""\s*\n\s*<\/button>/g, '');

// Remove soundEnabled state
p = p.replace('const [soundEnabled, setSoundEnabled] = useState(false);\n  ', '');

console.log('Preloader logo updated, stale buttons removed');
fs.writeFileSync('src/app/page.tsx', p);
