const jwt = require("jsonwebtoken");
const Project = require("../models/project");
const User = require("../models/user");
const { getToken } = require("../helpers/auth");

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

    await Project.findByIdAndUpdate(projectId, {
      videoEditor: {
        _id: editor._id,
        firstName: editor.firstName,
        lastName: editor.lastName,
        email: editor.email,
      },
    });
    await User.findByIdAndUpdate(editor._id, { working: true });

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.json({ error: "Error: Unable to connect you with an editor" });
  }
};

const getJob = async (req, res) => {
  const token = getToken(req);

  const user = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) throw err;
    return user;
  });

  try {
    const project = await Project.findOne({ "videoEditor._id": user.id });

    res.send(project);
  } catch (error) {
    console.log(error);
  }
};

const quitJob = async (req, res) => {
  const { projectId } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(projectId, {
      $unset: { videoEditor: "" },
    });

    await User.findByIdAndUpdate(project.videoEditor._id, {
      active: false,
      working: false,
    });

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.json({ error: "Error: Unable to quit job" });
  }
};

module.exports = { activateEditor, assignEditor, getJob, quitJob };
