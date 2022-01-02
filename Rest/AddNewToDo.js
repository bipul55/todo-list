const Lists = require("../Database/Lists");

const AddNewToDo = (req, res) => {
  let x = new Promise(async (resolve, reject) => {
    const listItems = {
      text: req.body.text,
      dueDate: req.body.date,
    };
    Lists.updateOne(
      { _id: req.body.id },
      {
        $push: {
          listItems: listItems,
        },
      },
      (err, success) => {
        if (err) {
          resolve({ error: err });
        } else {
          Lists.findOne({ _id: req.body.id }).then((data) => {
            resolve(data);
          });
        }
      }
    );
  });
  return x.then((data) => data).catch((err) => err);
};
module.exports.AddNewToDo = AddNewToDo;
