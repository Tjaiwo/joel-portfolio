const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove the leftover fragment after the new keyframe
const badFragment = `}
  50% { opacity: 1; transform: translateY(2px); }
}`;

if (css.includes(badFragment)) {
  css = css.replace(badFragment, '}');
  console.log('✅ Removed leftover CSS fragment');
} else {
  console.log('⚠️ Fragment not found, checking manually...');
  // Show lines around 220
  const lines = css.split('\n');
  for (let i = 217; i < Math.min(225, lines.length); i++) {
    console.log(i+1, lines[i]);
  }
}

fs.writeFileSync('src/app/globals.css', css);
