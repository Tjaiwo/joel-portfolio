const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Update iframe to 1440x900
p = p.replace(/width: '1680px'/g, "width: '1440px'");
p = p.replace(/height: '1050px'/g, "height: '900px'");

// Update CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/width: 1680px !important/g, 'width: 1440px !important');
css = css.replace(/height: 1050px !important/g, 'height: 900px !important');

// Adjust scales for 1440 width
css = css.replace(/transform: scale\(0\.22\)/g, 'transform: scale(0.24)');
css = css.replace(/transform: scale\(0\.35\)/g, 'transform: scale(0.38)');
css = css.replace(/transform: scale\(0\.4\)/g, 'transform: scale(0.45)');

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Iframe now 1440x900 - standard desktop view');
