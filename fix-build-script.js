const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (packageJson.scripts && packageJson.scripts.build) {
  console.log('Current build script:', packageJson.scripts.build);
  
  // Replace with simple next build
  packageJson.scripts.build = 'next build';
  
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✓ Updated build script to: next build');
} else {
  console.log('⚠ No build script found');
}
