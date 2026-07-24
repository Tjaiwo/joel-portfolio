const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldHook = /function useScramble[\s\S]*?return text;\n\}\n\n/;
const newHook = `function useScramble(words, { revealSpeed = 60, scrambleTime = 300, pauseTime = 2500 } = {}) {
  const [display, setDisplay] = useState(words[0] || "");
  const [wordIndex, setWordIndex] = useState(0);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

  useEffect(() => {
    const current = words[wordIndex];
    const next = words[(wordIndex + 1) % words.length];
    const maxLen = Math.max(current.length, next.length);

    // Phase 1: pause on current word
    const pauseTimer = setTimeout(() => {
      // Phase 2: scramble - rapidly flash random chars
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= scrambleTime) {
          clearInterval(interval);
          // Phase 3: reveal next word character by character from scrambled state
          let pos = 0;
          const revealInterval = setInterval(() => {
            if (pos > next.length) {
              clearInterval(revealInterval);
              setDisplay(next);
              setWordIndex((wordIndex + 1) % words.length);
            } else {
              let str = "";
              for (let i = 0; i < maxLen; i++) {
                if (i < pos) {
                  str += next[i] || "";
                } else {
                  str += chars[Math.floor(Math.random() * chars.length)];
                }
              }
              setDisplay(str);
              pos++;
            }
          }, revealSpeed);
          return;
        }
        // Full scramble
        let str = "";
        for (let i = 0; i < maxLen; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
        }
        setDisplay(str);
      }, 40);
    }, pauseTime);

    return () => {
      clearTimeout(pauseTimer);
    };
  }, [wordIndex, words, scrambleTime, pauseTime, revealSpeed]);

  return display;
}

`;

const match = p.match(oldHook);
if (match) {
  p = p.replace(match[0], newHook);
  console.log('✅ New scramble: letters resolve into next word');
}

const oldCall = 'useScramble(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { typeSpeed: 30, scrambleTime: 300, pauseTime: 2000 })';
const newCall = 'useScramble(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { revealSpeed: 60, scrambleTime: 200, pauseTime: 2500 })';

p = p.replace(oldCall, newCall);
console.log('✅ Call updated');

fs.writeFileSync('src/app/page.tsx', p);
