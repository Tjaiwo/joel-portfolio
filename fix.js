const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix badge size
p = p.replace(
  'text-primary text-[14px] font-mono',
  'text-primary text-[12px] font-mono'
);

// Fix badge text
p = p.replace('Available for freelance work', 'Available');

fs.writeFileSync('src/app/page.tsx', p);
console.log('Changes applied');

// Check if anything actually changed
const { execSync } = require('child_process');
try {
  execSync('git diff --quiet src/app/page.tsx', { stdio: 'pipe' });
  console.log('No changes detected - file may already be correct');
} catch {
  console.log('File changed - ready to commit');
  execSync('git add src/app/page.tsx && git commit -m "fix: badge 12px, Available text" && git push', { stdio: 'inherit' });
}
