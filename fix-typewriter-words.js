const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix the typewriter call to pass all 3 words
const oldCall = `{useTypewriter([["DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"][titleIndex]], { loop: false, typeSpeed: 60 })}`;

const newCall = `{useTypewriter(["DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { loop: true, typeSpeed: 60, deleteSpeed: 40, pauseTime: 2000 })}`;

p = p.replace(oldCall, newCall);
console.log('✅ Typewriter now cycles through all 3 words');

// Also remove the titleIndex cycling since typewriter handles it internally
p = p.replace(
  'useEffect(() => { const t = setInterval(() => setTitleIndex((i) => (i + 1) % 3), 2500); return () => clearInterval(t); }, []);',
  ''
);

// Remove the AnimatePresence wrapper since typewriter handles animation
const oldWrapper = `                  <AnimatePresence mode="wait">
                    <motion.span
                      key={titleIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {useTypewriter(["DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { loop: true, typeSpeed: 60, deleteSpeed: 40, pauseTime: 2000 })}
                      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                    </motion.span>
                  </AnimatePresence>`;

const newWrapper = `                  {useTypewriter(["DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { loop: true, typeSpeed: 60, deleteSpeed: 40, pauseTime: 2000 })}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>`;

p = p.replace(oldWrapper, newWrapper);
console.log('✅ Cleaned up wrapper');

fs.writeFileSync('src/app/page.tsx', p);
