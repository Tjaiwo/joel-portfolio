const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Find all lines with double initial="hidden"
// Pattern: initial="hidden" ... initial="hidden"
const lines = p.split('\n');
let fixed = 0;

for (let i = 0; i < lines.length; i++) {
  // Count occurrences of initial="hidden" in the line
  const count = (lines[i].match(/initial="hidden"/g) || []).length;
  if (count > 1) {
    // Also check for animate= before the second initial
    if (lines[i].includes('animate="visible"') || lines[i].includes('animate={isInView')) {
      // Remove the whileInView/viewport/initial we added, keep the original
      lines[i] = lines[i].replace(/\s+initial="hidden"\s+whileInView="visible"\s+viewport=\{\{ once: true, margin: "-100px" \}\}/, '');
    }
    fixed++;
    console.log(`Fixed line ${i+1}`);
  }
}

p = lines.join('\n');
console.log(`✅ Fixed ${fixed} lines with duplicate attributes`);
fs.writeFileSync('src/app/page.tsx', p);
