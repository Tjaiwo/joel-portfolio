// apply-projects-update.js
// Run: node apply-projects-update.js
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, 'src/app/page.tsx');
let code = fs.readFileSync(FILE, 'utf8');

// 1. REMOVE Kakaride from PROJECTS[]
const kakaride = `  {
    id: 4,
    slug: "kakaride",
    title: "Kakaride",
    description:
      "A Nigerian ride-hailing web platform offering solo rides, carpooling, car rentals, and corporate booking, with fare estimation, ride tracking, and driver management features built on WordPress.",
    url: "https://kakaride.ng/",
    image: "/screenshots/kakaride.png",
    tags: ["WordPress", "Custom Plugins", "API Integration", "Mobile-First", "Elementor", "SEO"],
    results: "4-tier ride service with fare estimation & OTP-secured trips",
    designer: true,
  },
  {`;
if (code.includes(kakaride)) { code = code.replace(kakaride, '  {'); console.log('✅ Removed Kakaride from PROJECTS[]'); }
else { console.log('⚠️ Kakaride not found in PROJECTS[] - may already be removed'); }

// 2. FIX duplicate id:6 → renumber
code = code.replace(/id:\s*5,\n\s*slug:\s*"diamond-source-jewelers"/, 'id: 4,\n    slug: "diamond-source-jewelers"');
code = code.replace(/id:\s*6,\n\s*slug:\s*"designed-spaces-by-yemi"/, 'id: 5,\n    slug: "designed-spaces-by-yemi"');
code = code.replace(/id:\s*6,\n\s*title:\s*"Evan Micky Photography"/, 'id: 6,\n    title: "Evan Micky Photography"');
console.log('✅ Renumbered project IDs');

// 3. ADD Elin Group + Mediapool after Evan Micky
const evanEnd = `    results: "Immersive gallery with seamless inquiry & booking flows",
  },
];`;
const newProjects = `    results: "Immersive gallery with seamless inquiry & booking flows",
  },
  {
    id: 7,
    slug: "elin-group",
    title: "Elin Group",
    description:
      "A corporate website for a diversified African industrial platform operating across energy, aviation, mining, construction, real estate, and power sectors — showcasing seven subsidiary businesses, leadership, sustainability initiatives, and career opportunities.",
    url: "https://elin-group.com/",
    image: "/screenshots/elingroup.png",
    tags: ["WordPress", "Elementor", "Corporate", "Multi-Business", "SEO"],
    results: "7 subsidiary brands unified under one industrial platform",
    designer: true,
  },
  {
    id: 8,
    slug: "mediapool",
    title: "Mediapool",
    description:
      "A creative media buying and planning agency website showcasing media consultancy, buying, and planning services with a portfolio of campaigns for brands like Renmoney, Zedvance, CrusaderSterling Pensions, and Mixta Africa.",
    url: "https://mediapool.ng/",
    image: "/screenshots/mediapool.png",
    tags: ["WordPress", "Elementor", "Media", "Agency", "SEO"],
    results: "Media campaigns for 4+ major Nigerian brands",
    designer: true,
  },
];`;
if (code.includes(evanEnd)) { code = code.replace(evanEnd, newProjects); console.log('✅ Added Elin Group & Mediapool to PROJECTS[]'); }
else { console.log('⚠️ Could not find Evan Micky closing block'); }

// 4. REMOVE Kakaride from Experience sub-projects
const kakExp = `      {
        title: "Kakaride",
        projectId: "kakaride",
        descriptions: [
          "Built a ride-hailing web platform on WordPress with custom plugins supporting four service tiers — solo rides, carpooling, car rentals with drivers, and corporate ride accounts.",
          "Implemented fare estimation, ride tracking, and an OTP-secured trip system to deliver a safe and transparent e-hailing experience for Nigerian commuters.",
          "Designed a mobile-first responsive interface with a streamlined booking flow — from pickup/drop-off entry to driver details and trip history — optimized for user retention.",
          "Optimized the site for performance and SEO with dedicated landing pages for each service category, ensuring strong search visibility for ride-hailing queries in Nigeria.",
        ],
      },`;
if (code.includes(kakExp)) { code = code.replace(kakExp, ''); code = code.replace(/\n\s*\n\s*\n/g, '\n\n'); console.log('✅ Removed Kakaride from Experience'); }
else { console.log('⚠️ Kakaride not found in Experience'); }

// 5. ADD Elin Group + Mediapool to Experience sub-projects
const dsEnd = `          "Implemented SEO-optimized service pages, a Contact Form 7 inquiry system, a testimonial carousel with Swiper.js, and full social media integration across six platforms — with Google Tag Manager, Schema.org structured data, and lazy-loaded imagery for performance.",
        ],
      },`;
const newExp = `          "Implemented SEO-optimized service pages, a Contact Form 7 inquiry system, a testimonial carousel with Swiper.js, and full social media integration across six platforms — with Google Tag Manager, Schema.org structured data, and lazy-loaded imagery for performance.",
        ],
      },
      {
        title: "Elin Group",
        projectId: "elin-group",
        descriptions: [
          "Built a corporate website for Elin Group, a diversified African industrial platform operating across energy, aviation, mining, construction, real estate, and power sectors — showcasing seven subsidiary businesses under one unified brand.",
          "Developed dedicated subsidiary pages for Elin Oil & Gas Services, Elin Air & Aviation Services, Elin Mining Limited, Elin Construction, Elin Realty, ENE Gas & Power, and Meffio Turbine Energy Limited — each with tailored service descriptions and operational highlights.",
          "Designed a premium corporate layout with Elementor featuring leadership profiles, sustainability initiatives (Vision 2030), career opportunities, and operational assets sections that communicate scale and industrial authority.",
          "Implemented SEO-optimized architecture with Schema.org structured data, performance-optimized asset delivery, and responsive design ensuring seamless experience across all devices and screen sizes.",
        ],
      },
      {
        title: "Mediapool",
        projectId: "mediapool",
        descriptions: [
          "Built a creative media agency website for Mediapool, a subsidiary of The Reef Group, offering media planning, media buying, and media consultancy services to brands across Nigeria.",
          "Developed a portfolio section showcasing successful campaigns for major Nigerian brands including Renmoney, Zedvance, CrusaderSterling Pensions, and Mixta Africa — with individual case study pages highlighting results and strategy.",
          "Designed a playful, water-themed creative layout with Elementor that reflects the brand's 'lifeguard' positioning — rescuing advertising budgets from waste and guiding clients to prime-time placements.",
          "Implemented SEO-optimized service pages, a streamlined contact flow for media inquiries, and responsive design optimized for fast loading across all devices and screen sizes.",
        ],
      },`;
if (code.includes(dsEnd)) { code = code.replace(dsEnd, newExp); console.log('✅ Added Elin Group & Mediapool to Experience'); }
else { console.log('⚠️ Could not find Designed Spaces closing block'); }

fs.writeFileSync(FILE, code, 'utf8');
console.log('\n📝 Updated src/app/page.tsx');