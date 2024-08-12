const jwt = require("jsonwebtoken");
const Project = require("../models/project");
const User = require("../models/user");

const assignJob = async (req, res) => {
  const { token } = req.cookies;
  const { editorId } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err) => {
      if (err) throw err;
    });

    try {
      const project = await Project.findOne({ active: true });

      if (project === null) {
        return res.json({
          unsuccessful: "There are currently no active jobs",
        });
      }

      const updatedProject = await Project.findByIdAndUpdate(
        project._id,
        { videoEditor: editorId },
        { returnDocument: "after" }
      );

      res.status(200).send(updatedProject);
    } catch (error) {
      console.log(error);
      res.json({ error: "Error: You were not connected with a project" });
    }
  } else {
    res.json({
      error: "You are not authorized to do this",
    });
  }
};

const getJob = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      return user;
    });

    try {
      const job = await Project.findOne({ videoEditor: user.id });
      res.status(200).send(job);
    } catch (error) {
      console.log(error);
      res.json({
        error: "Error: unable to fetch your current job",
      });
    }
  } else {
    res.json({
      error: "You are not authorized to do this",
    });
  }
};

const getClientInfo = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      return user;
    });

    try {
      const project = await Project.findOne({ videoEditor: user.id });
      const client = await User.findOne({ _id: project.userId });

      res.status(200).send({
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
      });
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error fetching client details",
      });
    }
  }
};

module.exports = { assignJob, getJob, getClientInfo };
