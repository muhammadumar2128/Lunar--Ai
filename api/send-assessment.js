// api/send-assessment.js
// Vercel Serverless Function to send transactional diagnostic emails via Resend

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const {
      name = 'Store Owner',
      email,
      store = '',
      score = '0.0',
      isGoodStore = false,
      recommendedPackage = 'Lunar Foundation',
      packageDesc = '',
      packageSpecs = [],
      topBottlenecks = [],
      revenue = 'Not specified',
      obstacle = 'Not specified',
      timeline = 'Immediately'
    } = data;

    if (!email) {
      return res.status(400).json({ error: 'Missing recipient email address.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY environment variable is not configured.');
      return res.status(500).json({ error: 'Email service is not configured with RESEND_API_KEY.' });
    }
    const fromDomain = process.env.RESEND_FROM_EMAIL || 'admin@lunarai.com';
    const founderMeetingUrl = process.env.FOUNDER_MEETING_URL || 'https://calendly.com/lunarai';
    const pdfUrl = process.env.PDF_AUDIT_URL || 'https://lunarai.agency/assets/lunar-store-audit.pdf';
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'admin@lunarai.com';

    const numericScore = parseFloat(score);
    const isGood = isGoodStore || numericScore >= 7.5;

    // Build Email Template
    let subject = '';
    let emailHtml = '';

    if (isGood) {
      // 1. HIGH-SCORING STORE (>= 7.5 / 10) -> Qualified for Founder Strategy Call (Calendly)
      subject = `Exclusive Invitation: Founder Strategy Call (${numericScore}/10) | Lunar AI`;
      emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0c0d12; color: #f0f2f8; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #13151d; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 36px 30px; }
    .badge { display: inline-block; background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.4); color: #34d399; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 99px; margin-bottom: 16px; }
    .score-hero { font-size: 56px; font-weight: 800; color: #ffffff; line-height: 1; margin: 12px 0; }
    .score-hero span { font-size: 24px; color: #8e95a5; font-weight: 400; }
    h1 { font-size: 24px; margin: 0 0 12px 0; color: #ffffff; }
    p { color: #a2a8b8; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
    .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin: 20px 0; }
    .btn { display: inline-block; background: #14b8a6; color: #0c0d12 !important; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 99px; text-align: center; margin-top: 10px; }
    .footer { text-align: center; margin-top: 30px; font-size: 13px; color: #636b7b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">High-Performance Store Qualified</div>
    <h1>Store Health Diagnostic: ${escapeHtml(store || 'Your Store')}</h1>
    <div class="score-hero">${numericScore.toFixed(1)} <span>/ 10</span></div>
    <p>Hi ${escapeHtml(name)},</p>
    <p>Congratulations. Your store scored an impressive <strong>${numericScore.toFixed(1)}/10</strong>, placing you in the top tier of high-performing e-commerce architectures.</p>
    
    <div class="card">
      <h3 style="color:#ffffff; margin:0 0 8px 0; font-size:16px;">Next Step: Founder Strategy Session</h3>
      <p style="margin-bottom: 14px;">Because your store demonstrates solid fundamentals, you qualify for an exclusive 1-on-1 strategy call directly with the founders of Lunar AI.</p>
      <ul style="color:#c2c7d4; font-size:14px; line-height:1.7; padding-left:20px; margin:0 0 16px 0;">
        <li>Review high-margin micro-optimizations to push conversion past 4%+</li>
        <li>Sub-0.2s mobile caching &amp; checkout friction audit</li>
        <li>Custom AI personal shopper and predictive bundling architecture</li>
      </ul>
      <div style="text-align: center; margin-top: 20px;">
        <a href="${founderMeetingUrl}" class="btn" target="_blank">Book Your Strategy Call (Calendly) →</a>
      </div>
    </div>

    <p style="font-size:14px; text-align:center; color:#8e95a5;">
      On this 20-minute call, we will walk through your exact store code, review your live funnel, and map out your custom architecture.
    </p>

    <div class="footer">
      Lunar AI Studio · High-Conversion Luxury E-Commerce Architecture<br>
      admin@lunarai.com · lunarai.agency
    </div>
  </div>
</body>
</html>`;
    } else {
      // 2. LOW-SCORING STORE (< 7.5 / 10) -> Store Audit & Fix Guide (PDF)
      subject = `Your Store Audit & Conversion Fix Guide (${numericScore}/10) | Lunar AI`;
      const specsListHtml = (packageSpecs.length > 0 ? packageSpecs : [
        'Conversion-engineered checkout architecture',
        'Mobile speed overhaul with instant slide-out cart',
        '24/7 autonomous shopping assistant'
      ]).map(s => `<li>${escapeHtml(s)}</li>`).join('');

      const bottlenecksHtml = (topBottlenecks.length > 0 ? topBottlenecks : [
        { title: 'Mobile Checkout Friction', text: 'Default checkout dropoff and cart page navigation interrupts buyer momentum.' },
        { title: 'Slow Load Response', text: 'Every 1-second delay reduces conversions by 7% on mobile traffic.' }
      ]).map(b => `
        <div style="margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.06);">
          <strong style="color:#fbbf24; font-size:14px;">${escapeHtml(b.title || '')}</strong>
          <p style="margin:4px 0 0 0; font-size:13px; color:#a2a8b8;">${escapeHtml(b.text || '')}</p>
        </div>
      `).join('');

      emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0c0d12; color: #f0f2f8; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #13151d; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 36px 30px; }
    .badge { display: inline-block; background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.4); color: #fbbf24; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 99px; margin-bottom: 16px; }
    .score-hero { font-size: 56px; font-weight: 800; color: #ffffff; line-height: 1; margin: 12px 0; }
    .score-hero span { font-size: 24px; color: #8e95a5; font-weight: 400; }
    h1 { font-size: 24px; margin: 0 0 12px 0; color: #ffffff; }
    p { color: #a2a8b8; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
    .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin: 20px 0; }
    .package-card { background: linear-gradient(145deg, rgba(20, 184, 166, 0.08), rgba(255, 255, 255, 0.02)); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 12px; padding: 22px; margin: 22px 0; }
    .btn { display: inline-block; background: #14b8a6; color: #0c0d12 !important; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 99px; text-align: center; margin-top: 10px; }
    .footer { text-align: center; margin-top: 30px; font-size: 13px; color: #636b7b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">Store Audit &amp; Bottlenecks Detected</div>
    <h1>Diagnostic Report: ${escapeHtml(store || 'Your Store')}</h1>
    <div class="score-hero">${numericScore.toFixed(1)} <span>/ 10</span></div>
    <p>Hi ${escapeHtml(name)},</p>
    <p>Based on your store diagnostic, your current architecture scored <strong>${numericScore.toFixed(1)}/10</strong> and has critical friction points that are leaking qualified visitors before checkout.</p>
    
    <div class="card">
      <h3 style="color:#ffffff; margin:0 0 12px 0; font-size:15px; text-transform:uppercase; letter-spacing:0.5px;">Key Bottlenecks Detected</h3>
      ${bottlenecksHtml}
    </div>

    <div class="package-card">
      <div style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#14b8a6; font-weight:700; margin-bottom:4px;">Recommended Architecture</div>
      <h2 style="color:#ffffff; margin:0 0 8px 0; font-size:20px;">${escapeHtml(recommendedPackage)}</h2>
      <p style="color:#c5cbd8; font-size:14px; margin-bottom:14px;">${escapeHtml(packageDesc)}</p>
      <ul style="color:#e0e4ee; font-size:14px; line-height:1.7; padding-left:20px; margin:0 0 18px 0;">
        ${specsListHtml}
      </ul>
      <div style="text-align: center; margin-top: 18px;">
        <a href="${pdfUrl}" class="btn" target="_blank">Download Store Audit &amp; Fix Guide (PDF) →</a>
      </div>
    </div>

    <p style="font-size:14px; text-align:center; color:#8e95a5;">
      Study your custom audit PDF to review the exact step-by-step technical fixes for your Shopify store.
    </p>

    <div class="footer">
      Lunar AI Studio · High-Conversion Luxury E-Commerce Architecture<br>
      admin@lunarai.com · lunarai.agency
    </div>
  </div>
</body>
</html>`;
    }

    // Function to dispatch via Resend
    async function sendResendMail(fromAddress, toAddress, emailSubject, htmlContent) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [toAddress],
          subject: emailSubject,
          html: htmlContent
        })
      });
      return response;
    }

    // Try sending with configured domain, fallback to onboarding@resend.dev if domain not yet verified
    let sendResult = await sendResendMail(`Lunar AI <${fromDomain}>`, email, subject, emailHtml);
    let sendData = await sendResult.json();

    if (!sendResult.ok) {
      console.warn('Initial send failed, checking fallback:', sendData);
      // If error is about unverified domain, fallback to onboarding@resend.dev for test
      if (sendData.message && sendData.message.toLowerCase().includes('domain')) {
        sendResult = await sendResendMail('Lunar AI <onboarding@resend.dev>', email, subject, emailHtml);
        sendData = await sendResult.json();
      }
    }

    // Also send an internal team alert to founders
    try {
      const internalAlertHtml = `
        <h3>New Store Assessment Lead Received</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Store URL:</strong> ${escapeHtml(store)}</p>
        <p><strong>Score:</strong> ${numericScore.toFixed(1)} / 10 (${isGood ? 'Optimized' : 'Needs Optimization'})</p>
        <p><strong>Recommended Package:</strong> ${escapeHtml(recommendedPackage)}</p>
        <p><strong>Revenue:</strong> ${escapeHtml(revenue)}</p>
        <p><strong>Primary Obstacle:</strong> ${escapeHtml(obstacle)}</p>
        <p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>
      `;

      await sendResendMail(`Lunar Alert <${fromDomain}>`, notificationEmail, `[New Lead] ${name} - ${store} (${numericScore}/10)`, internalAlertHtml);
    } catch (teamAlertErr) {
      console.error('Team alert error (non-fatal):', teamAlertErr);
    }

    if (!sendResult.ok) {
      return res.status(sendResult.status || 500).json({
        success: false,
        resendError: sendData
      });
    }

    return res.status(200).json({
      success: true,
      id: sendData.id,
      score: numericScore,
      isGoodStore: isGood,
      sentTo: email
    });

  } catch (err) {
    console.error('Server error in send-assessment:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
