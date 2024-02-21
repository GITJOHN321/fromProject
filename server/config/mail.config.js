import { EMAIL } from "../config.js";
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: EMAIL.user,
    pass: EMAIL.pass,
  },
});

export const sendEmail = async (email, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `ADMINJOHN <${EMAIL.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Hello world?", // plain text body
      html, // html body
    });
  } catch (error) {
    console.log("email error", error);
  }
};

export const getTemplate = (name, token) => {
    return `
    <div>
    <h2>Hola como estas ${name}?</h2>
    <p>Para confirmar tu cuenta, ingresa al siguiente enlace: </p>
    <a href="http://localhost:4000/api/verifyEmail/${token}" target="_blank">Confirmar Cuenta</a>
    </div>
    `
}
