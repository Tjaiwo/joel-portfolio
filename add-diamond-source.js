const fs = require('fs');
const F = 'src/data/case-studies.ts';
let s = fs.readFileSync(F, 'utf8');
fs.writeFileSync(F + '.ds.bak', s, 'utf8');

// Update atomdsn's nextSlug to "diamond-source"
const aIdx = s.indexOf('slug: "atomdsn"');
if (aIdx !== -1) {
  const nsIdx = s.indexOf('nextSlug:', aIdx);
  const le = s.indexOf('\n', nsIdx);
  s = s.substring(0, nsIdx) + 'nextSlug: "diamond-source",' + s.substring(le);
  console.log('  ok atomdsn.nextSlug -> diamond-source');
}

const newCS = `
  {
    slug: "diamond-source",
    status: "Live",
    title: "Diamond Source Jewelers",
    tagline: "Contributing to a custom jewelry e-commerce experience for engagement rings and wedding bands.",
    intro: [
      "Diamond Source Jewelers is a Denver-based custom jeweler specializing in engagement rings, wedding bands, and lab-grown diamonds. The site runs on WooCommerce with a deep product taxonomy that lets shoppers filter by ring style, shape, stone type, and metal.",
      "I contributed to the project as a product upload specialist, working with the client to migrate their existing inventory into the new WooCommerce architecture. The work involved structuring product data, setting up variations, configuring attributes for filtering, and ensuring the catalog was complete and accurate before launch.",
    ],
    meta: {
      industry: "E-Commerce / Jewelry",
      services: ["Product Catalog Management", "WooCommerce", "Data Migration", "Quality Assurance"],
      date: "May 2026",
      duration: "2 weeks",
    },
    liveUrl: "https://www.diamondsourcejewelers.com",
    heroImage: "/screenshots/case-studies/diamond-source/desktop-engagement.webp",
    heroImageAlt: "Diamond Source engagement rings category page",
    heroImageLink: "https://www.diamondsourcejewelers.com/product-category/engagement-rings/",
    blocks: [
      { type: "image", id: "hero-break", src: "/screenshots/case-studies/diamond-source/desktop-lab-grown.webp", alt: "Diamond Source lab grown diamonds category", caption: "Lab grown diamonds category. One of several product taxonomies in the catalog.", parallax: true, link: "https://www.diamondsourcejewelers.com/product-category/lab-grown-diamonds/" },
      { type: "text", id: "catalog", heading: "A deep product taxonomy", body: [
        "The Diamond Source catalog isn't just a list of rings. It's a structured taxonomy that lets shoppers filter by ring style (solitaire, side stones, three stone, halo, twist shank, vintage), by shape (round, cushion, oval, emerald, radiant, pear, marquise), by stone type (mined or lab-grown), and by metal. Each product has multiple variation axes that need to be set up correctly for the filters to work.",
        "My role was to ensure every product in the catalog had the right attributes assigned. A ring listed as 'round solitaire' needed the style attribute set to 'solitaire' and the shape attribute set to 'round'. Missing or incorrect attributes meant the ring wouldn't appear in the right filter results, which directly impacted discoverability and sales.",
      ]},
      { type: "text-image", id: "engagement-rings", heading: "Engagement rings as the flagship category", body: [
        "Engagement rings are the highest-traffic category on the site. Most visitors arrive from Google searches for specific ring styles or shapes. The category page surfaces the filter sidebar prominently, shows product images large enough to evaluate the setting, and includes a quick-view that opens product details without a full page load.",
        "I worked through the entire engagement ring catalog, verifying that each ring had complete attribute data, correct variation pricing (for different metal and stone options), and high-quality product imagery that met the site's visual standards.",
      ], image: { src: "/screenshots/case-studies/diamond-source/desktop-engagement.webp", alt: "Diamond Source engagement rings category page", caption: "Engagement rings category. Filterable by style, shape, stone, and metal.", link: "https://www.diamondsourcejewelers.com/product-category/engagement-rings/" }, imagePosition: "full" },
      { type: "text", id: "lab-grown", heading: "Lab-grown diamond integration", body: [
        "Lab-grown diamonds are a growing segment of the market, and Diamond Source needed a dedicated category that positioned them alongside mined diamonds without creating confusion. The lab-grown category uses the same filter architecture as the mined diamond category, so shoppers can compare options side by side.",
        "Each lab-grown diamond product needed to be clearly labeled, have its certification data entered, and be linked to the correct shape and carat range for the filters to work correctly.",
      ]},
      { type: "image", id: "detail-break-2", src: "/screenshots/case-studies/diamond-source/desktop-wedding-bands.webp", alt: "Diamond Source wedding bands category", parallax: true, link: "https://www.diamondsourcejewelers.com/product-category/wedding-bands/" },
      { type: "text", id: "process", heading: "Two weeks of catalog work", body: [
        "The project ran for two weeks. Week one was engagement rings and wedding bands, the two highest-traffic categories. Week two was lab-grown diamonds, shapes, and the remaining catalog. Each product went through a verification checklist: attributes correct, variations priced, images uploaded and properly cropped, description complete, SEO title and meta description set.",
        "By launch, the catalog had over 200 products live with complete attribute data, ready for the filter architecture to surface them correctly.",
      ]},
      { type: "gallery", id: "gallery", columns: 3, images: [
        { src: "/screenshots/case-studies/diamond-source/mobile-home.webp", alt: "Diamond Source mobile homepage", caption: "Mobile home", link: "https://www.diamondsourcejewelers.com/" },
        { src: "/screenshots/case-studies/diamond-source/mobile-engagement.webp", alt: "Diamond Source mobile engagement rings", caption: "Mobile engagement", link: "https://www.diamondsourcejewelers.com/product-category/engagement-rings/" },
        { src: "/screenshots/case-studies/diamond-source/mobile-lab-grown.webp", alt: "Diamond Source mobile lab grown diamonds", caption: "Mobile lab grown", link: "https://www.diamondsourcejewelers.com/product-category/lab-grown-diamonds/" },
      ]},
      { type: "stats", id: "results", heading: "Measurable outcomes", stats: [
        { value: "200+", label: "Products uploaded", sublabel: "with complete attributes" },
        { value: "4", label: "Filter axes", sublabel: "style, shape, stone, metal" },
        { value: "2", label: "Weeks of catalog work", sublabel: "kickoff to launch" },
        { value: "100%", label: "Attribute coverage", sublabel: "at launch" },
      ]},
      { type: "quote", id: "closing", text: "An e-commerce catalog is only as good as its attribute data. Every filter that returns zero results is a lost sale. The work was unglamorous but essential, and the catalog was complete before launch." },
    ],
    nextSlug: "designed-spaces",
  },
`;

const endIdx = s.lastIndexOf('];');
s = s.substring(0, endIdx) + newCS + '\n' + s.substring(endIdx);
fs.writeFileSync(F, s, 'utf8');
console.log('  ok added diamond-source case study');
