const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  userId: {
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
  status: { type: Boolean, default: false },
  videoEditor: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Project", projectSchema);
