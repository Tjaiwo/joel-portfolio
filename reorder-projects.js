/**
 * reorder-projects.js
 *
 * Reorders the PROJECTS[] array in page.tsx so the order is:
 *   1. elin-group
 *   2. elin-air
 *   3. mediapool
 *   4. clayton-prints   ← NEW position
 *   5. evan-micky       ← NEW position
 *   6. diamond-source
 *   7. designed-spaces
 *   8. cedar-rush
 *
 * Strategy: find each block by slug, then rebuild the array in the target order.
 * Also reassigns id: fields to match the new order.
 */
const fs = require('fs');
const F = 'src/app/page.tsx';

if (!fs.existsSync(F)) {
  console.error('Cannot find ' + F);
  process.exit(1);
}

let s = fs.readFileSync(F, 'utf8');
fs.writeFileSync(F + '.reorder.bak', s, 'utf8');

// Find PROJECTS array
const startIdx = s.indexOf('const PROJECTS = [');
if (startIdx === -1) {
  console.error('Cannot find PROJECTS array');
  process.exit(1);
}

let depth = 0, i = startIdx, endIdx = -1;
while (i < s.length) {
  if (s[i] === '[') depth++;
  else if (s[i] === ']') {
    depth--;
    if (depth === 0) { endIdx = i; break; }
  }
  i++;
}

const beforeArr = s.substring(0, startIdx);
const afterArr = s.substring(endIdx + 1);
const arrText = s.substring(startIdx, endIdx + 1);

// Find each block by slug + capture its trailing comma/whitespace
function findBlockWithTrailing(src, slug) {
  const needle = 'slug: "' + slug + '"';
  const idx = src.indexOf(needle);
  if (idx === -1) return null;
  let start = idx;
  while (start > 0 && src[start] !== '{') start--;
  let d = 0, end = start;
  for (let j = start; j < src.length; j++) {
    if (src[j] === '{') d++;
    if (src[j] === '}') {
      d--;
      if (d === 0) { end = j; break; }
    }
  }
  let endPlus = end + 1;
  while (endPlus < src.length && /[, \t\n]/.test(src[endPlus])) endPlus++;
  return {
    start, end, endPlus,
    text: src.substring(start, end + 1),
    textWithTrailing: src.substring(start, endPlus)
  };
}

// The target order (by slug)
const targetOrder = [
  'elin-group',
  'elin-air',
  'mediapool',
  'clayton-prints',
  'evan-micky',
  'diamond-source',
  'designed-spaces',
  'cedar-rush',
];

// Find all blocks (some slugs may not exist — we'll handle gracefully)
const blocks = {};
for (const slug of targetOrder) {
  const block = findBlockWithTrailing(arrText, slug);
  if (block) {
    blocks[slug] = block;
    console.log('  found: ' + slug);
  } else {
    console.warn('  ! not found: ' + slug + ' (skipping)');
  }
}

// Reassign IDs based on position in target order
const orderedSlugs = targetOrder.filter(slug => blocks[slug]);
let newArrText = arrText;

// We need to rebuild the array content. Strategy:
// 1. Find the array content between [ and ]
// 2. Replace the entire content with the blocks in target order
const arrContentStart = arrText.indexOf('[') + 1;
const arrContentEnd = arrText.lastIndexOf(']');

// Build new content
let newContent = '\n';
orderedSlugs.forEach((slug, idx) => {
  let blockText = blocks[slug].text;
  // Reassign ID
  const newId = idx + 1;
  blockText = blockText.replace(/(id:\s*)\d+/, '$1' + newId);
  newContent += '  ' + blockText + ',\n';
});

newArrText = arrText.substring(0, arrContentStart) + newContent + arrText.substring(arrContentEnd);

const finalSrc = beforeArr + newArrText + afterArr;
fs.writeFileSync(F, finalSrc, 'utf8');

console.log('\n=== Resulting PROJECTS order ===');
orderedSlugs.forEach((slug, idx) => console.log('  ' + (idx + 1) + '. ' + slug + ' (id: ' + (idx + 1) + ')'));

console.log('\n=== Done ===');
