const User = require("../models/user");
const {
  hashPassword,
  comparePassword,
  toNameCase,
} = require("../helpers/auth");

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
      res.status(200).send(`${user.firstName} logged in successfully!`);
    } else {
      res.json({
        error: "Incorrect Password: Please try again",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
