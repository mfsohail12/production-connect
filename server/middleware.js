const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { token } = req.cookies;

  const userAuthenticated = jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });

  if (userAuthenticated) {
    next();
  } else {
    return res.json({ error: "You are not authorized to do this" });
  }
};

module.exports = { auth };
