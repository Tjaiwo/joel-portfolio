const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ═══ 1. FIX SCRAMBLE - stuck on first word ═══
// The issue: wordIndex state isn't cycling. Check the hook
const oldHook = /function useScramble[\s\S]*?return display;\n\}\n\n/;
const newHook = `function useScramble(words, { revealSpeed = 60, scrambleTime = 200, pauseTime = 2500 } = {}) {
  const [display, setDisplay] = useState(words[0] || "");
  const [wordIndex, setWordIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

  useEffect(() => {
    if (running) return;
    setRunning(true);

    const current = words[wordIndex];
    const next = words[(wordIndex + 1) % words.length];
    const maxLen = Math.max(current.length, next.length);

    const pauseTimer = setTimeout(() => {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= scrambleTime) {
          clearInterval(interval);
          let pos = 0;
          const revealInterval = setInterval(() => {
            if (pos > next.length) {
              clearInterval(revealInterval);
              setDisplay(next);
              setWordIndex((prev) => (prev + 1) % words.length);
              setRunning(false);
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
        let str = "";
        for (let i = 0; i < maxLen; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
        }
        setDisplay(str);
      }, 30);
    }, pauseTime);

    return () => clearTimeout(pauseTimer);
  }, [wordIndex, running, words, scrambleTime, pauseTime, revealSpeed]);

  return display;
}

`;

p = p.replace(oldHook, newHook);
console.log('✅ 1. Scramble fixed - cycling properly');

// ═══ 2. REDUCE CLOCK SIZE BY 4px ═══
p = p.replace(
  "fontSize: '18px'",
  "fontSize: '14px'"
);
console.log('✅ 2. Clock size reduced to 14px');

// ═══ 3. SHOW CLOCK ON MOBILE ═══
// Add clock to mobile header
const mobileHeader = '<header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">';
// Already has sound toggle there. Let me find the mobile header area
const mobileSoundBtn = 'onClick={() => setSoundEnabled(!soundEnabled)}';
const mobileClockAdd = `{useLocalTime()}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}`;

p = p.replace(mobileSoundBtn, mobileClockAdd);

// Style the mobile clock
const mobileClockStyle = `{useLocalTime()}`;
const mobileClockStyled = `<span className="text-primary font-mono text-[12px]" style={{ fontFamily: 'var(--font-geist-mono)' }}>{useLocalTime()}</span>`;

p = p.replace(mobileClockStyle, mobileClockStyled);
console.log('✅ 3. Clock added to mobile header');

fs.writeFileSync('src/app/page.tsx', p);
