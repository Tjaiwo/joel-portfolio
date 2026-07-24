const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add intersection observer for mobile auto-load
const oldReturn = `  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="browser-card group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >`;

const newReturn = `  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-load on mobile when card is in view
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHovered(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeInUp}
      custom={index}
      className="browser-card group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >`;

p = p.replace(oldReturn, newReturn);
console.log('✅ Mobile: auto-loads when card scrolls into view');

fs.writeFileSync('src/app/page.tsx', p);
