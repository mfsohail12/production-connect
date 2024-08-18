const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  desiredLength: String,
  deadline: {
    type: Date,
    required: true,
  },
  phone: String,
  videoEditor: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Project", projectSchema);
