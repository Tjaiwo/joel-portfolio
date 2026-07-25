const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix extra closing paren in timeline map
p = p.replace('              )))}\n            </div>', '              ))}\n            </div>');

console.log('✅ Fixed timeline syntax');
fs.writeFileSync('src/app/page.tsx', p);
