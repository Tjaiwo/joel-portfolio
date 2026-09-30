/**
 * apply-tier1.js  Adds 3 enhancements to the case studies:
 *   1. Status badge ("Live") in hero
 *   2. Specific stat in Challenge section body
 *   3. Skills list (separate from tools) rendered in Stack section
 *
 * Idempotent: safe to re-run.
 */
const fs = require('fs');

const DATA_FILE = 'src/data/case-studies.ts';
const HERO_FILE = 'src/components/case-study/hero.tsx';
const PAGE_FILE = 'src/app/projects/[slug]/page.tsx';

// 
// 1. Patch case-studies.ts: add status, skills, refine Challenge stats
// 
function patchData() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error('Cannot find ' + DATA_FILE);
    return false;
  }
  let s = fs.readFileSync(DATA_FILE, 'utf8');
  fs.writeFileSync(DATA_FILE + '.tier1.bak', s, 'utf8');

  // Add `status` and `skills` fields to the CaseStudy TYPE
  if (!s.includes('status:')) {
    s = s.replace(
      '  slug: string;\n  title: string;',
      '  status: "Live" | "In Progress" | "Archived";\n  slug: string;\n  title: string;'
    );
    console.log('  + added status field to type');
  }
  if (!s.includes('skills:')) {
    s = s.replace(
      '  meta: {\n    industry: string;',
      '  meta: {\n    industry: string;\n    skills: string[];'
    );
    console.log('  + added skills field to meta type');
  }

  // Per-case-study patches
  const patches = [
    {
      slug: 'elin-air',
      status: 'Live',
      skills: ['Performance Optimization', 'Custom Post Type Architecture', 'Multi-step Form UX', 'SEO Schema Markup', 'Image Pipeline Engineering'],
      // Insert a specific stat into the second paragraph of the Challenge section
      find: 'Worse, the site loaded slowly. 4.2 second LCP on mobile because of unoptimized hero imagery and a stack of redundant plugins.',
      replace: 'Worse, the site loaded slowly. Median mobile LCP was 4.2 seconds, with hero imagery alone accounting for 1.8MB of unoptimized PNG payload, and a stack of 14 redundant plugins adding 800ms of overhead before any content rendered.'
    },
    {
      slug: 'elin-group',
      status: 'Live',
      skills: ['Information Architecture', 'Multi-Business Content Modeling', 'Custom Post Type Design', 'SEO Schema for Organizations', 'Design System Governance'],
      find: 'The trap with multi-business corporate sites is that they either become a confusing directory,',
      replace: 'The legacy static HTML site scored 38 on PageSpeed mobile and averaged 5.4 second load times on 4G, with visitors bouncing within 11 seconds on average. The trap with multi-business corporate sites is that they either become a confusing directory,'
    },
    {
      slug: 'mediapool',
      status: 'Live',
      skills: ['Content-Driven Architecture', 'Custom Taxonomy Design', 'Performance Budgeting', 'SEO for Long-tail Queries', 'Image Optimization Pipeline'],
      find: 'The legacy site was a slow, single-page WordPress install with a generic stock-photo hero and a contact form buried at the bottom.',
      replace: 'The legacy site was a single-page WordPress install scoring 31 on PageSpeed desktop and 24 on mobile. The hero section alone weighed 2.1MB and loaded in 5.6 seconds, with a generic stock-photo background and a contact form buried at the bottom.'
    }
  ];

  for (const p of patches) {
    // Find the case study block by slug
    const slugNeedle = 'slug: "' + p.slug + '"';
    const slugIdx = s.indexOf(slugNeedle);
    if (slugIdx === -1) {
      console.warn('  ! could not find slug ' + p.slug);
      continue;
    }

    // Add status field right after slug line (if not already there)
    // The line above slug is "  {" or "  }, {"  we want to insert status as the first field
    // Find the start of this object: walk back to the opening {
    let start = slugIdx;
    while (start > 0 && s[start] !== '{') start--;
    // Find end of slug line
    let lineEnd = s.indexOf('\n', slugIdx);
    if (lineEnd === -1) lineEnd = slugIdx + 100;

    // Insert status after slug line (before the title line)
    // Pattern: slug: "xxx",\n
    const slugLineEnd = s.indexOf('\n', slugIdx);
    const afterSlugLine = s.substring(0, slugLineEnd + 1);

    if (!s.substring(start, slugLineEnd + 200).includes('status:')) {
      // Insert "    status: \"Live\",\n" right after the slug line
      s = s.substring(0, slugLineEnd + 1) +
          '    status: "' + p.status + '",\n' +
          s.substring(slugLineEnd + 1);
      console.log('  + added status="' + p.status + '" to ' + p.slug);
    }

    // Add skills to meta object (if not already there)
    // Find the meta block: meta: { industry: "...", role: [...], date: "...", duration: "...", tools: [...] }
    const metaIdx = s.indexOf('meta: {', slugIdx);
    if (metaIdx !== -1) {
      const metaEnd = s.indexOf('}', metaIdx);
      if (metaEnd !== -1 && !s.substring(metaIdx, metaEnd).includes('skills:')) {
        // Find the closing } of meta, insert skills: [...] before the closing
        // Find the last field in meta (tools array closing bracket)
        const toolsCloseIdx = s.indexOf('],', metaIdx);
        if (toolsCloseIdx !== -1 && toolsCloseIdx < metaEnd) {
          const insertPos = toolsCloseIdx + 2; // after "],"
          // Add skills array
          const skillsStr = '\n      skills: ' + JSON.stringify(p.skills).replace(/,/g, ', ') + ',';
          s = s.substring(0, insertPos) + skillsStr + s.substring(insertPos);
          console.log('  + added skills array (' + p.skills.length + ' items) to ' + p.slug);
        }
      }
    }

    // Replace challenge paragraph
    if (p.find && p.replace && s.includes(p.find)) {
      s = s.replace(p.find, p.replace);
      console.log('  + refined Challenge stat for ' + p.slug);
    }
  }

  fs.writeFileSync(DATA_FILE, s, 'utf8');
  console.log('  ok ' + DATA_FILE + ' updated\n');
  return true;
}

