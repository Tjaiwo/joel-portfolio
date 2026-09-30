/**
 * patch-v5.js
 *
 * 1. Adds `link?` field to all image types in case-studies.ts
 * 2. Updates block components to wrap images in <a> when link is present
 * 3. Adds source-page links to every screenshot in case-studies.ts
 * 4. Updates Elin Air "Fleet as a showcase" to use fleet-page-specific shots
 */
const fs = require('fs');

// ─────────────────────────────────────────────────────────────
// 1. Patch case-studies.ts types + add links
// ─────────────────────────────────────────────────────────────
const DATA_FILE = 'src/data/case-studies.ts';
if (fs.existsSync(DATA_FILE)) {
  let d = fs.readFileSync(DATA_FILE, 'utf8');
  fs.writeFileSync(DATA_FILE + '.v5.bak', d, 'utf8');

  // Add `link?: string` to all image-related types
  if (!d.includes('link?: string;')) {
    // Text-image block image type
    d = d.replace(
      'image: { src: string; alt: string; caption?: string };',
      'image: { src: string; alt: string; caption?: string; link?: string };'
    );
    // Image block type
    d = d.replace(
      '| { type: "image"; id: string; src: string; alt: string; caption?: string; parallax?: boolean; }',
      '| { type: "image"; id: string; src: string; alt: string; caption?: string; parallax?: boolean; link?: string; }'
    );
    // Gallery image type
    d = d.replace(
      'images: { src: string; alt: string; caption?: string }[];',
      'images: { src: string; alt: string; caption?: string; link?: string }[];'
    );
    console.log('  ok type: added `link?: string` to image types');
  }

  // Add links to screenshots across all 3 case studies.
  // Each screenshot gets a link to the live page where it was captured.
  const linkReplacements = [
    // ── ELIN GROUP ──
    // Hero image
    [
      'heroImage: "/screenshots/case-studies/elin-group/desktop-businesses.webp"',
      'heroImage: "/screenshots/case-studies/elin-group/desktop-businesses.webp",\n    heroImageLink: "https://elin-group.com/businesses/"',
    ],
    // Hero break (oil-gas subsidiary)
    [
      'src: "/screenshots/case-studies/elin-group/desktop-oil-gas.webp",\n        alt: "Elin Oil and Gas Services subsidiary landing page",\n        caption: "Elin Oil and Gas Services subsidiary page. One of seven dedicated subsidiary landing pages.",\n        parallax: true',
      'src: "/screenshots/case-studies/elin-group/desktop-oil-gas.webp",\n        alt: "Elin Oil and Gas Services subsidiary landing page",\n        caption: "Elin Oil and Gas Services subsidiary page. One of seven dedicated subsidiary landing pages.",\n        parallax: true,\n        link: "https://elin-group.com/businesses/elin-oil-and-gas-services/"',
    ],
    // Architecture section image
    [
      'image: { src: "/screenshots/case-studies/elin-group/desktop-businesses.webp", alt: "Elin Group businesses directory with sector cards", caption: "Businesses directory. Each card links to a dedicated subsidiary site." }',
      'image: { src: "/screenshots/case-studies/elin-group/desktop-businesses.webp", alt: "Elin Group businesses directory with sector cards", caption: "Businesses directory. Each card links to a dedicated subsidiary site.", link: "https://elin-group.com/businesses/" }',
    ],
    // Leadership image break
    [
      'src: "/screenshots/case-studies/elin-group/desktop-leadership.webp",\n        alt: "Elin Group leadership team page",\n        parallax: true',
      'src: "/screenshots/case-studies/elin-group/desktop-leadership.webp",\n        alt: "Elin Group leadership team page",\n        parallax: true,\n        link: "https://elin-group.com/leadership/"',
    ],
    // Gallery images
    [
      '{ src: "/screenshots/case-studies/elin-group/mobile-businesses.webp", alt: "Elin Group businesses directory on mobile", caption: "Mobile businesses directory" }',
      '{ src: "/screenshots/case-studies/elin-group/mobile-businesses.webp", alt: "Elin Group businesses directory on mobile", caption: "Mobile businesses directory", link: "https://elin-group.com/businesses/" }',
    ],
    [
      '{ src: "/screenshots/case-studies/elin-group/mobile-about.webp", alt: "Elin Group about page on mobile", caption: "Mobile about page" }',
      '{ src: "/screenshots/case-studies/elin-group/mobile-about.webp", alt: "Elin Group about page on mobile", caption: "Mobile about page", link: "https://elin-group.com/about/" }',
    ],
    [
      '{ src: "/screenshots/case-studies/elin-group/mobile-oil-gas.webp", alt: "Elin Oil and Gas subsidiary on mobile", caption: "Mobile subsidiary page" }',
      '{ src: "/screenshots/case-studies/elin-group/mobile-oil-gas.webp", alt: "Elin Oil and Gas subsidiary on mobile", caption: "Mobile subsidiary page", link: "https://elin-group.com/businesses/elin-oil-and-gas-services/" }',
    ],

    // ── ELIN AIR ──
    // Hero image (fleet page)
    [
      'heroImage: "/screenshots/case-studies/elin-air/desktop-fleet.webp"',
      'heroImage: "/screenshots/case-studies/elin-air/desktop-fleet.webp",\n    heroImageLink: "https://flyelinair.com/fleet/"',
    ],
    // Hero break (fleet-top)
    [
      'src: "/screenshots/case-studies/elin-air/desktop-fleet.webp",\n        alt: "Elin Air fleet detail page",\n        caption: "Fleet showcase with aircraft cards",\n        parallax: true',
      'src: "/screenshots/case-studies/elin-air/desktop-fleet-top.webp",\n        alt: "Elin Air fleet page hero",\n        caption: "Fleet page hero with aircraft showcase.",\n        parallax: true,\n        link: "https://flyelinair.com/fleet/"',
    ],
    // Fleet as a showcase section — replace with new fleet-grid shot
    [
      'image: { src: "/screenshots/case-studies/elin-air/desktop-charter-request.webp", alt: "Elin Air charter request form", caption: "Multi-step charter request form. Routes directly to operations team." }',
      'image: { src: "/screenshots/case-studies/elin-air/desktop-fleet-grid.webp", alt: "Elin Air fleet grid with aircraft cards", caption: "Each aircraft has its own detail page with specifications, capacity, range, and interior photography.", link: "https://flyelinair.com/fleet/" }',
    ],
    // Second image break (safety)
    [
      'src: "/screenshots/case-studies/elin-air/desktop-safety.webp",\n        alt: "Elin Air safety protocol page",\n        parallax: true',
      'src: "/screenshots/case-studies/elin-air/desktop-safety.webp",\n        alt: "Elin Air safety protocol page",\n        parallax: true,\n        link: "https://flyelinair.com/help/safety-protocol"',
    ],
    // Gallery images
    [
      '{ src: "/screenshots/case-studies/elin-air/mobile-fleet.webp", alt: "Elin Air fleet on mobile", caption: "Mobile fleet" }',
      '{ src: "/screenshots/case-studies/elin-air/mobile-fleet-top.webp", alt: "Elin Air fleet page on mobile", caption: "Mobile fleet page", link: "https://flyelinair.com/fleet/" }',
    ],
    [
      '{ src: "/screenshots/case-studies/elin-air/mobile-charter-request.webp", alt: "Elin Air charter request on mobile", caption: "Mobile charter request" }',
      '{ src: "/screenshots/case-studies/elin-air/mobile-charter-request.webp", alt: "Elin Air charter request on mobile", caption: "Mobile charter request", link: "https://flyelinair.com/charter-request/" }',
    ],
    [
      '{ src: "/screenshots/case-studies/elin-air/mobile-safety.webp", alt: "Elin Air safety protocol on mobile", caption: "Mobile safety" }',
      '{ src: "/screenshots/case-studies/elin-air/mobile-safety.webp", alt: "Elin Air safety protocol on mobile", caption: "Mobile safety", link: "https://flyelinair.com/help/safety-protocol" }',
    ],

    // ── MEDIAPOOL ──
    // Hero image (works page)
    [
      'heroImage: "/screenshots/case-studies/mediapool/desktop-works.webp"',
      'heroImage: "/screenshots/case-studies/mediapool/desktop-works.webp",\n    heroImageLink: "https://mediapool.ng/works/"',
    ],
    // Hero break (renmoney campaign)
    [
      'src: "/screenshots/case-studies/mediapool/desktop-renmoney.webp",\n        alt: "Renmoney campaign case study with branded bus advertisement",\n        caption: "Renmoney campaign detail. Out-of-home advertising for the finance sector.",\n        parallax: true',
      'src: "/screenshots/case-studies/mediapool/desktop-renmoney.webp",\n        alt: "Renmoney campaign case study with branded bus advertisement",\n        caption: "Renmoney campaign detail. Out-of-home advertising for the finance sector.",\n        parallax: true,\n        link: "https://mediapool.ng/works/renmoney/"',
    ],
    // Campaign case studies section image
    [
      'image: { src: "/screenshots/case-studies/mediapool/desktop-renmoney.webp", alt: "Renmoney campaign case study page on Mediapool", caption: "Renmoney campaign case study. One of seven client-specific detail pages." }',
      'image: { src: "/screenshots/case-studies/mediapool/desktop-renmoney.webp", alt: "Renmoney campaign case study page on Mediapool", caption: "Renmoney campaign case study. One of seven client-specific detail pages.", link: "https://mediapool.ng/works/renmoney/" }',
    ],
    // Second image break (services)
    [
      'src: "/screenshots/case-studies/mediapool/desktop-services.webp",\n        alt: "Mediapool services page with media planning, buying, and consultancy",\n        parallax: true',
      'src: "/screenshots/case-studies/mediapool/desktop-services.webp",\n        alt: "Mediapool services page with media planning, buying, and consultancy",\n        parallax: true,\n        link: "https://mediapool.ng/services/"',
    ],
    // Gallery images
    [
      '{ src: "/screenshots/case-studies/mediapool/mobile-services.webp", alt: "Mediapool services on mobile", caption: "Mobile services" }',
      '{ src: "/screenshots/case-studies/mediapool/mobile-services.webp", alt: "Mediapool services on mobile", caption: "Mobile services", link: "https://mediapool.ng/services/" }',
    ],
    [
      '{ src: "/screenshots/case-studies/mediapool/mobile-buying.webp", alt: "Mediapool media buying on mobile", caption: "Mobile media buying" }',
      '{ src: "/screenshots/case-studies/mediapool/mobile-buying.webp", alt: "Mediapool media buying on mobile", caption: "Mobile media buying", link: "https://mediapool.ng/services/media-buying/" }',
    ],
    [
      '{ src: "/screenshots/case-studies/mediapool/mobile-consultancy.webp", alt: "Mediapool media consultancy on mobile", caption: "Mobile consultancy" }',
      '{ src: "/screenshots/case-studies/mediapool/mobile-consultancy.webp", alt: "Mediapool media consultancy on mobile", caption: "Mobile consultancy", link: "https://mediapool.ng/services/media-consultancy/" }',
    ],
  ];

  let count = 0;
  for (const [from, to] of linkReplacements) {
    if (d.includes(from)) {
      d = d.replace(from, to);
      count++;
    }
  }
  console.log('  ok case-studies.ts: ' + count + ' image links added');

  // Also add heroImageLink to the CaseStudy type
  if (!d.includes('heroImageLink?: string;')) {
    d = d.replace(
      'heroImage: string;',
      'heroImage: string;\n  heroImageLink?: string;'
    );
    console.log('  ok type: added heroImageLink field');
  }

  fs.writeFileSync(DATA_FILE, d, 'utf8');
}

