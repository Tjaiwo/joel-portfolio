const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let n = 0;

// 1. Hero H1: mobile -> 40px, line-height -> 44px/0.95
{
  let i = p.indexOf('<motion.h1');
  if (i === -1) { console.log('SKIP 1: no motion.h1'); process.exit(1); }
  let cs = p.indexOf('className="', i);
  let ce = p.indexOf('"', cs + 11);
  let cls = p.substring(cs + 11, ce);
  let before = cls;
  cls = cls.replace(/text-\[\d+px\]/, 'text-[40px]');
  cls = cls.replace(/leading-\[[\d.]+\]/, 'leading-[44px] md:leading-[0.95]');
  if (cls !== before) {
    p = p.substring(0, cs + 11) + cls + p.substring(ce);
    console.log('OK 1: Hero H1 -> 40px, leading 44px');
    n++;
  }
}

// 2. Hero description: mobile -> 18px
{
  let di = p.indexOf("I&apos;m");
  if (di === -1) { console.log('SKIP 2: no description found'); process.exit(1); }
  let ts = p.lastIndexOf('<motion.p', di);
  let cs = p.indexOf('className="', ts);
  let ce = p.indexOf('"', cs + 11);
  let cls = p.substring(cs + 11, ce);
  let before = cls;
  cls = cls.replace(/text-(?:sm|\[\d+px\])(\s+md:text-\[\d+px\])?/, 'text-[18px]');
  if (cls !== before) {
    p = p.substring(0, cs + 11) + cls + p.substring(ce);
    console.log('OK 2: Hero description -> 18px');
    n++;
  }
}

// 3. Section headers (motion.h2): mobile -> 28px
{
  let c = 0;
  p = p.replace(/(<motion\.h2[^>]*className="[^"]*?)text-(?:\[\d+px\]|xl)([^"]*")/g, function(m, a, b) { c++; return a + 'text-[28px]' + b; });
  if (c) { console.log('OK 3: ' + c + ' section headers -> 28px'); n += c; }
}

fs.writeFileSync('src/app/page.tsx', p);
console.log('\nTotal: ' + n + ' change(s)');
if (n === 0) process.exit(1);
