const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Add grain overlay CSS
const grainCSS = `
/* Grain / noise overlay */
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
}
.grain-overlay::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-size: 128px 128px;
  animation: grain-shift 0.5s steps(5) infinite;
}
@keyframes grain-shift {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-2px, 1px); }
  40% { transform: translate(2px, -1px); }
  60% { transform: translate(-1px, 2px); }
  80% { transform: translate(1px, -2px); }
}
`;

css += grainCSS;
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Grain CSS added to globals.css');

// Add grain div to layout
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');

// Insert grain div before closing body
const bodyClose = '</body>';
const grainDiv = '  <div className="grain-overlay" aria-hidden="true" />\n    </body>';

if (layout.includes(bodyClose)) {
  layout = layout.replace(bodyClose, grainDiv);
  console.log('✅ Grain overlay added to layout');
}

fs.writeFileSync('src/app/layout.tsx', layout);
