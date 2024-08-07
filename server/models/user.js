const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  title: String,
  description: String,
  desiredLength: String,
  deadline: Date,
  phone: String,
});

const userSchema = mongoose.Schema({
  accountType: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [projectSchema],
});

module.exports = mongoose.model("User", userSchema);
