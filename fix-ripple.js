const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove the old onMouseDown ripple approach
const oldFrame = 'className="browser-frame relative block overflow-hidden ripple-container"\n        onMouseDown={(e) => {\n          const rect = e.currentTarget.getBoundingClientRect();\n          const x = e.clientX - rect.left;\n          const y = e.clientY - rect.top;\n          const ripple = document.createElement(\'span\');\n          ripple.className = \'ripple-effect\';\n          ripple.style.left = x + \'px\';\n          ripple.style.top = y + \'px\';\n          e.currentTarget.appendChild(ripple);\n          setTimeout(() => ripple.remove(), 600);\n        }}';

const newFrame = 'className="browser-frame relative block overflow-hidden ripple-card"';

p = p.replace(oldFrame, newFrame);
console.log('Removed old ripple JS');

// Update CSS with cleaner approach
css = css.replace(/\.ripple-container[\s\S]*?@keyframes ripple-expand[\s\S]*?\}/, '');

css += `
.ripple-card {
  position: relative;
}
.ripple-card::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(80, 200, 120, 0.15);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease-out, height 0.6s ease-out, opacity 0.6s ease-out;
  pointer-events: none;
  z-index: 2;
}
.ripple-card:hover::after {
  width: 200%;
  height: 200%;
  opacity: 0;
}
`;

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log('CSS-only ripple on hover');
