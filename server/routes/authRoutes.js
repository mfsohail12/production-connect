const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/authController");
const { auth } = require("../middleware");

router.get("/", (req, res) => {
  res.send("this is server");
});
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.put("/update-profile", auth, updateProfile);

module.exports = router;