// ─────────────────────────────────────────────────────────────
// 2. Patch hero.tsx — make hero image clickable
// ─────────────────────────────────────────────────────────────
const HERO_FILE = 'src/components/case-study/hero.tsx';
if (fs.existsSync(HERO_FILE)) {
  let h = fs.readFileSync(HERO_FILE, 'utf8');
  fs.writeFileSync(HERO_FILE + '.v5.bak', h, 'utf8');

  // Find the hero <img> and wrap it (or its parent motion.div) in an <a> if cs.heroImageLink exists
  // Current pattern:
  //   <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
  //     <img src={cs.heroImage} alt={cs.heroImageAlt} className="..." loading="eager" />
  //     <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/85 to-black/85" />
  //   </motion.div>
  //
  // New: wrap the <img> in <a> if cs.heroImageLink exists

  // Simpler approach: add a "View live site" badge that links out
  // Actually simplest: add a small floating link icon at top-right of hero when heroImageLink exists
  const oldAnchor = 'href={cs.liveUrl}\n            target="_blank"\n            rel="noopener noreferrer"\n            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background backdrop-blur-sm transition-all hover:scale-[1.03]"\n          >\n            Visit Live Site';

  // Actually let's just add a small "View live page" link below the hero image
  // when heroImageLink exists. Easier to do in page.tsx

  // For hero.tsx, just add an optional clickable behavior:
  // Wrap the entire hero image area in an <a> if heroImageLink exists
  // We'll add a small "View page ↗" badge in the bottom-right corner

  const oldOverlay = 'from-black/85 via-black/85 to-black/85" />\n      </motion.div>';
  const newOverlay = `from-black/85 via-black/85 to-black/85" />
        {cs.heroImageLink && (
          <a
            href={cs.heroImageLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-all hover:bg-background hover:scale-105"
          >
            View live page
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
          </a>
        )}
      </motion.div>`;

  if (h.includes(oldOverlay)) {
    h = h.replace(oldOverlay, newOverlay);
    fs.writeFileSync(HERO_FILE, h, 'utf8');
    console.log('  ok hero.tsx: added "View live page" badge');
  } else {
    console.log('  - hero.tsx: overlay pattern not found (may already be patched)');
  }
}

