const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix the hologram motion.div - allow overflow visible, stronger pop-out
const oldMotion = `      <motion.div
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
      >`;

const newMotion = `      <motion.div
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
      >`;

p = p.replace(oldMotion, newMotion);
console.log('✅ Stronger hologram pop-out');

// Fix: make the parent card allow overflow
p = p.replace(
  'className="browser-card group"',
  'className="browser-card group" style={{ overflow: "visible" }}'
);
console.log('✅ Card allows overflow for hologram');

// Fix iframe: ensure it loads by using a key to force re-mount
const oldIframe = `<iframe
              ref={iframeRef}
              src={project.url}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin"
              className={loaded ? "opacity-100" : "opacity-0"}
            />`;

const newIframe = `<iframe
              key={frameHovered ? 'live' : 'off'}
              ref={iframeRef}
              src={frameHovered ? project.url : 'about:blank'}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin"
              className={loaded ? "opacity-100" : "opacity-0"}
            />`;

p = p.replace(oldIframe, newIframe);
console.log('✅ Iframe forces reload on hover');

// Also ensure container doesn't clip the iframe
p = p.replace(
  '<div className="absolute inset-0 iframe-scale-container"',
  '<div className="absolute inset-0 iframe-scale-container" style={{ clipPath: "none", overflow: "hidden" }}'
);

// CSS - make browser-card not clip
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css += `
.browser-card {
  overflow: visible !important;
}
.browser-frame {
  will-change: transform;
}
`;
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ CSS: card overflow visible');

fs.writeFileSync('src/app/page.tsx', p);
