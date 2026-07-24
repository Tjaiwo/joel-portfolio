const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Bump opacity from 0.035 to 0.06
css = css.replace('opacity: 0.035;', 'opacity: 0.06;');

// Increase animation speed and movement range
css = css.replace(
  'animation: grain-shift 0.5s steps(5) infinite;',
  'animation: grain-shift 0.3s steps(4) infinite;'
);

css = css.replace(
  /@keyframes grain-shift \{[\s\S]*?\n\}/,
  `@keyframes grain-shift {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-3px, 2px); }
  50% { transform: translate(3px, -2px); }
  75% { transform: translate(-2px, -3px); }
}`
);

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Grain more pronounced - 0.06 opacity, faster, more movement');
