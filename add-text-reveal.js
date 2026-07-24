const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Change all viewport once: true -> once: false (re-trigger on every scroll)
p = p.replace(/viewport=\{\{ once: true, margin: "-100px" \}\}/g, 'viewport={{ once: false, margin: "-100px" }}');
console.log('✅ Animations now re-trigger on every scroll');

// 2. Add word-by-word reveal to "I believe in building digital experiences..."
const oldBelieve = `              <motion.h2
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}
                className="text-[28px] md:text-[40px] font-bold leading-tight mb-8"
              >
                I believe in building digital experiences that drive real results for businesses
                and delight users at every touchpoint.
              </motion.h2>`;

const newBelieve = `              <motion.h2
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}
                className="text-[28px] md:text-[40px] font-bold leading-tight mb-8"
              >
                {"I believe in building digital experiences that drive real results for businesses and delight users at every touchpoint.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>`;

p = p.replace(oldBelieve, newBelieve);
console.log('✅ Word reveal added to "I believe..." heading');

// 3. Add word-by-word reveal to "Have a project in mind..."
const oldProject = `              <motion.h2
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}
                className="text-[28px] md:text-[40px] font-bold leading-tight mb-6"
              >
                Have a project in mind? Let&apos;s build something great together.
              </motion.h2>`;

const newProject = `              <motion.h2
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}
                className="text-[28px] md:text-[40px] font-bold leading-tight mb-6"
              >
                {"Have a project in mind? Let's build something great together.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>`;

p = p.replace(oldProject, newProject);
console.log('✅ Word reveal added to "Have a project..." heading');

fs.writeFileSync('src/app/page.tsx', p);
