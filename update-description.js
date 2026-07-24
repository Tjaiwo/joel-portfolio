const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldDesc = `        title: "Designed Spaces by Yemi",
        projectId: "designed-spaces-by-yemi",
        descriptions: [
          "Built a professional website for an interior design studio, showcasing residential and commercial design projects with a clean, modern aesthetic.",
          "Developed a project portfolio gallery with categorized showcases, allowing visitors to filter by room type, style, and project scope.",
          "Implemented a consultation booking system and contact inquiry flow for seamless client scheduling.",
          "Optimized the site for performance and local SEO, ensuring strong visibility for interior design queries.",
        ],`;

const newDesc = `        title: "Designed Spaces by Yemi",
        projectId: "designed-spaces-by-yemi",
        descriptions: [
          "Built a comprehensive architectural firm website for Designed Spaces By Yemi, a Lagos-based full-service design powerhouse offering architectural design, master planning, urban design, interior architecture, feasibility studies, project management, and renovations.",
          "Developed a detailed project portfolio showcasing 13+ landmark projects including AG Heights, The Earl Of Ilabere, Cedar Shore, Baylad Mews, The Silverleaf, and Beronia Mid Rise — with individual project pages featuring image galleries and descriptions across residential, commercial, and mixed-use categories.",
          "Designed a responsive, mobile-first layout with Elementor and the Mrittik theme that communicates prestige and creative excellence, aligning with the brand's positioning as an award-winning architecture firm serving high-end clients across Nigeria.",
          "Implemented SEO-optimized service pages, a Contact Form 7 inquiry system, a testimonial carousel with Swiper.js, and full social media integration across six platforms — with Google Tag Manager, Schema.org structured data, and lazy-loaded imagery for performance.",
        ],`;

if (p.includes(oldDesc)) {
  p = p.replace(oldDesc, newDesc);
  console.log('✅ Updated EXPERIENCE description');
} else {
  console.log('⚠️ Could not find EXPERIENCE description');
}

// Also update PROJECTS description
const oldProjDesc = `    title: "Designed Spaces by Yemi",
    description:
      "A professional interior design studio website showcasing residential and commercial projects with a portfolio gallery, categorized showcases, and a consultation booking system built on WordPress.",`;

const newProjDesc = `    title: "Designed Spaces by Yemi",
    description:
      "A comprehensive architectural firm website for a Lagos-based full-service design powerhouse, showcasing 13+ landmark projects with a detailed portfolio, SEO-optimized service pages, and a mobile-first layout.",`;

if (p.includes(oldProjDesc)) {
  p = p.replace(oldProjDesc, newProjDesc);
  console.log('✅ Updated PROJECTS description');
} else {
  console.log('⚠️ Could not find PROJECTS description');
}

fs.writeFileSync('src/app/page.tsx', p);
