const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the entire h1 content so both WEB and the typewriter cycle
const oldH1 = `                WEB
                <br />
                <span className="text-muted-foreground">
                  {useTypewriter(["DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { loop: true, typeSpeed: 60, deleteSpeed: 40, pauseTime: 2000 })}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                </span>
                <span className="text-primary">.</span>`;

const newH1 = `                <span className="text-muted-foreground">
                  {useTypewriter(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { loop: true, typeSpeed: 60, deleteSpeed: 40, pauseTime: 2000 })}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                </span>
                <span className="text-primary">.</span>`;

p = p.replace(oldH1, newH1);
console.log('✅ Full line typewriter - WEB clears with each cycle');

fs.writeFileSync('src/app/page.tsx', p);
