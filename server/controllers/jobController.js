const jwt = require("jsonwebtoken");
const Project = require("../models/project");
const User = require("../models/user");

const activateEditor = async (req, res) => {
  const { userId } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { active: true });

    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
};

const assignEditor = async (req, res) => {
  const { projectId } = req.body;

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
};

const getJob = async (req, res) => {
  const { token } = req.cookies;

  const user = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) throw err;
    return user;
  });

  try {
    const job = await Project.findOne({ videoEditor: user.id });

    res.send(job);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { activateEditor, assignEditor, getJob };
