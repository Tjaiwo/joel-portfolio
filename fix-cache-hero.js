const fs = require('fs');

// 1. Cache headers in next.config.ts
let cfg = fs.readFileSync('next.config.ts', 'utf8');
const cfgOld = `  reactStrictMode: false,
};

export default nextConfig;`;
const cfgNew = `  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;`;
if (cfg.includes(cfgOld) && !cfg.includes('headers()')) {
  cfg = cfg.replace(cfgOld, cfgNew);
  fs.writeFileSync('next.config.ts', cfg);
  console.log('next.config.ts: cache headers added');
} else { console.log('next.config.ts: already updated or pattern mismatch'); }

// 2. Hero description width
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
const pOld = 'text-[16px] md:text-[18px] text-muted-foreground max-w-xl leading-relaxed mb-8';
const pNew = 'text-[16px] md:text-[18px] text-muted-foreground w-full lg:w-4/5 leading-relaxed mb-8';
if (page.includes(pOld)) {
  page = page.replace(pOld, pNew);
  fs.writeFileSync('src/app/page.tsx', page);
  console.log('page.tsx: hero description width updated');
} else { console.log('page.tsx: already updated or pattern mismatch'); }

console.log('Done.');
