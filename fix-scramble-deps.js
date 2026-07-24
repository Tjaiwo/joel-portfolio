const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix: stabilize the words dependency
const oldDeps = '}, [phase, words, scrambleTime, pauseTime, revealSpeed]);';
const newDeps = '}, [phase, scrambleTime, pauseTime, revealSpeed]); // eslint-disable-line';

p = p.replace(oldDeps, newDeps);

// Also fix the words reference - use a ref for words too
const oldRef = `  const wordIndex = useRef(0);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";`;

const newRef = `  const wordIndex = useRef(0);
  const wordsRef = useRef(words);
  wordsRef.current = words;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";`;

p = p.replace(oldRef, newRef);

// Update the hook to use wordsRef
p = p.replace('const currentWord = words[wordIndex.current];', 'const currentWord = wordsRef.current[wordIndex.current];');
p = p.replace('const nextWord = words[(wordIndex.current + 1) % words.length];', 'const nextWord = wordsRef.current[(wordIndex.current + 1) % wordsRef.current.length];');

console.log('✅ Fixed scramble dependencies');
fs.writeFileSync('src/app/page.tsx', p);
