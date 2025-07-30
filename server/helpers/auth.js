const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

exports.verifyToken = (token) => {
  if (!/^Bearer\s+[A-Za-z0-9\-_.]+\.[A-Za-z0-9\-_.]+\.[A-Za-z0-9\-_.]+$/.test(token)) {
    throw new Error('Invalid token format');
  }
  const realToken = token.split(' ')[1];
  return jwt.verify(realToken, process.env.JWT_SECRET);
};

exports.hashPassword = async (plain) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plain, salt);
};