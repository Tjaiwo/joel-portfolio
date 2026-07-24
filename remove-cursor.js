const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove cursor elements
p = p.replace(/.*CUSTOM CURSOR.*\n.*motion\.div.*cursorX.*\n.*motion\.div.*cursorX.*\n\n/g, '');

// Remove cursor state
p = p.replace(/\n  const \[cursorX, setCursorX\] = useState\(-100\);\n  const \[cursorY, setCursorY\] = useState\(-100\);\n/, '\n');

// Remove cursor useEffect
p = p.replace(/\n  useEffect\(\(\) => \{\n    const move = \(e\) => \{ setCursorX\(e\.clientX\); setCursorY\(e\.clientY\); \};\n    window\.addEventListener\("mousemove", move\);\n    return \(\) => window\.removeEventListener\("mousemove", move\);\n  \}, \[\]\);\n/, '\n');

console.log('✅ Cursor removed');

fs.writeFileSync('src/app/page.tsx', p);
