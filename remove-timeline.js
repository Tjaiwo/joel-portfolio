const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove timeline HTML
const timelineStart = p.indexOf('{/* ─── PROCESS TIMELINE ─── */}');
const myStack = p.indexOf('MY STACK');
if (timelineStart > 0) {
  // Find the h2 before MY STACK
  const beforeStack = p.lastIndexOf('<motion.h2', myStack);
  p = p.slice(0, timelineStart) + p.slice(beforeStack);
}

// Remove all timeline CSS
css = css.replace(/\.timeline-bleed[\s\S]*?\.timeline-card:hover[\s\S]*?\}/, '');

console.log('✅ Timeline removed');
fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
