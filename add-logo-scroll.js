const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Make the sidebar logo clickable to scroll to top
const oldLogo = `          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold tracking-tight">
              Joel<span className="text-primary">.</span>
            </h2>`;

const newLogo = `          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-left hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Scroll to top"
            >
              <h2 className="text-xl font-bold tracking-tight">
                Joel<span className="text-primary">.</span>
              </h2>
            </button>`;

p = p.replace(oldLogo, newLogo);

// Also update mobile logo
const oldMobileLogo = '<h2 className="text-[24px] md:text-[28px] font-bold tracking-tight">\n            Joel<span className="text-primary">.</span>\n          </h2>';

const newMobileLogo = '<button\n              onClick={() => window.scrollTo({ top: 0, behavior: \'smooth\' })}\n              className="text-left hover:opacity-70 transition-opacity"\n              aria-label="Scroll to top"\n            >\n              <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight">\n                Joel<span className="text-primary">.</span>\n              </h2>\n            </button>';

p = p.replace(oldMobileLogo, newMobileLogo);
console.log('Logo click scrolls to top on both desktop and mobile');

fs.writeFileSync('src/app/page.tsx', p);
