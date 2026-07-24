const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove the stray closing tag
const strayTag = '      </motion.div>\n        </section>';
const fixedTag = '        </section>';

p = p.replace(strayTag, fixedTag);
console.log('✅ Removed stray closing tag');

fs.writeFileSync('src/app/page.tsx', p);
