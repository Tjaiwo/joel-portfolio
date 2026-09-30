/**
 * extract-back-to-top.js
 *
 * 1. Writes the existing BackToTop component (with green progress ring + percentage)
 *    to src/components/back-to-top.tsx as a clean, self-contained module.
 * 2. Removes the inline `function BackToTop()` definition from src/app/page.tsx.
 * 3. Verifies layout.tsx still imports it (it should from the previous patch).
 */
const fs = require('fs');

// ─────────────────────────────────────────────────────────────
// 1. Write the shared component file
// ─────────────────────────────────────────────────────────────
console.log('1. Writing src/components/back-to-top.tsx...');

const componentContent = `"use client";

import { useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    setVisible(v > 0.06);
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = useTransform(smoothProgress, (v) => circumference - v * circumference);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.4, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.4, rotate: 180 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[90] group cursor-pointer"
          aria-label="Back to top"
        >
          {/* Outer glow on hover */}
          <div
            className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
            style={{ background: "radial-gradient(circle, rgba(80,200,120,0.2) 0%, transparent 70%)" }}
          />

          {/* Main circle */}
          <div className="relative w-[52px] h-[52px] rounded-full border border-border bg-background/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:border-[#50C878]/50 group-hover:bg-background/95 group-hover:shadow-[0_0_20px_rgba(80,200,120,0.15)]">
            {/* SVG progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
              <motion.circle
                cx="26" cy="26" r={radius}
                fill="none"
                stroke="#50C878"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{ strokeDashoffset: dashOffset }}
              />
            </svg>

            {/* Percentage text */}
            <motion.span
              animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.6 : 1 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-mono font-bold text-[#50C878] tabular-nums select-none"
            >
              {Math.round(smoothProgress.get() * 100)}
            </motion.span>

            {/* Arrow icon (appears on hover) */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6, scale: hovered ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute text-[#50C878]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
`;

fs.writeFileSync('src/components/back-to-top.tsx', componentContent, 'utf8');
console.log('   ok src/components/back-to-top.tsx written (' + componentContent.length + ' bytes)');

// ─────────────────────────────────────────────────────────────
// 2. Remove the inline BackToTop from page.tsx
// ─────────────────────────────────────────────────────────────
console.log('\n2. Removing inline BackToTop from src/app/page.tsx...');

const pageFile = 'src/app/page.tsx';
if (!fs.existsSync(pageFile)) {
  console.error('   ! src/app/page.tsx not found');
  process.exit(1);
}

let pageSrc = fs.readFileSync(pageFile, 'utf8');
fs.writeFileSync(pageFile + '.btt-extract.bak', pageSrc, 'utf8');

// Find the BackToTop function block and remove it
// Pattern: function BackToTop() { ... }
// Match from "function BackToTop()" to the matching closing "}"
const functionStart = pageSrc.indexOf('function BackToTop()');
if (functionStart === -1) {
  console.log('   - No inline BackToTop function found in page.tsx (already extracted?)');
} else {
  // Find the matching closing brace
  let depth = 0;
  let i = pageSrc.indexOf('{', functionStart);
  let end = -1;
  for (; i < pageSrc.length; i++) {
    if (pageSrc[i] === '{') depth++;
    else if (pageSrc[i] === '}') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }

  if (end !== -1) {
    // Capture the block plus any trailing newline
    let removeEnd = end;
    while (removeEnd < pageSrc.length && /[\n\r]/.test(pageSrc[removeEnd])) removeEnd++;

    pageSrc = pageSrc.substring(0, functionStart) + pageSrc.substring(removeEnd);
    console.log('   ok removed inline BackToTop function (' + (end - functionStart) + ' bytes)');
  } else {
    console.error('   ! Could not find matching closing brace for BackToTop function');
  }
}

// Add import for BackToTop if not already present
if (!pageSrc.includes('import { BackToTop }') && !pageSrc.includes('from "@/components/back-to-top"')) {
  // Find the last import line and add after it
  const lastImport = pageSrc.lastIndexOf('import ');
  if (lastImport !== -1) {
    const lineEnd = pageSrc.indexOf('\n', lastImport);
    pageSrc =
      pageSrc.substring(0, lineEnd + 1) +
      'import { BackToTop } from "@/components/back-to-top";\n' +
      pageSrc.substring(lineEnd + 1);
    console.log('   ok added BackToTop import to page.tsx');
  }
}

