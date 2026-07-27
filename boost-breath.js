const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

css = css.replace(
  /@keyframes breath-glow \{[\s\S]*?\}/,
  `@keyframes breath-glow {
  0%, 100% { opacity: 0.04; transform: scale(1); }
  50% { opacity: 0.12; transform: scale(1.08); }
}`
);

fs.writeFileSync('src/app/globals.css', css);
console.log('Glow boosted: 4-12% opacity, bigger scale');
