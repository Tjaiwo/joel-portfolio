const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace useTypewriter with useScramble hook
const oldHook = /function useTypewriter[\s\S]*?return text;\n\}\n\n/;
const newHook = `function useScramble(words, { typeSpeed = 40, scrambleSpeed = 50, pauseTime = 2500 } = {}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | pausing | scrambling | done

  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~\`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    const word = words[wordIndex];
    let timer;

    if (phase === "typing") {
      if (charIndex < word.length) {
        timer = setTimeout(() => setCharIndex(charIndex + 1), typeSpeed);
      } else {
        timer = setTimeout(() => setPhase("pausing"), pauseTime);
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => setPhase("scrambling"), 300);
    } else if (phase === "scrambling") {
      if (charIndex > 0) {
        timer = setTimeout(() => setCharIndex(charIndex - 1), scrambleSpeed / 3);
      } else {
        setWordIndex((wordIndex + 1) % words.length);
        setPhase("typing");
      }
    }

    // Build display text
    let display = "";
    for (let i = 0; i < charIndex; i++) {
      display += word[i];
    }
    if (phase === "scrambling") {
      for (let i = charIndex; i < word.length; i++) {
        display += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    setText(display);

    return () => clearTimeout(timer);
  }, [charIndex, phase, wordIndex, words, typeSpeed, scrambleSpeed, pauseTime]);

  return text;
}

`;

// Replace old hook
const match = p.match(oldHook);
if (match) {
  p = p.replace(match[0], newHook);
  console.log('✅ Hook replaced with useScramble');
}

// Update the typewriter call to useScramble
p = p.replace('useTypewriter(["DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"]', 'useScramble(["DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"]');
console.log('✅ Typewriter call updated to useScramble');

fs.writeFileSync('src/app/page.tsx', p);
