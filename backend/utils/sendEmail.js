const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a transporter using Mailtrap (mock SMTP service)
  // For production, replace these with SendGrid or AWS SES credentials in .env
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_EMAIL || 'dummy_user',
      pass: process.env.SMTP_PASSWORD || 'dummy_pass'
    }
  });

  // 2. Define the email options
  const message = {
    from: `${process.env.FROM_NAME || 'InternshipHub'} <${process.env.FROM_EMAIL || 'noreply@internshiphub.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // 3. Send the email
  try {
    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Email sending failed:', error.message);
  }
};

module.exports = sendEmail;
