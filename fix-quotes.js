const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');
c = c.replace(
  '"Developed a "Design Your Own Engagement Ring" configurator',
  '"Developed a Design Your Own Engagement Ring configurator'
);
fs.writeFileSync('src/app/page.tsx', c);
console.log('Done');
