const mongoose = require("mongoose");
const Lists = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 0,
  },
  listItems: [
    {
      text: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "pending",
      },
      dueDate: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Lists", Lists);
