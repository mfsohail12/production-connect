const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createProject = async (req, res) => {
  const projectDetails = req.body;
  const { token } = req.cookies;

  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      return user;
    });

    try {
      await User.findOneAndUpdate(
        { _id: user.id },
        { $push: { projects: projectDetails } }
      );
      res.send();
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

module.exports = {
  createProject,
};
