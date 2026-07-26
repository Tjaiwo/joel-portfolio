const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Find the timeline section and wrap it properly
const oldTimeline = `          {/* ─── PROCESS TIMELINE ─── */}
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
            FROM IDEA TO LAUNCH
          </motion.h2>
          <div className="timeline-scroll mb-20">`;

const newTimeline = `          {/* ─── PROCESS TIMELINE ─── */}
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
            FROM IDEA TO LAUNCH
          </motion.h2>
          <div className="timeline-scroll mb-20 w-full" style={{ maxWidth: '100vw' }}>`;

p = p.replace(oldTimeline, newTimeline);

// Update CSS for better mobile behavior
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(
  '.timeline-scroll {',
  `.timeline-scroll {
  width: 100%;
  max-width: 100vw;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 1rem;
  padding-right: 1rem;`
);

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Timeline mobile fixed');
