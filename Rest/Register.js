const User = require("../Database/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { sendMail_register } = require("../mailService/emailVerify");
const Register = (req, res) => {
  let x = new Promise(async (resolve, reject) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      resolve({
        info: "Already have an account with this email",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      user.save().then((u) => {
        // sendMail_register(u.email, u._id);
        resolve({ registered: true });
      });
    }
  });
  return x.then((data) => data).catch((err) => err);
};
module.exports.Register = Register;
