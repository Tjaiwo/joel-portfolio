/**
 * patch-v2.js
 *
 * 1. Reduces mobile section spacing by 20px (py-16 → py-11)
 * 2. Creates shared BackToTop component, adds to layout.tsx
 * 3. Restructures all 3 case studies to match Clay Sky's pattern
 */
const fs = require('fs');

// ─────────────────────────────────────────────────────────────
// PART 1: Reduce mobile section spacing by 20px
// ─────────────────────────────────────────────────────────────
console.log('=== Part 1: Reduce mobile section spacing ===\n');

const spacingFiles = [
  'src/components/case-study/section.tsx',
  'src/components/case-study/gallery.tsx',
  'src/components/case-study/results-grid.tsx',
  'src/components/case-study/next-project.tsx',
  'src/app/projects/[slug]/page.tsx',
];

for (const f of spacingFiles) {
  if (!fs.existsSync(f)) {
    console.log('  ! skip (not found): ' + f);
    continue;
  }
  let s = fs.readFileSync(f, 'utf8');
  const before = s.length;
  // py-16 sm:py-20 → py-11 sm:py-20 (16px mobile reduction — closest Tailwind step to 20px without arbitrary values)
  // Actually py-11 = 44px, py-16 = 64px, so 20px reduction exactly
  s = s.replace(/py-16 sm:py-20/g, 'py-11 sm:py-20');
  fs.writeFileSync(f, s, 'utf8');
  console.log('  ok ' + f + ' (changed: ' + (s.length !== before) + ')');
}

// ─────────────────────────────────────────────────────────────
// PART 2: Create shared BackToTop component
// ─────────────────────────────────────────────────────────────
console.log('\n=== Part 2: Create shared BackToTop component ===\n');

fs.mkdirSync('src/components', { recursive: true });

const backToTop = `"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
`;

fs.writeFileSync('src/components/back-to-top.tsx', backToTop, 'utf8');
console.log('  ok src/components/back-to-top.tsx created');

// Add to layout.tsx
const layoutFile = 'src/app/layout.tsx';
if (fs.existsSync(layoutFile)) {
  let l = fs.readFileSync(layoutFile, 'utf8');
  fs.writeFileSync(layoutFile + '.v2.bak', l, 'utf8');

  if (!l.includes('BackToTop')) {
    // Add import after the last import statement
    const lastImport = l.lastIndexOf('import ');
    if (lastImport !== -1) {
      const lineEnd = l.indexOf('\n', lastImport);
      l = l.substring(0, lineEnd + 1) +
          'import { BackToTop } from "@/components/back-to-top";\n' +
          l.substring(lineEnd + 1);
    }

    // Add <BackToTop /> before </body>
    const bodyClose = l.indexOf('</body>');
    if (bodyClose !== -1) {
      l = l.substring(0, bodyClose) + '      <BackToTop />\n    ' + l.substring(bodyClose);
    }

    fs.writeFileSync(layoutFile, l, 'utf8');
    console.log('  ok ' + layoutFile + ' updated (added BackToTop)');
  } else {
    console.log('  - BackToTop already in layout.tsx');
  }
}

// Try to remove existing back-to-top button from page.tsx
const pageFile = 'src/app/page.tsx';
if (fs.existsSync(pageFile)) {
  let p = fs.readFileSync(pageFile, 'utf8');
  // Look for common back-to-top button patterns
  // Pattern: a button with scroll-to-top behavior, often labeled with ArrowUp icon
  const patterns = [
    // Pattern: a state variable + scroll handler + button rendering
    /\s*const \[showBackToTop[^;]*;[\s\S]*?window\.scrollY[^;]*;[\s\S]*?\}\);[\s\S]*?/g,
  ];

  // Simpler approach: find any button that says "back to top" or has ArrowUp icon and onClick scroll to top
  // We'll look for common markup patterns
  const backToTopButtonPattern = /\s*\{?\s*showBackToTop[\s\S]*?window\.scrollTo[\s\S]*?\}\)?\s*<\/?[a-z]+/g;

  // Just print a warning — manual removal is safer
  console.log('  ! Check src/app/page.tsx for an existing back-to-top button');
  console.log('    If found, remove it (BackToTop is now in layout.tsx)');
}

