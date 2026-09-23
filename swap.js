/**
 * swap.js — Swap Elin Group & Mediapool with Clayton Prints & Cedar Rush
 * Run from portfolio root: node swap.js
 */
const fs = require('fs');
const FILE = 'src/app/page.tsx';

if (!fs.existsSync(FILE)) {
  console.error('Cannot find ' + FILE + ' — run from portfolio root.');
  process.exit(1);
}

let content = fs.readFileSync(FILE, 'utf8');

function findBlock(src, title) {
  const idx = src.indexOf('title: "' + title + '"');
  if (idx === -1) return null;
  let start = idx;
  while (start > 0 && src[start] !== '{') start--;
  let depth = 0, end = start;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  return { start, end, text: src.substring(start, end + 1) };
}

function setId(blockText, newId) {
  return blockText.replace(/(id:\s*)\d+/, '$1' + newId);
}

console.log('--- Swapping PROJECTS[] positions ---');

const clayton = findBlock(content, 'Clayton Prints');
const cedar   = findBlock(content, 'Cedar Rush');
const elinGrp = findBlock(content, 'Elin Group');
const mediapl = findBlock(content, 'Mediapool');

if (!clayton || !cedar || !elinGrp || !mediapl) {
  console.error('Could not find all 4 projects.');
  process.exit(1);
}

const claytonId  = clayton.text.match(/id:\s*(\d+)/)[1];
const cedarId    = cedar.text.match(/id:\s*(\d+)/)[1];
const elinGrpId  = elinGrp.text.match(/id:\s*(\d+)/)[1];
const mediaplId  = mediapl.text.match(/id:\s*(\d+)/)[1];

console.log('  IDs: Clayton=' + claytonId + ', Cedar=' + cedarId + ', ElinGroup=' + elinGrpId + ', Mediapool=' + mediaplId);

const replacements = [
  { start: mediapl.start, end: mediapl.end, newText: setId(cedar.text, mediaplId) },
  { start: elinGrp.start, end: elinGrp.end, newText: setId(clayton.text, elinGrpId) },
  { start: cedar.start, end: cedar.end, newText: setId(mediapl.text, cedarId) },
  { start: clayton.start, end: clayton.end, newText: setId(elinGrp.text, claytonId) },
].sort((a, b) => b.start - a.start);

for (const r of replacements) {
  content = content.substring(0, r.start) + r.newText + content.substring(r.end + 1);
}
console.log('PROJECTS[] swapped');

console.log('--- Swapping Experience sub-projects ---');

const freelanceIdx = content.indexOf('company: "Freelance"');
const digisplashIdx = content.indexOf('company: "Digisplash"', freelanceIdx);

if (freelanceIdx !== -1 && digisplashIdx !== -1) {
  const expSection = content.substring(freelanceIdx, digisplashIdx);
  const egSub = findBlock(expSection, 'Elin Group');
  const cpSub = findBlock(expSection, 'Clayton Prints');
  const mpSub = findBlock(expSection, 'Mediapool');

  if (egSub && cpSub) {
    const absEgStart = freelanceIdx + egSub.start;
    const absEgEnd   = freelanceIdx + egSub.end;
    const absCpStart = freelanceIdx + cpSub.start;
    const absCpEnd   = freelanceIdx + cpSub.end;
    const egText = content.substring(absEgStart, absEgEnd + 1);
    const cpText = content.substring(absCpStart, absCpEnd + 1);

    if (absEgStart > absCpStart) {
      content = content.substring(0, absEgStart) + cpText + content.substring(absEgEnd + 1);
      content = content.substring(0, absCpStart) + egText + content.substring(absCpEnd + 1);
    } else {
      content = content.substring(0, absCpStart) + egText + content.substring(absCpEnd + 1);
      content = content.substring(0, absEgStart) + cpText + content.substring(absEgEnd + 1);
    }
    console.log('Elin Group and Clayton Prints swapped');

    if (mpSub) {
      const newFreelanceIdx = content.indexOf('company: "Freelance"');
      const newDigisplashIdx = content.indexOf('company: "Digisplash"', newFreelanceIdx);
      const newExpSection = content.substring(newFreelanceIdx, newDigisplashIdx);
      const newEg = findBlock(newExpSection, 'Elin Group');
      const newMp = findBlock(newExpSection, 'Mediapool');

      if (newEg && newMp) {
        const egAbsEnd = newFreelanceIdx + newEg.end;
        const mpAbsStart = newFreelanceIdx + newMp.start;
        const between = content.substring(egAbsEnd + 1, mpAbsStart).trim();

        if (between.length > 5) {
          console.log('  Moving Mediapool after Elin Group...');
          const mpAbsEnd = newFreelanceIdx + newMp.end;
          const mpText = content.substring(mpAbsStart, mpAbsEnd + 1);
          content = content.substring(0, mpAbsStart) + content.substring(mpAbsEnd + 1);

          const rfIdx = content.indexOf('company: "Freelance"');
          const dgIdx = content.indexOf('company: "Digisplash"', rfIdx);
          const rfSec = content.substring(rfIdx, dgIdx);
          const rfEg = findBlock(rfSec, 'Elin Group');

          if (rfEg) {
            const afterEgEnd = rfIdx + rfEg.end;
            let insertAt = afterEgEnd + 1;
            const needsComma = content[afterEgEnd] !== ',';
            const insertStr = (needsComma ? ',' : '') + '\n      ' + mpText;
            content = content.substring(0, insertAt) + insertStr + content.substring(insertAt);
            console.log('  Mediapool moved');
          }
        }
      }
    }
  }
}

content = content.replace(/\},\s*\n\s*,/g, '},\n');

fs.writeFileSync(FILE, content, 'utf8');
console.log('\nAll changes saved to ' + FILE);