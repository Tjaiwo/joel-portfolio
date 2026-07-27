const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ 1. UPGRADE fadeInUp WITH BLUR ═══
const oldFadeInUp = `const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};`;

const newFadeInUp = `const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};`;

p = p.replace(oldFadeInUp, newFadeInUp);
console.log('✅ 1. fadeInUp now includes blur reveal');

// ═══ 2. ADD TRUST LINE UNDER STATS ═══
const statsEnd = '{/* Stats */}';
const trustLine = `{/* Stats */}
              <motion.div
                variants={fadeInUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-border pt-8"
              >
                {STATS.map((stat, i) => (
                  <motion.div key={stat.label} variants={fadeInUp} custom={5 + i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                    <CountUp from={0} to={stat.target} suffix={stat.suffix} duration={2} delay={i * 0.2} className="text-xl md:text-2xl font-bold text-primary" />
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                variants={fadeInUp} custom={9} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="text-muted-foreground/50 text-xs md:text-sm font-light mt-6 tracking-wide"
              >
                Trusted by 50+ clients across 4 continents. Based in Lagos, NG. 10+ years of delivering results.
              </motion.p>`;

p = p.replace(statsEnd, trustLine);

// Now fix the duplicate Stats section (the old one needs to be removed)
const oldStatsBlock = `              {/* Stats */}
              <motion.div
                variants={fadeInUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-border pt-8"
              >
                {STATS.map((stat, i) => (
                  <motion.div key={stat.label} variants={fadeInUp} custom={5 + i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                    <CountUp from={0} to={stat.target} suffix={stat.suffix} duration={2} delay={i * 0.2} className="text-xl md:text-2xl font-bold text-primary" />
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>`;

// The replacement already includes the stats, so remove the old one
p = p.replace(oldStatsBlock, '');

console.log('✅ 2. Trust line added under stats');

// ═══ 3. CTA PRESS-DOWN SCALE ═══
p = p.replace(
  'hover:shadow-[0_0_40px_rgba(80,200,120,0.3)] hover:scale-105"',
  'hover:shadow-[0_0_40px_rgba(80,200,120,0.3)] hover:scale-105 active:scale-[0.97]"'
);

// Also add to secondary CTA
p = p.replace(
  'hover:shadow-[0_0_30px_rgba(80,200,120,0.15)] uppercase"',
  'hover:shadow-[0_0_30px_rgba(80,200,120,0.15)] active:scale-[0.97] uppercase"'
);

// Add to all buttons
p = p.replace(
  /className="([^"]*hover:bg-primary\/90[^"]*)"/g,
  (match) => match.replace('"', ' active:scale-[0.97]"')
);

console.log('✅ 3. CTA press-down scale active:scale-[0.97] added');

fs.writeFileSync('src/app/page.tsx', p);
