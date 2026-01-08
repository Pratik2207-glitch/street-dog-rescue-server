const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,          // smtp-relay.brevo.com
  port: Number(process.env.SMTP_PORT),  // 587
  secure: false,                        // MUST be false for 587
  auth: {
    user: process.env.SMTP_USER,        // Brevo SMTP login
    pass: process.env.SMTP_PASS,        // Brevo SMTP key
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
});

const sendMail = async (report) => {
  try {
    const mailOptions = {
      from: `"Street Dog Rescue" <no-reply@streetdogrescue.com>`,
      to: process.env.EMAIL_RECEIVER,
      subject: "🚨 New Street Dog Rescue Report",
      html: `
        <h2>New Rescue Report</h2>
        <p><strong>Name:</strong> ${report.name}</p>
        <p><strong>Phone:</strong> ${report.phone}</p>
        <p><strong>Condition:</strong> ${report.condition}</p>
        <p><strong>Description:</strong> ${report.description}</p>
        <p><strong>Location:</strong> ${report.location}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
  }
};

module.exports = sendMail;
