const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add clock before the theme toggle in sidebar
const oldToggle = `          <div className="flex items-center gap-2 mt-2">
          <ThemeToggle />`;

const newToggle = `          <div className="text-[11px] font-mono text-primary uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-geist-mono)' }}>
            Local Time
          </div>
          <div className="text-primary font-mono mb-3" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '18px' }}>
            {useLocalTime()}
          </div>
          <div className="flex items-center gap-2 mt-2">
          <ThemeToggle />`;

p = p.replace(oldToggle, newToggle);
console.log('✅ Clock added to sidebar');

// Fix ShuffleCard usage
const oldCard = `            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                id={project.slug ? \`project-\${project.slug}\` : undefined}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}
              >
                <BrowserMockupCard project={project} index={idx} />
              </motion.div>
            ))}`;

const newCard = `            {PROJECTS.map((project, idx) => (
              <ShuffleCard key={project.id} index={idx}>
                <motion.div
                  id={project.slug ? \`project-\${project.slug}\` : undefined}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}
                >
                  <BrowserMockupCard project={project} index={idx} />
                </motion.div>
              </ShuffleCard>
            ))}`;

p = p.replace(oldCard, newCard);
console.log('✅ ShuffleCard wrapper added to projects');

fs.writeFileSync('src/app/page.tsx', p);
