import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER_LOGIN,
    pass: process.env.MAILER_PASSWORD,
  },
});

export function sendVerificationEmail(email, token) {
  const link = `http://localhost:8080/users/register/validate/${token}`;
  return smtpTransport.sendMail({
    to: email,
    subject: "Please confirm your Email account",
    html: `Hello,<br> Please Click on the link to verify your email.<br><a href="${link}">Click here to verify</a>`,
  });
}
