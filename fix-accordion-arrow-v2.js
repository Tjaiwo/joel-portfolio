const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Put back the pulse but keep rotate working
const oldSpan = `<motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0 ml-4 [animation:pulse-chevron_2s_ease-in-out_infinite]"
                    >`;

const newSpan = `<motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0 ml-4"
                      style={isOpen ? {} : { animation: 'pulse-chevron 2s ease-in-out infinite' }}
                    >`;

if (p.includes(oldSpan)) {
  p = p.replace(oldSpan, newSpan);
  console.log('✅ Pulse when closed, rotate when open');
} else {
  // Check current state
  const current = p.match(/<motion\.span\s*\n\s*animate=\{\{ rotate: isOpen \? 180 : 0 \}\}[\s\S]*?>/);
  if (current) console.log('Current:', current[0]);
  else console.log('⚠️ Pattern not found');
}

fs.writeFileSync('src/app/page.tsx', p);
