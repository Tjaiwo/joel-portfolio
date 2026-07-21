const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
const lines = p.split('\n');

// 1. Find the className line BEFORE the line containing "FRONTEND"
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('FRONTEND') && !lines[i].includes('import')) {
    // Walk backwards to find the className line for this element
    for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
      if (lines[j].includes('className="') && lines[j].includes('glow-text')) {
        // Replace the entire className with what we want
        lines[j] = lines[j].replace(
          /className="[^"]*glow-text[^"]*"/,
          'className="hero-heading text-[40px] md:text-[72px] font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text"'
        );
        console.log('Line ' + (j+1) + ': hero h1 className updated');
        console.log('  -> ' + lines[j].trim());
        break;
      }
    }
    break;
  }
}

// 2. Section headers: find motion.h2 with "font-bold mb-12" and set 28px mobile
let secCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('motion.h2') && lines[i].includes('variants={fadeInUp}')) {
    // Check the next few lines for className
    for (let j = i; j <= Math.min(i + 2, lines.length - 1); j++) {
      if (lines[j].includes('className="') && lines[j].includes('font-bold mb-12')) {
        const old = lines[j];
        lines[j] = lines[j].replace(/text-\[\d+px\] md:text-\[\d+px\]/, 'text-[28px] md:text-[40px]');
        if (old !== lines[j]) {
          secCount++;
          console.log('Line ' + (j+1) + ': section header -> 28px mobile');
        }
        break;
      }
    }
  }
}

// 3. Description: find line with "Joel Akinlosotu" and fix the className above it
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Joel Akinlosotu') && lines[i].includes("I'm") || lines[i].includes('I&apos;m')) {
    for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
      if (lines[j].includes('className="') && lines[j].includes('muted-foreground') && lines[j].includes('leading-relaxed')) {
        const old = lines[j];
        lines[j] = lines[j].replace(/text-\[\d+px\](\s+md:text-\[\d+px\])?/, 'text-[18px]');
        if (old !== lines[j]) {
          console.log('Line ' + (j+1) + ': description -> 18px');
        } else {
          console.log('Line ' + (j+1) + ': description already 18px');
        }
        break;
      }
    }
    break;
  }
}

fs.writeFileSync('src/app/page.tsx', lines.join('\n'));

// 4. CSS: append hero-heading rule (append is always reliable)
let css = fs.readFileSync('src/app/globals.css', 'utf8');
if (!css.includes('hero-heading')) {
  css += '\n@media (max-width: 767px) {\n  .hero-heading {\n    font-size: 40px !important;\n    line-height: 44px !important;\n  }\n}\n';
  fs.writeFileSync('src/app/globals.css', css);
  console.log('globals.css: hero-heading rule appended');
}

console.log('\nDone. Section headers updated: ' + secCount);
