const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Make the main content fade in slowly after preloader
const oldMain = '<main className="flex-1 lg:ml-[280px]" style={{ opacity: glitchDone ? 1 : 0, transition: "opacity 0.6s ease-out 0.3s" }}>';
const newMain = '<main className="flex-1 lg:ml-[280px]" style={{ opacity: glitchDone ? 1 : 0, transition: "opacity 1s ease-out 0.5s" }}>';

p = p.replace(oldMain, newMain);

// Also add a slight slide-up to the hero section
const heroSection = '<section id="home" className="relative min-h-screen flex items-center pt-[90px] lg:pt-[120px] pb-20 lg:pb-20 overflow-hidden">';

// Wrap hero content in a delayed fade-up
const heroContent = '<motion.div initial="hidden" animate="visible" className="relative z-10">';

// Add style to hero to delay its appearance
const heroStyle = '<section id="home" className="relative min-h-screen flex items-center pt-[90px] lg:pt-[120px] pb-20 lg:pb-20 overflow-hidden" style={{ opacity: glitchDone ? 1 : 0, transform: glitchDone ? "translateY(0)" : "translateY(20px)", transition: "opacity 1s ease-out 0.5s, transform 1s ease-out 0.5s" }}>';

p = p.replace(heroSection, heroStyle);
console.log('✅ Hero now fades in + slides up after preloader');

fs.writeFileSync('src/app/page.tsx', p);
