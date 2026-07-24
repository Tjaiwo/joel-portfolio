const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace ShuffleCard with a group-aware version
const oldShuffle = `function ShuffleCard({ children, index }: { children: React.ReactNode; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered ? {
        scale: 1.03,
        rotateZ: (index % 2 === 0 ? 1 : -1) * 1.5,
        zIndex: 10,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {
        scale: 1,
        rotateZ: 0,
        zIndex: 1,
        transition: { type: "spring", stiffness: 300, damping: 25 }
      }}
      style={{ position: 'relative', transformOrigin: 'center bottom' }}
    >
      {children}
    </motion.div>
  );
}`;

const newShuffle = `// Track which card is hovered globally for the group
const [hoveredCard, setHoveredCard] = useState(-1);

function ShuffleCard({ children, index }: { children: React.ReactNode; index: number }) {
  const isHovered = hoveredCard === index;
  const isGroupHovered = hoveredCard >= 0;
  const distance = index - hoveredCard;

  return (
    <motion.div
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(-1)}
      animate={{
        scale: isHovered ? 1.05 : isGroupHovered ? 0.97 : 1,
        rotateZ: isHovered ? 0 : isGroupHovered ? distance * 2 : 0,
        x: isGroupHovered && !isHovered ? distance * 8 : 0,
        zIndex: isHovered ? 10 : 1,
        filter: isGroupHovered && !isHovered ? 'brightness(0.85)' : 'brightness(1)',
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      style={{ position: 'relative', transformOrigin: 'center center' }}
    >
      {children}
    </motion.div>
  );
}`;

p = p.replace(oldShuffle, newShuffle);
console.log('✅ Real shuffle: all cards react when one is hovered');

// Move hoveredCard state to the top level with other states
p = p.replace(
  'const [openExpIdx, setOpenExpIdx] = useState(-1);',
  'const [openExpIdx, setOpenExpIdx] = useState(-1);\n  const [hoveredCard, setHoveredCard] = useState(-1);'
);

// Remove the duplicate inside ShuffleCard
p = p.replace('const [hoveredCard, setHoveredCard] = useState(-1);\n\nfunction ShuffleCard', 'function ShuffleCard');

console.log('✅ hoveredCard state moved to component level');

fs.writeFileSync('src/app/page.tsx', p);
