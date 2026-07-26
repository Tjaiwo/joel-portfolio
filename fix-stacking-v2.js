const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Replace stacking section with enhanced version
const oldStack = `          <div className="stacking-projects mb-20">
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

const newStack = `          <div className="stacking-projects mb-20">
            {PROJECTS.map((project, idx) => (
              <StackingCard key={project.id} index={idx} total={PROJECTS.length}>
                <BrowserMockupCard project={project} index={idx} />
              </StackingCard>
            ))}
          </div>`;

p = p.replace(oldStack, newStack);

// Add StackingCard component before BackToTop
const backToTop = '/* ──────────────────────── BACK TO TOP ──────────────────────── */';
const stackingComponent = `
/* ──────────────────────── STACKING CARD ──────────────────────── */
function StackingCard({ children, index, total }: { children: React.ReactNode; index: number; total: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0.3]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0, 4]);
  const shadow = useTransform(scrollYProgress, [0, 0.5], [
    "0 4px 20px rgba(0,0,0,0.1)",
    "0 20px 60px rgba(0,0,0,0.3)"
  ]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -20]);

  return (
    <motion.div
      ref={ref}
      className="sticky top-20 md:top-28"
      style={{
        zIndex: total - index,
        scale,
        opacity,
        filter: \`blur(\${blur}px)\`,
        boxShadow: shadow,
        y
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

`;
p = p.replace(backToTop, stackingComponent + backToTop);

// Update CSS
css = css.replace(/\.stacking-projects[\s\S]*/, ''); // remove old
css += `
.stacking-projects {
  position: relative;
  padding-bottom: 10vh;
}
.stacking-projects > div {
  border-radius: 1rem;
  overflow: hidden;
}
.stacking-projects > div:not(:first-child) {
  margin-top: -55vh;
}
@media (max-width: 767px) {
  .stacking-projects > div:not(:first-child) {
    margin-top: -40vh;
  }
}
`;

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Stacking with scale, shadow, blur');
