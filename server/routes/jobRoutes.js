const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
  activateEditor,
  assignEditor,
  getJob,
} = require("../controllers/jobController");
const { auth } = require("../middleware");

router.use(auth);

// Sets editor active status to true to indicate they are looking for work
router.put("/activate-editor", activateEditor);
router.put("/assign-editor", assignEditor);
router.get("/job", getJob);

module.exports = router;
