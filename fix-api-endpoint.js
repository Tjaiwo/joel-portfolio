const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldFetch = 'fetch("/api",';
const newFetch = 'fetch("/api/contact",';

if (p.includes(oldFetch)) {
  p = p.replace(oldFetch, newFetch);
  console.log('✅ Changed fetch endpoint from /api to /api/contact');
} else {
  console.log('⚠️  Could not find fetch("/api" - check manually');
}

fs.writeFileSync('src/app/page.tsx', p);
