const User = require("../Database/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = (req, res) => {
  let x = new Promise(async (resolve, reject) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.idConfirm) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (validPassword) {
          const accessToken = jwt.sign(
            {
              email: user.email,
              name: user.name,
            },
            process.env.TOKEN_SECRET
          );

          resolve({ accessToken: accessToken });
        } else {
          resolve({
            info: "Password You have povided is incorrect.Please provide correct Password",
          });
        }
      } else {
        resolve({
          info: "Please verify your account first. A mail has been sent to your mail.",
        });
      }
    } else {
      resolve({
        info: "Email Doesn't Match",
      });
    }
  });
  return x.then((data) => data).catch((err) => err);
};
module.exports.Login = Login;
