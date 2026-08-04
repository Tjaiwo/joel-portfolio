import { Resend } from 'resend';
import { NextRequest } from 'next/server';
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


let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY not configured');
    _resend = new Resend(key);
  }
  return _resend;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    if (!checkRateLimit(ip)) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }
    const body = await req.json();
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
    const safeMessage = sanitize(message);

    const { data, error } = await getResend().emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['joelakinlosotu@gmail.com'],
      subject: `New Inquiry from ${safeName}`,
      replyTo: email,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#111;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeName}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Budget</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeBudget || "Not specified"}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Message</td><td style="padding:8px;border-bottom:1px solid #eee;white-space:pre-wrap;">${safeMessage}</td></tr>
          </table>
          <p style="margin-top:24px;color:#888;font-size:12px;">Sent from your website contact form.</p>
        </div>
      `,
    });

    if (error) {
      if (process.env.NODE_ENV !== 'production') console.error('Resend error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.error('Contact API error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
