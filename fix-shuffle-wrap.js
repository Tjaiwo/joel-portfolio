const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldMap = `            {PROJECTS.map((project, idx) => (
              <motion.div key={project.id} id={project.slug ? \`project-\${project.slug}\` : undefined} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}>
                <BrowserMockupCard project={project} index={idx} />
              </motion.div>
            ))}`;

const newMap = `            {PROJECTS.map((project, idx) => (
              <ShuffleCard key={project.id} index={idx}>
                <motion.div id={project.slug ? \`project-\${project.slug}\` : undefined} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}>
                  <BrowserMockupCard project={project} index={idx} />
                </motion.div>
              </ShuffleCard>
            ))}`;

p = p.replace(oldMap, newMap);
console.log('✅ ShuffleCard wrapper applied');

fs.writeFileSync('src/app/page.tsx', p);
