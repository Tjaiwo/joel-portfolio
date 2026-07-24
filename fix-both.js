const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add slug to Diamond Source Jewelers
const diamondOld = `    id: 5,
    title: "Diamond Source Jewelers",`;
const diamondNew = `    id: 5,
    slug: "diamond-source-jewelers",
    title: "Diamond Source Jewelers",`;

if (p.includes(diamondOld)) {
  p = p.replace(diamondOld, diamondNew);
  console.log('✅ Added slug to Diamond Source Jewelers');
}

// 2. Add Designed Spaces to EXPERIENCE
const expInsert = `        projectId: "diamond-source-jewelers",
        descriptions: [
          "Built a WooCommerce e-commerce store for a 45-year-old fine jewelry business in Denver, Colorado, featuring custom engagement ring design, fine jewelry collections, and a jewelry buying service.",
          "Developed a 'Design Your Own Engagement Ring' configurator, along with categorized product pages for rings, earrings, necklaces, and bracelets — filtering by style, shape, and stone type.",
          "Implemented service booking flows for jewelry repairs, appraisals, and cleaning/inspections, alongside a consultation scheduling system backed by a 4.9/5 Google rating across 100+ reviews.",
          "Optimized the site for local SEO targeting Denver and Greenwood Village, ensuring strong search visibility for diamond, engagement ring, and jewelry-buying queries in the Colorado market.",
        ],
      },`;

const expNew = `        projectId: "diamond-source-jewelers",
        descriptions: [
          "Built a WooCommerce e-commerce store for a 45-year-old fine jewelry business in Denver, Colorado, featuring custom engagement ring design, fine jewelry collections, and a jewelry buying service.",
          "Developed a 'Design Your Own Engagement Ring' configurator, along with categorized product pages for rings, earrings, necklaces, and bracelets — filtering by style, shape, and stone type.",
          "Implemented service booking flows for jewelry repairs, appraisals, and cleaning/inspections, alongside a consultation scheduling system backed by a 4.9/5 Google rating across 100+ reviews.",
          "Optimized the site for local SEO targeting Denver and Greenwood Village, ensuring strong search visibility for diamond, engagement ring, and jewelry-buying queries in the Colorado market.",
        ],
      },
      {
        title: "Designed Spaces by Yemi",
        projectId: "designed-spaces-by-yemi",
        descriptions: [
          "Built a comprehensive architectural firm website for Designed Spaces By Yemi, a Lagos-based full-service design powerhouse offering architectural design, master planning, urban design, interior architecture, feasibility studies, project management, and renovations.",
          "Developed a detailed project portfolio showcasing 13+ landmark projects including AG Heights, The Earl Of Ilabere, Cedar Shore, Baylad Mews, The Silverleaf, and Beronia Mid Rise — with individual project pages featuring image galleries and descriptions across residential, commercial, and mixed-use categories.",
          "Designed a responsive, mobile-first layout with Elementor and the Mrittik theme that communicates prestige and creative excellence, aligning with the brand's positioning as an award-winning architecture firm serving high-end clients across Nigeria.",
          "Implemented SEO-optimized service pages, a Contact Form 7 inquiry system, a testimonial carousel with Swiper.js, and full social media integration across six platforms — with Google Tag Manager, Schema.org structured data, and lazy-loaded imagery for performance.",
        ],
      },`;

if (p.includes(expInsert)) {
  p = p.replace(expInsert, expNew);
  console.log('✅ Added Designed Spaces to EXPERIENCE');
} else {
  console.log('⚠️ Could not find EXPERIENCE insert point');
}

fs.writeFileSync('src/app/page.tsx', p);
