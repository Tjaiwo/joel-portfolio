const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Simplify: remove sandbox restrictions, add allow attributes
const oldIframe = `sandbox="allow-scripts allow-same-origin"`;
const newIframe = `sandbox="allow-scripts allow-same-origin allow-popups allow-forms" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`;

p = p.replace(oldIframe, newIframe);

// Also force iframe to be visible for debugging
p = p.replace(
  `style={{ clipPath: "none", overflow: "hidden", zIndex: loaded ? 10 : 5, display: (frameHovered || hasLoaded) ? 'block' : 'none' }}`,
  `style={{ clipPath: "none", overflow: "hidden", zIndex: loaded ? 10 : 5, display: frameHovered ? 'block' : 'none', pointerEvents: frameHovered ? 'auto' : 'none' }}`
);

// Ensure iframe is positioned on top
p = p.replace(
  `className={loaded ? "opacity-100" : "opacity-0"}`,
  `className={loaded ? "opacity-100" : "opacity-0"} style={{ position: 'relative', zIndex: 5 }}`
);

console.log('✅ Sandbox relaxed, visibility forced');
fs.writeFileSync('src/app/page.tsx', p);
