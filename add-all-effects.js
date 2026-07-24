const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// ═══ 1. TYPEWRITER HOOK ═══
const typewriterHook = `function useTypewriter(words, { loop = false, typeSpeed = 80, deleteSpeed = 50 } = {}) {
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[0];
    let timer;
    if (!deleting && charIndex < word.length) {
      timer = setTimeout(() => setCharIndex(charIndex + 1), typeSpeed);
    } else if (!deleting && charIndex === word.length) {
      if (loop) timer = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex(charIndex - 1), deleteSpeed);
    }
    return () => clearTimeout(timer);
  }, [charIndex, deleting, words, loop, typeSpeed, deleteSpeed]);

  return words[0].substring(0, charIndex);
}

`;

p = p.replace("export default function Home() {", typewriterHook + "\nexport default function Home() {");
console.log('1. Typewriter hook');

// ═══ 2. HERO TYPING ═══
p = p.replace(
  '<span className="text-primary">FRONTEND ENGINEER</span>',
  '<span className="text-primary">\n                  {useTypewriter(["FRONTEND ENGINEER"], { loop: false, typeSpeed: 80 })}\n                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} className="inline-block ml-0.5">|</motion.span>\n                </span>'
);
console.log('2. Hero typing');

// ═══ 3. CURSOR STATE ═══
p = p.replace(
  'const [openExpIdx, setOpenExpIdx] = useState(-1);',
  'const [openExpIdx, setOpenExpIdx] = useState(-1);\n  const [cursorX, setCursorX] = useState(-100);\n  const [cursorY, setCursorY] = useState(-100);'
);

// Add cursor useEffect
p = p.replace(
  '}, [mobileMenuOpen]);',
  '}, [mobileMenuOpen]);\n\n  useEffect(() => {\n    const move = (e) => { setCursorX(e.clientX); setCursorY(e.clientY); };\n    window.addEventListener("mousemove", move);\n    return () => window.removeEventListener("mousemove", move);\n  }, []);'
);
console.log('3. Cursor state + tracking');

// ═══ 4. CURSOR ELEMENTS ═══
const cursorElements = '{/* CUSTOM CURSOR */}\n        <motion.div className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference" style={{ translateX: cursorX - 6, translateY: cursorY - 6 }} />\n        <motion.div className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9998]" style={{ translateX: cursorX - 16, translateY: cursorY - 16 }} />\n\n        ';
p = p.replace('{/* ─── FOOTER ─── */}', cursorElements + '{/* ─── FOOTER ─── */}');
console.log('4. Cursor elements');

// ═══ 5. MAGNETIC CTA ═══
p = p.replace(
  'LET&apos;S TALK <ArrowUpRight size={16} />',
  '<motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2">LET&apos;S TALK <ArrowUpRight size={16} /></motion.span>'
);
console.log('5. Magnetic CTA');

// ═══ 6. STAGGERED CARDS ═══
p = p.replace(
  '{PROJECTS.map((project, idx) => (\n              <div key={project.id} id={project.slug ? `project-${project.slug}` : undefined}>\n                <BrowserMockupCard project={project} index={idx} />\n              </div>\n            ))}',
  '{PROJECTS.map((project, idx) => (\n              <motion.div key={project.id} id={project.slug ? `project-${project.slug}` : undefined} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, margin: "-50px" }} transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}>\n                <BrowserMockupCard project={project} index={idx} />\n              </motion.div>\n            ))}'
);
console.log('6. Staggered cards');

// ═══ 7. COUNTER ANIMATION ═══
const oldStat = '<h3 className="text-lg md:text-xl font-bold text-primary">\n                      {stat.value}\n                    </h3>';
const newStat = '<CountUp from={0} to={stat.target} suffix={stat.suffix} duration={2} delay={i * 0.2} className="text-lg md:text-xl font-bold text-primary" />';
p = p.replace(oldStat, newStat);
console.log('7. Counter animation');

// ═══ 8. FLOATING SKILL TAGS ═══
css += '\n@keyframes float-tag {\n  0%, 100% { transform: translateY(0px); }\n  50% { transform: translateY(-3px); }\n}\n.skill-tag { animation: float-tag 4s ease-in-out infinite; }\n';
console.log('8. Floating skill tags');

// ═══ 9. HOVER TILT ═══
p = p.replace('<div className="browser-frame">', '<motion.div className="browser-frame" whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>');

// Fix closing tag - find the closing div before Card info footer
const oldClose = '      </div>\n\n      {/* Card info footer */}';
const newClose = '      </motion.div>\n\n      {/* Card info footer */}';
p = p.replace(oldClose, newClose);
console.log('9. Hover tilt');

// ═══ 10. CURSOR CSS ═══
css += '\n@media (hover: hover) and (pointer: fine) {\n  a:hover ~ .custom-cursor,\n  button:hover ~ .custom-cursor {\n    transform: scale(2);\n  }\n}\n';
console.log('10. Cursor CSS');

// ═══ SAVE ═══
fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log('\nDone! All 10 effects applied.');
