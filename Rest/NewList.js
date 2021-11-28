const Lists = require("../Database/Lists");

const NewList = (req, res) => {
  console.log(req.body);
  let x = new Promise(async (resolve, reject) => {
    const list = new Lists({
      email: req.body.email,
      title: req.body.title,
      description: req.body.description,
    });
    list
      .save()
      .then((l) => {
        resolve({ list: l });
      })
      .catch((err) => {
        reject({ error: "Something went wrong" });
      });
  });
  return x.then((data) => data).catch((err) => err);
};
module.exports.NewList = NewList;
