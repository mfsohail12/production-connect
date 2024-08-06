const User = require("../models/user");
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
    const user = await User.create({
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
          res.cookie("token", token).json(user);
        }
      );

      // res.status(200).send(`${user.firstName} logged in successfully!`);
    } else {
      res.json({
        error: "Incorrect Password: Please try again",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
