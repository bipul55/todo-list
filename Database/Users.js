const mongoose = require("mongoose");
const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: 0,
  },
  password: {
    type: String,
    default: 0,
  },
  idConfirm: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", User);
