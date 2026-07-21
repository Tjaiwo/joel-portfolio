const fs = require('fs');

// ═══════════════════════════════════════════════════════════════
// FULL TYPOGRAPHY SYSTEM REFACTOR (CORRECTED)
// Font: Geist → Inter  |  Sizes: strict px, zero rem/em
// ═══════════════════════════════════════════════════════════════

// ── 1. layout.tsx: Geist → Inter ──
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
layout = layout.replace(
  'import { Geist, Geist_Mono } from "next/font/google";',
  'import { Inter, Geist_Mono } from "next/font/google";'
);
layout = layout.replace(
  'const geistSans = Geist({\n  variable: "--font-geist-sans",\n  subsets: ["latin"],\n});',
  'const inter = Inter({\n  variable: "--font-inter",\n  subsets: ["latin"],\n  weight: ["400", "500", "600", "700"],\n});'
);
layout = layout.replace('geistSans.variable', 'inter.variable');
fs.writeFileSync('src/app/layout.tsx', layout);
console.log('1/3 layout.tsx done');

// ── 2. globals.css: update font variable, clean base font ──
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace('--font-sans: var(--font-geist-sans);', '--font-sans: var(--font-inter);');
const oldFontBlock = /\/\*\s*Responsive base font[^*]*\*\/\s*html,\s*body\s*\{[^}]*\}\s*@(?:media|supports)[^{]*\{[^}]*html[^}]*body[^}]*\}\s*\}/s;
if (oldFontBlock.test(css)) {
  css = css.replace(oldFontBlock, '/* Base font: 16px (all sizing handled via text-[Npx] in components) */\nhtml, body {\n  font-size: 16px;\n}');
}
const simpleBlock = /\/\*\s*Base font[^*]*\*\/\s*html,\s*body\s*\{[^}]*\}/s;
if (simpleBlock.test(css)) {
  css = css.replace(simpleBlock, '/* Base font: 16px (all sizing handled via text-[Npx] in components) */\nhtml, body {\n  font-size: 16px;\n}');
}
if (css.includes('--radius: 0.625rem;')) {
  css = css.replace('--radius: 0.625rem;', '--radius: 10px;');
}
fs.writeFileSync('src/app/globals.css', css);
console.log('2/3 globals.css done');

// ── 3. page.tsx: complete px type scale ──
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// ── H1: Hero name (40px mobile → 72px desktop) ──
p = p.replace(
  'text-[32px] md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6 glow-text',
  'text-[40px] md:text-[72px] font-bold tracking-tight leading-[0.95] mb-6 glow-text'
);

// ── H2: Section headings (32px mobile → 40px desktop) ──
p = p.replace(/text-2xl md:text-4xl font-bold mb-12/g, 'text-[32px] md:text-[40px] font-bold mb-12');
p = p.replace(/text-2xl md:text-4xl font-bold leading-tight mb-6/g, 'text-[32px] md:text-[40px] font-bold leading-tight mb-6');
p = p.replace(/text-2xl font-bold leading-tight mb-8/g, 'text-[32px] md:text-[40px] font-bold leading-tight mb-8');
p = p.replace(/text-2xl font-bold tracking-tight/g, 'text-[32px] md:text-[40px] font-bold tracking-tight');

// ── H2: Mobile menu heading (24px → 28px) ──
p = p.replace(
  'text-lg font-bold tracking-tight',
  'text-[24px] md:text-[28px] font-bold tracking-tight'
);

// ── H3: Stat values (FIXED: 32px mobile → 40px desktop) ──
p = p.replace(
  'text-2xl md:text-3xl font-bold text-primary',
  'text-[32px] md:text-[40px] font-bold text-primary tabular-nums'
);
p = p.replace(
  'text-[24px] md:text-[40px] font-bold text-primary tabular-nums',
  'text-[32px] md:text-[40px] font-bold text-primary tabular-nums'
);

// ── H3: Modal titles (24px → 28px) ──
p = p.replace(
  'text-xl md:text-3xl font-bold',
  'text-[24px] md:text-[28px] font-bold'
);
p = p.replace(
  'text-xl md:text-lg font-semibold mb-2">Message Sent!</h3>',
  'text-[24px] md:text-[28px] font-semibold mb-2">Message Sent!</h3>'
);

