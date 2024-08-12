const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
  assignJob,
  getJob,
  getClientInfo,
} = require("../controllers/jobController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5100",
  })
);

router.put("/find-job", assignJob);
router.get("/job", getJob);
router.get("/client-info", getClientInfo);

module.exports = router;
