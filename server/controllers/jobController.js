const jwt = require("jsonwebtoken");
const Project = require("../models/project");
const User = require("../models/user");

const activateEditor = async (req, res) => {
  const { token } = req.cookies;
  const { userId } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err) => {
      if (err) throw err;
    });

    try {
      await User.findByIdAndUpdate(userId, { active: true });

      res.status(200).send();
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({
      error: "You are not authorized to do this",
    });
  }
};

const assignEditor = async (req, res) => {
  const { token } = req.cookies;
  const { projectId } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err) => {
      if (err) throw err;
    });

    try {
      const editor = await User.findOne({ active: true, working: false });
      if (!editor) {
        return res.json({ error: "There are no editors currently available" });
      }

      await Project.findByIdAndUpdate(projectId, { videoEditor: editor._id });
      await User.findByIdAndUpdate(editor._id, { working: true });

      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.json({ error: "Error: Unable to connect you with an editor" });
    }
  }
};

module.exports = { activateEditor, assignEditor };
