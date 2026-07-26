const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix StackingCard - keep cards mostly opaque, remove blur
const oldStackingCard = `function StackingCard({ children, index, total }: { children: React.ReactNode; index: number; total: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.88, 0.82]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 0.7, 0.3]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0, 6]);

  return (
    <motion.div
      ref={ref}
      className="sticky top-16 md:top-24"
      style={{
        zIndex: index,
        scale,
        opacity,
        filter: \`blur(\${blur}px)\`,
        marginBottom: index < total - 1 ? '20px' : '0'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}`;

const newStackingCard = `function StackingCard({ children, index, total }: { children: React.ReactNode; index: number; total: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.92, 0.85]);

  return (
    <motion.div
      ref={ref}
      className="sticky top-16 md:top-24"
      style={{
        zIndex: index,
        scale,
        marginBottom: index < total - 1 ? '20px' : '0'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}`;

p = p.replace(oldStackingCard, newStackingCard);
console.log('✅ Removed opacity and blur - cards stay solid');

fs.writeFileSync('src/app/page.tsx', p);
