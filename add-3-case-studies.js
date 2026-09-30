/**
 * add-3-case-studies.js
 *
 * Adds case studies for:
 *   - Diamond Source Jewelers (Joel was a contributor, uploaded products)
 *   - Designed Spaces by Yemi (architecture firm)
 *   - Cedar Rush (media production company)
 *
 * NONE of these get Mayowa's quote (only Clayton does).
 *
 * Updates nextSlug chain to include all 9 case studies in order:
 *   elin-group -> elin-air -> mediapool -> clayton-prints -> evan-micky
 *   -> atomdsn -> diamond-source -> designed-spaces -> cedar-rush -> elin-group (loop)
 *
 * Updates CASE_STUDY_SLUGS to include all 9 slugs.
 */
const fs = require('fs');

const DATA_FILE = 'src/data/case-studies.ts';
const PAGE_FILE = 'src/app/page.tsx';

// ─────────────────────────────────────────────────────────────
// 1. Update atomdsn's nextSlug to "diamond-source"
// ─────────────────────────────────────────────────────────────
let d = fs.readFileSync(DATA_FILE, 'utf8');
fs.writeFileSync(DATA_FILE + '.v7.bak', d, 'utf8');

const atomdsnSlugIdx = d.indexOf('slug: "atomdsn"');
if (atomdsnSlugIdx !== -1) {
  const nextSlugIdx = d.indexOf('nextSlug:', atomdsnSlugIdx);
  if (nextSlugIdx !== -1) {
    const lineEnd = d.indexOf('\n', nextSlugIdx);
    d = d.substring(0, nextSlugIdx) + 'nextSlug: "diamond-source",' + d.substring(lineEnd);
    console.log('  ok atomdsn.nextSlug updated to "diamond-source"');
  }
}

