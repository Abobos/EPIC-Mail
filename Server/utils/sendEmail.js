import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (email, firstname, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'noreply@epicmail.com',
    to: email,
    subject: 'Here is the link to reset your password',
    html: `<p>Dear ${firstname},</p>
    <p>Click the link below to reset your password</p>
    <p><a href='https://abobos.github.io/EPIC-Mail/UI/reset_password.html?authorization=${token}'>Click here</a></p>
    <p>If you have any problem using this link, you can copy the direct link below: 
    <a href='https://abobos.github.io/EPIC-Mail/UI/reset_password.html?authorization=${token}'>
    https://abobos.github.io/EPIC-Mail/UI/reset_password.html?authorization=${token}</a>
    <p>Please kindly note that the above link will expire within 24 hrs</p>`,
  };

  try {
    const report = await transporter.sendMail(mailOptions);
    if (report.accepted) {
      return 'success';
    }
  } catch (error) {
    return 'fail';
  }
};

export default sendEmail;