// ─────────────────────────────────────────────────────────────
// 3. Patch blocks.tsx — make all images clickable
// ─────────────────────────────────────────────────────────────
const BLOCKS_FILE = 'src/components/case-study/blocks.tsx';
if (fs.existsSync(BLOCKS_FILE)) {
  let b = fs.readFileSync(BLOCKS_FILE, 'utf8');
  fs.writeFileSync(BLOCKS_FILE + '.v5.bak', b, 'utf8');

  // Pattern: any <img src={...} ... /> should be wrapped in <a> when link is present
  // For text-image full layout: wrap the <img> in the figure
  // For image block: wrap the <img>
  // For gallery: wrap each <img>

  // Strategy: replace each <img> with a conditional <a><img></a> wrapper
  // This requires knowing the variable name for the link in each context

  // TextImageBlock — full layout, has block.image.link
  const oldTextImageImg = '<img\n            src={block.image.src}\n            alt={block.image.alt}\n            className="w-full h-auto object-cover"\n            loading="lazy"\n          />';
  const newTextImageImg = `{block.image.link ? (\n            <a href={block.image.link} target="_blank" rel="noopener noreferrer" className="block group/img">\n              <img\n                src={block.image.src}\n                alt={block.image.alt}\n                className="w-full h-auto object-cover transition-transform duration-500 group-hover/img:scale-[1.02]"\n                loading="lazy"\n              />\n            </a>\n          ) : (\n            <img\n              src={block.image.src}\n              alt={block.image.alt}\n              className="w-full h-auto object-cover"\n              loading="lazy"\n            />\n          )}`;

  if (b.includes(oldTextImageImg)) {
    b = b.replace(oldTextImageImg, newTextImageImg);
    console.log('  ok blocks.tsx: text-image now clickable');
  } else {
    console.log('  - blocks.tsx: text-image pattern not found');
  }

  // ImageBlock — parallax, has block.link
  const oldImageBlockImg = '<img\n            src={block.src}\n            alt={block.alt}\n            className="h-[130%] w-full object-cover object-top"\n            loading="lazy"\n          />';
  const newImageBlockImg = `{block.link ? (\n            <a href={block.link} target="_blank" rel="noopener noreferrer" className="block h-full w-full">\n              <img\n                src={block.src}\n                alt={block.alt}\n                className="h-[130%] w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"\n                loading="lazy"\n              />\n            </a>\n          ) : (\n            <img\n              src={block.src}\n              alt={block.alt}\n              className="h-[130%] w-full object-cover object-top"\n              loading="lazy"\n            />\n          )}`;

  if (b.includes(oldImageBlockImg)) {
    b = b.replace(oldImageBlockImg, newImageBlockImg);
    console.log('  ok blocks.tsx: image block now clickable');
  } else {
    console.log('  - blocks.tsx: image block pattern not found');
  }

  // GalleryBlock — each image, has img.link
  const oldGalleryImg = '<img\n                src={img.src}\n                alt={img.alt}\n                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.04]"\n                loading="lazy"\n              />';
  const newGalleryImg = `{img.link ? (\n                <a href={img.link} target="_blank" rel="noopener noreferrer" className="block">\n                  <img\n                    src={img.src}\n                    alt={img.alt}\n                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.04]"\n                    loading="lazy"\n                  />\n                </a>\n              ) : (\n                <img\n                  src={img.src}\n                  alt={img.alt}\n                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.04]"\n                  loading="lazy"\n                />\n              )}`;

  if (b.includes(oldGalleryImg)) {
    b = b.replace(oldGalleryImg, newGalleryImg);
    console.log('  ok blocks.tsx: gallery images now clickable');
  } else {
    console.log('  - blocks.tsx: gallery pattern not found');
  }

  fs.writeFileSync(BLOCKS_FILE, b, 'utf8');
}

console.log('\n=== Done ===');
console.log('Backups: .v5.bak suffix');
console.log('Test: npm run dev');
