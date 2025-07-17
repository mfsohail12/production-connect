const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Project = require("../models/project");
const { getToken } = require("../helpers/auth");

const createProject = async (req, res) => {
  const projectDetails = req.body;
  const token = getToken(req);
  // Obtains user data from json web token
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
};

const editProject = async (req, res) => {
  const { projectId, title, description, desiredLength, deadline, phone } =
    req.body;

  try {
    await Project.findOneAndUpdate(
      { _id: projectId },
      {
        title,
        description,
        desiredLength,
        deadline,
        phone,
      }
    );

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.json({ error: "Error: Project was not updated" });
  }
};

const deleteProject = async (req, res) => {
  const { projectId } = req.body;

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
};

const getProjects = async (req, res) => {
  const token = getToken(req);

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
};

module.exports = {
  createProject,
  getProjects,
  editProject,
  deleteProject,
};