// ─────────────────────────────────────────────────────────────
// PART 3: Restructure case studies (Clay Sky style)
// ─────────────────────────────────────────────────────────────
console.log('\n=== Part 3: Restructure case studies ===\n');

const dataFile = 'src/data/case-studies.ts';
if (fs.existsSync(dataFile)) {
  let d = fs.readFileSync(dataFile, 'utf8');
  fs.writeFileSync(dataFile + '.v2.bak', d, 'utf8');

  // Make kicker optional in the type
  if (d.includes('kicker: string;')) {
    d = d.replace('kicker: string;', 'kicker?: string;');
    console.log('  + made kicker optional in CaseStudySection type');
  }

  fs.writeFileSync(dataFile, d, 'utf8');
}

// Update section.tsx to handle missing kicker
const sectionFile = 'src/components/case-study/section.tsx';
if (fs.existsSync(sectionFile)) {
  let s = fs.readFileSync(sectionFile, 'utf8');

  // Replace the always-rendered kicker with a conditional
  const oldKicker = `<span className="inline-flex items-center rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {section.kicker}
        </span>

        <h2`;
  const newKicker = `{section.kicker && (
          <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            {section.kicker}
          </span>
        )}

        <h2`;

  if (s.includes(oldKicker)) {
    s = s.replace(oldKicker, newKicker);
    fs.writeFileSync(sectionFile, s, 'utf8');
    console.log('  + section.tsx updated (kicker now conditional)');
  } else {
    console.log('  - section.tsx kicker already conditional or pattern not found');
  }
}

// Now write the new case-studies.ts with Clay Sky structure
// Each case study gets more sections (6-8 instead of 5), each focused on ONE aspect,
// with short evocative headings instead of generic "Challenge/Approach/Process"
console.log('\n  Rewriting case study sections in Clay Sky style...');

const newDataFile = 'src/data/case-studies.ts';
let finalData = fs.readFileSync(newDataFile, 'utf8');

// Replace the sections array for Elin Air
const elinAirSectionsOld = finalData.match(/slug: "elin-air"[\s\S]*?sections: \[[\s\S]*?\],/);
if (elinAirSectionsOld) {
  const newElinAirSections = `sections: [
      {
        id: "transformation",
        heading: "From brochure to booking platform",
        body: [
          "The legacy Elin Air site looked decent, but it didn't actually convert visitors into charter requests. Five distinct service lines were presented as a flat list of links with no clear hierarchy, and the only conversion path was a generic contact form buried two pages deep.",
          "The redesign reframed the site around visitor intent. Fly, ship, or service. Each path leads to a focused booking flow instead of a generic contact page, and the homepage gives visitors a clear next step within two clicks of arriving.",
        ],
      },
      {
        id: "five-services",
        heading: "Five service lines, one story",
        body: [
          "Private jet charter, helicopter services, air cargo logistics, FBO operations, and MRO. Each had its own audience, its own value proposition, and its own conversion path. The homepage now routes visitors to a dedicated service landing page within two clicks, where they can submit a charter request specific to their need instead of filling out a generic contact form.",
        ],
      },
      {
        id: "performance",
        heading: "Performance as a feature",
        body: [
          "The legacy site loaded in 4.2 seconds on mobile, unacceptable for a brand selling premium aviation experiences. Hero imagery was re-encoded as WebP and served through Cloudflare. Plugins were audited and stripped to the four that were actually doing work. The booking flow replaced the catch-all contact page.",
          "The result was a 92 mobile PageSpeed score at launch, with a 1.4 second LCP on 4G. The site feels premium without making visitors wait for it.",
        ],
      },
      {
        id: "booking-flow",
        heading: "Booking flow rebuilt",
        body: [
          "The old contact form was a single page with twelve fields. The new flow is multi-step. Service type, dates, passenger count, contact details. Each step takes less than 30 seconds to complete, and submission routes directly to the operations team instead of going through a general inbox.",
        ],
      },
      {
        id: "fleet",
        heading: "Fleet as a showcase",
        body: [
          "Each aircraft now has its own detail page with specifications, capacity, range, and interior photography. Visitors can compare aircraft side by side before submitting a charter request, which means the inquiries that do come through are better qualified and faster to close.",
        ],
        image: {
          src: "/screenshots/case-studies/elin-air/desktop-detail.webp",
          alt: "Elin Air fleet showcase with aircraft detail cards",
          caption: "Fleet section. Each aircraft links to a dedicated detail page.",
          layout: "full",
        },
      },
      {
        id: "premium",
        heading: "Premium without the weight",
        body: [
          "Micro-animations on the fleet cards, smooth scroll to anchor sections, a sticky mobile CTA. Every interaction got a small detail pass, but none of it at the cost of perceived load time. The site needed to feel premium without making visitors wait for it.",
        ],
      },
      {
        id: "collaboration",
        heading: "Three weeks, one blueprint",
        body: [
          "Mayowa Oduntan had already validated the homepage in Figma Site before development started, so stakeholders had seen the interactions and approved the direction. Week one was structure: custom post types for aircraft and services, page templates, booking flow scaffolding. Week two was visual implementation. Week three was the performance pass.",
          "We launched three days ahead of the original deadline, with the staging site scoring 92 on mobile PageSpeed before any production CDN tuning.",
        ],
      },
    ],`;

  finalData = finalData.replace(elinAirSectionsOld[0], newElinAirSections);
  console.log('  + Elin Air sections rewritten');
}

