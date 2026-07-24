const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldAudio = 'window.AudioContext || window.webkitAudioContext';
const newAudio = 'window.AudioContext || (window as any).webkitAudioContext';

p = p.replace(oldAudio, newAudio);
console.log('✅ AudioContext type fixed');

fs.writeFileSync('src/app/page.tsx', p);
