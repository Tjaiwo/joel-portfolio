const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

const broken = `@keyframes breath-glow {
  0%, 100% { opacity: 0.04; transform: scale(1); }
.hero-bg-accent {`;

const fixed = `@keyframes breath-glow {
  0%, 100% { opacity: 0.04; transform: scale(1); }
  50% { opacity: 0.12; transform: scale(1.08); }
}
.hero-bg-accent {`;

css = css.replace(broken, fixed);
console.log('Fixed breath-glow keyframe');

fs.writeFileSync('src/app/globals.css', css);
