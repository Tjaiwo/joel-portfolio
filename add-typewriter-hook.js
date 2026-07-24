const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add useTypewriter hook before the component
const hook = `function useTypewriter(words, { loop = false, typeSpeed = 80, deleteSpeed = 50 } = {}) {
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[0];
    let timer;
    if (!deleting && charIndex < word.length) {
      timer = setTimeout(() => setCharIndex(charIndex + 1), typeSpeed);
    } else if (!deleting && charIndex === word.length) {
      if (loop) timer = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex(charIndex - 1), deleteSpeed);
    }
    return () => clearTimeout(timer);
  }, [charIndex, deleting, words, loop, typeSpeed, deleteSpeed]);

  return words[0].substring(0, charIndex);
}

`;

p = p.replace("export default function Home() {", hook + "\nexport default function Home() {");
console.log('✅ useTypewriter hook added');

fs.writeFileSync('src/app/page.tsx', p);
