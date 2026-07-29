const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');
let changes = 0;

// ═══ 1. REMOVE PRELOADER + GLITCH ═══
// Remove glitch state and timer
p = p.replace(/\n  const \[glitchDone, setGlitchDone\] = useState\(false\);/, '');
p = p.replace(/\n  useEffect\(\(\) => \{ const t = setTimeout\(\(\) => setGlitchDone\(true\), 1500\); return \(\) => clearTimeout\(t\); \}, \[\]\);/, '');

// Remove preloader JSX
const preloaderPattern = /\{!glitchDone && \([\s\S]*?ESTABLISHING_CONNECTION[\s\S]*?\)\s*\}\s*/;
p = p.replace(preloaderPattern, '');

// Remove glitchDone from main style
p = p.replace("style={{ opacity: glitchDone ? 1 : 0, transition: \"opacity 0.8s ease-out 0.2s\" }}", '');

// Remove burn-in overlay
p = p.replace(/<div className="theme-burn"[\s\S]*?<\/div>\n\s*/, '');

// Remove preloader CSS
css = css.replace(/\.cinematic-preloader[\s\S]*?@keyframes dots-blink[\s\S]*?\}/, '');
css = css.replace(/\.preloader-scanlines[\s\S]*?@keyframes flash-cinematic[\s\S]*?\}/, '');
css = css.replace(/\.theme-burn[\s\S]*?@keyframes burn-vignette[\s\S]*?\}/, '');
css = css.replace(/\.burn-scanlines[\s\S]*?@keyframes burn-flash[\s\S]*?\}/, '');
changes++;
console.log('1. Preloader + glitch removed');

// ═══ 2. REMOVE EASTER EGG ═══
p = p.replace(/\n  const \[konami, setKonami\] = useState\(false\);/, '');
p = p.replace(/\n  const logoTapRef = useRef\(0\);/, '');
p = p.replace(/\n  const logoTapTimer = useRef<any>\(null\);/, '');

// Simplify logo buttons - remove tap counter, keep scroll to top
const oldSidebarLogo = /onClick=\{\(\) => \{\s*window\.scrollTo[\s\S]*?Scroll to top[\s\S]*?>/;
p = p.replace(oldSidebarLogo, `onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-left hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Scroll to top"
            >`);

const oldMobileLogo = /onClick=\{\(\) => \{\s*window\.scrollTo[\s\S]*?Scroll to top[\s\S]*?>/;
p = p.replace(oldMobileLogo, `onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-left hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Scroll to top"
            >`);

// Remove konami overlay
p = p.replace(/\{konami && \([\s\S]*?\)\s*\}\s*/, '');
// Remove konami CSS
css = css.replace(/\.konami-confetti[\s\S]*?@keyframes konami-pulse[\s\S]*?\}/, '');
changes++;
console.log('2. Easter egg removed');

// ═══ 3. REMOVE SOUND TOGGLE ═══
p = p.replace(/\n  const \[soundEnabled, setSoundEnabled\] = useState\(false\);/, '');
p = p.replace(/\n  useEffect\(\(\) => \{\s*if \(!soundEnabled\) return;[\s\S]*?\}, \[soundEnabled\]\);/, '');
p = p.replace(/if \(soundEnabled\) playClick\(\);?\s*/g, '');

// Remove sound toggle buttons
const sidebarSound = /<button\s*\n\s*onClick=\{\(\) => setSoundEnabled\(!soundEnabled\)\)\}[\s\S]*?\{soundEnabled \? ".*?" : ".*?"\}[\s\S]*?<\/button>/;
p = p.replace(sidebarSound, '');
const mobileSound = /<button\s*\n\s*onClick=\{\(\) => setSoundEnabled\(!soundEnabled\)\)\}[\s\S]*?\{soundEnabled \? ".*?" : ".*?"\}[\s\S]*?<\/button>/;
p = p.replace(mobileSound, '');

// Remove playClick function
p = p.replace(/function playClick\(\) \{[\s\S]*?\n\}\n\n/, '');
changes++;
console.log('3. Sound toggle removed');

// ═══ 4. REMOVE CLOCK ═══
p = p.replace(/\n\s*<div className="text-\[11px\] font-mono text-primary uppercase tracking-wider mb-1"[\s\S]*?\{useLocalTime\(\)\}[\s\S]*?<\/div>/, '');
p = p.replace(/<span className="text-primary font-mono text-\[12px\].*?\{useLocalTime\(\)\}<\/span>/, '');
p = p.replace(/function useLocalTime\(\) \{[\s\S]*?\n\}\n\n/, '');
changes++;
console.log('4. Clock removed');

// ═══ 5. ADD "CURRENTLY" STATUS ═══
const availableBadge = '<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary text-[12px] font-mono shadow-[0_0_20px_rgba(80,200,120,0.1)]">\n                  <span className="w-1.5 h-1.5 rounded-full bg-primary stat-pulse" />\n                  Available\n                </span>';

const currentlyBadge = `<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary text-[12px] font-mono shadow-[0_0_20px_rgba(80,200,120,0.1)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary stat-pulse" />
                  Currently: Building high-performance web solutions
                </span>`;

p = p.replace(availableBadge, currentlyBadge);
changes++;
console.log('5. Currently status added');

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
console.log(`\nDone! ${changes} changes made.`);
