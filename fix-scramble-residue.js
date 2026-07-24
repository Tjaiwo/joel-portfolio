const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldHook = /function useScramble[\s\S]*?return display;\n\}/;

const newHook = `function useScramble(words) {
  const [display, setDisplay] = useState(words[0]);
  const idx = useRef(0);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~";

  useEffect(() => {
    const word = words[idx.current];
    const next = words[(idx.current + 1) % words.length];

    setDisplay(word);
    
    const t1 = setTimeout(() => {
      const start = Date.now();
      const scrambleInterval = setInterval(() => {
        if (Date.now() - start > 200) {
          clearInterval(scrambleInterval);
          let i = 0;
          const revealInterval = setInterval(() => {
            if (i > next.length) {
              clearInterval(revealInterval);
              idx.current = (idx.current + 1) % words.length;
            } else {
              let s = "";
              for (let j = 0; j < next.length; j++) {
                s += j < i ? next[j] : chars[Math.floor(Math.random() * chars.length)];
              }
              setDisplay(s);
              i++;
            }
          }, 50);
        } else {
          let s = "";
          for (let j = 0; j < Math.max(word.length, next.length); j++) {
            s += chars[Math.floor(Math.random() * chars.length)];
          }
          setDisplay(s);
        }
      }, 30);
    }, 2500);

    return () => clearTimeout(t1);
  }, [idx.current]);

  return display;
}`;

p = p.replace(oldHook, newHook);
console.log('✅ Reveal now only shows chars up to next word length - no residue');

fs.writeFileSync('src/app/page.tsx', p);
