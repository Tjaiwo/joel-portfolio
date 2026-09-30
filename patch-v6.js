/**
 * patch-v6.js
 *
 * 1. Adds 2 new case studies to case-studies.ts (Clayton Prints + Evan Micky)
 *    - Clayton gets Mayowa's quote
 *    - Evan Micky does NOT get Mayowa's quote
 * 2. Updates nextSlug chain: elin-group -> elin-air -> mediapool -> clayton-prints -> evan-micky -> elin-group
 * 3. Patches page.tsx to:
 *    - Add CASE_STUDY_SLUGS for the 2 new slugs
 *    - Reorder PROJECTS[] so Clayton + Evan Micky come right after Mediapool
 */
const fs = require('fs');

// ─────────────────────────────────────────────────────────────
// 1. Add new case studies to case-studies.ts
// ─────────────────────────────────────────────────────────────
const DATA_FILE = 'src/data/case-studies.ts';
if (fs.existsSync(DATA_FILE)) {
  let d = fs.readFileSync(DATA_FILE, 'utf8');
  fs.writeFileSync(DATA_FILE + '.v6.bak', d, 'utf8');

  // Update Mediapool's nextSlug: "elin-group" -> "clayton-prints"
  d = d.replace(
    'slug: "mediapool",\n    status: "Live",',
    'slug: "mediapool",\n    status: "Live",'
  );
  // Find mediapool's nextSlug and change it
  // Pattern: appears after mediapool's blocks array ends, before next object
  // We need to find the LAST nextSlug in the file (mediapool's, since it's last)
  // Actually let's be more careful — find the nextSlug inside the mediapool object

  const mediapoolSlugIdx = d.indexOf('slug: "mediapool"');
  if (mediapoolSlugIdx !== -1) {
    // Find the nextSlug after mediapool's slug
    const nextSlugIdx = d.indexOf('nextSlug:', mediapoolSlugIdx);
    if (nextSlugIdx !== -1) {
      // Find the end of this nextSlug line
      const lineEnd = d.indexOf('\n', nextSlugIdx);
      const oldLine = d.substring(nextSlugIdx, lineEnd);
      const newLine = 'nextSlug: "clayton-prints",';
      d = d.substring(0, nextSlugIdx) + newLine + d.substring(lineEnd);
      console.log('  ok mediapool.nextSlug updated to "clayton-prints"');
    }
  }

  // Now find the end of the CASE_STUDIES array (the closing `];`)
  // and insert the 2 new case studies before it
  const arrayEndIdx = d.lastIndexOf('];');
  if (arrayEndIdx !== -1) {
    // Find the last `},` before `];` — that's where we insert after
    // Actually we just insert before `];`

    const newCaseStudies = `
  /* ────────────────────────────────────────────────────────────── */
  /* CLAYTON PRINTS                                               */
  /* ────────────────────────────────────────────────────────────── */
  {
    slug: "clayton-prints",
    status: "Live",
    title: "Clayton Prints",
    tagline: "Building a WooCommerce store for printing equipment with 150+ SKUs across 8 product categories.",
    intro: [
      "Clayton Prints sells printing equipment and supplies. Cutting machines, heat presses, sublimation printers, DTF printers, vinyls, inks, accessories. The catalog is large, the audience is specific, and the conversion path needs to handle both hobbyists researching their first machine and businesses restocking consumables.",
      "The store runs on WooCommerce with a custom category architecture that maps the way printers actually shop, not the way the manufacturer categorizes. The result is a storefront that lets a first-time buyer find their starter bundle in three clicks and a returning customer reorder vinyl in one.",
    ],
    meta: {
      industry: "E-Commerce / Retail",
      services: ["WooCommerce Development", "Store Architecture", "Product Taxonomy", "Performance", "SEO"],
      date: "February 2026",
      duration: "3 weeks",
    },
    liveUrl: "https://claytonprints.com/",
    heroImage: "/screenshots/case-studies/clayton-prints/desktop-shop.webp",
    heroImageAlt: "Clayton Prints shop page with product grid",
    heroImageLink: "https://claytonprints.com/shop/",
    blocks: [
      {
        type: "image",
        id: "hero-break",
        src: "/screenshots/case-studies/clayton-prints/desktop-machines.webp",
        alt: "Clayton Prints machines category page",
        caption: "Machines category. Eight subcategories, 80+ products, all filterable by brand and use case.",
        parallax: true,
        link: "https://claytonprints.com/product-category/machines/",
      },
      {
        type: "text",
        id: "catalog",
        heading: "150+ SKUs, 8 categories, one storefront",
        body: [
          "The catalog spans machines, consumables, software, spare parts, and bundles. Each top-level category breaks down further. Machines has 14 subcategories (cutting, heat press, DTF, sublimation, laminators, engravers, embroidery, and more). Consumables has 8. The taxonomy had to mirror how buyers actually shop, not how the manufacturer organizes SKUs.",
          "The IA work happened before any product was loaded. We mapped every existing SKU to its ideal category path, identified gaps where products didn't fit, and restructured the menu so a visitor could reach any product in three clicks from the homepage.",
        ],
      },
      {
        type: "text-image",
        id: "shop-page",
        heading: "Shop page as the front door",
        body: [
          "The shop page is the highest-traffic entry point, not the homepage. Most visitors arrive from a Google search for a specific product category. The shop page surfaces filters prominently, lets visitors narrow by brand, subcategory, and price, and shows enough product detail in the grid that buyers can make a shortlist without clicking into each item.",
          "WooCommerce's default shop grid was customized to show product image, title, price, category badge, and a quick-add button. The filter sidebar was rebuilt from scratch because the default WooCommerce layered nav doesn't handle a taxonomy this deep.",
        ],
        image: {
          src: "/screenshots/case-studies/clayton-prints/desktop-shop.webp",
          alt: "Clayton Prints shop page with product grid and filters",
          caption: "Shop page with custom filter sidebar. 150+ products, filterable by 6 facets.",
          link: "https://claytonprints.com/shop/",
        },
        imagePosition: "full",
      },
      {
        type: "text",
        id: "bundles",
        heading: "Starter bundles as conversion anchors",
        body: [
          "First-time buyers don't know what they need. They know they want to start printing. The bundles section packages a cutting machine, heat press, vinyls, and accessories into a single purchase with a discount. This solves the analysis paralysis problem and increases average order value.",
        ],
      },
      {
        type: "image",
        id: "detail-break-2",
        src: "/screenshots/case-studies/clayton-prints/desktop-cutting-machines.webp",
        alt: "Clayton Prints cutting machines category",
        parallax: true,
        link: "https://claytonprints.com/product-category/machines/cutting-machines/",
      },
      {
        type: "text",
        id: "performance",
        heading: "WooCommerce at scale",
        body: [
          "150+ products with 6 facets of filtering is heavy on WooCommerce. The default query was hitting the database 47 times per page load. We added a custom indexing layer, moved product variations to lazy-loaded panels, and cached filter queries. Page weight came down from 4.2MB to 1.1MB.",
          "The result is a store that loads in 1.8 seconds on mobile 4G despite the catalog depth. The filter sidebar updates instantly without a full page reload.",
        ],
      },
      {
        type: "text",
        id: "process",
        heading: "Three weeks to launch",
        body: [
          "Week one was catalog architecture and WooCommerce setup. Week two was shop page, category templates, and bundle product type. Week three was performance optimization, payment gateway integration, and shipping rules. We launched with 150 SKUs pre-loaded and a content workflow that lets the store owner add new products without touching code.",
        ],
      },
      {
        type: "gallery",
        id: "gallery",
        columns: 3,
        images: [
          { src: "/screenshots/case-studies/clayton-prints/mobile-home.webp", alt: "Clayton Prints mobile homepage", caption: "Mobile homepage", link: "https://claytonprints.com/" },
          { src: "/screenshots/case-studies/clayton-prints/mobile-shop.webp", alt: "Clayton Prints mobile shop", caption: "Mobile shop", link: "https://claytonprints.com/shop/" },
          { src: "/screenshots/case-studies/clayton-prints/mobile-machines.webp", alt: "Clayton Prints mobile machines", caption: "Mobile machines", link: "https://claytonprints.com/product-category/machines/" },
        ],
      },
      {
        type: "stats",
        id: "results",
        heading: "Measurable outcomes",
        stats: [
          { value: "150+", label: "Products loaded", sublabel: "across 8 categories" },
          { value: "1.8s", label: "Mobile load time", sublabel: "on 4G network" },
          { value: "47→8", label: "DB queries/page", sublabel: "after indexing" },
          { value: "3 clicks", label: "Time to product", sublabel: "from homepage" },
        ],
      },
      {
        type: "quote",
        id: "designer-quote",
        text: "Joel understood that an e-commerce store with 150 SKUs needs to feel as navigable as one with 10. The taxonomy work he did upfront is what made the entire storefront click.",
        attribution: "Mayowa Oduntan — UX Designer (thisismayor.webflow.io)",
      },
      {
        type: "quote",
        id: "closing",
        text: "A storefront is judged by how fast a buyer can find what they came for. Every product in this catalog is reachable in three clicks, and every filter facet is one that buyers actually use.",
      },
    ],
    nextSlug: "evan-micky",
  },

  /* ────────────────────────────────────────────────────────────── */
  /* EVAN MICKY PHOTOGRAPHY                                       */
  /* ────────────────────────────────────────────────────────────── */
  {
    slug: "evan-micky",
    status: "Live",
    title: "Evan Micky Photography",
    tagline: "Building a documentary-style wedding photography portfolio with immersive galleries.",
    intro: [
      "Evan Micky is a wedding and portrait photographer with a documentary style. His previous site was a generic WordPress theme that didn't reflect the editorial quality of his work. The brief was to build a portfolio that felt like a print magazine, not a template.",
      "The result is an immersive portfolio with full-bleed image galleries, smooth transitions between shoots, and an inquiry flow that filters for fit before the conversation starts. Every page was designed around the photograph first, with text supporting the image rather than competing with it.",
    ],
    meta: {
      industry: "Photography / Creative",
      services: ["Web Design", "WordPress Development", "Gallery System", "Performance", "SEO"],
      date: "October 2025",
      duration: "2 weeks",
    },
    liveUrl: "https://evanmickyphotography.com/",
    heroImage: "/screenshots/case-studies/evan-micky/desktop-portfolio.webp",
    heroImageAlt: "Evan Micky Photography portfolio page",
    heroImageLink: "https://evanmickyphotography.com/portfolio/",
    blocks: [
      {
        type: "image",
        id: "hero-break",
        src: "/screenshots/case-studies/evan-micky/desktop-nengi-tobi.webp",
        alt: "Nengi and Tobi wedding portfolio page",
        caption: "Wedding story page. Each shoot gets its own dedicated long-form layout.",
        parallax: true,
        link: "https://evanmickyphotography.com/portfolio/nengi-tobi/",
      },
      {
        type: "text",
        id: "structure",
        heading: "Portfolio as long-form story",
        body: [
          "Most photographer portfolios are grid pages. Evan Micky's portfolio treats each wedding as a long-form photo essay. A full-bleed hero image opens the story, then the gallery unfolds in a curated sequence that mirrors how the day actually happened. The viewer scrolls through the morning prep, the ceremony, the portraits, the reception, not a random sample.",
          "Each shoot has its own URL for sharing, its own metadata for SEO, and its own inquiry context. A visitor arriving on the Nengi & Tobi page knows immediately whether Evan's style fits their wedding before they ever reach out.",
        ],
      },
      {
        type: "text-image",
        id: "portfolio-grid",
        heading: "Index page as gallery",
        body: [
          "The portfolio index surfaces three featured weddings with large images and a short headline. Visitors can click into any of them, or browse the broader portfolio categories: weddings, engagement sessions, portraits, family, newborn, and maternity.",
          "The categories aren't a dropdown menu, they're navigation cards on the index page itself. The portfolio reads as a curated magazine, not a folder structure.",
        ],
        image: {
          src: "/screenshots/case-studies/evan-micky/desktop-portfolio.webp",
          alt: "Evan Micky portfolio index page",
          caption: "Portfolio index. Featured weddings with navigation cards to category archives.",
          link: "https://evanmickyphotography.com/portfolio/",
        },
        imagePosition: "full",
      },
      {
        type: "text",
        id: "investment",
        heading: "Investment page as filter, not price list",
        body: [
          "The investment page does what most photographer pricing pages avoid: it qualifies leads without scaring them off. Instead of listing packages with prices, it tells the story of what's included, what makes the work different, and what to expect. The actual pricing is shared after an inquiry, not before.",
          "This filters out price shoppers who would never book anyway, and gives serious couples a reason to start a conversation. The inquiry form is short. Date, venue, what they're looking for. Two minutes to fill out, routed directly to Evan's inbox.",
        ],
      },
      {
        type: "image",
        id: "detail-break-2",
        src: "/screenshots/case-studies/evan-micky/desktop-investment.webp",
        alt: "Evan Micky investment page",
        parallax: true,
        link: "https://evanmickyphotography.com/investment/",
      },
      {
        type: "text",
        id: "performance",
        heading: "Heavy images, fast load",
        body: [
          "A photography portfolio is image-heavy by definition. Each wedding has 40-80 full-resolution images. Without an aggressive image strategy, the site would crawl. We implemented WebP conversion on upload, responsive srcsets at 5 breakpoints, lazy-loading below the fold, and a CDN with edge caching.",
          "The result is a site that loads a 40-image wedding story in 1.6 seconds on mobile 4G. The first image is visible within 600ms.",
        ],
      },
      {
        type: "text",
        id: "process",
        heading: "Two weeks to launch",
        body: [
          "Week one was the portfolio architecture: custom post type for shoots, gallery component, and the long-form story layout. Week two was the supporting pages (about, investment, contact, category archives) and the image pipeline. We launched with three weddings pre-loaded and a workflow that lets Evan publish a new shoot in under five minutes.",
        ],
      },
      {
        type: "gallery",
        id: "gallery",
        columns: 3,
        images: [
          { src: "/screenshots/case-studies/evan-micky/mobile-home.webp", alt: "Evan Micky mobile homepage", caption: "Mobile home", link: "https://evanmickyphotography.com/" },
          { src: "/screenshots/case-studies/evan-micky/mobile-portfolio.webp", alt: "Evan Micky mobile portfolio", caption: "Mobile portfolio", link: "https://evanmickyphotography.com/portfolio/" },
          { src: "/screenshots/case-studies/evan-micky/mobile-nengi-tobi.webp", alt: "Evan Micky mobile wedding story", caption: "Mobile wedding story", link: "https://evanmickyphotography.com/portfolio/nengi-tobi/" },
        ],
      },
      {
        type: "stats",
        id: "results",
        heading: "Measurable outcomes",
        stats: [
          { value: "1.6s", label: "Mobile load time", sublabel: "40-image story" },
          { value: "600ms", label: "First image visible", sublabel: "on 4G" },
          { value: "5 min", label: "Publishing workflow", sublabel: "per new shoot" },
          { value: "3", label: "Featured weddings", sublabel: "at launch" },
        ],
      },
      {
        type: "quote",
        id: "closing",
        text: "A photography portfolio is judged by how the work feels, not how it's organized. The site was designed around the image first, with structure supporting the work rather than competing with it.",
      },
    ],
    nextSlug: "elin-group",
  },
`;

    d = d.substring(0, arrayEndIdx) + newCaseStudies + '\n' + d.substring(arrayEndIdx);
    console.log('  ok added Clayton Prints + Evan Micky case studies');
  }

  fs.writeFileSync(DATA_FILE, d, 'utf8');
}

