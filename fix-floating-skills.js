const fs = require('fs');

// Clean up CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove old duplicate
css = css.replace(/\.skill-tag \{ animation: float-tag 4s ease-in-out infinite; \}/, '');

// Update float animation
css = css.replace(
  /@keyframes float-tag \{[\s\S]*?\n\}/,
  `@keyframes float-tag {
  0%, 100% { transform: translateY(0px); }
  25% { transform: translateY(-4px); }
  75% { transform: translateY(2px); }
}`
);

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ CSS cleaned');

// Add staggered animation delays to each skill tag in page.tsx
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add inline style with delay to skill tags
p = p.replace(
  /className="skill-tag px-4 py-2\.5 rounded-lg text-sm md:text-\[18px\] text-foreground bg-card\/50"/g,
  (match, offset) => {
    // Extract index from surrounding context - use a simple counter
    return match + ` style={{ animationDelay: "${(offset % 10) * 0.3}s" }}`;
  }
);

fs.writeFileSync('src/app/page.tsx', p);
console.log('✅ Staggered delays added to skill tags');
