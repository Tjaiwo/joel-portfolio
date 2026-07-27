const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// 1. Add copied state
p = p.replace(
  'const [soundEnabled, setSoundEnabled] = useState(false);',
  'const [soundEnabled, setSoundEnabled] = useState(false);\n  const [copied, setCopied] = useState(false);'
);

// 2. Upgrade mobile hamburger
const oldHamburger = '            <button\n              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}\n              className="p-2 text-foreground"\n              aria-label="Toggle menu"\n            >\n              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}\n            </button>';

const newHamburger = '            <button\n              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}\n              className="hamburger-btn p-2"\n              aria-label="Toggle menu"\n            >\n              <div className="hamburger-lines">\n                <span className={`hamburger-line ${mobileMenuOpen ? \'rotate-45 translate-y-[7px]\' : \'\'}`} />\n                <span className={`hamburger-line ${mobileMenuOpen ? \'opacity-0\' : \'\'}`} />\n                <span className={`hamburger-line ${mobileMenuOpen ? \'-rotate-45 -translate-y-[7px]\' : \'\'}`} />\n              </div>\n            </button>';

p = p.replace(oldHamburger, newHamburger);
console.log('1. Animated hamburger');

// 3. Add copy button in sidebar email
const sidebarEmail = '<a\n              href="mailto:joelakinlosotu@gmail.com"\n              className="flex items-center gap-2 text-[14px] text-muted-foreground hover:text-primary transition-colors"\n            >\n              <Mail size={13} />\n              joelakinlosotu@gmail.com\n            </a>';

const sidebarEmailWithCopy = '<a\n              href="mailto:joelakinlosotu@gmail.com"\n              className="flex items-center gap-2 text-[14px] text-muted-foreground hover:text-primary transition-colors"\n            >\n              <Mail size={13} />\n              joelakinlosotu@gmail.com\n            </a>\n            <button\n              onClick={async () => {\n                await navigator.clipboard.writeText("joelakinlosotu@gmail.com");\n                setCopied(true);\n                setTimeout(() => setCopied(false), 2000);\n              }}\n              className="ml-2 p-1 rounded hover:bg-primary/10 transition-colors"\n              title="Copy email"\n            >\n              {copied ? (\n                <span className="text-primary text-[10px] font-mono">Copied!</span>\n              ) : (\n                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground hover:text-primary transition-colors">\n                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />\n                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />\n                </svg>\n              )}\n            </button>';

p = p.replace(sidebarEmail, sidebarEmailWithCopy);
console.log('2. Sidebar copy button');

// 4. Add copy button in contact section
const contactEmail = '<a\n                  href="mailto:joelakinlosotu@gmail.com"\n                  className="flex items-center gap-3 text-sm md:text-[18px] text-muted-foreground hover:text-primary transition-colors group"\n                >\n                  <div className="p-2.5 rounded-md border border-border group-hover:border-primary/20 transition-colors">\n                    <Mail size={16} />\n                  </div>\n                  joelakinlosotu@gmail.com\n                </a>';

const contactEmailWithCopy = '<a\n                  href="mailto:joelakinlosotu@gmail.com"\n                  className="flex items-center gap-3 text-sm md:text-[18px] text-muted-foreground hover:text-primary transition-colors group"\n                >\n                  <div className="p-2.5 rounded-md border border-border group-hover:border-primary/20 transition-colors">\n                    <Mail size={16} />\n                  </div>\n                  joelakinlosotu@gmail.com\n                </a>\n                <button\n                  onClick={async () => {\n                    await navigator.clipboard.writeText("joelakinlosotu@gmail.com");\n                    setCopied(true);\n                    setTimeout(() => setCopied(false), 2000);\n                  }}\n                  className="ml-2 p-1.5 rounded-md border border-border hover:border-primary/20 hover:bg-primary/5 transition-all"\n                  title="Copy email"\n                >\n                  {copied ? (\n                    <span className="text-primary text-[10px] font-mono">Copied!</span>\n                  ) : (\n                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">\n                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />\n                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />\n                    </svg>\n                  )}\n                </button>';

p = p.replace(contactEmail, contactEmailWithCopy);
console.log('3. Contact copy button');

// 5. Add CSS
css += '\n.hamburger-btn { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }\n.hamburger-lines { display: flex; flex-direction: column; gap: 5px; }\n.hamburger-line { display: block; width: 22px; height: 2px; background: currentColor; transition: all 0.3s ease; border-radius: 1px; }\n';

fs.writeFileSync('src/app/page.tsx', p);
fs.writeFileSync('src/app/globals.css', css);
