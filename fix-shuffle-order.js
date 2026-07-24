const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove the standalone ShuffleCard function
const oldFunc = `
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

p = p.replace(oldFunc, '');

// Replace ShuffleCard usage with inline motion.div that uses hoveredCard directly
const oldShuffle = `<ShuffleCard key={project.id} index={idx}>`;
const newShuffle = `<motion.div
                key={project.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(-1)}
                animate={{
                  scale: hoveredCard === idx ? 1.05 : hoveredCard >= 0 ? 0.97 : 1,
                  rotateZ: hoveredCard === idx ? 0 : hoveredCard >= 0 ? (idx - hoveredCard) * 2 : 0,
                  x: hoveredCard >= 0 && hoveredCard !== idx ? (idx - hoveredCard) * 8 : 0,
                  zIndex: hoveredCard === idx ? 10 : 1,
                  filter: hoveredCard >= 0 && hoveredCard !== idx ? 'brightness(0.85)' : 'brightness(1)',
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{ position: 'relative', transformOrigin: 'center center' }}
              >`;

const oldClose = `</ShuffleCard>`;
const newClose = `</motion.div>`;

p = p.replace(oldShuffle, newShuffle);
p = p.replace(oldClose, newClose);
console.log('✅ Shuffle inlined - no function scope issues');

fs.writeFileSync('src/app/page.tsx', p);
