const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the viewport section - split hologram effect from iframe
const oldViewport = `      {/* Viewport - hologram effect on hover */}
      <motion.div
        className="browser-frame relative cursor-pointer"
        onMouseEnter={() => setFrameHovered(true)}
        onMouseLeave={() => setFrameHovered(false)}
        animate={frameHovered ? {
          scale: 1.08,
          rotateX: -5,
          rotateY: 4,
          z: 50,
          boxShadow: "0 35px 70px -15px rgba(80, 200, 120, 0.35), 0 0 100px -20px rgba(80, 200, 120, 0.2)"
        } : {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          boxShadow: "0 0 0 0 rgba(80, 200, 120, 0)"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      >
        {/* Screenshot (always visible) */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
          style={{ opacity: hasLoaded ? 0 : 1, transition: 'opacity 0.3s' }}
        />

        {/* Iframe - always renders, hidden until hover */}
        <div className="absolute inset-0 iframe-scale-container" style={{ overflow: "hidden", opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}>
            <div className={\`absolute inset-0 flex items-center justify-center bg-background/90 z-20 \${loaded ? 'hidden' : ''}\`}>
              <div className="iframe-spinner-ring" />
            </div>
            <iframe
              ref={iframeRef}
              src={frameHovered || hasLoaded ? project.url : undefined}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              className="absolute inset-0"
            />
          </div>
      </motion.div>`;

const newViewport = `      {/* Viewport - hologram effect on hover */}
      <motion.div
        className="browser-frame relative cursor-pointer"
        onMouseEnter={() => setFrameHovered(true)}
        onMouseLeave={() => setFrameHovered(false)}
        animate={frameHovered ? {
          boxShadow: "0 35px 70px -15px rgba(80, 200, 120, 0.35), 0 0 100px -20px rgba(80, 200, 120, 0.2)"
        } : {
          boxShadow: "0 0 0 0 rgba(80, 200, 120, 0)"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Screenshot (always visible) */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
          style={{ opacity: hasLoaded ? 0 : 1, transition: 'opacity 0.3s' }}
        />

        {/* Hologram lift layer - separate from iframe */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={frameHovered ? {
            scale: 1.08,
            rotateX: -5,
            rotateY: 4,
            z: 50,
          } : {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            z: 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        />

        {/* Iframe - loads on hover */}
        <div className="absolute inset-0 iframe-scale-container" style={{ overflow: "hidden", opacity: loaded ? 1 : 0, transition: 'opacity 0.3s', zIndex: loaded ? 5 : 0 }}>
            <div className={\`absolute inset-0 flex items-center justify-center bg-background/90 z-20 \${loaded ? 'hidden' : ''}\`}>
              <div className="iframe-spinner-ring" />
            </div>
            <iframe
              ref={iframeRef}
              src={frameHovered || hasLoaded ? project.url : undefined}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              className="absolute inset-0"
            />
          </div>
      </motion.div>`;

p = p.replace(oldViewport, newViewport);
console.log('✅ Hologram effect separated from iframe');

fs.writeFileSync('src/app/page.tsx', p);
