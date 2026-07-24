const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Find and replace LinkedIn URL
const oldLinkedIn = /https:\/\/linkedin\.com\/in\/[^"'\s]+/;
const newLinkedIn = 'https://www.linkedin.com/in/joel-akinlosotu-44b70a149/';

if (p.match(oldLinkedIn)) {
  p = p.replace(oldLinkedIn, newLinkedIn);
  console.log('✅ LinkedIn URL updated');
} else {
  console.log('⚠️ Could not find LinkedIn URL');
}

fs.writeFileSync('src/app/page.tsx', p);
