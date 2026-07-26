const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the entire timeline section with a guaranteed-scrollable version
const oldSection = `          {/* ─── PROCESS TIMELINE ─── */}
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
            FROM IDEA TO LAUNCH
          </motion.h2>
          <div className="timeline-bleed mb-20">
            <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll", gap: "1rem", paddingBottom: "1rem", WebkitOverflowScrolling: "touch" }}>`;

const newSection = `          {/* ─── PROCESS TIMELINE ─── */}
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
            FROM IDEA TO LAUNCH
          </motion.h2>
          <div className="timeline-bleed mb-20">
            <div className="timeline-track">`;

// Update close
const oldClose = `            </div>
          </div>

          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
            MY STACK`;

const newClose = `            </div>
          </div>

          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
            MY STACK`;

p = p.replace(oldSection, newSection);
p = p.replace(oldClose, newClose);

// Replace card class
p = p.replace(
  'className="timeline-card" style={{ flex: "0 0 260px", minWidth: "260px" }}',
  'className="timeline-card"'
);

console.log('✅ Simplified timeline');

// Wipe old timeline CSS and add clean version
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/\.timeline-bleed[\s\S]*/, ''); // remove all old timeline CSS

css += `
.timeline-bleed {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}
.timeline-track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0 1rem 1rem;
  scrollbar-width: none;
}
.timeline-track::-webkit-scrollbar { display: none; }
.timeline-card {
  flex: 0 0 260px;
  padding: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.03);
  transition: all 0.2s;
}
.timeline-card:hover {
  background: rgba(80,200,120,0.05);
  border-color: rgba(80,200,120,0.25);
}
@media (min-width: 768px) {
  .timeline-track { gap: 1.5rem; padding: 0 2rem 1rem; }
  .timeline-card { flex: 0 0 280px; }
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Clean CSS added');

fs.writeFileSync('src/app/page.tsx', p);
