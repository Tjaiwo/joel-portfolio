const fs = require('fs');
let changes = 0;

// ═══════════════════════════════════════════
// FIX 1: SANITIZE INPUTS IN CONTACT API
// ═══════════════════════════════════════════
let route = fs.readFileSync('src/app/api/contact/route.ts', 'utf8');

// Add sanitize function and apply it
const oldBody = `    const body = await req.json();
    const { name, email, budget, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }`;

const newBody = `    const body = await req.json();
    const { name, email, budget, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Input validation - max lengths
    if (name.length > 100) return Response.json({ error: 'Name too long.' }, { status: 400 });
    if (email.length > 254) return Response.json({ error: 'Email too long.' }, { status: 400 });
    if (budget && budget.length > 50) return Response.json({ error: 'Budget too long.' }, { status: 400 });
    if (message.length > 5000) return Response.json({ error: 'Message too long.' }, { status: 400 });

    // Sanitize inputs to prevent HTML injection in emails
    const sanitize = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeBudget = budget ? sanitize(budget) : '';
    const safeMessage = sanitize(message);`;

route = route.replace(oldBody, newBody);

// Update the email HTML to use safe versions
route = route.replace(/\$\{name\}/g, '${safeName}');
route = route.replace(/\$\{email\}/g, '${safeEmail}');
route = route.replace(/\$\{budget \|\| 'Not specified'\}/g, '${safeBudget || "Not specified"}');
route = route.replace(/\$\{message\}/g, '${safeMessage}');

fs.writeFileSync('src/app/api/contact/route.ts', route);
console.log('✅ Fix 1: Input sanitization + max length validation');
changes++;

// ═══════════════════════════════════════════
// FIX 2: RATE LIMITING ON CONTACT API
// ═══════════════════════════════════════════
// Simple in-memory rate limiter using a Map
const rateLimitCode = `
/* ────────────── RATE LIMITER ────────────── */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // max submissions
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) return false;
  
  record.count++;
  return true;
}

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetTime) rateLimitMap.delete(key);
  }
}, 10 * 60 * 1000);
`;

// Insert before the resend initialization
route = route.replace(
  "import { Resend } from 'resend';\nimport { NextRequest } from 'next/server';",
  "import { Resend } from 'resend';\nimport { NextRequest } from 'next/server';" + rateLimitCode
);

// Add rate limit check in the handler
route = route.replace(
  'export async function POST(req: NextRequest) {\n  try {',
  `export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    if (!checkRateLimit(ip)) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }`
);

fs.writeFileSync('src/app/api/contact/route.ts', route);
console.log('✅ Fix 2: Rate limiting (3/hour/IP)');
changes++;

// ═══════════════════════════════════════════
// FIX 3: SECURITY HEADERS
// ═══════════════════════════════════════════
let nextConfig = fs.readFileSync('next.config.ts', 'utf8');

const oldHeaders = `  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        { key: "Pragma", value: "no-cache" },
        { key: "Expires", value: "0" },
      ],
    },
    {
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],`;

const newHeaders = `  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        { key: "Pragma", value: "no-cache" },
        { key: "Expires", value: "0" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;" },
      ],
    },
    {
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],`;

nextConfig = nextConfig.replace(oldHeaders, newHeaders);
fs.writeFileSync('next.config.ts', nextConfig);
console.log('✅ Fix 3: Security headers added');
changes++;

// ═══════════════════════════════════════════
// FIX 4: REMOVE DEBUG LOGS IN PRODUCTION
// ═══════════════════════════════════════════
route = route.replace(
  "console.error('Resend error:', error);",
  "if (process.env.NODE_ENV !== 'production') console.error('Resend error:', error);"
);
route = route.replace(
  "console.error('Contact API error:', err);",
  "if (process.env.NODE_ENV !== 'production') console.error('Contact API error:', err);"
);
fs.writeFileSync('src/app/api/contact/route.ts', route);
console.log('✅ Fix 4: Debug logs restricted to non-production');
changes++;

console.log(`\n🎉 Security fixes applied: ${changes} changes`);
