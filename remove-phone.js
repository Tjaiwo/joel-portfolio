const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove the phone link from contact section
const oldPhone = `                <a
                  href="tel:+2349068971351"
                  className="flex items-center gap-3 text-sm md:text-[18px] text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-2.5 rounded-md border border-border group-hover:border-primary/20 transition-colors">
                    <Phone size={16} />
                  </div>
                  +234 906 897 1351
                </a>`;

p = p.replace(oldPhone, '');
console.log('✅ Phone number removed');

fs.writeFileSync('src/app/page.tsx', p);
