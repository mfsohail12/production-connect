const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
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
});

module.exports = mongoose.model("Project", projectSchema);
