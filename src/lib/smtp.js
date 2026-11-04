import nodemailer from "nodemailer";

let cachedTransporter = null;

export function getTransporter() {
  const isSmtpConfigured = Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );

  if (!isSmtpConfigured) {
    return null;
  }

  if (!cachedTransporter) {
    try {
      const port = Number(process.env.SMTP_PORT) || 587;
      cachedTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    } catch (err) {
      console.warn("⚠️ Failed to initialize nodemailer transporter:", err.message);
      return null;
    }
  }

  return cachedTransporter;
}

/**
 * Verify SMTP connection
 */
export async function testSmtpConnection() {
  const transporter = getTransporter();
  if (!transporter) {
    return {
      configured: false,
      connected: false,
      message: "SMTP credentials not fully configured in environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS).",
    };
  }

  try {
    await transporter.verify();
    return {
      configured: true,
      connected: true,
      message: `SMTP connection established successfully to ${process.env.SMTP_HOST}:${process.env.SMTP_PORT || 587}.`,
    };
  } catch (err) {
    return {
      configured: true,
      connected: false,
      message: `SMTP connection verification failed: ${err.message}`,
    };
  }
}

/**
 * Send an email notification for a new customer enquiry or contact form submission
 */
export async function sendEnquiryNotificationEmail(enquiry) {
  const transporter = getTransporter();
  if (!transporter) {
    console.info("ℹ️ SMTP notification skipped: SMTP environment variables are not configured. Stored in DB/Memory successfully.");
    return { success: false, reason: "SMTP_NOT_CONFIGURED" };
  }

  const recipient =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.SMTP_USER ||
    "pawantraders70@gmail.com";

  const sender =
    process.env.SMTP_FROM ||
    `"Pawan Traders Lead Alert" <${process.env.SMTP_USER}>`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .header { background: linear-gradient(135deg, #0F2D6B 0%, #1D4ED8 100%); color: #ffffff; padding: 24px; text-align: left; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #93c5fd; }
        .body { padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6; }
        .row { display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding: 10px 0; }
        .label { font-weight: 600; color: #64748b; font-size: 13px; }
        .value { font-weight: 700; color: #0f172a; text-align: right; }
        .message-box { background: #f8fafc; border-left: 4px solid #1D4ED8; padding: 14px; border-radius: 4px; margin: 18px 0; font-style: italic; color: #334155; }
        .btn-call { display: inline-block; background: #1D4ED8; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; margin-top: 10px; }
        .footer { background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>⚡ New Customer Enquiry Received</h1>
          <p>Pawan Traders &bull; Puramufti &amp; Charwa Superstore</p>
        </div>
        <div class="body">
          <div class="row">
            <span class="label">Customer Name:</span>
            <span class="value">${enquiry.name || "Customer"}</span>
          </div>
          <div class="row">
            <span class="label">Phone Number:</span>
            <span class="value"><a href="tel:+91${enquiry.phone}" style="color: #1D4ED8;">+91 ${enquiry.phone}</a></span>
          </div>
          ${enquiry.email ? `
          <div class="row">
            <span class="label">Email Address:</span>
            <span class="value">${enquiry.email}</span>
          </div>` : ""}
          <div class="row">
            <span class="label">Selected Branch:</span>
            <span class="value">${enquiry.branch || "Main Branch - Puramufti"}</span>
          </div>
          <div class="row">
            <span class="label">Category / Product:</span>
            <span class="value">${enquiry.batteryOrSolarReq || enquiry.category || "General Battery / Solar"}</span>
          </div>
          <div class="row">
            <span class="label">Submission Time:</span>
            <span class="value">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
          </div>

          ${enquiry.message ? `
          <div style="margin-top: 14px;">
            <span class="label">Customer Note / Message:</span>
            <div class="message-box">"${enquiry.message}"</div>
          </div>` : ""}

          <div style="text-align: center; margin-top: 24px;">
            <a href="tel:+91${enquiry.phone}" class="btn-call">
              📞 Call Customer Directly: +91 ${enquiry.phone}
            </a>
          </div>
        </div>
        <div class="footer">
          This is an automated notification from Pawan Traders Website Portal.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: `🚨 Lead Alert: New Enquiry from ${enquiry.name} (${enquiry.phone})`,
      html: htmlContent,
      text: `New Enquiry from ${enquiry.name} (Phone: ${enquiry.phone}, Branch: ${enquiry.branch}, Product: ${enquiry.batteryOrSolarReq || enquiry.category}). Message: ${enquiry.message || "N/A"}`,
    });

    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Failed to send enquiry notification email:", err);
    return { success: false, error: err.message };
  }
}

