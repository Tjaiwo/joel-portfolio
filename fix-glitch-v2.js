const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add timer
p = p.replace(
  '}, [mobileMenuOpen]);',
  `}, [mobileMenuOpen]);

  useEffect(() => {
    const t = setTimeout(() => setGlitchDone(true), 800);
    return () => clearTimeout(t);
  }, []);`
);

// Add overlay before main
const mainTag = '<main className="flex-1 lg:ml-[280px]">';
const withGlitch = `{!glitchDone && (
        <div className="fixed inset-0 z-[99999] bg-background flex items-center justify-center overflow-hidden">
          <div className="glitch-container">
            <h1 className="glitch-text text-4xl md:text-6xl font-bold text-primary" data-text="WELCOME">
              WELCOME
            </h1>
            <div className="glitch-scanlines" />
            <div className="glitch-flash" />
          </div>
        </div>
      )}
      <main className="flex-1 lg:ml-[280px]">`;

p = p.replace(mainTag, withGlitch);
console.log('✅ Glitch overlay added');

// Add CSS if missing
let css = fs.readFileSync('src/app/globals.css', 'utf8');
if (!css.includes('glitch-text')) {
  css += `
.glitch-container { position: relative; text-align: center; }
.glitch-text { position: relative; animation: glitch-skew 0.8s ease-out forwards; }
.glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.glitch-text::before { animation: glitch-r 0.8s ease-out forwards; clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); color: #f00; z-index: -1; }
.glitch-text::after { animation: glitch-b 0.8s ease-out forwards; clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); color: #0ff; z-index: -1; }
.glitch-scanlines { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px); pointer-events: none; z-index: 2; }
.glitch-flash { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(80,200,120,0.15); pointer-events: none; z-index: 3; animation: glitch-flash 0.8s ease-out forwards; }
@keyframes glitch-skew { 0% { transform: skew(0deg); } 20% { transform: skew(-2deg); } 40% { transform: skew(2deg); } 60% { transform: skew(-1deg); } 80% { transform: skew(0.5deg); } 100% { transform: skew(0deg); } }
@keyframes glitch-r { 0% { transform: translateX(0); opacity: 1; } 20% { transform: translateX(-8px); opacity: 0.8; } 40% { transform: translateX(12px); opacity: 0.6; } 60% { transform: translateX(-4px); opacity: 0.4; } 80% { transform: translateX(6px); opacity: 0.2; } 100% { transform: translateX(0); opacity: 0; } }
@keyframes glitch-b { 0% { transform: translateX(0); opacity: 1; } 20% { transform: translateX(8px); opacity: 0.8; } 40% { transform: translateX(-12px); opacity: 0.6; } 60% { transform: translateX(4px); opacity: 0.4; } 80% { transform: translateX(-6px); opacity: 0.2; } 100% { transform: translateX(0); opacity: 0; } }
@keyframes glitch-flash { 0% { opacity: 0.3; } 30% { opacity: 0.6; } 60% { opacity: 0.1; } 100% { opacity: 0; } }
`;
  fs.writeFileSync('src/app/globals.css', css);
  console.log('✅ CSS added');
}

fs.writeFileSync('src/app/page.tsx', p);
