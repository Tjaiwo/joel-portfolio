const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

const rule = `
/* === MOBILE SPACING OVERRIDES === */
@media (max-width: 767px) {
  /* Hero section */
  section#home {
    padding-top: 116px !important;
    padding-bottom: calc(5rem - 4px) !important;
  }

  /* All other sections */
  section:not(#home) {
    padding-top: calc(6rem - 4px) !important;
    padding-bottom: calc(6rem - 4px) !important;
  }

  /* Reduce vertical spacing between elements */
  .space-y-6 > * + * { margin-top: calc(1.5rem - 4px) !important; }
  .space-y-8 > * + * { margin-top: calc(2rem - 4px) !important; }
  .space-y-12 > * + * { margin-top: calc(3rem - 4px) !important; }

  /* Reduce gap in grids and flex containers */
  .gap-6 { gap: calc(1.5rem - 4px) !important; }
  .gap-8 { gap: calc(2rem - 4px) !important; }
  .gap-12 { gap: calc(3rem - 4px) !important; }

  /* Reduce padding on containers */
  .px-6 { padding-left: calc(1.5rem - 4px) !important; padding-right: calc(1.5rem - 4px) !important; }
  .px-8 { padding-left: calc(2rem - 4px) !important; padding-right: calc(2rem - 4px) !important; }
  .py-6 { padding-top: calc(1.5rem - 4px) !important; padding-bottom: calc(1.5rem - 4px) !important; }
  .py-8 { padding-top: calc(2rem - 4px) !important; padding-bottom: calc(2rem - 4px) !important; }

  /* Reduce margins */
  .mb-6 { margin-bottom: calc(1.5rem - 4px) !important; }
  .mb-8 { margin-bottom: calc(2rem - 4px) !important; }
  .mb-12 { margin-bottom: calc(3rem - 4px) !important; }
  .mt-6 { margin-top: calc(1.5rem - 4px) !important; }
  .mt-8 { margin-top: calc(2rem - 4px) !important; }
  .mt-12 { margin-top: calc(3rem - 4px) !important; }
}`;

if (css.includes('MOBILE SPACING OVERRIDES')) {
  css = css.replace(/\/\* === MOBILE SPACING OVERRIDES.*?\*\/[\s\S]*?(?=\n\/\*|$)/, rule.trim());
  console.log('✓ Replaced existing MOBILE SPACING OVERRIDES block');
} else if (css.includes('MOBILE OVERRIDES')) {
  css = css.replace(/\/\* === MOBILE OVERRIDES.*?\*\/[\s\S]*?(?=\n\/\*|$)/, rule.trim());
  console.log('✓ Replaced old MOBILE OVERRIDES block');
} else {
  css += '\n' + rule + '\n';
  console.log('✓ Appended MOBILE SPACING OVERRIDES block');
}

fs.writeFileSync('src/app/globals.css', css);
console.log('Done - targeted spacing reduction only');
