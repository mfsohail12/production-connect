const User = require("../models/user");
const Project = require("../models/project");
const {
  hashPassword,
  comparePassword,
  toNameCase,
} = require("../helpers/auth");
const jwt = require("jsonwebtoken");

// Sign up endpoint
const registerUser = async (req, res) => {
  try {
    // Destructuring account information from request body with appropriate casing
    const { accountType, password } = req.body;
    const firstName = toNameCase(req.body.firstName);
    const lastName = toNameCase(req.body.lastName);
    const email = req.body.email.toLowerCase();

    // Check if email has already been registered
    if (await User.findOne({ email })) {
      res.json({
        error: "This email is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);

    // Creates user in database
    await User.create({
      accountType,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).send();
  } catch (error) {
    console.log(error);
  }
};

// Login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checks if login credentials provided
    if (!email || !password) {
      res.json({
        error: "Please provide your full login credentials",
      });
    }

    const user = await User.findOne({ email });

    // Checks if user exists
    if (!user) {
      res.json({
        error: "There is no user with this email",
      });
    }

    // Password verification
    if (await comparePassword(password, user.password)) {
      jwt.sign(
        {
          accountType: user.accountType,
          email: user.email,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({ user, token });
        }
      );
    } else {
      res.json({
        error: "Incorrect Password: Please try again",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      return user;
    });

    try {
      const userData = await User.findById(user.id);
      res.send(userData);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json(null);
  }
};

const updateProfile = async (req, res) => {
  const { _id, firstName, lastName, email } = req.body;
  const { token } = req.cookies;

  const user = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) throw err;
    return user;
  });

  try {
    if (email !== user.email && (await User.findOne({ email }))) {
      return res.json({ error: "A user with this email already exists" });
    } else {
    }

    await User.findByIdAndUpdate(_id, { firstName, lastName, email });

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.json({ error: "Error: Unable to update your profile" });
  }
};

const updatePassword = async (req, res) => {
  const { _id, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(_id);

    if (await comparePassword(currentPassword, user.password)) {
      const newHashedPassword = await hashPassword(newPassword);
      user.password = newHashedPassword;
      await user.save();

      res.status(200).send();
    } else {
      res.json({ error: "Current password is invalid" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: "Error: Unable to change your password",
    });
  }
};

const deleteAccount = async (req, res) => {
  const { _id } = req.body;

  try {
    const user = await User.findByIdAndDelete(_id);

    if (user.accountType === "client") {
      await Project.deleteMany({ "owner._id": _id });
    }

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.json({ error: "Error: Unable to delete your account" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
};
