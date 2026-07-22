const fs = require('fs');
const path = require('path');

const apiDir = path.join('src/app/api/contact');
const routeFile = path.join(apiDir, 'route.ts');
const pageFile = 'src/app/page.tsx';

// 1. Create the API route
fs.mkdirSync(apiDir, { recursive: true });

const routeCode = `import { Resend } from 'resend';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, budget, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['joelakinlosotu@gmail.com'],
      subject: \`New Inquiry from \${name}\`,
      replyTo: email,
      html: \`
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#111;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">\${name}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:\${email}">\${email}</a></td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Budget</td><td style="padding:8px;border-bottom:1px solid #eee;">\${budget || 'Not specified'}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Message</td><td style="padding:8px;border-bottom:1px solid #eee;white-space:pre-wrap;">\${message}</td></tr>
          </table>
          <p style="margin-top:24px;color:#888;font-size:12px;">Sent from your website contact form.</p>
        </div>
      \`,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
`;

fs.writeFileSync(routeFile, routeCode, 'utf8');
console.log('✅ Created: src/app/api/contact/route.ts');

// 2. Patch the form handler in page.tsx
let page = fs.readFileSync(pageFile, 'utf8');
let patched = false;

const patterns = [
  /(const\s+handleSubmit\s*=\s*async\s*\([^)]*\)\s*=>\s*\{)/,
  /(const\s+handleSubmit\s*=\s*\([^)]*\)\s*=>\s*\{)/,
  /(async\s+function\s+handleSubmit\s*\([^)]*\)\s*\{)/,
];

let handlerStart = null;
for (const pat of patterns) {
  const m = page.match(pat);
  if (m) { handlerStart = m[1]; break; }
}

if (handlerStart) {
  const startIdx = page.indexOf(handlerStart);
  let braceCount = 0, endIdx = -1;
  for (let i = startIdx; i < page.length; i++) {
    if (page[i] === '{') braceCount++;
    if (page[i] === '}') braceCount--;
    if (braceCount === 0) { endIdx = i + 1; break; }
  }

  if (endIdx > startIdx) {
    const oldHandler = page.substring(startIdx, endIdx);

    const loadingVar = (oldHandler.match(/setLoading|setIsLoading|setSubmitting|setSending/) || ['setLoading'])[0];
    const errorVar = (oldHandler.match(/setError|setFormError|setErrorMessage/) || ['setError'])[0];
    const successVar = (oldHandler.match(/setSuccess|setIsSuccess|setSubmitted/) || ['setSuccess'])[0];
    
    const formDataVar = oldHandler.includes('formData') ? 'formData' : 
                        oldHandler.includes('FormData') ? 'FormData' : 'formData';

    const newHandler = `${handlerStart}
    ${loadingVar}(true);
    ${errorVar}('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ${formDataVar}.name || '',
          email: ${formDataVar}.email || '',
          budget: ${formDataVar}.budget || '',
          message: ${formDataVar}.message || '',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      ${successVar}(true);
    } catch (err) {
      ${errorVar}(err.message || 'Something went wrong. Please try again.');
    } finally {
      ${loadingVar}(false);
    }
  }`;

    page = page.substring(0, startIdx) + newHandler + page.substring(endIdx);
    patched = true;
    console.log('✅ Patched handleSubmit in page.tsx');
  }
}

if (!patched) {
  console.log('⚠️  Could not auto-patch handleSubmit. You may need to manually update your form.');
}

fs.writeFileSync(pageFile, page, 'utf8');

// 3. Check if resend is in package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (!pkg.dependencies?.resend && !pkg.devDependencies?.resend) {
  console.log('');
  console.log('⚠️  Resend not found in package.json. Run: npm install resend');
}

console.log('');
console.log('═══════════════════════════════════════════════');
console.log('✅ Done! Next steps:');
console.log('');
console.log('1. Run: npm install resend');
console.log('2. On Vercel Dashboard → Settings → Environment Variables, add:');
console.log('   RESEND_API_KEY = re_xxxxxxxx (your Resend API key)');
console.log('');
console.log('3. Run: git add -A && git commit -m "feat: contact form sends email via Resend API" && git push origin main');
console.log('═══════════════════════════════════════════════');