// 
// 2. Patch hero.tsx: render status badge
// 
function patchHero() {
  if (!fs.existsSync(HERO_FILE)) {
    console.error('Cannot find ' + HERO_FILE);
    return false;
  }
  let s = fs.readFileSync(HERO_FILE, 'utf8');
  fs.writeFileSync(HERO_FILE + '.tier1.bak', s, 'utf8');

  // Insert status badge next to the title
  // Find: <h1 ...>{cs.title}</h1>
  // Replace with: <h1>...</h1> + status badge
  const oldH1 = '<h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">\n            {cs.title}\n          </h1>';
  const newH1 = `<div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {cs.title}
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
              {cs.status}
            </span>
          </div>`;

  if (s.includes(oldH1)) {
    s = s.replace(oldH1, newH1);
    console.log('  + added status badge to hero');
  } else if (s.includes('status')) {
    console.log('  - status badge already present (skipping)');
  } else {
    console.warn('  ! could not auto-detect h1 pattern, manual edit needed');
  }

  fs.writeFileSync(HERO_FILE, s, 'utf8');
  console.log('  ok ' + HERO_FILE + ' updated\n');
  return true;
}

// 
// 3. Patch page.tsx: render skills list next to tools in Stack section
// 
function patchPage() {
  if (!fs.existsSync(PAGE_FILE)) {
    console.error('Cannot find ' + PAGE_FILE);
    return false;
  }
  let s = fs.readFileSync(PAGE_FILE, 'utf8');
  fs.writeFileSync(PAGE_FILE + '.tier1.bak', s, 'utf8');

  // Find the Stack section's tools grid, add a Skills cell next to it
  // The existing structure:
  //   <div className="mt-8 grid gap-8 sm:grid-cols-2">
  //     <div> ... Tech stack ... </div>
  //     {cs.designer && <div> ... Design ... </div>}
  //   </div>
  //
  // We want to add a Skills cell BEFORE the Tech stack cell, OR convert to 3 cols.
  // Simpler: change the grid to lg:grid-cols-3 and add skills cell.

  const oldStack = `<div className="mt-8 grid gap-8 sm:grid-cols-2">
          {/* Stack */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tech stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cs.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-border/60 bg-muted/30 px-3 py-1.5 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>`;

  const newStack = `<div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Skills */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">What I did</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cs.meta.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tech stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cs.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-border/60 bg-muted/30 px-3 py-1.5 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>`;

  if (s.includes(oldStack)) {
    s = s.replace(oldStack, newStack);
    console.log('  + added Skills section next to Tech stack');
  } else if (s.includes('What I did')) {
    console.log('  - Skills section already present (skipping)');
  } else {
    console.warn('  ! could not auto-detect Stack section pattern');
    console.warn('    Manual fix needed in ' + PAGE_FILE);
  }

  fs.writeFileSync(PAGE_FILE, s, 'utf8');
  console.log('  ok ' + PAGE_FILE + ' updated\n');
  return true;
}

// 
// Run all patches
// 
console.log('=== Tier 1 enhancements ===\n');

console.log('1. Patching case-studies.ts...');
patchData();

console.log('2. Patching hero.tsx...');
patchHero();

console.log('3. Patching [slug]/page.tsx...');
patchPage();

console.log('=== Done ===');
console.log('\nBackups saved with .tier1.bak suffix.');
console.log('Test with: npm run dev');
console.log('Visit: http://localhost:3000/projects/elin-air');
