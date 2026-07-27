const fs = require('fs');
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');

// Add import after Analytics
layout = layout.replace(
  'import { Analytics } from "@vercel/analytics/next";',
  'import { Analytics } from "@vercel/analytics/next";\nimport { SpeedInsights } from "@vercel/speed-insights/next";'
);

fs.writeFileSync('src/app/layout.tsx', layout);
console.log('Import added');
