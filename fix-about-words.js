const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldAbout = `              <motion.h2
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

const newAbout = `              <motion.h2
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
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

p = p.replace(oldAbout, newAbout);
console.log('✅ About H2: word-by-word on scroll');

fs.writeFileSync('src/app/page.tsx', p);
