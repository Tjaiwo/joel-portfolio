const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix TS error — exact match from build log (no type annotation on ts)
const old = `    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);`;

const fix = `    const step = (ts) => {
      const s = start ?? ts;
      start = s;
      const progress = Math.min((ts - s) / duration, 1);`;

if (p.includes(old)) {
  p = p.replace(old, fix);
  console.log('1. TS error fixed');
} else {
  // Try regex fallback — match any whitespace variation
  const re = /(const step = \(ts(?:\s*,\s*\w+)?\) => \{)\s*\n(\s*)if \(start === null\) start = ts;\s*\n(\s*)const progress = Math\.min\(\(ts - start\) \/ duration/;
  if (re.test(p)) {
    p = p.replace(re, '$1\n$2const s = start ?? ts;\n$2start = s;\n$3const progress = Math.min((ts - s) / duration');
    console.log('1. TS error fixed (regex fallback)');
  } else {
    console.log('1. WARNING: Could not find TS error pattern. Showing context around "start === null":');
    const lines = p.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('start === null')) {
        console.log('  L' + (i+1) + ': ' + line);
        console.log('  L' + (i+2) + ': ' + lines[i+1]);
        console.log('  L' + (i+3) + ': ' + lines[i+2]);
      }
    });
  }
}

// 2. Badge text: "Available for freelance work" -> "Available"
p = p.replace('Available for freelance work', 'Available');
console.log('2. Badge text -> "Available"');

// 3. Badge size: ensure text-[12px] (not 14px)
// Match the exact badge line with stat-pulse
p = p.replace(
  /px-3 py-1\.5 rounded-full border border-primary\/20 bg-primary\/5 text-primary text-\[(?:14|12)px\] font-mono/,
  'px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[12px] font-mono'
);
// Also catch if still text-xs
p = p.replace(
  'text-xs font-mono">\n                  <span className="w-1.5 h-1.5 rounded-full bg-primary stat-pulse" />\n                  Available',
  'text-[12px] font-mono">\n                  <span className="w-1.5 h-1.5 rounded-full bg-primary stat-pulse" />\n                  Available'
);
console.log('3. Badge size -> text-[12px]');

fs.writeFileSync('src/app/page.tsx', p);
console.log('\nDone.');
