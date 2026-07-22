const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add r to all return objects in getCurrencyFromTimezone
// Pattern 1: NGN path
p = p.replace(
  /return \{ symbol: cfg\.s, code: cfg\.c, ranges: makeRanges\(cfg\.s, cfg\.r, NGN_THRESHOLDS\) \};/g,
  'return { symbol: cfg.s, code: cfg.c, r: cfg.r, ranges: makeRanges(cfg.s, cfg.r, NGN_THRESHOLDS) };'
);

// Pattern 2: standard path with cfg
p = p.replace(
  /return \{ symbol: cfg\.s, code: cfg\.c, ranges: makeRanges\(cfg\.s, cfg\.r\) \};/g,
  'return { symbol: cfg.s, code: cfg.c, r: cfg.r, ranges: makeRanges(cfg.s, cfg.r) };'
);

// Pattern 3: NGN path with cfg2
p = p.replace(
  /return \{ symbol: cfg2\.s, code: cfg2\.c, ranges: makeRanges\(cfg2\.s, cfg2\.r, NGN_THRESHOLDS\) \};/g,
  'return { symbol: cfg2.s, code: cfg2.c, r: cfg2.r, ranges: makeRanges(cfg2.s, cfg2.r, NGN_THRESHOLDS) };'
);

// Pattern 4: standard path with cfg2
p = p.replace(
  /return \{ symbol: cfg2\.s, code: cfg2\.c, ranges: makeRanges\(cfg2\.s, cfg2\.r\) \};/g,
  'return { symbol: cfg2.s, code: cfg2.c, r: cfg2.r, ranges: makeRanges(cfg2.s, cfg2.r) };'
);

// Pattern 5: regionFallback with cfg3
p = p.replace(
  /return \{ symbol: cfg3\.s, code: cfg3\.c, ranges: makeRanges\(cfg3\.s, cfg3\.r\) \};/g,
  'return { symbol: cfg3.s, code: cfg3.c, r: cfg3.r, ranges: makeRanges(cfg3.s, cfg3.r) };'
);

// Pattern 6: DEFAULT_CURRENCY
p = p.replace(
  /const DEFAULT_CURRENCY = \{ symbol: "\$", code: "USD", ranges: makeRanges\("\$", 1\) \};/,
  'const DEFAULT_CURRENCY = { symbol: "$", code: "USD", r: 1, ranges: makeRanges("$", 1) };'
);

// Pattern 7: fallback return at end
p = p.replace(
  /return \{ symbol: "\$", code: "USD", ranges: makeRanges\("\$", 1\) \};/g,
  'return { symbol: "$", code: "USD", r: 1, ranges: makeRanges("$", 1) };'
);

console.log('✅ Added r (rate) property to all currency objects');
fs.writeFileSync('src/app/page.tsx', p);
