const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Project = require("../models/project");

const createProject = async (req, res) => {
  const projectDetails = req.body;
  const { token } = req.cookies;

  if (token) {
    // Obtains user data from web token
    const user = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      return user;
    });

    try {
      // Creates project in database
      await Project.create({
        userId: user.id,
        ...projectDetails,
      });

      res.status(201).send();
    } catch (error) {
      console.log(error);
      res.json({ error: "Error: Project was not created" });
    }
  } else {
    res.json({
      error: "You are not authorized to do this",
    });
  }
};

const editProject = async (req, res) => {
  const { projectId, title, description, desiredLength, deadline, phone } =
    req.body;
  const { token } = req.cookies;

  if (token) {
    // Verifies user web token
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      return user;
    });

    try {
      await Project.findOneAndUpdate(
        { _id: projectId },
        { title, description, desiredLength, deadline, phone }
      );

      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.json({ error: "Error: Project was not updated" });
    }
  } else {
    res.json({ error: "You are not authorized to do this" });
  }
};

const getProjects = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      return user;
    });

    try {
      const projects = await Project.find({ userId: user.id });

      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json([]);
  }
};

module.exports = {
  createProject,
  getProjects,
  editProject,
};
