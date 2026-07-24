const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldBlock = `    tags: ["WordPress", "Elementor", "Portfolio", "Booking System", "SEO"],
    designer: true,
  },`;

const newBlock = `    tags: ["WordPress", "Elementor", "Portfolio", "Booking System", "SEO"],
  },`;

if (p.includes(oldBlock)) {
  p = p.replace(oldBlock, newBlock);
  console.log('✅ Removed designer credit from Designed Spaces by Yemi');
} else {
  console.log('⚠️ Pattern not found');
}

fs.writeFileSync('src/app/page.tsx', p);
