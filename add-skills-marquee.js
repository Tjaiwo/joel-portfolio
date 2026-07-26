const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Add marquee component before BackToTop
const backToTop = '/* ──────────────────────── BACK TO TOP ──────────────────────── */';
const marqueeComponent = `
/* ──────────────────────── SKILLS MARQUEE ──────────────────────── */
function SkillsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const row1X = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const row2X = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  const allSkills = [...SKILLS_CORE, ...SKILLS_KEY, ...SKILLS_NOCODE];
  const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
  const row2 = allSkills.slice(Math.ceil(allSkills.length / 2));

  return (
    <div ref={ref} className="skills-marquee">
      <motion.div className="marquee-row" style={{ x: row1X }}>
        {[...row1, ...row1, ...row1].map((skill, i) => (
          <span key={i} className="marquee-tag">
            {skill}
          </span>
        ))}
      </motion.div>
      <motion.div className="marquee-row" style={{ x: row2X }}>
        {[...row2, ...row2, ...row2].map((skill, i) => (
          <span key={i} className="marquee-tag">
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

`;
p = p.replace(backToTop, marqueeComponent + backToTop);

// Add marquee between MY STACK heading and the skills grid
const myStackHeading = '          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">\n            MY STACK\n          </motion.h2>';

const myStackWithMarquee = `          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
            MY STACK
          </motion.h2>
          
          <SkillsMarquee />

          <div className="space-y-12 mt-20">`;

p = p.replace(myStackHeading, myStackWithMarquee);

// Add CSS
css += `
.skills-marquee {
  overflow: hidden;
  padding: 2rem 0;
  position: relative;
}
.marquee-row {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
  will-change: transform;
}
.marquee-tag {
  flex-shrink: 0;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  border: 1px solid rgba(80, 200, 120, 0.2);
  background: rgba(80, 200, 120, 0.05);
  color: #50C878;
  font-family: monospace;
  font-size: 0.875rem;
  white-space: nowrap;
  transition: all 0.3s;
}
.marquee-tag:hover {
  background: rgba(80, 200, 120, 0.15);
  border-color: rgba(80, 200, 120, 0.4);
}
@media (min-width: 768px) {
  .marquee-tag {
    font-size: 1rem;
    padding: 0.875rem 1.75rem;
  }
}
`;

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Skills marquee added');
