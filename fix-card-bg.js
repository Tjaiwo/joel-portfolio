const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Force solid background on browser cards
css = css.replace(
  'background: var(--card);',
  'background: #0C0C0C;'
);

// Also fix the iframe wrapper
css = css.replace(
  'background: var(--muted);',
  'background: #1a1a1a;'
);

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Cards forced to solid #0C0C0C');
