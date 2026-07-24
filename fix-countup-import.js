const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add import at the top
const importLine = 'import { ThemeToggle } from "@/components/theme-toggle";';
const newImport = 'import { ThemeToggle } from "@/components/theme-toggle";\nimport { CountUp } from "@/components/count-up";';

p = p.replace(importLine, newImport);
console.log('✅ CountUp import added');

fs.writeFileSync('src/app/page.tsx', p);
