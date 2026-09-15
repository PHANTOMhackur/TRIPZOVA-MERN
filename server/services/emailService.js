const nodemailer = require('nodemailer');

function hasSmtpConfig() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

async function sendPasswordResetEmail({ to, resetUrl }) {
  if (!hasSmtpConfig()) return { sent: false };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: 'Reset your TRIPZOVA password',
    text: `Use this link to reset your TRIPZOVA password: ${resetUrl}

This link expires in 15 minutes.`,
    html: `<p>Use the link below to reset your TRIPZOVA password.</p><p><a href="${resetUrl}">Reset password</a></p><p>This link expires in 15 minutes.</p>`,
  });

  return { sent: true };
}

module.exports = { sendPasswordResetEmail, hasSmtpConfig };
