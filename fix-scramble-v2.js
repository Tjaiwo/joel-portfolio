const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Update the remaining useTypewriter call
const oldCall = 'useTypewriter(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { loop: true, typeSpeed: 60, deleteSpeed: 40, pauseTime: 2000 })';
const newCall = 'useScramble(["WEB DEVELOPER", "SEO EXPERT", "NO/LOW CODE HASHIRA"], { typeSpeed: 40, scrambleSpeed: 50, pauseTime: 2500 })';

p = p.replace(oldCall, newCall);
console.log('✅ All typewriter calls updated to useScramble');

fs.writeFileSync('src/app/page.tsx', p);
