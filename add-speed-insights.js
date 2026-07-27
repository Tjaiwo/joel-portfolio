const fs = require('fs');
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');

// Add import
const oldImport = "import { ThemeProvider } from '@/components/theme-provider';";
const newImport = "import { ThemeProvider } from '@/components/theme-provider';\nimport { SpeedInsights } from '@vercel/speed-insights/next';";

layout = layout.replace(oldImport, newImport);

// Add SpeedInsights before closing body
layout = layout.replace('</body>', '  <SpeedInsights />\n  </body>');

fs.writeFileSync('src/app/layout.tsx', layout);
console.log('SpeedInsights added');
