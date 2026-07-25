const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Find the hero h1 and the scramble section
const oldH1Block = `              <motion.h1
                variants={fadeInUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="text-[40px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text min-h-[1.2em]"
              >
                WEB
                <br />
                <span className="text-foreground/70 inline-block min-h-[1.2em]">
                  <span className="inline-block">
                    {useScramble(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"])}
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                  </span>
                </span>
                <span className="text-primary">.</span>
              </motion.h1>`;

const newH1Block = `              <motion.h1
                variants={fadeInUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="text-[40px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text"
              >
                <span className="inline-block min-h-[1.3em] md:min-h-0">
                  WEB
                  <br className="md:hidden" />
                  <span className="text-foreground/70">
                    {useScramble(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"])}
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                  </span>
                  <span className="text-primary">.</span>
                </span>
              </motion.h1>`;

p = p.replace(oldH1Block, newH1Block);
console.log('✅ Fixed layout - period stays inline, min-height on mobile only');

fs.writeFileSync('src/app/page.tsx', p);
