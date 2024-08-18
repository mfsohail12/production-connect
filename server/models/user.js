const mongoose = require("mongoose");

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
  active: {
    type: Boolean,
    default: function () {
      if (this.accountType === "editor") {
        return false;
      }
    },
  },
  working: {
    type: Boolean,
    default: function () {
      if (this.accountType === "editor") {
        return false;
      }
    },
  },
});

// userSchema.pre("save", function (next) {
//   if (this.accountType === "editor") {
//     this.active = false;
//   }
//   next();
// });

module.exports = mongoose.model("User", userSchema);