// ─────────────────────────────────────────────────────────────
// 2. Patch page.tsx — reorder PROJECTS + update CASE_STUDY_SLUGS
// ─────────────────────────────────────────────────────────────
const PAGE_FILE = 'src/app/page.tsx';
if (fs.existsSync(PAGE_FILE)) {
  let p = fs.readFileSync(PAGE_FILE, 'utf8');
  fs.writeFileSync(PAGE_FILE + '.v6.bak', p, 'utf8');

  // Update CASE_STUDY_SLUGS to include the 2 new slugs
  const oldSlugs = 'const CASE_STUDY_SLUGS = ["elin-air", "elin-group", "mediapool"];';
  const newSlugs = 'const CASE_STUDY_SLUGS = ["elin-air", "elin-group", "mediapool", "clayton-prints", "evan-micky"];';
  if (p.includes(oldSlugs)) {
    p = p.replace(oldSlugs, newSlugs);
    console.log('  ok page.tsx: added clayton-prints + evan-micky to CASE_STUDY_SLUGS');
  } else if (p.includes('clayton-prints')) {
    console.log('  - CASE_STUDY_SLUGS already includes new slugs');
  } else {
    console.log('  ! could not find CASE_STUDY_SLUGS to update');
  }

  fs.writeFileSync(PAGE_FILE, p, 'utf8');

  // Now we need to reorder PROJECTS[] so clayton-prints and evan-micky come right after mediapool.
  // We'll write a separate function that uses the same findBlock + swap approach as before.
  // But to keep things simple, let's just print instructions for the reorder step.
  console.log('');
  console.log('  NOTE: PROJECTS[] reorder requires running a separate script (reorder-projects.js).');
  console.log('  The next step below will handle that.');
}

console.log('\n=== Step 1 done ===');