// Replace sections for Elin Group
const elinGroupSectionsOld = finalData.match(/slug: "elin-group"[\s\S]*?sections: \[[\s\S]*?\],/);
if (elinGroupSectionsOld) {
  const newElinGroupSections = `sections: [
      {
        id: "brief",
        heading: "Seven businesses, one platform",
        body: [
          "Elin Group operates seven subsidiaries across six sectors. Energy, aviation, mining, construction, real estate, and power. Each with its own leadership, services, target audience, and brand voice. The brief was to build one corporate site that introduced the parent platform while giving each subsidiary enough room to communicate its value proposition without feeling like an afterthought.",
        ],
      },
      {
        id: "architecture",
        heading: "Hub-and-spoke architecture",
        body: [
          "The corporate homepage acts as the entry point, with a clear directory of subsidiaries that each link out to a dedicated landing page. Visitors scanning the homepage see a unified industrial platform with the same visual language and quality bar, but clicking into any subsidiary feels like landing on a purpose-built site for that business.",
        ],
        image: {
          src: "/screenshots/case-studies/elin-group/desktop-detail.webp",
          alt: "Elin Group subsidiaries section showing all seven businesses",
          caption: "Subsidiaries grid. Each card routes to a dedicated landing page.",
          layout: "full",
        },
      },
      {
        id: "design-system",
        heading: "A shared design system",
        body: [
          "Each subsidiary page uses the same design system. Typography, color tokens, layout grid, navigation. But it gets full control over its own hero imagery, content sections, and call-to-action. Shared elements like leadership, sustainability, and careers sit at the corporate level so they stay consistent across all seven spokes.",
        ],
      },
      {
        id: "content-model",
        heading: "Custom post type for subsidiaries",
        body: [
          "A custom post type with fields for sector, services, leadership team, and contact routing means adding a new business later won't require touching the layout. The discipline paid off. Adding an eighth subsidiary would take less than a day of content work, no code changes required.",
        ],
      },
      {
        id: "seo",
        heading: "Schema markup for industrial groups",
        body: [
          "Each subsidiary could rank for its own branded terms while passing authority up to the parent domain. Schema markup for Organization and SubOrganization relationships was set up so search engines understood the corporate hierarchy from day one.",
        ],
      },
      {
        id: "process",
        heading: "Five weeks, seven launches",
        body: [
          "Week one was information architecture. Weeks two and three were the corporate-level build: homepage, leadership, sustainability, careers, news, contact. Week four was the subsidiary template plus three of the seven subsidiary pages populated with real content. Week five was the remaining four subsidiaries, performance pass, and SEO setup.",
          "Going live with all seven at once meant the template had to be designed once and resist the urge to over-customize per business. The discipline is what made the project scale.",
        ],
      },
    ],`;

  finalData = finalData.replace(elinGroupSectionsOld[0], newElinGroupSections);
  console.log('  + Elin Group sections rewritten');
}

