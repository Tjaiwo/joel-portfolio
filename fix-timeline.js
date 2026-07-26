const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix extra paren in timeline
p = p.replace('                )))}\n              </div>', '                ))}\n              </div>');

console.log('✅ Fixed timeline syntax');

// Clean orphaned CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/\n\s*10% \{ opacity: 1; \}\n\s*\}\n?/, '\n');
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Cleaned CSS');

fs.writeFileSync('src/app/page.tsx', p);
