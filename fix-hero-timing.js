const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ═══ 1. PRELOADER TO 2 SECONDS ═══
p = p.replace(
  'setTimeout(() => setGlitchDone(true), 2500)',
  'setTimeout(() => setGlitchDone(true), 2000)'
);
console.log('✅ 1. Preloader: 2 seconds');

// ═══ 2. HERO FADE-IN UP ═══
// Replace hero section with fadeInUp animation triggered by glitchDone
const oldHero = '<section id="home" className="relative min-h-screen flex items-center pt-[90px] lg:pt-[120px] pb-20 lg:pb-20 overflow-hidden" style={{ opacity: glitchDone ? 1 : 0, transform: glitchDone ? "translateY(0)" : "translateY(20px)", transition: "opacity 1s ease-out 0.5s, transform 1s ease-out 0.5s" }}>';

const newHero = `<section id="home" className="relative min-h-screen flex items-center pt-[90px] lg:pt-[120px] pb-20 lg:pb-20 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, y: 40 }}
        animate={glitchDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
      >`;

p = p.replace(oldHero, newHero);
console.log('✅ 2. Hero fade-in up animation');

// Close the motion.div at the end of the hero section
const heroClose = '      </ContentWidth>\n        </section>';
const heroCloseNew = `      </ContentWidth>
      </motion.div>
        </section>`;

p = p.replace(heroClose, heroCloseNew);
console.log('✅ 3. Hero motion.div closed');

// Update main transition timing
p = p.replace(
  'transition: "opacity 1s ease-out 0.5s"',
  'transition: "opacity 0.8s ease-out 0.2s"'
);
console.log('✅ 4. Main fade sync');

fs.writeFileSync('src/app/page.tsx', p);
