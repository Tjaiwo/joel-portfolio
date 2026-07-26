const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Replace stacking with original grid
const oldStack = `          <div className="stacking-projects mb-20">
            {PROJECTS.map((project, idx) => (
              <StackingCard key={project.id} index={idx} total={PROJECTS.length}>
                <div className="stack-card">
                  <BrowserMockupCard project={project} index={idx} />
                </div>
              </StackingCard>
            ))}
          </div>`;

const newGrid = `          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {PROJECTS.map((project, idx) => (
              <motion.div key={project.id} id={project.slug ? \`project-\${project.slug}\` : undefined} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}>
                <BrowserMockupCard project={project} index={idx} />
              </motion.div>
            ))}
          </div>`;

p = p.replace(oldStack, newGrid);

// Remove StackingCard component
const stackingStart = p.indexOf('function StackingCard');
const backToTop = p.indexOf('/* ──────────────────────── BACK TO TOP ──────────────────────── */');
if (stackingStart > 0) {
  p = p.slice(0, stackingStart) + p.slice(backToTop);
}

// Remove stacking CSS
css = css.replace(/\.stacking-projects[\s\S]*?\.stack-card:hover[\s\S]*?\}/, '');
css = css.replace(/\.stack-card[\s\S]*?\}/, '');

// Restore original card background
css = css.replace('background: #0C0C0C;', 'background: var(--card);');
css = css.replace('background: #1a1a1a;', 'background: var(--muted);');

console.log('✅ Stacking removed, grid restored');

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
