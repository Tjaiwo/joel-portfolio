const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix hero: wrap "DEVELOPER" with typewriter
const oldHero = `                WEB
                <br />
                <span className="text-muted-foreground">DEVELOPER</span>
                <span className="text-primary">.</span>`;

const newHero = `                WEB
                <br />
                <span className="text-muted-foreground">
                  {useTypewriter(["DEVELOPER"], { loop: false, typeSpeed: 80 })}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} className="inline-block ml-0.5">|</motion.span>
                </span>
                <span className="text-primary">.</span>`;

p = p.replace(oldHero, newHero);
console.log('✅ Hero typewriter fixed for "DEVELOPER"');

fs.writeFileSync('src/app/page.tsx', p);
