const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ═══ COMPLETE HERO H1 REPLACEMENT ═══
// Covers: 36px mobile, WEB in scramble, period inline, no layout shift, stable height

const oldH1Block = `              <motion.h1
                variants={fadeInUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="text-[40px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-6 glow-text"
              >
                WEB
                <br />
                <span className="text-foreground/70 text-[32px] md:text-6xl lg:text-7xl">
                  {useScramble(["WEB DEVELOPER.", "SEO EXPERT.", "NO/LOW CODE HASHIRA."])}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                </span>
              </motion.h1>`;

const newH1Block = `              <motion.h1
                variants={fadeInUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="text-[36px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-6 glow-text"
                style={{ minHeight: 'clamp(48px, 12vw, 80px)' }}
              >
                <span className="text-foreground/70">
                  {useScramble(["WEB DEVELOPER.", "SEO EXPERT.", "NO/LOW CODE HASHIRA."])}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>|</motion.span>
                </span>
              </motion.h1>`;

p = p.replace(oldH1Block, newH1Block);
console.log('✅ Hero h1: 36px mobile, WEB in scramble, stable height, period inline');

fs.writeFileSync('src/app/page.tsx', p);
