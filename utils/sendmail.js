const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendReportEmail = async (report) => {
  const mailOptions = {
    from: `"Street Dog Rescue" <${process.env.EMAIL_USER}>`,
    to: "ngoemail@example.com", // NGO email
    subject: "🚨 New Dog Rescue Report",
    html: `
      <h2>New Dog Rescue Report</h2>
      <p><strong>Name:</strong> ${report.name}</p>
      <p><strong>Phone:</strong> ${report.phone}</p>
      <p><strong>Condition:</strong> ${report.condition}</p>
      <p><strong>Description:</strong> ${report.description}</p>
      <p><strong>Location:</strong> <a href="${report.location}">Open Map</a></p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendReportEmail;
