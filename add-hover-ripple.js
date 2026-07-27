const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Add ripple effect to browser-frame links (project card images)
// Find the browser-frame link
const oldFrame = 'className="browser-frame relative block overflow-hidden"';

const newFrame = `className="browser-frame relative block overflow-hidden ripple-container"
        onMouseDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const ripple = document.createElement('span');
          ripple.className = 'ripple-effect';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          e.currentTarget.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);
        }}`;

p = p.replace(oldFrame, newFrame);
console.log('✅ 1. Hover ripple on project cards');

// Add CSS
css += `
.ripple-container {
  position: relative;
}
.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background: rgba(80, 200, 120, 0.3);
  width: 20px;
  height: 20px;
  pointer-events: none;
  animation: ripple-expand 0.6s ease-out forwards;
  z-index: 5;
}
@keyframes ripple-expand {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(30); opacity: 0; }
}
`;

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
