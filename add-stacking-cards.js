const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the Featured Works grid with sticky stacking cards
const oldProjects = `          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {PROJECTS.map((project, idx) => (
              <motion.div key={project.id} id={project.slug ? \`project-\${project.slug}\` : undefined} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}>
                <BrowserMockupCard project={project} index={idx} />
              </motion.div>
            ))}
          </div>`;

const newProjects = `          <div className="stacking-projects mb-20">
            {PROJECTS.map((project, idx) => {
              const targetScale = 1 - (PROJECTS.length - 1 - idx) * 0.03;
              return (
                <motion.div
                  key={project.id}
                  className="sticky top-24 md:top-32"
                  style={{
                    zIndex: idx,
                    marginTop: idx === 0 ? 0 : undefined
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <BrowserMockupCard project={project} index={idx} />
                </motion.div>
              );
            })}
          </div>`;

p = p.replace(oldProjects, newProjects);
console.log('✅ Stacking cards');

// Add CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css += `
.stacking-projects {
  position: relative;
}
.stacking-projects > div {
  position: sticky;
}
.stacking-projects > div:not(:first-child) {
  margin-top: -60vh;
}
@media (max-width: 767px) {
  .stacking-projects > div:not(:first-child) {
    margin-top: -50vh;
  }
}
`;
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Stacking CSS');

fs.writeFileSync('src/app/page.tsx', p);
