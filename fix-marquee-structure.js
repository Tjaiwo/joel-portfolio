const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove the duplicate opening div
const oldDup = `          <div className="space-y-12 mt-20">

          <div className="space-y-12">
            <div>`;

const newDup = `          <div className="space-y-12 mt-20">
            <div>`;

p = p.replace(oldDup, newDup);

// Also remove one extra closing div at the end
const oldClose = `            </div>
          </div>
        </Section>

        {/* ─── EXPERIENCE ─── */}`;

const newClose = `            </div>
        </Section>

        {/* ─── EXPERIENCE ─── */}`;

p = p.replace(oldClose, newClose);
console.log('✅ Fixed duplicate divs');

fs.writeFileSync('src/app/page.tsx', p);
