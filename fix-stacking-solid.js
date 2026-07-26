const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

css = css.replace(/\.stack-card \{[\s\S]*?\}/, `.stack-card {
  background: #0C0C0C;
  border: 2px solid rgba(255,255,255,0.08);
  border-radius: 2rem;
  overflow: hidden;
  transition: border-color 0.3s;
}
.stack-card:hover {
  border-color: rgba(80, 200, 120, 0.25);
}`);

// Also fix the sticky stacking container - each card needs solid background
css = css.replace(/\.stacking-projects[\s\S]*/, '');
css += `
.stacking-projects {
  position: relative;
  display: flex;
  flex-direction: column;
}
.stacking-projects > div {
  width: 100%;
  background: #0C0C0C;
  border-radius: 2rem;
}
.stack-card {
  background: #0C0C0C;
  border: 2px solid rgba(255,255,255,0.08);
  border-radius: 2rem;
  overflow: hidden;
  transition: border-color 0.3s;
}
.stack-card:hover {
  border-color: rgba(80, 200, 120, 0.25);
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Solid #0C0C0C background on cards');
