const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Add back the float animation
css += `
@keyframes float-tag {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}
.skill-tag {
  animation: float-tag 4s ease-in-out infinite;
}
.skill-tag:hover {
  animation: none;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(80, 200, 120, 0.15);
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Float animation added back');

// Add staggered delays in page.tsx
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Find all skill-tag classNames and add staggered delay
let tagIndex = 0;
p = p.replace(/className="skill-tag([^"]*)"/g, (match) => {
  const delay = (tagIndex % 8) * 0.4;
  tagIndex++;
  return match.replace('"', `" style={{ animationDelay: "${delay}s" }}`);
});

fs.writeFileSync('src/app/page.tsx', p);
console.log(`✅ ${tagIndex} skill tags staggered`);
