const fs = require('fs');
const F = 'src/app/page.tsx';

if (!fs.existsSync(F)) {
  console.error('Cannot find ' + F);
  process.exit(1);
}

let src = fs.readFileSync(F, 'utf8');

// Backup
fs.writeFileSync(F + '.fix.bak', src, 'utf8');
console.log('Backup saved: src/app/page.tsx.fix.bak');

// ── STEP 1: Fix the corrupted `2,` / `1,` lines (caused by previous bash $1 expansion) ──
// These appear as a bare number followed by comma, immediately before `slug:`
src = src.replace(
  /(\{)\s*\n\s*(\d+),\s*\n\s*(slug:)/g,
  '$1\n    id: $2,\n    $3'
);
console.log('Step 1: Restored id: prefix on any corrupted project entries');

// ── STEP 2: Find PROJECTS array bounds ──
const startIdx = src.indexOf('const PROJECTS = [');
if (startIdx === -1) {
  console.error('Cannot find PROJECTS array');
  process.exit(1);
}
let depth = 0, i = startIdx, endIdx = -1;
while (i < src.length) {
  if (src[i] === '[') depth++;
  else if (src[i] === ']') {
    depth--;
    if (depth === 0) { endIdx = i; break; }
  }
  i++;
}
if (endIdx === -1) {
  console.error('Cannot find end of PROJECTS array');
  process.exit(1);
}

const projectsText = src.substring(startIdx, endIdx + 1);
const beforeProjects = src.substring(0, startIdx);
const afterProjects = src.substring(endIdx + 1);

// ── STEP 3: Find each project block by slug (within PROJECTS only) ──
function findBlock(src, slug) {
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
  return { start, end, text: src.substring(start, end + 1) };
}

function setId(blockText, newId) {
  // Properly capture id: prefix using a real regex (no bash escape issues here)
  return blockText.replace(/(id:\s*)\d+/, '$1' + newId);
}

const elinAir = findBlock(projectsText, 'elin-air');
const elinGroup = findBlock(projectsText, 'elin-group');

if (!elinAir || !elinGroup) {
  console.error('Could not find both elin-air and elin-group blocks');
  process.exit(1);
}

// ── STEP 4: Swap them (with their trailing commas + whitespace) ──
function findBlockWithTrailing(src, block) {
  let endPlus = block.end + 1;
  while (endPlus < src.length && /[, \t\n]/.test(src[endPlus])) endPlus++;
  return { ...block, endPlus, textWithTrailing: src.substring(block.start, endPlus) };
}

const airFull = findBlockWithTrailing(projectsText, elinAir);
const groupFull = findBlockWithTrailing(projectsText, elinGroup);

// Determine which comes first
const blocks = [airFull, groupFull].sort((a, b) => a.start - b.start);
const [first, second] = blocks;

let newProjects = projectsText;
// Replace second first so first's positions don't shift
newProjects = newProjects.substring(0, second.start) + first.textWithTrailing + newProjects.substring(second.endPlus);
newProjects = newProjects.substring(0, first.start) + second.textWithTrailing + newProjects.substring(first.endPlus);

// ── STEP 5: Re-assign IDs so they go 1, 2, 3... in order ──
// After swap: elin-group should be id 1, elin-air should be id 2
const newAir = findBlock(newProjects, 'elin-air');
const newGroup = findBlock(newProjects, 'elin-group');

if (newAir && newGroup) {
  newProjects =
    newProjects.substring(0, newAir.start) +
    setId(newAir.text, '2') +
    newProjects.substring(newAir.end + 1);
  // Re-find group since positions may have shifted slightly
  const refreshedGroup = findBlock(newProjects, 'elin-group');
  if (refreshedGroup) {
    newProjects =
      newProjects.substring(0, refreshedGroup.start) +
      setId(refreshedGroup.text, '1') +
      newProjects.substring(refreshedGroup.end + 1);
  }
}

// ── STEP 6: Write back ──
const finalSrc = beforeProjects + newProjects + afterProjects;
fs.writeFileSync(F, finalSrc, 'utf8');
console.log('Step 2-5: Swapped Elin Air <-> Elin Group, reassigned IDs');

// ── STEP 7: Verify by extracting slug order ──
const slugMatches = newProjects.match(/slug:\s*"([^"]+)"/g) || [];
const slugs = slugMatches.map(s => s.match(/"([^"]+)"/)[1]);
console.log('\nResulting PROJECTS slug order:');
slugs.forEach((s, idx) => console.log('  ' + (idx + 1) + '. ' + s));

console.log('\nDone. Test with: npm run dev');
