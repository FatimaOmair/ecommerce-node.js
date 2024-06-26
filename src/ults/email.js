import nodemailer from "nodemailer";
import { emialTemplate } from "./EmailTemplate.js";

const sendEmail = async (to, subject,html) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

 

  let info = await transporter.sendMail({
    from: 'F shop', // Set the sender email address here
    to, // Send the email only to the admin's email address
    subject,
    html:emialTemplate(to), 
  });
};

export default sendEmail;
