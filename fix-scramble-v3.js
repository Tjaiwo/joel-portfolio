const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace useScramble with improved version
const oldHook = /function useScramble[\s\S]*?return text;\n\}\n\n/;
const newHook = `function useScramble(words, { typeSpeed = 30, scrambleTime = 400, pauseTime = 2000 } = {}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | pausing | scrambling

  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~\`";

  useEffect(() => {
    const word = words[wordIndex];
    let timer;

    if (phase === "typing") {
      if (text.length < word.length) {
        timer = setTimeout(() => setText(word.substring(0, text.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setPhase("pausing"), pauseTime);
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => setPhase("scrambling"), 300);
    } else if (phase === "scrambling") {
      // Scramble all chars at once
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= scrambleTime) {
          clearInterval(interval);
          setText("");
          setWordIndex((wordIndex + 1) % words.length);
          setPhase("typing");
        } else {
          let scrambled = "";
          for (let i = 0; i < word.length; i++) {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
          setText(scrambled);
        }
      }, 40);
      return () => clearInterval(interval);
    }

    return () => clearTimeout(timer);
  }, [text, phase, wordIndex, words, typeSpeed, scrambleTime, pauseTime]);

  return text;
}

`;

const match = p.match(oldHook);
if (match) {
  p = p.replace(match[0], newHook);
  console.log('✅ Hook updated - all chars scramble at once');
}

// Update the call
const oldCall = 'useScramble(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { typeSpeed: 40, scrambleSpeed: 50, pauseTime: 2500 })';
const newCall = 'useScramble(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { typeSpeed: 30, scrambleTime: 300, pauseTime: 2000 })';

p = p.replace(oldCall, newCall);
console.log('✅ Speed increased');

fs.writeFileSync('src/app/page.tsx', p);
