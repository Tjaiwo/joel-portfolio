const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Fix the broken subtle-pulse block
const broken = `/* Stat card pulse */
@keyframes subtle-pulse {
  0%, 100% { opacity: 0.6; }
.stat-pulse {
  animation: subtle-pulse 3s ease-in-out infinite;
}`;

const fixed = `/* Stat card pulse */
@keyframes subtle-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.stat-pulse {
  animation: subtle-pulse 3s ease-in-out infinite;
}`;

if (css.includes(broken)) {
  css = css.replace(broken, fixed);
  console.log('✅ Fixed subtle-pulse keyframe');
} else {
  console.log('⚠️ Broken block not found');
}

fs.writeFileSync('src/app/globals.css', css);
