/**
 * patch-tier2-3.js
 *
 * Tier 2:
 *   1. Kill browser chrome on project cards
 *   2. Remove stats section entirely
 *   3. Recolor favicon (J letter) to ochre
 *
 * Tier 3 (add-on):
 *   4. Add Fraunces serif font for case study titles + homepage h1/h2
 *   5. Replace kicker pills with numbered section labels ("01 — Challenge")
 */
const fs = require('fs');

const OCHRE = '#B8956A';

// ─────────────────────────────────────────────────────────────
// 1. Kill browser chrome on project cards
// ─────────────────────────────────────────────────────────────
const PAGE = 'src/app/page.tsx';
let p = fs.readFileSync(PAGE, 'utf8');
fs.writeFileSync(PAGE + '.tier23.bak', p, 'utf8');

// The BrowserMockupCard component has this structure:
//   <div className="browser-chrome">
//     <span className="browser-dot browser-dot-red" />
//     <span className="browser-dot browser-dot-yellow" />
//     <span className="browser-dot browser-dot-green" />
//     <span className="ml-3 text-[12px] ...">{project.url.replace(...)}</span>
//   </div>
//
// Replace with a clean minimal header: small project name + URL on the right

// Find the BrowserMockupCard function and replace its browser-chrome div
const oldChrome = `<div className="browser-chrome">
        <span className="browser-dot browser-dot-red" />
        <span className="browser-dot browser-dot-yellow" />
        <span className="browser-dot browser-dot-green" />
        <span className="ml-3 text-[12px] text-muted-foreground/60 font-mono truncate select-none">
          {project.url.replace(/^https?:\\/\\//, "")}
        </span>
      </div>`;

const newChrome = `<div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-card/30">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground truncate">
          {project.title}
        </span>
        <span className="text-[11px] text-muted-foreground/50 font-mono truncate ml-3">
          {project.url.replace(/^https?:\\/\\//, "")}
        </span>
      </div>`;

if (p.includes(oldChrome)) {
  p = p.replace(oldChrome, newChrome);
  console.log('  ok killed browser chrome (replaced with minimal header)');
} else {
  console.log('  - browser chrome pattern not found (may differ slightly)');
  // Try a more flexible match
  const flexMatch = p.match(/<div className="browser-chrome">[\s\S]*?<\/div>/);
  if (flexMatch) {
    p = p.replace(flexMatch[0], newChrome);
    console.log('  ok killed browser chrome (via flexible match)');
  } else {
    console.log('  ! could not find browser chrome to replace');
  }
}

// ─────────────────────────────────────────────────────────────
// 2. Remove stats section
// ─────────────────────────────────────────────────────────────
// Find the STATS array + its rendering, remove both
// STATS array starts at line 56, rendered around line 1329

// Remove the STATS const array
const statsStart = p.indexOf('const STATS = [');
if (statsStart !== -1) {
  // Find matching close ]
  let depth = 0, i = statsStart;
  while (i < p.length) {
    if (p[i] === '[') depth++;
    else if (p[i] === ']') {
      depth--;
      if (depth === 0) break;
    }
    i++;
  }
  // Find the trailing semicolon
  let endIdx = i + 1;
  while (endIdx < p.length && p[endIdx] !== '\n') endIdx++;
  endIdx++; // include the newline

  p = p.substring(0, statsStart) + p.substring(endIdx);
  console.log('  ok removed STATS const array');
}

