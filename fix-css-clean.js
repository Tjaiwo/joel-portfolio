const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Find the "Stat card pulse" comment and rewrite everything from there to "Reveal animation"
const brokenStart = '/* Stat card pulse */';
const revealComment = '/* Reveal animation */';

const idx1 = css.indexOf(brokenStart);
const idx2 = css.indexOf(revealComment);

if (idx1 > 0 && idx2 > idx1) {
  const before = css.substring(0, idx1);
  const after = css.substring(idx2);
  
  const cleanBlock = `/* Stat card pulse */
@keyframes subtle-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.stat-pulse {
  animation: subtle-pulse 3s ease-in-out infinite;
}

`;
  
  css = before + cleanBlock + after;
  console.log('✅ Cleaned up CSS between subtle-pulse and Reveal animation');
} else {
  console.log('⚠️ Could not find markers');
}

fs.writeFileSync('src/app/globals.css', css);
