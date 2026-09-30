/**
 * final-fix.js
 *
 * One-shot fixer that:
 *   1. Restores any corrupted `2,` / `1,` lines back to `id: 2,`
 *   2. Verifies swap state (elin-group should be #1, elin-air should be #2)
 *   3. Ensures CASE_STUDY_SLUGS const exists
 *   4. Re-inserts the "View Case Study" CTA in the RIGHT place (right after the title row)
 *   5. Verifies all changes by printing the resulting state
 */
const fs = require('fs');
const F = 'src/app/page.tsx';

if (!fs.existsSync(F)) {
  console.error('Cannot find ' + F);
  process.exit(1);
}

let s = fs.readFileSync(F, 'utf8');
fs.writeFileSync(F + '.final.bak', s, 'utf8');
console.log('Backup saved: ' + F + '.final.bak\n');

// ─────────────────────────────────────────────────────────────
// STEP 1: Restore corrupted `id:` lines (caused by previous bash $1 expansion)
// Pattern: a line containing only a number and comma, immediately before "slug:"
// ─────────────────────────────────────────────────────────────
let step1Count = 0;
s = s.replace(
  /(\{[^}]*?)\n\s*(\d+),\s*\n\s*(slug:)/g,
  (match, prefix, num, slug) => {
    step1Count++;
    return prefix + '\n    id: ' + num + ',\n    ' + slug;
  }
);
console.log('Step 1: Restored ' + step1Count + ' corrupted id: line(s)');

// ─────────────────────────────────────────────────────────────
// STEP 2: Verify PROJECTS array is well-formed, then swap if needed
// ─────────────────────────────────────────────────────────────
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
if (endIdx === -1) {
  console.error('Cannot find end of PROJECTS array');
  process.exit(1);
}

const arrText = s.substring(startIdx, endIdx + 1);
const beforeArr = s.substring(0, startIdx);
const afterArr = s.substring(endIdx + 1);

// Extract slug order in the array
const slugRegex = /slug:\s*"([^"]+)"/g;
const slugs = [];
let m;
while ((m = slugRegex.exec(arrText)) !== null) {
  slugs.push(m[1]);
}

console.log('\nCurrent PROJECTS slug order:');
slugs.forEach((slug, idx) => console.log('  ' + (idx + 1) + '. ' + slug));

const elinAirIdx = slugs.indexOf('elin-air');
const elinGroupIdx = slugs.indexOf('elin-group');

if (elinAirIdx === -1 || elinGroupIdx === -1) {
  console.error('Cannot find both elin-air and elin-group slugs');
  process.exit(1);
}

// We want elin-group to come BEFORE elin-air (swap if not)
let arrTextNew = arrText;
if (elinGroupIdx > elinAirIdx) {
  console.log('\nSwap needed: elin-air is currently before elin-group');
  console.log('Performing swap...');

  // Find each block (including trailing comma+whitespace)
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

  const airBlock = findBlockWithTrailing(arrTextNew, 'elin-air');
  const groupBlock = findBlockWithTrailing(arrTextNew, 'elin-group');

  if (!airBlock || !groupBlock) {
    console.error('Cannot locate blocks for swap');
    process.exit(1);
  }

  // Swap: replace whichever comes first with the other
  const blocks = [airBlock, groupBlock].sort((a, b) => a.start - b.start);
  const [first, second] = blocks;

  arrTextNew =
    arrTextNew.substring(0, second.start) +
    first.textWithTrailing +
    arrTextNew.substring(second.endPlus);

  arrTextNew =
    arrTextNew.substring(0, first.start) +
    second.textWithTrailing +
    arrTextNew.substring(first.endPlus);

  console.log('Swap complete.');
} else {
  console.log('\nNo swap needed: elin-group already comes before elin-air');
}

// Re-assign IDs in order: 1, 2, 3, ...
// Find all blocks again in (possibly) swapped text, set id based on position
const blockStarts = [];
const blockRegex = /\{[\s\S]*?slug:\s*"[^"]+"[\s\S]*?\}/g;
let bmatch;
while ((bmatch = blockRegex.exec(arrTextNew)) !== null) {
  blockStarts.push({ start: bmatch.index, end: bmatch.index + bmatch[0].length, text: bmatch[0] });
}

let newArrText = arrTextNew;
// Replace IDs in reverse order so positions don't shift
for (let k = blockStarts.length - 1; k >= 0; k--) {
  const b = blockStarts[k];
  const newId = k + 1;
  const newText = b.text.replace(/(id:\s*)\d+/, '$1' + newId);
  newArrText = newArrText.substring(0, b.start) + newText + newArrText.substring(b.end);
}

s = beforeArr + newArrText + afterArr;

// Re-print slug order
console.log('\nResulting PROJECTS slug order:');
const newSlugRegex = /slug:\s*"([^"]+)"/g;
const newSlugs = [];
let m2;
while ((m2 = newSlugRegex.exec(newArrText)) !== null) {
  newSlugs.push(m2[1]);
}
newSlugs.forEach((slug, idx) => console.log('  ' + (idx + 1) + '. ' + slug));

// ─────────────────────────────────────────────────────────────
// STEP 3: Ensure CASE_STUDY_SLUGS const exists
// ─────────────────────────────────────────────────────────────
if (!s.includes('CASE_STUDY_SLUGS')) {
  console.log('\nAdding CASE_STUDY_SLUGS const...');
  // Insert after the PROJECTS array closing ];
  const closeIdx = s.indexOf('];', endIdx);
  if (closeIdx !== -1) {
    const insertAt = closeIdx + 2;
    s = s.substring(0, insertAt) +
        '\n\nconst CASE_STUDY_SLUGS = ["elin-air", "elin-group", "mediapool"];' +
        s.substring(insertAt);
    console.log('Added CASE_STUDY_SLUGS const');
  }
} else {
  console.log('\nCASE_STUDY_SLUGS const already present');
}

