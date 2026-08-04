const fs = require('fs');
let route = fs.readFileSync('src/app/api/contact/route.ts', 'utf8');

// Lazy init Resend to avoid key exposure in stack traces
const oldInit = "const resend = new Resend(process.env.RESEND_API_KEY);";
const newInit = `let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY not configured');
    _resend = new Resend(key);
  }
  return _resend;
}`;

route = route.replace(oldInit, newInit);

// Update the usage
route = route.replace('resend.emails.send', 'getResend().emails.send');

fs.writeFileSync('src/app/api/contact/route.ts', route);
console.log('✅ Fix 5: Lazy Resend initialization');
