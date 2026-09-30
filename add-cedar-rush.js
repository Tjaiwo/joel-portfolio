const fs = require('fs');
const F = 'src/data/case-studies.ts';
let s = fs.readFileSync(F, 'utf8');

const newCS = `
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
`;

const endIdx = s.lastIndexOf('];');
s = s.substring(0, endIdx) + newCS + '\n' + s.substring(endIdx);
fs.writeFileSync(F, s, 'utf8');
console.log('  ok added cedar-rush case study (loop closed)');
