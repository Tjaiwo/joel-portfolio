const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the entire BrowserMockupCard function
const oldFuncStart = 'function BrowserMockupCard({';
const oldFuncEnd = '/* ──────────────────────── BACK TO TOP ──────────────────────── */';

const newFunc = `function BrowserMockupCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [frameHovered, setFrameHovered] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = useCallback(() => {
    setTimeout(() => {
      setLoaded(true);
      setHasLoaded(true);
    }, 400);
  }, []);

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="browser-card group"
    >
      {/* Browser chrome */}
      <div className="browser-chrome">
        <span className="browser-dot browser-dot-red" />
        <span className="browser-dot browser-dot-yellow" />
        <span className="browser-dot browser-dot-green" />
        <span className="ml-3 text-[12px] text-muted-foreground/60 font-mono truncate select-none">
          {project.url.replace(/^https?:\\/\\//, "")}
        </span>
      </div>

      {/* Viewport - hologram effect on hover */}
      <motion.div
        className="browser-frame relative cursor-pointer"
        onMouseEnter={() => setFrameHovered(true)}
        onMouseLeave={() => setFrameHovered(false)}
        animate={frameHovered ? {
          scale: 1.04,
          rotateX: -3,
          rotateY: 2,
          z: 30,
          boxShadow: "0 25px 50px -12px rgba(80, 200, 120, 0.25)"
        } : {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          boxShadow: "0 0 0 0 rgba(80, 200, 120, 0)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      >
        {/* Screenshot (always visible) */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
          style={{ opacity: frameHovered && loaded ? 0 : 1, transition: 'opacity 0.3s' }}
        />

        {/* Iframe loads on frame hover */}
        {frameHovered && (
          <div className="absolute inset-0 iframe-scale-container" style={{ zIndex: loaded ? 10 : 5 }}>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-20">
                <div className="iframe-spinner-ring" />
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={project.url}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin"
              className={loaded ? "opacity-100" : "opacity-0"}
            />
          </div>
        )}
      </motion.div>

      {/* Card info footer */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[14px] md:text-[16px] font-semibold truncate group-hover:text-primary transition-colors hover:underline underline-offset-2"
          >
            {project.title}
          </a>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-1.5 rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
            aria-label={\`Visit \${project.title}\`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={13} />
          </a>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[12px] rounded-full border border-border text-muted-foreground/70 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Designer credit line */}
        {project.designer && (
          <div className="pt-2 border-t border-border text-[12px] text-muted-foreground/60">
            UI/UX Designer -{" "}
            <a
              href={DESIGNER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline underline-offset-2 decoration-border hover:decoration-foreground/40"
            >
              {DESIGNER.name}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ──────────────────────── BACK TO TOP ──────────────────────── */`;

// Find and replace the function
const startIdx = p.indexOf(oldFuncStart);
const endIdx = p.indexOf(oldFuncEnd);

if (startIdx > 0 && endIdx > startIdx) {
  p = p.slice(0, startIdx) + newFunc + p.slice(endIdx + oldFuncEnd.length);
  console.log('✅ BrowserMockupCard replaced with hologram version');
} else {
  console.log('⚠️ Could not find function boundaries');
}

// Clean up CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/\/\* Scale iframe to fit card \*\/[\s\S]*?\}/, '');
css += `
.iframe-scale-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.iframe-scale-container iframe {
  width: 1440px;
  height: 900px;
  border: none;
  transform-origin: top left;
}
@media (max-width: 640px) {
  .iframe-scale-container iframe { transform: scale(0.22); }
}
@media (min-width: 641px) and (max-width: 1024px) {
  .iframe-scale-container iframe { transform: scale(0.28); }
}
@media (min-width: 1025px) and (max-width: 1280px) {
  .iframe-scale-container iframe { transform: scale(0.25); }
}
@media (min-width: 1281px) {
  .iframe-scale-container iframe { transform: scale(0.30); }
}
`;
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ CSS updated');

fs.writeFileSync('src/app/page.tsx', p);
