const fs = require('fs');
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');

// Add import
if (!layout.includes('@vercel/analytics')) {
  layout = layout.replace(
    "import { Toaster } from \"@/components/ui/toaster\";",
    "import { Toaster } from \"@/components/ui/toaster\";\nimport { Analytics } from \"@vercel/analytics/next\";"
  );
}

// Add component before closing body tag
if (!layout.includes('<Analytics />')) {
  layout = layout.replace(
    '        <Toaster />\n      </body>',
    '        <Toaster />\n        <Analytics />\n      </body>'
  );
}

fs.writeFileSync('src/app/layout.tsx', layout);
console.log('OK Analytics added to layout.tsx');
