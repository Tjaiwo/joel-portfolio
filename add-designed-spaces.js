const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add to PROJECTS array only
const projectsInsert = `  {
    id: 5,
    title: "Diamond Source Jewelers",
    description:
      "A fine jewelry e-commerce store for a 45-year-old Denver-based jeweler, featuring custom engagement ring design, fine jewelry collections, jewelry buying services, and certified appraisals — backed by a 4.9/5 Google rating.",
    url: "https://www.diamondsourcejewelers.com",
    image: "/screenshots/diamondsourcejewelers.png",
    tags: ["WordPress", "WooCommerce", "E-Commerce", "Luxury Brand", "Elementor", "SEO"],
  },`;

const projectsNew = `  {
    id: 5,
    title: "Diamond Source Jewelers",
    description:
      "A fine jewelry e-commerce store for a 45-year-old Denver-based jeweler, featuring custom engagement ring design, fine jewelry collections, jewelry buying services, and certified appraisals — backed by a 4.9/5 Google rating.",
    url: "https://www.diamondsourcejewelers.com",
    image: "/screenshots/diamondsourcejewelers.png",
    tags: ["WordPress", "WooCommerce", "E-Commerce", "Luxury Brand", "Elementor", "SEO"],
  },
  {
    id: 6,
    slug: "designed-spaces-by-yemi",
    title: "Designed Spaces by Yemi",
    description:
      "A professional interior design studio website showcasing residential and commercial projects with a portfolio gallery, categorized showcases, and a consultation booking system built on WordPress.",
    url: "https://designedspacesbyyemi.com/",
    image: "/screenshots/designedspacesbyyemi.png",
    tags: ["WordPress", "Elementor", "Portfolio", "Booking System", "SEO"],
    designer: true,
  },`;

if (p.includes(projectsInsert)) {
  p = p.replace(projectsInsert, projectsNew);
  console.log('✅ Added to PROJECTS array');
} else {
  console.log('⚠️ Could not find insert point');
}

fs.writeFileSync('src/app/page.tsx', p);
