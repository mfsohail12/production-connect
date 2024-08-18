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

    // Verifies account type is 'client'
    if (user.accountType === "editor") {
      res.json({
        error:
          "Editors are not allowed to create projects. Please create a client account to create projects",
      });
    }

    try {
      // Creates project in database
      await Project.create({
        owner: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
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

const deleteProject = async (req, res) => {
  const { projectId } = req.body;
  const { token } = req.cookies;

  if (token) {
    // Verifies user web token
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      return user;
    });

    try {
      const project = await Project.findOneAndDelete({ _id: projectId });
      const editor = await User.findByIdAndUpdate(project.videoEditor, {
        working: false,
        active: false,
      });

      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.json({ error: "Error: Project was not deleted" });
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
      const projects = await Project.find({
        "owner._id": user.id,
      });

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
  deleteProject,
};
