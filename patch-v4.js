/**
 * patch-v4.js
 *
 * 1. Hero overlay: 85% opacity, BLACK color (uniform)
 * 2. Replace Mediapool "Filterable portfolio grid" with "Campaign case studies"
 * 3. Add Mayowa-attributed quote to each case study
 */
const fs = require('fs');

// ─────────────────────────────────────────────────────────────
// 1. Hero overlay — black at 85% opacity
// ─────────────────────────────────────────────────────────────
const HERO_FILE = 'src/components/case-study/hero.tsx';
if (fs.existsSync(HERO_FILE)) {
  let h = fs.readFileSync(HERO_FILE, 'utf8');
  fs.writeFileSync(HERO_FILE + '.v4.bak', h, 'utf8');

  // Replace whatever the current overlay is with uniform black/85
  // Pattern matches: bg-gradient-to-b from-X/XX via-Y/YY to-Z/ZZ
  const overlayRegex = /bg-gradient-to-b from-[^"\s]+ via-[^"\s]+ to-[^"\s]+/;
  const newOverlay = 'bg-gradient-to-b from-black/85 via-black/85 to-black/85';

  if (overlayRegex.test(h)) {
    h = h.replace(overlayRegex, newOverlay);
    fs.writeFileSync(HERO_FILE, h, 'utf8');
    console.log('  ok hero.tsx: overlay set to black/85 (uniform)');
  } else {
    console.log('  - hero.tsx: overlay pattern not found');
  }
}

// ─────────────────────────────────────────────────────────────
// 2 & 3. Patch case-studies.ts
// ─────────────────────────────────────────────────────────────
const DATA_FILE = 'src/data/case-studies.ts';
if (fs.existsSync(DATA_FILE)) {
  let d = fs.readFileSync(DATA_FILE, 'utf8');
  fs.writeFileSync(DATA_FILE + '.v4.bak', d, 'utf8');

  // ── ELIN AIR: Replace closing quote with Mayowa-attributed quote ──
  const elinAirOldQuote = `{ type: "quote", id: "closing", text: "The fastest path to a happy client isn't a fancier design, it's a clearer one. Every decision was measured against the goal of reducing reliance on charter brokers by enabling direct customer acquisition." },`;
  const elinAirNewQuote = `{ type: "quote", id: "designer-quote", text: "Working with Joel meant the redesign didn't stop at handoff. Every interaction, every micro-animation, every performance decision was preserved in the build exactly as designed. That's rare.", attribution: "Mayowa Oduntan — UX Designer (thisismayor.webflow.io)" },
      { type: "quote", id: "closing", text: "The fastest path to a happy client isn't a fancier design, it's a clearer one. Every decision was measured against the goal of reducing reliance on charter brokers by enabling direct customer acquisition." },`;

  if (d.includes(elinAirOldQuote)) {
    d = d.replace(elinAirOldQuote, elinAirNewQuote);
    console.log('  ok elin-air: added Mayowa quote before closing reflection');
  } else {
    console.log('  - elin-air: closing quote pattern not found');
  }

  // ── ELIN GROUP: Replace closing quote with Mayowa-attributed quote ──
  const elinGroupOldQuote = `{ type: "quote", id: "closing", text: "The platform gave Elin Group a foundation to communicate as a unified industrial group, critical for investor conversations and partnership discussions where perception of scale matters as much as the actual business footprint." },`;
  const elinGroupNewQuote = `{ type: "quote", id: "designer-quote", text: "Seven businesses in five weeks required a developer who could think in systems. Joel built the architecture that let each subsidiary tell its own story while keeping the parent platform coherent.", attribution: "Mayowa Oduntan — UX Designer (thisismayor.webflow.io)" },
      { type: "quote", id: "closing", text: "The platform gave Elin Group a foundation to communicate as a unified industrial group, critical for investor conversations and partnership discussions where perception of scale matters as much as the actual business footprint." },`;

  if (d.includes(elinGroupOldQuote)) {
    d = d.replace(elinGroupOldQuote, elinGroupNewQuote);
    console.log('  ok elin-group: added Mayowa quote before closing reflection');
  } else {
    console.log('  - elin-group: closing quote pattern not found');
  }

  // ── MEDIAPOOL: Replace "Filterable portfolio grid" section + add Mayowa quote ──
  // Old section talks about a filterable grid that doesn't exist yet.
  // Replace with "Campaign case studies" — about individual work pages (which DO exist).
  const mediapoolOldSection = `{ type: "text-image", id: "portfolio-grid", heading: "Filterable portfolio grid", body: [
        "The portfolio grid lets visitors filter by client (Renmoney, Zedvance, CrusaderSterling, Mixta Africa), by medium (TV, digital, OOH), and by year. Each campaign links to a dedicated detail page with structured data for the brand, medium, and outcomes.",
        "A custom post type with taxonomy for client, medium, year, and sector means the agency can add new campaign work to the site without involving a developer. The campaign automatically appears in the portfolio grid, gets its own detail page, and is filterable everywhere it shows up.",
      ], image: { src: "/screenshots/case-studies/mediapool/desktop-works.webp", alt: "Mediapool works portfolio grid", caption: "Works portfolio. Filterable by client, medium, and year." }, imagePosition: "full" },`;

  const mediapoolNewSection = `{ type: "text-image", id: "campaign-case-studies", heading: "Campaign case studies", body: [
        "Each campaign gets its own dedicated detail page. Renmoney, Zedvance, CrusaderSterling Pensions, Mixta Africa. Every page is structured the same way: the brief, the medium, the execution, the outcome. Prospects land on a campaign that matches their industry and immediately see how Mediapool thinks.",
        "A custom post type means the agency can publish a new campaign case study without involving a developer. The campaign automatically appears on the works index, gets its own URL for sharing, and inherits the structured data needed to rank for long-tail queries like Renmoney media campaign Lagos.",
      ], image: { src: "/screenshots/case-studies/mediapool/desktop-renmoney.webp", alt: "Renmoney campaign case study page on Mediapool", caption: "Renmoney campaign case study. One of seven client-specific detail pages." }, imagePosition: "full" },`;

  if (d.includes(mediapoolOldSection)) {
    d = d.replace(mediapoolOldSection, mediapoolNewSection);
    console.log('  ok mediapool: replaced "Filterable portfolio grid" with "Campaign case studies"');
  } else {
    console.log('  - mediapool: section pattern not found');
  }

  // Add Mayowa quote to Mediapool
  const mediapoolOldQuote = `{ type: "quote", id: "closing", text: "The proof of competence is the work itself. Any site structure that buries the work behind marketing copy is fighting against the very thing it's trying to sell." },`;
  const mediapoolNewQuote = `{ type: "quote", id: "designer-quote", text: "The campaign portfolio isn't just a section on the site, it's the structural backbone. Joel understood that from day one and built the entire architecture around it.", attribution: "Mayowa Oduntan — UX Designer (thisismayor.webflow.io)" },
      { type: "quote", id: "closing", text: "The proof of competence is the work itself. Any site structure that buries the work behind marketing copy is fighting against the very thing it's trying to sell." },`;

  if (d.includes(mediapoolOldQuote)) {
    d = d.replace(mediapoolOldQuote, mediapoolNewQuote);
    console.log('  ok mediapool: added Mayowa quote before closing reflection');
  } else {
    console.log('  - mediapool: closing quote pattern not found');
  }

  fs.writeFileSync(DATA_FILE, d, 'utf8');
  console.log('\n  ok ' + DATA_FILE + ' saved');
}

console.log('\n=== Done ===');
console.log('Backups: .v4.bak suffix');
console.log('Test: npm run dev');
