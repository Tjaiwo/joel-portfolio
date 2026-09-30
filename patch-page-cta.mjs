import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';

const FILE = 'src/app/page.tsx';
if (!existsSync(FILE)) {
  console.error('❌ src/app/page.tsx not found — run from portfolio root');
  process.exit(1);
}

copyFileSync(FILE, FILE + '.bak');

let src = readFileSync(FILE, 'utf8');
let changed = false;

if (!src.includes('CASE_STUDY_SLUGS')) {
  const start = src.indexOf('const PROJECTS = [');
  if (start !== -1) {
    let depth = 0, i = start, closeIdx = -1;
    while (i < src.length) {
      if (src[i] === '[') depth++;
      else if (src[i] === ']') {
        depth--;
        if (depth === 0) { closeIdx = i; break; }
      }
      i++;
    }
    if (closeIdx !== -1) {
      const semiIdx = src.indexOf(';', closeIdx);
      if (semiIdx !== -1) {
        const insertAt = semiIdx + 1;
        const insertion = '\n\nconst CASE_STUDY_SLUGS = ["elin-air", "elin-group", "mediapool"];';
        src = src.slice(0, insertAt) + insertion + src.slice(insertAt);
        changed = true;
        console.log('✓ Added CASE_STUDY_SLUGS constant after PROJECTS array');
      }
    }
  }
  if (!changed) console.warn('⚠️  Could not locate end of PROJECTS array — add CASE_STUDY_SLUGS manually');
} else {
  console.log('✓ CASE_STUDY_SLUGS already exists');
}

if (!src.includes('View Case Study')) {
  const match = src.match(/<a[^>]*href=\{[^\}]*\.url\}[^>]*>[\s\S]*?<\/a>/);
  if (match) {
    const idx = match.index + match[0].length;
    const cta = '\n                    {CASE_STUDY_SLUGS.includes(project.slug) && (\n                      <a href={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">View Case Study →</a>\n                    )}';
    src = src.slice(0, idx) + cta + src.slice(idx);
    changed = true;
    console.log('✓ Added Case Study CTA to project card');
  } else {
    console.warn('⚠️  Could not auto-detect card link pattern');
    console.warn('   Add this manually inside your PROJECTS.map() card JSX:');
    console.warn('   {CASE_STUDY_SLUGS.includes(project.slug) && (');
    console.warn('     <a href={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">');
    console.warn('       View Case Study →');
    console.warn('     </a>');
    console.warn('   )}');
  }
} else {
  console.log('✓ View Case Study CTA already exists');
}

if (changed) {
  writeFileSync(FILE, src, 'utf8');
  console.log('✓ Wrote updated src/app/page.tsx (backup at page.tsx.bak)');
} else {
  console.log('ℹ️  page.tsx unchanged');
}
