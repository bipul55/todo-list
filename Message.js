const mongoose = require("mongoose");
const Message = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: 0,
  },
});

module.exports = mongoose.model("Message", Message);
