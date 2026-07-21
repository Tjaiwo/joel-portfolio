const fs = require('fs');
const lines = fs.readFileSync('src/app/page.tsx', 'utf8').split('\n');
let changes = 0;

for (let i = 0; i < lines.length; i++) {
  // --- HERO H1: add inline style with clamp() ---
  if (lines[i].includes('FRONTEND') && !lines[i].includes('import')) {
    for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
      if (lines[j].includes('motion.h1') || lines[j].includes('<h1')) {
        // Check if style prop already exists
        if (!lines[j + 1]?.includes('style={{') && !lines[j].includes('style={{')) {
          const indent = lines[j].match(/^(\s*)/)[1];
          lines.splice(j + 1, 0, indent + 'style={{ fontSize: "clamp(40px, 10vw, 72px)", lineHeight: "clamp(44px, 1.1em, 68px)" }}');
          console.log('Line ' + (j + 2) + ': hero h1 inline style added');
          changes++;
        } else {
          console.log('Hero h1 already has style prop, updating...');
          for (let k = j; k <= j + 5; k++) {
            if (lines[k]?.includes('style={{')) {
              lines[k] = lines[k].replace(/style=\{\{[^}]*\}\}/, 'style={{ fontSize: "clamp(40px, 10vw, 72px)", lineHeight: "clamp(44px, 1.1em, 68px)" }}');
              changes++;
              break;
            }
          }
        }
        break;
      }
    }
  }
}

// --- SECTION HEADERS: motion.h2 with fadeInUp ---
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('motion.h2') && lines[i].includes('fadeInUp')) {
    // Look at next 3 lines for className
    for (let j = i; j <= Math.min(i + 3, lines.length - 1); j++) {
      if (lines[j].includes('className="') && lines[j].includes('mb-12')) {
        const indent = lines[j].match(/^(\s*)/)[1];
        if (!lines[j + 1]?.includes('style={{') && !lines[j].includes('style={{')) {
          lines.splice(j + 1, 0, indent + 'style={{ fontSize: "clamp(28px, 5vw, 40px)" }}');
          console.log('Line ' + (j + 2) + ': section h2 inline style added');
          changes++;
        }
        break;
      }
    }
  }
}

// --- DESCRIPTION: find "Joel Akinlosotu" and add inline style to the <p> above ---
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("I&apos;m") || (lines[i].includes("I'm") && lines[i].includes('Joel'))) {
    for (let j = i - 1; j >= Math.max(0, i - 8); j--) {
      if (lines[j].includes('motion.p') && lines[j].includes('fadeInUp')) {
        const indent = lines[j].match(/^(\s*)/)[1];
        if (!lines[j + 1]?.includes('style={{') && !lines[j + 1]?.includes('fontSize')) {
          lines.splice(j + 1, 0, indent + 'style={{ fontSize: "18px" }}');
          console.log('Line ' + (j + 2) + ': description inline style added');
          changes++;
        }
        break;
      }
    }
    break;
  }
}

fs.writeFileSync('src/app/page.tsx', lines.join('\n'));
console.log('\nTotal inline style changes: ' + changes);
if (changes > 0) console.log('Inline styles bypass all CSS processing - these WILL work.');
