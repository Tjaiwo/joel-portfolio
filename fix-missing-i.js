const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the entire word-by-word block with a simpler fade-in
const oldBlock = `{"I believe in building digital experiences that drive real results for businesses and delight users at every touchpoint.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="inline-block mr-[0.25em] min-w-[0.5em]"
                  >
                    {word}
                  </motion.span>
                ))}`;

const newBlock = `{"I believe in building digital experiences that drive real results for businesses and delight users at every touchpoint.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px", amount: 0.1 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="inline-block mr-[0.25em]"
                    style={{ display: "inline-block" }}
                  >
                    {word}
                  </motion.span>
                ))}`;

p = p.replace(oldBlock, newBlock);
console.log('✅ Fixed word reveal - lower margin, explicit display');

fs.writeFileSync('src/app/page.tsx', p);
