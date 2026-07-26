const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ 1. FIX ABOUT H2 - restore word-by-word animation ═══
const oldAbout = `              <h2 className="text-[28px] md:text-[40px] font-bold leading-tight mb-8">
                <span className="text-reveal">
                  I believe in building digital experiences that drive real results for businesses and delight users at every touchpoint.
                </span>
              </h2>`;

const newAbout = `              <motion.h2
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="text-[28px] md:text-[40px] font-bold leading-tight mb-8"
              >
                {"I believe in building digital experiences that drive real results for businesses and delight users at every touchpoint.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>`;

p = p.replace(oldAbout, newAbout);
console.log('✅ 1. About H2 word animation restored');

// ═══ 2. GRADIENT PILL CTA BUTTON ═══
const oldCta = `                  <button
                    onClick={() => { if (soundEnabled) playClick(); scrollTo("contact"); }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm md:text-[18px] rounded-md hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(80,200,120,0.15)] uppercase"
                  >
                    <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2">LET&apos;S TALK <ArrowUpRight size={16} /></motion.span>
                  </button>`;

const newCta = `                  <button
                    onClick={() => { if (soundEnabled) playClick(); scrollTo("contact"); }}
                    className="gradient-cta inline-flex items-center gap-2 px-8 py-3.5 font-medium text-sm md:text-[18px] rounded-full uppercase tracking-wider transition-all hover:shadow-[0_0_40px_rgba(80,200,120,0.3)] hover:scale-105"
                  >
                    LET&apos;S TALK <ArrowUpRight size={16} />
                  </button>`;

p = p.replace(oldCta, newCta);
console.log('✅ 2. Gradient pill CTA button');

// Add CSS
css += `
.gradient-cta {
  background: linear-gradient(135deg, #0a2a0a 0%, #50C878 50%, #0a2a0a 100%);
  background-size: 200% 200%;
  color: #fff;
  border: none;
  animation: gradient-shift 3s ease infinite;
}
.gradient-cta:hover {
  background-size: 200% 200%;
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
`;

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
