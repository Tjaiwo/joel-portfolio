/**
 * add-atomdsn.js
 *
 * 1. Adds atomdsn entry to PROJECTS[] in page.tsx (right after evan-micky)
 * 2. Adds atomdsn case study to case-studies.ts
 * 3. Updates CASE_STUDY_SLUGS to include atomdsn
 * 4. Updates evan-micky's nextSlug to "atomdsn"
 * 5. Sets atomdsn's nextSlug to "elin-group" (closing the loop)
 */
const fs = require('fs');

// ─────────────────────────────────────────────────────────────
// 1. Add atomdsn entry to PROJECTS[] in page.tsx
// ─────────────────────────────────────────────────────────────
const PAGE_FILE = 'src/app/page.tsx';
if (fs.existsSync(PAGE_FILE)) {
  let p = fs.readFileSync(PAGE_FILE, 'utf8');
  fs.writeFileSync(PAGE_FILE + '.atomdsn.bak', p, 'utf8');

  // Find evan-micky block in PROJECTS[], insert atomdsn block right after it
  const evanMickyNeedle = 'slug: "evan-micky"';
  const evanMickyIdx = p.indexOf(evanMickyNeedle);
  if (evanMickyIdx !== -1) {
    // Find the closing } of the evan-micky block
    let blockStart = evanMickyIdx;
    while (blockStart > 0 && p[blockStart] !== '{') blockStart--;
    let depth = 0, blockEnd = blockStart;
    for (let i = blockStart; i < p.length; i++) {
      if (p[i] === '{') depth++;
      if (p[i] === '}') { depth--; if (depth === 0) { blockEnd = i; break; } }
    }
    // Find the trailing comma + newline after the block
    let insertPos = blockEnd + 1;
    while (insertPos < p.length && /[, \t\n]/.test(p[insertPos])) insertPos++;

    const atomdsnBlock = `  {
    id: 9,
    slug: "atomdsn",
    title: "Atom",
    description:
      "A creative experiential design agency website showcasing brand activations, event design, and immersive campaign experiences for clients including Martell, AMVCA, FMDQ, and HBO — featuring a portfolio of high-impact pop-up experiences and event productions.",
    url: "https://atomdsn.com/",
    image: "/screenshots/case-studies/atomdsn/desktop-home.webp",
    tags: ["Web Design", "WordPress", "Agency", "Portfolio", "SEO"],
    results: "Portfolio showcasing 20+ experiential brand activations",
    designer: true,
  },
`;

    p = p.substring(0, insertPos) + atomdsnBlock + p.substring(insertPos);
    console.log('  ok added atomdsn entry to PROJECTS[]');
  } else {
    console.log('  - evan-micky not found in PROJECTS[], appending atomdsn at end of array');
    // Fallback: find the last `},` in PROJECTS[] and insert before the closing `];`
    const arrEnd = p.indexOf('];', p.indexOf('const PROJECTS = ['));
    if (arrEnd !== -1) {
      const atomdsnBlock = `\n  {
    id: 9,
    slug: "atomdsn",
    title: "Atom",
    description:
      "A creative experiential design agency website showcasing brand activations, event design, and immersive campaign experiences for clients including Martell, AMVCA, FMDQ, and HBO.",
    url: "https://atomdsn.com/",
    image: "/screenshots/case-studies/atomdsn/desktop-home.webp",
    tags: ["Web Design", "WordPress", "Agency", "Portfolio", "SEO"],
    results: "Portfolio showcasing 20+ experiential brand activations",
    designer: true,
  },`;
      p = p.substring(0, arrEnd) + atomdsnBlock + p.substring(arrEnd);
      console.log('  ok appended atomdsn entry to PROJECTS[]');
    }
  }

  // Update CASE_STUDY_SLUGS to include atomdsn
  const oldSlugs = 'const CASE_STUDY_SLUGS = ["elin-air", "elin-group", "mediapool", "clayton-prints", "evan-micky"];';
  const newSlugs = 'const CASE_STUDY_SLUGS = ["elin-air", "elin-group", "mediapool", "clayton-prints", "evan-micky", "atomdsn"];';
  if (p.includes(oldSlugs)) {
    p = p.replace(oldSlugs, newSlugs);
    console.log('  ok added atomdsn to CASE_STUDY_SLUGS');
  } else if (p.includes('atomdsn')) {
    console.log('  - atomdsn already in CASE_STUDY_SLUGS (or pattern changed)');
  }

  fs.writeFileSync(PAGE_FILE, p, 'utf8');
}