// ─────────────────────────────────────────────────────────────
// 2. Insert 3 new case studies before the closing `];`
// ─────────────────────────────────────────────────────────────
const arrayEndIdx = d.lastIndexOf('];');
if (arrayEndIdx !== -1) {
  const newCaseStudies = `
  /* ────────────────────────────────────────────────────────────── */
  /* DIAMOND SOURCE JEWELERS                                       */
  /* ────────────────────────────────────────────────────────────── */
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
      {
        type: "image",
        id: "hero-break",
        src: "/screenshots/case-studies/diamond-source/desktop-lab-grown.webp",
        alt: "Diamond Source lab grown diamonds category",
        caption: "Lab grown diamonds category. One of several product taxonomies in the catalog.",
        parallax: true,
        link: "https://www.diamondsourcejewelers.com/product-category/lab-grown-diamonds/",
      },
      {
        type: "text",
        id: "catalog",
        heading: "A deep product taxonomy",
        body: [
          "The Diamond Source catalog isn't just a list of rings. It's a structured taxonomy that lets shoppers filter by ring style (solitaire, side stones, three stone, halo, twist shank, vintage), by shape (round, cushion, oval, emerald, radiant, pear, marquise), by stone type (mined or lab-grown), and by metal. Each product has multiple variation axes that need to be set up correctly for the filters to work.",
          "My role was to ensure every product in the catalog had the right attributes assigned. A ring listed as 'round solitaire' needed the style attribute set to 'solitaire' and the shape attribute set to 'round'. Missing or incorrect attributes meant the ring wouldn't appear in the right filter results, which directly impacted discoverability and sales.",
        ],
      },
      {
        type: "text-image",
        id: "engagement-rings",
        heading: "Engagement rings as the flagship category",
        body: [
          "Engagement rings are the highest-traffic category on the site. Most visitors arrive from Google searches for specific ring styles or shapes. The category page surfaces the filter sidebar prominently, shows product images large enough to evaluate the setting, and includes a quick-view that opens product details without a full page load.",
          "I worked through the entire engagement ring catalog, verifying that each ring had complete attribute data, correct variation pricing (for different metal and stone options), and high-quality product imagery that met the site's visual standards.",
        ],
        image: {
          src: "/screenshots/case-studies/diamond-source/desktop-engagement.webp",
          alt: "Diamond Source engagement rings category page",
          caption: "Engagement rings category. Filterable by style, shape, stone, and metal.",
          link: "https://www.diamondsourcejewelers.com/product-category/engagement-rings/",
        },
        imagePosition: "full",
      },
      {
        type: "text",
        id: "lab-grown",
        heading: "Lab-grown diamond integration",
        body: [
          "Lab-grown diamonds are a growing segment of the market, and Diamond Source needed a dedicated category that positioned them alongside mined diamonds without creating confusion. The lab-grown category uses the same filter architecture as the mined diamond category, so shoppers can compare options side by side.",
          "Each lab-grown diamond product needed to be clearly labeled, have its certification data entered, and be linked to the correct shape and carat range for the filters to work correctly.",
        ],
      },
      {
        type: "image",
        id: "detail-break-2",
        src: "/screenshots/case-studies/diamond-source/desktop-wedding-bands.webp",
        alt: "Diamond Source wedding bands category",
        parallax: true,
        link: "https://www.diamondsourcejewelers.com/product-category/wedding-bands/",
      },
      {
        type: "text",
        id: "process",
        heading: "Two weeks of catalog work",
        body: [
          "The project ran for two weeks. Week one was engagement rings and wedding bands, the two highest-traffic categories. Week two was lab-grown diamonds, shapes, and the remaining catalog. Each product went through a verification checklist: attributes correct, variations priced, images uploaded and properly cropped, description complete, SEO title and meta description set.",
          "By launch, the catalog had over 200 products live with complete attribute data, ready for the filter architecture to surface them correctly.",
        ],
      },
      {
        type: "gallery",
        id: "gallery",
        columns: 3,
        images: [
          { src: "/screenshots/case-studies/diamond-source/mobile-home.webp", alt: "Diamond Source mobile homepage", caption: "Mobile home", link: "https://www.diamondsourcejewelers.com/" },
          { src: "/screenshots/case-studies/diamond-source/mobile-engagement.webp", alt: "Diamond Source mobile engagement rings", caption: "Mobile engagement", link: "https://www.diamondsourcejewelers.com/product-category/engagement-rings/" },
          { src: "/screenshots/case-studies/diamond-source/mobile-lab-grown.webp", alt: "Diamond Source mobile lab grown diamonds", caption: "Mobile lab grown", link: "https://www.diamondsourcejewelers.com/product-category/lab-grown-diamonds/" },
        ],
      },
      {
        type: "stats",
        id: "results",
        heading: "Measurable outcomes",
        stats: [
          { value: "200+", label: "Products uploaded", sublabel: "with complete attributes" },
          { value: "4", label: "Filter axes", sublabel: "style, shape, stone, metal" },
          { value: "2", label: "Weeks of catalog work", sublabel: "kickoff to launch" },
          { value: "100%", label: "Attribute coverage", sublabel: "at launch" },
        ],
      },
      {
        type: "quote",
        id: "closing",
        text: "An e-commerce catalog is only as good as its attribute data. Every filter that returns zero results is a lost sale. The work was unglamorous but essential, and the catalog was complete before launch.",
      },
    ],
    nextSlug: "designed-spaces",
  },

  /* ────────────────────────────────────────────────────────────── */
  /* DESIGNED SPACES BY YEMI                                       */
  /* ────────────────────────────────────────────────────────────── */
  {
    slug: "designed-spaces",
    status: "Live",
    title: "Designed Spaces by Yemi",
    tagline: "Building a portfolio-driven website for an architecture firm that delivers end-to-end.",
    intro: [
      "Designed Spaces by Yemi (DSY) is an architecture firm that breaks the traditional architect mold. Most firms hand over drawings and walk away. DSY stays through planning approval, tender, construction, and handover, integrating architecture, project management, and green building consultancy under one roof.",
      "I built a WordPress site that leads with the firm's completed projects. The result is a portfolio-driven website that positions DSY as a full-service architecture practice, not just a design shop, and lets prospective clients see the range of work before they ever reach out.",
    ],
    meta: {
      industry: "Architecture / Construction",
      services: ["Web Design", "WordPress Development", "Portfolio Architecture", "SEO"],
      date: "June 2026",
      duration: "3 weeks",
    },
    liveUrl: "https://designedspacesbyyemi.com/",
    heroImage: "/screenshots/case-studies/designed-spaces/desktop-home.webp",
    heroImageAlt: "Designed Spaces by Yemi homepage hero",
    heroImageLink: "https://designedspacesbyyemi.com/",
    blocks: [
      {
        type: "image",
        id: "hero-break",
        src: "/screenshots/case-studies/designed-spaces/desktop-projects.webp",
        alt: "Designed Spaces projects portfolio",
        caption: "Projects portfolio. Each project gets its own detail page.",
        parallax: true,
        link: "https://designedspacesbyyemi.com/projects/",
      },
      {
        type: "text",
        id: "positioning",
        heading: "End-to-end delivery as differentiator",
        body: [
          "Most architecture firms position themselves as design specialists. DSY's differentiator is that they stay through the entire project lifecycle, from feasibility studies through construction handover. The site needed to communicate this without sounding like a generic full-service pitch.",
          "The homepage leads with the tagline 'We don't just design buildings. We deliver them.' The services section breaks down the full scope: feasibility studies, architectural design, consultancy, project management, and renovations. A visitor can see in 30 seconds that DSY is not just a design shop.",
        ],
      },
      {
        type: "text-image",
        id: "projects",
        heading: "Projects as proof",
        body: [
          "The portfolio showcases 12+ completed projects including AG Heights, The Earl of Ilabere, NF 1, Project Indulgence, Cedar Shore, and Baylad Mews. Each project gets its own detail page with hero imagery, project brief, scope, and outcomes.",
          "The projects are categorized by type (residential, commercial, multi-family) so visitors can filter to what's relevant to their needs. A prospective residential client doesn't have to scroll through commercial work to find relevant examples.",
        ],
        image: {
          src: "/screenshots/case-studies/designed-spaces/desktop-projects.webp",
          alt: "Designed Spaces projects portfolio grid",
          caption: "Projects portfolio. 12+ completed works, filterable by type.",
          link: "https://designedspacesbyyemi.com/projects/",
        },
        imagePosition: "full",
      },
      {
        type: "text",
        id: "services",
        heading: "Services as navigation, not brochure",
        body: [
          "The firm offers five core services: feasibility studies, architectural design, consultancy, project management, and renovations/retrofits/upgrades. Each service is a navigation card on the services page, not a paragraph of marketing copy. Visitors can scan the full range in seconds and click into any service for more detail.",
        ],
      },
      {
        type: "image",
        id: "detail-break-2",
        src: "/screenshots/case-studies/designed-spaces/desktop-about.webp",
        alt: "Designed Spaces about page",
        parallax: true,
        link: "https://designedspacesbyyemi.com/about-us/",
      },
      {
        type: "text",
        id: "performance",
        heading: "Heavy imagery, fast load",
        body: [
          "An architecture portfolio is image-heavy by definition. Each project has 10-20 high-resolution photography shots. We implemented WebP conversion, responsive srcsets, lazy-loading, and a CDN with edge caching. The result is a site that loads a 15-image project page in under 2 seconds on mobile 4G.",
        ],
      },
      {
        type: "text",
        id: "process",
        heading: "Three weeks to launch",
        body: [
          "Week one was the portfolio architecture: custom post type for projects, gallery component, and the project detail page layout. Week two was the supporting pages (about, services, contact) and the project filtering system. Week three was performance optimization, image pipeline, and SEO setup.",
        ],
      },
      {
        type: "gallery",
        id: "gallery",
        columns: 3,
        images: [
          { src: "/screenshots/case-studies/designed-spaces/mobile-home.webp", alt: "Designed Spaces mobile homepage", caption: "Mobile home", link: "https://designedspacesbyyemi.com/" },
          { src: "/screenshots/case-studies/designed-spaces/mobile-projects.webp", alt: "Designed Spaces mobile projects", caption: "Mobile projects", link: "https://designedspacesbyyemi.com/projects/" },
          { src: "/screenshots/case-studies/designed-spaces/mobile-services.webp", alt: "Designed Spaces mobile services", caption: "Mobile services", link: "https://designedspacesbyyemi.com/services/" },
        ],
      },
      {
        type: "stats",
        id: "results",
        heading: "Measurable outcomes",
        stats: [
          { value: "12+", label: "Projects showcased", sublabel: "completed works" },
          { value: "5", label: "Services surfaced", sublabel: "as navigation cards" },
          { value: "<2s", label: "Mobile load time", sublabel: "15-image project page" },
          { value: "3 weeks", label: "Build time", sublabel: "kickoff to launch" },
        ],
      },
      {
        type: "quote",
        id: "closing",
        text: "An architecture firm's portfolio is the proof of competence. The site was designed to surface the work first, with the full-service positioning supporting it rather than competing with it.",
      },
    ],
    nextSlug: "cedar-rush",
  },

  /* ────────────────────────────────────────────────────────────── */
  /* CEDAR RUSH                                                    */
  /* ────────────────────────────────────────────────────────────── */
  {
    slug: "cedar-rush",
    status: "Live",
    title: "Cedar Rush",
    tagline: "Building a digital presence for Nigeria's leading creative production and media company.",
    intro: [
      "Cedar Rush is a Nigeria-based creative production and media company with 20+ years of experience producing events, documentaries, commercials, and strategic media executions for major brands. Their previous site didn't reflect the scale or caliber of the work they'd shipped over two decades.",
      "I built a WordPress site that positions Cedar Rush as a premium production house. The site leads with their creative architect Seun Oluyemi's 20-year track record, surfaces their four core service lines, and gives prospective clients a clear path to inquiry.",
    ],
    meta: {
      industry: "Media Production / Events",
      services: ["Web Design", "WordPress Development", "Content Architecture", "SEO"],
      date: "September 2025",
      duration: "3 weeks",
    },
    liveUrl: "https://cedarrush.ng/",
    heroImage: "/screenshots/case-studies/cedar-rush/desktop-home.webp",
    heroImageAlt: "Cedar Rush homepage hero",
    heroImageLink: "https://cedarrush.ng/",
    blocks: [
      {
        type: "image",
        id: "hero-break",
        src: "/screenshots/case-studies/cedar-rush/desktop-services.webp",
        alt: "Cedar Rush services page",
        caption: "Services page. Four core production capabilities.",
        parallax: true,
        link: "https://cedarrush.ng/services/",
      },
      {
        type: "text",
        id: "positioning",
        heading: "Premium production, not generic media",
        body: [
          "Cedar Rush's value proposition is precision-driven production at scale, helmed by industry veterans with a track record of global results. The homepage leads with 'We Make Moments Impossible To Ignore' and immediately positions the company as a premium production house, not a generic media agency.",
          "The site introduces Seun Oluyemi, the creative architect, with his credentials: 100 Most Influential Young Nigerians in 2018, 2019 Africa's young change-maker, 20+ years producing for brands and agencies, Senior Producer for Rubbin'Minds on Channels TV. His track record is the proof of the company's positioning.",
        ],
      },
      {
        type: "text-image",
        id: "services",
        heading: "Four core service lines",
        body: [
          "Cedar Rush offers four service lines: event production, TV and documentary production, commercials and brand films, and media strategy and execution. Each service gets a dedicated section with scope, examples, and a clear path to inquiry.",
          "Event production covers concerts, award shows, brand events, corporate gatherings, and cultural experiences. TV and documentary production covers broadcast specials and documentary storytelling. Commercials cover brand films and promotional content. Media strategy ensures audiences see, feel, and remember the work.",
        ],
        image: {
          src: "/screenshots/case-studies/cedar-rush/desktop-services.webp",
          alt: "Cedar Rush services page with four capabilities",
          caption: "Services page. Four core production capabilities.",
          link: "https://cedarrush.ng/services/",
        },
        imagePosition: "full",
      },
      {
        type: "text",
        id: "leadership",
        heading: "Leadership as proof",
        body: [
          "Seun Oluyemi's bio is detailed and specific. Not 'award-winning producer' but '100 Most Influential Young Nigerians in 2018.' Not 'extensive experience' but '20+ years producing for brands and agencies.' Not 'TV work' but 'Senior Producer for Rubbin'Minds on Channels TV, co-owner of the YNaija platform.'",
          "Specific credentials build trust faster than generic marketing copy. A prospective client reading 'produced #WithChude, The 21 Diaries on Africa Magic, eXploring on ONTV, Videowheels on TVC' knows exactly what caliber of production they're dealing with.",
        ],
      },
      {
        type: "image",
        id: "detail-break-2",
        src: "/screenshots/case-studies/cedar-rush/desktop-about.webp",
        alt: "Cedar Rush about page",
        parallax: true,
        link: "https://cedarrush.ng/about-us/",
      },
      {
        type: "text",
        id: "performance",
        heading: "Heavy imagery, fast load",
        body: [
          "A media production company's site is image and video heavy by definition. We implemented WebP conversion, responsive srcsets, lazy-loading, and a CDN with edge caching. Video content uses placeholder thumbnails that load the full video on click, keeping initial page weight low.",
        ],
      },
      {
        type: "text",
        id: "process",
        heading: "Three weeks to launch",
        body: [
          "Week one was the content architecture: leadership bio, service line breakdowns, and the inquiry flow. Week two was the homepage, about, and services pages. Week three was performance optimization, image pipeline, and SEO setup.",
        ],
      },
      {
        type: "gallery",
        id: "gallery",
        columns: 3,
        images: [
          { src: "/screenshots/case-studies/cedar-rush/mobile-home.webp", alt: "Cedar Rush mobile homepage", caption: "Mobile home", link: "https://cedarrush.ng/" },
          { src: "/screenshots/case-studies/cedar-rush/mobile-about.webp", alt: "Cedar Rush mobile about", caption: "Mobile about", link: "https://cedarrush.ng/about-us/" },
          { src: "/screenshots/case-studies/cedar-rush/mobile-services.webp", alt: "Cedar Rush mobile services", caption: "Mobile services", link: "https://cedarrush.ng/services/" },
        ],
      },
      {
        type: "stats",
        id: "results",
        heading: "Measurable outcomes",
        stats: [
          { value: "20+", label: "Years of experience", sublabel: "creative architect track record" },
          { value: "4", label: "Service lines", sublabel: "event, TV, commercials, strategy" },
          { value: "<2s", label: "Mobile load time", sublabel: "despite image-heavy content" },
          { value: "3 weeks", label: "Build time", sublabel: "kickoff to launch" },
        ],
      },
      {
        type: "quote",
        id: "closing",
        text: "A media production company's site needs to feel premium without making visitors wait for it. Every decision balanced visual richness against load time, and the result is a site that loads fast despite heavy imagery.",
      },
    ],
    nextSlug: "elin-group",
  },
`;

    d = d.substring(0, arrayEndIdx) + newCaseStudies + '\n' + d.substring(arrayEndIdx);
    console.log('  ok added 3 new case studies (diamond-source, designed-spaces, cedar-rush)');
  }

  fs.writeFileSync(DATA_FILE, d, 'utf8');
}

