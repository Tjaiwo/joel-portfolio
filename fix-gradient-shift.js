const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

const broken = `@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }

.outline-cta {`;

const fixed = `@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.outline-cta {`;

css = css.replace(broken, fixed);
console.log('Fixed gradient-shift keyframe');

fs.writeFileSync('src/app/globals.css', css);