// Ensure <BackToTop /> is rendered in page.tsx (in case it was removed before)
if (!pageSrc.includes('<BackToTop')) {
  // Find </main> or </div> that wraps the main content, insert before it
  const mainClose = pageSrc.lastIndexOf('</main>');
  if (mainClose !== -1) {
    pageSrc =
      pageSrc.substring(0, mainClose) +
      '      <BackToTop />\n    ' +
      pageSrc.substring(mainClose);
    console.log('   ok added <BackToTop /> render in page.tsx');
  } else {
    // Try </div> at the end
    const lastDiv = pageSrc.lastIndexOf('</div>');
    if (lastDiv !== -1) {
      pageSrc =
        pageSrc.substring(0, lastDiv) +
        '      <BackToTop />\n    ' +
        pageSrc.substring(lastDiv);
      console.log('   ok added <BackToTop /> render in page.tsx (before last </div>)');
    }
  }
} else {
  console.log('   - <BackToTop /> already rendered in page.tsx');
}

fs.writeFileSync(pageFile, pageSrc, 'utf8');

// ─────────────────────────────────────────────────────────────
// 3. Verify layout.tsx still has BackToTop (from previous patch)
// ─────────────────────────────────────────────────────────────
console.log('\n3. Verifying layout.tsx...');

const layoutFile = 'src/app/layout.tsx';
if (fs.existsSync(layoutFile)) {
  const layoutSrc = fs.readFileSync(layoutFile, 'utf8');

  if (layoutSrc.includes('BackToTop')) {
    console.log('   ok BackToTop is already in layout.tsx');
    console.log('   NOTE: This will cause duplicate buttons on homepage (one in page.tsx, one in layout.tsx)');

    // Since the user wants it "across the whole website", and it's now in layout.tsx,
    // we should remove it from page.tsx to avoid duplication
    if (pageSrc.includes('<BackToTop') && pageSrc.includes('import { BackToTop }')) {
      console.log('   Removing <BackToTop /> from page.tsx to avoid duplication...');
      // Remove the JSX render
      pageSrc = pageSrc.replace(/\s*<BackToTop\s*\/>\s*\n?/g, '');
      // Remove the import
      pageSrc = pageSrc.replace(/import \{ BackToTop \} from "@\/components\/back-to-top";\n?/g, '');
      fs.writeFileSync(pageFile, pageSrc, 'utf8');
      console.log('   ok removed BackToTop render + import from page.tsx');
    }
  } else {
    console.log('   - BackToTop not yet in layout.tsx, adding...');

    let newLayout = layoutSrc;
    fs.writeFileSync(layoutFile + '.btt-extract.bak', layoutSrc, 'utf8');

    // Add import
    if (!newLayout.includes('import { BackToTop }')) {
      const lastImport = newLayout.lastIndexOf('import ');
      if (lastImport !== -1) {
        const lineEnd = newLayout.indexOf('\n', lastImport);
        newLayout =
          newLayout.substring(0, lineEnd + 1) +
          'import { BackToTop } from "@/components/back-to-top";\n' +
          newLayout.substring(lineEnd + 1);
      }
    }

    // Add <BackToTop /> before </body>
    const bodyClose = newLayout.indexOf('</body>');
    if (bodyClose !== -1) {
      newLayout =
        newLayout.substring(0, bodyClose) +
        '      <BackToTop />\n    ' +
        newLayout.substring(bodyClose);
    }

    fs.writeFileSync(layoutFile, newLayout, 'utf8');
    console.log('   ok BackToTop added to layout.tsx');

    // Now remove BackToTop from page.tsx since it's in layout
    if (pageSrc.includes('<BackToTop')) {
      console.log('   Removing duplicate BackToTop from page.tsx...');
      pageSrc = pageSrc.replace(/\s*<BackToTop\s*\/>\s*\n?/g, '');
      pageSrc = pageSrc.replace(/import \{ BackToTop \} from "@\/components\/back-to-top";\n?/g, '');
      fs.writeFileSync(pageFile, pageSrc, 'utf8');
      console.log('   ok removed duplicate from page.tsx');
    }
  }
}

console.log('\n=== Done ===');
console.log('Backups:');
console.log('  - src/app/page.tsx.btt-extract.bak');
console.log('  - src/app/layout.tsx.btt-extract.bak (if created)');
console.log('\nTest with: npm run dev');
console.log('The green scroll-percentage button should now appear on:');
console.log('  - Homepage');
console.log('  - /projects/elin-group');
console.log('  - /projects/elin-air');
console.log('  - /projects/mediapool');