// Replace sections for Mediapool
const mediapoolSectionsOld = finalData.match(/slug: "mediapool"[\s\S]*?sections: \[[\s\S]*?\],/);
if (mediapoolSectionsOld) {
  const newMediapoolSections = `sections: [
      {
        id: "structure",
        heading: "Campaign-first, not services-first",
        body: [
          "The typical agency site leads with services and buries the portfolio three sections down. Mediapool's homepage opens with the client roster, immediately followed by a campaign grid that visitors can filter by client and medium. Services get a single clean section further down, treated as support material rather than the main event.",
          "For a media agency whose entire value proposition is making other brands look good online, the proof of competence is the work itself. Burying the work behind marketing copy would be fighting against the very thing the site is trying to sell.",
        ],
      },
      {
        id: "content-model",
        heading: "Custom post type for campaigns",
        body: [
          "A custom post type with taxonomy for client, medium, year, and sector means the agency can add new campaign work to the site without involving a developer. The campaign automatically appears in the portfolio grid, gets its own detail page, and is filterable everywhere it shows up.",
          "Within two months of launch they had added eleven new campaign entries without any development work. Exactly the kind of separation between content and code that makes a WordPress build sustainable long-term.",
        ],
      },
      {
        id: "portfolio-grid",
        heading: "Filterable portfolio grid",
        body: [
          "The portfolio grid lets visitors filter by client (Renmoney, Zedvance, CrusaderSterling, Mixta Africa), by medium (TV, digital, OOH), and by year. Each campaign links to a dedicated detail page with structured data for the brand, medium, and outcomes.",
        ],
        image: {
          src: "/screenshots/case-studies/mediapool/desktop-detail.webp",
          alt: "Mediapool campaign portfolio with filterable client work",
          caption: "Campaign portfolio. Filterable by client, medium, and year.",
          layout: "full",
        },
      },
      {
        id: "performance",
        heading: "Performance budget at 800KB",
        body: [
          "The hero uses an animated logo carousel instead of a heavy hero video. All campaign imagery is served as WebP via Cloudflare. The page weight budget was capped at 800KB on initial load, with the rest lazy-loading as the visitor scrolls.",
          "Post-launch, the site scored 93 on PageSpeed desktop and 77 on mobile. Up from 31 and 24 respectively on the legacy site.",
        ],
      },
      {
        id: "seo",
        heading: "SEO for long-tail queries",
        body: [
          "Individual campaign pages are structured to rank for long-tail queries like \"Renmoney media campaign Lagos\". Each campaign gets its own dedicated detail page with structured data for the brand, medium, and outcomes.",
        ],
      },
      {
        id: "process",
        heading: "Four weeks to launch",
        body: [
          "Week one was content architecture. Weeks two and three were the homepage and template build: animated client logo carousel, filterable campaign grid, services section, about, and contact. Week four was the campaign detail page template plus performance optimization.",
        ],
      },
    ],`;

  finalData = finalData.replace(mediapoolSectionsOld[0], newMediapoolSections);
  console.log('  + Mediapool sections rewritten');
}

fs.writeFileSync(newDataFile, finalData, 'utf8');
console.log('\n  ok ' + newDataFile + ' updated');

console.log('\n=== Done ===');
console.log('\nBackups saved with .v2.bak suffix');
console.log('Test with: npm run dev');
console.log('Visit: http://localhost:3000/projects/elin-air');
