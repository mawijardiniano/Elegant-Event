const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,      
    pass: process.env.PASS,    
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: '"Elegant Events" <${process.env.USER}>',
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = { sendEmail };
