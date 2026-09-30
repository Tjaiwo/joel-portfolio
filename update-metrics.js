/**
 * update-metrics.js
 *
 * Updates case study metrics with real Lighthouse data:
 *   - Elin Group + Mediapool: use actual current PageSpeed scores
 *   - Elin Air: keep launch state numbers, add footnote
 */
const fs = require('fs');

const DATA_FILE = 'src/data/case-studies.ts';
const PAGE_FILE = 'src/app/projects/[slug]/page.tsx';

if (!fs.existsSync(DATA_FILE)) {
  console.error('Cannot find ' + DATA_FILE);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// 1. Patch case-studies.ts
// ─────────────────────────────────────────────────────────────
let s = fs.readFileSync(DATA_FILE, 'utf8');
fs.writeFileSync(DATA_FILE + '.metrics.bak', s, 'utf8');

// Add `resultsFootnote?` field to the CaseStudy type
if (!s.includes('resultsFootnote')) {
  s = s.replace(
    '  results: CaseStudyResult[];\n  stack: string[];',
    '  results: CaseStudyResult[];\n  resultsFootnote?: string;\n  stack: string[];'
  );
  console.log('  + added resultsFootnote field to CaseStudy type');
}

// ── Elin Air: keep launch numbers, add footnote ──
// Find the Elin Air block, add resultsFootnote after the results array
{
  const slugNeedle = 'slug: "elin-air"';
  const idx = s.indexOf(slugNeedle);
  if (idx === -1) {
    console.error('  ! could not find elin-air slug');
  } else {
    // Find the end of the results array for elin-air
    // Pattern: results: [ ... ],
    const resultsStart = s.indexOf('results: [', idx);
    if (resultsStart !== -1) {
      // Find the matching close ]
      let depth = 0, i = resultsStart;
      while (i < s.length) {
        if (s[i] === '[') depth++;
        else if (s[i] === ']') {
          depth--;
          if (depth === 0) break;
        }
        i++;
      }
      // i is now at the closing ]
      // Insert resultsFootnote after the closing ]
      // Find the next non-whitespace position
      let insertPos = i + 1;
      // Skip whitespace and the trailing comma if present
      while (insertPos < s.length && /[\s,]/.test(s[insertPos])) insertPos++;

      // Check if resultsFootnote already exists for this case study
      const next200 = s.substring(insertPos, insertPos + 200);
      if (!next200.includes('resultsFootnote')) {
        const footnote = '    resultsFootnote: "PageSpeed scores reflect launch state (March 2026). Current scores may differ due to ongoing content and feature additions.",\n';
        s = s.substring(0, insertPos) + footnote + s.substring(insertPos);
        console.log('  + added launch-state footnote to elin-air');
      } else {
        console.log('  - elin-air footnote already exists');
      }
    }
  }
}

// ── Elin Group: update results with actual current numbers ──
// Current: 98 desktop, 92 mobile (up from 38)
// Actual: 99 desktop, 98 mobile, LCP 0.6s desktop, 2.2s mobile
// We'll replace the first two metrics with actual numbers
{
  const oldElinGroupResults = `results: [
      { value: "98", label: "PageSpeed desktop", sublabel: "post-launch audit" },
      { value: "92", label: "PageSpeed mobile", sublabel: "up from 38" },
      { value: "+40%", label: "Organic traffic", sublabel: "in 3 months" },
      { value: "7/7", label: "Subsidiaries ranking", sublabel: "for branded terms" },
    ],`;

  const newElinGroupResults = `results: [
      { value: "99", label: "PageSpeed desktop", sublabel: "audited Sept 2026" },
      { value: "98", label: "PageSpeed mobile", sublabel: "up from 38" },
      { value: "0.6s", label: "LCP desktop", sublabel: "0 CLS, 0ms TBT" },
      { value: "+40%", label: "Organic traffic", sublabel: "in 3 months" },
    ],`;

  if (s.includes(oldElinGroupResults)) {
    s = s.replace(oldElinGroupResults, newElinGroupResults);
    console.log('  + updated elin-group results with actual Lighthouse numbers');
  } else {
    console.warn('  ! could not find elin-group results block to replace');
    // Try a looser match
    const looseMatch = s.match(/results: \[\s*\{ value: "98", label: "PageSpeed desktop"[\s\S]*?\},\s*\]/);
    if (looseMatch) {
      console.log('    Found loose match at index', looseMatch.index);
    }
  }
}

// ── Mediapool: update results with actual current numbers ──
// Current: 95 desktop / 89 mobile, 2.4x time-on-page, 1.8s LCP
// Actual: 93 desktop / 77 mobile, LCP 1.0s desktop, 0 CLS, 0ms TBT
{
  const oldMediapoolResults = `results: [
      { value: "95", label: "PageSpeed desktop", sublabel: "up from 31" },
      { value: "89", label: "PageSpeed mobile", sublabel: "up from 24" },
      { value: "2.4x", label: "Time-on-page", sublabel: "vs. legacy site" },
      { value: "1.8s", label: "LCP on 4G", sublabel: "down from 5.6s" },
    ],`;

  const newMediapoolResults = `results: [
      { value: "93", label: "PageSpeed desktop", sublabel: "up from 31" },
      { value: "77", label: "PageSpeed mobile", sublabel: "up from 24" },
      { value: "1.0s", label: "LCP desktop", sublabel: "0 CLS, 0ms TBT" },
      { value: "2.4x", label: "Time-on-page", sublabel: "vs. legacy site" },
    ],`;

  if (s.includes(oldMediapoolResults)) {
    s = s.replace(oldMediapoolResults, newMediapoolResults);
    console.log('  + updated mediapool results with actual Lighthouse numbers');
  } else {
    console.warn('  ! could not find mediapool results block to replace');
  }
}

fs.writeFileSync(DATA_FILE, s, 'utf8');
console.log('  ok ' + DATA_FILE + ' updated\n');

// ─────────────────────────────────────────────────────────────
// 2. Patch page.tsx — render resultsFootnote below ResultsGrid
// ─────────────────────────────────────────────────────────────
if (fs.existsSync(PAGE_FILE)) {
  let p = fs.readFileSync(PAGE_FILE, 'utf8');
  fs.writeFileSync(PAGE_FILE + '.metrics.bak', p, 'utf8');

  // Find: <ResultsGrid results={cs.results} />
  // Replace with: <ResultsGrid results={cs.results} /> + conditional footnote
  const oldRender = '<ResultsGrid results={cs.results} />';
  const newRender = `<ResultsGrid results={cs.results} />
      {cs.resultsFootnote && (
        <p className="mx-auto max-w-6xl px-6 -mt-8 pb-4 lg:px-12 text-xs text-muted-foreground italic">
          {cs.resultsFootnote}
        </p>
      )}`;

  if (p.includes(oldRender) && !p.includes('cs.resultsFootnote')) {
    p = p.replace(oldRender, newRender);
    fs.writeFileSync(PAGE_FILE, p, 'utf8');
    console.log('  + added footnote rendering below ResultsGrid in page.tsx');
  } else if (p.includes('cs.resultsFootnote')) {
    console.log('  - footnote rendering already present');
  } else {
    console.warn('  ! could not find <ResultsGrid results={cs.results} /> in page.tsx');
  }
}

console.log('\n=== Done ===');
console.log('Backups: .metrics.bak suffix');
console.log('Test with: npm run dev');
