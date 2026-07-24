const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// For each variant usage, we need to add whileInView and viewport
// Pattern: variants={fadeInUp} -> add whileInView and viewport

// Replace all instances of variants={fadeInUp} custom={N} with scroll-triggered versions
// We'll add whileInView="visible" and viewport={{ once: true, margin: "-100px" }}

let count = 0;

// Replace: variants={fadeInUp} (standalone, no custom)
p = p.replace(/variants=\{fadeInUp\}(?!\s*custom)/g, (match) => {
  count++;
  return 'variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}';
});

// Replace: variants={fadeInUp} custom={N}
p = p.replace(/variants=\{fadeInUp\}\s*custom=\{(\d+(?:\s*[+\-*/]\s*\w+)?)\}/g, (match, custom) => {
  count++;
  return `variants={fadeInUp} custom={${custom}} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}`;
});

// Replace: variants={slideInLeft}
p = p.replace(/variants=\{slideInLeft\}/g, (match) => {
  count++;
  return 'variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}';
});

// Replace: variants={staggerContainer}
p = p.replace(/variants=\{staggerContainer\}/g, (match) => {
  count++;
  return 'variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}';
});

console.log(`✅ Added scroll-triggered reveal to ${count} elements`);
fs.writeFileSync('src/app/page.tsx', p);
