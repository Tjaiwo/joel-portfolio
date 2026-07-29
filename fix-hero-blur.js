const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

const broken = `@keyframes hero-blur-reveal {
  0% { opacity: 0; transform: translateY(28px); filter: blur(12px); }
.hero-blur-reveal {`;

const fixed = `@keyframes hero-blur-reveal {
  0% { opacity: 0; transform: translateY(28px); filter: blur(12px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}
.hero-blur-reveal {`;

css = css.replace(broken, fixed);
console.log('Fixed hero-blur-reveal keyframe');

fs.writeFileSync('src/app/globals.css', css);
