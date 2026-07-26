const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Replace stacking with cards that stack ON TOP of each other (not behind)
const oldStack = `          <div className="stacking-projects mb-20">
            {PROJECTS.map((project, idx) => (
              <StackingCard key={project.id} index={idx} total={PROJECTS.length}>
                <BrowserMockupCard project={project} index={idx} />
              </StackingCard>
            ))}
          </div>`;

const newStack = `          <div className="stacking-projects mb-20">
            {PROJECTS.map((project, idx) => (
              <StackingCard key={project.id} index={idx} total={PROJECTS.length}>
                <div className="stack-card">
                  <BrowserMockupCard project={project} index={idx} />
                </div>
              </StackingCard>
            ))}
          </div>`;

p = p.replace(oldStack, newStack);

// Fix StackingCard component - cards stack on top, earlier cards get smaller
const oldComponent = /function StackingCard[\s\S]*?\/\* ──────────────────────── BACK TO TOP ──────────────────────── \*\//;
const newComponent = `function StackingCard({ children, index, total }: { children: React.ReactNode; index: number; total: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  // Earlier cards (lower index) scale down more as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.88, 0.82]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 0.7, 0.3]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0, 6]);

  return (
    <motion.div
      ref={ref}
      className="sticky top-16 md:top-24"
      style={{
        zIndex: index,
        scale,
        opacity,
        filter: \`blur(\${blur}px)\`,
        marginBottom: index < total - 1 ? '20px' : '0'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────── BACK TO TOP ──────────────────────── */`;

p = p.replace(oldComponent, newComponent);

// Clean CSS
css = css.replace(/\.stacking-projects[\s\S]*/, '');
css += `
.stacking-projects {
  position: relative;
  display: flex;
  flex-direction: column;
}
.stacking-projects > div {
  width: 100%;
}
.stack-card {
  background: #0d0d0d;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 1rem;
  overflow: hidden;
  transition: border-color 0.3s;
}
.stack-card:hover {
  border-color: rgba(80, 200, 120, 0.2);
}
`;

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Cards stack on top, darker theme');
