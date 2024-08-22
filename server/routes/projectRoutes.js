const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
  createProject,
  getProjects,
  editProject,
  deleteProject,
} = require("../controllers/projectController");
const { auth } = require("../middleware");

router.use(auth);

router.get("/projects", getProjects);
router.post("/create-project", createProject);
router.put("/edit-project", editProject);
router.delete("/delete-project", deleteProject);

module.exports = router;
