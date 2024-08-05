const express = require("express");
const router = express.Router();
const cors = require("cors");
const { registerUser, loginUser } = require("../controllers/authController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5100",
  })
);

router.get("/signup", (req, res) => {
  res.send("this is signup");
});

router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;
