const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const myStackHeading = '          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">\n            MY STACK\n          </motion.h2>';

const timeline = `          {/* ─── PROCESS TIMELINE ─── */}
          <div className="mb-20">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-[28px] md:text-[40px] font-bold mb-12">
              FROM IDEA TO LAUNCH
            </motion.h2>
            <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none">
              <div className="flex gap-4 md:gap-6 min-w-max">
                {[
                  { step: "01", title: "Discovery", desc: "Deep dive into your business goals, audience, and competition." },
                  { step: "02", title: "Strategy", desc: "Sitemaps, user flows, and a clear content architecture." },
                  { step: "03", title: "Design", desc: "High-fidelity mockups & prototypes aligned with your brand." },
                  { step: "04", title: "Build", desc: "Clean, performant code — custom themes, plugins & integrations." },
                  { step: "05", title: "Optimize", desc: "Speed tuning, SEO hardening, and accessibility audits." },
                  { step: "06", title: "Launch", desc: "Smooth deployment, monitoring, and client handover." }
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-shrink-0 w-[240px] md:w-[280px] p-5 rounded-lg border border-border bg-card/30 hover:bg-card/50 hover:border-primary/20 transition-all group relative"
                  >
                    <span className="text-primary text-[11px] font-mono tracking-[0.3em]">{item.step}</span>
                    <h3 className="text-[18px] md:text-[20px] font-bold mt-2 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                    {i < 5 && (
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-border group-hover:bg-primary/30 transition-colors" />
                    )}
                  </motion.div>
                )))}
              </div>
            </div>
          </div>

          ${myStackHeading}`;

p = p.replace(myStackHeading, timeline);
console.log('✅ Timeline inserted before MY STACK');

// Add CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');
if (!css.includes('scrollbar-none')) {
  css += '\n.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }\n.scrollbar-none::-webkit-scrollbar { display: none; }\n';
  fs.writeFileSync('src/app/globals.css', css);
}

fs.writeFileSync('src/app/page.tsx', p);
