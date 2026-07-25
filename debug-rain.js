const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Force canvas visible with debug styling
const oldCanvas = '<canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />';
const newCanvas = '<canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, opacity: 1 }} />';

p = p.replace(oldCanvas, newCanvas);

// Also make the rain cover full viewport - remove scoping
const oldDraw = `ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)';`;
const newDraw = `ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';`;

p = p.replace(oldDraw, newDraw);

// Brighter text
const oldText = `ctx.fillStyle = isDark ? 'rgba(80, 200, 120, 0.2)' : 'rgba(80, 200, 120, 0.4)';`;
const newText = `ctx.fillStyle = isDark ? 'rgba(80, 200, 120, 0.5)' : 'rgba(80, 200, 120, 0.7)';`;

p = p.replace(oldText, newText);

console.log('✅ Debug: brighter rain, visible z-index');
fs.writeFileSync('src/app/page.tsx', p);
