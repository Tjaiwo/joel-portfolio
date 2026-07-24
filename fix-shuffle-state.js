const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove the duplicate comment line that has a second declaration
p = p.replace(
  '// Track which card is hovered globally for the group\nconst [hoveredCard, setHoveredCard] = useState(-1);\n\nfunction ShuffleCard',
  'function ShuffleCard'
);

// Remove the broken line before ShuffleCard
p = p.replace(
  '// Track which card is hovered globally for the group\nfunction ShuffleCard',
  'function ShuffleCard'
);

console.log('✅ Fixed hoveredCard scope');
fs.writeFileSync('src/app/page.tsx', p);
