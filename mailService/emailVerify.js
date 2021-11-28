const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail_register = async function (mail, id) {
  console.log(mail, id, "mail and id");
  const url = `${process.env.url}verifyMail/${id}`;
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail(
    {
      from: process.env.email, // sender address
      to: `${mail}`, // list of receivers
      subject: "Email Verification", // Subject line
      text: "Click on the button below to confirm your email.", // plain text body
      html: `<a href=${url}><button>Confirm Email</button></a>`, // html body
    },
    (err, data) => {
      if (err) {
        console.log("Error in nodemailer", err);
      } else {
        consol.log("Email sent");
      }
    }
  );
};

module.exports.sendMail_register = sendMail_register;
