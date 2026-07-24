const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ═══ 1. LIVE CLOCK COMPONENT ═══
const clockHook = `function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

`;

p = p.replace("export default function Portfolio() {", clockHook + "\nexport default function Portfolio() {");
console.log('✅ 1. Clock hook added');

// Add clock to sidebar
const sidebarClose = '</nav>\n\n          <ThemeToggle className="mt-2" />';
const sidebarWithClock = `</nav>

          <div className="space-y-3 mt-auto">
            <div className="text-[11px] font-mono text-primary uppercase tracking-wider" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              Local Time
            </div>
            <div className="text-primary font-mono" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '18px' }}>
              {useLocalTime()}
            </div>
          </div>

          <ThemeToggle className="mt-2" />`;

p = p.replace(sidebarClose, sidebarWithClock);
console.log('✅ 2. Clock added to sidebar');

// ═══ 3. CARD SHUFFLE EFFECT ═══
// Replace the project cards grid with shuffle wrapper
const oldGrid = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                id={project.slug ? \`project-\${project.slug}\` : undefined}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}
              >
                <BrowserMockupCard project={project} index={idx} />
              </motion.div>
            ))}
          </div>`;

const newGrid = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {PROJECTS.map((project, idx) => (
              <ShuffleCard key={project.id} index={idx}>
                <motion.div
                  id={project.slug ? \`project-\${project.slug}\` : undefined}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}
                >
                  <BrowserMockupCard project={project} index={idx} />
                </motion.div>
              </ShuffleCard>
            ))}
          </div>`;

p = p.replace(oldGrid, newGrid);
console.log('✅ 3. Shuffle cards added');

// Add ShuffleCard component
const shuffleComponent = `
function ShuffleCard({ children, index }: { children: React.ReactNode; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered ? {
        scale: 1.03,
        rotateZ: (index % 2 === 0 ? 1 : -1) * 1.5,
        zIndex: 10,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {
        scale: 1,
        rotateZ: 0,
        zIndex: 1,
        transition: { type: "spring", stiffness: 300, damping: 25 }
      }}
      style={{ position: 'relative', transformOrigin: 'center bottom' }}
    >
      {children}
    </motion.div>
  );
}

`;

p = p.replace('/* ──────────────────────── BACK TO TOP ──────────────────────── */', shuffleComponent + '\n/* ──────────────────────── BACK TO TOP ──────────────────────── */');
console.log('✅ 4. ShuffleCard component added');

fs.writeFileSync('src/app/page.tsx', p);