// Find and remove the stats rendering JSX
// Look for the section that maps over STATS
const statsRenderMatch = p.match(/\s*\{STATS\.map\(\(stat, i\) => \([\s\S]*?\)\)\}/);
if (statsRenderMatch) {
  p = p.replace(statsRenderMatch[0], '');
  console.log('  ok removed STATS.map rendering');
} else {
  // Try a wider pattern — the section might have surrounding motion.div etc.
  const widerMatch = p.match(/\s*<motion\.div[^>]*>\s*\{STATS\.map[\s\S]*?<\/motion\.div>/);
  if (widerMatch) {
    p = p.replace(widerMatch[0], '');
    console.log('  ok removed stats section (wider match)');
  } else {
    console.log('  - stats rendering pattern not found');
  }
}

// Also remove the section heading that introduces the stats (if any)
// Look for "BY THE NUMBERS" or similar
const statsHeadingMatch = p.match(/\s*<motion\.[hH]2[^>]*>\s*BY THE NUMBERS[\s\S]*?<\/motion\.[hH]2>/);
if (statsHeadingMatch) {
  p = p.replace(statsHeadingMatch[0], '');
  console.log('  ok removed "BY THE NUMBERS" heading');
}

fs.writeFileSync(PAGE, p, 'utf8');

// ─────────────────────────────────────────────────────────────
// 3. Recolor favicon
// ─────────────────────────────────────────────────────────────
['public/icon.svg', 'public/apple-icon.svg'].forEach(f => {
  if (fs.existsSync(f)) {
    let svg = fs.readFileSync(f, 'utf8');
    fs.writeFileSync(f + '.tier23.bak', svg, 'utf8');

    // Replace any color (white, green, etc.) with ochre
    svg = svg.replace(/fill="white"/gi, `fill="${OCHRE}"`);
    svg = svg.replace(/fill="#fff\b/gi, `fill="${OCHRE}"`);
    svg = svg.replace(/fill="#ffffff"/gi, `fill="${OCHRE}"`);
    svg = svg.replace(/fill="#50C878"/gi, `fill="${OCHRE}"`);
    svg = svg.replace(/stroke="white"/gi, `stroke="${OCHRE}"`);
    svg = svg.replace(/stroke="#fff\b/gi, `stroke="${OCHRE}"`);
    svg = svg.replace(/stroke="#ffffff"/gi, `stroke="${OCHRE}"`);
    svg = svg.replace(/stroke="#50C878"/gi, `stroke="${OCHRE}"`);
    svg = svg.replace(/color="white"/gi, `color="${OCHRE}"`);
    svg = svg.replace(/color="#fff\b/gi, `color="${OCHRE}"`);
    svg = svg.replace(/color="#50C878"/gi, `color="${OCHRE}"`);

    fs.writeFileSync(f, svg, 'utf8');
    console.log('  ok recolored ' + f);
  }
});

// ─────────────────────────────────────────────────────────────
// 4. Add Fraunces serif font
// ─────────────────────────────────────────────────────────────
// Patch layout.tsx to import Fraunces from next/font/google
const LAYOUT = 'src/app/layout.tsx';
if (fs.existsSync(LAYOUT)) {
  let l = fs.readFileSync(LAYOUT, 'utf8');
  fs.writeFileSync(LAYOUT + '.tier23.bak', l, 'utf8');

  // Check if Fraunces is already imported
  if (!l.includes('Fraunces')) {
    // Find existing font imports (Inter, Geist, etc.)
    const fontImportMatch = l.match(/import\s+\{\s*([^}]+)\s*\}\s+from\s+"next\/font\/google";/);

    if (fontImportMatch) {
      // Add Fraunces to existing import
      const existingImports = fontImportMatch[1];
      if (!existingImports.includes('Fraunces')) {
        const newImports = existingImports + ', Fraunces';
        l = l.replace(fontImportMatch[0], `import { ${newImports} } from "next/font/google";`);
      }
    } else {
      // Add a new import line at the top
      const firstImport = l.indexOf('import ');
      if (firstImport !== -1) {
        l = l.substring(0, firstImport) +
            'import { Fraunces } from "next/font/google";\n' +
            l.substring(firstImport);
      }
    }

    // Add the font configuration after the existing font config
    // Look for something like: const inter = Inter({...}) or const font = ...
    const fontConfigMatch = l.match(/const\s+(\w+)\s*=\s*\w+\.\w+\(\{[^}]+\}\);/);
    if (fontConfigMatch) {
      const insertAfter = fontConfigMatch.index + fontConfigMatch[0].length;
      const frauncesConfig = `\n\nconst fraunces = Fraunces({\n  subsets: ["latin"],\n  variable: "--font-serif",\n  display: "swap",\n  weight: ["400", "500", "600", "700"],\n  style: ["normal", "italic"],\n});\n`;
      l = l.substring(0, insertAfter) + frauncesConfig + l.substring(insertAfter);
    }

    // Add the font variable to the html tag className
    // Look for className={inter.variable} or similar
    const htmlClassMatch = l.match(/<html\s+lang="en"\s+className=\{([^}]+)\}>/);
    if (htmlClassMatch) {
      const existingClass = htmlClassMatch[1];
      if (!existingClass.includes('fraunces')) {
        const newClass = existingClass + ' + " " + fraunces.variable';
        l = l.replace(htmlClassMatch[0], `<html lang="en" className={${newClass}}>`);
      }
    }

    fs.writeFileSync(LAYOUT, l, 'utf8');
    console.log('  ok added Fraunces serif font to layout.tsx');
  } else {
    console.log('  - Fraunces already imported');
  }
}

// Add CSS variable for serif font in globals.css
const GLOBALS = 'src/app/globals.css';
if (fs.existsSync(GLOBALS)) {
  let g = fs.readFileSync(GLOBALS, 'utf8');
  if (!g.includes('--font-serif')) {
    // Add to :root
    g = g.replace(
      /:root\s*\{/,
      ':root {\n  --font-serif: var(--font-fraunces), Georgia, "Times New Roman", serif;'
    );
    fs.writeFileSync(GLOBALS, g, 'utf8');
    console.log('  ok added --font-serif CSS variable');
  }
}

// Apply serif to case study titles
const HERO = 'src/components/case-study/hero.tsx';
if (fs.existsSync(HERO)) {
  let h = fs.readFileSync(HERO, 'utf8');
  // Add font-serif to the h1
  h = h.replace(
    'className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"',
    'className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-serif)" }}'
  );
  fs.writeFileSync(HERO, h, 'utf8');
  console.log('  ok applied serif to case study hero title');
}

// Apply serif to block headings
const BLOCKS = 'src/components/case-study/blocks.tsx';
if (fs.existsSync(BLOCKS)) {
  let b = fs.readFileSync(BLOCKS, 'utf8');
  // Apply serif to all h2 elements with "text-3xl font-bold tracking-tight"
  b = b.split('className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"').join('className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-serif)" }}');
  b = b.split('className="text-3xl font-bold tracking-tight sm:text-4xl"').join('className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-serif)" }}');
  fs.writeFileSync(BLOCKS, b, 'utf8');
  console.log('  ok applied serif to case study section headings');
}

// Apply serif to next-project title
const NEXT = 'src/components/case-study/next-project.tsx';
if (fs.existsSync(NEXT)) {
  let n = fs.readFileSync(NEXT, 'utf8');
  n = n.replace(
    'className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"',
    'className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl" style={{ fontFamily: "var(--font-serif)" }}'
  );
  fs.writeFileSync(NEXT, n, 'utf8');
  console.log('  ok applied serif to next-project title');
}

// ─────────────────────────────────────────────────────────────
// 5. Replace kicker pills with numbered section labels
// ─────────────────────────────────────────────────────────────
// In blocks.tsx, the GalleryBlock has a pill kicker "In context"
// In section headings (TextBlock, TextImageBlock), the kicker was removed earlier
// Let's add numbered labels to the section blocks

// Actually, the Clay Sky structure we already use doesn't have kicker pills on most sections
// (we made kicker optional earlier). The only remaining pill is in GalleryBlock ("In context")
// Let's replace it with a numbered label

let b = fs.readFileSync(BLOCKS, 'utf8');
const oldGalleryKicker = `<span className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
          In context
        </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Responsive across devices</h2>`;

const newGalleryKicker = `<p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          Gallery
        </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>Responsive across devices</h2>`;

if (b.includes(oldGalleryKicker)) {
  b = b.replace(oldGalleryKicker, newGalleryKicker);
  fs.writeFileSync(BLOCKS, b, 'utf8');
  console.log('  ok replaced gallery kicker pill with simple label');
}

// Same for StatsBlock heading
const oldStatsKicker = `<span className="inline-flex items-center rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            Results &amp; Impact
          </span>`;
// This was already removed in the section component update, but just in case
if (b.includes(oldStatsKicker)) {
  b = b.replace(oldStatsKicker, '<p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Results</p>');
  fs.writeFileSync(BLOCKS, b, 'utf8');
  console.log('  ok replaced stats kicker pill');
}

console.log('\n=== Done ===');
console.log('Test: npm run dev');
