const express = require("express");
const cors = require("cors");
const router = express.Router();
const { createProject } = require("../controllers/projectController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5100",
  })
);

router.post("/create-project", createProject);

module.exports = router;
