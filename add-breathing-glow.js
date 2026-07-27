const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Add breathing glow animation to the hero background accent
css += `
/* Breathing glow on hero background */
@keyframes breath-glow {
  0%, 100% { opacity: 0.03; transform: scale(1); }
  50% { opacity: 0.06; transform: scale(1.05); }
}
.hero-bg-accent {
  animation: breath-glow 4s ease-in-out infinite;
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('Breathing glow CSS added');
