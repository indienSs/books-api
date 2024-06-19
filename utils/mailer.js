import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: process.env.MAILER_LOGIN,
    pass: process.env.MAILER_PASSWORD,
  },
});

export function sendVerificationEmail(email) {
  const link = `http://localhost:8080/`;
}
