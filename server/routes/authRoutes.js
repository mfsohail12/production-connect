const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send("this is server");
});
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

module.exports = router;
