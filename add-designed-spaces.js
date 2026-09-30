const fs = require('fs');
const F = 'src/data/case-studies.ts';
let s = fs.readFileSync(F, 'utf8');

const newCS = `
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
      { type: "image", id: "hero-break", src: "/screenshots/case-studies/designed-spaces/desktop-projects.webp", alt: "Designed Spaces projects portfolio", caption: "Projects portfolio. Each project gets its own detail page.", parallax: true, link: "https://designedspacesbyyemi.com/projects/" },
      { type: "text", id: "positioning", heading: "End-to-end delivery as differentiator", body: [
        "Most architecture firms position themselves as design specialists. DSY's differentiator is that they stay through the entire project lifecycle, from feasibility studies through construction handover. The site needed to communicate this without sounding like a generic full-service pitch.",
        "The homepage leads with the tagline 'We don't just design buildings. We deliver them.' The services section breaks down the full scope: feasibility studies, architectural design, consultancy, project management, and renovations. A visitor can see in 30 seconds that DSY is not just a design shop.",
      ]},
      { type: "text-image", id: "projects", heading: "Projects as proof", body: [
        "The portfolio showcases 12+ completed projects including AG Heights, The Earl of Ilabere, NF 1, Project Indulgence, Cedar Shore, and Baylad Mews. Each project gets its own detail page with hero imagery, project brief, scope, and outcomes.",
        "The projects are categorized by type (residential, commercial, multi-family) so visitors can filter to what's relevant to their needs. A prospective residential client doesn't have to scroll through commercial work to find relevant examples.",
      ], image: { src: "/screenshots/case-studies/designed-spaces/desktop-projects.webp", alt: "Designed Spaces projects portfolio grid", caption: "Projects portfolio. 12+ completed works, filterable by type.", link: "https://designedspacesbyyemi.com/projects/" }, imagePosition: "full" },
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
        { src: "/screenshots/case-studies/designed-spaces/mobile-projects.webp", alt: "Designed Spaces mobile projects", caption: "Mobile projects", link: "https://designedspacesbyyemi.com/projects/" },
        { src: "/screenshots/case-studies/designed-spaces/mobile-services.webp", alt: "Designed Spaces mobile services", caption: "Mobile services", link: "https://designedspacesbyyemi.com/services/" },
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
`;

const endIdx = s.lastIndexOf('];');
s = s.substring(0, endIdx) + newCS + '\n' + s.substring(endIdx);
fs.writeFileSync(F, s, 'utf8');
console.log('  ok added designed-spaces case study');
