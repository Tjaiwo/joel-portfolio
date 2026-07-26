const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldEnd = `            </div>
        </Section>

        {/* ─── EXPERIENCE ─── */}`;

const newEnd = `            </div>
          </div>
        </Section>

        {/* ─── EXPERIENCE ─── */}`;

p = p.replace(oldEnd, newEnd);
console.log('✅ Added missing closing div');
fs.writeFileSync('src/app/page.tsx', p);
