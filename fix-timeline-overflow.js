const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Wrap the timeline scroll in a full-bleed container
const oldTimeline = `          <div className="timeline-scroll mb-20 w-full" style={{ maxWidth: '100vw' }}>`;

const newTimeline = `          <div className="timeline-bleed mb-20">
            <div className="timeline-scroll">`;

// Close the extra div
const oldClose = `          </div>

          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
            MY STACK`;

const newClose = `            </div>
          </div>

          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
            MY STACK`;

p = p.replace(oldTimeline, newTimeline);
p = p.replace(oldClose, newClose);
console.log('✅ Timeline wrapped in bleed container');

// Update CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css += `
.timeline-bleed {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
}
.timeline-scroll {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 0 1rem 1rem 1rem;
}
@media (min-width: 768px) {
  .timeline-scroll { gap: 1.5rem; padding: 0 2rem 1rem 2rem; }
}
`;
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Full-bleed CSS added');

fs.writeFileSync('src/app/page.tsx', p);
