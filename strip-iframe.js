const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the entire BrowserMockupCard with screenshot-only version
const startMarker = 'function BrowserMockupCard({';
const endMarker = '/* ──────────────────────── BACK TO TOP ──────────────────────── */';

const newFunc = `function BrowserMockupCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="browser-card group"
    >
      <div className="browser-chrome">
        <span className="browser-dot browser-dot-red" />
        <span className="browser-dot browser-dot-yellow" />
        <span className="browser-dot browser-dot-green" />
        <span className="ml-3 text-[12px] text-muted-foreground/60 font-mono truncate select-none">
          {project.url.replace(/^https?:\\/\\//, "")}
        </span>
      </div>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="browser-frame relative block overflow-hidden"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </a>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
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
}`;

const startIdx = p.indexOf(startMarker);
const endIdx = p.indexOf(endMarker);

if (startIdx > 0 && endIdx > startIdx) {
  p = p.slice(0, startIdx) + newFunc + '\n\n' + p.slice(endIdx);
  console.log('✅ Clean screenshot-only cards');
}

// Remove unused state imports if needed - BrowserMockupCard no longer uses them
// but they may be used elsewhere, so leave them

fs.writeFileSync('src/app/page.tsx', p);
