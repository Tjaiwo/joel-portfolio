const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix: remove the broken AnimatePresence/motion.main wrapper
// Find the current broken pattern and replace with clean main
const brokenStart = '<AnimatePresence mode="wait">\n      <motion.main\n        key="main-content"\n        initial={{ opacity: 0 }}\n        animate={{ opacity: 1 }}\n        exit={{ opacity: 0 }}\n        transition={{ duration: 0.3 }}\n        className="relative min-h-screen"\n      >';
const cleanStart = '<main className="relative min-h-screen">';

p = p.replace(brokenStart, cleanStart);

const brokenEnd = '            </motion.main>\n    </AnimatePresence>';
const cleanEnd = '</main>';

p = p.replace(brokenEnd, cleanEnd);
console.log('✅ Structure fixed');

fs.writeFileSync('src/app/page.tsx', p);
