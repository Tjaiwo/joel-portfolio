const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldComponent = `function BrowserMockupCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = useCallback(() => {
    /* Small delay so the painted frame is ready before hiding spinner */
    setTimeout(() => setLoaded(true), 400);
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

      {/* Iframe viewport */}
      <motion.div className="browser-frame" whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        {/* Loading spinner overlay */}
        <div className={\`iframe-spinner \${loaded ? "hidden" : ""}\`}>
          <div className="iframe-spinner-ring" />
          <p className="text-[12px] text-muted-foreground/50 mt-3 font-mono uppercase tracking-widest">
            Loading
          </p>
        </div>

        <iframe
          ref={iframeRef}
          src={project.url}
          title={project.title}
          onLoad={handleLoad}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
      </motion.div>`;

const newComponent = `function BrowserMockupCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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

      {/* Iframe viewport */}
      <motion.div className="browser-frame relative" whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        {/* Screenshot fallback */}
        {!hasLoaded && (
          <div className="absolute inset-0 bg-card flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            {!hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                <p className="text-[12px] text-muted-foreground font-mono uppercase tracking-widest">Hover to preview</p>
              </div>
            )}
          </div>
        )}

        {/* Loading spinner */}
        {hovered && !loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="iframe-spinner-ring" />
            <p className="text-[12px] text-muted-foreground/50 mt-3 font-mono uppercase tracking-widest">
              Loading
            </p>
          </div>
        )}

        {/* Iframe loads only on hover */}
        {(hovered || hasLoaded) && (
          <iframe
            ref={iframeRef}
            src={hasLoaded ? project.url : project.url}
            title={project.title}
            onLoad={handleLoad}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            className={loaded ? "opacity-100" : "opacity-0"}
          />
        )}
      </motion.div>`;

p = p.replace(oldComponent, newComponent);
console.log('✅ BrowserMockupCard: hover to load iframe');

fs.writeFileSync('src/app/page.tsx', p);
