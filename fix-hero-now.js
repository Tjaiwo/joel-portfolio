const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldBlock = `              <motion.h1
                variants={fadeInUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="text-[40px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text min-h-[1.2em]"
              >
                <span className="text-foreground/70 inline-block min-h-[1.2em]">
                  <span className="inline-block">
                    {useScramble(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"])}
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                  </span>
                </span>
                <span className="text-primary">.</span>
              </motion.h1>`;

const newBlock = `              <motion.h1
                variants={fadeInUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="text-[36px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-6 glow-text"
                style={{ minHeight: 'clamp(48px, 12vw, 80px)' }}
              >
                <span className="text-foreground/70">
                  {useScramble(["WEB DEVELOPER.", "SEO EXPERT.", "NO/LOW CODE HASHIRA."])}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                </span>
              </motion.h1>`;

p = p.replace(oldBlock, newBlock);
console.log('✅ Done: 36px, WEB in scramble, period inline, stable height');

fs.writeFileSync('src/app/page.tsx', p);
