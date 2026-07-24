const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldSpan = `<motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0 ml-4"
                    >`;

const newSpan = `<motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0 ml-4 [animation:pulse-chevron_2s_ease-in-out_infinite]"
                    >`;

if (p.includes(oldSpan)) {
  p = p.replace(oldSpan, newSpan);
  console.log('✅ Pulse added back to accordion arrow');
}

fs.writeFileSync('src/app/page.tsx', p);
