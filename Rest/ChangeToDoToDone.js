const Lists = require("../Database/Lists");

const changeToDoToDone = (req, res) => {
  let x = new Promise(async (resolve, reject) => {
    Lists.findOne({ _id: req.body.list_id }).then((list) => {
      if (list) {
        for (let i = 0; i < list.listItems.length; i++) {
          if (String(list.listItems[i]._id) == req.body.toDo_id) {
            list.listItems[i].status = "done";
          }
        }
        list.save().then((data) => {
          resolve(data);
        });
      }
    });
  });
  return x.then((data) => data).catch((err) => err);
};
module.exports.changeToDoToDone = changeToDoToDone;
