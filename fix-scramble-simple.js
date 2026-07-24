const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace both useScramble hooks with one simple version
// Remove old one first
const oldHook1 = /function useScramble[\s\S]*?return display;\n\}\n\nfunction useScramble/;
const match = p.match(oldHook1);
if (match) {
  p = p.replace(match[0], 'function useScramble');
  console.log('✅ Removed duplicate hook');
}

// Now replace the remaining hook with a clean version
const oldHook2 = /function useScramble[\s\S]*?return display;\n\}/;
const newHook = `function useScramble(words, { revealSpeed = 50, scrambleTime = 200, pauseTime = 2500 } = {}) {
  const [display, setDisplay] = useState(words[0] || "");
  const [phase, setPhase] = useState(0); // 0=show, 1=scramble, 2=reveal
  const wordIndex = useRef(0);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

  useEffect(() => {
    const currentWord = words[wordIndex.current];
    const nextWord = words[(wordIndex.current + 1) % words.length];
    const maxLen = Math.max(currentWord.length, nextWord.length);
    let timer;

    if (phase === 0) {
      setDisplay(currentWord);
      timer = setTimeout(() => setPhase(1), pauseTime);
    } else if (phase === 1) {
      const start = Date.now();
      timer = setInterval(() => {
        if (Date.now() - start >= scrambleTime) {
          clearInterval(timer);
          setPhase(2);
        } else {
          let s = "";
          for (let i = 0; i < maxLen; i++) s += chars[Math.floor(Math.random() * chars.length)];
          setDisplay(s);
        }
      }, 30);
    } else if (phase === 2) {
      let pos = 0;
      timer = setInterval(() => {
        if (pos > nextWord.length) {
          clearInterval(timer);
          setDisplay(nextWord);
          wordIndex.current = (wordIndex.current + 1) % words.length;
          setPhase(0);
        } else {
          let s = "";
          for (let i = 0; i < maxLen; i++) {
            s += i < pos ? (nextWord[i] || "") : chars[Math.floor(Math.random() * chars.length)];
          }
          setDisplay(s);
          pos++;
        }
      }, revealSpeed);
    }

    return () => clearInterval(timer);
  }, [phase, words, scrambleTime, pauseTime, revealSpeed]);

  return display;
}`;

const match2 = p.match(oldHook2);
if (match2) {
  p = p.replace(match2[0], newHook);
  console.log('✅ Scramble hook simplified');
}

fs.writeFileSync('src/app/page.tsx', p);