// ─────────────────────────────────────────────────────────────
// STEP 4: Remove any existing Case Study CTA, then insert in correct spot
// Pattern to find: any JSX block that contains "View Case Study" inside a CASE_STUDY_SLUGS.includes(...) && (...) wrapper
// ─────────────────────────────────────────────────────────────
const ctaRegex = /\s*\{CASE_STUDY_SLUGS\.includes\(project\.slug\) && \([\s\S]*?View Case Study[\s\S]*?\)\}/g;
const ctaMatches = s.match(ctaRegex);
if (ctaMatches) {
  console.log('\nRemoving ' + ctaMatches.length + ' existing CTA block(s)');
  s = s.replace(ctaRegex, '');
}

// ─────────────────────────────────────────────────────────────
// STEP 5: Find the project card structure and insert CTA after title
// Based on VLM analysis: card has title row (h3 + external link icon on right),
// followed by tags row, then description. We want CTA right after title row.
//
// Strategy: find the closing </a> of the project.url link (which is the external link icon),
// and insert CTA right after it.
// ─────────────────────────────────────────────────────────────
console.log('\nSearching for card structure...');

// Try multiple patterns to find the title/external-link row
const titleRowPatterns = [
  // Pattern A: <a href={project.url} ...>...</a> (any content inside)
  {
    name: 'project.url anchor',
    regex: /<a([^>]*?)href=\{([^}]*?)project\.url([^}]*?)\}([^>]*?)>([\s\S]*?)<\/a>/,
    insertAfter: true
  },
  // Pattern B: <h3 ...>{project.title}</h3>
  {
    name: 'h3 with project.title',
    regex: /<h3([^>]*?)>\s*\{project\.title\}\s*<\/h3>/,
    insertAfter: true
  },
  // Pattern C: <h2 ...>{project.title}</h2>
  {
    name: 'h2 with project.title',
    regex: /<h2([^>]*?)>\s*\{project\.title\}\s*<\/h2>/,
    insertAfter: true
  },
];

let inserted = false;
let usedPattern = '';

for (const { name, regex, insertAfter } of titleRowPatterns) {
  const match = s.match(regex);
  if (match) {
    const idx = match.index + match[0].length;
    console.log('  Found "' + name + '" at index ' + match.index);
    console.log('  Match preview: ' + match[0].substring(0, 120).replace(/\n/g, ' ') + '...');

    // Insert the CTA right after the matched element
    const cta = `\n                    {CASE_STUDY_SLUGS.includes(project.slug) && (\n                      <a\n                        href={\`/projects/\${project.slug}\`}\n                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"\n                      >\n                        View Case Study\n                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>\n                      </a>\n                    )}`;

    s = s.substring(0, idx) + cta + s.substring(idx);
    inserted = true;
    usedPattern = name;
    break;
  }
}

if (!inserted) {
  console.log('  WARNING: Could not auto-detect card structure.');
  console.log('  Manual fix needed. Add this inside each project card, right after the title row:');
  console.log('');
  console.log('    {CASE_STUDY_SLUGS.includes(project.slug) && (');
  console.log('      <a');
  console.log('        href={`/projects/${project.slug}`}');
  console.log('        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"');
  console.log('      >');
  console.log('        View Case Study');
  console.log('        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>');
  console.log('      </a>');
  console.log('    )}');
} else {
  console.log('  Inserted CTA after: ' + usedPattern);
}

// ─────────────────────────────────────────────────────────────
// STEP 6: Write final file
// ─────────────────────────────────────────────────────────────
fs.writeFileSync(F, s, 'utf8');
console.log('\n✅ Wrote updated ' + F);

// ─────────────────────────────────────────────────────────────
// STEP 7: Verify
// ─────────────────────────────────────────────────────────────
console.log('\n=== Verification ===');
const finalSrc = fs.readFileSync(F, 'utf8');

// Verify CTA exists
const ctaIdx = finalSrc.indexOf('View Case Study');
console.log('  View Case Study present:', ctaIdx !== -1);
if (ctaIdx !== -1) {
  console.log('  Context:');
  console.log('  ' + finalSrc.substring(Math.max(0, ctaIdx - 100), ctaIdx + 50).replace(/\n/g, '\n  '));
}

// Verify CASE_STUDY_SLUGS
console.log('\n  CASE_STUDY_SLUGS const present:', finalSrc.includes('CASE_STUDY_SLUGS'));

// Verify swap
const finalStartIdx = finalSrc.indexOf('const PROJECTS = [');
let d2 = 0, i2 = finalStartIdx, finalEndIdx = -1;
while (i2 < finalSrc.length) {
  if (finalSrc[i2] === '[') d2++;
  else if (finalSrc[i2] === ']') { d2--; if (d2 === 0) { finalEndIdx = i2; break; } }
  i2++;
}
const finalArrText = finalSrc.substring(finalStartIdx, finalEndIdx + 1);
const finalSlugs = [];
const r = /slug:\s*"([^"]+)"/g;
let m3;
while ((m3 = r.exec(finalArrText)) !== null) finalSlugs.push(m3[1]);
console.log('\n  Final PROJECTS slug order:');
finalSlugs.forEach((slug, idx) => console.log('    ' + (idx + 1) + '. ' + slug));

console.log('\n=== Done. Run: npm run dev ===');