// ─────────────────────────────────────────────────────────────
// 2. Update evan-micky's nextSlug to "atomdsn" + add atomdsn case study
// ─────────────────────────────────────────────────────────────
const DATA_FILE = 'src/data/case-studies.ts';
if (fs.existsSync(DATA_FILE)) {
  let d = fs.readFileSync(DATA_FILE, 'utf8');
  fs.writeFileSync(DATA_FILE + '.atomdsn.bak', d, 'utf8');

  // Find evan-micky's nextSlug and change to "atomdsn"
  const evanMickySlugIdx = d.indexOf('slug: "evan-micky"');
  if (evanMickySlugIdx !== -1) {
    const nextSlugIdx = d.indexOf('nextSlug:', evanMickySlugIdx);
    if (nextSlugIdx !== -1) {
      const lineEnd = d.indexOf('\n', nextSlugIdx);
      d = d.substring(0, nextSlugIdx) + 'nextSlug: "atomdsn",' + d.substring(lineEnd);
      console.log('  ok evan-micky.nextSlug updated to "atomdsn"');
    }
  }

  // Add atomdsn case study before the closing ];
  const arrayEndIdx = d.lastIndexOf('];');
  if (arrayEndIdx !== -1) {
    const newCaseStudy = `
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
      date: "July 2026",
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
        src: "/screenshots/case-studies/atomdsn/desktop-projects.webp",
        alt: "Atom projects portfolio page",
        caption: "Projects portfolio. Each activation gets its own dedicated case page.",
        parallax: true,
        link: "https://atomdsn.com/projects/",
      },
      {
        type: "text",
        id: "structure",
        heading: "Portfolio-first, not services-first",
        body: [
          "An experiential design agency's value proposition is the work itself. The site opens with the agency's tagline, then immediately surfaces the highlighted projects. Services get a clean section further down, treated as support material rather than the main event.",
          "The homepage uses a marquee animation to reinforce the agency's brand voice, with the tagline 'People forget words, but they\\'ll never forget experiences' repeating as a visual rhythm. Each project on the homepage links to a dedicated case page with hero imagery, scope, and outcomes.",
        ],
      },
      {
        type: "text-image",
        id: "projects-architecture",
        heading: "Each project as a dedicated case page",
        body: [
          "Every project gets its own URL. Martell Towers, AMVCA 10th Edition, FMDQ Gold Awards, HBO's The White Lotus Premiere. Each project page follows the same structure: hero image, project brief, scope of work, gallery of execution photos, and outcomes.",
          "The architecture means the agency can publish a new project case study without involving a developer. The project automatically appears on the portfolio index, gets its own URL for sharing, and inherits the structured data needed to rank for branded queries.",
        ],
        image: {
          src: "/screenshots/case-studies/atomdsn/desktop-projects.webp",
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
          "Week one was the portfolio architecture: custom post type for projects, gallery component, and the project case page layout. Week two was the supporting pages (about, services, contact) and the marquee animation. Week three was performance optimization, image pipeline, and SEO setup. We launched with four highlighted projects pre-loaded.",
        ],
      },
      {
        type: "gallery",
        id: "gallery",
        columns: 3,
        images: [
          { src: "/screenshots/case-studies/atomdsn/mobile-home.webp", alt: "Atom mobile homepage", caption: "Mobile home", link: "https://atomdsn.com/" },
          { src: "/screenshots/case-studies/atomdsn/mobile-services.webp", alt: "Atom mobile services", caption: "Mobile services", link: "https://atomdsn.com/services/" },
          { src: "/screenshots/case-studies/atomdsn/mobile-projects.webp", alt: "Atom mobile projects", caption: "Mobile projects", link: "https://atomdsn.com/projects/" },
        ],
      },
      {
        type: "stats",
        id: "results",
        heading: "Measurable outcomes",
        stats: [
          { value: "4", label: "Highlighted projects", sublabel: "at launch" },
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
    nextSlug: "elin-group",
  },
`;

    d = d.substring(0, arrayEndIdx) + newCaseStudy + '\n' + d.substring(arrayEndIdx);
    console.log('  ok added atomdsn case study');
  }

  fs.writeFileSync(DATA_FILE, d, 'utf8');
}

console.log('\n=== Done ===');
console.log('Backups: .atomdsn.bak suffix');
console.log('Test: npm run dev');
