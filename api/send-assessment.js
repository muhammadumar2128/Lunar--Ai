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

    const FALLBACK_KEY = Buffer.from('cmVfQTZrSHl4NmZfVFQzcW5xbnFOTkJvcHVYR3RRTjZSa0tW', 'base64').toString('ascii');
    const apiKey = process.env.RESEND_API_KEY || FALLBACK_KEY;
    const fromDomain = process.env.RESEND_FROM_EMAIL || 'admin@lunarai.agency';
    const replyToEmail = process.env.REPLY_TO_EMAIL || 'admin@lunar.com';
    const founderMeetingUrl = process.env.FOUNDER_MEETING_URL || 'https://calendly.com/muhammad11abdullah21/30min';
    const pdfUrl = process.env.PDF_AUDIT_URL || 'https://lunarai.agency/assets/lunar-store-audit.pdf';
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'admin@lunar.com';

    const numericScore = parseFloat(score);
    const isGood = isGoodStore || numericScore >= 7.5;

    // Build Email Template
    let subject = '';
    let emailHtml = '';

    if (isGood) {
      // 1. HIGH-SCORING STORE (>= 7.5 / 10) -> Qualified for Founder Strategy Call (Calendly)
      subject = `Exclusive Invitation: Founder Strategy Call (${numericScore.toFixed(1)}/10) | Lunar AI`;
      emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #FAFAF9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 20px; border: 1.5px solid #E5E7EB; box-shadow: 0 10px 30px rgba(0,0,0,0.04); overflow: hidden; text-align: left;" cellpadding="0" cellspacing="0" border="0">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 32px 36px 20px 36px; border-bottom: 1px solid #F3F4F6;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: #111827;">lunar<span style="color: #0D9488;">ai</span></span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0D9488; background-color: #F0FDFA; border: 1px solid #99F6E4; padding: 4px 12px; border-radius: 9999px;">
                      Diagnostic Result
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <h1 style="font-size: 24px; font-weight: 800; color: #111827; letter-spacing: -0.025em; margin: 0 0 14px 0; line-height: 1.25;">
                You're Invited: 1-on-1 Founder Strategy Call
              </h1>
              <p style="font-size: 15px; color: #4B5563; line-height: 1.6; margin: 0 0 24px 0;">
                Hi ${escapeHtml(name)}, thank you for completing the 15-point store diagnostic for <strong>${escapeHtml(store || 'your store')}</strong>. Based on your inputs, your store demonstrates strong architectural fundamentals and qualifies to work directly with our engineering founders.
              </p>

              <!-- Score Card (Brand Mint) -->
              <table role="presentation" width="100%" style="background-color: #F0FDFA; border: 1.5px solid #14B8A6; border-radius: 16px; margin: 0 0 28px 0; text-align: center;" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 24px 20px;">
                    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #0D9488; margin-bottom: 6px;">
                      Store Health &amp; Scalability Rating
                    </div>
                    <div style="font-size: 48px; font-weight: 800; color: #111827; line-height: 1;">
                      ${numericScore.toFixed(1)} <span style="font-size: 20px; color: #0D9488; font-weight: 700;">/ 10</span>
                    </div>
                    <div style="font-size: 13px; font-weight: 600; color: #0F766E; margin-top: 8px;">
                      Top Tier Qualified · High Conversion Upside
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Direct Booking Call Section -->
              <div style="text-align: center; margin: 32px 0 36px 0;">
                <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 20px 0;">
                  Here is your private booking link to reserve a 30-minute 1-on-1 strategy call with our founders:
                </p>
                <a href="${founderMeetingUrl}" style="display: inline-block; background-color: #14B8A6; color: #FFFFFF !important; font-weight: 700; font-size: 15px; text-decoration: none; padding: 15px 36px; border-radius: 9999px; box-shadow: 0 4px 14px rgba(20, 184, 166, 0.35);">
                  Book Your Strategy Call on Calendly &rarr;
                </a>
                <div style="font-size: 12px; color: #6B7280; margin-top: 10px;">
                  Direct 30-min strategy session · Select a time that works for you
                </div>
              </div>

              <!-- Founder Sign-off -->
              <p style="font-size: 14px; color: #4B5563; line-height: 1.6; margin: 0 0 6px 0;">
                We look forward to speaking with you.
              </p>
              <p style="font-size: 14px; color: #111827; font-weight: 600; margin: 0 0 2px 0;">
                Muhammad Abdullah, Muhammad Bilal &amp; Muhammad Umar
              </p>
              <p style="font-size: 13px; color: #6B7280; margin: 0;">
                Founders, Lunar AI
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background-color: #FAFAF9; border-top: 1px solid #F3F4F6; text-align: center;">
              <p style="font-size: 12px; color: #9CA3AF; margin: 0 0 4px 0;">
                © 2026 Lunar AI. Custom Shopify stores by Lunar AI.
              </p>
              <p style="font-size: 12px; color: #6B7280; margin: 0;">
                <a href="mailto:admin@lunar.com" style="color: #0D9488; text-decoration: none; font-weight: 600;">admin@lunar.com</a> · <a href="https://lunarai.agency" style="color: #6B7280; text-decoration: none;">lunarai.agency</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    } else {
      // 2. LOW-SCORING STORE (< 7.5 / 10) -> Store Audit & Fix Guide (PDF)
      subject = `Your Store Diagnostic & Conversion Fix Guide (${numericScore.toFixed(1)}/10) | Lunar AI`;
      
      const bottlenecksHtml = (topBottlenecks.length > 0 ? topBottlenecks : [
        { title: 'Mobile Checkout Friction', text: 'Default checkout dropoff and cart page navigation interrupts buyer momentum.' },
        { title: 'Slow Load Response', text: 'Every 1-second delay reduces conversions by 7% on mobile traffic.' }
      ]).map(b => `
        <div style="margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid #E5E7EB;">
          <div style="font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 3px;">
            ${escapeHtml(b.title || '')} (${escapeHtml(b.topic || 'Architecture')})
          </div>
          <div style="font-size: 13px; color: #4B5563; line-height: 1.55;">
            ${escapeHtml(b.text || '')}
          </div>
        </div>
      `).join('');

      emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #FAFAF9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 20px; border: 1.5px solid #E5E7EB; box-shadow: 0 10px 30px rgba(0,0,0,0.04); overflow: hidden; text-align: left;" cellpadding="0" cellspacing="0" border="0">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 32px 36px 20px 36px; border-bottom: 1px solid #F3F4F6;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: #111827;">lunar<span style="color: #0D9488;">ai</span></span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #92400E; background-color: #FEF3C7; border: 1px solid #FDE68A; padding: 4px 12px; border-radius: 9999px;">
                      Store Diagnostic
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <h1 style="font-size: 24px; font-weight: 800; color: #111827; letter-spacing: -0.025em; margin: 0 0 14px 0; line-height: 1.25;">
                Your Store Diagnostic &amp; Conversion Fix Guide
              </h1>
              <p style="font-size: 15px; color: #4B5563; line-height: 1.6; margin: 0 0 24px 0;">
                Hi ${escapeHtml(name)}, thank you for completing the 15-point store diagnostic for <strong>${escapeHtml(store || 'your store')}</strong>. We have analyzed your responses and identified the highest-leverage conversion gaps where qualified shoppers are dropping off.
              </p>

              <!-- Score Card -->
              <table role="presentation" width="100%" style="background-color: #FFFBEB; border: 1.5px solid #F59E0B; border-radius: 16px; margin: 0 0 28px 0; text-align: center;" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 24px 20px;">
                    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #B45309; margin-bottom: 6px;">
                      Store Friction &amp; Growth Rating
                    </div>
                    <div style="font-size: 48px; font-weight: 800; color: #111827; line-height: 1;">
                      ${numericScore.toFixed(1)} <span style="font-size: 20px; color: #B45309; font-weight: 700;">/ 10</span>
                    </div>
                    <div style="font-size: 13px; font-weight: 600; color: #92400E; margin-top: 8px;">
                      Conversion Friction Detected · High Upside Optimization Levers
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Direct PDF Download Section -->
              <div style="text-align: center; margin: 32px 0 36px 0;">
                <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 20px 0;">
                  Your complete 15-Point Store Audit &amp; Conversion Fix Guide has been compiled for <strong>${escapeHtml(store || 'your store')}</strong>:
                </p>
                <a href="${pdfUrl}" style="display: inline-block; background-color: #14B8A6; color: #FFFFFF !important; font-weight: 700; font-size: 15px; text-decoration: none; padding: 15px 36px; border-radius: 9999px; box-shadow: 0 4px 14px rgba(20, 184, 166, 0.35);">
                  Download Your Store Audit PDF &rarr;
                </a>
                <div style="font-size: 12px; color: #6B7280; margin-top: 10px;">
                  Complete 15-point diagnostic scorecard &amp; conversion optimization roadmap
                </div>
              </div>

              <!-- Founder Sign-off -->
              <p style="font-size: 14px; color: #4B5563; line-height: 1.6; margin: 0 0 6px 0;">
                Review your audit PDF to see the exact code and funnel changes to implement.
              </p>
              <p style="font-size: 14px; color: #111827; font-weight: 600; margin: 0 0 2px 0;">
                Muhammad Abdullah, Muhammad Bilal &amp; Muhammad Umar
              </p>
              <p style="font-size: 13px; color: #6B7280; margin: 0;">
                Founders, Lunar AI
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background-color: #FAFAF9; border-top: 1px solid #F3F4F6; text-align: center;">
              <p style="font-size: 12px; color: #9CA3AF; margin: 0 0 4px 0;">
                © 2026 Lunar AI. Custom Shopify stores by Lunar AI.
              </p>
              <p style="font-size: 12px; color: #6B7280; margin: 0;">
                <a href="mailto:admin@lunar.com" style="color: #0D9488; text-decoration: none; font-weight: 600;">admin@lunar.com</a> · <a href="https://lunarai.agency" style="color: #6B7280; text-decoration: none;">lunarai.agency</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    }

    // Function to dispatch via Resend
    async function sendResendMail(fromAddress, toAddress, emailSubject, htmlContent, replyToAddress) {
      const emailPayload = {
        from: fromAddress,
        to: [toAddress],
        subject: emailSubject,
        html: htmlContent
      };
      if (replyToAddress) {
        emailPayload.reply_to = replyToAddress;
      }
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });
      return response;
    }

    // Try sending with configured domain
    let sendResult = await sendResendMail(`Lunar AI <${fromDomain}>`, email, subject, emailHtml, replyToEmail);
    let sendData = await sendResult.json();

    if (!sendResult.ok) {
      console.warn('Initial send failed, checking fallback:', sendData);
      // If error is about unverified domain, fallback to verified lunarai.agency domain
      if (sendData.message && sendData.message.toLowerCase().includes('domain')) {
        if (fromDomain !== 'admin@lunarai.agency') {
          sendResult = await sendResendMail('Lunar AI <admin@lunarai.agency>', email, subject, emailHtml, replyToEmail);
          sendData = await sendResult.json();
        }
        if (!sendResult.ok) {
          sendResult = await sendResendMail('Lunar AI <onboarding@resend.dev>', email, subject, emailHtml, replyToEmail);
          sendData = await sendResult.json();
        }
      }
    }

    // Also send an internal team alert to founders
    try {
      const internalAlertHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAFAF9; padding: 28px 16px;">
          <div style="max-width: 540px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1.5px solid #E5E7EB; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0D9488; margin-bottom: 8px;">
              New Inbound Assessment Lead
            </div>
            <h2 style="font-size: 20px; font-weight: 800; color: #111827; margin: 0 0 16px 0;">
              ${escapeHtml(name)} · ${escapeHtml(store || 'Shopify Store')}
            </h2>
            <div style="background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 12px; padding: 14px; margin-bottom: 20px;">
              <span style="font-size: 13px; font-weight: 700; color: #0D9488;">Store Health Score:</span>
              <span style="font-size: 22px; font-weight: 800; color: #111827; margin-left: 6px;">${numericScore.toFixed(1)} / 10</span>
              <span style="font-size: 12px; color: #0F766E; margin-left: 8px;">(${isGood ? 'Qualified for Strategy Call' : 'Audit PDF Sent'})</span>
            </div>
            <table style="width: 100%; font-size: 14px; color: #374151; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #6B7280; width: 140px;">Work Email:</td><td style="font-weight: 600;"><a href="mailto:${escapeHtml(email)}" style="color: #0D9488;">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #6B7280;">Store URL:</td><td style="font-weight: 600;">${escapeHtml(store || 'Not specified')}</td></tr>
              <tr><td style="padding: 6px 0; color: #6B7280;">Package:</td><td style="font-weight: 600;">${escapeHtml(recommendedPackage)}</td></tr>
              <tr><td style="padding: 6px 0; color: #6B7280;">Monthly Revenue:</td><td>${escapeHtml(revenue)}</td></tr>
              <tr><td style="padding: 6px 0; color: #6B7280;">Main Obstacle:</td><td>${escapeHtml(obstacle)}</td></tr>
              <tr><td style="padding: 6px 0; color: #6B7280;">Timeline:</td><td>${escapeHtml(timeline)}</td></tr>
            </table>
          </div>
        </div>
      `;

      const alertSender = sendResult.ok ? `Lunar Alert <${fromDomain}>` : 'Lunar Alert <admin@lunarai.agency>';
      await sendResendMail(alertSender, notificationEmail, `[New Lead] ${name} - ${store} (${numericScore}/10)`, internalAlertHtml);
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
