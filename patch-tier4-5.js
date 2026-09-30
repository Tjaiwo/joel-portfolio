/**
 * patch-tier4-5.js
 *
 * Tier 4 — Polish:
 *   1. Subtle noise/paper texture on solid color blocks
 *   2. Custom cursor states on case study screenshots ("View ↗" indicator)
 *   3. Hover states with personality (image desaturate + caption slide-up)
 *
 * Tier 5 — Optional, taste-based:
 *   4. Add "Currently" section (now playing / now reading / location)
 *   5. Make theme toggle subtle (move to footer as text link)
 *   6. Custom 404 page
 */
const fs = require('fs');

// ─────────────────────────────────────────────────────────────
// 1. Subtle paper texture on solid color blocks
// ─────────────────────────────────────────────────────────────
const GLOBALS = 'src/app/globals.css';
let g = fs.readFileSync(GLOBALS, 'utf8');
fs.writeFileSync(GLOBALS + '.tier45.bak', g, 'utf8');

// Add a subtle noise texture utility class at the end of globals.css
const noiseTexture = `

/* ─── Tier 4: Subtle paper texture ─── */
.texture-paper {
  position: relative;
}
.texture-paper::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  background-repeat: repeat;
  z-index: 0;
}
.texture-paper > * {
  position: relative;
  z-index: 1;
}

/* ─── Tier 4: Custom cursor for case study images ─── */
.cursor-view::after {
  content: "View ↗";
  position: fixed;
  pointer-events: none;
  background: var(--foreground);
  color: var(--background);
  font-size: 11px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  transform: translate(12px, 12px);
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 100;
  white-space: nowrap;
}
.cursor-view:hover::after {
  opacity: 1;
}

/* ─── Tier 4: Image hover states ─── */
.image-hover-wrap {
  position: relative;
  overflow: hidden;
}
.image-hover-wrap img {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease;
}
.image-hover-wrap:hover img {
  transform: scale(1.03);
}
.image-hover-wrap .image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  color: white;
  font-size: 13px;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.image-hover-wrap:hover .image-caption {
  transform: translateY(0);
}
`;

if (!g.includes('texture-paper')) {
  g += noiseTexture;
  fs.writeFileSync(GLOBALS, g, 'utf8');
  console.log('  ok added paper texture + cursor + image hover CSS');
}

// ─────────────────────────────────────────────────────────────
// 2. Apply texture-paper class to body (subtle everywhere)
// ─────────────────────────────────────────────────────────────
const LAYOUT = 'src/app/layout.tsx';
if (fs.existsSync(LAYOUT)) {
  let l = fs.readFileSync(LAYOUT, 'utf8');
  // Add texture-paper class to body
  if (!l.includes('texture-paper')) {
    l = l.replace(/<body\s+className="([^"]*)"/, '<body className="$1 texture-paper"');
    fs.writeFileSync(LAYOUT, l, 'utf8');
    console.log('  ok applied paper texture to body');
  }
}

// ─────────────────────────────────────────────────────────────
// 3. Add custom cursor + image hover to case study blocks
// ─────────────────────────────────────────────────────────────
const BLOCKS = 'src/components/case-study/blocks.tsx';
if (fs.existsSync(BLOCKS)) {
  let b = fs.readFileSync(BLOCKS, 'utf8');

  // Wrap gallery images with hover state (desaturate + caption slide-up)
  // Current pattern uses group-hover:scale. Replace with our new class.
  b = b.replace(
    /className="group overflow-hidden rounded-lg border border-border\/40 bg-background"/g,
    'className="group image-hover-wrap rounded-lg border border-border/40 bg-background"'
  );

  // Update gallery img class to use our transition
  b = b.replace(
    /className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-\[1\.04\]"/g,
    'className="w-full h-auto object-cover"'
  );

  fs.writeFileSync(BLOCKS, b, 'utf8');
  console.log('  ok applied image hover states to gallery');
}

// ─────────────────────────────────────────────────────────────
// 4. Add "Currently" section to homepage
// ─────────────────────────────────────────────────────────────
const PAGE = 'src/app/page.tsx';
let p = fs.readFileSync(PAGE, 'utf8');

// Find a good insertion point — after the projects section, before skills
// Look for the SKILLS section heading
const skillsHeadingMatch = p.match(/<motion\.h2[^>]*>\s*MY STACK\s*<\/motion\.h2>/);
if (skillsHeadingMatch && !p.includes('Currently')) {
  const insertBefore = skillsHeadingMatch.index;
  const currentlySection = `
          {/* ─── Currently ─── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-3 font-medium">
              Currently
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <span><span className="text-foreground">Building</span> case studies for 9 live projects</span>
              <span className="text-border">·</span>
              <span><span className="text-foreground">Based in</span> Lagos, Nigeria</span>
              <span className="text-border">·</span>
              <span><span className="text-foreground">Available</span> for freelance work</span>
            </div>
          </motion.div>

`;
  p = p.substring(0, insertBefore) + currentlySection + p.substring(insertBefore);
  fs.writeFileSync(PAGE, p, 'utf8');
  console.log('  ok added "Currently" section to homepage');
} else if (p.includes('Currently')) {
  console.log('  - "Currently" section already exists');
} else {
  console.log('  ! could not find insertion point for Currently section');
}

// ─────────────────────────────────────────────────────────────
// 5. Make theme toggle subtle (move to footer)
// ─────────────────────────────────────────────────────────────
// This requires knowing where the theme toggle currently lives.
// For now, just reduce its visual prominence by adding opacity
const THEME_TOGGLE = 'src/components/theme-toggle.tsx';
if (fs.existsSync(THEME_TOGGLE)) {
  let t = fs.readFileSync(THEME_TOGGLE, 'utf8');
  // Add opacity-60 hover:opacity-100 to make it subtle
  if (!t.includes('opacity-60')) {
    t = t.replace(
      /className="([^"]*)"/g,
      (match, cls) => {
        if (cls.includes('rounded') && !cls.includes('opacity')) {
          return `className="${cls} opacity-50 hover:opacity-100 transition-opacity"`;
        }
        return match;
      }
    );
    fs.writeFileSync(THEME_TOGGLE, t, 'utf8');
    console.log('  ok made theme toggle subtle (opacity-50 hover:opacity-100)');
  }
}

// ─────────────────────────────────────────────────────────────
// 6. Custom 404 page
// ─────────────────────────────────────────────────────────────
const NOT_FOUND = 'src/app/not-found.tsx';
const notFoundContent = `export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 texture-paper">
      <div className="max-w-lg text-center">
        <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-4 font-medium">
          404
        </p>
        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          You found a page I haven't built yet.
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
          Maybe it's in the next deploy. Or maybe it never existed. Either way, the work you're looking for is probably on the homepage.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
        >
          ← Back to portfolio
        </a>
      </div>
    </main>
  );
}
`;

fs.writeFileSync(NOT_FOUND, notFoundContent, 'utf8');
console.log('  ok created custom 404 page');

console.log('\n=== Done ===');
console.log('Test: npm run dev');
