const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add inline overflow-x: scroll directly to the timeline container
p = p.replace(
  '<div className="timeline-scroll">',
  '<div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll", gap: "1rem", paddingBottom: "1rem", WebkitOverflowScrolling: "touch" }}>'
);

// Also add min-width to each card so they don't shrink
p = p.replace(
  'className="timeline-card"',
  'className="timeline-card" style={{ flex: "0 0 260px", minWidth: "260px" }}'
);

console.log('✅ Inline scroll styles forced');
fs.writeFileSync('src/app/page.tsx', p);