// ─────────────────────────────────────────────────────────────
// 3. Update CASE_STUDY_SLUGS in page.tsx
// ─────────────────────────────────────────────────────────────
let p = fs.readFileSync(PAGE_FILE, 'utf8');
fs.writeFileSync(PAGE_FILE + '.v7.bak', p, 'utf8');

const oldSlugs = 'const CASE_STUDY_SLUGS = ["elin-air", "elin-group", "mediapool", "clayton-prints", "evan-micky", "atomdsn"];';
const newSlugs = 'const CASE_STUDY_SLUGS = ["elin-air", "elin-group", "mediapool", "clayton-prints", "evan-micky", "atomdsn", "diamond-source", "designed-spaces", "cedar-rush"];';

if (p.includes(oldSlugs)) {
  p = p.replace(oldSlugs, newSlugs);
  console.log('  ok added 3 new slugs to CASE_STUDY_SLUGS');
} else if (p.includes('diamond-source')) {
  console.log('  - CASE_STUDY_SLUGS already includes new slugs');
} else {
  console.log('  ! could not find CASE_STUDY_SLUGS to update');
}

fs.writeFileSync(PAGE_FILE, p, 'utf8');

console.log('\n=== Done ===');
console.log('Test: npm run dev');
console.log('Visit:');
console.log('  /projects/diamond-source');
console.log('  /projects/designed-spaces');
console.log('  /projects/cedar-rush');
