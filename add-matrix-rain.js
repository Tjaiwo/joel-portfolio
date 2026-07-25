const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add MatrixRain component before BackToTop
const backToTopComment = '/* ──────────────────────── BACK TO TOP ──────────────────────── */';
const matrixRainCode = `
/* ──────────────────────── MATRIX RAIN ──────────────────────── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const isDark = document.documentElement.classList.contains('dark');
    const draw = () => {
      ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = isDark ? 'rgba(80, 200, 120, 0.15)' : 'rgba(80, 200, 120, 0.35)';
      ctx.font = \`\${fontSize}px monospace\`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

`;
p = p.replace(backToTopComment, matrixRainCode + backToTopComment);

// Insert MatrixRain right before the hero section
p = p.replace(
  '<section id="home"',
  '<MatrixRain />\n      <section id="home"'
);
console.log('✅ Matrix rain added - subtle in dark, visible in light');

fs.writeFileSync('src/app/page.tsx', p);
