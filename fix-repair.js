const fs = require('fs');
let lines = fs.readFileSync('src/app/page.tsx', 'utf8').split('\n');
let n = 0;

// 1. Remove all incorrectly placed standalone style lines (children that should be props)
const before = lines.length;
lines = lines.filter(l => !(l.trim().startsWith('style={{ fontSize:') && !l.includes('<')));
const removed = before - lines.length;
if (removed > 0) console.log('Removed ' + removed + ' misplaced style lines');

// 2. Hero h1: find the closing > of its opening tag and insert style before it
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('motion.h1') && lines[i+1]?.includes('fadeInUp')) {
    // Find the > that closes the opening tag (within next few lines)
    for (let j = i; j <= Math.min(i + 6, lines.length - 1); j++) {
      if (lines[j].includes('glow-text"') || lines[j].includes('glow-text">')) {
        lines[j] = lines[j].replace('">', '" style={{ fontSize: "clamp(40px, 10vw, 72px)", lineHeight: "clamp(44px, 1.1em, 68px)" }}>');
        if (lines[j].includes('style={{')) {
          console.log('Line ' + (j+1) + ': hero h1 style added to tag');
          n++;
        }
        break;
      }
    }
    break;
  }
}

// 3. Section h2s: find lines with motion.h2 AND className on same line ending with >
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('motion.h2') && lines[i].includes('fadeInUp') && lines[i].includes('mb-12') && lines[i].endsWith('>')) {
    lines[i] = lines[i].replace('">', '" style={{ fontSize: "clamp(28px, 5vw, 40px)" }}>');
    n++;
    console.log('Line ' + (i+1) + ': section h2 style added to tag');
  }
}

// 4. Description: find the motion.p with text-sm and add style to its closing >
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('motion.p') && lines[i].includes('fadeInUp') && lines[i+1]?.includes('custom={2}')) {
    for (let j = i; j <= Math.min(i + 5, lines.length - 1); j++) {
      if (lines[j].includes('max-w-xl') && lines[j].endsWith('>')) {
        lines[j] = lines[j].replace('">', '" style={{ fontSize: "18px" }}>');
        n++;
        console.log('Line ' + (j+1) + ': description style added to tag');
        break;
      }
    }
    break;
  }
}

fs.writeFileSync('src/app/page.tsx', lines.join('\n'));
console.log('\nTotal changes: ' + n);
