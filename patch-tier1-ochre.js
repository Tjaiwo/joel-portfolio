/**
 * patch-tier1-ochre.js
 *
 * Tier 1 changes + warm editorial ochre palette:
 *   1. Replace unicode nav icons with Lucide icons
 *   2. Soften typography (drop font-mono on nav, reduce tracking)
 *   3. Replace green (#50C878 / emerald) with warm ochre (#B8956A)
 *      across globals.css, back-to-top, case-study hero badge
 *   4. Recolor logo SVG to ochre
 */
const fs = require('fs');

const OCHRE = '#B8956A';
const OCHRE_DARK = '#9B7E50'; // darker for hover states
const OCHRE_RGB = '184, 149, 106'; // for rgba() expressions

// ─────────────────────────────────────────────────────────────
// 1. Patch globals.css — replace all green color references
// ─────────────────────────────────────────────────────────────
const GLOBALS = 'src/app/globals.css';
if (fs.existsSync(GLOBALS)) {
  let g = fs.readFileSync(GLOBALS, 'utf8');
  fs.writeFileSync(GLOBALS + '.ochre.bak', g, 'utf8');

  // Dark mode primary
  g = g.replace(/--primary:\s*#50C878;/g, `--primary: ${OCHRE};`);
  g = g.replace(/--ring:\s*#50C878;/g, `--ring: ${OCHRE};`);
  g = g.replace(/--chart-1:\s*#50C878;/g, `--chart-1: ${OCHRE};`);

  // Light mode primary (was #2da55e)
  g = g.replace(/--primary:\s*#2da55e;/g, `--primary: ${OCHRE_DARK};`);

  // Linear gradient background (line 916)
  g = g.replace(
    /background:\s*linear-gradient\(135deg,\s*#0a2a0a 0%,\s*#50C878 50%,\s*#0a2a0a 100%\)/g,
    `background: linear-gradient(135deg, #2a1f0a 0%, ${OCHRE} 50%, #2a1f0a 100%)`
  );

  // Direct color/border (lines 932-933)
  g = g.replace(/color:\s*#50C878;/g, `color: ${OCHRE};`);
  g = g.replace(/border:\s*1px solid #50C878;/g, `border: 1px solid ${OCHRE};`);

  fs.writeFileSync(GLOBALS, g, 'utf8');
  console.log('  ok globals.css: replaced #50C878 -> ' + OCHRE);
}

// ─────────────────────────────────────────────────────────────
// 2. Patch back-to-top.tsx — replace green with ochre
// ─────────────────────────────────────────────────────────────
const BACK_TO_TOP = 'src/components/back-to-top.tsx';
if (fs.existsSync(BACK_TO_TOP)) {
  let b = fs.readFileSync(BACK_TO_TOP, 'utf8');
  fs.writeFileSync(BACK_TO_TOP + '.ochre.bak', b, 'utf8');

  // Replace all hardcoded #50C878 references
  b = b.split('#50C878').join(OCHRE);
  // Replace rgba(80,200,120,0.15) hover shadow
  b = b.replace(/rgba\(80,\s*200,\s*120,\s*0\.15\)/g, `rgba(${OCHRE_RGB}, 0.15)`);
  b = b.replace(/rgba\(80,\s*200,\s*120,\s*0\.2\)/g, `rgba(${OCHRE_RGB}, 0.2)`);
  // Replace the radial gradient in the outer glow
  b = b.replace(
    /radial-gradient\(circle,\s*rgba\(80,\s*200,\s*120,\s*0\.2\) 0%,\s*transparent 70%\)/g,
    `radial-gradient(circle, rgba(${OCHRE_RGB}, 0.2) 0%, transparent 70%)`
  );

  fs.writeFileSync(BACK_TO_TOP, b, 'utf8');
  console.log('  ok back-to-top.tsx: replaced green with ochre');
}

// ─────────────────────────────────────────────────────────────
// 3. Patch case-study/hero.tsx — replace emerald with ochre
// ─────────────────────────────────────────────────────────────
const HERO = 'src/components/case-study/hero.tsx';
if (fs.existsSync(HERO)) {
  let h = fs.readFileSync(HERO, 'utf8');
  fs.writeFileSync(HERO + '.ochre.bak', h, 'utf8');

  // Replace emerald-500 with the ochre hex (Tailwind doesn't have ochre by default)
  // Using arbitrary value syntax: text-[#B8956A]
  h = h.replace(/border-emerald-500\/30/g, `border-[${OCHRE}]/30`);
  h = h.replace(/bg-emerald-500\/10/g, `bg-[${OCHRE}]/10`);
  h = h.replace(/text-emerald-500/g, `text-[${OCHRE}]`);
  h = h.replace(/bg-emerald-500/g, `bg-[${OCHRE}]`);

  fs.writeFileSync(HERO, h, 'utf8');
  console.log('  ok hero.tsx: replaced emerald-500 with ochre');
}

// ─────────────────────────────────────────────────────────────
// 4. Recolor logo.svg
// ─────────────────────────────────────────────────────────────
const LOGO = 'public/logo.svg';
if (fs.existsSync(LOGO)) {
  let l = fs.readFileSync(LOGO, 'utf8');
  fs.writeFileSync(LOGO + '.ochre.bak', l, 'utf8');

  // Replace any fill, stroke, or color attribute that's white/light/green with ochre
  // Common patterns: fill="white", fill="#fff", fill="#ffffff", stroke="white", etc.
  l = l.replace(/fill="white"/gi, `fill="${OCHRE}"`);
  l = l.replace(/fill="#fff\b/gi, `fill="${OCHRE}"`);
  l = l.replace(/fill="#ffffff"/gi, `fill="${OCHRE}"`);
  l = l.replace(/fill="#50C878"/gi, `fill="${OCHRE}"`);
  l = l.replace(/stroke="white"/gi, `stroke="${OCHRE}"`);
  l = l.replace(/stroke="#fff\b/gi, `stroke="${OCHRE}"`);
  l = l.replace(/stroke="#ffffff"/gi, `stroke="${OCHRE}"`);
  l = l.replace(/stroke="#50C878"/gi, `stroke="${OCHRE}"`);
  l = l.replace(/color="white"/gi, `color="${OCHRE}"`);
  l = l.replace(/color="#fff\b/gi, `color="${OCHRE}"`);

  // Also handle CSS-in-SVG: style="fill: white" or style="stroke: #fff"
  l = l.replace(/fill:\s*white/gi, `fill: ${OCHRE}`);
  l = l.replace(/fill:\s*#fff\b/gi, `fill: ${OCHRE}`);
  l = l.replace(/fill:\s*#ffffff/gi, `fill: ${OCHRE}`);
  l = l.replace(/fill:\s*#50C878/gi, `fill: ${OCHRE}`);
  l = l.replace(/stroke:\s*white/gi, `stroke: ${OCHRE}`);
  l = l.replace(/stroke:\s*#fff\b/gi, `stroke: ${OCHRE}`);
  l = l.replace(/stroke:\s*#ffffff/gi, `stroke: ${OCHRE}`);

  fs.writeFileSync(LOGO, l, 'utf8');
  console.log('  ok logo.svg: recolored to ochre');
} else {
  console.log('  ! logo.svg not found at public/logo.svg');
}

// ─────────────────────────────────────────────────────────────
// 5. Patch page.tsx — replace unicode nav icons with Lucide
// ─────────────────────────────────────────────────────────────
const PAGE = 'src/app/page.tsx';
if (fs.existsSync(PAGE)) {
  let p = fs.readFileSync(PAGE, 'utf8');
  fs.writeFileSync(PAGE + '.ochre.bak', p, 'utf8');

  // Add Lucide imports if not present
  // Find the existing lucide-react import line
  const lucideImportMatch = p.match(/from "lucide-react";/);
  if (lucideImportMatch) {
    // Check which icons are already imported
    const importLineMatch = p.match(/import \{([^}]+)\} from "lucide-react";/);
    if (importLineMatch) {
      const imports = importLineMatch[1];
      const needed = ['Home', 'CircleUser', 'LayoutGrid', 'Briefcase', 'Mail'];
      const missing = needed.filter(n => !imports.includes(n));
      if (missing.length > 0) {
        const newImports = imports + ', ' + missing.join(', ');
        p = p.replace(importLineMatch[0], `import { ${newImports} } from "lucide-react";`);
        console.log('  ok added Lucide imports: ' + missing.join(', '));
      }
    }
  }

  // Replace the NAV_ITEMS icon strings with Lucide component references
  // Old: { id: "home", label: "Home", icon: "\u2302" }
  // New: { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> }
  //
  // The icon field might be rendered as {item.icon} which works for both strings and JSX
  // but if it's rendered as <span>{item.icon}</span> we need to make sure JSX is supported

  // Replace each icon value
  p = p.replace(/icon:\s*"\\u2302"/g, 'icon: <Home className="h-4 w-4" />');
  p = p.replace(/icon:\s*"\\u25C9"/g, 'icon: <CircleUser className="h-4 w-4" />');
  p = p.replace(/icon:\s*"\\u25C8"/g, 'icon: <LayoutGrid className="h-4 w-4" />');
  p = p.replace(/icon:\s*"\\u25CE"/g, 'icon: <Briefcase className="h-4 w-4" />');
  p = p.replace(/icon:\s*"\\u2726"/g, 'icon: <Mail className="h-4 w-4" />');

  // Also try literal unicode chars in case they're not escaped
  p = p.replace(/icon:\s*"⌂"/g, 'icon: <Home className="h-4 w-4" />');
  p = p.replace(/icon:\s*"◉"/g, 'icon: <CircleUser className="h-4 w-4" />');
  p = p.replace(/icon:\s*"◈"/g, 'icon: <LayoutGrid className="h-4 w-4" />');
  p = p.replace(/icon:\s*"◎"/g, 'icon: <Briefcase className="h-4 w-4" />');
  p = p.replace(/icon:\s*"✦"/g, 'icon: <Mail className="h-4 w-4" />');

  fs.writeFileSync(PAGE, p, 'utf8');
  console.log('  ok page.tsx: replaced unicode nav icons with Lucide components');
}

// ─────────────────────────────────────────────────────────────
// 6. Soften typography — reduce tracking-[0.2em] to tracking-[0.08em]
// ─────────────────────────────────────────────────────────────
const filesToSoften = [
  'src/app/page.tsx',
  'src/components/case-study/hero.tsx',
  'src/components/case-study/blocks.tsx',
  'src/components/case-study/intro.tsx',
  'src/components/case-study/next-project.tsx',
];

let softenedCount = 0;
for (const f of filesToSoften) {
  if (!fs.existsSync(f)) continue;
  let content = fs.readFileSync(f, 'utf8');

  // Reduce tracking from 0.2em to 0.08em (less "screaming uppercase")
  const before = content.length;
  content = content.split('tracking-[0.2em]').join('tracking-[0.08em]');
  content = content.split('tracking-[0.18em]').join('tracking-[0.08em]');
  content = content.split('tracking-[0.14em]').join('tracking-[0.08em]');

  if (content.length !== before) {
    fs.writeFileSync(f, content, 'utf8');
    softenedCount++;
    console.log('  ok softened typography in ' + f.split('/').pop());
  }
}
if (softenedCount === 0) {
  console.log('  - no tracking changes needed');
}

console.log('\n=== Done ===');
console.log('Test: npm run dev');
console.log('Verify:');
console.log('  - Logo in top-left should now be ochre instead of white');
console.log('  - Nav icons should be Lucide line icons (not unicode chars)');
console.log('  - Status badge on case studies should be ochre');
console.log('  - Back-to-top button should be ochre with ochre progress ring');
