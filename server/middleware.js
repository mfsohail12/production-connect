const { verifyToken } = require('./helpers/auth');

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No auth header' });

    const payload = verifyToken(authHeader);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};