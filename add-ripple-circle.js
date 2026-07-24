const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

const oldKF = `@keyframes pulse-chevron {
  0%, 100% { opacity: 0.5; transform: translateY(0); box-shadow: 0 0 0 0 rgba(80, 200, 120, 0.4); }
  50% { opacity: 1; transform: translateY(2px); box-shadow: 0 0 0 6px rgba(80, 200, 120, 0); }
}`;

const newKF = `@keyframes pulse-chevron {
  0%, 100% { opacity: 0.5; transform: translateY(0); box-shadow: 0 0 0 0 rgba(80, 200, 120, 0.4); border-radius: 50%; }
  50% { opacity: 1; transform: translateY(2px); box-shadow: 0 0 0 6px rgba(80, 200, 120, 0); border-radius: 50%; }
}`;

css = css.replace(oldKF, newKF);
fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Ripple now circular');
