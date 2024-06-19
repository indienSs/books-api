import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport(
  {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false,
    auth: {
      user: process.env.MAILER_LOGIN,
      pass: process.env.MAILER_PASSWORD,
    },
  },
  { from: `Books mailer <${process.env.MAILER_LOGIN}>` }
);

export function sendVerificationEmail(email, token) {
  const link = `http://localhost:8080/users/register/validate/${token}`;
  return smtpTransport.sendMail({
    to: email,
    subject: "Confirm you email",
    html: `<a href="${link}" target="_blank">Click here to verify</a>`,
  });
}
