const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMail = async ({ to, subject, body }) => {
  const transport = nodemailer.createTransport({
    service: "mailgun",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transport.sendMail({
    name: "mailgun.com",
    from: process.env.EMAIL_ADDRESS,
    to,
    subject,
    html: body,
    maxMessages: 20,
    maxConnections: 25,
  });
};
module.exports = { sendMail };