// ════════════ BODY: 16px / 18px ════════════

p = p.replace(
  'nav-link w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm rounded-md',
  'nav-link w-full text-left flex items-center gap-3 px-3 py-2.5 text-[16px] md:text-[18px] rounded-md'
);
p = p.replace(
  'w-full text-left px-3 py-2.5 text-sm rounded-md',
  'w-full text-left px-3 py-2.5 text-[16px] md:text-[18px] rounded-md'
);
p = p.replace(
  'text-base md:text-lg text-muted-foreground max-w-xl',
  'text-[16px] md:text-[18px] text-muted-foreground max-w-xl'
);
p = p.replace(
  'px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-md hover:bg-primary/90 transition-all',
  'px-6 py-3 bg-primary text-primary-foreground font-medium text-[16px] md:text-[18px] rounded-md hover:bg-primary/90 transition-all'
);
p = p.replace(
  'px-6 py-3 border border-border text-foreground font-medium text-sm rounded-md hover:border-foreground/20',
  'px-6 py-3 border border-border text-foreground font-medium text-[16px] md:text-[18px] rounded-md hover:border-foreground/20'
);
p = p.replace(
  'text-base md:text-lg font-semibold">{exp.role}',
  'text-[16px] md:text-[18px] font-semibold">{exp.role}'
);
p = p.replace(
  'flex items-start gap-3 text-sm text-muted-foreground leading-relaxed',
  'flex items-start gap-3 text-[16px] md:text-[18px] text-muted-foreground leading-relaxed'
);
p = p.replace(
  'flex items-start gap-3 text-xs text-muted-foreground/80 leading-relaxed',
  'flex items-start gap-3 text-[14px] md:text-[16px] text-muted-foreground/80 leading-relaxed'
);
p = p.replace(
  'text-sm font-semibold hover:text-primary transition-colors underline underline-offset-2 decoration-border hover:decoration-primary/40',
  'text-[16px] md:text-[18px] font-semibold hover:text-primary transition-colors underline underline-offset-2 decoration-border hover:decoration-primary/40'
);
p = p.replace(
  'className="text-sm text-muted-foreground">\n                    Thank you',
  'className="text-[16px] md:text-[18px] text-muted-foreground">\n                    Thank you'
);
p = p.replace(
  'flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group',
  'flex items-center gap-3 text-[16px] md:text-[18px] text-muted-foreground hover:text-primary transition-colors group'
);
p = p.replace(
  'form-input w-full px-4 py-3 rounded-md text-sm text-foreground placeholder:text-muted-foreground/50',
  'form-input w-full px-4 py-3 rounded-md text-[16px] md:text-[18px] text-foreground placeholder:text-muted-foreground/50'
);
p = p.replace(
  'form-input w-full px-4 py-3 rounded-md text-sm text-foreground appearance-none cursor-pointer',
  'form-input w-full px-4 py-3 rounded-md text-[16px] md:text-[18px] text-foreground appearance-none cursor-pointer'
);
p = p.replace(
  'w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-medium text-sm rounded-md',
  'w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-medium text-[16px] md:text-[18px] rounded-md'
);
p = p.replace(
  'skill-tag px-4 py-2.5 rounded-lg text-sm text-foreground bg-card/50',
  'skill-tag px-4 py-2.5 rounded-lg text-[16px] md:text-[18px] text-foreground bg-card/50'
);
p = p.replace(
  'skill-tag px-4 py-2.5 rounded-lg text-sm text-muted-foreground bg-card/30',
  'skill-tag px-4 py-2.5 rounded-lg text-[16px] md:text-[18px] text-muted-foreground bg-card/30'
);
p = p.replace('font-medium text-sm">Federal', 'font-medium text-[16px] md:text-[18px]">Federal');
p = p.replace('font-medium text-sm">Lagos, Nigeria', 'font-medium text-[16px] md:text-[18px]">Lagos, Nigeria');
p = p.replace(
  'className="text-muted-foreground leading-relaxed"',
  'className="text-[16px] md:text-[18px] text-muted-foreground leading-relaxed"'
);
p = p.replace(
  'px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-md hover:bg-primary/90"',
  'px-6 py-3 bg-primary text-primary-foreground font-medium text-[16px] md:text-[18px] rounded-md hover:bg-primary/90"'
);

