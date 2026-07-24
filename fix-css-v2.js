const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove the exact bad lines
const badLines = `}
  50% { opacity: 1; transform: translateY(2px); }
}`;

if (css.includes(badLines)) {
  css = css.replace(badLines, '}');
  console.log('✅ Fixed');
} else {
  // Try a broader match
  const match = css.match(/}\s*\n\s*50%\s*\{[^}]*\}\s*\n\s*\}/);
  if (match) {
    css = css.replace(match[0], '}');
    console.log('✅ Fixed via broader match');
  } else {
    console.log('⚠️ Still not found. Lines 218-222:');
    console.log(css.split('\n').slice(217, 222).join('\n'));
  }
}

fs.writeFileSync('src/app/globals.css', css);
