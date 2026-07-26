const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix primary CTA border-radius back to rounded-md
p = p.replace(
  'className="gradient-cta inline-flex items-center gap-2 px-8 py-3.5 font-medium text-sm md:text-[18px] rounded-full uppercase tracking-wider transition-all hover:shadow-[0_0_40px_rgba(80,200,120,0.3)] hover:scale-105"',
  'className="gradient-cta inline-flex items-center gap-2 px-8 py-3.5 font-medium text-sm md:text-[18px] rounded-md uppercase tracking-wider transition-all hover:shadow-[0_0_40px_rgba(80,200,120,0.3)] hover:scale-105"'
);
console.log('✅ Primary CTA: rounded-md');

// 2. Style secondary CTA with outline gradient + magnetic hover
const oldSecondary = `                <button
                  onClick={() => scrollTo("projects-skills")}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium text-sm md:text-[18px] rounded-md hover:border-foreground/20 transition-all uppercase"
                >
                  VIEW PROJECTS
                </button>`;

const newSecondary = `                <MagneticButton strength={0.3}>
                  <button
                    onClick={() => { if (soundEnabled) playClick(); scrollTo("projects-skills"); }}
                    className="outline-cta inline-flex items-center gap-2 px-8 py-3.5 font-medium text-sm md:text-[18px] rounded-md uppercase tracking-wider transition-all"
                  >
                    VIEW PROJECTS
                  </button>
                </MagneticButton>`;

p = p.replace(oldSecondary, newSecondary);
console.log('✅ Secondary CTA: outline gradient + magnetic');

// Add CSS for outline CTA
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css += `
.outline-cta {
  background: transparent;
  color: #50C878;
  border: 2px solid #50C878;
  position: relative;
  overflow: hidden;
}
.outline-cta::before {
  content: "";
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(80,200,120,0.1), transparent);
  transition: left 0.5s;
}
.outline-cta:hover::before {
  left: 100%;
}
.outline-cta:hover {
  box-shadow: 0 0 30px rgba(80,200,120,0.2);
}
`;

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
