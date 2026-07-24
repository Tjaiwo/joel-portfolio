const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldH2 = `              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-[28px] md:text-[40px] font-bold leading-tight mb-8"
              >
                {"I believe in building digital experiences that drive real results for businesses and delight users at every touchpoint.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>`;

const newH2 = `              <h2 className="text-[28px] md:text-[40px] font-bold leading-tight mb-8">
                <span className="text-reveal">
                  I believe in building digital experiences that drive real results for businesses and delight users at every touchpoint.
                </span>
              </h2>`;

p = p.replace(oldH2, newH2);
console.log('✅ Replaced with simple h2 - no animation issues');

// Add CSS for a clean reveal
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css += `
.text-reveal {
  background: linear-gradient(90deg, var(--foreground) 0%, var(--foreground) 100%);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: reveal-text 1s ease-out forwards;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
@keyframes reveal-text {
  from { background-size: 0% 100%; }
  to { background-size: 100% 100%; }
}
`;
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Added text-reveal CSS');

fs.writeFileSync('src/app/page.tsx', p);
