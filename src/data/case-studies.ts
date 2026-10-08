export type CaseStudyBlock =
  | { type: "text"; id: string; heading: string; body: string[]; }
  | { type: "text-image"; id: string; heading: string; body: string[]; image: { src: string; alt: string; caption?: string; link?: string }; imagePosition?: "right" | "left" | "full"; }
  | { type: "image"; id: string; src: string; alt: string; caption?: string; parallax?: boolean; link?: string; }
  | { type: "gallery"; id: string; images: { src: string; alt: string; caption?: string; link?: string }[]; columns?: 2 | 3; }
  | { type: "quote"; id: string; text: string; attribution?: string; }
  | { type: "stats"; id: string; heading?: string; stats: { value: string; label: string; sublabel?: string }[]; };

export type CaseStudy = {
  slug: string;
  status: "Live" | "In Progress" | "Archived";
  title: string;
  tagline: string;
  intro: string[];
  meta: { industry: string; services: string[]; date: string; duration: string; };
  liveUrl: string;
  heroImage: string;
  heroImageLink?: string;
  heroImageAlt: string;
  blocks: CaseStudyBlock[];
  resultsFootnote?: string;
  nextSlug: string | null;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "livewithlatasha",
    status: "Live",
    title: "Live With Latasha",
    tagline: "Building a high-performance digital platform for a leading media and communications strategist.",
    intro: [
      "Live With Latasha is a strategy, media, communications, and advisory platform built at the intersection of culture, influence, and impact. Working with brands like The Glenlivet, Konga, and AFRIFF, the platform needed a digital presence that matched the caliber of the rooms she operates in.",
      "The brief was straightforward: build a site that feels premium, loads instantly, and allows her team to publish editorial content without touching code. The solution was a headless architecture that decoupled the content management from the presentation layer.",
    ],
    meta: {
      industry: "Media & PR",
      services: ["Headless Architecture", "Astro", "GSAP Animations", "WordPress CMS"],
      date: "October 2026",
      duration: "4 weeks",
    },
    liveUrl: "https://livewithlatasha.com/",
    heroImage: "/screenshots/case-studies/livewithlatasha/desktop-home.webp",
    heroImageAlt: "Live With Latasha homepage hero",
    heroImageLink: "https://livewithlatasha.com/",
    blocks: [
      {
        type: "image",
        id: "hero-break",
        src: "/screenshots/case-studies/livewithlatasha/desktop-about.webp",
        alt: "Live With Latasha about page",
        caption: "About page. Ideas that shape culture, strategies that move brands.",
        parallax: true,
        link: "https://livewithlatasha.com/about/",
      },
      {
        type: "text",
        id: "architecture",
        heading: "The best of both worlds",
        body: [
          "Most premium sites face a tradeoff: use a heavy CMS and sacrifice speed, or build a static site and sacrifice editorial control. We chose neither. The frontend is built in Astro, delivering lightning-fast static HTML, while the client manages all content through a familiar WordPress dashboard.",
          "When a new piece of content is published, a Cloudflare deploy hook triggers a build. The site fetches the latest data via REST API and generates a fresh static version. The visitor gets the speed of a static site; the client gets the power of WordPress.",
        ],
      },
      {
        type: "text-image",
        id: "editorial",
        heading: "The Latasha Index",
        body: [
          "A core requirement was a space for thought leadership on culture, media, and influence. The Latasha Index serves as an editorial journal where her team can seamlessly draft, categorize, and publish long-form perspectives.",
          "Because the backend is purely a content store, the CMS never worries about how the content looks. It simply passes structured data to the Astro frontend, which renders it beautifully according to the global design system.",
        ],
        image: {
          src: "/screenshots/case-studies/livewithlatasha/desktop-services.webp",
          alt: "Live With Latasha services page",
          caption: "Services page. Five distinct practice areas, filterable and scannable.",
          link: "https://livewithlatasha.com/services/",
        },
        imagePosition: "full",
      },
      {
        type: "text",
        id: "performance",
        heading: "Animation without the weight",
        body: [
          "To achieve a high-end editorial feel, we integrated GSAP for ScrollSmoother and ScrollTrigger effects. But unlike traditional sites where animations cause layout shifts and heavy payload penalties, this site renders a zero-JavaScript baseline.",
          "The animations run strictly in the browser on top of a static foundation, resulting in butter-smooth scrolling and reveals that never interfere with the initial page load speed.",
        ],
      },
      {
        type: "gallery",
        id: "gallery",
        columns: 3,
        images: [
          { src: "/screenshots/case-studies/livewithlatasha/mobile-home.webp", alt: "Mobile homepage", caption: "Mobile home", link: "https://livewithlatasha.com/" },
          { src: "/screenshots/case-studies/livewithlatasha/mobile-about.webp", alt: "Mobile about page", caption: "Mobile about", link: "https://livewithlatasha.com/about/" },
          { src: "/screenshots/case-studies/livewithlatasha/mobile-services.webp", alt: "Mobile services page", caption: "Mobile services", link: "https://livewithlatasha.com/services/" },
        ],
      },
      {
        type: "quote",
        id: "closing",
        text: "The real success of a headless build isn't the technology stack. It's giving the client a platform that feels effortless to manage on the backend while delivering an uncompromising, premium experience on the frontend.",
      },
    ],
    nextSlug: "elin-group",
  },
  {
    slug: "elin-group",
    status: "Live",
    title: "Elin Group",
    tagline: "Branding and digital architecture for a diversified African industrial platform.",
    intro: [
      "Elin Group operates seven subsidiaries across six sectors. Energy, aviation, mining, construction, real estate, and power. Each business has its own leadership, services, target audience, and brand voice.",
      "The brief was to build one corporate website that could hold all seven businesses without flattening any of them. The result is a hub-and-spoke architecture with a shared design system that lets each subsidiary tell its own story while keeping the parent platform coherent.",
    ],
    meta: {
      industry: "Industrial Conglomerate",
      services: ["Web Design", "WordPress Development", "Information Architecture", "SEO", "Design System"],
      date: "August 2026",
      duration: "4 weeks",
    },
    liveUrl: "https://elin-group.com/",
    heroImage: "/screenshots/case-studies/elin-group/desktop-businesses.webp",
    heroImageLink: "https://elin-group.com/businesses/",
    heroImageAlt: "Elin Group businesses directory with subsidiary cards",
    blocks: [
      { type: "image", id: "hero-break", src: "/screenshots/case-studies/elin-group/desktop-oil-gas.webp", alt: "Elin Oil and Gas Services subsidiary landing page", caption: "Elin Oil and Gas Services subsidiary page. One of seven dedicated subsidiary landing pages.", parallax: true },
      { type: "text", id: "platform", heading: "Seven businesses, one platform", body: [
        "The trap with multi-business corporate sites is that they either become a confusing directory, where every subsidiary fights for attention on the homepage, or a flattening brochure, where every subsidiary gets the same generic treatment. Neither serves the audience. Investors want clarity, prospective employees want depth, and existing clients want quick access to the specific business they work with.",
        "The hub-and-spoke architecture gives each subsidiary its own landing page with a shared design system. Typography, color tokens, layout grid, navigation. But each subsidiary gets full control over its own hero imagery, content sections, and call-to-action.",
      ]},
      { type: "text-image", id: "architecture", heading: "Hub-and-spoke architecture", body: [
        "The corporate homepage acts as the entry point, with a clear directory of subsidiaries that each link out to a dedicated landing page. Visitors scanning the homepage see a unified industrial platform with the same visual language and quality bar.",
        "Clicking into any subsidiary feels like landing on a purpose-built site for that business. Shared elements like leadership, sustainability, and careers sit at the corporate level so they stay consistent across all seven spokes.",
      ], image: { src: "/screenshots/case-studies/elin-group/desktop-businesses.webp", alt: "Elin Group businesses directory with sector cards", caption: "Businesses directory. Each card links to a dedicated subsidiary site.", link: "https://elin-group.com/businesses/" }, imagePosition: "full" },
      { type: "text", id: "content-model", heading: "Custom post type for subsidiaries", body: [
        "A custom post type with fields for sector, services, leadership team, and contact routing means adding a new business later won't require touching the layout. The discipline paid off. Adding an eighth subsidiary would take less than a day of content work, no code changes required.",
      ]},
      { type: "image", id: "detail-break-2", src: "/screenshots/case-studies/elin-group/desktop-leadership.webp", alt: "Elin Group leadership team page", parallax: true },
      { type: "text", id: "seo", heading: "Schema markup for industrial groups", body: [
        "Each subsidiary could rank for its own branded terms while passing authority up to the parent domain. Schema markup for Organization and SubOrganization relationships was set up so search engines understood the corporate hierarchy from day one.",
      ]},
      { type: "text", id: "process", heading: "Five weeks, seven launches", body: [
        "Week one was information architecture. Weeks two and three were the corporate-level build. Week four was the subsidiary template plus three subsidiary pages populated with real content. Week five was the remaining four subsidiaries, performance pass, and SEO setup.",
        "Going live with all seven at once meant the template had to be designed once and resist the urge to over-customize per business. The discipline is what made the project scale.",
      ]},
      { type: "gallery", id: "gallery", columns: 3, images: [
        { src: "/screenshots/case-studies/elin-group/mobile-businesses.webp", alt: "Elin Group businesses directory on mobile", caption: "Mobile businesses directory", link: "https://elin-group.com/businesses/" },
        { src: "/screenshots/case-studies/elin-group/mobile-about.webp", alt: "Elin Group about page on mobile", caption: "Mobile about page", link: "https://elin-group.com/about/" },
        { src: "/screenshots/case-studies/elin-group/mobile-oil-gas.webp", alt: "Elin Oil and Gas subsidiary on mobile", caption: "Mobile subsidiary page", link: "https://elin-group.com/businesses/elin-oil-and-gas-services/" },
      ]},
      { type: "stats", id: "results", heading: "Measurable outcomes", stats: [
        { value: "99", label: "PageSpeed desktop", sublabel: "audited Sept 2026" },
        { value: "98", label: "PageSpeed mobile", sublabel: "up from 38" },
        { value: "0.6s", label: "LCP desktop", sublabel: "0 CLS, 0ms TBT" },
        { value: "+40%", label: "Organic traffic", sublabel: "in 3 months" },
      ]},
      { type: "quote", id: "designer-quote", text: "Seven businesses in five weeks required a developer who could think in systems. Joel built the architecture that let each subsidiary tell its own story while keeping the parent platform coherent.", attribution: "Mayowa Oduntan — UX Designer (thisismayor.webflow.io)" },
      { type: "quote", id: "closing", text: "The platform gave Elin Group a foundation to communicate as a unified industrial group, critical for investor conversations and partnership discussions where perception of scale matters as much as the actual business footprint." },
    ],
    nextSlug: "elin-air",
  },
  {
    slug: "elin-air",
    status: "Live",
    title: "Elin Air",
    tagline: "Building a private aviation brand's digital front door for direct bookings.",
    intro: [
      "Elin Air is a full-service aviation company offering private jet charter, helicopter services, air cargo logistics, FBO operations, and MRO services. Their previous site looked decent, but it didn't convert visitors into charter requests and it didn't feel like the premium service it was supposed to represent.",
      "Working alongside designer Mayowa Oduntan, I built the production WordPress implementation of her redesign. The goal was to give Elin Air a digital presence that built trust, showcased the fleet, and let prospective clients move from interest to inquiry in under three clicks.",
    ],
    meta: {
      industry: "Aviation & Logistics",
      services: ["Web Development", "WordPress", "Performance Engineering", "SEO", "Booking System"],
      date: "March 2026",
      duration: "3 weeks",
    },
    liveUrl: "https://flyelinair.com/",
    heroImage: "/screenshots/case-studies/elin-air/desktop-fleet.webp",
    heroImageLink: "https://flyelinair.com/fleet/",
    heroImageAlt: "Elin Air fleet showcase with aircraft cards",
    blocks: [
      { type: "image", id: "hero-break", src: "/screenshots/case-studies/elin-air/desktop-fleet.webp", alt: "Elin Air fleet detail page", caption: "Fleet showcase with aircraft cards", parallax: true },
      { type: "text", id: "transformation", heading: "From brochure to booking platform", body: [
        "The legacy Elin Air site looked decent, but it didn't actually convert visitors into charter requests. Five distinct service lines were presented as a flat list of links with no clear hierarchy, and the only conversion path was a generic contact form buried two pages deep.",
        "The redesign reframed the site around visitor intent. Fly, ship, or service. Each path leads to a focused booking flow instead of a generic contact page, and the homepage gives visitors a clear next step within two clicks of arriving.",
      ]},
      { type: "text-image", id: "fleet", heading: "Fleet as a showcase", body: [
        "Each aircraft now has its own detail page with specifications, capacity, range, and interior photography. Visitors can compare aircraft side by side before submitting a charter request, which means the inquiries that do come through are better qualified and faster to close.",
        "Micro-animations on the fleet cards, smooth scroll to anchor sections, a sticky mobile CTA. Every interaction got a small detail pass, but none of it at the cost of perceived load time.",
      ], image: { src: "/screenshots/case-studies/elin-air/desktop-fleet-grid.webp", alt: "Elin Air fleet grid with aircraft cards", caption: "Each aircraft has its own detail page with specifications, capacity, range, and interior photography.", link: "https://flyelinair.com/fleet/" }, imagePosition: "full" },
      { type: "text", id: "performance", heading: "Performance as a feature", body: [
        "The legacy site loaded in 4.2 seconds on mobile, unacceptable for a brand selling premium aviation experiences. Hero imagery was re-encoded as WebP and served through Cloudflare. Plugins were audited and stripped to the four that were actually doing work.",
        "The result was a 92 mobile PageSpeed score at launch, with a 1.4 second LCP on 4G. The site feels premium without making visitors wait for it.",
      ]},
      { type: "image", id: "detail-break-2", src: "/screenshots/case-studies/elin-air/desktop-safety.webp", alt: "Elin Air safety protocol page", parallax: true },
      { type: "text", id: "booking-flow", heading: "Booking flow rebuilt", body: [
        "The old contact form was a single page with twelve fields. The new flow is multi-step. Service type, dates, passenger count, contact details. Each step takes less than 30 seconds to complete, and submission routes directly to the operations team instead of going through a general inbox.",
      ]},
      { type: "text", id: "collaboration", heading: "Three weeks, one blueprint", body: [
        "Mayowa Oduntan had already validated the homepage in Figma Site before development started, so stakeholders had seen the interactions and approved the direction. Week one was structure. Week two was visual implementation. Week three was the performance pass.",
        "We launched three days ahead of the original deadline, with the staging site scoring 92 on mobile PageSpeed before any production CDN tuning.",
      ]},
      { type: "gallery", id: "gallery", columns: 3, images: [
        { src: "/screenshots/case-studies/elin-air/mobile-fleet.webp", alt: "Elin Air fleet on mobile", caption: "Mobile charter request" },
        { src: "/screenshots/case-studies/elin-air/mobile-charter-request.webp", alt: "Elin Air charter request on mobile", caption: "Mobile fleet" },
        { src: "/screenshots/case-studies/elin-air/mobile-safety.webp", alt: "Elin Air safety protocol on mobile", caption: "Mobile safety", link: "https://flyelinair.com/help/safety-protocol" },
      ]},
      { type: "stats", id: "results", heading: "Measurable outcomes", stats: [
        { value: "92", label: "PageSpeed mobile", sublabel: "up from 41" },
        { value: "1.4s", label: "LCP on 4G", sublabel: "down from 4.2s" },
        { value: "9/10", label: "Client satisfaction", sublabel: "post-launch review" },
        { value: "3 days", label: "Ahead of deadline", sublabel: "2-week build, 11 days" },
      ]},
      { type: "quote", id: "designer-quote", text: "Working with Joel meant the redesign didn't stop at handoff. Every interaction, every micro-animation, every performance decision was preserved in the build exactly as designed. That's rare.", attribution: "Mayowa Oduntan — UX Designer (thisismayor.webflow.io)" },
      { type: "quote", id: "closing", text: "The fastest path to a happy client isn't a fancier design, it's a clearer one. Every decision was measured against the goal of reducing reliance on charter brokers by enabling direct customer acquisition." },
    ],
    resultsFootnote: "PageSpeed scores reflect launch state (March 2026). Current scores may differ due to ongoing content and feature additions.",
    nextSlug: "mediapool",
  },
  {
    slug: "mediapool",
    status: "Live",
    title: "Mediapool",
    tagline: "Building a digital storefront for a leading Nigerian media buying agency.",
    intro: [
      "Mediapool is a Lagos-based media buying and planning agency with over a decade of campaign work for major Nigerian brands including Renmoney, Zedvance, CrusaderSterling Pensions, and Mixta Africa. Their existing site was dated, slow, and didn't do justice to the caliber of the work they were shipping for clients.",
      "This was a fresh build, not a redesign. I architected the site around the agency's campaign portfolio, with a campaign-first content structure that puts client work front and center and makes the case for Mediapool's expertise before a single word of marketing copy is read.",
    ],
    meta: {
      industry: "Media & Advertising",
      services: ["Web Design", "WordPress Development", "Content Architecture", "SEO", "Performance"],
      date: "April 2025",
      duration: "2 weeks",
    },
    liveUrl: "https://mediapool.ng/",
    heroImage: "/screenshots/case-studies/mediapool/desktop-works.webp",
    heroImageLink: "https://mediapool.ng/works/",
    heroImageAlt: "Mediapool campaign portfolio with the tagline Our work swims for itself",
    blocks: [
      { type: "image", id: "hero-break", src: "/screenshots/case-studies/mediapool/desktop-renmoney.webp", alt: "Renmoney campaign case study with branded bus advertisement", caption: "Renmoney campaign detail. Out-of-home advertising for the finance sector.", parallax: true },
      { type: "text", id: "structure", heading: "Campaign-first, not services-first", body: [
        "The typical agency site leads with services and buries the portfolio three sections down. Mediapool's homepage opens with the client roster, immediately followed by a campaign grid that visitors can filter by client and medium. Services get a single clean section further down, treated as support material rather than the main event.",
        "For a media agency whose entire value proposition is making other brands look good online, the proof of competence is the work itself. Burying the work behind marketing copy would be fighting against the very thing the site is trying to sell.",
      ]},
      { type: "text-image", id: "campaign-case-studies", heading: "Campaign case studies", body: [
        "Each campaign gets its own dedicated detail page. Renmoney, Zedvance, CrusaderSterling Pensions, Mixta Africa. Every page is structured the same way: the brief, the medium, the execution, the outcome. Prospects land on a campaign that matches their industry and immediately see how Mediapool thinks.",
        "A custom post type means the agency can publish a new campaign case study without involving a developer. The campaign automatically appears on the works index, gets its own URL for sharing, and inherits the structured data needed to rank for long-tail queries like Renmoney media campaign Lagos.",
      ], image: { src: "/screenshots/case-studies/mediapool/desktop-renmoney.webp", alt: "Renmoney campaign case study page on Mediapool", caption: "Renmoney campaign case study. One of seven client-specific detail pages.", link: "https://mediapool.ng/works/renmoney/" }, imagePosition: "full" },
      { type: "text", id: "performance", heading: "Performance budget at 800KB", body: [
        "The hero uses an animated logo carousel instead of a heavy hero video. All campaign imagery is served as WebP via Cloudflare. The page weight budget was capped at 800KB on initial load, with the rest lazy-loading as the visitor scrolls.",
        "Post-launch, the site scored 93 on PageSpeed desktop and 77 on mobile. Up from 31 and 24 respectively on the legacy site.",
      ]},
      { type: "image", id: "detail-break-2", src: "/screenshots/case-studies/mediapool/desktop-services.webp", alt: "Mediapool services page with media planning, buying, and consultancy", parallax: true },
      { type: "text", id: "seo", heading: "SEO for long-tail queries", body: [
        "Individual campaign pages are structured to rank for long-tail queries like \"Renmoney media campaign Lagos\". Each campaign gets its own dedicated detail page with structured data for the brand, medium, and outcomes.",
      ]},
      { type: "text", id: "process", heading: "Four weeks to launch", body: [
        "Week one was content architecture. Weeks two and three were the homepage and template build. Week four was the campaign detail page template plus performance optimization. Within two months of launch they had added eleven new campaign entries without any development work.",
      ]},
      { type: "gallery", id: "gallery", columns: 3, images: [
        { src: "/screenshots/case-studies/mediapool/mobile-services.webp", alt: "Mediapool services on mobile", caption: "Mobile consultancy" },
        { src: "/screenshots/case-studies/mediapool/mobile-buying.webp", alt: "Mediapool media buying on mobile", caption: "Mobile media buying", link: "https://mediapool.ng/services/media-buying/" },
        { src: "/screenshots/case-studies/mediapool/mobile-consultancy.webp", alt: "Mediapool media consultancy on mobile", caption: "Mobile services" },
      ]},
      { type: "stats", id: "results", heading: "Measurable outcomes", stats: [
        { value: "93", label: "PageSpeed desktop", sublabel: "up from 31" },
        { value: "77", label: "PageSpeed mobile", sublabel: "up from 24" },
        { value: "1.0s", label: "LCP desktop", sublabel: "0 CLS, 0ms TBT" },
        { value: "2.4x", label: "Time-on-page", sublabel: "vs. legacy site" },
      ]},
      { type: "quote", id: "designer-quote", text: "The campaign portfolio isn't just a section on the site, it's the structural backbone. Joel understood that from day one and built the entire architecture around it.", attribution: "Mayowa Oduntan — UX Designer (thisismayor.webflow.io)" },
      { type: "quote", id: "closing", text: "The proof of competence is the work itself. Any site structure that buries the work behind marketing copy is fighting against the very thing it's trying to sell." },
    ],
    nextSlug: "clayton-prints",
  },

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
      date: "July 2026",
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
    nextSlug: "atomdsn",
  },


  /* ────────────────────────────────────────────────────────────── */
  /* ATOM — Experiential Design Agency                             */
  /* ────────────────────────────────────────────────────────────── */
  {
    slug: "atomdsn",
    status: "Live",
    title: "Atom",
    tagline: "Building a digital front door for a creative experiential design agency.",
    intro: [
      "Atom is a creative experiential design agency that builds brand activations, pop-up experiences, and event productions for clients including Martell, AMVCA, FMDQ, and HBO. Their previous site didn't reflect the scale or craft of the work they were shipping for major brands.",
      "I designed and built a portfolio-driven site that leads with the work itself. The result is a digital storefront that lets prospective clients see the agency's range within seconds of arriving, and a content architecture that lets the team publish new projects without involving a developer.",
    ],
    meta: {
      industry: "Creative Agency / Experiential Design",
      services: ["Web Design", "WordPress Development", "Portfolio Architecture", "Performance", "SEO"],
      date: "November 2024",
      duration: "3 weeks",
    },
    liveUrl: "https://atomdsn.com/",
    heroImage: "/screenshots/case-studies/atomdsn/desktop-home.webp",
    heroImageAlt: "Atom homepage hero with experiential design tagline",
    heroImageLink: "https://atomdsn.com/",
    blocks: [
      {
        type: "image",
        id: "hero-break",
        src: "/screenshots/case-studies/atomdsn/desktop-works.webp",
        alt: "Atom works portfolio page",
        caption: "Works portfolio. Each activation gets its own dedicated case page.",
        parallax: true,
        link: "https://atomdsn.com/works/",
      },
      {
        type: "text",
        id: "structure",
        heading: "Portfolio-first, not services-first",
        body: [
          "An experiential design agency's value proposition is the work itself. The site opens with the agency's tagline, then immediately surfaces the highlighted projects. Services get a clean section further down, treated as support material rather than the main event.",
          "The homepage uses a marquee animation to reinforce the agency's brand voice, with the tagline 'People forget words, but they\'ll never forget experiences' repeating as a visual rhythm. Each project on the homepage links to a dedicated case page with hero imagery, scope, and outcomes.",
        ],
      },
      {
        type: "text-image",
        id: "projects-architecture",
        heading: "Each project as a dedicated case page",
        body: [
          "Every work gets its own URL. Glenmorangie Brand Activation, Martell Tower, Jameson. Each work page follows the same structure: hero image, project brief, scope of work, gallery of execution photos, and outcomes. Each project page follows the same structure: hero image, project brief, scope of work, gallery of execution photos, and outcomes.",
          "The architecture means the agency can publish a new work case study without involving a developer. The work automatically appears on the works index, gets its own URL for sharing, and inherits the structured data needed to rank for branded queries.",
        ],
        image: {
          src: "/screenshots/case-studies/atomdsn/desktop-works.webp",
          alt: "Atom projects portfolio grid",
          caption: "Projects index. Filterable by client, scope, and event type.",
          link: "https://atomdsn.com/projects/",
        },
        imagePosition: "full",
      },
      {
        type: "text",
        id: "capabilities",
        heading: "Capabilities as navigation, not brochure",
        body: [
          "The agency offers ten capabilities: project/account management, brand development, strategy development, ideation/design, fabrication, animation, exhibitions, event technology integration (AR/VR), experience planning, and pop-up store designs. Each capability is a navigation card, not a paragraph of marketing copy. Visitors can scan the full range in seconds.",
        ],
      },
      {
        type: "image",
        id: "detail-break-2",
        src: "/screenshots/case-studies/atomdsn/desktop-about.webp",
        alt: "Atom about page",
        parallax: true,
        link: "https://atomdsn.com/about/",
      },
      {
        type: "text",
        id: "performance",
        heading: "Heavy imagery, fast load",
        body: [
          "An experiential design agency's site is image-heavy by definition. Each project has 20-50 high-resolution execution photos. We implemented WebP conversion on upload, responsive srcsets, lazy-loading below the fold, and a CDN with edge caching.",
          "The result is a site that loads a 30-image project case page in under 2 seconds on mobile 4G, despite the visual richness.",
        ],
      },
      {
        type: "text",
        id: "process",
        heading: "Three weeks to launch",
        body: [
          "Week one was the portfolio architecture: custom post type for projects, gallery component, and the project case page layout. Week two was the supporting pages (about, services, contact) and the marquee animation. Week three was performance optimization, image pipeline, and SEO setup. We launched with three highlighted works pre-loaded.",
        ],
      },
      {
        type: "gallery",
        id: "gallery",
        columns: 3,
        images: [
          { src: "/screenshots/case-studies/atomdsn/mobile-works.webp", alt: "Atom mobile works portfolio", caption: "Mobile works", link: "https://atomdsn.com/works/" },
          { src: "/screenshots/case-studies/atomdsn/mobile-about.webp", alt: "Atom mobile about", caption: "Mobile about", link: "https://atomdsn.com/about/" },
          { src: "/screenshots/case-studies/atomdsn/mobile-glenmorangie.webp", alt: "Atom mobile Glenmorangie case study", caption: "Mobile case study", link: "https://atomdsn.com/works/glenmorangie-brand-activation-assets/" },
        ],
      },
      {
        type: "stats",
        id: "results",
        heading: "Measurable outcomes",
        stats: [
          { value: "16", label: "Highlighted works", sublabel: "in portfolio" },
          { value: "10", label: "Capabilities surfaced", sublabel: "as navigation cards" },
          { value: "<2s", label: "Mobile load time", sublabel: "30-image case page" },
          { value: "3 weeks", label: "Build time", sublabel: "kickoff to launch" },
        ],
      },
      {
        type: "quote",
        id: "closing",
        text: "An experiential design agency's portfolio is the proof. Every decision on this site, from the architecture to the animation rhythm, was made to surface the work first and let the services copy support it.",
      },
    ],
    nextSlug: "diamond-source",
  },


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
      date: "September 2022",
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
      date: "May 2024",
      duration: "3 weeks",
    },
    liveUrl: "https://designedspacesbyyemi.com/",
    heroImage: "/screenshots/case-studies/designed-spaces/desktop-home.webp",
    heroImageAlt: "Designed Spaces by Yemi homepage hero",
    heroImageLink: "https://designedspacesbyyemi.com/",
    blocks: [
      { type: "image", id: "hero-break", src: "/screenshots/case-studies/designed-spaces/desktop-cases.webp", alt: "Designed Spaces cases portfolio", caption: "Cases portfolio. Each case gets its own detail page.", parallax: true, link: "https://designedspacesbyyemi.com/cases/" },
      { type: "text", id: "positioning", heading: "End-to-end delivery as differentiator", body: [
        "Most architecture firms position themselves as design specialists. DSY's differentiator is that they stay through the entire project lifecycle, from feasibility studies through construction handover. The site needed to communicate this without sounding like a generic full-service pitch.",
        "The homepage leads with the tagline 'We don't just design buildings. We deliver them.' The services section breaks down the full scope: feasibility studies, architectural design, consultancy, project management, and renovations. A visitor can see in 30 seconds that DSY is not just a design shop.",
      ]},
      { type: "text-image", id: "projects", heading: "Projects as proof", body: [
        "The cases portfolio showcases 12+ completed works including AG Heights, The Earl of Ilabere, NF 1, Project Indulgence, Cedar Shore, and Baylad Mews. Each case gets its own detail page with hero imagery, project brief, scope, and outcomes.",
        "The projects are categorized by type (residential, commercial, multi-family) so visitors can filter to what's relevant to their needs. A prospective residential client doesn't have to scroll through commercial work to find relevant examples.",
      ], image: { src: "/screenshots/case-studies/designed-spaces/desktop-cases.webp", alt: "Designed Spaces cases portfolio grid", caption: "Cases portfolio. 12+ completed works, filterable by type.", link: "https://designedspacesbyyemi.com/cases/" }, imagePosition: "full" },
      { type: "text", id: "services", heading: "Services as navigation, not brochure", body: [
        "The firm offers five core services: feasibility studies, architectural design, consultancy, project management, and renovations/retrofits/upgrades. Each service is a navigation card on the services page, not a paragraph of marketing copy. Visitors can scan the full range in seconds and click into any service for more detail.",
      ]},
      { type: "image", id: "detail-break-2", src: "/screenshots/case-studies/designed-spaces/desktop-about.webp", alt: "Designed Spaces about page", parallax: true, link: "https://designedspacesbyyemi.com/about-us/" },
      { type: "text", id: "performance", heading: "Heavy imagery, fast load", body: [
        "An architecture portfolio is image-heavy by definition. Each project has 10-20 high-resolution photography shots. We implemented WebP conversion, responsive srcsets, lazy-loading, and a CDN with edge caching. The result is a site that loads a 15-image project page in under 2 seconds on mobile 4G.",
      ]},
      { type: "text", id: "process", heading: "Three weeks to launch", body: [
        "Week one was the portfolio architecture: custom post type for projects, gallery component, and the project detail page layout. Week two was the supporting pages (about, services, contact) and the project filtering system. Week three was performance optimization, image pipeline, and SEO setup.",
      ]},
      { type: "gallery", id: "gallery", columns: 3, images: [
        { src: "/screenshots/case-studies/designed-spaces/mobile-home.webp", alt: "Designed Spaces mobile homepage", caption: "Mobile home", link: "https://designedspacesbyyemi.com/" },
        { src: "/screenshots/case-studies/designed-spaces/mobile-cases.webp", alt: "Designed Spaces mobile cases", caption: "Mobile cases", link: "https://designedspacesbyyemi.com/cases/" },
        { src: "/screenshots/case-studies/designed-spaces/mobile-contact.webp", alt: "Designed Spaces mobile contact", caption: "Mobile contact", link: "https://designedspacesbyyemi.com/contact/" },
      ]},
      { type: "stats", id: "results", heading: "Measurable outcomes", stats: [
        { value: "12+", label: "Projects showcased", sublabel: "completed works" },
        { value: "5", label: "Services surfaced", sublabel: "as navigation cards" },
        { value: "<2s", label: "Mobile load time", sublabel: "15-image project page" },
        { value: "3 weeks", label: "Build time", sublabel: "kickoff to launch" },
      ]},
      { type: "quote", id: "closing", text: "An architecture firm's portfolio is the proof of competence. The site was designed to surface the work first, with the full-service positioning supporting it rather than competing with it." },
    ],
    nextSlug: "cedar-rush",
  },


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
      date: "February 2026",
      duration: "3 weeks",
    },
    liveUrl: "https://cedarrush.ng/",
    heroImage: "/screenshots/case-studies/cedar-rush/desktop-home.webp",
    heroImageAlt: "Cedar Rush homepage hero",
    heroImageLink: "https://cedarrush.ng/",
    blocks: [
      { type: "image", id: "hero-break", src: "/screenshots/case-studies/cedar-rush/desktop-services.webp", alt: "Cedar Rush services page", caption: "Services page. Four core production capabilities.", parallax: true, link: "https://cedarrush.ng/services/" },
      { type: "text", id: "positioning", heading: "Premium production, not generic media", body: [
        "Cedar Rush's value proposition is precision-driven production at scale, helmed by industry veterans with a track record of global results. The homepage leads with 'We Make Moments Impossible To Ignore' and immediately positions the company as a premium production house, not a generic media agency.",
        "The site introduces Seun Oluyemi, the creative architect, with his credentials: 100 Most Influential Young Nigerians in 2018, 2019 Africa's young change-maker, 20+ years producing for brands and agencies, Senior Producer for Rubbin'Minds on Channels TV. His track record is the proof of the company's positioning.",
      ]},
      { type: "text-image", id: "services", heading: "Four core service lines", body: [
        "Cedar Rush offers four service lines: event production, TV and documentary production, commercials and brand films, and media strategy and execution. Each service gets a dedicated section with scope, examples, and a clear path to inquiry.",
        "Event production covers concerts, award shows, brand events, corporate gatherings, and cultural experiences. TV and documentary production covers broadcast specials and documentary storytelling. Commercials cover brand films and promotional content. Media strategy ensures audiences see, feel, and remember the work.",
      ], image: { src: "/screenshots/case-studies/cedar-rush/desktop-services.webp", alt: "Cedar Rush services page with four capabilities", caption: "Services page. Four core production capabilities.", link: "https://cedarrush.ng/services/" }, imagePosition: "full" },
      { type: "text", id: "leadership", heading: "Leadership as proof", body: [
        "Seun Oluyemi's bio is detailed and specific. Not 'award-winning producer' but '100 Most Influential Young Nigerians in 2018.' Not 'extensive experience' but '20+ years producing for brands and agencies.' Not 'TV work' but 'Senior Producer for Rubbin'Minds on Channels TV, co-owner of the YNaija platform.'",
        "Specific credentials build trust faster than generic marketing copy. A prospective client reading 'produced #WithChude, The 21 Diaries on Africa Magic, eXploring on ONTV, Videowheels on TVC' knows exactly what caliber of production they're dealing with.",
      ]},
      { type: "image", id: "detail-break-2", src: "/screenshots/case-studies/cedar-rush/desktop-about.webp", alt: "Cedar Rush about page", parallax: true, link: "https://cedarrush.ng/about-us/" },
      { type: "text", id: "performance", heading: "Heavy imagery, fast load", body: [
        "A media production company's site is image and video heavy by definition. We implemented WebP conversion, responsive srcsets, lazy-loading, and a CDN with edge caching. Video content uses placeholder thumbnails that load the full video on click, keeping initial page weight low.",
      ]},
      { type: "text", id: "process", heading: "Three weeks to launch", body: [
        "Week one was the content architecture: leadership bio, service line breakdowns, and the inquiry flow. Week two was the homepage, about, and services pages. Week three was performance optimization, image pipeline, and SEO setup.",
      ]},
      { type: "gallery", id: "gallery", columns: 3, images: [
        { src: "/screenshots/case-studies/cedar-rush/mobile-home.webp", alt: "Cedar Rush mobile homepage", caption: "Mobile home", link: "https://cedarrush.ng/" },
        { src: "/screenshots/case-studies/cedar-rush/mobile-about.webp", alt: "Cedar Rush mobile about", caption: "Mobile about", link: "https://cedarrush.ng/about-us/" },
        { src: "/screenshots/case-studies/cedar-rush/mobile-services.webp", alt: "Cedar Rush mobile services", caption: "Mobile services", link: "https://cedarrush.ng/services/" },
      ]},
      { type: "stats", id: "results", heading: "Measurable outcomes", stats: [
        { value: "20+", label: "Years of experience", sublabel: "creative architect track record" },
        { value: "4", label: "Service lines", sublabel: "event, TV, commercials, strategy" },
        { value: "<2s", label: "Mobile load time", sublabel: "despite image-heavy content" },
        { value: "3 weeks", label: "Build time", sublabel: "kickoff to launch" },
      ]},
      { type: "quote", id: "closing", text: "A media production company's site needs to feel premium without making visitors wait for it. Every decision balanced visual richness against load time, and the result is a site that loads fast despite heavy imagery." },
    ],
    nextSlug: "elin-group",
  },

];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((cs) => cs.slug);
}