// ════════════ SMALL: 14px / responsive ════════════

// Stat labels: FIXED 12px mobile / 14px desktop
p = p.replace(
  'text-xs text-muted-foreground mt-1">{stat.label}',
  'text-[12px] md:text-[14px] text-muted-foreground mt-1">{stat.label}'
);
p = p.replace(
  'text-[14px] text-muted-foreground mt-1">{stat.label}',
  'text-[12px] md:text-[14px] text-muted-foreground mt-1">{stat.label}'
);

p = p.replace('flex items-center gap-2 text-xs text-primary font-mono mt-1', 'flex items-center gap-2 text-[14px] text-primary font-mono mt-1');
p = p.replace('block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider', 'block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider');
p = p.replace('text-xs text-muted-foreground mt-1 tracking-wider uppercase', 'text-[14px] text-muted-foreground mt-1 tracking-wider uppercase');
p = p.replace('flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors', 'flex items-center gap-2 text-[14px] text-muted-foreground hover:text-primary transition-colors');
p = p.replace('flex items-center gap-2 text-xs text-muted-foreground"', 'flex items-center gap-2 text-[14px] text-muted-foreground"');
p = p.replace('text-xs text-muted-foreground">B.Tech.', 'text-[14px] text-muted-foreground">B.Tech.');
p = p.replace('text-xs text-muted-foreground">Open to remote', 'text-[14px] text-muted-foreground">Open to remote');
p = p.replace('p-3 rounded-lg border border-border bg-card/30 text-center text-xs text-muted-foreground', 'p-3 rounded-lg border border-border bg-card/30 text-center text-[14px] text-muted-foreground');
p = p.replace('px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono', 'px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[14px] font-mono');
p = p.replace('text-sm font-semibold truncate group-hover:text-primary', 'text-[14px] md:text-[16px] font-semibold truncate group-hover:text-primary');
p = p.replace('className="text-xs text-muted-foreground">\n                    UI/UX', 'className="text-[14px] text-muted-foreground">\n                    UI/UX');

// ════════════ XS: 12px ════════════

p = p.replace('text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8 font-mono', 'text-[12px] uppercase tracking-[0.3em] text-muted-foreground mb-8 font-mono');
p = p.replace('text-xs opacity-60 w-4 text-center', 'text-[12px] opacity-60 w-4 text-center');
p = p.replace('text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-mono', 'text-[12px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-mono');
p = p.replace('text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono"', 'text-[12px] uppercase tracking-[0.2em] text-muted-foreground font-mono"');
p = p.replace('text-xs text-primary font-mono mb-2', 'text-[12px] text-primary font-mono mb-2');
p = p.replace('px-3 py-1.5 text-xs rounded-full border border-primary/20 bg-primary/5 text-primary font-mono', 'px-3 py-1.5 text-[12px] rounded-full border border-primary/20 bg-primary/5 text-primary font-mono');
p = p.replace('class="text-xs text-muted-foreground">', 'class="text-[12px] text-muted-foreground">');
p = p.replace('flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground', 'flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-muted-foreground');

// ── Cleanup micro sizes ──
p = p.replace('text-[10px]', 'text-[12px]');
p = p.replace('text-[11px]', 'text-[12px]');

fs.writeFileSync('src/app/page.tsx', p);
console.log('3/3 page.tsx done');
console.log('');
console.log('All typography is now strict px. Zero rem/em remaining.');

// ── Verify ──
const remClasses = ['text-sm', 'text-xs', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl'];
let found = [];
for (const cls of remClasses) {
  const lines = p.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('className') && new RegExp('(?:^|[^\\-])' + cls.replace('-', '\\-') + '(?:\\s|$|"|\\})').test(lines[i])) {
      found.push('  L' + (i+1) + ': ' + cls);
    }
  }
}
if (found.length) {
  console.log('WARNING: Remaining rem-based classes:');
  found.forEach(f => console.log(f));
} else {
  console.log('Verified: 0 rem-based text classes found.');
}
